export type Order = {
  id: string
  trackingCode: string
  deliveryStatus: DeliveryStatus[]
  updatedAt: Date
  createdAt: Date
}

type DeliveryStatus = {
  id: string
  name: string
}
