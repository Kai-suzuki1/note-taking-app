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
        :class="{ 'border-red': errorFields?.[validationKey]?.length && isEnteredInput }"
        @input="onInputValue"
        @blur.once="blurHandler"
      />
      <div
        v-if="
          (errorFields?.[validationKey]?.length && isEnteredInput) ||
          (beErrorMessages && beErrorMessages.filter((item) => item !== '')?.length > 0)
        "
      >
        <InputErrors :error-value="validationMessage" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useAsyncValidator } from '@vueuse/integrations/useAsyncValidator'
  import type { Rules } from 'async-validator'
  import { computed, ref, watch } from 'vue'
  import { FormInputTypeValue } from '../../types'
import InputErrors from '../InputErrors.vue'

  const props = defineProps<{
    value: string
    title: string
    placeHolder?: string
    validationType: FormInputTypeValue
    validationKey: string
    feErrorMessage?: string // front-end validation error message
    beErrorMessages?: string[] // back-end validation error messages
    isValidInput: boolean
  }>()

  const isEnteredInput = ref<boolean>(false)

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
            message: props.feErrorMessage,
            required: true
          }
        }
      case 'email':
        return {
          [props.validationKey]: {
            type: 'email',
            min: 1,
            max: 120,
            message: props.feErrorMessage,
            required: true
          }
        }
      case 'password':
        return {
          [props.validationKey]: {
            type: 'string',
            min: 4,
            max: 32,
            message: props.feErrorMessage,
            required: true
          }
        }
    }
  })()

  const { pass, errorFields } = useAsyncValidator(formItem, rules)

  const validationMessage = computed(() => {
    return props?.beErrorMessages
      ? props.beErrorMessages.concat(errorFields.value?.[props.validationKey]?.[0]?.message ?? '')
      : [errorFields.value?.[props.validationKey]?.[0]?.message ?? '']
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

  const blurHandler = () => (isEnteredInput.value = !isEnteredInput.value)

  watch([pass], () => {
    emits('update:isValidInput', pass.value)
  })
</script>
