import { generateRandomOrder } from '@/tests/mocks'
import { makeFakeDatabase } from '@/tests/infra/repositories/postgres/mocks'
import { OrderRepository } from '@/infra/repositories/postgres/repositories'

import { IBackup, IMemoryDb } from 'pg-mem'

describe('OrderRepository', () => {
  let sut: OrderRepository
  let trackingCode: string
  let backup: IBackup
  let database: IMemoryDb

  beforeAll(async () => {
    trackingCode = generateRandomOrder().trackingCode

    database = await makeFakeDatabase()
    backup = database.backup()
  })

  beforeEach(() => {
    backup.restore()

    sut = new OrderRepository()
  })

  it('Should return undefined if order does not exists', async () => {
    const order = await sut.loadByTrackingCode({ trackingCode })

    expect(order).toBeUndefined()
  })
})
