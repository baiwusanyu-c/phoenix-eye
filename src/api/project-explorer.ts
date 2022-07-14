/*
 * @project-explorer.ts
 * @deprecated 项目浏览器
 * @author czh
 * @update (czh 2022/2/25)
 */

import request from '../utils/request'
import config from '../enums/config'
import type { IPageParam } from '../utils/types'

export interface IProjParam extends IPageParam {
  param?: string
  platform?: string
}
export function getProjectListUser(params: IProjParam) {
  return request({
    url: `${config.baseURL}/ussa/project/user/search`,
    method: 'post',
    params,
    isNanToken: true,
  } as any)
}

export interface IPublicOpinion extends IPageParam {
  project_id?: number | string | null
}
export function getPublicOpinion(params: IPublicOpinion) {
  return request({
    url: `${config.baseURL}/ussa/opinion/list`,
    method: 'post',
    params,
    isNanToken: true,
  } as any)
}

export function getProjectSituation(params: IPublicOpinion) {
  return request({
    url: `${config.baseURL}/ussa/project/situation`,
    method: 'post',
    params,
    isNanToken: true,
  } as any)
}

export function getProjectSituationStatistics(params: IPublicOpinion) {
  return request({
    url: `${config.baseURL}/ussa/project/situation/contract/statistics`,
    method: 'post',
    params,
    isNanToken: true,
  } as any)
}

export function getProjectListCurUser(params: IProjParam) {
  return request({
    url: `${config.baseURL}/ussa/project/user/search`,
    method: 'post',
    params,
    isNanToken: true,
  } as any)
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
    isNanToken: true,
  } as any)
}

export function deleteSubscribe(params: ISubscribe) {
  return request({
    url: `${config.baseURL}/ussa/project/subscription/delete/${params.project_id}`,
    method: 'post',
    isNanToken: true,
  } as any)
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
    isNanToken: true,
  } as any)
}

export function getExploreInfo() {
  return request({
    url: `${config.baseURL}/ussa/project/explore/info`,
    method: 'get',
    isNanToken: true,
  } as any)
}

export function getExploreList(params: IProjParam) {
  return request({
    url: `${config.baseURL}/ussa/project/explore/list`,
    method: 'post',
    params,
    isNanToken: true,
  } as any)
}

export function getTop10HolderList(params: IContractReport) {
  return request({
    url: `${config.baseURL}/ussa/project/decentralization/token/list`,
    method: 'post',
    params,
    isNanToken: true,
  } as any)
}
export function getPrivilege(params: IContractReport) {
  return request({
    url: `${config.baseURL}/ussa/project/decentralization/privilege/list`,
    method: 'post',
    params,
    isNanToken: true,
  } as any)
}
export function getLiquidity(params: IContractReport) {
  return request({
    url: `${config.baseURL}/ussa/project/decentralization/liquidity/list`,
    method: 'post',
    params,
    isNanToken: true,
  } as any)
}
