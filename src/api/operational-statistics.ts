/*
 * @operational-statistics.ts
 * @deprecated
 * @author czh
 * @update (czh 2022/5/10)
 */
import qs from 'qs'
import request from '../utils/request'
import config from '../enums/config'
import type { IPageParam } from '../utils/types' //路径配置
export interface ILogParam extends IPageParam {
  ip_address?: string
}
export function getLogList(params: ILogParam) {
  return request({
    url: `${config.baseURL}/ussa/ip/log/list`,
    method: 'post',
    params,
  })
}

export function getIpStatistics() {
  return request({
    url: `${config.baseURL}/ussa/ip/log/stat/info`,
    method: 'get',
  })
}
export interface IAddLog extends IPageParam {
  module?: string
}
export function addIpLog(params: IAddLog) {
  return request({
    url: `${config.baseURL}/ussa/ip/log/add?${qs.stringify(params)}`,
    method: 'post',
  })
}
