import { IAppConfig } from '../interfaces'

const NA = 'Unknown'

/**
 * The default values needed for the Application to function properly. All of
 * the values should be saved as Environment variables, otherwise their value
 * will be "Unknown".
 */
export const AppConfig: IAppConfig = {
  name: process.env.APP_NAME || NA,
  version: process.env.APP_VERSION || NA,
  port: parseInt(process.env.APP_PORT || '8080'),
  apiPrefix: process.env.API_PREFIX || NA,
  bucketName: process.env.BUCKET_NAME || NA,
  imgBaseUrl: process.env.IMG_BASE_URL || NA,
  bucketEndpoint: process.env.BUCKET_ENDPOINT || NA,
  bucketAccessKeyId: process.env.BUCKET_ACCESS_KEY_ID || NA,
  bucketSecretAccessKey: process.env.BUCKET_SECRET_ACCESS_KEY || NA,
  logRocketId: process.env.LOGROCKET_ID || NA
}
