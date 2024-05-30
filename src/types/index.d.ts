import 'vue-router'
import { SignUpRequestBody } from './api/request/types'
import { BUTTON_COLOR_TYPE, FILTER_TYPE, FORM_INPUT_TYPE, HTTP_STATUS_CODE, STATUS } from './const'

// Util Types
export type PickValue<T> = T extends { [K in keyof T]: infer U } ? U : never

// Const Value Types
export type ButtonColorTypeValue = PickValue<typeof BUTTON_COLOR_TYPE>
export type FormInputTypeValue = PickValue<typeof FORM_INPUT_TYPE>
export type StatusTypeValue = PickValue<typeof STATUS>
export type HttpStatusCodeValue = PickValue<typeof HTTP_STATUS_CODE> | 'NONE'
export type HttpStatusCodeWithDefault = HttpStatusCodeValue | 'NONE'
export type FilterTypeValue = PickValue<typeof FILTER_TYPE>

// Form Input
export type SignUpForm = {
  [K in keyof SignUpRequestBody]: {
    value: string
    isValid: boolean
  }
}

export type apiSignUpFormErrorMessage = {
  [key in keyof SignUpRequestBody]: string[]
}

export type LogInForm = Omit<SignUpForm, 'username'>

// JWT Token Payload
export type JwtClaimType = {
  sub: `${number}`
  iat: number
  exp: number
}

declare module 'vue-router' {
  interface RouteMeta {
    // must be declared by every route
    requiresAuth: boolean
  }
}
