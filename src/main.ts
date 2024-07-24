import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { i18n } from '@/i18n'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faGoogle, faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faShoppingCart,
  faUserCircle,
  faTrashAlt,
  faMinus,
  faPlus
} from '@fortawesome/free-solid-svg-icons'
import { createMetaManager } from 'vue-meta'

library.add(
  faGoogle,
  faFacebook,
  faTwitter,
  faShoppingCart,
  faUserCircle,
  faTrashAlt,
  faMinus,
  faPlus
)

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(i18n)

interface MetaInfo {
  title?: string
  description?: string
  url?: string
  [key: string]: any // For any additional properties
}

app.use(
  createMetaManager(
    {
      // Config options if needed
    },
    (metaInfo: MetaInfo) => {
      return {
        title: metaInfo.title,
        meta: [
          { name: 'description', content: metaInfo.description },
          { property: 'og:title', content: metaInfo.title },
          { property: 'og:description', content: metaInfo.description }
        ],
        link: [{ rel: 'canonical', href: metaInfo.url }]
      }
    }
  )
)

app.component('font-awesome-icon', FontAwesomeIcon)

// Set up a global navigation guard
router.beforeEach(async (_to, _from, next) => {
  const loginStore = useLoginStore()
  if (!loginStore.isInitialized) {
    await loginStore.initializeAuth()
  }

  // Add your navigation guard logic here
  // For example:
  // if (to.meta.requiresAuth && !loginStore.isLoggedIn) {
  //   next('/login')
  // } else {
  //   next()
  // }
  next()
})

app.mount('#app')

// Check authentication status after mounting
import { useLoginStore } from './stores/auth'
const loginStore = useLoginStore()
loginStore.checkAuthStatus().catch((error) => {
  console.error('Failed to check authentication status:', error)
  // You might want to show a notification to the user or handle the error in some way
})
