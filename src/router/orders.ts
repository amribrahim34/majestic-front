import AllOrdersView from '@/views/Orders/AllOrdersView.vue'
import requireAuth from '@/utils/requireAuth'
import OrderDetailsView from '@/views/Orders/OrderDetails.vue'

const orders = [
  {
    path: '/orders',
    name: 'all-orders',
    component: AllOrdersView,
    beforeEnter: requireAuth
  },
  {
    path: '/orders/:id',
    name: 'OrderDetails',
    component: OrderDetailsView,
    beforeEnter: requireAuth,
    props: true
  }
]

export default orders
