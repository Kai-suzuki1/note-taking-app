import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useErrorFlagStore = defineStore(`errorFlag`, () => {
  const is404 = ref<boolean>(false)
  const is500 = ref<boolean>(false)

  const set404flag = (flag: boolean) => {
    is404.value = flag
  }

  const set500flag = (flag: boolean) => {
    is500.value = flag
  }

  const $reset = () => {
    is404.value = false
    is500.value = false
  }

  return { is404, is500, set404flag, set500flag, $reset }
})
