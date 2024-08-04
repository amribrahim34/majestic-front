import axios, { AxiosError, type AxiosInstance } from 'axios'
// import 'dotenv/config'
import { API_BASE_URL, API_TIMEOUT } from './config'

// require('dotenv').config()
import.meta.env.VITE_API_BASE_URL
// Use an environment variable for the base URL

const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT, // Optional: sets timeout to 10 seconds
  withCredentials: true, // Important for handling cookies/sessions
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    Accept: 'application/json',
    'X-Requested-With': 'XMLHttpRequest' // This header is often expected by Laravel
  }
})

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = document.head.querySelector('meta[name="csrf-token"]')
    if (token) {
      config.headers['X-CSRF-TOKEN'] = (token as HTMLMetaElement).content
    }

    const authToken = localStorage.getItem('auth_token')
    if (authToken) {
      config.headers['Authorization'] = `Bearer ${authToken}`
    }

    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config
    if (!originalRequest) return Promise.reject(error)

    if (error.response) {
      switch (error.response.status) {
        case 401:
          console.log('Unauthorized access')
          localStorage.removeItem('auth_token')
          // Redirect to login page or refresh token logic here
          break
        case 403:
          console.log('Forbidden')
          break
        case 404:
          console.log('Not found')
          break
        case 422:
          console.log('Validation error', error.response.data)
          break
        case 429:
          // Rate limiting - wait and retry
          await new Promise((resolve) => setTimeout(resolve, 1000))
          return api(originalRequest)
        default:
          console.log('An error occurred', error.response.data)
      }
    } else if (error.request) {
      console.log('No response received', error.request)
    } else {
      console.log('Error', error.message)
    }

    return Promise.reject(error)
  }
)

export default api
