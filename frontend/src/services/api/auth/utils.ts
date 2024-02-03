import Cookies from 'js-cookie'

const ACCESS_TOKEN_COOKIE_NAME = 'access_token'
const LOGIN_URL = '/login'

export function setAccessToken(accessToken: string): void {
  Cookies.set(ACCESS_TOKEN_COOKIE_NAME, accessToken, { expires: 7 })
}

export function getAccessToken(): string | null {
  const cookie = Cookies.get(ACCESS_TOKEN_COOKIE_NAME)
  if (cookie === undefined) {
    return null
  }
  return cookie
}

export function isAuthenticated(): boolean {
  return getAccessToken() !== null
}

export const logout = (): void => {
  Cookies.remove(ACCESS_TOKEN_COOKIE_NAME)
  window.location.href = LOGIN_URL // Redirect to login page or home page
}
