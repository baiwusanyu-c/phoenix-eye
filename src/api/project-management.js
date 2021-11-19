// 项目管理api
import request from '@/utils/request'
import config from '@/config/index' // 路径配置
// 获取项目列表
export function getProjectList() {
    return request({
        url: `${config.baseURL}/ussa/project/manage/list`,
        method: 'get'
    })
}
//创建项目
export function createProject(params) {
    return request({
        url: `${config.baseURL}/ussa/project/manage/create`,
        method: 'post',
        params
    })
}
// 重新评估项目
export function reappraiseProject(params) {
    return request({
        url: `${config.baseURL}/ussa/project/manage/reappraise/`,
        method: 'post',
        params
    })
}

//项目编辑-获取项目详情
export function getProjectInfo(params) {
    return request({
        url: `${config.baseURL}/ussa/project/manage/edit/`,
        method: 'get',
        params
    })
}
//项目编辑-保存编辑项目
export function saveEditProject(params) {
    return request({
        url: `${config.baseURL}/ussa/project/manage/edit/`,
        method: 'post',
        params
    })
}
// 删除项目
export function deleteProject(params) {
    return request({
        url: `${config.baseURL}/ussa/project/manage/delete/`,
        method: 'post',
        params
    })
}