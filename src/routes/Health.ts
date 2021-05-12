import { Middleware, RouterContext } from '@koa/router'
import { BaseEndpoint } from '../lib'

export class HealthEndpoint extends BaseEndpoint {
  getMethod(ctx: RouterContext, _next: Middleware) {
    ctx.body = 'OK'
    ctx.status = 200
  }

  build() {
    this.router.get('/health/liveness', (ctx, _next) => {
      ctx.body = 'OK'
      ctx.status = 200
    })
    this.router.get('/health/readiness', (ctx, _next) => {
      ctx.body = 'OK'
      ctx.status = 200
    })

    return this.router
  }
}
