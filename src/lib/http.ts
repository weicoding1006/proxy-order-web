import axios from 'axios'
import type { AxiosRequestConfig } from 'axios'

const instance = axios.create({
  baseURL: '',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
})

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`
  }
  return config
})

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    const message = error.response?.data?.message ?? error.message ?? 'Request failed'
    const status = error.response?.status ?? 0
    const err = new Error(message) as Error & { status: number }
    err.status = status
    return Promise.reject(err)
  }
)

export const get = <T>(url: string, config?: AxiosRequestConfig) =>
  instance.get<T>(url, config).then((r) => r.data)

export const post = <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
  instance.post<T>(url, data, config).then((r) => r.data)

export const put = <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
  instance.put<T>(url, data, config).then((r) => r.data)

export const del = <T>(url: string, config?: AxiosRequestConfig) =>
  instance.delete<T>(url, config).then((r) => r.data)

export default instance
