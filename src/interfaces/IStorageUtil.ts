import { IStandardApiResponse, IStorageConfig } from '.'

export interface IStorageUtil {
  config: IStorageConfig

  constructor(config: IStorageConfig): IStorageUtil

  getDirectoryList(): Promise<IStandardApiResponse>

  getDirectoryContents(): Promise<IStandardApiResponse>
}
