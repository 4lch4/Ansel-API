import { ClientErrors, ServerErrors, Successful } from '@4lch4/koa-oto'
import { logger } from '@4lch4/logger'
import { RouterContext } from '@koa/router'
import { BaseEndpoint, getImageUrl, getRandomNumber, Retriever } from '../lib'

const retriever = new Retriever()

export class GetEndpoint extends BaseEndpoint {
  async getMethod(ctx: RouterContext) {
    try {
      const dirName = ctx.params.name
      const { count, data } = await retriever.getDirectoryContents(dirName)

      if (count && Array.isArray(data) && typeof data[0] !== 'undefined') {
        const id = ctx.params.id
          ? parseInt(ctx.params.id)
          : getRandomNumber(0, count - 1)

        const imageName = data[id]

        if (imageName) {
          Successful.ok(ctx, { body: getImageUrl(dirName, imageName) })
          logger.success(`${ctx.method} ⇥ ${ctx.path} ⇥ (${ctx.status})`)
        } else {
          ClientErrors.notFound(ctx, {
            body: `No image found for ${dirName} with id ${id}`
          })
          logger.error(`${ctx.method} ⇥ ${ctx.path} ⇥ (404)`)
        }
      } else {
        ClientErrors.notFound(ctx, { body: `No images found for ${dirName}` })
        logger.error(`${ctx.method} ⇥ ${ctx.path} ⇥ ${dirName} ⇥ (404)`)
      }
    } catch (err) {
      ServerErrors.internalServerError(ctx, { body: err })
      logger.error(`${ctx.method} ⇥ ${ctx.path} ⇥ (404)`)
      logger.error(err)
    }
  }

  build() {
    this.router.get('/get/:name', async ctx => this.getMethod(ctx))
    this.router.get('/get/:name/:id', async ctx => this.getMethod(ctx))

    return this.router
  }
}
