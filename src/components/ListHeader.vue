<template>
  <div class="flex h-11 items-center justify-between border-b border-r border-gray-dark bg-gray">
    <div
      @click="() => modalVisibilityHandler(true)"
      class="mx-2.5 w-5 transition hover:scale-105 hover:cursor-pointer hover:rounded-full hover:border-2 hover:border-gray-dark hover:bg-gray-dark hover:duration-100 hover:ease-in-out"
    >
      <IconLoader name="hamburger_menu" />
    </div>
    <p class="shrink-0">All Notes</p>
    <div
      class="mx-2.5 w-5 transition hover:scale-105 hover:cursor-pointer hover:rounded-full hover:border-2 hover:border-gray-dark hover:bg-gray-dark hover:duration-100 hover:ease-in-out"
    >
      <IconLoader name="edit" />
    </div>
  </div>
  <BaseModal
    class="outline-none"
    :open="isOpen"
    :on-close="() => modalVisibilityHandler(false)"
  >
    <div class="fixed bottom-0 left-0 h-[calc(100vh-64px)] w-52 bg-gray-light">
      <!-- To make div element behave like button for accessibility -->
      <div
        role="button"
        tabindex="0"
        class="mt-10 flex h-12 items-center justify-between border-b border-gray-dark px-10 hover:bg-gray"
        @click="updateFilterHandler('ALL')"
        @keydown="(e: KeyboardEvent) => { 
          if (e.key === 'Enter' || e.key === ' ') {
            updateFilterHandler('ALL')
          }
        }"
      >
        <IconLoader
          class="mr-5 shrink-0"
          name="stack"
        />
        <p class="text-base opacity-20">All Notes</p>
      </div>
      <div
        role="button"
        tabindex="0"
        class="flex h-12 items-center justify-between border-b border-gray-dark px-10 hover:bg-gray"
        @click="updateFilterHandler('DELETED')"
        @keydown="(e: KeyboardEvent) => { 
          if (e.key === 'Enter' || e.key === ' ') {
            updateFilterHandler('DELETED')
          }
        }"
      >
        <IconLoader
          class="mr-5 shrink-0"
          name="trash"
        />
        <p class="text-base opacity-20">Trash</p>
      </div>
    </div>
  </BaseModal>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { FilterTypeValue } from '../types'
  import BaseModal from './base/BaseModal.vue'
  import IconLoader from './svg/IconLoader.vue'

  const props = defineProps<{
    onToggleFilter: (filterType: FilterTypeValue) => void
  }>()

  const isOpen = ref(false)
  const modalVisibilityHandler = (value: boolean) => {
    isOpen.value = value
  }

  const updateFilterHandler = (type: FilterTypeValue) => {
    props.onToggleFilter(type)
    modalVisibilityHandler(false)
  }
</script>
