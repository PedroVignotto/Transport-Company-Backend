import { DeliveryStatus } from '.'

import { Entity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable } from 'typeorm'

@Entity('orders')
export class Order {
  @PrimaryColumn()
  id!: string

  @Column({ unique: true })
  trackingCode!: string

  @ManyToMany(() => DeliveryStatus)
  @JoinTable({ name: 'ordersDeliveryStatus', joinColumns: [{ name: 'orderId' }], inverseJoinColumns: [{ name: 'deliveryStatusId' }] })
  deliveryStatus!: DeliveryStatus[]

  @UpdateDateColumn()
  updatedAt!: Date

  @CreateDateColumn()
  createdAt!: Date
}
