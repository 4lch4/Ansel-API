import { printRoutes } from '@4lch4/koa-router-printer'
import { logger } from '@4lch4/logger'
import Dayjs from 'dayjs'
import Koa from 'koa'
import KBody from 'koa-body'
// import KBLogger from 'koa-bunyan-logger'
import Helmet from 'koa-helmet'
import { AppConfig } from './configs'
import { getRoutes } from './routes'

LogRocket.init(AppConfig.logRocketId)

const app = new Koa()
app.use(Helmet())
app.use(KBody())
// app.use(KBLogger())

const reqTime = Dayjs().format('YYYY.MM.DD-HH:mm:ss')

for (const route of getRoutes()) {
  app.use(route.routes())
  app.use(route.allowedMethods())
}

printRoutes(app)

app.use(function (ctx, next) {
  log(
    `[${reqTime}] ➡ [${ctx.request.ip}] ➡ ${ctx.method} ➡ ${ctx.path} ⇥ (${ctx.status})`
  )
  // logger.info(`[${ctx.request.ip}] -> ${ctx.method} - ${ctx.path}`)
  return next()
})

app.listen(AppConfig.port, () => {
  logger.success(
    `${AppConfig.name}-v${AppConfig.version} has come online, listening on port ${AppConfig.port}!`
  )
})
