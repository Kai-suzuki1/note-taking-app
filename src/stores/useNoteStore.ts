import { HttpStatusCode, isAxiosError } from 'axios'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useToast } from 'vue-toastification'
import { deleteNoteApi, getNoteDetailApi, getNotesApi, updateNoteApi } from '../api/notes'
import { NoteUpdateRequestBody } from '../types/api/request/types'
import {
  ErrorResponse,
  ErrorResponseWithDetail,
  NoteDetailResponse,
  PreviewNoteResponse
} from '../types/api/response/types'

export const useNoteStore = defineStore(`note`, () => {
  const toast = useToast()
  const notes = ref<PreviewNoteResponse[]>([])
  const noteDetail = ref<NoteDetailResponse | null>(null)
  const search = ref<string>('')
  const updateNoteError = ref<Partial<ErrorResponseWithDetail<NoteUpdateRequestBody>>>({})

  const setNotes = (value: PreviewNoteResponse[]) => {
    notes.value = value
  }
  const setNoteDetail = (value: NoteDetailResponse) => {
    noteDetail.value = value
  }
  const setSearch = (enteredVal: string) => (search.value = enteredVal)
  const clearUpdateNoteError = async () => {
    updateNoteError.value = {}
  }

  const fetchNotes = async () => {
    try {
      const { data } = await getNotesApi()
      setNotes(data)
    } catch (error) {
      if (
        isAxiosError<ErrorResponse>(error) &&
        error?.response &&
        error.response?.status !== HttpStatusCode.Forbidden
      ) {
        toast.error('Unexpected Error Occurred')
      }
    }
  }

  const fetchNoteDetail = async (id: number) => {
    try {
      const { data } = await getNoteDetailApi(id)
      setNoteDetail(data)
    } catch (error) {
      if (
        isAxiosError<ErrorResponse>(error) &&
        error?.response &&
        error.response?.status !== HttpStatusCode.Forbidden
      ) {
        toast.error('Unexpected Error Occurred')
      }
    }
  }

  const deleteNote = async (noteId: number) => {
    try {
      await deleteNoteApi(noteId)
      toast.success('Successfully Deleted')
    } catch (error) {
      if (
        isAxiosError<ErrorResponse>(error) &&
        error?.response &&
        error.response?.status === HttpStatusCode.Forbidden
      ) {
        toast.error(`${error.response.data.message}`)
      } else {
        toast.error('Unexpected Error Occurred')
      }
    } finally {
      await fetchNoteDetail(noteId)
      await fetchNotes()
    }
  }

  const updateNote = async (noteId: number, reqBody: NoteUpdateRequestBody) => {
    try {
      await updateNoteApi(noteId, reqBody)
      // clear error
      await clearUpdateNoteError()
      toast.success('Successfully Saved Changes')
      await fetchNotes()
    } catch (error) {
      if (
        isAxiosError<ErrorResponseWithDetail<NoteUpdateRequestBody>>(error) &&
        error?.response &&
        error.response?.status === HttpStatusCode.BadRequest
      ) {
        updateNoteError.value = error.response.data
        toast.error('Failed to save changes')
      } else {
        toast.error('Unexpected Error Occurred')
      }
    }
  }

  return {
    notes,
    noteDetail,
    search,
    setNotes,
    setSearch,
    fetchNotes,
    deleteNote,
    fetchNoteDetail,
    updateNote,
    updateNoteError
  }
})
