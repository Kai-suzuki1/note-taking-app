import { LogInRequestBody, SignUpRequestBody } from './api/request/types'
import { BUTTON_COLOR_TYPE, FORM_INPUT_TYPE, HTTP_STATUS_CODE, STATUS } from './const'

// Util Types
export type PickValue<T> = T extends { [K in keyof T]: infer U } ? U : never

// Const Value Types
export type ButtonColorTypeValue = PickValue<typeof BUTTON_COLOR_TYPE>
export type FormInputTypeValue = PickValue<typeof FORM_INPUT_TYPE>
export type StatusTypeValue = PickValue<typeof STATUS>
export type HttpStatusCodeValue = PickValue<typeof HTTP_STATUS_CODE>

// Form Input
export type SignUpForm = {
  [K in keyof SignUpRequestBody]: {
    value: string
    isValid: boolean
  }
}

export type beSignUpFormErrorMessage = {
  [key in keyof SignUpRequestBody]: string[]
}

export type LogInForm = Omit<SignUpForm, 'username'>

export type beLogInFormErrorMessage = {
  [key in keyof LogInRequestBody]: string[]
}

// JWT Token Payload
export type JwtClaimType = {
  sub: `${number}`
  iat: number
  exp: number
}
