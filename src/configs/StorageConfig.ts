import { IStorageConfig } from '../interfaces'

export const StorageConfig: IStorageConfig = {
  bucketAccessKeyId: process.env.BUCKET_ACCESS_KEY_ID || '',
  bucketEndpoint: process.env.BUCKET_ENDPOINT || '',
  bucketName: process.env.BUCKET_NAME || '',
  bucketSecretAccessKey: process.env.BUCKET_SECRET_ACCESS_KEY || '',
  imgBaseUrl: process.env.IMG_BASE_URL || ''
}
