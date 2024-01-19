import login, { LoginApiResponse, LoginProps } from '@services/axios/login'
import { useMutation } from 'react-query'

import { setAccessToken } from './utils'

interface useLoginResponse {
  isLoginLoading: boolean
  isLoginError: boolean
  isLoginSuccess: boolean
  accessToken: string | undefined
}

interface useLoginProps extends LoginProps {
  onSuccessfulLogin?: () => void
}

export const useLogin = ({
  email,
  password,
  handleBadCredentials,
  handleUserAlreadyExists,
  onSuccessfulLogin,
}: useLoginProps): useLoginResponse => {
  const {
    isSuccess: isLoginSuccess,
    isLoading: isLoginLoading,
    isError: isLoginError,
    data: accessToken,
  } = useMutation<LoginApiResponse, Error, useLoginProps>(
    () => login({ email, password, handleBadCredentials, handleUserAlreadyExists }),
    {
      onSuccess: (data) => {
        if (data.access) {
          setAccessToken(data.access)
        }
        if (onSuccessfulLogin) {
          onSuccessfulLogin()
        }
      },
    }
  )
  return { isLoginLoading, isLoginError, isLoginSuccess, accessToken: accessToken?.access }
}
