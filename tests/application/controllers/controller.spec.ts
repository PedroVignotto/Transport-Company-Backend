import { generateRandomError } from '@/tests/mocks'
import { Controller } from '@/application/controllers'
import { ServerError } from '@/application/errors'
import { HttpResponse } from '@/application/helpers'

class ControllerSpy extends Controller {
  result: HttpResponse = { statusCode: 200, data: null }

  async perform (): Promise<HttpResponse> {
    return this.result
  }
}

describe('Controller', () => {
  let sut: ControllerSpy
  let error: Error

  beforeAll(() => {
    error = generateRandomError()
  })

  beforeEach(() => {
    sut = new ControllerSpy()
  })

  it('Should return serverError if perform throw', async () => {
    jest.spyOn(sut, 'perform').mockRejectedValueOnce(error)

    const { statusCode, data } = await sut.handle()

    expect(statusCode).toBe(500)
    expect(data).toEqual(new ServerError(error))
  })

  it('Should return same result as perform', async () => {
    const httpResponse = await sut.handle()

    expect(httpResponse).toEqual(sut.result)
  })
})
