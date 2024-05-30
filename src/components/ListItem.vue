<template>
  <!-- All Notes -->
  <div class="h-16 border-b border-r border-gray-dark bg-gray px-2.5 hover:bg-gray-light">
    <div class="flex items-center justify-between pt-2">
      <p class="truncate">{{ note.title ? note.title : 'Untitled' }}</p>
      <div
        class="hover:border-1 hover:scale-105 hover:cursor-pointer hover:rounded-full hover:border-gray-dark hover:bg-gray-dark"
      >
        <IconLoader
          class="shrink-0"
          name="trash"
        />
      </div>
    </div>
    <p class="truncate text-base opacity-20">{{ note.contents }}</p>
  </div>
</template>

<script setup lang="ts">
  import { PreviewNoteResponse } from '../types/api/response/types'
  import IconLoader from './svg/IconLoader.vue'

  defineProps<{
    note: PreviewNoteResponse
  }>()
</script>
