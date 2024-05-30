<template>
  <dialog
    class="p-0"
    ref="dialogRef"
  >
    <Transition
      enter-active-class="ease-in transition duration-100"
      leave-active-class="ease-out transition-opacity"
      enter-from-class="-translate-x-60 opacity-0"
      enter-to-class="opacity-1 translate-x-0"
      leave-to-class="opacity-0"
    >
      <div
        v-if="open"
        ref="modalWrapperRef"
      >
        <slot />
      </div>
    </Transition>
  </dialog>
</template>

<script setup lang="ts">
  import { onClickOutside } from '@vueuse/core'
  import { onMounted, onUnmounted, ref, watch } from 'vue'

  const dialogRef = ref<HTMLDialogElement | null>(null)
  const modalWrapperRef = ref(null)

  const props = defineProps<{
    open: boolean
    onClose: () => void
  }>()

  watch(
    () => props.open,
    () => {
      const dialogElement = dialogRef.value
      if (props.open) {
        if (dialogElement?.hasAttribute('open')) {
          return
        }
        dialogElement?.showModal()
      } else {
        if (!dialogElement?.hasAttribute('open')) {
          return
        }
        dialogElement.close()
      }
    }
  )

  // const emit = defineEmits<{
  //   (e: 'change', id: number): void
  // }>()

  // dialogの参照を保持する変数
  // const dialog = ref<HTMLDialogElement | null>(null)

  // ダイアログ外を押した時にモーダルを閉じる
  onClickOutside(modalWrapperRef, () => {
    props.onClose()
  })

  // escapeキーで閉じるのをフックして、実装しようとする終了と同じ流れに載せる
  function handleEscape(event: Event) {
    event.preventDefault()
    props.onClose()
  }

  onMounted(() => {
    dialogRef.value?.addEventListener('cancel', handleEscape)
  })

  onUnmounted(() => {
    dialogRef.value?.removeEventListener('cancel', handleEscape)
  })
</script>
