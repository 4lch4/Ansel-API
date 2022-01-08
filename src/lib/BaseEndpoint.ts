import Router from '@koa/router'

export class BaseEndpoint {
  router: Router

  constructor() {
    this.router = new Router({
      prefix: process.env.API_PREFIX
    })
  }

  /**
   * Build the endpoint/route and return the modified Router.
   */
  build(): Router {
    return this.router
  }
}
