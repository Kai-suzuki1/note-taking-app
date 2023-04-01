<template>
  <header class="flex h-16 items-center justify-between bg-gray-dark px-3.5">
    <IconLoader name="logo_small" />
    <div>
      <BaseSquareButton
        width-num="w-31"
        size="lg"
        color="purple"
      >
        <template #text>Log In</template>
        <template #icon>
          <CheckMedium class="ml-1" />
        </template>
      </BaseSquareButton>
      <BaseSquareButton
        class="ml-3.5"
        width-num="w-31"
        size="lg"
        color="yellow"
      >
        <template #text>Sign Up</template>
        <template #icon>
          <CheckMedium class="ml-1" />
        </template>
      </BaseSquareButton>
    </div>
  </header>
</template>

<script setup lang="ts">
  import IconLoader from '../components/svg/IconLoader.vue'
  import BaseSquareButton from './base/BaseSquareButton.vue'
  import CheckMedium from './svg/CheckMedium.vue'
</script>
