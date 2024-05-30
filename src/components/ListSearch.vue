<template>
  <label class="relative flex items-center justify-between border-b border-r border-gray-dark">
    <span class="absolute inset-y-0 left-0 flex items-center pl-2">
      <IconLoader name="search" />
    </span>
    <input
      id="searchValue"
      type="search"
      placeholder="Search for anything..."
      autocomplete="on"
      class="w-full border-none bg-gray pl-10 text-sm placeholder:text-center placeholder:font-bold placeholder:italic placeholder:text-gray-dark focus:border-blue-light focus:outline-none focus:ring-2 focus:ring-blue-light"
      :value="search"
      @input="inputHandler"
    />
  </label>
</template>

<script setup lang="ts">
  import { storeToRefs } from 'pinia'
  import { useNoteStore } from '../stores/useNoteStore'
  import IconLoader from './svg/IconLoader.vue'

  /**
   * Sync URL Query Params & Ref Data
   */
  // const updateDataFromUrlQuery = (query: LocationQuery) => {
  //   enteredInput.value = queryToString(query.search) ?? ''
  // }

  const store = useNoteStore()
  const { search } = storeToRefs(store)

  // const emits = defineEmits<{
  //   (e: 'update:searchValue', value: string): void
  // }>()

  const inputHandler = (e: Event) => {
    const target = e.target as HTMLInputElement
    store.setSearch(target.value)
  }
</script>
