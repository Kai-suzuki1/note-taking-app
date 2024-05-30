import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { HttpStatusCodeWithDefault } from '../types'
import { HTTP_STATUS_CODE } from '../types/const'

const expectedErrorStatusCodes: HttpStatusCodeWithDefault[] = [400, 401, 403, 404, 405, 'NONE']

export const useErrorFlagStore = defineStore(`errorFlag`, () => {
  const router = useRouter()

  const errorStatus = ref<HttpStatusCodeWithDefault>('NONE')

  const isNotFound = computed(() => errorStatus.value === 404)
  const isSystemError = computed(() => !expectedErrorStatusCodes.includes(errorStatus.value))

  const setErrorStatus = (value: HttpStatusCodeWithDefault) => {
    errorStatus.value = value
  }

  const $reset = () => {
    setErrorStatus('NONE')
  }

  watch(errorStatus, (status) => {
    if (status === HTTP_STATUS_CODE.FORBIDDEN) {
      router.push({ name: 'login' })
    }
  })

  return { errorStatus, setErrorStatus, $reset, isNotFound, isSystemError }
})
