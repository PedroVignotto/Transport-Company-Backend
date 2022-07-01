import { Entity, Column, PrimaryColumn } from 'typeorm'

@Entity('deliveryStatus')
export class DeliveryStatus {
  @PrimaryColumn()
  id!: string

  @Column({ unique: true })
  name!: string
}
