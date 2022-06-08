/*
 * @security-incident.ts
 * @deprecated
 * @author czh
 * @update (czh 2022/5/12)
 */
import request from '../utils/request'
import config from '../enums/config'
import type { IPageParam } from '../utils/types'
export interface IIncidentList extends IPageParam {
  param?: string
}
export function getIncidentList(params: IIncidentList) {
  return request({
    url: `${config.baseURL}/ussa/security/event/list`,
    method: 'post',
    params,
  })
}
export function getIncidentInfo(params: string) {
  return request({
    url: `${config.baseURL}/ussa/security/event/info/${params}`,
    method: 'get',
  })
}
export function deleteIncidentInfo(params: string) {
  return request({
    url: `${config.baseURL}/ussa/security/event/del/${params}`,
    method: 'post',
  })
}
export interface IIncident {
  event_id?: string
  project?: string
  attack_type?: string
  attack_time?: string
  loss_amount?: number | string
  abstract_content?: string
  event_link?: string
  attack_address_arr: Array<string> | string
  attacked_address_arr: Array<string> | string
  attack_trx_arr: Array<string> | string
}
export function editIncidentInfo(params: IIncident, id: string) {
  return request({
    url: `${config.baseURL}/ussa/security/event/update/${id}`,
    method: 'post',
    params,
  })
}
export function addIncidentInfo(params: IIncident) {
  return request({
    url: `${config.baseURL}/ussa/security/event/add`,
    method: 'post',
    params,
  })
}
