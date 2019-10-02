const pkg = require('./package.json')

module.exports = {
  name: process.env.APP_NAME ? process.env.APP_NAME : pkg.displayName,
  version: process.env.APP_VERSION ? process.env.APP_VERSION : pkg.version,
  port: process.env.APP_PORT ? process.env.APP_PORT : 4242
}
