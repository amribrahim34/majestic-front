export interface Review {
  id: string | number
  rating: number
  name: string
  title: string
  content: string
  date: string
  verified: boolean // Whether the reviewer is a verified purchaser
  helpfulVotes: number // Number of people who found this review helpful
  productId: string | number // ID of the product being reviewed
}
