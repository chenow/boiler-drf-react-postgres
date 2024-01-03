import Cookies from 'js-cookie'

export function setAccessToken(accessToken: string): void {
  Cookies.set('access_token', accessToken, { expires: 7 })
}

export function getAccessToken(): string | null {
  const cookie = Cookies.get('access_token')
  if (cookie === undefined) {
    return null
  }
  return cookie
}

export function isAuthenticated(): boolean {
  return getAccessToken() !== null
}

export const logout = (): void => {
  Cookies.remove('access_token')
  window.location.href = '/login' // Redirect to login page or home page
}
