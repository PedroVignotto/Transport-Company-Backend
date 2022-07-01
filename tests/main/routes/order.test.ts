import { makeFakeDatabase } from '@/tests/infra/database/postgres/mocks'
import { generateRandomOrder } from '@/tests/mocks'
import { app } from '@/main/config/app'
import { FieldNotFoundError } from '@/domain/errors'
import { DeliveryStatus, Order } from '@/infra/database/postgres/entities'
import { PgConnection } from '@/infra/database/postgres/helpers'

import { IBackup, IMemoryDb } from 'pg-mem'
import { Repository } from 'typeorm'
import request from 'supertest'

describe('Order routes', () => {
  let order: Order
  let connection: PgConnection
  let database: IMemoryDb
  let backup: IBackup
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

  beforeEach(async () => {
    backup.restore()
  })

  afterAll(async () => {
    await connection.disconnect()
  })

  describe('GET /:trackingCode', () => {
    it('Should return 200 on success', async () => {
      await deliveryStatusRepository.save(order.deliveryStatus)
      await orderRepository.save(order)

      const { status } = await request(app).get(`/${order.trackingCode}`)

      expect(status).toBe(200)
    })

    it('Should return 400 if trackingCode does not exists', async () => {
      const { status, body: { error } } = await request(app).get(`/${order.trackingCode}`)

      expect(status).toBe(400)
      expect(error).toBe(new FieldNotFoundError('trackingCode').message)
    })
  })
})
