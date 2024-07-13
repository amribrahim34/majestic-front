export interface CartItem {
  id: number
  book_id: number
  quantity: number
  book: {
    id: number
    title: string
    price: number
    // Add other book properties as needed
  }
}
