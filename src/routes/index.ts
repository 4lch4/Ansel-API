import Router from '@koa/router'
import { GetEndpoint } from './Get'
import { HealthEndpoint } from './Health'
import { ListEndpoint } from './List'

const Endpoints = [ListEndpoint, GetEndpoint, HealthEndpoint]

export function getRoutes(): Router[] {
  const routes: Router[] = []

  for (const Endpoint of Endpoints) {
    routes.push(new Endpoint().build())
  }

  return routes
}
