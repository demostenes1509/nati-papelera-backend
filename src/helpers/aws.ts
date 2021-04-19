import { S3 } from 'aws-sdk';
import { PutObjectOutput, PutObjectRequest } from 'aws-sdk/clients/s3';
import * as getEnv from 'getenv';
import * as moment from 'moment';
import { UploadedFileProps } from './interfaces';

const AWS_ACCESS_KEY_ID = getEnv('AWS_ACCESS_KEY_ID');
const AWS_SECRET_ACCESS_KEY = getEnv('AWS_SECRET_ACCESS_KEY');
const AWS_HOST = getEnv('AWS_HOST', 'NO_HOST');
const AWS_PORT = getEnv.int('AWS_PORT');
const AWS_S3_PROVIDERS_BUCKET = getEnv('AWS_S3_PROVIDERS_BUCKET');
const AWS_LOGGING = getEnv.bool('AWS_LOGGING');

const s3: S3 = new S3({
  endpoint: AWS_HOST !== 'NO_HOST' ? `http://${AWS_HOST}:${AWS_PORT}` : null,
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
  logger: AWS_LOGGING ? console : null,
  s3ForcePathStyle: true,
  useAccelerateEndpoint: false,
});

export const uploadFile = async (file: UploadedFileProps): Promise<PutObjectOutput> => {
  const suffix = moment().format('YYYY-MM-DD-HH24-MM-SS');

  const key = `${file.originalname}-${suffix}`;
  const params: PutObjectRequest = {
    Bucket: AWS_S3_PROVIDERS_BUCKET,
    Key: key,
    Body: file.buffer,
  };

  return s3.putObject(params).promise();
};
