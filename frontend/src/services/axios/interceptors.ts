import { AxiosInstance, InternalAxiosRequestConfig } from 'axios'

import { getAccessToken } from '@services/api/auth/utils'

const AUTH_PREFIX = 'JWT'

const setupInterceptors = (axiosInstance: AxiosInstance): void => {
  axiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const token = getAccessToken()
    config.headers.Authorization = `${AUTH_PREFIX} ${token}`
    return config
  })
}

export default setupInterceptors
