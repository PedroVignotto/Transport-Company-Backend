import { Controller } from '@/application/controllers'

import { RequestHandler } from 'express'

type Adapter = (controller: Controller) => RequestHandler

export const expressRouterAdapter: Adapter = controller => async (req, res) => {
  const { statusCode, data } = await controller.handle({ ...req.params })
  res.status(statusCode).json(data)
}
