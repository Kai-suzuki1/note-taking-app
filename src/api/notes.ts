import apiClient from '../http-common'
import { PreviewNoteResponse } from '../types/api/response/types'

export const getNotes = async () => apiClient.get<PreviewNoteResponse[]>('v1/notes')
export const deleteNote = async (id: number) => apiClient.patch(`v1/notes/${id}/delete`)
