import { DeliveryStatus } from '.'

import { Entity, Column, PrimaryColumn, ManyToMany, JoinTable } from 'typeorm'

@Entity('orders')
export class Order {
  @PrimaryColumn()
  id!: string

  @Column({ unique: true })
  trackingCode!: string

  @ManyToMany(() => DeliveryStatus)
  @JoinTable({ name: 'ordersDeliveryStatus', joinColumns: [{ name: 'orderId' }], inverseJoinColumns: [{ name: 'deliveryStatusId' }] })
  deliveryStatus!: DeliveryStatus[]
}
