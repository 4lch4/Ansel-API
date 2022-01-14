import { config } from 'dotenv'
import { join } from 'path'
import { IAppConfig } from '../interfaces'

const envPath = join(__dirname, '..', '..', '.env')
const NA = 'Unknown'

if (!process.env.API_PREFIX) config({ path: envPath })

/**
 * The default values needed for the Application to function properly. All of
 * the values should be saved as Environment variables, otherwise their value
 * will be "Unknown".
 */
export const AppConfig: IAppConfig = {
  name: process.env.APP_NAME || NA,
  version: process.env.VERSION || NA,
  port: parseInt(process.env.PORT || '3000'),
  apiPrefix: process.env.API_PREFIX || NA,
  bucketName: process.env.BUCKET_NAME || NA,
  imgBaseUrl: process.env.IMG_BASE_URL || NA,
  bucketEndpoint: process.env.BUCKET_ENDPOINT || NA,
  bucketAccessKeyId: process.env.BUCKET_ACCESS_KEY_ID || NA,
  bucketSecretAccessKey: process.env.BUCKET_SECRET_ACCESS_KEY || NA,
  logRocketId: process.env.LOGROCKET_ID || NA
}
