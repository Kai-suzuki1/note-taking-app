import { HttpStatusCodeValue } from '../..'

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
  statusCode: HttpStatusCodeValue
  localDateTime: string
}

export type ErrorResponseWithDetail<T> = Omit<ErrorResponse, 'message'> & { message: ValidationErrorMessage<T>[] }

export type AuthenticationResponse = { token: string }

// API Response type for getNotes
export type PreviewNoteResponse = {
  id: number
  title: string
  contents: string
  createdAt: string
  createdBy: string
  updatedAt: string
  updatedBy: string
  deletedFlag: boolean
  deletableFlag: boolean
}

export type PermissionType = {
  readOnly: boolean
  readWrite: boolean
}

export type UserAuthorization = {
  permissionId: number
  userId: number
  type: PermissionType
}

// API Response type for getNoteDetail
export type NoteDetailResponse = Omit<PreviewNoteResponse, 'deletableFlag'> & {
  userIsAuthor: boolean
  sharedUsers: UserAuthorization[]
}
