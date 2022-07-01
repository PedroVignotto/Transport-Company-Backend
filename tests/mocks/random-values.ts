import { Order } from '@/domain/models'

import faker from 'faker'

export const generateRandomOrder = (): Order => ({
  id: faker.datatype.uuid(),
  trackingCode: faker.datatype.uuid(),
  deliveryStatus: [{ id: faker.datatype.uuid(), name: faker.name.findName() }],
  updatedAt: faker.date.recent(),
  createdAt: faker.date.recent()
})
export const generateRandomRepository = (): string => faker.database.column()
