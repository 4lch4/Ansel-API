import { ServerErrors, Successful } from '@4lch4/koa-oto'
import { logger } from '@4lch4/logger'
import { RouterContext } from '@koa/router'
import { BaseEndpoint, Retriever } from '../lib'

const retriever = new Retriever()

export class ListEndpoint extends BaseEndpoint {
  async getList(ctx: RouterContext) {
    try {
      const { folderName } = ctx.params
      const res = folderName
        ? await retriever.getDirectoryContents(folderName)
        : await retriever.getDirectoryList()

      Successful.ok(ctx, { body: res })
      logger.success(`${ctx.method} ⇥ ${ctx.path} ⇥ (${ctx.status})`)
    } catch (err) {
      ServerErrors.internalServerError(ctx, { body: err })
      logger.error(`${ctx.method} ⇥ ${ctx.path} ⇥ (${ctx.status})`)
      logger.error(err)
    }
  }

  build() {
    this.router.get('/list', async ctx => this.getList(ctx))
    this.router.get('/list/:folderName', async ctx => this.getList(ctx))

    return this.router
  }
}
