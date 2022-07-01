import { generateRandomRepository } from '@/tests/mocks'
import { PgConnection } from '@/infra/repositories/postgres/helpers'
import { ConnectionNotFoundError } from '@/infra/repositories/postgres/errors'

import { createConnection, Entity, getConnection, getConnectionManager, getRepository } from 'typeorm'
import { mocked } from 'jest-mock'

jest.mock('typeorm', () => ({
  Entity: jest.fn(),
  PrimaryColumn: jest.fn(),
  Column: jest.fn(),
  CreateDateColumn: jest.fn(),
  createConnection: jest.fn(),
  getConnection: jest.fn(),
  getConnectionOptions: jest.fn(),
  getConnectionManager: jest.fn(),
  getRepository: jest.fn()
}))

describe('PgConnection', () => {
  let sut: PgConnection

  const repositorySpy: string = generateRandomRepository()
  const getConnectionManagerSpy: jest.Mock = jest.fn()
  const createConnectionSpy: jest.Mock = jest.fn()
  const getConnectionSpy: jest.Mock = jest.fn()
  const getRepositorySpy: jest.Mock = jest.fn()
  const closeSpy: jest.Mock = jest.fn()
  const hasSpy: jest.Mock = jest.fn()

  beforeAll(() => {
    hasSpy.mockReturnValue(true)
    getConnectionManagerSpy.mockReturnValue({ has: hasSpy })
    mocked(getConnectionManager).mockImplementation(getConnectionManagerSpy)
    mocked(createConnection).mockImplementation(createConnectionSpy)
    getConnectionSpy.mockReturnValue({ close: closeSpy })
    mocked(getConnection).mockImplementation(getConnectionSpy)
    getRepositorySpy.mockReturnValue(repositorySpy)
    mocked(getRepository).mockImplementation(getRepositorySpy)
  })

  beforeEach(() => {
    sut = PgConnection.getInstance()
  })

  afterAll(async () => {
    await sut.disconnect()
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

  it('Should return ConnectionNotFoundError on disconnect if connection is not found', async () => {
    const promise = sut.disconnect()

    expect(closeSpy).not.toHaveBeenCalled()
    await expect(promise).rejects.toThrow(new ConnectionNotFoundError())
  })

  it('Should get repository', async () => {
    await sut.connect()

    const repository = sut.getRepository(Entity)

    expect(repository).toBe(repositorySpy)
    expect(getRepositorySpy).toHaveBeenCalledWith(Entity)
    expect(getRepositorySpy).toHaveBeenCalledTimes(1)
  })
})
