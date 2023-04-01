<template>
  <button
    type="button"
    class="cursor-pointer rounded-lg border-2 font-bold drop-shadow-md transition delay-150 duration-150 ease-in-out hover:text-white hover:drop-shadow-none"
    :class="[widthNum, height, colorVariants[props.color]]"
  >
    <div class="flex items-center justify-center">
      <p>
        <slot name="text"></slot>
      </p>
      <slot name="icon"></slot>
    </div>
  </button>
</template>

<script setup lang="ts">
  import { computed, Ref, ref } from 'vue'
  import { ButtonColor } from '../../types'

  const props = defineProps<{
    widthNum: `w-${number}`
    size: 'sm' | 'md' | 'lg' | 'xl'
    color: ButtonColor
  }>()

  const colorVariants: Ref<Record<ButtonColor, string>> = ref({
    purple: 'border-purple text-purple hover:bg-purple',
    yellow: 'border-yellow text-yellow hover:bg-yellow',
    blue: 'border-blue text-blue hover:bg-blue',
    pink: 'border-pink text-pink hover:bg-pink'
  })

  const height = computed<string>(() => {
    switch (props.size) {
      case 'sm': {
        return 'h-7'
      }
      case 'md': {
        return 'h-10'
      }
      case 'lg': {
        return 'h-12'
      }
      case 'xl': {
        return 'h-16'
      }
      default:
        // return empty string but not reachable
        return ''
    }
  })
</script>
