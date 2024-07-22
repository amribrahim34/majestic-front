import axios, { type AxiosInstance } from 'axios'
// import 'dotenv/config'

// require('dotenv').config()
import.meta.env.VITE_API_BASE_URL
// Use an environment variable for the base URL
const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api'

const api: AxiosInstance = axios.create({
  baseURL,
  timeout: 10000, // Optional: sets timeout to 10 seconds
  withCredentials: true, // Important for handling cookies/sessions
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    Accept: 'application/json',
    'X-Requested-With': 'XMLHttpRequest' // This header is often expected by Laravel
  }
})

// Request interceptor for API calls
// api.interceptors.request.use(
//   (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
//     // You can modify config here if needed, for example, attaching an authorization token
//     const token = localStorage.getItem('auth_token')
//     if (token) {
//       config.headers['Authorization'] = `Bearer ${token}`
//     }
//     return config
//   },
//   (error: any) => {
//     return Promise.reject(error)
//   }
// )

api.interceptors.request.use((config) => {
  const token = document.head.querySelector('meta[name="csrf-token"]')
  if (token) {
    config.headers['X-CSRF-TOKEN'] = (token as HTMLMetaElement).content
  }
  return config
})

// Response interceptor for API calls
api.interceptors.response.use(
  (response) => {
    // Handle a successful response here
    return response
  },
  async (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          console.log('Unauthorized access')
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
