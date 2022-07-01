import { generateRandomOrder } from '@/tests/mocks'
import { ListOrderByTrackingCodeController } from '@/application/controllers'

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
})
