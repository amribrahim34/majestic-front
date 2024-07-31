import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from '@/api'
import type { User } from '@/types/user'
import axios from 'axios'

export const useLoginStore = defineStore('login', () => {
  // State
  const userData = ref<User | null>(null)
  const isInitialized = ref(false)
  const errors = ref<null | [] | Error>(null)
  const successMessage = ref<string | null>(null)
  const errorMessage = ref<string | null>(null)

  // Computed
  const isLoggedIn = computed(() => !!userData.value)

  // Private Methods
  function setToken(token: string) {
    localStorage.setItem('auth_token', token)
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`
  }

  function clearAuthData() {
    userData.value = null
    localStorage.removeItem('auth_token')
    delete api.defaults.headers.common['Authorization']
  }

  // Public Methods
  async function handleLogin(email: string, password: string) {
    try {
      const response = await api.post('/login', { email, password })
      userData.value = response.data
      setToken(response.data?.token)
      successMessage.value = 'Login successful!'
      errorMessage.value = null
      // await transferGuestCart();
    } catch (error) {
      handleError(error, 'An error occurred during login.')
    }
  }

  async function handleSignup(user: User) {
    try {
      const response = await api.post('/register', user)
      userData.value = response.data
      setToken(response.data?.token)
      successMessage.value = 'Signup successful!'
      errorMessage.value = null
      // await transferGuestCart();
    } catch (error) {
      handleError(error, 'An error occurred during signup.')
    }
  }

  async function initializeAuth() {
    isInitialized.value = false
    const token = localStorage.getItem('auth_token')

    if (!token) {
      clearAuthData()
      isInitialized.value = true
      return
    }

    try {
      setToken(token)
      const response = await api.get('/user')
      if (response.data) {
        userData.value = response.data
      } else {
        throw new Error('User data not found')
      }
    } catch (error) {
      console.error('Failed to initialize auth:', error)
      clearAuthData()
    } finally {
      isInitialized.value = true
    }
  }

  function handleLogout() {
    clearAuthData()
  }

  function setUser(user: User) {
    userData.value = user
  }

  async function handleSocialLogin(user: User) {
    userData.value = user
    if (user.token) {
      setToken(user.token)
    }
  }

  async function updateUserField(field: string, value: string) {
    try {
      const response = await api.patch('/user', { [field]: value })
      if (response.data) {
        setUser(response.data)
      }
    } catch (error) {
      console.error('Failed to update user field:', error)
      throw error
    }
  }

  async function loginWithProvider(provider: string) {
    try {
      const response = await api.get(`/auth/${provider}`)
      if (response.data.url) {
        window.location.href = response.data.url
      }
    } catch (error) {
      console.error(`Error logging in with ${provider}:`, error)
    }
  }

  async function handleSocialLoginCallback(queryParams: string) {
    console.log('Handling social login callback')
    const params = new URLSearchParams(queryParams)
    const token = params.get('token')
    const userJson = params.get('user')

    if (token && userJson) {
      try {
        const user = JSON.parse(decodeURIComponent(userJson))
        setUser(user)
        setToken(token)
        // await transferGuestCart();
        return true
      } catch (error) {
        console.error('Error processing social login callback:', error)
        return false
      }
    }
    return false
  }

  async function checkAuthStatus() {
    const token = localStorage.getItem('auth_token')
    if (token) {
      try {
        const response = await api.get('/user', {
          headers: { Authorization: `Bearer ${token}` }
        })
        setUser(response.data)
        return true
      } catch (error) {
        handleLogout()
        return false
      }
    }
    return false
  }

  async function transferGuestCart() {
    console.log('Transferring guest cart')
    if (isLoggedIn.value) {
      try {
        const response = await api.post('/cart/transfer')
        console.log('Cart transfer response:', response.data)
      } catch (error) {
        console.error('Failed to transfer guest cart:', error)
      }
    }
  }

  function handleError(error: unknown, defaultMessage: string) {
    if (axios.isAxiosError(error) && error.response) {
      errorMessage.value = error.response.data.message || defaultMessage
    } else {
      errorMessage.value = 'An unknown error occurred'
    }
    errors.value = error as Error | [] | null
    successMessage.value = null
    if (errorMessage.value === null) {
      throw new Error('An unexpected error occurred') // Provide a default error message
    } else {
      throw new Error(errorMessage.value)
    }
  }

  return {
    userData,
    isInitialized,
    isLoggedIn,
    errors,
    successMessage,
    errorMessage,
    loginWithProvider,
    handleLogin,
    handleSignup,
    initializeAuth,
    handleLogout,
    setUser,
    handleSocialLogin,
    handleSocialLoginCallback,
    checkAuthStatus,
    updateUserField,
    transferGuestCart
  }
})
