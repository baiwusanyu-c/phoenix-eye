/*
 * @request.ts
 * @deprecated
 * @author czh
 * @update (czh 2021/9/29)
 */
import axios from 'axios'
import config from '../enums/config'
import { getStore, removeSession, removeStore, getSession, message, setSession } from './common'
import qs from 'qs'
import { useEventBus } from '@vueuse/core'
console.log(import.meta.env.VITE_PROJECT_ENV)
// create an axios instance
const service = axios.create({
  baseURL:
    String(import.meta.env.VITE_PROJECT_ENV) === 'production'
      ? config.baseURL + '/hermit/back/'
      : config.baseURL,
  timeout: 50000, // request timeout
})

// request interceptor
service.interceptors.request.use(
  (config: any) => {
    const tokenCache = getStore('token')
    if (tokenCache) {
      config.headers['Authorization'] = 'Bearer ' + getStore('token')
    }
    config.headers['Accept-Language'] = getStore('language') ? getStore('language') : 'en_US'
    if (config.method === 'post' && config.url !== '/auth/oauth/login') {
      config.data = config.params
      config.headers['Content-Type'] = 'application/json;charset=UTF-8'
      config.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
      delete config.params
      if (config.otherParams) {
        config.data = qs.stringify(config.data)
      }
    }
    return config
  },
  error => {
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    const res = response.data
    const bus = useEventBus<string>('loginExpired')
    if (res.code !== 200 && res.code !== '0000' && res.code !== '0400') {
      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        // to re-login
        window.location.href = '#/riskTrx/list'
        bus.emit('true')
      }
      if (res.code === 401 || res.code === 920000003) {
        removeSession('CETInfo')
        removeStore('token')
        removeStore('userInfo')
        window.location.href = '#/riskTrx/list'
        if (getSession('loginExpiredNum') === 'false' || !getSession('loginExpiredNum')) {
          bus.emit('true')
          const err = getStore('language') === 'en_US' ? 'Login Expired' : '登录过期'
          message('error', err)
          setSession('loginExpiredNum', 'true')
        }
        return null
      }
      return Promise.reject(new Error(res.msg || res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    return Promise.reject(error)
  }
)
export default service
