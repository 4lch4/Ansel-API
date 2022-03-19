import B2 from 'backblaze-b2'
import { IStorageConfig } from '../../interfaces'
import { StorageUtilBase } from './StorageUtilBase'

/** A utility class for interacting with a B2 storage medium. */
export class B2Util extends StorageUtilBase {
  client: B2

  private constructor(config: IStorageConfig) {
    super(config)

    this.client = new B2({
      applicationKey: config.bucketAccessKeyId,
      applicationKeyId: config.bucketSecretAccessKey
    })
  }

  async authorize(config: IStorageConfig) {
    const b2Util = new B2Util(config)

    await b2Util.client.authorize()

    return b2Util
  }

  async getDirectoryContents(
    directory: string,
    startFileName: string = ''
  ): Promise<string[]> {
    const fileNames: string[] = []

    const { data, status } = await this.client.listFileNames({
      bucketId: this.config.bucketName,
      delimiter: '/',
      prefix: directory,
      maxFileCount: 1000,
      startFileName
    })

    console.log(`status = ${status}`)

    if (data.nextFileName) {
      // const nextFileNames = await this.getDirectoryContents(
      //   directory,
      //   data.nextFileName
      // )
      console.log(`Another page of files ${data.nextFileName}`)
    }

    console.log(data)

    return fileNames

    // while (nextFileName) {
    //   const innerFileNamesRes = await this.getDirectoryContents(
    //     directory,
    //     nextFileName
    //   )

    //   nextFileName = fileNames.data.nextFileName
    // }

    // if (fileNames.data.nextFileName) {
    //   return this.getDirectoryContents(directory, fileNames.data.nextFileName)
    // } else return fileNames
  }
}
