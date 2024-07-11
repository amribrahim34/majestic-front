import type { Author } from './Author'
import type { Category } from './Category'
import type { Language } from './Language'
import type { Publisher } from './Publisher'

export interface Book {
  id: number
  title: string
  category_id: number
  publisher_id: number
  publication_date: string
  language_id: number
  isbn10: string
  isbn13: string
  num_pages: number
  dimensions: string
  weight: string
  format: string
  price: number
  stock_quantity: number
  description: string
  img: string
  created_at?: string
  updated_at?: string
  image?: string

  // Relations
  authors?: Author[]
  category?: Category
  publisher?: Publisher
  language?: Language
}
