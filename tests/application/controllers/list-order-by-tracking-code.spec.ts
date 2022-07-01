import { generateRandomOrder } from '@/tests/mocks'
import { Controller, ListOrderByTrackingCodeController } from '@/application/controllers'
import { FieldNotFoundError } from '@/domain/errors'
import { Order } from '@/domain/models'

describe('ListOrderByTrackingCodeController', () => {
  let sut: ListOrderByTrackingCodeController
  let trackingCode: string
  let order: Order

  const listOrderByTrackingCode: jest.Mock = jest.fn()

  beforeAll(() => {
    trackingCode = generateRandomOrder().trackingCode
    order = generateRandomOrder()

    listOrderByTrackingCode.mockResolvedValue(order)
  })

  beforeEach(() => {
    sut = new ListOrderByTrackingCodeController(listOrderByTrackingCode)
  })

  it('Should extend Controller', async () => {
    expect(sut).toBeInstanceOf(Controller)
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

  it('Should return 200 with order data on success', async () => {
    const { statusCode, data } = await sut.handle({ trackingCode })

    expect(statusCode).toBe(200)
    expect(data).toEqual(order)
  })
})
