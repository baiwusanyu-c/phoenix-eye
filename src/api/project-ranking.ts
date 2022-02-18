// 项目排行api
import request from '../utils/request'
import config from '../enums/config'
import {IPageParam} from "../utils/types"; //路径配置
// 获取项目排行列表 √
interface IProjRankList extends IPageParam{
    platform?:string

}
export function getProjectRankList(params:IProjRankList) {
    return request({
        url: `${config.baseURL}/ussa/project/rank`,
        method: 'get',
        params
    })
}
// 搜索獲取合約態勢 或 项目态势 數據
interface ICPTs {
    param?:string
    project_id?:string
    project_contract_id?:string
}
export function getContractProjectTs(params:ICPTs) {
    return request({
        url: `${config.baseURL}/ussa/project/search`,
        method: 'post',
        params
    })
}
// 獲取合約安全数据 √
export function getContractSecurity(params:ISentimentSecurity) {
    return request({
        url: `${config.baseURL}/ussa/project/contract/safety/list`,
        method: 'post',
        params
    })
}
// 獲取舆情安全数据 √
export interface ISentimentSecurity extends IPageParam{
    project_id?:number | null
}
export function getPublicSentimentSecurity(params:ISentimentSecurity) {
    return request({
        url: `${config.baseURL}/ussa/project/safety_opinion/list`,
        method: 'post',
        params
    })
}
// 获取交易稳定数据 √
interface ITxStability{
    contract_address?:string
}
export function getTxStability(params:ITxStability) {
    return request({
        url: `${config.baseURL}/ussa/project/contract/tx_stability`,
        method: 'POST',
        params
    })
}
