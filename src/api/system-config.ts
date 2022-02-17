// 系统配置 api
import request from '../utils/request'
import config from '../enums/config'
import {IReappraise} from "./project-management";
// 获取风险类型列表 (完成)
export function getRiskTypeList() {
    return request({
        url: `${config.baseURL}/ussa/system_config/risk_type/list`,
        method: 'get'
    })
}

//新增 风险类型(完成)
interface IRiskType {
    name:string
    risk_features:Array<string>
}
export function createRiskType(params:IRiskType) {
    return request({
        url: `${config.baseURL}/ussa/system_config/risk_type/create`,
        method: 'post',
        params
    })
}
//风险类型编辑-获取风险类型详情(完成)
export function getRiskTypeInfo(params:IReappraise) {
    return request({
        url: `${config.baseURL}/ussa/system_config/risk_type/edit/${params.id}`,
        method: 'get',
        params
    })
}
//风险类型编辑-风险类型编辑保存详情(完成)
export function saveEditRiskType(params:IRiskType,pathParams:IReappraise) {
    return request({
        url: `${config.baseURL}/ussa/system_config/risk_type/edit/${pathParams.id}`,
        method: 'post',
        params
    })
}
// 删除 风险类型(完成)
export function deleteRiskType(params:IReappraise) {
    return request({
        url: `${config.baseURL}/ussa/system_config/risk_type/delete/${params.id}`,
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
export interface IRiskScore {
    static_testing:any
    tx_safety:any
    tx_stability: {
        weight: number | string
        config: {
            score_coefficient: number | string
        }
    }
    safety_opinion: {
        weight:number | string
        config:{
            each:number | string
        }
    }
    time_range:number | string,
}
export function saveRiskScore(params:IRiskScore) {
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
