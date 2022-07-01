import { Controller } from '@/application/controllers'

import { RequestHandler } from 'express'

type Adapter = (controller: Controller) => RequestHandler

export const expressRouterAdapter: Adapter = controller => async (req, res) => {
  const { statusCode, data } = await controller.handle({ ...req.params })
  const json = [200].includes(statusCode) ? data : { error: data.message }
  res.status(statusCode).json(json)
}
