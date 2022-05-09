import { Successful } from '@4lch4/koa-oto'
import { logger } from '@4lch4/logger'
import { RouterContext } from '@koa/router'
import { BaseEndpoint, Retriever } from '../lib'

const retriever = new Retriever()

export class DeleteEndpoint extends BaseEndpoint {
  async deleteMethod(ctx: RouterContext) {
    try {
      const { folderName, assetId } = ctx.params

      if (folderName) {
        if (assetId) {
          const res = await retriever.deleteAsset(folderName, assetId)
          logger.debug(`res...`)
          logger.debug(JSON.stringify(res, null, 2))
        } else {
          logger.debug(`No assetId provided...`)
        }
      } else throw new Error('No folderName parameter was provided.')

      Successful.ok(ctx, { body: 'Successfully deleted asset.' })
    } catch (error) {
      throw error
    }
  }

  build() {
    this.router.delete('/delete/:folderName')
    this.router.delete('/delete/:folderName/:assetId')

    return this.router
  }
}
