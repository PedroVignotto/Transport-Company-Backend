import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateOrders1656711090175 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'orders',
        columns: [
          { name: 'id', type: 'uuid', isPrimary: true },
          { name: 'trackingCode', type: 'varchar' }
        ]
      })
    )
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('orders')
  }
}
