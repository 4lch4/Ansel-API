import { Endpoint, S3 } from 'aws-sdk'
import { IStandardResponse, IStorageConfig } from '../../interfaces'
import { StorageUtilBase } from './StorageUtilBase'

/**
 * A utility class for interacting with an S3 storage medium.
 */
export class S3Util extends StorageUtilBase {
  client: S3

  private constructor(config: IStorageConfig) {
    super(config)

    this.client = new S3({
      endpoint: new Endpoint(config.bucketEndpoint),
      accessKeyId: config.bucketAccessKeyId,
      secretAccessKey: config.bucketSecretAccessKey
    })
  }

  async getDirectoryContents(
    directory: string
  ): Promise<IStandardResponse> {
    return new Promise((resolve, reject) => {
      this.client.listObjectsV2(
        { Bucket: this.config.bucketName, Prefix: `${directory}/` },
        (err, data) => {
          if (err) reject(err)
          else {
            resolve({
              data: data.Contents?.map(item =>
                item.Key?.substring(directory.length + 1)
              ),
              status: 200
            })
          }
        }
      )
    })
  }

  async getDirectoryList(): Promise<IStandardResponse> {
    return new Promise((resolve, reject) => {
      this.client.listObjectsV2(
        { Bucket: this.config.bucketName, Delimiter: '/' },
        (err, data) => {
          if (err) reject(err)
          else {
            resolve({
              data: data.CommonPrefixes?.map(val =>
                val.Prefix?.substring(0, val.Prefix.length - 1)
              ).sort(),
              status: 200
            })
          }
        }
      )
    })
  }
}
