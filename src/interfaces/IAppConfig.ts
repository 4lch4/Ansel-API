export interface IAppConfig {
  /** The display name of the application. */
  name: string

  /** The version of the app in SemVer format. */
  version: string

  /** The port number the server should listen on. */
  port: number

  /** The prefix to all request endpoints. */
  apiPrefix: string

  /** The URL to the S3/Spaces endpoint where the images are stored. */
  spacesEndpoint: string

  /** The name of the bucket where the images are stored. */
  bucketName: string

  /** The base URL for all images within Ansel. */
  imgBaseUrl: string
}
