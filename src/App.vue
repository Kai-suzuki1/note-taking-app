<template>
  <div class="h-screen">
    <!-- <template v-if="isNotFound">
      <NotFound />
    </template>
    <template v-else-if="isSystemError">
      <InternalServerError />
    </template> -->
    <RouterView
      name="Header"
      v-slot="{ Component, route }"
    >
      <template v-if="Component">
        <Transition
          mode="out-in"
          enter-active-class="transition-opacity"
          leave-active-class="transition-opacity"
          enter-from-class="opacity-0"
          leave-to-class="opacity-0"
        >
          <!-- <Suspense timeout="0"> -->
          <div :key="route.fullPath">
            <component :is="Component" />
          </div>
          <!-- <template #fallback>Loading...</template> -->
          <!-- </Suspense> -->
        </Transition>
      </template>
    </RouterView>
    <RouterView v-slot="{ Component, route }">
      <template v-if="Component">
        <Transition
          mode="out-in"
          enter-active-class="transition-opacity"
          leave-active-class="transition-opacity"
          enter-from-class="opacity-0"
          leave-to-class="opacity-0"
        >
          <Suspense timeout="0">
            <div :key="route.fullPath">
              <component :is="Component" />
            </div>
            <template #fallback>Loading...</template>
          </Suspense>
        </Transition>
      </template>
    </RouterView>
  </div>
</template>

<script setup lang="ts">
  import { RouterView } from 'vue-router'

  // const store = useErrorFlagStore()
  // const { isNotFound, isSystemError } = storeToRefs(store)

  import { useRouter } from 'vue-router'
  import { globalRouter } from './router/globalRouter'

  const router = useRouter()
  globalRouter.router = router
</script>
