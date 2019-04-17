import axios from 'axios'
import { baseURL } from '@/config'

class HttpRequest {
  constructor (baseUrl = baseURL) {
    this.baseUrl = baseUrl
    this.queue = {}
  }

  getInsideConfig () {
    return {
      baseURL: this.baseUrl
    }
  }
  // 设置拦截器
  interceptor (instance, url) {
    instance.interceptors.request.use(
      config => {
        this.queue[url] = true
        return config
      },
      error => {
        return Promise.reject(error)
      }
    )
    instance.interceptors.response.use(
      response => {
        const { data, status } = response
        delete this.queue[url]
        return { data, status }
      },
      error => {
        delete this.queue[url]
        return Promise.reject(error)
      }
    )
  }

  request (options) {
    const instance = axios.create()
    const tempOptions = Object.assign(this.getInsideConfig(), options)
    this.interceptor(instance, options.url)
    return instance(tempOptions)
  }
}

export default HttpRequest
