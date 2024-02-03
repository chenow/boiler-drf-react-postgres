import axios, { AxiosInstance } from 'axios'

import setupInterceptors from './interceptors'

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL as string
const axiosInstance: AxiosInstance = axios.create({ baseURL: apiBaseUrl })
setupInterceptors(axiosInstance)

export default axiosInstance
