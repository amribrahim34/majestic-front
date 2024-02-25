import axios from 'axios'

// Use an environment variable for the base URL
const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'

const api = axios.create({
  baseURL,
  timeout: 10000 // Optional: sets timeout to 10 seconds
})

// Request interceptor for API calls
api.interceptors.request.use(
  async (config) => {
    // You can modify config here if needed, for example, attaching an authorization token
    return config
  },
  (error) => {
    Promise.reject(error)
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
      if (error.response.status === 401) {
        // Redirect or handle unauthorized access
      } else if (error.response.status === 404) {
        // Handle not found error
      }
      // You can add more error handling based on status codes here
    } else if (error.request) {
      // The request was made but no response was received
      console.log('Error', error.message)
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message)
    }

    // Forward the error for further handling if needed
    return Promise.reject(error)
  }
)

export default api
