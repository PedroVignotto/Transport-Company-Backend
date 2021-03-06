import { PgConnection } from '@/infra/database/postgres/helpers'

import { IMemoryDb, newDb } from 'pg-mem'

export const makeFakeDatabase = async (): Promise<IMemoryDb> => {
  const db = newDb()
  const connection = await db.adapters.createTypeormConnection({
    type: 'postgres',
    entities: ['src/infra/database/postgres/entities/index.ts']
  })
  await connection.synchronize()
  await PgConnection.getInstance().connect()
  return db
}
