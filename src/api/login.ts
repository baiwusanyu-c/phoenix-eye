/*
* @login.ts
* @deprecated
* @author czh
* @update (czh 2021/9/29)
*/

import request from '../utils/request'
import config from '../enums/config' //路径配置
//获取验证码
export function getCodeImg() {
    return request({
        url: config.baseURL + '/code',
        method: 'get'
    })
}

interface ILogin {
    username: string
    password: string
    code: string
    uuid: string
    client_id: string
    client_secret: string
    grant_type: string
    login_type: string
    scope: string
}

//登录用户名密码
export function loginName(params: ILogin) {
    return request({
        url: '/auth/oauth/login',
        method: 'post',
        params
    })
}

export function loginPhone(params: any) {
    return request({
        url: '/auth/oauth/login',
        method: 'post',
        params
    })
}

//获得注册验证码
export function getRegCode(params: IReset) {
    return request({
        url: '/system/user/verifyCode',
        method: 'get',
        params
    })
}

//注册
interface IRegister {
    userName: string
    phonenumber: string
    uuid: string
    code: string
    password: string
    sourceCode: string
}

export function registerUser(params: IRegister) {
    return request({
        url: '/system/user/register',
        method: 'post',
        params
    })
}

interface ILoginCode {
    phoneNumber: string
}

//登录-手机验证码-发送验证码(登录)
export function loginCode(params: ILoginCode) {
    return request({
        url: '/system/user/login/code',
        method: 'get',
        params
    })
}

//忘记密码
interface IUpdatePwd {
    userName: string
    password: string
    uuid: string
    code: string
}

export function updatePwd(params: IUpdatePwd) {
    return request({
        url: '/system/user/password/update',
        method: 'put',
        params
    })
}

// 获取数字验证码(忘记密码)
interface IReset {
    userName: string,
}

export function getResetCode(params: IReset) {
    return request({
        url: '/system/user/password/code',
        method: 'get',
        params
    })
}

//获取用户信息  获取用户的权限信息
export function getInfo() {
    return request({
        url: '/system/user/getInfo',
        method: 'get',
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
export interface IRouterParams {
    systemCode: string,
    userId?: string | null,
}

export function getRouterInfo(params: IRouterParams) {
    return request({
        url: config.baseURL + '/beosin-meta/menu/routers',
        method: 'get',
        params
    })
}