/**
 * API Error Response Types
 * For receiving validation error response
 **/
export type ValidationErrorMessage<T> = {
  fieldName: keyof T
  detail: string
}

export type ErrorResponse = {
  path: string
  message: string
  statusCode: number
  localDateTime: string
}

export type ErrorResponseWithDetail<T> = Omit<ErrorResponse, 'message'> & { message: ValidationErrorMessage<T>[] }

export type AuthenticationResponse = { token: string }
