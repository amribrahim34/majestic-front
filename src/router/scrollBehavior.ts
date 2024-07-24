import { RouteLocationNormalized, RouterScrollBehavior } from 'vue-router'

const scrollBehavior: RouterScrollBehavior = (
  to: RouteLocationNormalized,
  _from: RouteLocationNormalized,
  savedPosition
) => {
  if (savedPosition) {
    // If there's a saved position (e.g., when using browser back/forward buttons),
    // scroll to that position
    return savedPosition
  } else if (to.hash) {
    // If the new route has a hash, scroll to that element
    return { el: to.hash, behavior: 'smooth' }
  } else {
    // Otherwise, scroll to the top of the page
    return { top: 0, behavior: 'smooth' }
  }
}

export default scrollBehavior
