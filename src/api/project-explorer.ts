/*
 * @project-explorer.ts
 * @deprecated
 * @author czh
 * @update (czh 2022/2/25)
 */

import request from '../utils/request'
import config from '../enums/config'
import type { IPageParam } from '../utils/types' //路径配置

export interface IProjParam extends IPageParam {
  param?: string
}
export function getProjectListUser(params: IProjParam) {
  return request({
    url: `${config.baseURL}/ussa/project/user/search`,
    method: 'post',
    params,
  })
}

export interface IPublicOpinion extends IPageParam {
  project_id?: number | string | null
}
export function getPublicOpinion(params: IPublicOpinion) {
  return request({
    url: `${config.baseURL}/ussa/project/opinion/list`,
    method: 'post',
    params,
  })
}

export function getProjectSituation(params: IPublicOpinion) {
  return request({
    url: `${config.baseURL}/ussa/project/situation`,
    method: 'post',
    params,
  })
}

export function getProjectSituationStatistics(params: IPublicOpinion) {
  return request({
    url: `${config.baseURL}/ussa/project/situation/contract/statistics`,
    method: 'post',
    params,
  })
}

export function getProjectListCurUser() {
  return request({
    url: `${config.baseURL}/ussa/project/user/list`,
    method: 'get',
  })
}

/**
 * 创建项目订阅
 * @param params
 */
export interface ISubscribe {
  project_id?: number | string
}
export function createSubscribe(params: ISubscribe) {
  return request({
    url: `${config.baseURL}/ussa/project/subscription/create/${params.project_id}`,
    method: 'post',
  })
}

export function deleteSubscribe(params: ISubscribe) {
  return request({
    url: `${config.baseURL}/ussa/project/subscription/delete/${params.project_id}`,
    method: 'post',
  })
}
export interface IContractReport extends IPageParam {
  project_id: number
}
// 获取项目合约报告
export function getContractReportList(params: IContractReport) {
  return request({
    url: `${config.baseURL}/ussa/project/contract/report/list`,
    method: 'post',
    params,
  })
}
