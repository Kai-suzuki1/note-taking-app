import { StorageSerializers,useStorage } from '@vueuse/core'
import axios,{ HttpStatusCode } from 'axios'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { LogInRequestBody,SignUpRequestBody } from '../types/api/request/types'
import { AuthenticationResponse,ErrorResponse,ErrorResponseWithDetail } from '../types/api/response/types'
import { isAxiosError } from '../utils/error'

export const useAuthStore = defineStore('auth', () => {
  const router = useRouter()
  const toast = useToast()
  const token = useStorage('token', null, localStorage, { serializer: StorageSerializers.string })
  const signUpError = ref<Partial<ErrorResponseWithDetail<SignUpRequestBody>>>({})
  const logInError = ref<Partial<ErrorResponse>>({})

  const clearSignUpError = async () => {
    signUpError.value = await {}
  }

  const clearLogInError = async () => {
    logInError.value = await {}
  }

  // TODO use for fetching user info
  // const { sub: userId } = decodeJwt(token.value)

  const signUp = async (reqBody: SignUpRequestBody) => {
    try {
      const { data } = await axios.post<AuthenticationResponse>('/v1/auth/register', reqBody)
      // clear error
      await clearSignUpError()
      await toast.success('Welcome to So-bar!!')
      // set token value to local storage
      token.value = await data.token
      await router.push('/')
    } catch (error) {
      if (
        isAxiosError<ErrorResponseWithDetail<SignUpRequestBody>>(error) &&
        error?.response &&
        error.response?.status === HttpStatusCode.BadRequest
      ) {
        signUpError.value = error.response.data
        await toast.error('Failed to create your account')
      } else {
        // TODO handler for unexpected error
      }
    }
  }

  const logIn = async (reqBody: LogInRequestBody) => {
    try {
      const { data } = await axios.post<AuthenticationResponse>('/v1/auth/authenticate', reqBody)
      token.value = await data.token
      await clearLogInError()
      await toast.success('Welcome Back')
      await router.push('/')
    } catch (error) {
      if (
        isAxiosError<ErrorResponse>(error) &&
        error?.response &&
        error.response?.status === HttpStatusCode.BadRequest
      ) {
        logInError.value = error.response?.data
        await toast.error('Failed to log in')
      } else {
        // TODO handler for unexpected error
      }
    }
  }

  return {
    token,
    signUpError,
    logInError,
    clearSignUpError,
    clearLogInError,
    signUp,
    logIn
  }
})
