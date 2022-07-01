import { LoadOrderByTrackingCodeRepository } from '@/domain/contracts/database/repositories'
import { FieldNotFoundError } from '@/domain/errors'

type Setup = (orderRepository: LoadOrderByTrackingCodeRepository) => ListOrderByTrackingCode
type Input = { trackingCode: string }
type Output = void
export type ListOrderByTrackingCode = (input: Input) => Promise<Output>

export const listOrderByTrackingCodeUseCase: Setup = orderRepository => async ({ trackingCode }) => {
  const order = await orderRepository.loadByTrackingCode({ trackingCode })
  if (!order) throw new FieldNotFoundError('trackingCode')
}
