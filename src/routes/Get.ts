import { RouterContext } from '@koa/router'
import { Next } from 'koa'
import { BaseEndpoint, getImageUrl, getRandomNumber, Retriever } from '../lib'
const retriever = new Retriever()

export class GetEndpoint extends BaseEndpoint {
  async getMethod(ctx: RouterContext, next: Next) {
    try {
      const dirName = ctx.params.name
      const { count, data } = await retriever.getDirectoryContents(dirName)

      if (count && Array.isArray(data) && typeof data[0] !== 'undefined') {
        const imgName = data[getRandomNumber(0, count)]
        // @ts-ignore Due to the if checks above, this should never be empty.
        ctx.body = getImageUrl(dirName, imgName)
      } else ctx.body = 'No image found.'
      next()
    } catch (err) {
      ctx.log.error(err)
      next()
    }
  }

  build() {
    this.router.get('/get/:name', this.getMethod)

    return this.router
  }
}
