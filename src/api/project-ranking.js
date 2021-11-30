// 项目排行api
import request from '@/utils/request'
import config from '@/config/index' // 路径配置
// 获取项目排行列表
export function getProjectRankList() {
    return request({
        url: `${config.baseURL}/ussa/project/rank`,
        method: 'get'
    })
}
// 獲取合約態勢 或 项目态势 數據
export function getContractProjectTs() {
    return request({
        url: `${config.baseURL}/ussa/project/search`,
        method: 'post'
    })
}
// 獲取合約安全数据
export function getContractSecurity() {
    return request({
        url: `${config.baseURL}/ussa/project/contract/safety/list`,
        method: 'post'
    })
}
// 獲取舆情安全数据
export function getPublicSentimentSecurity() {
    return request({
        url: `${config.baseURL}/ussa/project/safety_opinion/list`,
        method: 'post'
    })
}
