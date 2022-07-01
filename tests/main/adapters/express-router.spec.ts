import { generateRandomKey, generateRandomValue, generateRandomError } from '@/tests/mocks'
import { Controller } from '@/application/controllers'
import { expressRouterAdapter } from '@/main/adapters'

import { getMockReq, getMockRes } from '@jest-mock/express'
import { NextFunction, RequestHandler, Request, Response } from 'express'
import { mock } from 'jest-mock-extended'

describe('ExpressRouterAdapter', () => {
  let sut: RequestHandler
  let key: string
  let value: string
  let error: Error
  let request: Request
  let response: Response
  let next: NextFunction

  const controller = mock<Controller>()

  beforeEach(() => {
    sut = expressRouterAdapter(controller)

    key = generateRandomKey()
    value = generateRandomValue()
    error = generateRandomError()
    request = getMockReq({ params: { [key]: value } })
    response = getMockRes().res
    next = getMockRes().next

    controller.handle.mockResolvedValue({ statusCode: 200, data: { data: value } })
  })

  it('Should call handle with correct request', async () => {
    await sut(request, response, next)

    expect(controller.handle).toHaveBeenCalledWith({ [key]: value })
    expect(controller.handle).toHaveBeenCalledTimes(1)
  })

  it('Should call handle with empty request', async () => {
    request = getMockReq()

    await sut(request, response, next)

    expect(controller.handle).toHaveBeenCalledWith({})
    expect(controller.handle).toHaveBeenCalledTimes(1)
  })

  it('Should respond with correct statusCode and data on success', async () => {
    await sut(request, response, next)

    expect(response.status).toHaveBeenCalledWith(200)
    expect(response.json).toHaveBeenCalledWith({ data: value })
  })

  it('Should respond with correct statusCode and error on failure', async () => {
    controller.handle.mockResolvedValueOnce({ statusCode: 400, data: error })

    await sut(request, response, next)

    expect(response.status).toHaveBeenCalledWith(400)
    expect(response.json).toHaveBeenCalledWith({ error: error.message })
  })
})
