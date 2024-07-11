import { defineStore } from 'pinia'
import api from '@/api'
import type { User } from '@/types/user'

export const useLoginStore = defineStore('login', {
  state: () => ({
    userData: null as User | null
  }),
  getters: {
    isLoggedIn: (state) => !!state.userData
  },
  actions: {
    async handleLogin(email: string, password: string) {
      await api
        .post('/login', { email, password })
        .then((response) => {
          this.userData = response.data
          localStorage.setItem('auth_token', response.data?.token)
        })
        .catch((error) => {
          throw new Error(error)
        })
    },
    async handleSignup(user: Omit<User, 'id'>) {
      await api
        .post('/signup', user)
        .then((response) => {
          this.userData = response.data
          localStorage.setItem('auth_token', response.data?.token)
        })
        .catch((error) => {
          throw new Error(error)
        })
    },
    handleLogout() {
      this.userData = null
    },
    setUser(user: User) {
      this.userData = user
    },
    setToken(token: string) {
      localStorage.setItem('auth_token', token)
    },
    async handleSocialLogin(userData: User) {
      this.userData = userData
      if (userData.token) {
        localStorage.setItem('auth_token', userData.token)
      }
    }
  }
})
