import { PreviewNoteResponse } from '../response/types'

export type SignUpRequestBody = {
  username: string // username
  email: string
  password: string
}

export type LogInRequestBody = Omit<SignUpRequestBody, 'username'>

export type NoteUpdateRequestBody = Pick<PreviewNoteResponse, 'title' | 'contents'>
