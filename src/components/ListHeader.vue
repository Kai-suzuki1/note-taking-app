<template>
  <div class="flex h-11 items-center justify-between border-b border-r border-gray-dark bg-gray">
    <div
      role="button"
      tabindex="0"
      class="mx-2.5 w-5 transition hover:scale-105 hover:cursor-pointer hover:rounded-full hover:border-2 hover:border-gray-dark hover:bg-gray-dark hover:duration-100 hover:ease-in-out"
      @click="() => modalVisibilityHandler(true)"
      @keydown="(e: KeyboardEvent) => { 
          if (e.key === 'Enter' || e.key === ' ') {
            modalVisibilityHandler(true)
          }
        }"
    >
      <IconLoader name="hamburger_menu" />
    </div>
    <p class="shrink-0">{{ title }}</p>
    <div
      role="button"
      tabindex="0"
      class="mx-2.5 w-5 transition hover:scale-105 hover:cursor-pointer hover:rounded-full hover:border-2 hover:border-gray-dark hover:bg-gray-dark hover:duration-100 hover:ease-in-out"
      @click="createNoteHandler"
      @keydown="(e: KeyboardEvent) => { 
          if (e.key === 'Enter' || e.key === ' ') {
            createNoteHandler()
          }
        }"
    >
      <!-- TODO add click event for creating note -->
      <IconLoader name="create" />
    </div>
  </div>
  <BaseModal
    :open="isOpen"
    wrapper-class="fixed bottom-0 left-0 h-[calc(100vh-64px)] w-52 bg-gray-light"
    :on-close="() => modalVisibilityHandler(false)"
  >
    <TheFilterItem
      v-for="(filterItem, index) in filterItemList"
      :key="index"
      :filter-type="filterItem.type"
      :icon-name="filterItem.iconName"
      :label="filterItem.label"
      :on-click="() => updateFilterHandler(filterItem.type)"
    />
  </BaseModal>
</template>

<script setup lang="ts">
  import { storeToRefs } from 'pinia'
  import { computed, ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { useNoteStore } from '../stores/useNoteStore'
  import { FilterTypeValue } from '../types'
  import { FILTER_TYPE } from '../types/const'
  import BaseModal from './base/BaseModal.vue'
  import IconLoader from './svg/IconLoader.vue'
  import TheFilterItem from './TheFilterItem.vue'

  const router = useRouter()
  const store = useNoteStore()
  const { selectedFilterType } = storeToRefs(store)

  const filterItemList = FILTER_TYPE.map((item: FilterTypeValue) => {
    const itemOne = {
      type: item
    }
    const itemTwo = (() => {
      switch (item) {
        case 'ALL':
          return {
            iconName: 'stack',
            label: 'All Notes'
          }
        case 'PROGRESS':
          return {
            iconName: 'book-open',
            label: 'In Progress'
          }
        case 'DELETED':
          return {
            iconName: 'trash',
            label: 'Trash'
          }
      }
    })()

    return {
      ...itemOne,
      ...itemTwo
    }
  })

  const props = defineProps<{
    onToggleFilter: (filterType: FilterTypeValue) => void
  }>()

  const isOpen = ref(false)

  const modalVisibilityHandler = (value: boolean) => {
    isOpen.value = value
  }

  const title = computed(() => {
    switch (selectedFilterType.value) {
      case 'ALL':
        return 'All Notes'
      case 'PROGRESS':
        return 'Work in Progress'
      case 'DELETED':
        return 'Deleted Notes'
      default:
        return ''
    }
  })

  const updateFilterHandler = (type: FilterTypeValue) => {
    props.onToggleFilter(type)
    modalVisibilityHandler(false)
  }

  const isSubmitting = ref(false)
  const createNoteHandler = async () => {
    if (isSubmitting.value) {
      return
    }
    isSubmitting.value = true

    const returnVal = await store.createNote()
    await router.push({
      name: 'edit',
      params: {
        noteId: returnVal
      }
    })
    isSubmitting.value = false
  }
</script>
