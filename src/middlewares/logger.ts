import type { MiddlewareFactory } from '#/middlewares/types'

export const loggerMiddleware: MiddlewareFactory = (next) => (request) => {
  console.log(456)
  return next(request)
}
