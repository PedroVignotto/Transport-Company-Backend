import { LoadOrderByTrackingCodeRepository } from '@/domain/contracts/database/repositories'

type Setup = (orderRepository: LoadOrderByTrackingCodeRepository) => ListOrderByTrackingCode
type Input = { trackingCode: string }
type Output = void
export type ListOrderByTrackingCode = (input: Input) => Promise<Output>

export const listOrderByTrackingCodeUseCase: Setup = orderRepository => async ({ trackingCode }) => {
  await orderRepository.loadByTrackingCode({ trackingCode })
}
