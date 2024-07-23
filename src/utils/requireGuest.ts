import { useLoginStore } from '@/stores/auth'
import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'

const requireGuest = (
  _to: RouteLocationNormalized,
  _from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  const loginStore = useLoginStore()
  if (!loginStore.isLoggedIn) {
    next()
  } else {
    next({ name: 'BookSearch' })
  }
}

export default requireGuest
