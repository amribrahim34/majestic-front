import ProductSearchView from '@/views/Books/ProductSearchView.vue'
import ProductDetailsView from '@/views/Books/ProductDetailsView.vue'

const books = [
  {
    path: '/books',
    name: 'BookSearch',
    component: ProductSearchView
  },
  {
    path: '/books/details',
    name: 'BookDetails',
    component: ProductDetailsView
  }
]

export default books
