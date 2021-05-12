import { RouterContext } from '@koa/router'
import { Next } from 'koa'
import { BaseEndpoint, Retriever } from '../lib'
const retriever = new Retriever()

export class ListEndpoint extends BaseEndpoint {
  async getList(ctx: RouterContext, next: Next) {
    try {
      const res = await retriever.getDirectoryList()
      ctx.body = res
      next()
      return
    } catch (err) {
      ctx.log.error(err)
      next()
      return err
    }
  }

  build() {
    this.router.get('/list', async (ctx, _next) => {
      try {
        const res = await retriever.getDirectoryList()
        ctx.body = res
        _next()
      } catch (err) {
        console.error(err)
        ctx.body = err.code
        _next()
      }
    })

    return this.router
  }
}
