// 项目排行api
import request from '@/utils/request'
import config from '@/config/index' // 路径配置
// 获取项目排行列表 √
export function getProjectRankList(params) {
    return request({
        url: `${config.baseURL}/ussa/project/rank`,
        method: 'get',
        params
    })
}
// 搜索獲取合約態勢 或 项目态势 數據 ？？？？？？？？？
export function getContractProjectTs(params) {
    return request({
        url: `${config.baseURL}/ussa/project/search`,
        method: 'post',
        params
    })
}
// 獲取合約安全数据 √
export function getContractSecurity(params) {
    return request({
        url: `${config.baseURL}/ussa/project/contract/safety/list`,
        method: 'post',
        params
    })
}
// 獲取舆情安全数据 √
export function getPublicSentimentSecurity(params) {
    return request({
        url: `${config.baseURL}/ussa/project/safety_opinion/list`,
        method: 'post',
        params
    })
}
// 获取交易稳定数据 √
export function getTxStability(params) {
    return request({
        url: `${config.baseURL}/ussa/project/contract/tx_stability`,
        method: 'POST',
        params
    })
}
