<template>
  <div class="w-96">
    <ListHeader
      :selectedFilterType="selectedFilterType"
      :on-toggle-filter="updateFilterHandler"
    />
    <ListSearch />
    <div
      v-if="hasEditableNote"
      class="flex h-[calc(100vh-149px)] justify-center overflow-auto border-r bg-gray"
    >
      <p class="my-auto text-lg font-bold text-gray-dark">
        Seems like you don't have notes...
        <a
          class="block cursor-pointer text-blue-light hover:underline"
          @click="onClick"
          >Create your first note!</a
        >
      </p>
    </div>
    <div
      v-else
      ref="el"
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
  import { useScroll } from '@vueuse/core'
  import { UseFuseOptions } from '@vueuse/integrations'
  import { useFuse } from '@vueuse/integrations/useFuse'
  import { storeToRefs } from 'pinia'
  import { computed, ref, watch } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { useNoteStore } from '../stores/useNoteStore'
  import { useUtilityStore } from '../stores/useUtilityStore'
  import { FilterTypeValue } from '../types'
  import { PreviewNoteResponse } from '../types/api/response/types'
  import ListHeader from './ListHeader.vue'
  import ListItem from './ListItem.vue'
  import ListSearch from './ListSearch.vue'

  const props = defineProps<{
    notes: PreviewNoteResponse[]
  }>()

  const route = useRoute()
  const router = useRouter()

  const noteStore = useNoteStore()
  const utilityStore = useUtilityStore()
  const { search, selectedFilterType } = storeToRefs(noteStore)
  const { scrollPosition } = storeToRefs(utilityStore)

  const el = ref<HTMLElement | null>(null)
  const { x, y } = useScroll(el, {
    behavior: 'smooth'
  })

  watch(route, () => {
    scrollPosition.value = {
      x: x.value,
      y: y.value
    }
  })

  watch(scrollPosition, () => {
    x.value = scrollPosition.value.x
    y.value = scrollPosition.value.y
  })

  const hasEditableNote = computed(() => {
    return (
      props.notes.length === 0 ||
      ((selectedFilterType.value === 'PROGRESS' || selectedFilterType.value === 'ALL') &&
        props.notes.every((note) => note.deletedFlag))
    )
  })

  const options = computed<UseFuseOptions<PreviewNoteResponse>>(() => ({
    fuseOptions: {
      keys: ['title', 'contents']
    },
    matchAllWhenSearchEmpty: true
  }))

  const sortedNotes = computed<PreviewNoteResponse[]>(
    () =>
      props.notes?.toSorted((a, b) => {
        // notes are sorted according to the latest updated date
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      }) ?? []
  )

  const filteredNotes = computed<PreviewNoteResponse[]>(() => {
    return sortedNotes.value.filter((note) => {
      switch (selectedFilterType.value) {
        case 'PROGRESS':
          return !note.deletedFlag
        case 'DELETED':
          return note.deletedFlag
        case 'ALL':
          return true
      }
    })
  })

  const updateFilterHandler = (type: FilterTypeValue) => (selectedFilterType.value = type)

  const { results } = useFuse(search, filteredNotes, options)

  const isSubmitting = ref(false)
  const onClick = async () => {
    if (isSubmitting.value) {
      return
    }
    isSubmitting.value = true

    const returnVal = await noteStore.createNote()
    await router.push({
      name: 'edit',
      params: {
        noteId: returnVal
      }
    })
    isSubmitting.value = false
  }
</script>
