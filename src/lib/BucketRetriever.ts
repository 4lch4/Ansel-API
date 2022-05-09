import { logger } from '@4lch4/logger'
import { Endpoint, S3 } from 'aws-sdk'
import { AppConfig } from '../configs'

interface StringData {
  count?: number
  data?: (string | undefined)[]
}

/**
 * A utility class for retrieving images from the DigitalOcean Spaces instance.
 */
export class Retriever {
  private client: S3

  constructor() {
    this.client = new S3({
      endpoint: new Endpoint(AppConfig.bucketEndpoint),
      accessKeyId: AppConfig.bucketAccessKeyId,
      secretAccessKey: AppConfig.bucketSecretAccessKey
    })
  }

  async getDirectoryList(): Promise<StringData> {
    return new Promise((resolve, reject) => {
      this.client.listObjectsV2(
        { Bucket: AppConfig.bucketName, Delimiter: '/' },
        (err, data) => {
          if (err) reject(err)
          else {
            resolve({
              data: data.CommonPrefixes?.map(val =>
                val.Prefix?.substring(0, val.Prefix.length - 1)
              ).sort(),
              count: data.KeyCount
            })
          }
        }
      )
    })
  }

  async getDirectoryContents(name: string): Promise<StringData> {
    return new Promise((resolve, reject) => {
      this.client.listObjectsV2(
        { Bucket: AppConfig.bucketName, Prefix: `${name}/` },
        (err, data) => {
          if (err) reject(err)
          else {
            resolve({
              data: data.Contents?.map(item =>
                item.Key?.substring(name.length + 1)
              ),
              count: data.KeyCount
            })
          }
        }
      )
    })
  }

  async deleteAsset(folderName: string, assetId: string): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        this.getDirectoryContents(folderName)
          .then(names => {
            for (const name in names) {
              if (name.startsWith(`${folderName}-${assetId}`)) { 
                // Found the correct asset!
                logger.debug(`name = ${name}`)
              }
            }

            logger.debug(`End of loop...`)
            resolve()
          })
          .catch(err => reject(err))
      } catch (err) {
        reject(err)
      }
    })
  }
}
