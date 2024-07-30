import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import { useLoginStore } from '@/stores/auth' // Adjust the import path as needed

const requireAuth = (
  to: RouteLocationNormalized,
  _from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  const loginStore = useLoginStore()
  if (loginStore.isLoggedIn) {
    next()
  } else {
    next({ name: 'Signup', query: { redirect: to.fullPath } })
  }
}

export default requireAuth
