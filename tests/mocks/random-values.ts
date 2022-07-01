import { Order } from '@/domain/models'

import faker from 'faker'

export const generateRandomOrder = (): Order => ({
  id: faker.datatype.uuid(),
  trackingCode: faker.datatype.uuid(),
  deliveryStatus: [{ id: faker.datatype.uuid(), name: faker.name.findName() }]
})
export const generateRandomRepository = (): string => faker.database.column()
export const generateRandomKey = (): string => faker.random.word()
export const generateRandomValue = (): string => faker.random.words()
export const generateRandomError = (): Error => new Error(faker.random.words())
