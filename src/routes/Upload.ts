// Import required AWS SDK clients and commands for Node.js.
// import { PutObjectCommand } from 'aws-sdk/clients/s3'
// import { s3Client } from './libs/s3Client.js' // Helper function that creates an Amazon S3 service client module.
import { Endpoint, S3 } from 'aws-sdk'
import fs from 'fs'
import path from 'path'
import { AppConfig } from '../configs'

const client = new S3({
  endpoint: new Endpoint(AppConfig.bucketEndpoint),
  accessKeyId: AppConfig.bucketAccessKeyId,
  secretAccessKey: AppConfig.bucketSecretAccessKey
})

const file = 'OBJECT_PATH_AND_NAME' // Path to and name of object. For example '../myFiles/index.js'.
const fileStream = fs.createReadStream(file)

// Set the parameters
export const uploadParams = {
  Bucket: AppConfig.bucketName,
  // Add the required 'Key' parameter using the 'path' module.
  Key: path.basename(file),
  // Add the required 'Body' parameter
  Body: fileStream
}

// Upload file to specified bucket.
export const run = async () => {
  return new Promise((resolve, reject) => {
    try {
      client.upload(
        uploadParams,
        (err: Error, data: S3.ManagedUpload.SendData) => {
          if (err) reject(err)
          else {
            console.log(data)
            resolve(data)
          }
        }
      )
    } catch (err) {
      reject(err)
    }
  })
}

run()
  .then(res => {
    console.log(res)
    console.log('Execution complete!')
  })
  .catch(err => console.error(err))
