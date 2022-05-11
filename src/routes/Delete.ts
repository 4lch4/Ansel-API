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
          await retriever.deleteAsset(folderName, assetId)

          Successful.ok(ctx, { body: `${folderName}/${assetId} deleted` })
          logger.success(`${ctx.method} ⇥ ${ctx.path} ⇥ (${ctx.status})`)
        } else {
          const res = await retriever.deleteFolder(folderName)

          console.log(res)

          Successful.ok(ctx, { body: `Folder ${folderName} deleted` })
          logger.success(`${ctx.method} ⇥ ${ctx.path} ⇥ (${ctx.status})`)
        }
      } else throw new Error('No folderName parameter was provided.')
    } catch (error) {
      throw error
    }
  }

  build() {
    this.router.delete('/delete/:folderName', async ctx =>
      this.deleteMethod(ctx)
    )

    this.router.delete('/delete/:folderName/:assetId', async ctx =>
      this.deleteMethod(ctx)
    )

    return this.router
  }
}
