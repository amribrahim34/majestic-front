import AllOrdersView from '@/views/Orders/AllOrdersView.vue'
import requireAuth from '@/utils/requireAuth'

const orders = [
  {
    path: '/orders',
    name: 'all-orders',
    component: AllOrdersView,
    beforeEnter: requireAuth
  },
  {
    path: '/orders/:id',
    name: 'order-details',
    // component: SingleOrderView,
    beforeEnter: requireAuth,
    props: true
  }
]

export default orders
