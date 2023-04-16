<template>
  <div class="h-screen bg-gray-light">
    <TheHeader :button-visibility="false" />
    <div class="mt-8 flex items-center justify-center">
      <div class="flex w-3/5 items-center justify-center rounded-3xl bg-gray-dark">
        <div class="flex w-3/5 flex-col items-center justify-center">
          <IconLoader
            name="logo_large"
            class="mt-12 mb-5"
          />
          <p class="mb-5 text-3xl font-bold leading-9">Sign Up</p>
          <div class="flex w-full flex-col items-stretch">
            <BaseInputField
              v-model:value="inputData.name.value"
              v-model:is-valid-input="inputData.name.isValid"
              title="User Name"
              place-holder="Enter Your Account Name!"
              validation-type="text"
              validation-key="username"
              error-message="Name should be 120 letters or less"
              class="mb-3"
            />
            <BaseInputField
              v-model:value="inputData.email.value"
              v-model:is-valid-input="inputData.email.isValid"
              title="Email"
              place-holder="example@email.com"
              validation-type="email"
              validation-key="email"
              error-message="Input email is invalid format"
              class="mb-3"
            />
            <BaseInputField
              v-model:value="inputData.password.value"
              v-model:is-valid-input="inputData.password.isValid"
              title="Password"
              place-holder="Enter Your Secret Password!"
              validation-type="password"
              validation-key="password"
              error-message="Password should be more than 4 and 32 or less"
              class="mb-6"
            />
          </div>
          <BaseSquareButton
            width-num="w-36"
            size="lg"
            color="purple"
            :disabled="!canSubmit"
            class="mb-3"
          >
            <template #text>Sing Up</template>
            <template
              v-if="canSubmit"
              #icon
            >
              <CheckMedium class="ml-1" />
            </template>
          </BaseSquareButton>
          <p class="text-xs">By creating an account</p>
          <p class="mb-3 text-xs">you agree to our Terms of Service</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed, ref } from 'vue'
  import TheHeader from '../components/TheHeader.vue'
  import BaseInputField from '../components/base/BaseInputField.vue'
  import BaseSquareButton from '../components/base/BaseSquareButton.vue'
  import CheckMedium from '../components/svg/CheckMedium.vue'
  import IconLoader from '../components/svg/IconLoader.vue'
  import { SignUpForm } from '../types'

  const inputData = ref<SignUpForm>({
    name: {
      value: '',
      isValid: false
    },
    email: {
      value: '',
      isValid: false
    },
    password: {
      value: '',
      isValid: false
    }
  })

  const canSubmit = computed<boolean>(() => {
    return inputData.value.name.isValid && inputData.value.email.isValid && inputData.value.password.isValid
  })
</script>
