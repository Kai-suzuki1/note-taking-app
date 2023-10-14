<template>
  <header class="flex h-16 items-center justify-between bg-gray-dark px-3.5">
    <IconLoader name="logo_small" />
    <div v-if="buttonVisibility">
      <BaseSquareButton
        width-num="w-31"
        size="lg"
        color="purple"
        ref="elLogIn"
        @on-click="toLogIn"
      >
        <template #text>Log In</template>
      </BaseSquareButton>
      <BaseSquareButton
        class="ml-3.5"
        width-num="w-31"
        size="lg"
        color="yellow"
        ref="elSignUp"
        @on-click="toSignUp"
      >
        <template #text>Sign Up</template>
      </BaseSquareButton>
    </div>
  </header>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import IconLoader from '../components/svg/IconLoader.vue'
  import BaseSquareButton from './base/BaseSquareButton.vue'

  withDefaults(
    defineProps<{
      buttonVisibility?: boolean
    }>(),
    {
      buttonVisibility: true
    }
  )
  const router = useRouter()
  const elLogIn = ref<HTMLButtonElement>()
  const elSignUp = ref<HTMLButtonElement>()

  const toLogIn = () => router.push('/login')
  const toSignUp = () => router.push('/signup')
</script>
