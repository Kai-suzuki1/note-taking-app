<template>
  <button
    type="button"
    class="cursor-pointer rounded-lg border-2 font-bold drop-shadow-md transition delay-150 duration-100 ease-in-out hover:text-white hover:drop-shadow-none disabled:!cursor-not-allowed disabled:!bg-transparent disabled:!opacity-40"
    :class="[widthNum, height, colorVariants[color]]"
    :disabled="disabled"
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
  import { ButtonColorTypeValue } from '../../types'

  const props = defineProps<{
    widthNum: `w-${number}`
    size: 'sm' | 'md' | 'lg' | 'xl'
    color: ButtonColorTypeValue
    disabled?: boolean
  }>()

  const colorVariants: Ref<Record<ButtonColorTypeValue, string>> = ref({
    purple: 'border-purple text-purple hover:bg-purple disabled:!text-purple',
    yellow: 'border-yellow text-yellow hover:bg-yellow disabled:!text-yellow',
    blue: 'border-blue text-blue hover:bg-blue disabled:!text-blue',
    pink: 'border-pink text-pink hover:bg-pink disabled:!text-pink'
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
