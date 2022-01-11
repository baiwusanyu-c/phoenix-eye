/*
 * @作者: Tian Xu
 * @Date: 2020-11-27 18:44:44
 * @功能: Do not edit
 * @FilePath: \src\api\login.js
 */

import request from '@/utils/request'
import config from '@/config/index' //路径配置
//获取验证码
export function getCodeImg() {
    return request({
        url: config.baseURL + '/code',
        method: 'get'
    })
}
//登录用户名密码
export function login(params) {
    return request({
        url: '/auth/oauth/login',
        method: 'post',
        params
    })
}
export function loginPhone(params) {
    return request({
        url: '/auth/oauth/login',
        method: 'post',
        params
    })
}
//获得注册验证码
export function getRegCode(params) {
    return request({
        url: '/system/user/verifyCode',
        method: 'get',
        params
    })
}

//注册
export function registerUser(params) {
    return request({
        url: '/system/user/register',
        method: 'post',
        params
    })
}
//登录-手机验证码-发送验证码(登录)
export function loginCode(params) {
    return request({
        url: '/system/user/login/code',
        method: 'get',
        params
    })
}
//忘记密码
export function updatePwd(params) {
    return request({
        url: '/system/user/password/update',
        method: 'put',
        params
    })
}
// 获取数字验证码(忘记密码)
export function getResetCode(params) {
    return request({
        url: '/system/user/password/code',
        method: 'get',
        params
    })
}

//获取用户信息  获取用户的权限信息
export function getInfo(params) {
    return request({
        url: '/system/user/getInfo',
        method: 'get',
        params
    })
}
//登出
export function logout() {
    return request({
        url: config.baseURL + '/auth/token/logout',
        method: 'delete',
    })
}
// 获取路由信息
export  function getRouterInfo(params){
    return request({
        url: config.baseURL + '/beosin-meta/menu/routers',
        method: 'get',
        params
    })
}