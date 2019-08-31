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

server.listen(config.port, () => {
  require('./routes')(server)
  console.log(`${config.name} is serving on port ${config.port}...`)
})
