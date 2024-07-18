import Cart from '@/views/Cart.vue'
import CheckoutView from '@/views/CheckoutView.vue'

const carts = [
  {
    path: '/cart',
    name: 'Cart',
    component: Cart
  },
  {
    path: '/checkout',
    name: 'checkout',
    component: CheckoutView
  }
]

export default carts
