<template>
  <header class="flex h-16 items-center justify-between bg-gray-dark px-3.5">
    <IconLoader name="logo_small" />
    <div v-if="buttonVisibility">
      <BaseSquareButton
        width-num="w-31"
        size="lg"
        color="purple"
        ref="elLogIn"
      >
        <template #text>Log In</template>
        <template
          v-if="isLogInHovered"
          #icon
        >
          <CheckMedium class="ml-1" />
        </template>
      </BaseSquareButton>
      <BaseSquareButton
        class="ml-3.5"
        width-num="w-31"
        size="lg"
        color="yellow"
        ref="elSignUp"
      >
        <template #text>Sign Up</template>
        <template
          v-if="isSignUpHovered"
          #icon
        >
          <CheckMedium class="ml-1" />
        </template>
      </BaseSquareButton>
    </div>
  </header>
</template>

<script setup lang="ts">
  import { useElementHover } from '@vueuse/core'
  import { ref } from 'vue'
  import IconLoader from '../components/svg/IconLoader.vue'
  import BaseSquareButton from './base/BaseSquareButton.vue'
  import CheckMedium from './svg/CheckMedium.vue'

  withDefaults(
    defineProps<{
      buttonVisibility?: boolean
    }>(),
    {
      buttonVisibility: true
    }
  )

  const elLogIn = ref<HTMLButtonElement>()
  const elSignUp = ref<HTMLButtonElement>()

  const isLogInHovered = useElementHover(elLogIn, { delayEnter: 200, delayLeave: 200 })
  const isSignUpHovered = useElementHover(elSignUp, { delayEnter: 200, delayLeave: 200 })
</script>
