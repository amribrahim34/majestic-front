import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios'

// Interface for environment variable type
interface Env {
  VITE_APP_API_URL: string
}

// Define a type for the Axios instance with potential headers
interface MyAxiosInstance extends AxiosInstance {
  defaults: AxiosRequestConfig & { headers?: { Authorization?: string; 'Accept-language': 'en' } }
}

// Create an Axios instance with a base URL using environment variable
const axiosInstance: MyAxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL || 'http://localhost:8000/api/admin'
})

// Add a request interceptor to include the Authorization header if a token is present
axiosInstance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers = config.headers || {} // Ensure headers object exists
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default axiosInstance
