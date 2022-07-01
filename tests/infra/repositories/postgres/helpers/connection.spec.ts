import { PgConnection } from '@/infra/repositories/postgres/helpers'

import { createConnection, getConnection, getConnectionManager } from 'typeorm'
import { mocked } from 'jest-mock'

jest.mock('typeorm', () => ({
  Entity: jest.fn(),
  PrimaryColumn: jest.fn(),
  Column: jest.fn(),
  CreateDateColumn: jest.fn(),
  createConnection: jest.fn(),
  getConnection: jest.fn(),
  getConnectionOptions: jest.fn(),
  getConnectionManager: jest.fn()
}))

describe('PgConnection', () => {
  let sut: PgConnection

  const getConnectionManagerSpy: jest.Mock = jest.fn()
  const createConnectionSpy: jest.Mock = jest.fn()
  const getConnectionSpy: jest.Mock = jest.fn()
  const closeSpy: jest.Mock = jest.fn()
  const hasSpy: jest.Mock = jest.fn()

  beforeAll(() => {
    hasSpy.mockReturnValue(true)
    getConnectionManagerSpy.mockReturnValue({ has: hasSpy })
    mocked(getConnectionManager).mockImplementation(getConnectionManagerSpy)
    mocked(createConnection).mockImplementation(createConnectionSpy)
    getConnectionSpy.mockReturnValue({ close: closeSpy })
    mocked(getConnection).mockImplementation(getConnectionSpy)
  })

  beforeEach(() => {
    sut = PgConnection.getInstance()
  })

  it('Should have only one instance', () => {
    expect(sut).toBe(PgConnection.getInstance())
  })

  it('Should create a new connection', async () => {
    hasSpy.mockReturnValueOnce(false)

    await sut.connect()

    expect(createConnectionSpy).toHaveBeenCalled()
    expect(createConnectionSpy).toHaveBeenCalledTimes(1)
  })

  it('Should use an existing connection', async () => {
    await sut.connect()

    expect(getConnectionSpy).toHaveBeenCalled()
    expect(getConnectionSpy).toHaveBeenCalledTimes(1)
  })

  it('Should close connection', async () => {
    await sut.connect()
    await sut.disconnect()

    expect(closeSpy).toHaveBeenCalledWith()
    expect(closeSpy).toHaveBeenCalledTimes(1)
  })
})
