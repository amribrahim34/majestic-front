import ProductSearchView from '@/views/Books/ProductSearchView.vue'
import BookDetailsView from '@/views/Books/BookDetailsView.vue'

const books = [
  {
    path: '/books',
    name: 'BookSearch',
    component: ProductSearchView
  },
  {
    path: '/books/:id',
    name: 'BookDetails',
    component: BookDetailsView,
    props: true
  }
]

export default books
