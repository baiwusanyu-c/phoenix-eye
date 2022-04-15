/*
 * @addr-monitor.ts
 * @deprecated 地址监控
 * @author czh
 * @update (czh 2022/4/12)
 */
import request from '../utils/request'
import config from '../enums/config'
import type { IAddrMonitorForm, IPageParam } from '../utils/types'
// 添加地址监控
export function addAddressMonitor(params: IAddrMonitorForm) {
  return request({
    url: `${config.baseURL}/ussa/public/address_monitor/add`,
    method: 'post',
    params,
  })
}

// 更新地址监控
export function updateAddressMonitor(params: IAddrMonitorForm) {
  return request({
    url: `${config.baseURL}/ussa/public/address_monitor/update`,
    method: 'post',
    params,
  })
}
export interface IAddrMonitorSearch {
  address: string
}
// 或地址监控基本信息详情（搜索、详情）
export function getAddressMonitorInfo(params: IAddrMonitorSearch) {
  return request({
    url: `${config.baseURL}/ussa/public/address_monitor/info`,
    method: 'get',
    params,
  })
}
// 删除地址监控
export function deleteAddressMonitor(params: IAddrMonitorForm) {
  return request({
    url: `${config.baseURL}/ussa/public/address_monitor/delete/${params.address_monitor_id}`,
    method: 'post',
  })
}
// 获取地址监控列表
export function getAddressMonitorList(params: IPageParam) {
  return request({
    url: `${config.baseURL}/ussa/public/address_monitor/list`,
    method: 'post',
    params,
  })
}
export interface IAddrMonitorDetailOut extends IPageParam {
  param?: string
}
// 获取地址监控转出信息列表
export function getAddressMonitorOutList(params: IAddrMonitorDetailOut) {
  return request({
    url: `${config.baseURL}/ussa/public/address_monitor/transfer/list`,
    method: 'post',
    params,
  })
}
