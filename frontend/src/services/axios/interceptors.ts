import { type AxiosInstance, type InternalAxiosRequestConfig } from 'axios'

import { getAccessToken } from '#libs/auth/utils'

const AUTH_PREFIX = 'JWT'

const setupInterceptors = (axiosInstance: AxiosInstance): void => {
  axiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const token = getAccessToken()
    if (token) {
      config.headers.Authorization = `${AUTH_PREFIX} ${token}`
    }
    return config
  })
}

export default setupInterceptors
