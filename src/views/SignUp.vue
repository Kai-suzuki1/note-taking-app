<template>
  <TheScreenContainer>
    <div class="flex items-center justify-center pt-14">
      <div class="flex w-3/5 items-center justify-center rounded-3xl bg-gray-dark">
        <div class="flex w-3/5 flex-col items-center justify-center">
          <IconLoader
            name="logo_large"
            class="mt-12 mb-5"
          />
          <p class="mb-5 text-3xl font-bold leading-9">Sign Up</p>
          <div class="flex w-full flex-col items-stretch">
            <BaseInputField
              v-model:value="inputData.username.value"
              v-model:is-valid-input="inputData.username.isValid"
              title="User Name"
              place-holder="Enter Your Account Name!"
              validation-type="text"
              validation-key="username"
              fe-error-message="Name should be 120 letters or less"
              :be-error-messages="beErrorMessages.username"
              class="mb-3"
            />
            <BaseInputField
              v-model:value="inputData.email.value"
              v-model:is-valid-input="inputData.email.isValid"
              title="Email"
              place-holder="example@email.com"
              validation-type="email"
              validation-key="email"
              fe-error-message="Input email is invalid format"
              :be-error-messages="beErrorMessages.email"
              class="mb-3"
            />
            <BaseInputField
              v-model:value="inputData.password.value"
              v-model:is-valid-input="inputData.password.isValid"
              title="Password"
              place-holder="Enter Your Secret Password!"
              validation-type="password"
              validation-key="password"
              fe-error-message="Password should be more than 4 and 32 or less"
              :be-error-messages="beErrorMessages.password"
              class="mb-6"
            />
          </div>
          <BaseSquareButton
            width-num="w-36"
            size="lg"
            color="purple"
            :disabled="!canSubmit"
            class="mb-3"
            @on-click="submitHandler"
          >
            <template #text>Sing Up</template>
            <template
              v-if="canSubmit"
              #icon
            >
              <CheckMedium class="ml-1" />
            </template>
          </BaseSquareButton>
          <div class="mb-3 text-center text-xs">
            <p>By creating an account</p>
            <p>you agree to our Terms of Service</p>
            <p>
              <RouterLink
                class="text-blue hover:underline"
                :to="{ name: 'login' }"
                >Log In Page Is Here</RouterLink
              >
            </p>
          </div>
        </div>
      </div>
    </div>
  </TheScreenContainer>
</template>

<script setup lang="ts">
  import { storeToRefs } from 'pinia'
  import { computed, onBeforeMount, ref } from 'vue'
  import TheScreenContainer from '../components/TheScreenContainer.vue'
  import BaseInputField from '../components/base/BaseInputField.vue'
  import BaseSquareButton from '../components/base/BaseSquareButton.vue'
  import CheckMedium from '../components/svg/CheckMedium.vue'
  import IconLoader from '../components/svg/IconLoader.vue'
  import { useAuthStore } from '../stores/useAuthStore'
  import { SignUpForm, beSignUpFormErrorMessage } from '../types'
  import { SignUpRequestBody } from '../types/api/request/types'

  const authStore = useAuthStore()
  const { signUpError } = storeToRefs(authStore)
  // Clear validation error whenever a user accessed the page
  onBeforeMount(() => authStore.clearSignUpError())

  const isLoading = ref<boolean>(false)
  const inputData = ref<SignUpForm>({
    username: {
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

  const initialErrorMessages: beSignUpFormErrorMessage = {
    username: [],
    email: [],
    password: []
  }
  const beErrorMessages = computed<beSignUpFormErrorMessage>(() => {
    return signUpError.value && signUpError.value.message
      ? signUpError.value.message?.reduce(
          (acc, cur) => ({
            ...acc,
            [cur.fieldName]: [...acc[cur.fieldName], cur.detail]
          }),
          initialErrorMessages
        )
      : initialErrorMessages
  })

  const reqBody = computed<SignUpRequestBody>(() => ({
    username: inputData.value.username.value,
    email: inputData.value.email.value,
    password: inputData.value.password.value
  }))

  const canSubmit = computed<boolean>(() => {
    return (
      inputData.value.username.isValid &&
      inputData.value.email.isValid &&
      inputData.value.password.isValid &&
      !isLoading.value
    )
  })

  const submitHandler = async () => {
    if (canSubmit.value) {
      isLoading.value = await true
      await authStore.signUp(reqBody.value)
      isLoading.value = await false
    }
  }
</script>
