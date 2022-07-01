import { Order } from '@/infra/repositories/postgres/entities'
import { PgRepository } from '@/infra/repositories/postgres/repositories'
import { LoadOrderByTrackingCodeRepository } from '@/domain/contracts/database/repositories'

export class OrderRepository extends PgRepository implements LoadOrderByTrackingCodeRepository {
  async loadByTrackingCode ({ trackingCode }: LoadOrderByTrackingCodeRepository.Input): Promise<LoadOrderByTrackingCodeRepository.Output> {
    const repository = this.getRepository(Order)
    return await repository.findOne({ where: { trackingCode }, relations: ['deliveryStatus'] })
  }
}
