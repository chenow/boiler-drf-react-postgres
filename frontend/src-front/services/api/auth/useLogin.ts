import login, { LoginApiResponse, LoginProps } from '@services/axios/login'
import { useMutation, useQueryClient } from 'react-query'
import { setAccessToken } from './utils'

interface useLoginResponse {
  isLoading: boolean
  isError: boolean
  isSuccess: boolean
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
  const queryClient = useQueryClient()

  const {
    isLoading,
    isError,
    isSuccess,
    data: accessToken,
  } = useMutation<LoginApiResponse, Error, useLoginProps>(
    () => login({ email, password, handleBadCredentials, handleUserAlreadyExists }),
    {
      onSuccess: (data) => {
        if (data.access) {
          setAccessToken(data.access)
          queryClient.invalidateQueries('user')
        }
        if (onSuccessfulLogin) {
          onSuccessfulLogin()
        }
      },
    }
  )
  return { isLoading, isError, accessToken: accessToken?.access, isSuccess }
}
