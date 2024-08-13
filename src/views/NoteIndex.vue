<template>
  <TheScreenContainer
    color="white"
    class="flex"
  >
    <TheSideMenu :notes="notes" />
    <div class="flex w-full flex-col items-center justify-center text-4xl font-bold text-gray-dark opacity-30">
      <p>Create new note or</p>
      <p>Select one from the list</p>
    </div>
  </TheScreenContainer>
</template>

<script setup lang="ts">
  import { storeToRefs } from 'pinia'
  import { onBeforeMount } from 'vue'
  import TheScreenContainer from '../components/TheScreenContainer.vue'
  import TheSideMenu from '../components/TheSideMenu.vue'
  import { useNoteStore } from '../stores/useNoteStore'

  const store = useNoteStore()

  onBeforeMount(() => {
    store.fetchNotes()
  })

  const { notes } = storeToRefs(store)
</script>
