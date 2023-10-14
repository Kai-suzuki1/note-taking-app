<template>
  <template v-if="Array.isArray(errorValue)">
    <p
      v-for="(message, index) in errorValue"
      :key="index"
      class="text-sm text-red"
    >
      {{ message }}
    </p>
  </template>
  <p
    v-else
    class="text-sm text-red"
  >
    {{ errorValue }}
  </p>
</template>

<script setup lang="ts">
  defineProps<{
    errorValue: string | string[]
  }>()
</script>
