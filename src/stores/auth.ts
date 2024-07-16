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
        await this.transferGuestCart() // Add this line
      } catch (error) {
        throw new Error(error instanceof Error ? error.message : 'An unknown error occurred')
      }
    },
    async handleSignup(user: Omit<User, 'id'>) {
      try {
        const response = await api.post('/signup', user)
        this.userData = response.data
        this.setToken(response.data?.token)
        await this.transferGuestCart() // Add this line
      } catch (error) {
        throw new Error(error instanceof Error ? error.message : 'An unknown error occurred')
      }
    },
    async initializeAuth() {
      this.isInitialized = false // Reset initialization state
      const token = localStorage.getItem('auth_token')

      if (!token) {
        this.handleLogout() // Ensure user is logged out if no token exists
        this.isInitialized = true
        return
      }

      try {
        // Set the token in the API instance
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`

        const response = await api.get('/user')

        if (response.data) {
          this.userData = response.data
          this.setToken(token) // Ensure token is set in the store
        } else {
          throw new Error('User data not found')
        }
      } catch (error) {
        console.error('Failed to initialize auth:', error)
        this.handleLogout() // Clear any invalid session data

        // Optionally, you can handle specific error cases here
        // For example, if the error is due to an expired token, you might want to refresh it
        // if (error.response && error.response.status === 401) {
        //   await this.refreshToken()
        // }
      } finally {
        this.isInitialized = true
      }
    },
    handleLogout() {
      this.userData = null
      localStorage.removeItem('auth_token')
      delete api.defaults.headers.common['Authorization']
      // Any other cleanup needed
    },
    setUser(user: User) {
      console.log('Setting user:', user)
      this.userData = user
    },
    setToken(token: string) {
      console.log('Setting token:', token)
      localStorage.setItem('auth_token', token)
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`
    },
    async handleSocialLogin(userData: User) {
      this.userData = userData
      if (userData.token) {
        this.setToken(userData.token)
      }
    },

    async handleSocialLoginCallback(queryParams: string) {
      console.log('Handling social login callback')
      const params = new URLSearchParams(queryParams)
      const token = params.get('token')
      const userJson = params.get('user')

      if (token && userJson) {
        try {
          const user = JSON.parse(decodeURIComponent(userJson))
          this.setUser(user)
          this.setToken(token)
          await this.transferGuestCart()
          return true
        } catch (error) {
          console.error('Error processing social login callback:', error)
          return false
        }
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
    },
    async transferGuestCart() {
      console.log('Transferring guest cart')
      if (this.isLoggedIn) {
        try {
          const response = await api.post('/cart/transfer')
          console.log('Cart transfer response:', response.data)
          // You might want to update the cart store here
        } catch (error) {
          console.error('Failed to transfer guest cart:', error)
        }
      }
    }
  }
})
