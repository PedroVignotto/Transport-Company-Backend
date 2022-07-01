import { LoadOrderByTrackingCodeRepository } from '@/domain/contracts/database/repositories'
import { ListOrderByTrackingCode, listOrderByTrackingCodeUseCase } from '@/domain/use-cases'

import { mock } from 'jest-mock-extended'

describe('listOrderByTrackingCodeUseCase', () => {
  let sut: ListOrderByTrackingCode

  const orderRepository = mock<LoadOrderByTrackingCodeRepository>()

  beforeEach(() => {
    sut = listOrderByTrackingCodeUseCase(orderRepository)
  })

  it('Should call LoadOrderByTrackingCodeRepository with correct value', async () => {
    await sut({ trackingCode: 'any_tracking_code' })

    expect(orderRepository.loadByTrackingCode).toHaveBeenCalledWith({ trackingCode: 'any_tracking_code' })
    expect(orderRepository.loadByTrackingCode).toHaveBeenCalledTimes(1)
  })
})
