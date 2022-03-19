import { IStorageConfig } from '../../interfaces'

/** The base class to be used for the S3/B2 utility classes. */
export class StorageUtilBase {
  protected config: IStorageConfig

  protected constructor(config: IStorageConfig) {
    this.config = config
  }

  /**
   * Create a new instance of the storage utility class for the specified
   * medium. The medium must be either S3 or B2.
   *
   * @param config The configuration object to use for the storage medium.
   * @returns A new instance of the storage utility class.
   */
  async init(config: IStorageConfig): Promise<StorageUtilBase> {
    return new StorageUtilBase(config)
  }

  /**
   * Returns a string array containing the names of the top-level folders in the
   * storage bucket.
   */
  getDirectoryList(): Promise<any> {
    throw new Error('Not implemented')
  }

  /**
   * Returns a string array containing the names of the files in the specified
   * directory.
   *
   * @param directory The name of the directory to get the contents of.
   */
  getDirectoryContents(_directory: string): Promise<any> {
    throw new Error('Not implemented')
  }
}
