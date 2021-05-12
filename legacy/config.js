const pkg = require('../package.json')

module.exports = {
  name: pkg.displayName,
  version: pkg.version ? pkg.version : '0.0.0',
  port: 4242
}
