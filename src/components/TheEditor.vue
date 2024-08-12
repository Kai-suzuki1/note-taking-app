<template>
  <div
    v-if="editor"
    class="px-5"
  >
    <TheEditorMenu
      :editor="editor"
      :is-editable="isEditable"
      :is-loading="isLoading"
      :submit-handler="submitHandler"
    />
    <p class="mt-3 text-right text-sm text-gray-dark">
      {{ editor.storage.characterCount.characters() }} / {{ CONTENTS_MAX_SIZE }} characters
    </p>
    <EditorContent :editor="editor" />
  </div>
</template>

<script setup lang="ts">
  import CharacterCount from '@tiptap/extension-character-count'
  import Color from '@tiptap/extension-color'
  import Highlight from '@tiptap/extension-highlight'
  import Link from '@tiptap/extension-link'
  import Placeholder from '@tiptap/extension-placeholder'
  import TextAlign from '@tiptap/extension-text-align'
  import TextStyle from '@tiptap/extension-text-style'
  import Underline from '@tiptap/extension-underline'
  import StarterKit from '@tiptap/starter-kit'
  import { EditorContent, useEditor } from '@tiptap/vue-3'
  import { onBeforeUnmount } from 'vue'
  import TheEditorMenu from './TheEditorMenu.vue'

  const props = defineProps<{
    value: string
    isEditable: boolean
    isLoading: boolean
    submitHandler: () => void
  }>()

  const CONTENTS_MAX_SIZE = 65535 as const

  const editor = useEditor({
    content: props.value,
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3]
        },
        code: {
          HTMLAttributes: {
            class: 'text-orange-500 text-sm not-prose font-bold rounded p-1 bg-stone-200'
          }
        },
        blockquote: {
          HTMLAttributes: {
            class: 'not-prose border-l-4 border-gray-dark pl-4 italic'
          }
        }
      }),
      Underline,
      TextStyle,
      Color,
      Highlight.configure({ multicolor: true }),
      Link.configure({
        HTMLAttributes: { class: 'cursor-pointer underline hover:decoration-blue hover:text-blue' }
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph']
      }),
      Placeholder.configure({
        placeholder: 'Write something, and try some markdown syntax...',
        emptyEditorClass:
          'first:before:h-0 first:before:text-gray-400 first:before:float-left first:before:content-[attr(data-placeholder)] first:before:pointer-events-none'
      }),
      CharacterCount.configure({
        limit: CONTENTS_MAX_SIZE
      })
    ],
    editorProps: {
      attributes: {
        class: 'prose prose-sm prose-stone-300 !max-w-none py-2 focus:outline-none h-full'
      }
    },
    autofocus: 'end',
    editable: props.isEditable,
    onUpdate: ({ editor }) => {
      emits('update:value', editor.getHTML())
    }
  })

  onBeforeUnmount(() => {
    editor.value?.destroy()
  })

  const emits = defineEmits<{
    (e: 'update:value', value: string): void
  }>()
</script>
