// 项目管理api
import request from '../utils/request'
import config from '../enums/config' //路径配置
// 获取项目列表 （完成）
export function getProjectList() {
    return request({
        url: `${config.baseURL}/ussa/project/list`,
        method: 'get'
    })
}
//创建项目 （完成）
export interface IContractInfos{
    verAddr? :string
    verContract?  :string
    contract_address?:string
    platform?:string
    label?:string
}
export interface ICreateProj {
    name:string
    is_public:boolean,
    keyword:string,
    contract_infos?:Array<IContractInfos>
}
export function createProject(params:ICreateProj) {
    return request({
        url: `${config.baseURL}/ussa/project/create`,
        method: 'post',
        params
    })
}

// 重新评估项目 (暫時不做)
export interface IReappraise {
    id:string | number
}
export function reappraiseProject(params:IReappraise) {
    return request({
        url: `${config.baseURL}/ussa/project/reappraise/${params.id}`,
        method: 'post',
    })
}

//项目编辑-获取项目详情 （完成）
export function getProjectInfo(params:IReappraise) {
    return request({
        url: `${config.baseURL}/ussa/project/edit/${params.id}`,
        method: 'get',
    })
}
//项目编辑-保存编辑项目 （完成）
export function saveEditProject(params:ICreateProj,pathParams:IReappraise) {
    return request({
        url: `${config.baseURL}/ussa/project/edit/${pathParams.id}`,
        method: 'post',
        params
    })
}
// 删除项目 （完成）
export function deleteProject(params:IReappraise) {
    return request({
        url: `${config.baseURL}/ussa/project/delete/${params.id}`,
        method: 'post',
    })
}