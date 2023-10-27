<template>
  <header class="flex h-16 w-screen items-center justify-between bg-gray-dark px-3.5">
    <RouterLink :to="{ name: toUrlOnIcon }">
      <IconLoader name="logo_small" />
    </RouterLink>
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
  import { computed, ref } from 'vue'
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

  const toUrlOnIcon = computed(() => {
    // Only if the current page is either signup or login, navigate to TopIndex
    return router.currentRoute.value.meta.requiresAuth ? 'home' : 'top'
  })

  const toLogIn = () => router.push({ name: 'login' })
  const toSignUp = () => router.push({ name: 'signup' })
</script>
