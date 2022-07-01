import { generateRandomOrder, generateRandomError } from '@/tests/mocks'
import { ListOrderByTrackingCodeController } from '@/application/controllers'
import { ServerError } from '@/application/errors'
import { FieldNotFoundError } from '@/domain/errors'
import { Order } from '@/domain/models'

describe('ListOrderByTrackingCodeController', () => {
  let sut: ListOrderByTrackingCodeController
  let trackingCode: string
  let order: Order
  let error: Error

  const listOrderByTrackingCode: jest.Mock = jest.fn()

  beforeAll(() => {
    trackingCode = generateRandomOrder().trackingCode
    order = generateRandomOrder()
    error = generateRandomError()

    listOrderByTrackingCode.mockResolvedValue(order)
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
    listOrderByTrackingCode.mockRejectedValueOnce(error)

    const { statusCode, data } = await sut.handle({ trackingCode })

    expect(statusCode).toBe(500)
    expect(data).toEqual(new ServerError(error))
  })

  it('Should return 200 with order data on success', async () => {
    const { statusCode, data } = await sut.handle({ trackingCode })

    expect(statusCode).toBe(200)
    expect(data).toEqual(order)
  })
})
