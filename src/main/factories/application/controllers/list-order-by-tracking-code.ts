import { makeListOrderByTrackingCodeUseCase } from '@/main/factories/domain/use-cases'
import { ListOrderByTrackingCodeController } from '@/application/controllers'

export const makeListOrderByTrackingCodeController = (): ListOrderByTrackingCodeController =>
  new ListOrderByTrackingCodeController(makeListOrderByTrackingCodeUseCase())
