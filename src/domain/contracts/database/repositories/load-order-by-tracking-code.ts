import { Order } from '@/domain/models'

export interface LoadOrderByTrackingCodeRepository {
  loadByTrackingCode: (input: LoadOrderByTrackingCodeRepository.Input) => Promise<LoadOrderByTrackingCodeRepository.Output>
}

export namespace LoadOrderByTrackingCodeRepository {
  export type Input = { trackingCode: string }
  export type Output = Order | undefined
}
