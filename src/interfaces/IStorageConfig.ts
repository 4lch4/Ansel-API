export interface IStorageConfig {
  /** The name of the bucket where the images are stored. */
  bucketName: string

  /** The base URL for all images within Ansel. */
  imgBaseUrl: string

  /** The URL to the S3/Spaces endpoint where the images are stored. */
  bucketEndpoint: string

  /** The access key ID for the DigitalOcean Spaces instance. */
  bucketAccessKeyId: string

  /** The secret access key for the DigitalOcean Spaces instance. */
  bucketSecretAccessKey: string
}
