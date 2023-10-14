import axios, { AxiosInstance } from 'axios'
import { useErrorFlagStore } from './stores/useErrorFlagStore'

const apiClient: AxiosInstance = axios.create({
  // URI of API
  baseURL: 'http://localhost:8080',
  // Request headers
  headers: {
    'Content-Type': 'application/json'
  }
})

if (localStorage.token) {
  apiClient.defaults.headers.common['Authorization'] = `Bearer ${localStorage.token}`
}

const { $reset, set404flag, set500flag } = useErrorFlagStore()

apiClient.interceptors.response.use(
  (response) => {
    // If no errors are returned, reset the 404 and 500 error flag
    $reset()
    return response
  },
  (error) => {
    // To prevent more than one flag to be true
    $reset()
    if (axios.isAxiosError(error)) {
      switch (error.response?.status) {
        case 404:
          set404flag(true)
          break
        case 500:
          set500flag(true)
          break
        default:
          break
      }
    }
  }
)

export default apiClient
