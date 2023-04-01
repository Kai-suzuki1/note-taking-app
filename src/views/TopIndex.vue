<template>
  <div class="animate-bg-pan-left h-screen animate-color-change-2x">
    <TheHeader />
    <div class="mx-16">
      <div class="mt-40 w-full">
        <h1
          class="animate-text-pop-up-top text-8xl font-black italic leading-[7rem] tracking-wide text-blue-dark shadow-gray-dark drop-shadow-md"
        >
          TAKE a <span class="text-yellow-light">Note</span><br />WHEN You Are
          <span class="text-yellow-light">Sober</span>
        </h1>
        <BaseRoundedButton
          class="mt-6 hover:animate-jello-horizontal"
          width-num="w-41"
          size="xl"
          color="pink"
        >
          <template #text>JOIN US!</template>
          <template #icon>
            <IconLoader
              name="arrow_right_large"
              class="ml-2"
            />
          </template>
        </BaseRoundedButton>
      </div>
      <div class="w-42 h-18"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import BaseRoundedButton from '../components/base/BaseRoundedButton.vue'
  import IconLoader from '../components/svg/IconLoader.vue'
  import TheHeader from '../components/TheHeader.vue'
</script>
