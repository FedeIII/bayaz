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
