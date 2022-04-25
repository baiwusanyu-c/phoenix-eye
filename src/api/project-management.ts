/*
 * @project-management.ts
 * @deprecated 项目管理
 * @author czh
 * @update (czh 2022/2/25)
 */

import request from '../utils/request'
import config from '../enums/config'
import type { IPageParam } from '../utils/types' //路径配置
// 获取项目列表 （完成） 管理员
export interface IProjectListAdmin extends IPageParam {
  param?: string
}
export function getProjectListAdmin(params: IProjectListAdmin) {
  return request({
    url: `${config.baseURL}/ussa/project/admin/list`,
    method: 'post',
    params,
  })
}
//创建项目 （完成）
export interface IContractInfos {
  verAddr?: string
  verContract?: string
  contract_address?: string
  platform?: string
  label?: string
}
export interface ICreateProj {
  name?: string
  is_public?: boolean
  keyword?: string
  contract_infos?: Array<IContractInfos>
  email_list?: Array<string>
  report_id_list?: Array<number>
}
export function createProject(params: ICreateProj) {
  return request({
    url: `${config.baseURL}/ussa/project/create`,
    method: 'post',
    params,
  })
}

// 重新评估项目 (暫時不做)
export interface IReappraise {
  id: string | number
  project_id?: string | number
}

//项目编辑-获取项目详情 （完成）
export function getProjectInfo(params: IReappraise) {
  return request({
    url: `${config.baseURL}/ussa/project/edit/${params.id}`,
    method: 'get',
  })
}
//项目编辑-保存编辑项目 （完成）
export function saveEditProject(params: ICreateProj, pathParams: IReappraise) {
  return request({
    url: `${config.baseURL}/ussa/project/edit/${pathParams.id}`,
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
