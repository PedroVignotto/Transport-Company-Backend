import { createConnection, getConnection, getConnectionManager, getConnectionOptions } from 'typeorm'

export class PgConnection {
  private static instance?: PgConnection

  private constructor () {}

  static getInstance (): PgConnection {
    if (!this.instance) this.instance = new PgConnection()
    return this.instance
  }

  async connect (): Promise<void> {
    const defaultOptions = await getConnectionOptions()
    const options = { ...defaultOptions, host: 'postgres' }
    getConnectionManager().has('default') ? getConnection() : await createConnection(options)
  }
}
