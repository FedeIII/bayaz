import { S3Client, ListObjectsCommand } from '@aws-sdk/client-s3';

const s3Client = new S3Client({
  region: 'eu-north-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

export async function getSettlementImages(settlementType) {
  const response = await s3Client.send(
    new ListObjectsCommand({
      Bucket: 'bayaz',
      Prefix: `images/places/${settlementType}`,
    })
  );

  return response.Contents.map(
    o => 'https://bayaz.s3.eu-north-1.amazonaws.com/' + o.Key
  );
}

const TEMPLE_MAP = {
  Abandonado: 'abandoned',
  Sencillo: 'simple',
  Normal: 'regular',
  Lujoso: 'luxurious',
  Divino: 'divine',
};

export async function getBuildingImages({ type, subtype, variant }) {
  let prefix;
  if (type === 'religious') {
    if (subtype === 'fake') {
      prefix = `images/places/buildings/secret`;
    } else if (['ascetic', 'shrine', 'library', 'infernal'].includes(subtype)) {
      prefix = `images/places/buildings/${subtype}`;
    } else {
      prefix = `images/places/buildings/temple/${TEMPLE_MAP[variant]}`;
    }
  } else if (type === 'tavern') {
    if (subtype === 'brothel') {
      prefix = `images/places/buildings/brothel`;
    } else {
      prefix = `images/places/buildings/tavern`;
    }
  } else if (type === 'warehouse') {
    prefix = `images/places/buildings/warehouse`;
  } else if (type === 'shop' && ['bakery', 'armory'].includes(subtype)) {
    prefix = `images/places/buildings/office`;
  } else {
    prefix = `images/places/buildings/${subtype}`;
  }

  const response = await s3Client.send(
    new ListObjectsCommand({
      Bucket: 'bayaz',
      Prefix: prefix,
    })
  );

  return response.Contents.map(
    o => 'https://bayaz.s3.eu-north-1.amazonaws.com/' + o.Key
  );
}
