import { RouteRecordRaw } from 'vue-router'
import books from './books'
import orders from './orders'
import carts from './carts'
import blog from './blog'
import requireGuest from '@/utils/requireGuest'
import AuthCallback from '@/components/AuthCallback.vue'

const routes: Array<RouteRecordRaw> = [
  ...books,
  ...orders,
  ...carts,
  ...blog,
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/HomeView.vue'),
    meta: {
      title: 'Home Page -  majestic-minds bookstore',
      metaTags: [
        {
          name: 'description',
          content: 'Welcome to our online  majestic-minds bookstore.'
        },
        {
          property: 'og:description',
          content: 'Welcome to our online  majestic-minds bookstore.'
        }
      ]
    }
  },
  // Add all your other routes here
  //   {
  //     path: '/:pathMatch(.*)*',
  //     name: 'NotFound',
  //     component: () => import('@/views/NotFoundView.vue'),
  //     meta: {
  //       title: '404 Not Found - majestic-minds bookstore'
  //     }
  //   },
  {
    path: '/auth/callback',
    name: 'AuthCallback',
    component: AuthCallback
  },
  {
    path: '/terms',
    name: 'TermsAndConditions',
    component: () => import('@/views/TermsAndConditions.vue')
  },
  {
    path: '/privacy-policy',
    name: 'PrivacyPolicies',
    component: () => import('@/views/PrivacyPolicy.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/LoginView.vue'),
    beforeEnter: requireGuest,
    meta: {
      title: 'Login - majestic-minds bookstore'
    }
  },
  {
    path: '/signup',
    name: 'Signup',
    component: () => import('@/views/SignupView.vue'),
    beforeEnter: requireGuest,
    meta: {
      title: 'Sign Up - majestic-minds bookstore'
    }
  },
  {
    path: '/request-book',
    name: 'RequestBook',
    component: () => import('@/views/RequestBookView.vue'),
    meta: {
      title: 'Request a Book - majestic-minds bookstore'
    }
  },
  {
    path: '/reset-password',
    name: 'ResetPassword',
    component: () => import('@/views/ResetPasswordView.vue'),
    beforeEnter: requireGuest,
    meta: {
      title: 'Reset Password - majestic-minds bookstore'
    }
  },
  {
    path: '/new-password',
    name: 'NewPassword',
    component: () => import('@/views/NewPasswordView.vue'),
    meta: {
      title: 'New Password - majestic-minds bookstore'
    }
  },
  {
    path: '/account-details',
    name: 'AccountDetails',
    component: () => import('@/views/AccountDetailsView.vue'),
    meta: {
      title: 'Account Details - majestic-minds bookstore'
    }
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/views/AboutUsView.vue'),
    meta: {
      title: 'About Us - majestic-minds bookstore'
    }
  }
]

export default routes
