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
        url: `${config.baseURL}/ussa/project/search `,
        method: 'post'
    })
}
