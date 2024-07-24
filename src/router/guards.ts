import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import { isAuthenticated } from '@/utils/auth'
import { generateMetaTags } from '@/utils/metaTags'

export async function beforeEach(
  to: RouteLocationNormalized,
  _from: RouteLocationNormalized,
  next: NavigationGuardNext
): Promise<void> {
  // Set document title
  document.title = (to.meta.title as string) || 'majestic-minds bookstore'

  // Generate and set meta tags
  const metaTags = generateMetaTags(to)
  updateMetaTags(metaTags)

  // Authentication check
  if (to.meta.requiresAuth && !isAuthenticated()) {
    next({ name: 'Login', query: { redirect: to.fullPath } })
  } else {
    next()
  }
}

function updateMetaTags(metaTags: any[]): void {
  // Remove existing meta tags
  document.querySelectorAll('meta').forEach((tag) => {
    if (tag.getAttribute('data-vue-router-controlled') !== null) {
      tag.parentNode?.removeChild(tag)
    }
  })

  // Add new meta tags
  metaTags.forEach((tagDef) => {
    const tag = document.createElement('meta')
    Object.keys(tagDef).forEach((key) => {
      tag.setAttribute(key, tagDef[key])
    })
    tag.setAttribute('data-vue-router-controlled', '')
    document.head.appendChild(tag)
  })
}

export function onError(error: any): void {
  if (error.name === 'NavigationDuplicated') {
    return
  }
  console.error('Router error:', error)
}
