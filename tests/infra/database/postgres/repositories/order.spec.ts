import { generateRandomOrder } from '@/tests/mocks'
import { makeFakeDatabase } from '@/tests/infra/database/postgres/mocks'
import { OrderRepository } from '@/infra/database/postgres/repositories'
import { DeliveryStatus, Order } from '@/infra/database/postgres/entities'
import { PgConnection } from '@/infra/database/postgres/helpers'

import { IBackup, IMemoryDb } from 'pg-mem'
import { Repository } from 'typeorm'

describe('OrderRepository', () => {
  let sut: OrderRepository
  let connection: PgConnection
  let order: Order
  let backup: IBackup
  let database: IMemoryDb
  let orderRepository: Repository<Order>
  let deliveryStatusRepository: Repository<DeliveryStatus>

  beforeAll(async () => {
    order = generateRandomOrder()

    connection = PgConnection.getInstance()
    database = await makeFakeDatabase()
    backup = database.backup()
    orderRepository = connection.getRepository(Order)
    deliveryStatusRepository = connection.getRepository(DeliveryStatus)
  })

  beforeEach(() => {
    backup.restore()

    sut = new OrderRepository()
  })

  afterAll(async () => {
    await connection.disconnect()
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
