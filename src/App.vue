<template>
  <div class="h-screen">
    <template v-if="isNotFound">
      <NotFound />
    </template>
    <template v-else-if="isSystemError">
      <InternalServerError />
    </template>
    <template v-else>
      <RouterView
        name="Header"
        v-slot="{ Component, route }"
      >
        <Transition
          mode="out-in"
          enter-active-class="transition-opacity"
          leave-active-class="transition-opacity"
          enter-from-class="opacity-0"
          leave-to-class="opacity-0"
        >
          <div :key="route.fullPath">
            <component :is="Component" />
          </div>
        </Transition>
      </RouterView>
      <RouterView v-slot="{ Component, route }">
        <Transition
          mode="out-in"
          enter-active-class="transition-opacity"
          leave-active-class="transition-opacity"
          enter-from-class="opacity-0"
          leave-to-class="opacity-0"
        >
          <div :key="route.fullPath">
            <component :is="Component" />
          </div>
        </Transition>
      </RouterView>
    </template>
  </div>
</template>

<script setup lang="ts">
  import { storeToRefs } from 'pinia'
  import { RouterView } from 'vue-router'
  import { useErrorFlagStore } from './stores/useErrorFlagStore'
  import InternalServerError from './views/InternalServerError.vue'
  import NotFound from './views/NotFound.vue'

  const store = useErrorFlagStore()
  const { isNotFound, isSystemError } = storeToRefs(store)
</script>
