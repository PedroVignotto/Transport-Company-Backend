import { generateRandomOrder } from '@/tests/mocks'
import { ListOrderByTrackingCodeController } from '@/application/controllers'
import { ServerError } from '@/application/errors'
import { FieldNotFoundError } from '@/domain/errors'

describe('ListOrderByTrackingCodeController', () => {
  let sut: ListOrderByTrackingCodeController
  let trackingCode: string

  const listOrderByTrackingCode: jest.Mock = jest.fn()

  beforeAll(() => {
    trackingCode = generateRandomOrder().trackingCode
  })

  beforeEach(() => {
    sut = new ListOrderByTrackingCodeController(listOrderByTrackingCode)
  })

  it('Should call listOrderByTrackingCode with correct value', async () => {
    await sut.handle({ trackingCode })

    expect(listOrderByTrackingCode).toHaveBeenCalledWith({ trackingCode })
    expect(listOrderByTrackingCode).toHaveBeenCalledTimes(1)
  })

  it('Should return 400 if listOrderByTrackingCode return FieldNotFoundError', async () => {
    listOrderByTrackingCode.mockRejectedValueOnce(new FieldNotFoundError('trackingCode'))

    const { statusCode, data } = await sut.handle({ trackingCode })

    expect(statusCode).toBe(400)
    expect(data).toEqual(new FieldNotFoundError('trackingCode'))
  })

  it('Should return 500 if listOrderByTrackingCode throw', async () => {
    listOrderByTrackingCode.mockRejectedValueOnce(new Error())

    const { statusCode, data } = await sut.handle({ trackingCode })

    expect(statusCode).toBe(500)
    expect(data).toEqual(new ServerError(new Error()))
  })
})
