// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class PgConnection {
  private static instance?: PgConnection

  private constructor () {}

  static getInstance (): PgConnection {
    if (!this.instance) this.instance = new PgConnection()
    return this.instance
  }
}
