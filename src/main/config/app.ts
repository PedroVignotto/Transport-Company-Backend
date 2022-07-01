import { setupMiddlewares } from '@/main/config/middlewares'

import express from 'express'

export const app = express()

setupMiddlewares(app)
