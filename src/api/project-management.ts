/*
 * @project-management.ts
 * @deprecated 项目管理
 * @author czh
 * @update (czh 2022/2/25)
 */

import request from '../utils/request'
import config from '../enums/config'

import type { ICreateProj, IPageParam } from '../utils/types'
// 获取项目列表 （完成） 管理员
export interface IProjectListAdmin extends IPageParam {
  param?: string
  type: string
}
export function getProjectListAdmin(params: IProjectListAdmin) {
  return request({
    url: `${config.baseURL}/ussa/project/list`,
    method: 'post',
    params,
  })
}
//创建项目 （完成）
export interface IContractInfos {
  verContract?: string
  contract_address?: string
}

export function createProject(params: ICreateProj) {
  return request({
    url: `${config.baseURL}/ussa/project/add`,
    method: 'post',
    params,
    isNanToken: params.type === 'user' ? true : false,
  } as any)
}

// 重新评估项目 (暫時不做)
export interface IReappraise {
  id: string | number
  project_id?: string | number
}

//项目编辑-获取项目详情 （完成）
export function getProjectInfo(params: IReappraise) {
  return request({
    url: `${config.baseURL}/ussa/project/info/${params.id}`,
    method: 'get',
  })
}
//项目编辑-保存编辑项目 （完成）
export function saveEditProject(params: ICreateProj, pathParams: IReappraise) {
  return request({
    url: `${config.baseURL}/ussa/project/update/${pathParams.id}`,
    method: 'post',
    params,
  })
}
// 删除项目 （完成）
export function deleteProject(params: IReappraise) {
  return request({
    url: `${config.baseURL}/ussa/project/delete/${params.id}`,
    method: 'post',
  })
}
export interface IReport {
  contract_address_list: Array<string>
}
// 项目创建获取合约报告
export function getReport(params?: IReport) {
  return request({
    url: `${config.baseURL}/ussa/project/contract/report/search`,
    method: 'post',
    params,
  })
}

export interface IMatchSocial {
  platform: string
  token_address: string
}

export function getMatchSocial(params?: IMatchSocial) {
  return request({
    url: `${config.baseURL}/ussa/project/search/contact`,
    method: 'get',
    params,
  })
}

export interface IUpLoad {
  base64File: string
  filename: string
}
export function uploadFile(params?: IUpLoad) {
  return request({
    url: `${config.baseURL}/website/article/admin/uploadImg`,
    method: 'post',
    params,
  })
}
