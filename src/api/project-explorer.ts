/*
 * @project-explorer.ts
 * @deprecated
 * @author czh
 * @update (czh 2022/2/25)
 */

import request from '../utils/request'
import config from '../enums/config'
import { IPageParam } from '../utils/types' //路径配置

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
