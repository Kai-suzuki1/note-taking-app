<template>
  <TheScreenContainer
    color="white"
    class="flex"
  >
    <TheSideMenu
      :notes="notes"
      class="shrink-0"
    />
    <div class="h-[calc(100vh-64px)] w-[calc(100vw-384px)] overflow-y-auto">
      <textarea
        placeholder="Title of your note"
        :disabled="!isEditable"
        maxlength="255"
        class="h-28 w-full resize-none break-words border-none p-5 text-xl font-bold outline-none placeholder:text-gray-dark focus:ring-0"
        v-model="inputValue.title"
      />
      <TheEditor
        v-if="noteDetail"
        :key="renderKey"
        v-model:value="inputValue.contents"
        :is-editable="isEditable"
        :is-loading="isLoading"
        :submit-handler="submitHandler"
      />
      <div class="px-5">
        <InputErrors
          v-if="updateNoteError && updateNoteError.message"
          :error-value="updateNoteError.message?.map((item) => item.detail)"
        />
      </div>
    </div>
  </TheScreenContainer>
</template>

<script setup lang="ts">
  import { storeToRefs } from 'pinia'
  import { computed, onBeforeMount, ref, watch } from 'vue'
  import { useRoute } from 'vue-router'
  import InputErrors from '../components/InputErrors.vue'
  import TheEditor from '../components/TheEditor.vue'
  import TheScreenContainer from '../components/TheScreenContainer.vue'
  import TheSideMenu from '../components/TheSideMenu.vue'
  import { useAuthStore } from '../stores/useAuthStore'
  import { useNoteStore } from '../stores/useNoteStore'
  import { NoteUpdateRequestBody } from '../types/api/request/types'
  import { decodeJwt } from '../utils/string'

  onBeforeMount(async () => {
    await noteStore.fetchNotes()
    await noteStore.fetchNoteDetail(Number.parseInt(Array.isArray(router.params.noteId) ? '' : router.params.noteId))
    await updateComponent()
  })

  const noteStore = useNoteStore()
  const router = useRoute()
  const { notes, noteDetail, updateNoteError } = storeToRefs(noteStore)
  const { token } = storeToRefs(useAuthStore())

  /*
    In order to re-render tiptap editor content,
    update the key value every before component is mounted
  */
  const renderKey = ref(0)
  const updateComponent = async () => (renderKey.value += 1)

  const inputValue = ref<NoteUpdateRequestBody>({
    title: noteDetail.value?.title ?? '',
    contents: noteDetail.value?.contents ?? ''
  })

  const isEditable = computed(() => {
    return (
      !noteDetail.value?.deletedFlag &&
      // True if user is author or is shared-user with readWrite permission
      (noteDetail.value?.userIsAuthor ||
        !!noteDetail.value?.sharedUsers.find(
          (user) => user.userId === Number(decodeJwt(token.value).sub) && user.type.readWrite
        ))
    )
  })

  const isLoading = ref<boolean>(false)
  const submitHandler = async () => {
    if (noteDetail.value) {
      isLoading.value = true
      await noteStore.updateNote(noteDetail.value.id, inputValue.value)
      isLoading.value = false
    }
  }

  watch(noteDetail, () => {
    if (noteDetail.value) {
      inputValue.value.title = noteDetail.value.title
      inputValue.value.contents = noteDetail.value.contents
    }
  })
</script>
