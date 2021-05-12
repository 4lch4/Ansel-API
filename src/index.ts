import { logger } from '@4lch4/logger'
import Koa from 'koa'
import KBody from 'koa-body'
import KBLogger from 'koa-bunyan-logger'
import Helmet from 'koa-helmet'
import { AppConfig } from './configs'
import { getRoutes } from './routes'

const app = new Koa()
app.use(Helmet())
app.use(KBody())
app.use(KBLogger())
app.use(function (ctx, next) {
  ctx.log.info('Got a request from %s for %s', ctx.request.ip, ctx.path)
  return next()
})

for (const route of getRoutes()) {
  app.use(route.routes())
  app.use(route.allowedMethods())
}

app.listen(AppConfig.port, () => {
  logger.success(`${AppConfig.name}-v${AppConfig.version} has come online!`)
})
