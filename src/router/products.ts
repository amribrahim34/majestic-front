import ProductSearchView from '@/views/Books/ProductSearchView.vue'
import ProductDetailsView from '@/views/Books/ProductDetailsView.vue'

const products = [
  {
    path: '/product/search',
    name: 'ProductSearch',
    component: ProductSearchView
  },
  {
    path: '/product/details',
    name: 'ProductDetails',
    component: ProductDetailsView
  }
]

export default products
