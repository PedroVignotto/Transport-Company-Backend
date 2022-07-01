import './config/module-alias'
import { PgConnection } from '@/infra/database/postgres/helpers'

import 'reflect-metadata'

PgConnection.getInstance().connect().then(async () => {
  const { app } = await import('@/main/config/app')
  app.listen(3333, () => console.log('Server running at http://localhost:3333'))
}).catch(console.error)
