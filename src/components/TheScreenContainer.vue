<template>
  <div :class="`h-screen ${bgColor}`">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue'

  const props = withDefaults(
    defineProps<{
      color?: 'gray' | 'white'
    }>(),
    {
      color: 'gray'
    }
  )

  const bgColor = computed<string>(() => {
    switch (props.color) {
      case 'gray':
        return 'bg-gray'
      case 'white':
        return 'bg-gray-light'
      default:
        return ''
    }
  })
</script>
