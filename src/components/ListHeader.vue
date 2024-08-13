<template>
  <div class="flex h-11 items-center justify-between border-b border-r border-gray-dark bg-gray">
    <!-- TODO add role and tab-index to div element -->
    <div
      @click="() => modalVisibilityHandler(true)"
      class="mx-2.5 w-5 transition hover:scale-105 hover:cursor-pointer hover:rounded-full hover:border-2 hover:border-gray-dark hover:bg-gray-dark hover:duration-100 hover:ease-in-out"
    >
      <IconLoader name="hamburger_menu" />
    </div>
    <p class="shrink-0">{{ title }}</p>
    <div
      class="mx-2.5 w-5 transition hover:scale-105 hover:cursor-pointer hover:rounded-full hover:border-2 hover:border-gray-dark hover:bg-gray-dark hover:duration-100 hover:ease-in-out"
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
      :selected-filter-type="selectedFilterType"
      :icon-name="filterItem.iconName"
      :label="filterItem.label"
      :on-click="() => updateFilterHandler(filterItem.type)"
    />
  </BaseModal>
</template>

<script setup lang="ts">
  import { computed, ref } from 'vue'
  import { FilterTypeValue } from '../types'
  import { FILTER_TYPE } from '../types/const'
  import BaseModal from './base/BaseModal.vue'
  import IconLoader from './svg/IconLoader.vue'
  import TheFilterItem from './TheFilterItem.vue'

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
    selectedFilterType: FilterTypeValue
    onToggleFilter: (filterType: FilterTypeValue) => void
  }>()

  const isOpen = ref(false)

  const modalVisibilityHandler = (value: boolean) => {
    isOpen.value = value
  }

  const title = computed(() => {
    switch (props.selectedFilterType) {
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
</script>
