import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateOrdersDeliveryStatus1656711545675 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'ordersDeliveryStatus',
        columns: [
          { name: 'orderId', type: 'uuid' },
          { name: 'deliveryStatusId', type: 'uuid' },
          { name: 'createdAt', type: 'timestamp', default: 'now()' }
        ],
        foreignKeys: [
          {
            name: 'FKOrderDeliveryStatus',
            referencedTableName: 'orders',
            referencedColumnNames: ['id'],
            columnNames: ['orderId'],
            onDelete: 'SET NULL',
            onUpdate: 'SET NULL'
          },
          {
            name: 'FKDeliveryStatusOrder',
            referencedTableName: 'deliveryStatus',
            referencedColumnNames: ['id'],
            columnNames: ['deliveryStatusId'],
            onDelete: 'SET NULL',
            onUpdate: 'SET NULL'
          }
        ]
      })
    )
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('ordersDeliveryStatus')
  }
}
