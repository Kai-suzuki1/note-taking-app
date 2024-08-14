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
        @on-click="logInnHandler"
      >
        <template #text>Log In</template>
      </BaseSquareButton>
      <BaseSquareButton
        class="ml-3.5"
        width-num="w-31"
        size="lg"
        color="yellow"
        ref="elSignUp"
        @on-click="signUpHandler"
      >
        <template #text>Sign Up</template>
      </BaseSquareButton>
    </div>
    <BaseSquareButton
      v-else-if="route.name == 'home' || route.name == 'edit'"
      width-num="w-28"
      size="lg"
      color="purple"
      ref="elLogIn"
      @on-click="logOutHandler"
    >
      <template #text>Log Out</template>
    </BaseSquareButton>
  </header>
</template>

<script setup lang="ts">
  import { storeToRefs } from 'pinia'
  import { computed, ref } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import IconLoader from '../components/svg/IconLoader.vue'
  import { useAuthStore } from '../stores/useAuthStore'
  import BaseSquareButton from './base/BaseSquareButton.vue'
  import { useToast } from 'vue-toastification'

  withDefaults(
    defineProps<{
      buttonVisibility?: boolean
    }>(),
    {
      buttonVisibility: true
    }
  )
  const router = useRouter()
  const route = useRoute()
  const toast = useToast()
  const { token } = storeToRefs(useAuthStore())
  const elLogIn = ref<HTMLButtonElement>()
  const elSignUp = ref<HTMLButtonElement>()

  const toUrlOnIcon = computed(() => {
    // Only if the current page is either signup or login, navigate to TopIndex
    return router.currentRoute.value.meta.requiresAuth ? 'home' : 'top'
  })

  const logInnHandler = () => router.push({ name: 'login' })
  const signUpHandler = () => router.push({ name: 'signup' })
  const logOutHandler = () => {
    token.value = null
    toast.success('Successfully Logged Out')
    router.push({ name: 'top' })
  }
</script>
