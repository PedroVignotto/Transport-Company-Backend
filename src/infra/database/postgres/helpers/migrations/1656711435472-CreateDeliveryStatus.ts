import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateDeliveryStatus1656711435472 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'deliveryStatus',
        columns: [
          { name: 'id', type: 'uuid', isPrimary: true },
          { name: 'name', type: 'varchar' },
          { name: 'createdAt', type: 'timestamp', default: 'now()' }
        ]
      })
    )
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('deliveryStatus')
  }
}
