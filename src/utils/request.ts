/*
 * @request.ts
 * @deprecated
 * @author czh
 * @update (czh 2021/9/29)
 */
import axios from 'axios'
import qs from 'qs'
import { useEventBus } from '@vueuse/core'
import configUrl from '../enums/config'
import { WHITE_LIST } from '../router/router-dict'
import { getSession, getStore, message, removeSession, removeStore, setSession } from './common'
import type { AxiosResponse } from 'axios'
export const setHeader = (): string => {
  return !getStore('token') ? '' : `Bearer ${getStore('token')}`
}
export declare interface IAxiosRes extends AxiosResponse {
  message?: string
  code?: string | number
  success?: boolean
}

/**
 * 设置url前缀
 */
export const setPrevUrl = (baseUrl = ''): string => {
  return String(import.meta.env.VITE_PROJECT_ENV) === 'production'
    ? `${baseUrl}/hermit/back`
    : `${baseUrl}`
}
// create an axios instance
const service = axios.create({
  baseURL: setPrevUrl(configUrl.baseURL),
  timeout: 50000, // request timeout
})
// request interceptor
service.interceptors.request.use(
  (config: any) => {
    const tokenCache = getStore('token')
    /*if (
      tokenCache &&
      !(
        config.url.indexOf('/ussa/project/add') >= 0 &&
        config.params &&
        config.params.type === 'user'
      ) &&
      !(config.url.indexOf('/website/quote/create') >= 0)
    ) {
      config.headers['Authorization'] = setHeader()
    }*/
    if (tokenCache && !config.isNanToken) {
      config.headers['Authorization'] = setHeader()
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
    console.error(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    const res = response.data
    const bus = useEventBus<string>('loginExpired')
    if (res.code !== 200 && res.code !== '0000' && res.code !== '0400' && res.code !== '9999') {
      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        // to re-login
        window.location.href = '/ProjectSearch'
        bus.emit('true')
      }
      if (res.code === 401 || res.code === 920000003) {
        removeSession('CETInfo')
        removeStore('token')
        removeStore('userInfo')
        // 如果当前路由是 /ProjectSearch 直接刷新页面 #4511
        // if (window.location.hash === '#/ProjectSearch') {
        //   location.reload()
        //   return
        // }
        if (getSession('loginExpiredNum') === 'false' || !getSession('loginExpiredNum')) {
          bus.emit('true')
          const err = getStore('language') === 'en_US' ? 'Login Expired' : '登录过期'
          message('error', err)
          setSession('loginExpiredNum', 'true')

          if (
            location.pathname.indexOf('/addressMonitorDetail') >= 0 ||
            location.pathname === '/addressMonitor'
          ) {
            setTimeout(() => {
              window.location.href = '/addressMonitor'
            }, 1500)
            return
          }
        }
        setTimeout(() => {
          if (!WHITE_LIST.includes(window.location.pathname)) {
            window.location.href = '/ProjectSearch'
          }
        }, 1500)
        return 'expired'
      }
      return Promise.reject(new Error(res.msg || res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.error(`err${error}`) // for debug
    return Promise.reject(error)
  }
)
export default service
