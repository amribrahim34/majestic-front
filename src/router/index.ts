import { createRouter, createWebHistory, Router } from 'vue-router'
import routes from './routes'
import { beforeEach, onError } from './guards'
import scrollBehavior from './scrollBehavior'

const router: Router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior
})

router.beforeEach(beforeEach)
router.onError(onError)

export default router
