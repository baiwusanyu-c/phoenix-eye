/*
 * @login.ts
 * @deprecated 登录
 * @author czh
 * @update (czh 2021/9/29)
 */

import request from '../utils/request'
import config from '../enums/config' //路径配置
//获取验证码
export function getCodeImg() {
  return request({
    url: `${config.baseURL}/code`,
    method: 'get',
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
  product_version: string
}

//登录用户名密码
export function loginName(params: ILogin) {
  return request({
    url: '/auth/oauth/login',
    method: 'post',
    params,
  })
}

export function loginPhone(params: any) {
  return request({
    url: '/auth/oauth/login',
    method: 'post',
    params,
  })
}

// 注册 -获取邮箱验证码
export function verifyCode(params: IReset) {
  return request({
    url: '/system/user/official_site_sg_system/verify_code/register',
    method: 'get',
    params,
  })
}

/*
// old获得注册验证码 url已改
export function getRegCode(params: IReset) {
    return request({
        url: '/system/user/official_site_sg_system/verify_code/register',
        method: 'get',
        params
    })
}*/

//注册
interface IRegister {
  account: string
  verification_code: string
  password: string
  from: string
}

// 注册获取邮箱验证码
export function registerAccount(params: IRegister) {
  return request({
    url: '/system/user/official_site_sg_system/email/register',
    method: 'post',
    params,
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
    params,
  })
}

//忘记密码
interface IUpdatePwd {
  account: string
  password: string
  re_password: string
  verification_code: string
}

// 郵箱修改密碼 提交
export function forgetPasswordApi(params: IUpdatePwd) {
  return request({
    url: '/system/user/official_site_sg_system/email/password/forget',
    method: 'post',
    params,
  })
}

// old
/*export function updatePwd(params: IUpdatePwd) {
    return request({
        url: '/system/user/password/update',
        method: 'put',
        params
    })
}*/

// 获取数字验证码(忘记密码)
interface IReset {
  userName: string
}

// 郵箱修改密碼驗證碼獲取
export function verifyCodePassword(params: IReset) {
  return request({
    url: '/system/user/official_site_sg_system/verify_code/reset',
    method: 'get',
    params,
  })
}

// old
/*export function getResetCode(params: IReset) {
    return request({
        url: '/system/user/password/code',
        method: 'get',
        params
    })
}*/

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
    url: `${config.baseURL}/auth/token/logout`,
    method: 'delete',
  })
}

// 获取路由信息
export interface IRouterParams {
  systemCode: string
  userId?: string | null
}

export function getRouterInfo(params: IRouterParams) {
  return request({
    url: `${config.baseURL}/beosin-meta/menu/routers`,
    method: 'get',
    params,
  })
}
