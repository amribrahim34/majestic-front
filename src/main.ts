import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faGoogle, faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { useLoginStore } from './stores/auth' // Import your login store

library.add(faGoogle, faFacebook, faTwitter)

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

app.component('font-awesome-icon', FontAwesomeIcon)

// Check authentication before mounting the app
const loginStore = useLoginStore(pinia)
loginStore.checkAuthStatus().then(() => {
  app.mount('#app')
})
