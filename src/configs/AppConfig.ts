import { IAppConfig, StorageType } from '../interfaces'
import { StorageConfig } from './StorageConfig'

const NA = 'Unknown'

const getStorageType = (input: string = 'S3'): StorageType => {
  if (input.toLowerCase() === 's3') return StorageType.S3
  else if (input.toLowerCase() === 'b2') return StorageType.B2
  else return StorageType.S3
}

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
  logRocketId: process.env.LOGROCKET_ID || NA,
  storageConfig: StorageConfig,
  storageType: getStorageType(process.env.STORAGE_TYPE)
}
