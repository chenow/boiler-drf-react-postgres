import axiosInstance from '.'

export interface LoginProps {
  email: string
  password: string
  handleBadCredentials?: () => void
  handleUserAlreadyExists?: () => void
}

export type LoginResponse = Promise<LoginApiResponse>

export interface LoginApiResponse {
  access: string
  refresh: string
}

const login = async ({
  email,
  password,
  handleBadCredentials,
  handleUserAlreadyExists,
}: LoginProps): LoginResponse => {
  const response = await axiosInstance.post<LoginApiResponse>('/authentification/login', {
    email,
    password,
  })
  if (response.status === 401 && handleBadCredentials) {
    handleBadCredentials()
  }
  if (response.status === 409 && handleUserAlreadyExists) {
    handleUserAlreadyExists()
  }
  return response.data
}

export default login
