import mqtt from 'mqtt';
import crypto from 'crypto';
import request from 'request';
import EventEmitter from 'events';
import { v4 as uuidv4 } from 'uuid';
import { MerossCloudDevice, MerossCloudHubDevice } from './merossCloudDevice';

const SECRET = '23x17ahWarFH6w29';
const MEROSS_DOMAIN = 'iotx.meross.com';
const MEROSS_MQTT_DOMAIN = 'eu-iotx.meross.com';
const LOGIN_URL = `/v1/Auth/signIn`;
const LOGOUT_URL = `/v1/Profile/logout`;
const DEV_LIST = `/v1/Device/devList`;
const SUBDEV_LIST = `/v1/Hub/getSubDevices`;

const errorMessages = {
  500: 'The selected timezone is not supported',
  1001: 'Wrong or missing password',
  1002: 'Account does not exist',
  1003: 'This account has been disabled or deleted',
  1004: 'Wrong email or password',
  1005: 'Invalid email address',
  1006: 'Bad password format',
  1008: 'This email is not registered',
  1019: 'Token expired',
  1022: 'Token error',
  1030: 'Redirect app to login other than this region',
  1032: 'Invalid MFA code. Please use a current MFA code.',
  1033: 'MFA is activated for the account but MFA code not provided. Please provide a current MFA code.',
  1200: 'Token has expired',
  1255: 'The number of remote control boards exceeded the limit',
  1301: 'You have issued too many tokens without logging out and your account might have been temporarily disabled.',
  5000: 'Unknown or generic error',
  5001: 'Unknown or generic error',
  5002: 'Unknown or generic error',
  5003: 'Unknown or generic error',
  5004: 'Unknown or generic error',
  5020: 'Infrared Remote device is busy',
  5021: 'Infrared record timeout',
  5022: 'Infrared record invalid',
};

function getErrorMessage(code) {
  return errorMessages[code] || 'Unknown error';
}

function generateRandomString(length) {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let nonce = '';
  while (nonce.length < length) {
    nonce += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return nonce;
}

function encodeParams(parameters) {
  const jsonstring = JSON.stringify(parameters);
  return Buffer.from(jsonstring).toString('base64');
}

function sleepProcess(ms) {
  return new Promise(res => setTimeout(res, ms));
}

class Lights extends EventEmitter {
  /*
        email
        password
        mfaCode (optional)
        tokenData (object with details from former login)
        localHttpFirst
        timeout
    */

  constructor(options) {
    super();

    this.options = options || {};
    this.token = null;
    this.key = null;
    this.userId = null;
    this.userEmail = null;
    this.authenticated = false;
    this.httpDomain = MEROSS_DOMAIN;
    this.mqttDomain = MEROSS_MQTT_DOMAIN;

    this.localHttpFirst = !!options.localHttpFirst;
    this.onlyLocalForGet = this.localHttpFirst
      ? !!options.onlyLocalForGet
      : false;

    this.timeout = options.timeout || 10000;

    this.mqttConnections = {};
    this.devices = {};
    this.httpRequestCounter = 0;

    if (this.options.tokenData) {
      const expectedHash = crypto
        .createHash('md5')
        .update(
          `${this.httpDomain}${this.options.email}${this.options.password}`
        )
        .digest('hex');
      if (this.options.tokenData.hash === expectedHash) {
        this.options.logger &&
          this.options.logger(`Trying pre-existing token from former login`);
        this.token = this.options.tokenData.token;
        this.key = this.options.tokenData.key;
        this.userId = this.options.tokenData.userId;
        this.userEmail = this.options.tokenData.userEmail;
        this.httpDomain = this.options.tokenData.domain;
        this.mqttDomain = this.options.tokenData.mqttDomain;
      } else {
        this.options.logger &&
          this.options.logger(
            `Can not reuse former token because email/password are different!`
          );
      }
    }
  }

  ready() {
    return new Promise(resolve => {
      this.on('deviceInitialized', (deviceId, deviceDef, device) => {
        console.log(
          'New device ' + deviceId + ': ' + JSON.stringify(deviceDef)
        );

        device.on('connected', () => {
          console.log('DEV: ' + deviceId + ' connected');

          // device.getSystemAbilities((err, res) => {
          //   console.log('Abilities: ' + JSON.stringify(res));

          //   device.getSystemAllData((err, res) => {
          //     console.log('All-Data: ' + JSON.stringify(res));
          //   });
          // });
        });

        this.device = device;

        device.on('close', error => {
          console.log('DEV: ' + deviceId + ' closed: ' + error);
        });

        device.on('error', error => {
          console.log('DEV: ' + deviceId + ' error: ' + error);
        });

        device.on('reconnect', () => {
          console.log('DEV: ' + deviceId + ' reconnected');
        });

        device.on('data', (namespace, payload) => {
          console.log(
            'DEV: ' +
              deviceId +
              ' ' +
              namespace +
              ' - data: ' +
              JSON.stringify(payload)
          );
        });

        resolve(device);
      });
    });
  }

  getTokenData() {
    if (!this.authenticated) return null;
    return {
      token: this.token,
      key: this.key,
      userId: this.userId,
      userEmail: this.userEmail,
      domain: this.httpDomain,
      mqttDomain: this.mqttDomain,
      hash: crypto
        .createHash('md5')
        .update(
          `${this.httpDomain}${this.options.email}${this.options.password}`
        )
        .digest('hex'),
    };
  }

  authenticatedPost(endpoint, paramsData, callback) {
    const nonce = generateRandomString(16);
    const timestampMillis = Date.now();
    const loginParams = encodeParams(paramsData);

    // Generate the md5-hash (called signature)
    const datatosign = SECRET + timestampMillis + nonce + loginParams;
    const md5hash = crypto.createHash('md5').update(datatosign).digest('hex');
    const headers = {
      Authorization: `Basic ${this.token || ''}`,
      Vendor: 'meross',
      AppVersion: '3.22.4',
      AppType: 'iOS',
      AppLanguage: 'en',
      'User-Agent': 'intellect_socket/3.22.4 (iPhone; iOS 17.2; Scale/2.00)',
    };

    const payload = {
      params: loginParams,
      sign: md5hash,
      timestamp: timestampMillis,
      nonce: nonce,
    };

    const options = {
      url: `https://${this.httpDomain}${endpoint}`,
      method: 'POST',
      headers: headers,
      form: payload,
      timeout: this.timeout,
    };
    const requestCounter = this.httpRequestCounter++;
    this.options.logger &&
      this.options.logger(
        `HTTP-Call (${requestCounter}): ${JSON.stringify(options)}`
      );
    // Perform the request.
    request(options, (error, response, body) => {
      if (!error && response && response.statusCode === 200 && body) {
        this.options.logger &&
          this.options.logger(`HTTP-Response (${requestCounter}) OK: ${body}`);
        try {
          body = JSON.parse(body);
        } catch (err) {
          body = {};
        }

        if (body.apiStatus === 0) {
          return callback && callback(null, body.data);
        } else if (body.apiStatus === 1030 && body.data.domain) {
          this.httpDomain = body.data.domain;
          if (this.httpDomain.startsWith('https://')) {
            this.httpDomain = this.httpDomain.substring(8);
          }
          this.mqttDomain = body.data.mqttDomain;
          return this.authenticatedPost(endpoint, paramsData, callback);
        }
        return (
          callback &&
          callback(
            new Error(
              `${body.apiStatus} (${getErrorMessage(body.apiStatus)})${
                body.info ? ` - ${body.info}` : ''
              }`
            )
          )
        );
      }
      this.options.logger &&
        this.options.logger(
          `HTTP-Response (${requestCounter}) Error: ${error} / Status=${
            response ? response.statusCode : '--'
          }`
        );
      return callback && callback(error);
    });
  }

  connectDevice(deviceObj, dev) {
    const deviceId = dev.uuid;
    this.devices[deviceId] = deviceObj;
    this.devices[deviceId].on('connected', () => {
      this.emit('connected', deviceId);
    });
    this.devices[deviceId].on('close', error => {
      this.emit('close', deviceId, error);
    });
    this.devices[deviceId].on('error', error => {
      if (!this.listenerCount('error')) return;
      this.emit('error', error, deviceId);
    });
    this.devices[deviceId].on('reconnect', () => {
      this.emit('reconnect', deviceId);
    });
    this.devices[deviceId].on('data', (namespace, payload) => {
      this.emit('data', deviceId, namespace, payload);
    });
    this.devices[deviceId].on('rawData', message => {
      this.emit('rawData', deviceId, message);
    });
    this.emit('deviceInitialized', deviceId, dev, this.devices[deviceId]);

    this.initMqtt(dev);
    this.devices[deviceId].connect();
  }

  login(callback) {
    if (!this.options.email) {
      return callback && callback(new Error('Email missing'));
    }
    if (!this.options.password) {
      return callback && callback(new Error('Password missing'));
    }
    const logIdentifier = generateRandomString(30) + uuidv4();
    //'0b11b194f83724b614a6975b112f63cee2f098-8125-40c7-a280-5115913d9887';// '%030x' % random.randrange(16 ** 30) + str(uuid.uuid4())
    // 54dp8pv70pz0a94ye8c1q5j13nhtb55dc30135-0cd6-4801-bc13-8608120b05d6
    // aa965f72dc01d414d8efa8360bade3  36894452-c55b-4f10-8ca3-c60edba97728
    const passwordHash = crypto
      .createHash('md5')
      .update(this.options.password)
      .digest('hex');

    const data = {
      email: this.options.email,
      password: passwordHash,
      encryption: 1,
      accountCountryCode: '--',
      mobileInfo: {
        resolution: '--',
        carrier: '--',
        deviceModel: '--',
        mobileOs: process.platform,
        mobileOSVersion: '--',
        uuid: logIdentifier,
      },
      agree: 1,
      mfaCode: this.options.mfaCode || undefined,
    };
    //console.log(JSON.stringify(data));

    this.options.logger &&
      this.options.logger(
        `Login to Meross${this.options.mfaCode ? ' with MFA code' : ''}`
      );
    this.authenticatedPost(LOGIN_URL, data, (err, loginResponse) => {
      //console.log(loginResponse);
      if (err) {
        callback && callback(err);
        return;
      }
      if (!loginResponse) {
        callback &&
          callback(new Error('No valid Login Response data received'));
        return;
      }
      this.token = loginResponse.token;
      this.key = loginResponse.key;
      this.userId = loginResponse.userid;
      this.userEmail = loginResponse.email;
      this.authenticated = true;

      this.options.logger('Getting devices...');
      this.getDevices(callback);
    });
  }

  getDevices(callback) {
    this.options.logger &&
      this.options.logger(`Get Devices from Meross cloud server`);
    this.authenticatedPost(DEV_LIST, {}, (err, deviceList) => {
      if (err) {
        callback && callback(err);
        return;
      }
      //console.log(JSON.stringify(deviceList, null, 2));

      let initCounter = 0;
      let deviceListLength = 0;
      if (deviceList && Array.isArray(deviceList)) {
        deviceListLength = deviceList.length;
        deviceList.forEach(dev => {
          //const deviceType = dev.deviceType;
          if (dev.deviceType.startsWith('msh300')) {
            this.options.logger &&
              this.options.logger(`${dev.uuid} Detected Hub`);
            this.authenticatedPost(
              SUBDEV_LIST,
              { uuid: dev.uuid },
              (err, subDeviceList) => {
                this.connectDevice(
                  new MerossCloudHubDevice(this, dev, subDeviceList),
                  dev
                );
                initCounter++;
                if (initCounter === deviceListLength)
                  callback && callback(null, deviceListLength);
              }
            );
          } else {
            this.connectDevice(new MerossCloudDevice(this, dev), dev);
            initCounter++;
          }
        });
      }

      if (initCounter === deviceListLength)
        callback && callback(null, deviceListLength);
    });
  }

  connect(callback) {
    if (this.authenticated || this.token) {
      this.getDevices((err, deviceListLength) => {
        if (err && err.message.includes('Token')) {
          this.options.logger &&
            this.options.logger(
              `Pre-existing token seems invalid ... Doing login`
            );
          this.logout(() => this.login(callback));
        } else {
          this.authenticated = true;
          callback && callback(err, deviceListLength);
        }
      });
    } else {
      this.logout(() => this.login(callback));
    }

    /*
        /app/64416/subscribe <-- {"header":{"messageId":"b5da1e168cba7a681afcff82eaf703c8","namespace":"Appliance.System.Online","timestamp":1539614195,"method":"PUSH","sign":"b16c2c4cbb5acf13e6b94990abf5b140","from":"/appliance/1806299596727829081434298f15a991/subscribe","payloadVersion":1},"payload":{"online":{"status":2}}}
        /app/64416/subscribe <-- {"header":{"messageId":"4bf5dfaaa0898243a846c1f2a93970fe","namespace":"Appliance.System.Online","timestamp":1539614201,"method":"PUSH","sign":"f979692120e7165b2116abdfd464ca83","from":"/appliance/1806299596727829081434298f15a991/subscribe","payloadVersion":1},"payload":{"online":{"status":1}}}
        /app/64416/subscribe <-- {"header":{"messageId":"46182b62a9377a8cc0147f22262a23f3","namespace":"Appliance.System.Report","method":"PUSH","payloadVersion":1,"from":"/appliance/1806299596727829081434298f15a991/publish","timestamp":1539614201,"timestampMs":78,"sign":"048fad34ca4d00875a026e33b16caf1b"},"payload":{"report":[{"type":"1","value":"0","timestamp":1539614201}]}}
        TIMEOUT
        err: Error: Timeout, res: undefined
        /app/64416/subscribe <-- {"header":{"messageId":"8dbe0240b2c03dcefda87a758a228d21","namespace":"Appliance.Control.ToggleX","method":"PUSH","payloadVersion":1,"from":"/appliance/1806299596727829081434298f15a991/publish","timestamp":1539614273,"timestampMs":27,"sign":"0f1ab22db05842eb94714b669b911aff"},"payload":{"togglex":{"channel":1,"onoff":1,"lmTime":1539614273}}}
        /app/64416/subscribe <-- {"header":{"messageId":"6ecacf6453bb0a4256f8bf1f5dd1d835","namespace":"Appliance.Control.ToggleX","method":"PUSH","payloadVersion":1,"from":"/appliance/1806299596727829081434298f15a991/publish","timestamp":1539614276,"timestampMs":509,"sign":"b8281d71ef8ab5420a1382af5ff9fc34"},"payload":{"togglex":{"channel":1,"onoff":0,"lmTime":1539614276}}}

        {"header":{"messageId":"98fee66789f75eb0e149f2a5116f919c","namespace":"Appliance.Control.ToggleX","method":"PUSH","payloadVersion":1,"from":"/appliance/1806299596727829081434298f15a991/publish","timestamp":1539633281,"timestampMs":609,"sign":"dd6bf3acee81a6c46f6fedd02515ddf3"},"payload":{"togglex":[{"channel":0,"onoff":0,"lmTime":1539633280},{"channel":1,"onoff":0,"lmTime":1539633280},{"channel":2,"onoff":0,"lmTime":1539633280},{"channel":3,"onoff":0,"lmTime":1539633280},{"channel":4,"onoff":0,"lmTime":1539633280}]}}
        */
  }

  logout(callback) {
    if (!this.authenticated || !this.token) {
      return callback && callback(new Error('Not authenticated'));
    }
    this.authenticatedPost(LOGOUT_URL, {}, (err, logoutResponse) => {
      //console.log(logoutResponse);
      if (err) {
        callback && callback(err);
        return;
      }
      this.token = null;
      this.key = null;
      this.userId = null;
      this.userEmail = null;
      this.authenticated = false;

      callback && callback();
    });
  }

  getDevice(uuid) {
    return this.devices[uuid];
  }

  disconnectAll(force) {
    for (const deviceId in this.devices) {
      if (!this.devices.hasOwnProperty(deviceId)) continue;
      this.devices[deviceId].disconnect(force);
    }
    for (const domain of Object.keys(this.mqttConnections)) {
      this.mqttConnections[domain].client.end(force);
    }
  }

  initMqtt(dev) {
    const domain = dev.domain || this.mqttDomain; // reservedDomain ???
    if (!this.mqttConnections[domain] || !this.mqttConnections[domain].client) {
      const appId = crypto
        .createHash('md5')
        .update(`API${uuidv4()}`)
        .digest('hex');
      const clientId = `app:${appId}`;

      // Password is calculated as the MD5 of USERID concatenated with KEY
      const hashedPassword = crypto
        .createHash('md5')
        .update(`${this.userId}${this.key}`)
        .digest('hex');

      if (!this.mqttConnections[domain]) {
        this.mqttConnections[domain] = {};
      }
      if (this.mqttConnections[domain].client) {
        this.mqttConnections[domain].client.end(true);
      }
      this.mqttConnections[domain].client = mqtt.connect({
        protocol: 'mqtts',
        host: domain,
        port: 2001,
        clientId: clientId,
        username: this.userId,
        password: hashedPassword,
        rejectUnauthorized: true,
        keepalive: 30,
        reconnectPeriod: 5000,
      });
      this.mqttConnections[domain].deviceList =
        this.mqttConnections[domain].deviceList || [];
      if (!this.mqttConnections[domain].deviceList.includes(dev.uuid)) {
        this.mqttConnections[domain].deviceList.push(dev.uuid);
      }

      this.mqttConnections[domain].client.on('connect', () => {
        //console.log("Connected. Subscribe to user topics");

        this.mqttConnections[domain].client.subscribe(
          `/app/${this.userId}/subscribe`,
          err => {
            if (err) {
              this.emit('error', err);
            }
            //console.log('User Subscribe Done');
          }
        );

        this.clientResponseTopic = `/app/${this.userId}-${appId}/subscribe`;

        this.mqttConnections[domain].client.subscribe(
          this.clientResponseTopic,
          err => {
            if (err) {
              this.emit('error', err);
            }
            //console.log('User Response Subscribe Done');
          }
        );

        this.mqttConnections[domain].deviceList.forEach(devId => {
          this.devices[devId] &&
            this.devices[devId].emit(
              this.mqttConnections[domain].silentReInitialization
                ? 'reconnect'
                : 'connected'
            );
        });
        this.mqttConnections[domain].silentReInitialization = false;
      });

      this.mqttConnections[domain].client.on('error', error => {
        if (error && error.toString().includes('Server unavailable')) {
          this.mqttConnections[domain].silentReInitialization = true;
          this.mqttConnections[domain].client.end(true);
          if (this.mqttConnections[domain].deviceList.length) {
            setImmediate(() => {
              this.mqttConnections[domain].client = null;
              if (this.mqttConnections[domain].deviceList.length) {
                this.initMqtt(
                  this.devices[this.mqttConnections[domain].deviceList[0]]
                );
              }
            });
          }
        }
        this.mqttConnections[domain].deviceList.forEach(devId => {
          this.devices[devId] &&
            this.devices[devId].emit('error', error ? error.toString() : null);
        });
      });
      this.mqttConnections[domain].client.on('close', error => {
        if (this.mqttConnections[domain].silentReInitialization) {
          return;
        }
        this.mqttConnections[domain].deviceList.forEach(devId => {
          this.devices[devId] &&
            this.devices[devId].emit('close', error ? error.toString() : null);
        });
      });
      this.mqttConnections[domain].client.on('reconnect', () => {
        this.mqttConnections[domain].deviceList.forEach(devId => {
          this.devices[devId] && this.devices[devId].emit('reconnect');
        });
      });

      this.mqttConnections[domain].client.on('message', (topic, message) => {
        if (!message) return;
        // message is Buffer
        //console.log(topic + ' <-- ' + message.toString());
        try {
          message = JSON.parse(message.toString());
        } catch (err) {
          this.emit('error', `JSON parse error: ${err}`);
          return;
        }

        if (!message.header.from) return;
        const fromArr = message.header.from.split('/');
        if (this.devices[fromArr[2]]) {
          this.devices[fromArr[2]].handleMessage(message);
        }
      });
    } else {
      if (!this.mqttConnections[domain].deviceList.includes(dev.uuid)) {
        this.mqttConnections[domain].deviceList.push(dev.uuid);
      }
      if (this.mqttConnections[domain].client.connected) {
        setImmediate(() => {
          this.devices[dev.uuid] && this.devices[dev.uuid].emit('connected');
        });
      }
    }
  }

  sendMessageMqtt(dev, data) {
    if (
      !this.mqttConnections[dev.domain] ||
      !this.mqttConnections[dev.domain].client
    ) {
      return false;
    }

    this.options.logger &&
      this.options.logger(
        `MQTT-Cloud-Call ${dev.uuid}: ${JSON.stringify(data)}`
      );
    this.mqttConnections[dev.domain].client.publish(
      `/appliance/${dev.uuid}/subscribe`,
      JSON.stringify(data),
      undefined,
      err => {
        if (err) {
          this.devices[dev.uuid] && this.devices[dev.uuid].emit('error', err);
        }
      }
    );
    return true;
  }

  sendMessageHttp(dev, ip, payload, callback) {
    const options = {
      url: `http://${ip}/config`,
      method: 'POST',
      json: payload,
      timeout: this.timeout,
    };
    this.options.logger &&
      this.options.logger(
        `HTTP-Local-Call ${dev.uuid}: ${JSON.stringify(options)}`
      );
    // Perform the request.
    request(options, (error, response, body) => {
      if (!error && response && response.statusCode === 200 && body) {
        this.options.logger &&
          this.options.logger(
            `HTTP-Local-Response OK ${dev.uuid}: ${JSON.stringify(body)}`
          );
        if (body) {
          setImmediate(() => {
            this.devices[dev.uuid].handleMessage(body);
          });
          return callback && callback(null);
        }
        return (
          callback && callback(new Error(`${body.apiStatus}: ${body.info}`))
        );
      }
      this.options.logger &&
        this.options.logger(
          `HTTP-Local-Response Error ${dev.uuid}: ${error} / Status=${
            response ? response.statusCode : '--'
          }`
        );
      return callback && callback(error);
    });
  }

  encodeMessage(method, namespace, payload) {
    const messageId = crypto
      .createHash('md5')
      .update(generateRandomString(16))
      .digest('hex');
    const timestamp = Math.round(new Date().getTime() / 1000); //int(round(time.time()))

    const signature = crypto
      .createHash('md5')
      .update(messageId + this.key + timestamp)
      .digest('hex');

    return {
      header: {
        from: this.clientResponseTopic,
        messageId: messageId, // Example: "122e3e47835fefcd8aaf22d13ce21859"
        method: method, // Example: "GET",
        namespace: namespace, // Example: "Appliance.System.All",
        payloadVersion: 1,
        sign: signature, // Example: "b4236ac6fb399e70c3d61e98fcb68b74",
        timestamp: timestamp,
      },
      payload: payload,
    };
  }

  sendMessage(dev, ip, data, callback) {
    if (this.localHttpFirst && ip) {
      this.sendMessageHttp(dev, ip, data, err => {
        let res = !err;
        const isGetMessage =
          data && data.header && data.header.method === 'GET';
        let resendToCloud =
          !isGetMessage || (isGetMessage && !this.onlyLocalForGet);
        if (err && resendToCloud) {
          res = this.sendMessageMqtt(dev, data);
        }
        callback && callback(res);
      });
    } else {
      callback && callback(this.sendMessageMqtt(dev, data));
    }
  }

  async runAmbientOnce(device, ambient) {
    for (let step of ambient) {
      if (step.delay) await sleepProcess(step.delay);
      await this[step.method](device, step.values);
    }
  }

  async runAmbient(device, ambient) {
    await this.runAmbientOnce(device, ambient);
    await this.runAmbient(device, ambient);
  }

  async setAmbient(ambient) {}

  async turnOn(device) {
    return new Promise(resolve => {
      device.controlToggleX(0, true, resolve);
    });
  }

  async turnOff(device) {
    return new Promise(resolve => {
      device.controlToggleX(0, fals, resolve);
    });
  }

  async setLight(device, lightValues) {
    return new Promise(resolve => {
      device.controlLight({ channel: 0, ...lightValues }, (err, res) => {
        console.log(
          'Toggle Response: err: ' + err + ', res: ' + JSON.stringify(res)
        );
        resolve();
      });
    });
  }
}

const options = {
  email: 'fedelll@gmail.com',
  password: '21532768',
  // mfsCode: '123456', // optional
  // tokenData: {...}, // Old Tokens - get after connect via "getTokenData()
  logger: console.log,
  localHttpFirst: true, // Try to contact the devices locally before trying the cloud
  onlyLocalForGet: true, // When trying locally, do not try the cloud for GET requests at all
  timeout: 3000, // Default is 3000
};

const lights = new Lights(options);

lights.on('connected', deviceId => {
  console.log(deviceId + ' connected');
});

lights.on('close', (deviceId, error) => {
  console.log(deviceId + ' closed: ' + error);
});

lights.on('error', (deviceId, error) => {
  console.log(deviceId + ' error: ' + error);
});

lights.on('reconnect', deviceId => {
  console.log(deviceId + ' reconnected');
});

// lights.on('data', (deviceId, payload) => {
//   console.log(deviceId + ' data: ' + JSON.stringify(payload));
// });

lights.connect(error => {
  console.log('connect error: ' + error);
});

export default lights;
