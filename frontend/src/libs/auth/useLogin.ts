import { useMutation } from 'react-query'

import axiosInstance from '@services/axios'

import { BAD_CREDENTIALS_STATUS, USER_ALREADY_EXISTS_STATUS } from './constants'
import { setAccessToken } from './utils'

type LoginProps = {
  email: string
  password: string
}
type LoginApiResponse = {
  access: string
  refresh: string
}
type LoginResponse = Promise<LoginApiResponse>

const login = async ({ email, password }: LoginProps): LoginResponse => {
  const response = await axiosInstance.post<LoginApiResponse>('/authentification/login', {
    email,
    password,
  })
  if (response.status === BAD_CREDENTIALS_STATUS) {
  }
  if (response.status === USER_ALREADY_EXISTS_STATUS) {
  }
  return response.data
}

type useLoginProps = LoginProps
type useLoginResponse = {
  isLoginLoading: boolean
  isLoginError: boolean
  isLoginSuccess: boolean
  accessToken: string | undefined
}

export const useLogin = ({ email, password }: useLoginProps): useLoginResponse => {
  const {
    isSuccess: isLoginSuccess,
    isLoading: isLoginLoading,
    isError: isLoginError,
    data: accessToken,
  } = useMutation<LoginApiResponse, Error, useLoginProps>(() => login({ email, password }), {
    onSuccess: (data) => {
      setAccessToken(data.access)
    },
  })
  return { isLoginLoading, isLoginError, isLoginSuccess, accessToken: accessToken?.access }
}
