<template>
  <button
    v-tooltip="{
      content: toolTipContent,
      popperClass: 'text-xs',
      html: true,
      disabled: isToolTipDisabled
    }"
    class="cursor-pointer rounded border-gray bg-gray font-bold drop-shadow-md ease-in-out"
    :class="[widthNum, height, activeClass]"
    @click="clickHandler"
  >
    <div class="flex items-center justify-center">
      <slot name="icon"></slot>
    </div>
  </button>
</template>

<script setup lang="ts">
  import { computed } from 'vue'

  const props = withDefaults(
    defineProps<{
      widthNum: `w-${number}`
      size: 'sm' | 'md' | 'lg' | 'xl'
      isActive?: boolean
      toolTipContent?: string
      isToolTipDisabled?: boolean
    }>(),
    {
      isActive: false,
      toolTipContent: '',
      isToolTipDisabled: false
    }
  )

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

  const activeClass = computed<string>(() => (props.isActive ? 'border-gray-dark bg-gray-dark' : ''))

  const emit = defineEmits(['onClick'])

  const clickHandler = () => {
    emit('onClick')
  }
</script>
