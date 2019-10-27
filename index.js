const restify = require('restify')
const morgan = require('morgan')

const {
  name: APP_NAME,
  version: APP_VERSION,
  port: PORT
} = require('./config')

const server = restify.createServer({
  name: APP_NAME,
  version: APP_VERSION
})

server.use(morgan('combined'))

server.use(restify.plugins.jsonBodyParser({ mapParams: true }))
server.use(restify.plugins.acceptParser(server.acceptable))
server.use(restify.plugins.queryParser({ mapParams: true }))
server.use(restify.plugins.fullResponse())

server.listen(PORT, () => {
  require('./src/routes')(server)

  console.log(`${APP_NAME}-v${APP_VERSION} is now serving on port ${PORT}...`)
})
