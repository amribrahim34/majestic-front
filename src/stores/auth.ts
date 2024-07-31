import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from '@/api'
import type { User } from '@/types/user'
import axios from 'axios'

export const useLoginStore = defineStore('login', () => {
  const userData = ref<User | null>(null)
  const isInitialized = ref(false)
  const errors = ref<null | [] | Error>(null)
  const successMessage = ref<string | null>(null)
  const errorMessage = ref<string | null>(null)
  const isLoggedIn = computed(() => !!userData.value)

  async function handleLogin(email: string, password: string) {
    try {
      const response = await api.post('/login', { email, password })
      userData.value = response.data
      setToken(response.data?.token)
      successMessage.value = 'Login successful!'
      errorMessage.value = null
      // await transferGuestCart()
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        errorMessage.value = error.response.data.message || 'An error occurred during login.'
      } else {
        errorMessage.value = 'An unknown error occurred'
      }
      errors.value = error as Error | [] | null
      successMessage.value = null
      if (errorMessage.value === null) {
        throw new Error('An unexpected error occurred')
      } else {
        throw new Error(errorMessage.value)
      }
    }
  }

  async function handleSignup(user: User) {
    try {
      const response = await api.post('/register', user)
      userData.value = response.data
      setToken(response.data?.token)
      successMessage.value = 'Signup successful!'
      errorMessage.value = null
      // await transferGuestCart()
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        errorMessage.value = error.response.data.message || 'An error occurred '
      } else {
        errorMessage.value = 'An unknown error occurred'
      }
      errors.value = error as Error | [] | null
      successMessage.value = null
      if (errorMessage.value === null) {
        throw new Error('An unexpected error occurred')
      } else {
        throw new Error(errorMessage.value)
      }
    }
  }

  async function initializeAuth() {
    isInitialized.value = false
    const token = localStorage.getItem('auth_token')

    if (!token) {
      handleLogout()
      isInitialized.value = true
      return
    }

    try {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`
      const response = await api.get('/user')

      if (response.data) {
        userData.value = response.data
        setToken(token)
      } else {
        throw new Error('User data not found')
      }
    } catch (error) {
      console.error('Failed to initialize auth:', error)
      handleLogout()
    } finally {
      isInitialized.value = true
    }
  }

  function handleLogout() {
    userData.value = null
    localStorage.removeItem('auth_token')
    delete api.defaults.headers.common['Authorization']
  }

  function setUser(user: User) {
    console.log('Setting user:', user)
    userData.value = user
  }

  function setToken(token: string) {
    console.log('Setting token:', token)
    localStorage.setItem('auth_token', token)
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`
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
        const user = response.data
        setUser(user)
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
        // await transferGuestCart()
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
    setToken,
    handleSocialLogin,
    handleSocialLoginCallback,
    checkAuthStatus,
    updateUserField,
    transferGuestCart
  }
})
