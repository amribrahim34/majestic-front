// types.ts
export interface BookOrder {
  id: string
  book: string
  status: 'Pending' | 'Processing' | 'Delivered'
  estimatedDelivery?: string
  deliveredOn?: string
}
