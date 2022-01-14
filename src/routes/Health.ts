import { logger } from '@4lch4/logger'
import { RouterContext } from '@koa/router'
import { BaseEndpoint } from '../lib'

export class HealthEndpoint extends BaseEndpoint {
  getMethod(ctx: RouterContext) {
    ctx.body = 'OK'
    ctx.status = 200
    logger.success(`${ctx.method} ⸺ ${ctx.path} ⇥ (${ctx.status})`)
  }

  build() {
    this.router.get('/health/liveness', ctx => this.getMethod(ctx))
    this.router.get('/health/readiness', ctx => this.getMethod(ctx))

    return this.router
  }
}
