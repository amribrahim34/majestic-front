import type { Book } from './Book'

export interface CartItem {
  id: number
  book_id: number
  quantity: number
  book: Book
}
