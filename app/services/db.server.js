import mongoose from 'mongoose';

let db;

connect();

async function connect() {
  if (db) return db;

  console.log('Fedes MONGODB_URI:', process.env.MONGODB_URI);

  if (process.env.NODE_ENV === 'production') {
    db = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
    });
  } else {
    // in development, need to store the db connection in a global variable
    // this is because the dev server purges the require cache on every request
    // and will cause multiple connections to be made
    if (!global.__db) {
      global.__db = await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
      });
    }
    db = global.__db;
  }
  return db;
}

export { mongoose, connect };
