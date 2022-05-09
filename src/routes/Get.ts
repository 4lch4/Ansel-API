import { ClientErrors, ServerErrors, Successful } from '@4lch4/koa-oto'
import { logger } from '@4lch4/logger'
import { RouterContext } from '@koa/router'
import { BaseEndpoint, getImageUrl, getRandomNumber, Retriever } from '../lib'

const retriever = new Retriever()

export class GetEndpoint extends BaseEndpoint {
  async getMethod(ctx: RouterContext) {
    try {
      const { folderName, assetId } = ctx.params
      const { count, data } = await retriever.getDirectoryContents(folderName)

      if (count && Array.isArray(data) && typeof data[0] !== 'undefined') {
        const imageName =
          data[assetId ? parseInt(assetId) : getRandomNumber(0, count - 1)]

        if (imageName) {
          Successful.ok(ctx, { body: getImageUrl(folderName, imageName) })
          logger.success(`${ctx.method} ⇥ ${ctx.path} ⇥ (${ctx.status})`)
        } else {
          ClientErrors.notFound(ctx, {
            body: `No image found for ${folderName} with id ${assetId}`
          })
          logger.error(`${ctx.method} ⇥ ${ctx.path} ⇥ (404)`)
        }
      } else {
        ClientErrors.notFound(ctx, {
          body: `No images found for ${folderName}`
        })
        logger.error(`${ctx.method} ⇥ ${ctx.path} ⇥ ${folderName} ⇥ (404)`)
      }
    } catch (err) {
      ServerErrors.internalServerError(ctx, { body: err })
      logger.error(`${ctx.method} ⇥ ${ctx.path} ⇥ (404)`)
      logger.error(err)
    }
  }

  build() {
    this.router.get('/get/:folderName', async ctx => this.getMethod(ctx))
    this.router.get('/get/:folderName/:assetId', async ctx =>
      this.getMethod(ctx)
    )

    return this.router
  }
}
