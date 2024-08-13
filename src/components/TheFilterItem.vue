<template>
  <!-- To make div element behave like button for accessibility -->
  <div
    role="button"
    tabindex="0"
    :class="`flex h-12 items-center justify-between border-b border-gray-dark px-10 ${
      selectedFilterType === filterType ? 'bg-gray-dark' : `hover:bg-gray`
    }`"
    @click="onClick(filterType)"
    @keydown="(e: KeyboardEvent) => { 
          if (e.key === 'Enter' || e.key === ' ') {
            onClick(filterType)
          }
        }"
  >
    <IconLoader
      class="mr-5 shrink-0"
      :name="iconName"
    />
    <p class="text-base opacity-20">{{ label }}</p>
  </div>
</template>

<script setup lang="ts">
  import { FilterTypeValue } from '../types'
  import IconLoader from './svg/IconLoader.vue'

  defineProps<{
    filterType: FilterTypeValue
    selectedFilterType: FilterTypeValue
    iconName: string
    label: string
    onClick: (type: FilterTypeValue) => void
  }>()
</script>
