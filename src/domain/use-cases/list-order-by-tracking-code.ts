import { LoadOrderByTrackingCodeRepository } from '@/domain/contracts/database/repositories'
import { FieldNotFoundError } from '@/domain/errors'
import { Order } from '@/domain/models'

type Setup = (orderRepository: LoadOrderByTrackingCodeRepository) => ListOrderByTrackingCode
type Input = { trackingCode: string }
type Output = Order
export type ListOrderByTrackingCode = (input: Input) => Promise<Output>

export const listOrderByTrackingCodeUseCase: Setup = orderRepository => async ({ trackingCode }) => {
  const order = await orderRepository.loadByTrackingCode({ trackingCode })
  if (!order) throw new FieldNotFoundError('trackingCode')
  return order
}
