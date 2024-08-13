import apiClient from '../http-common'
import { NoteUpdateRequestBody } from '../types/api/request/types'
import { NoteDetailResponse, PreviewNoteResponse } from '../types/api/response/types'

export const getNotesApi = async () => apiClient.get<PreviewNoteResponse[]>('v1/notes')
export const deleteNoteApi = async (noteId: number) => apiClient.patch(`v1/notes/${noteId}/delete`)
export const getNoteDetailApi = async (noteId: number) => apiClient.get<NoteDetailResponse>(`v1/notes/${noteId}`)
export const updateNoteApi = async (noteId: number, reqBody: NoteUpdateRequestBody) =>
  apiClient.patch<NoteUpdateRequestBody>(`v1/notes/${noteId}`, reqBody)
