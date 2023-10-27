<template>
  <TheScreenContainer>
    <div class="flex items-center justify-center pt-20">
      <div class="flex w-3/5 items-center justify-center rounded-3xl bg-gray-dark">
        <div class="flex w-3/5 flex-col items-center justify-center">
          <IconLoader
            name="logo_large"
            class="mt-12 mb-5"
          />
          <p class="mb-5 text-3xl font-bold leading-9">Log in</p>
          <div class="flex w-full flex-col items-stretch">
            <BaseInputField
              v-model:value="inputData.email.value"
              v-model:is-valid-input="inputData.email.isValid"
              title="Email"
              validation-type="email"
              validation-key="email"
              fe-error-message="Input email is invalid format"
              class="mb-3"
            />
            <BaseInputField
              v-model:value="inputData.password.value"
              v-model:is-valid-input="inputData.password.isValid"
              title="Password"
              validation-type="password"
              validation-key="password"
              fe-error-message="Password should be more than 4 and 32 or less"
              class="mb-6"
            />
          </div>
          <BaseSquareButton
            width-num="w-36"
            size="lg"
            color="purple"
            :disabled="!canSubmit"
            class=""
            @on-click="submitHandler"
          >
            <template #text>Log in</template>
            <template
              v-if="canSubmit"
              #icon
            >
              <CheckMedium class="ml-1" />
            </template>
          </BaseSquareButton>
          <InputErrors
            v-if="logInError?.message"
            class="mt-1"
            error-value="Entered Email or Password Is Incorrect"
          />
          <p class="mt-3 text-xs">Don't have an account?</p>
          <p class="mb-3 text-xs">
            <RouterLink
              class="text-blue hover:underline"
              :to="{ name: 'signup' }"
              >Sign Up from Here</RouterLink
            >
          </p>
        </div>
      </div>
    </div>
  </TheScreenContainer>
</template>

<script setup lang="ts">
  import { storeToRefs } from 'pinia'
  import { computed, onBeforeMount, ref } from 'vue'
  import InputErrors from '../components/InputErrors.vue'
  import TheScreenContainer from '../components/TheScreenContainer.vue'
  import BaseInputField from '../components/base/BaseInputField.vue'
  import BaseSquareButton from '../components/base/BaseSquareButton.vue'
  import CheckMedium from '../components/svg/CheckMedium.vue'
  import IconLoader from '../components/svg/IconLoader.vue'
  import { useAuthStore } from '../stores/useAuthStore'
  import { LogInForm } from '../types'
  import { LogInRequestBody } from '../types/api/request/types'

  const authStore = useAuthStore()
  const { logInError } = storeToRefs(authStore)
  // Clear validation error whenever a user accessed the page
  onBeforeMount(() => authStore.clearLogInError())

  const isLoading = ref<boolean>(false)
  const inputData = ref<LogInForm>({
    email: {
      value: '',
      isValid: false
    },
    password: {
      value: '',
      isValid: false
    }
  })

  const reqBody = computed<LogInRequestBody>(() => ({
    email: inputData.value.email.value,
    password: inputData.value.password.value
  }))

  const canSubmit = computed<boolean>(() => {
    return inputData.value.email.isValid && inputData.value.password.isValid && !isLoading.value
  })

  const submitHandler = async () => {
    if (canSubmit.value) {
      isLoading.value = await true
      await authStore.logIn(reqBody.value)
      isLoading.value = await false
    }
  }
</script>
