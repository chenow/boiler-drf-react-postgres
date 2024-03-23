import { useMutation } from 'react-query'

import axiosInstance from '@services/axios'

import { BAD_CREDENTIALS_STATUS, USER_ALREADY_EXISTS_STATUS } from './constants'
import { setAccessToken } from './utils'

type LoginApiPayload = {
  email: string
  password: string
}
type LoginApiResponse = {
  access: string
  refresh: string
}

const loginAPI = async ({ email, password }: LoginApiPayload) => {
  const response = await axiosInstance
    .post<LoginApiResponse>('/authentification/login', {
      email,
      password,
    })
    .catch()
  if (response.status === BAD_CREDENTIALS_STATUS) {
  }
  if (response.status === USER_ALREADY_EXISTS_STATUS) {
  }
  return response.data
}

export const useLogin = ({ email, password }: LoginApiPayload) => {
  return useMutation<LoginApiResponse, Error, LoginApiPayload>(() => loginAPI({ email, password }), {
    onSuccess: (data) => {
      setAccessToken(data.access)
    },
  })
}
