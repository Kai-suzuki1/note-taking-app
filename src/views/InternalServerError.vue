<template>
  <TheHeader :button-visibility="false" />
  <TheScreenContainer
    color="white"
    class="flex items-center justify-center"
  >
    <div class="flex flex-col items-center">
      <h1 class="px-5 text-9xl tracking-widest text-purple opacity-30 drop-shadow-md">500</h1>
      <h2 class="px-5 text-6xl text-gray-dark">Internal Server Error</h2>
      <div class="ml-auto flex items-center">
        <BaseRoundedButton
          class="before: relative mr-7 mb-8 animate-bounce before:absolute before:-right-5 before:top-12 before:h-6 before:w-6 before:rounded-full before:bg-yellow before:opacity-60 before:content-[''] after:absolute after:-right-9 after:top-18 after:h-4 after:w-4 after:rounded-full after:bg-yellow after:opacity-40 after:content-['']"
          width-num="w-56"
          color="yellow"
          size="lg"
          @on-click="toTop"
        >
          <template #text>Wanna Go Home...</template>
        </BaseRoundedButton>
        <IconLoader name="homer_simpson" />
      </div>
    </div>
  </TheScreenContainer>
</template>

<script setup lang="ts">
  import { useRouter } from 'vue-router'
  import TheHeader from '../components/TheHeader.vue'
  import TheScreenContainer from '../components/TheScreenContainer.vue'
  import BaseRoundedButton from '../components/base/BaseRoundedButton.vue'
  import IconLoader from '../components/svg/IconLoader.vue'

  const router = useRouter()

  const toTop = () => router.push({ name: 'top' })
</script>
