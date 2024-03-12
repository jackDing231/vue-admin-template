import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import router from '@/router'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // 基础地址 url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 10000 // request timeout超时时间
})

// request interceptor 请求拦截器
service.interceptors.request.use(
  config => {
    // do something before request is sent

    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['Authorization'] = 'Bearer ' + store.getters.token
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor 响应拦截器
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data

    // if the custom code is not 10000, it is judged as an error.
    // 可以通过res.code !== 10000来判断请求是否成功，也可以通过res.success !== true来判断
    // 黑马程序员的例子是通过res.success !== true来判断，但项目中第一种更为常见
    if (!res.success) {
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res.data // 响应结构体中的数据
    }
  },
  async(error) => {
    if (error.response.status === 401) {
      // token过期
      Message({
        message: '登录过期，请重新登录',
        type: 'warning',
        duration: 5 * 1000
      })
      await store.dispatch('user/logout')
      router.push('/login')
      return Promise.reject(error) // 终止执行
    } else if (error.response.status === 404) {
      // 404
      Message({
        message: '请求资源不存在',
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(error) // 终止执行
    }

    console.log(error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error) // 终止执行
  }
)

export default service
