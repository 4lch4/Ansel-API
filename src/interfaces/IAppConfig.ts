import { IStorageConfig } from './IStorageConfig'
import { StorageType } from './StorageType'

export interface IAppConfig {
  /** The display name of the application. */
  name: string

  /** The version of the app in SemVer format. */
  version: string

  /** The port number the server should listen on. */
  port: number

  /** The prefix to all request endpoints. */
  apiPrefix: string

  /** The LogRocket ID for the application. */
  logRocketId: string

  /** The configuration for the selected storage system. */
  storageConfig: IStorageConfig

  /** The type of storage system used, S3 or B2? Default is S3. */
  storageType: StorageType
}
