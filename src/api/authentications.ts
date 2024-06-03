import apiClient from '../http-common'
import { LogInRequestBody, SignUpRequestBody } from '../types/api/request/types'
import { AuthenticationResponse } from '../types/api/response/types'

export const signUpUser = async (reqBody: SignUpRequestBody) =>
  apiClient.post<AuthenticationResponse>('/v1/auth/register', reqBody)

export const logInUser = async (reqBody: LogInRequestBody) =>
  apiClient.post<AuthenticationResponse>('/v1/auth/authenticate', reqBody)
