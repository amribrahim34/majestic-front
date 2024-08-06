import { Book } from './Book'

export interface OrderItem {
  id: number
  order_id: number
  book_id: number
  title: string
  isbn13: string
  quantity: number
  price: string
  discount: string | null
  book: Book
  created_at: string
  updated_at: string
}
