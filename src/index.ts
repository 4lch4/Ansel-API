import { printRoutes } from '@4lch4/koa-router-printer'
import { logger } from '@4lch4/logger'
import Koa from 'koa'
import KBody from 'koa-body'
import Helmet from 'koa-helmet'
import { AppConfig } from './configs'
import { getRoutes } from './routes'

const app = new Koa()
app.use(Helmet())
app.use(KBody())

for (const route of getRoutes()) {
  app.use(route.routes())
  app.use(route.allowedMethods())
}

printRoutes(app)

app.listen(AppConfig.port, () => {
  logger.success(
    `${AppConfig.name}-v${AppConfig.version} has come online, listening on port ${AppConfig.port}!`
  )
})
