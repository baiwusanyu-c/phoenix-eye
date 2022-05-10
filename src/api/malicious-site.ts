/*
 * @malicious-site.ts
 * @deprecated
 * @author czh
 * @update (czh 2022/5/10)
 */
import qs from 'qs'
import request from '../utils/request'
import config from '../enums/config'
import type { IPageParam } from '../utils/types' //路径配置
export interface IRiskUrlList extends IPageParam {
  param?: string
}
export function getRiskUrl(params: IRiskUrlList) {
  return request({
    url: `${config.baseURL}/ussa/public/plugin/risk_url/list`,
    method: 'post',
    params,
  })
}
export interface IDelRiskUrl {
  id: string
}
export function deleteRiskUrl(params: IDelRiskUrl) {
  return request({
    url: `${config.baseURL}/ussa/public/plugin/risk_url/del/${params.id}`,
    method: 'post',
  })
}

export interface IRiskUrl {
  risk_url_list?: Array<string> | string
  tag?: string
}
export function addRiskUrl(params: IRiskUrl) {
  return request({
    url: `${config.baseURL}/ussa/public/plugin/risk_url/add`,
    method: 'post',
    params,
  })
}
