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
import * as Sentry from '@sentry/vue'

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

// Sentry.init({
//   app,
//   dsn: 'https://c2cd34870c0418b346a54b76b996d569@o4507680738836480.ingest.de.sentry.io/4507680812695632',
//   integrations: [Sentry.browserTracingIntegration(), Sentry.replayIntegration()],
//   // Performance Monitoring
//   tracesSampleRate: 1.0, //  Capture 100% of the transactions
//   // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
//   tracePropagationTargets: ['localhost', 'majesticminds.net'],
//   // Session Replay
//   replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
//   replaysOnErrorSampleRate: 1.0 // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
// })

interface MetaInfo {
  title?: string
  titleTemplate?: string
  description?: string
  url?: string
  [key: string]: any // For any additional properties
}

app.use(
  createMetaManager(undefined, (metaInfo: MetaInfo) => {
    const title = metaInfo.title || 'Majestic Minds Bookstore'
    const description =
      metaInfo.meta?.find((m) => m.name === 'description')?.content ||
      'Discover a world of knowledge at Majestic Minds Bookstore. Browse our vast collection of books across all genres and expand your horizons.'

    return {
      title: title,
      titleTemplate: '%s | Majestic Minds Bookstore',
      meta: [
        { name: 'description', content: description },
        {
          name: 'keywords',
          content: 'books, bookstore, reading, literature, education, knowledge'
        },
        { property: 'og:title', content: title },
        { property: 'og:description', content: description },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: metaInfo.url },
        { property: 'og:site_name', content: 'Majestic Minds Bookstore' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: title },
        { name: 'twitter:description', content: description },
        { name: 'robots', content: 'index, follow' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { 'http-equiv': 'Content-Type', content: 'text/html; charset=utf-8' }
      ],
      link: [
        { rel: 'canonical', href: metaInfo.url },
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ],
      script: [
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BookStore',
            name: 'Majestic Minds Bookstore',
            description: description,
            url: metaInfo.url
            // Add more structured data as needed
          })
        }
      ]
    }
  })
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
