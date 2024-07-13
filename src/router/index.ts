import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import SignupView from '@/views/SignupView.vue'
import ResetPasswordView from '@/views/ResetPasswordView.vue'
import NewPasswordView from '@/views/NewPasswordView.vue'
import RequestBookView from '@/views/RequestBookView.vue'
import AccountDetailsView from '@/views/AccountDetailsView.vue'
import AuthCallback from '@/components/AuthCallback.vue'

import books from './books'
// import carts from './carts'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...books,
    // ...carts,
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/auth/callback',
      name: 'AuthCallback',
      component: AuthCallback
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginView
    },
    {
      path: '/signup',
      name: 'Signup',
      component: SignupView
    },
    {
      path: '/request-book',
      name: 'RequestBook',
      component: RequestBookView
    },
    {
      path: '/reset-password',
      name: 'ResetPassword',
      component: ResetPasswordView
    },
    {
      path: '/new-password',
      name: 'NewPassword',
      component: NewPasswordView
    },
    {
      path: '/account-details',
      name: 'AccountDetails',
      component: AccountDetailsView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutUsView.vue')
    }
  ]
})

export default router
