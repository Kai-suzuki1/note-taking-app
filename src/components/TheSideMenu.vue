<template>
  <div class="w-96">
    <ListHeader :on-toggle-filter="updateFilterHandler" />
    <ListSearch />
    <div
      v-if="notes.length === 0"
      class="flex h-[calc(100vh-149px)] justify-center overflow-auto border-r bg-gray"
    >
      <p class="my-auto text-lg font-bold text-gray-dark">
        Seems like you don't have notes...
        <!-- TODO toの遷移先をcreateに変更する -->
        <RouterLink
          class="block text-blue-light hover:underline"
          :to="{ name: 'login' }"
          >Create your first note!</RouterLink
        >
      </p>
    </div>
    <div
      v-else
      class="z-0 h-[calc(100vh-149px)] overflow-auto border-r bg-gray"
    >
      <ListItem
        v-for="note in results"
        :key="note.item.id"
        :note="note.item"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { UseFuseOptions } from '@vueuse/integrations'
  import { useFuse } from '@vueuse/integrations/useFuse'
  import { storeToRefs } from 'pinia'
  import { computed, onBeforeMount, ref } from 'vue'
  import { useNoteStore } from '../stores/useNoteStore'
  import { FilterTypeValue } from '../types'
  import { PreviewNoteResponse } from '../types/api/response/types'
  import ListHeader from './ListHeader.vue'
  import ListItem from './ListItem.vue'
  import ListSearch from './ListSearch.vue'

  const store = useNoteStore()
  const { notes, search } = storeToRefs(store)

  onBeforeMount(() => {
    store.fetchNotes()
  })

  const showDeletedNotes = ref(false)

  const options = computed<UseFuseOptions<PreviewNoteResponse>>(() => ({
    fuseOptions: {
      keys: ['title', 'contents']
    },
    matchAllWhenSearchEmpty: true
  }))

  const sortedNotes = computed<PreviewNoteResponse[]>(
    () =>
      notes.value?.toSorted((a, b) => {
        // notes are sorted according to the latest updated date
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      }) ?? []
  )

  const filteredNotes = computed<PreviewNoteResponse[]>(() =>
    showDeletedNotes.value ? sortedNotes.value.filter((note) => note.deletedFlag) : sortedNotes.value
  )

  const updateFilterHandler = (type: FilterTypeValue) => {
    switch (type) {
      case 'ALL':
        showDeletedNotes.value = false
        break
      case 'DELETED':
        showDeletedNotes.value = true
        break
    }
  }

  const { results } = useFuse(search, filteredNotes, options)
</script>
