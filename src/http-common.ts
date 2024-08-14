import axios, { AxiosInstance } from 'axios'
import { useToast } from 'vue-toastification'
import { globalRouter } from './router/globalRouter'
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

apiClient.interceptors.request.use((config) => {
  const regex = /^\/v1\/auth/
  if (regex.test(config.url ?? '')) {
    // if api end point starts from '/v1/auth', just return the default AxiosInstance
    return config
  }
  config.headers['Authorization'] = `Bearer ${localStorage.token}`
  return config
})

apiClient.interceptors.response.use(
  (response) => {
    const { $reset } = useErrorFlagStore()

    // If no errors are returned, reset the 404 and 500 error flag
    $reset()
    return response
  },
  (error) => {
    const { setErrorStatus } = useErrorFlagStore()
    const toast = useToast()

    // To prevent more than one flag to be true
    if (isAxiosError<ErrorResponse>(error) && error.response?.data?.statusCode) {
      switch (error.response.data.statusCode) {
        case 400:
        case 401:
        case 405:
          throw error
        case 403:
          globalRouter.router?.push({ name: 'login' })
          toast.error(error.response.data.message)
          throw error
        default:
          // Only set 404 error and unexpected errors
          setErrorStatus(error.response.data.statusCode)
          throw error
      }
    }
  }
)

export default apiClient
