import { createConnection } from 'typeorm'

export class PgConnection {
  private static instance?: PgConnection

  private constructor () {}

  static getInstance (): PgConnection {
    if (!this.instance) this.instance = new PgConnection()
    return this.instance
  }

  async connect (): Promise<void> {
    await createConnection()
  }
}
