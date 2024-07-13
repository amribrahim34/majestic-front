import type { CartItem } from './CartItem'

export interface Cart {
  items: CartItem[]
  total: number
  loading: boolean
  error: string | null
}
