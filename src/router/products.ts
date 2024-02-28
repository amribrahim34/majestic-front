// src/router/routes.js
import ProductSearchView from '@/views/Books/ProductSearchView.vue'
// ... import other views

const products = [
  {
    path: '/product/search',
    name: 'ProductSearch',
    component: ProductSearchView
  }
]

export default products
