import { StorageSerializers, useStorage } from '@vueuse/core'
import { HttpStatusCode } from 'axios'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { logInUser, signUpUser } from '../api/authentications'
import { LogInRequestBody, SignUpRequestBody } from '../types/api/request/types'
import { ErrorResponse, ErrorResponseWithDetail } from '../types/api/response/types'
import { isAxiosError } from '../utils/error'

export const useAuthStore = defineStore('auth', () => {
  const router = useRouter()
  const toast = useToast()
  const token = useStorage('token', null, localStorage, { serializer: StorageSerializers.string })
  const signUpError = ref<Partial<ErrorResponseWithDetail<SignUpRequestBody>>>({})
  const logInError = ref<Partial<ErrorResponse>>({})

  const clearSignUpError = async () => {
    signUpError.value = {}
  }

  const clearLogInError = async () => {
    logInError.value = {}
  }

  // TODO use for fetching user info
  // const { sub: userId } = decodeJwt(token.value)

  const signUp = async (reqBody: SignUpRequestBody) => {
    try {
      const { data } = await signUpUser(reqBody)
      // clear error
      await clearSignUpError()
      toast.success('Welcome to So-bar!!')
      // set token value to local storage
      token.value = data.token
      await router.push({ name: 'home' })
    } catch (error) {
      if (
        isAxiosError<ErrorResponseWithDetail<SignUpRequestBody>>(error) &&
        error?.response &&
        error.response?.status === HttpStatusCode.BadRequest
      ) {
        signUpError.value = error.response.data
        toast.error('Failed to create your account')
      } else {
        toast.error('Unexpected Error Occurred')
      }
    }
  }

  const logIn = async (reqBody: LogInRequestBody) => {
    try {
      const { data } = await logInUser(reqBody)
      token.value = data.token
      await clearLogInError()
      toast.success('Welcome Back')
      await router.push({ name: 'home' })
    } catch (error) {
      if (
        isAxiosError<ErrorResponse>(error) &&
        error?.response &&
        error.response?.status === HttpStatusCode.BadRequest
      ) {
        logInError.value = error.response?.data
        toast.error('Failed to log in')
      } else {
        toast.error('Unexpected Error Occurred')
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
