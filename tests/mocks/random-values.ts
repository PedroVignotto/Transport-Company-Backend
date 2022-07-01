import faker from 'faker'

export const generateRandomTrackingCode = (): string => faker.datatype.uuid()
