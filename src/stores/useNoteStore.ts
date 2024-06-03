import { HttpStatusCode, isAxiosError } from 'axios'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useToast } from 'vue-toastification'
import { deleteNote, getNotes } from '../api/notes'
import { ErrorResponse, PreviewNoteResponse } from '../types/api/response/types'

export const useNoteStore = defineStore(`note`, () => {
  const toast = useToast()
  const notes = ref<PreviewNoteResponse[]>([])
  const search = ref<string>('')

  const setNotes = (value: PreviewNoteResponse[]) => {
    notes.value = value
  }
  const setSearch = (enteredVal: string) => (search.value = enteredVal)

  const fetchNotes = async (): Promise<PreviewNoteResponse[] | undefined> => {
    try {
      const { data } = await getNotes()
      setNotes(data)
      return notes.value
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

  const removeNote = async (userId: number) => {
    try {
      await deleteNote(userId)
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
      await fetchNotes()
    }
  }

  return { notes, setNotes, search, setSearch, fetchNotes, removeNote }
})
