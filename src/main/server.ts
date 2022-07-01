import './config/module-alias'
import { PgConnection } from '@/infra/database/postgres/helpers'

import 'reflect-metadata'
import 'dotenv/config'

PgConnection.getInstance().connect().then(async () => {
  const { app } = await import('@/main/config/app')
  app.listen(process.env.PORT, () => console.log(`Server running at http://localhost:${process.env.PORT!}`))
}).catch(console.error)
