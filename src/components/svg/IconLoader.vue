<template>
  <component :is="icon" />
</template>

<script setup lang="ts">
  import { defineAsyncComponent } from 'vue'

  const props = defineProps<{
    name: string
  }>()

  const icon = defineAsyncComponent(() => import(`../../assets/${props.name}.svg`))
</script>
