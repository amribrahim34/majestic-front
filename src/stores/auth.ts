import { defineStore } from 'pinia'
import api from '@/api'
import type { User } from '@/types/user'

export const useLoginStore = defineStore('login', {
  state: () => ({
    userData: null as User | null,
    isInitialized: false
  }),
  getters: {
    isLoggedIn: (state) => !!state.userData
  },
  actions: {
    async handleLogin(email: string, password: string) {
      try {
        const response = await api.post('/login', { email, password })
        this.userData = response.data
        this.setToken(response.data?.token)
      } catch (error) {
        throw new Error(error instanceof Error ? error.message : 'An unknown error occurred')
      }
    },
    async handleSignup(user: Omit<User, 'id'>) {
      try {
        const response = await api.post('/signup', user)
        this.userData = response.data
        this.setToken(response.data?.token)
      } catch (error) {
        throw new Error(error instanceof Error ? error.message : 'An unknown error occurred')
      }
    },
    async initializeAuth() {
      const token = localStorage.getItem('auth_token')
      if (token) {
        try {
          const response = await api.get('/user')
          this.userData = response.data
        } catch (error) {
          console.error('Failed to initialize auth:', error)
          this.handleLogout()
        }
      }
      this.isInitialized = true
    },
    handleLogout() {
      this.userData = null
      localStorage.removeItem('auth_token')
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
        this.setToken(userData.token)
      }
    },
    async handleSocialLoginCallback(queryParams: string) {
      const params = new URLSearchParams(queryParams)
      const token = params.get('token')
      const userJson = params.get('user')
      console.log('this is the social login', JSON.stringify(userJson))

      if (token && userJson) {
        const user = JSON.parse(userJson)
        this.setUser(user)
        this.setToken(token)
        return true
      }
      return false
    },
    async checkAuthStatus() {
      const token = localStorage.getItem('auth_token')
      if (token) {
        try {
          const response = await api.get('/user', {
            headers: { Authorization: `Bearer ${token}` }
          })
          this.setUser(response.data)
          return true
        } catch (error) {
          this.handleLogout()
          return false
        }
      }
      return false
    }
  }
})
