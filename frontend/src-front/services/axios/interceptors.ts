import { AxiosInstance, InternalAxiosRequestConfig } from 'axios'

import { getAccessToken } from '@services/api/auth/utils'

const setupInterceptors = (axiosInstance: AxiosInstance): void => {
  axiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const token = getAccessToken()
    if (token) {
      config.headers = config.headers || {}
      config.headers['Authorization'] = `JWT ${token}`
    }
    return config
  })
}

export default setupInterceptors
