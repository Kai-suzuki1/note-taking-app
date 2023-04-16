import { BUTTON_COLOR_TYPE, FORM_INPUT_TYPE } from './const'

// Util Types
export type PickValue<T> = T extends { [K in keyof T]: infer U } ? U : never

// Const Value Types
export type ButtonColorTypeValue = PickValue<typeof BUTTON_COLOR_TYPE>
export type FormInputTypeValue = PickValue<typeof FORM_INPUT_TYPE>

// API Request
export interface SignUpRequest {
  name: string
  email: string
  password: string
}

// Form Input
export type SignUpForm = {
  [K in keyof SignUpRequest]: {
    value: string
    isValid: boolean
  }
}
