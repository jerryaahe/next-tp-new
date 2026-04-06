import { composeMiddlewares } from '#/middlewares/compose'
import { loggerMiddleware } from './middlewares/logger'
import { mainLoggerMiddleware } from '#/middlewares/mainLogger'

export const middleware = composeMiddlewares(
  mainLoggerMiddleware,
  loggerMiddleware,
)
