export type Order = {
  id: string
  trackingCode: string
  deliveryStatus: DeliveryStatus[]
}

type DeliveryStatus = {
  id: string
  name: string
}
