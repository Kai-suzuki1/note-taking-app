import axios, { AxiosInstance } from 'axios'
import { useErrorFlagStore } from './stores/useErrorFlagStore'
import { ErrorResponse } from './types/api/response/types'
import { isAxiosError } from './utils/error'

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

const { $reset, setErrorStatus } = useErrorFlagStore()

apiClient.interceptors.response.use(
  (response) => {
    // If no errors are returned, reset the 404 and 500 error flag
    $reset()
    return response
  },
  (error) => {
    // To prevent more than one flag to be true
    if (isAxiosError<ErrorResponse>(error) && error.response?.data?.statusCode) {
      switch (error.response.data.statusCode) {
        case 400:
        case 401:
        case 403:
        case 405:
          break
        default:
          // Only set 404 error and unexpected errors
          setErrorStatus(error.response.data.statusCode)
          break
      }
    }
  }
)

export default apiClient
