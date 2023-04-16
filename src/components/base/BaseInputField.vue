<template>
  <div>
    <label
      class="font-bold leading-4"
      :for="`${placeHolder}_${title}`"
      >{{ title }}</label
    >
    <div class="mt-1">
      <input
        :id="`${placeHolder}_${title}`"
        :type="inputType"
        :value="value"
        :placeholder="placeHolder"
        class="h-12 w-full rounded py-2.5 px-3.5 text-sm placeholder:opacity-40 focus:border-blue-light focus:outline-none focus:ring-2"
        :class="{ 'border-red': errorFields?.[validationKey]?.length }"
        @input="onInputValue"
      />
      <div class="h-4.5">
        <p
          v-if="errorFields?.[validationKey]?.length"
          class="text-sm text-red"
        >
          {{ validationMessage }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useAsyncValidator } from '@vueuse/integrations/useAsyncValidator'
  import type { Rules } from 'async-validator'
  import { computed, watch } from 'vue'
  import { FormInputTypeValue } from '../../types'

  const props = defineProps<{
    value: string
    title: string
    placeHolder: string
    validationType: FormInputTypeValue
    validationKey: string
    errorMessage: string
    isValidInput: boolean
  }>()

  const formItem = computed<Record<string, string>>(() => {
    return {
      [props.validationKey]: props.value
    }
  })

  const rules: Rules = (() => {
    switch (props.validationType) {
      case 'text':
        return {
          [props.validationKey]: {
            type: 'string',
            min: 1,
            max: 120,
            message: props.errorMessage,
            required: true
          }
        }
      case 'email':
        return {
          [props.validationKey]: {
            type: 'email',
            min: 1,
            max: 120,
            message: props.errorMessage,
            required: true
          }
        }
      case 'password':
        return {
          [props.validationKey]: {
            type: 'string',
            min: 4,
            max: 32,
            message: props.errorMessage,
            required: true
          }
        }
    }
  })()

  const { pass, errorFields } = useAsyncValidator(formItem, rules)

  // const hasValidationError = computed<boolean>(() => {
  //   return errorFields?.value?.[props.validationKey].length
  // })

  const validationMessage = computed<string>(() => {
    return errorFields.value?.[props.validationKey][0].message ?? ''
  })

  const inputType = computed<FormInputTypeValue>(() => {
    switch (props.validationType) {
      case 'text':
      case 'email':
        return 'text'
      default:
        return 'password'
    }
  })

  const emits = defineEmits<{
    (e: 'update:value', value: string): void
    (e: 'update:isValidInput', isValidInput: boolean): void
  }>()

  const onInputValue = (e: Event) => {
    const target = e.target as HTMLInputElement
    emits('update:value', target.value)
  }

  watch(pass, () => {
    emits('update:isValidInput', pass.value)
  })
</script>
