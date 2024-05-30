import apiClient from '../http-common'
import { PreviewNoteResponse } from '../types/api/response/types'

export const getNotes = () => apiClient.get<PreviewNoteResponse[]>('v1/notes')
