import { defineStore } from 'pinia'
import { ref } from 'vue'
import { ScrollPosition } from '../types'

export const useUtilityStore = defineStore('utility', () => {
  const scrollPosition = ref<ScrollPosition>({
    x: 0,
    y: 0
  })

  return {
    scrollPosition
  }
})
