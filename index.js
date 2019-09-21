const restify = require('restify')
const plugins = restify.plugins

const config = require('./config')

const server = restify.createServer({
  name: config.name,
  version: config.version
})

server.use(plugins.jsonBodyParser({ mapParams: true }))
server.use(plugins.acceptParser(server.acceptable))
server.use(plugins.queryParser({ mapParams: true }))
server.use(plugins.fullResponse())

const path = require('path')
const fs = require('fs')

const morgan = require('morgan')

// log only 4xx and 5xx responses to console
server.use(morgan('dev', {
  skip: function (req, res) { return res.statusCode < 400 }
}))

// log all requests to access.log
server.use(morgan('combined', {
  stream: fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
}))

server.listen(config.port, () => {
  require('./src/routes')(server)
  console.log(`${config.name} is serving on port ${config.port}...`)
})
