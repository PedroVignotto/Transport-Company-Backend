import { makeOrderRepository } from '@/main/factories/infra/database/postgres/repositories'
import { ListOrderByTrackingCode, listOrderByTrackingCodeUseCase } from '@/domain/use-cases'

export const makeListOrderByTrackingCodeUseCase = (): ListOrderByTrackingCode =>
  listOrderByTrackingCodeUseCase(makeOrderRepository())
