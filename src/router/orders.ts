import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import AllOrdersView from '@/views/Orders/AllOrdersView.vue'
import { useLoginStore } from '@/stores/auth' // Adjust the import path as needed

const requireAuth = (to: RouteLocationNormalized, next: NavigationGuardNext) => {
  const loginStore = useLoginStore()
  if (loginStore.isLoggedIn) {
    next()
  } else {
    next({ name: 'login', query: { redirect: to.fullPath } })
  }
}

const orders = [
  {
    path: '/orders',
    name: 'all-orders',
    component: AllOrdersView,
    beforeEnter: requireAuth
  }
]

export default orders
