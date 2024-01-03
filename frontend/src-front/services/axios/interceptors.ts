import { getAccessToken } from '@services/api/auth/utils'
import { AxiosInstance, InternalAxiosRequestConfig } from 'axios'

const setupInterceptors = (axiosInstance: AxiosInstance): void => {
  // Request Interceptor
  axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
      const token = getAccessToken()
      if (token) {
        config.headers = config.headers || {}
        config.headers['Authorization'] = `JWT ${token}`
      }
      return config
    }
  )
}

export default setupInterceptors
