import { generateRandomKey, generateRandomValue } from '@/tests/mocks'
import { Controller } from '@/application/controllers'
import { expressRouterAdapter } from '@/main/adapters'

import { getMockReq, getMockRes } from '@jest-mock/express'
import { NextFunction, RequestHandler, Request, Response } from 'express'
import { mock } from 'jest-mock-extended'

describe('ExpressRouterAdapter', () => {
  let sut: RequestHandler
  let key: string
  let value: string
  let request: Request
  let response: Response
  let next: NextFunction

  const controller = mock<Controller>()

  beforeEach(() => {
    sut = expressRouterAdapter(controller)

    key = generateRandomKey()
    value = generateRandomValue()
    request = getMockReq({ params: { [key]: value } })
    response = getMockRes().res
    next = getMockRes().next
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
})
