/*
* @request.ts
* @deprecated 
* @author czh
* @update (czh 2021/9/29)
*/
import axios from 'axios'
import qs from 'qs'
import {MessageBox, Message} from 'element-ui'
import config from '../config/index'
import $vue from '../main.js'
// create an axios instance
const service = axios.create({
    baseURL: config.baseURL, // url = base url + request url
    timeout: 50000 // request timeout
})

// request interceptor
service.interceptors.request.use(
    configOption => {
        configOption.headers['Authorization'] = $vue.getStore('token') === null ? '' : 'Bearer ' + $vue.getStore('token');
        configOption.headers['Accept-Language'] = $vue.getStore('language') === null ? 'zh_CN' : $vue.getStore('language')
        if (configOption.method === 'post' && configOption.url!=='/auth/oauth/login') {
            configOption.data = configOption.params
            configOption.headers['Content-Type'] = 'application/json;charset=UTF-8'
            configOption.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
            delete configOption.params
            if (configOption.otherParams) {
                configOption.data = qs.stringify(configOption.data)
            }
        }
        return configOption
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
        if (res.code !== 200 && res.code !== '0000') {
            // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
            if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
                // to re-login
                MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
                    confirmButtonText: 'Re-Login',
                    cancelButtonText: 'Cancel',
                    type: 'warning'
                }).then(() => {
                    /* store.dispatch('user/resetToken').then(() => {
                         location.reload()
                     })*/
                })
            }
            if (res.code === 401 || res.code === 920000003) {
                $vue.$router.push({path: "/login"})
                return Promise.reject(new Error('登录过期' || 'Error'))
            }
            return Promise.reject(new Error(res.msg || res.message ||'Error'))
        } else {
            return res
        }
    },
    error => {
        console.log('err' + error) // for debug
        Message({
            message: error,
            type: 'error',
            duration: 5 * 1000
        })
        return Promise.reject(error)
    }
)

export default service
