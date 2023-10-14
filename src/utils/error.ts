import axios, { AxiosError } from 'axios'

export const isAxiosError = <R>(error: unknown): error is AxiosError<R> => {
  return axios.isAxiosError(error)
}
