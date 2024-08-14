import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { HttpStatusCodeWithDefault } from '../types'

const expectedErrorStatusCodes: HttpStatusCodeWithDefault[] = [400, 401, 403, 404, 405, 'NONE']

export const useErrorFlagStore = defineStore(`errorFlag`, () => {
  const errorStatus = ref<HttpStatusCodeWithDefault>('NONE')

  const isNotFound = computed(() => errorStatus.value === 404)
  const isSystemError = computed(() => !expectedErrorStatusCodes.includes(errorStatus.value))

  const setErrorStatus = (value: HttpStatusCodeWithDefault) => {
    errorStatus.value = value
  }

  const $reset = () => {
    setErrorStatus('NONE')
  }

  return { errorStatus, setErrorStatus, $reset, isNotFound, isSystemError }
})
