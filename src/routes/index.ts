import Router from '@koa/router'
import { DeleteEndpoint } from './Delete'
import { GetEndpoint } from './Get'
import { HealthEndpoint } from './Health'
import { ListEndpoint } from './List'

const Endpoints = [DeleteEndpoint, GetEndpoint, HealthEndpoint, ListEndpoint]

export function getRoutes(): Router[] {
  const routes: Router[] = []

  Endpoints.forEach(Endpoint => routes.push(new Endpoint().build()))

  return routes
}
