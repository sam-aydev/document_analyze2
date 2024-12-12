import { registerAs } from '@nestjs/config';

export default registerAs('appConfig', () => ({
  environment: process.env.NODE_ENV || 'production',
  awsBucketName: process.env.AWS_BUCKET_NAME,
  awsRegion: process.env.AWS_REGION,
  awsCloudfrontUrl: process.env.CLOUDFRONT_URL,
  awsAccessKeyId: process.env.ACCESS_KEY,
  awsSecretAccess: process.env.ACCESS_SECRET
}));
