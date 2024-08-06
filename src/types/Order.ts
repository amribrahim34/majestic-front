import { OrderItem } from './OrderItem'

export interface Order {
  id: number
  user_id: number
  order_date: string
  shipping_address: string
  city: string
  country: string
  total_amount: string
  status: string
  shipment_tracking_number: string | null
  created_at: string
  updated_at: string
  shipping_cost: string
  items: OrderItem[]
}
