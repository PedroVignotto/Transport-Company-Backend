import { generateRandomTrackingCode, generateRandomOrder } from '@/tests/mocks'
import { LoadOrderByTrackingCodeRepository } from '@/domain/contracts/database/repositories'
import { ListOrderByTrackingCode, listOrderByTrackingCodeUseCase } from '@/domain/use-cases'
import { FieldNotFoundError } from '@/domain/errors'

import { mock } from 'jest-mock-extended'

describe('listOrderByTrackingCodeUseCase', () => {
  let sut: ListOrderByTrackingCode
  let trackingCode: string

  const orderRepository = mock<LoadOrderByTrackingCodeRepository>()

  beforeAll(() => {
    trackingCode = generateRandomTrackingCode()

    orderRepository.loadByTrackingCode.mockResolvedValue(generateRandomOrder())
  })

  beforeEach(() => {
    sut = listOrderByTrackingCodeUseCase(orderRepository)
  })

  it('Should call LoadOrderByTrackingCodeRepository with correct value', async () => {
    await sut({ trackingCode })

    expect(orderRepository.loadByTrackingCode).toHaveBeenCalledWith({ trackingCode })
    expect(orderRepository.loadByTrackingCode).toHaveBeenCalledTimes(1)
  })

  it('Should rethrow if LoadOrderByTrackingCodeRepository throw', async () => {
    orderRepository.loadByTrackingCode.mockRejectedValueOnce(new Error())

    const promise = sut({ trackingCode })

    await expect(promise).rejects.toThrow(new Error())
  })

  it('Should throw FieldNotFoundError if LoadOrderByTrackingCodeRepository return undefined', async () => {
    orderRepository.loadByTrackingCode.mockResolvedValueOnce(undefined)

    const promise = sut({ trackingCode })

    await expect(promise).rejects.toThrow(new FieldNotFoundError('trackingCode'))
  })
})
