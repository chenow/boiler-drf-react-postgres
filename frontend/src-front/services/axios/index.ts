import axios, { AxiosInstance } from 'axios'

import setupInterceptors from './interceptors'

const apiBaseUrl: string = import.meta.env.VITE_API_BASE_URL

const axiosInstance: AxiosInstance = axios.create({ baseURL: apiBaseUrl })

setupInterceptors(axiosInstance)

export default axiosInstance
