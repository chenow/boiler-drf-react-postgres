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
  const response = await axiosInstance.post<LoginApiResponse>('/authentification/login/', {
    email,
    password,
  })
  if (response.status === BAD_CREDENTIALS_STATUS) {
    console.log('Bad credentials')
  }
  if (response.status === USER_ALREADY_EXISTS_STATUS) {
    console.log('User already exists')
  }
  return response.data
}

export const useLogin = () => {
  return useMutation<LoginApiResponse, Error, LoginApiPayload>(loginAPI, {
    onSuccess: (data) => {
      setAccessToken(data.access)
    },
  })
}
