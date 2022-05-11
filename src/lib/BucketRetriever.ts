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

  private getAssetName(
    folderName: string,
    assetId: string
  ): Promise<string | undefined> {
    return new Promise((resolve, reject) => {
      try {
        this.getDirectoryContents(folderName)
          .then(res => {
            for (const index in res.data) {
              // @ts-ignore
              const name = res.data[index]
              if (name.startsWith(`${folderName}-${assetId}`)) {
                // Found the correct asset!
                resolve(name)
              }
            }

            resolve(undefined)
          })
          .catch(err => reject(err))
      } catch (err) {
        reject(err)
      }
    })
  }

  async deleteFolder(folderName: string): Promise<any> {
    logger.debug(`Deleting ${folderName} folder...`)
    const folderContents = await this.getDirectoryContents(folderName)
    const folderObjects: S3.ObjectIdentifierList = []

    if (folderContents.data) {
      for (const item of folderContents.data) {
        folderObjects.push({ Key: `${folderName}/${item}` })
      }
    } else return `${folderName} is empty`

    return new Promise((resolve, reject) => {
      try {
        this.client.deleteObjects(
          {
            Bucket: AppConfig.bucketName,
            Delete: {
              Objects: folderObjects
            }
          },
          (err, _data) => {
            if (err) reject(err)
            else {
              this.client.deleteObject(
                { Bucket: AppConfig.bucketName, Key: folderName },
                (err, data) => {
                  if (err) reject(err)
                  else resolve(data)
                }
              )
            }
          }
        )
      } catch (err) {
        reject(err)
      }
    })
  }

  async deleteAsset(folderName: string, assetId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        this.getAssetName(folderName, assetId)
          .then(assetName => {
            if (assetName) {
              logger.debug(`Deleting ${assetName} asset...`)

              this.client.deleteObject(
                {
                  Bucket: AppConfig.bucketName,
                  Key: `${folderName}/${assetName}`
                },
                (err, data) => {
                  if (err) reject(err)
                  else resolve(data)
                }
              )
            } else logger.warn(`Asset ${assetId} not found in ${folderName}`)
          })
          .catch(err => reject(err))
      } catch (err) {
        reject(err)
      }
    })
  }
}
