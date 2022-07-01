import { OrderRepository } from '@/infra/database/postgres/repositories'

export const makeOrderRepository = (): OrderRepository =>
  new OrderRepository()
