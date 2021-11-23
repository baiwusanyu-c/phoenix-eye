// 项目管理api
import request from '@/utils/request'
import config from '@/config/index' // 路径配置
// 获取项目列表 （完成）
export function getProjectList() {
    return request({
        url: `${config.baseURL}/ussa/project_manage/list`,
        method: 'get'
    })
}
//创建项目 （完成）
export function createProject(params) {
    return request({
        url: `${config.baseURL}/ussa/project_manage/create`,
        method: 'post',
        params
    })
}
// 重新评估项目 (暫時不做)
export function reappraiseProject(params,pathParams) {
    return request({
        url: `${config.baseURL}/ussa/project_manage/reappraise/${pathParams.id}`,
        method: 'post',
        params
    })
}

//项目编辑-获取项目详情 （完成）
export function getProjectInfo(params,pathParams) {
    return request({
        url: `${config.baseURL}/ussa/project_manage/edit/${pathParams.id}`,
        method: 'get',
        params
    })
}
//项目编辑-保存编辑项目 （完成）
export function saveEditProject(params,pathParams) {
    return request({
        url: `${config.baseURL}/ussa/project_manage/edit/${pathParams.id}`,
        method: 'post',
        params
    })
}
// 删除项目 （完成）
export function deleteProject(params,pathParams) {
    return request({
        url: `${config.baseURL}/ussa/project_manage/delete/${pathParams.id}`,
        method: 'post',
        params
    })
}