import axiosInstance from '.'

export interface LoginProps {
  email: string
  password: string
  handleBadCredentials?: () => void
  handleUserAlreadyExists?: () => void
}
export interface LoginApiResponse {
  access: string
  refresh: string
}
type LoginResponse = Promise<LoginApiResponse>

const LOGIN_URL = '/authentification/login'
const BAD_CREDENTIALS_STATUS = 401
const USER_ALREADY_EXISTS_STATUS = 409

const login = async ({ email, password, handleBadCredentials, handleUserAlreadyExists }: LoginProps): LoginResponse => {
  const response = await axiosInstance.post<LoginApiResponse>(LOGIN_URL, {
    email,
    password,
  })
  if (response.status === BAD_CREDENTIALS_STATUS && handleBadCredentials) {
    handleBadCredentials()
  }
  if (response.status === USER_ALREADY_EXISTS_STATUS && handleUserAlreadyExists) {
    handleUserAlreadyExists()
  }
  return response.data
}

export default login
