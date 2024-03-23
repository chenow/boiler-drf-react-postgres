import Cookies from 'js-cookie'

import { ACCESS_TOKEN_COOKIE_NAME, LOGIN_URL } from './constants'

export function setAccessToken(accessToken: string) {
  Cookies.set(ACCESS_TOKEN_COOKIE_NAME, accessToken, { expires: 7 })
}

export function getAccessToken() {
  const cookie = Cookies.get(ACCESS_TOKEN_COOKIE_NAME)
  if (cookie === undefined) {
    return null
  }
  return cookie
}

export function isAuthenticated() {
  return getAccessToken() !== null
}

export const logout = () => {
  Cookies.remove(ACCESS_TOKEN_COOKIE_NAME)
  window.location.href = LOGIN_URL // Redirect to login page or home page
}
