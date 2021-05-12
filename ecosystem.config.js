const config = require('./local.settings.json')

module.exports = {
  apps: [
    {
      script: 'dist/index.js',
      watch: 'dist/',
      name: 'Ansel',
      env: {
        API_PREFIX: config.apiPrefix,
        PORT: 3000,
        APP_NAME: config.name,
        VERSION: config.version,
        DEBUG: true,
        SPACES_ENDPOINT: config.spacesEndpoint,
        BUCKET_NAME: config.bucketName,
        AWS_ACCESS_KEY_ID: config.accessKeyId,
        AWS_SECRET_ACCESS_KEY: config.secretAccessKey,
        IMG_BASE_URL: config.imgBaseUrl
      }
    }
  ]
}
