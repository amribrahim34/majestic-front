import axios, { type AxiosInstance, type InternalAxiosRequestConfig } from 'axios'

// Use an environment variable for the base URL
const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'

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
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    // You can modify config here if needed, for example, attaching an authorization token
    const token = localStorage.getItem('auth_token')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error: any) => {
    return Promise.reject(error)
  }
)

// Response interceptor for API calls
api.interceptors.response.use(
  (response) => {
    // Handle a successful response here
    return response
  },
  async (error) => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      switch (error.response.status) {
        case 401:
          // Redirect or handle unauthorized access
          console.log('Unauthorized access')
          // You might want to redirect to login page or refresh token here
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
      // The request was made but no response was received
      console.log('No response received', error.request)
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message)
    }

    // Forward the error for further handling if needed
    return Promise.reject(error)
  }
)

export default api
