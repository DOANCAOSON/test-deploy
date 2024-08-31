import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import auth from './auth'

export type RequestConfig = AxiosRequestConfig

export const cancelToken = () => axios.CancelToken.source()

const reqErrorInterceptor = (error: any) => {
  axios.get('')
  return Promise.reject(error)
}

const resInterceptor = (response: any) => response

const resErrorInterceptor = (error: { response: { status: number; request: XMLHttpRequest } }) => {
  throw error
}

const addInterceptors = (instance: AxiosInstance) => {
  instance.interceptors.request.use((v) => {
    return v
  }, reqErrorInterceptor)

  instance.interceptors.response.use(resInterceptor, resErrorInterceptor)
}

export const fetchClient = () => {
  const instance = axios.create({
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' }
  })
  addInterceptors(instance)

  return instance
}

export default fetchClient()
