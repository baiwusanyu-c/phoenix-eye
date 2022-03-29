// 项目管理api
import request from '../utils/request'
import config from '../enums/config'
import { IAudit, IPageParam } from '../utils/types' //路径配置
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
  name: string
  is_public?: boolean
  keyword: string
  contract_infos?: Array<IContractInfos>
  email_list?: Array<string>
  audit_list?: Array<IAudit>
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
