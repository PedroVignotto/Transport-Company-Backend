import { generateRandomOrder } from '@/tests/mocks'
import { makeFakeDatabase } from '@/tests/infra/repositories/postgres/mocks'
import { OrderRepository } from '@/infra/repositories/postgres/repositories'
import { DeliveryStatus, Order } from '@/infra/repositories/postgres/entities'
import { PgConnection } from '@/infra/repositories/postgres/helpers'

import { IBackup, IMemoryDb } from 'pg-mem'
import { Repository } from 'typeorm'

describe('OrderRepository', () => {
  let sut: OrderRepository
  let order: Order
  let backup: IBackup
  let database: IMemoryDb
  let orderRepository: Repository<Order>
  let deliveryStatusRepository: Repository<DeliveryStatus>

  beforeAll(async () => {
    order = generateRandomOrder()

    database = await makeFakeDatabase()
    backup = database.backup()
    orderRepository = PgConnection.getInstance().getRepository(Order)
    deliveryStatusRepository = PgConnection.getInstance().getRepository(DeliveryStatus)
  })

  beforeEach(() => {
    backup.restore()

    sut = new OrderRepository()
  })

  it('Should return undefined if order does not exists', async () => {
    const result = await sut.loadByTrackingCode({ trackingCode: order.trackingCode })

    expect(result).toBeUndefined()
  })

  it('Should return order data if already exists', async () => {
    await deliveryStatusRepository.save(order.deliveryStatus)
    const createdOrder = await orderRepository.save(order)

    const result = await sut.loadByTrackingCode({ trackingCode: order.trackingCode })

    expect(result).toEqual(createdOrder)
  })
})
