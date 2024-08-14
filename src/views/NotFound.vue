<template>
  <TheHeader :button-visibility="false" />
  <TheScreenContainer
    color="white"
    class="flex items-center justify-center"
  >
    <div class="flex flex-col items-center">
      <h1 class="px-5 text-9xl tracking-widest text-purple opacity-30 drop-shadow-md">404</h1>
      <h2 class="px-5 text-6xl text-gray-dark">Oops! Page Not Found</h2>
      <h3 class="mt-3 px-5 text-4xl text-gray-dark opacity-70">Here are the considered causes</h3>
      <ul class="list-disc px-5 text-3xl text-gray-dark opacity-70">
        <li class="mt-2">Accessing Wrong URL</li>
        <li class="mt-2">You Already Deleted Your Account</li>
      </ul>
      <RouterLink
        :to="{ name: 'top' }"
        class="mt-5 block cursor-pointer text-2xl text-blue-light hover:underline"
        >Back to Home</RouterLink
      >
    </div>
  </TheScreenContainer>
</template>

<script setup lang="ts">
  import TheHeader from '../components/TheHeader.vue'
  import TheScreenContainer from '../components/TheScreenContainer.vue'
</script>
