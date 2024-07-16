import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faGoogle, faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { useLoginStore } from './stores/auth'
import {
  faShoppingCart,
  faUserCircle,
  faTrashAlt,
  faMinus,
  faPlus
} from '@fortawesome/free-solid-svg-icons'

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

app.component('font-awesome-icon', FontAwesomeIcon)

// Mount the app immediately
app.mount('#app')

// Check authentication status after mounting
const loginStore = useLoginStore(pinia)
loginStore.checkAuthStatus().catch((error) => {
  console.error('Failed to check authentication status:', error)
  // You might want to show a notification to the user or handle the error in some way
})

// Optional: Set up a global navigation guard
router.beforeEach(async (_to, _from, next) => {
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
