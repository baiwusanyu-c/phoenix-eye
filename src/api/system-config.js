// 系统配置 api
import request from '@/utils/request'
import config from '@/config/index' // 路径配置
// 获取风险类型列表 (完成)
export function getRiskTypeList() {
    return request({
        url: `${config.baseURL}/ussa/system_config/risk_type/list`,
        method: 'get'
    })
}

//新增 风险类型
export function createRiskType(params) {
    return request({
        url: `${config.baseURL}/ussa/system_config/risk_type/create`,
        method: 'post',
        params
    })
}
//风险类型编辑-获取风险类型详情
export function getRiskTypeInfo(params,pathParams) {
    return request({
        url: `${config.baseURL}/ussa/system_config/risk_type/edit/${pathParams.id}`,
        method: 'get',
        params
    })
}
//风险类型编辑-风险类型编辑保存详情
export function saveEditRiskType(params,pathParams) {
    return request({
        url: `${config.baseURL}/ussa/system_config/risk_type/edit/${pathParams.id}`,
        method: 'post',
        params
    })
}
// 删除 风险类型
export function deleteRiskType(params,pathParams) {
    return request({
        url: `${config.baseURL}/ussa/system_config/risk_type/delete/${pathParams.id}`,
        method: 'post',
        params
    })
}



// 获取当前设置风险评分
export function getRiskScore() {
    return request({
        url: `${config.baseURL}/ussa/system_config/risk_score`,
        method: 'get',
    })
}
// 设置风险评分保存
export function saveRiskScore(params) {
    return request({
        url: `${config.baseURL}/ussa/system_config/risk_score`,
        method: 'post',
        params
    })
}
// 重置风险评分
export function resetRiskScore() {
    return request({
        url: `${config.baseURL}/ussa/system_config/risk_score/reset`,
        method: 'post',
    })
}
