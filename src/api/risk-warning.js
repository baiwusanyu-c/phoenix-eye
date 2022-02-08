// 风险警告 api
import request from '@/utils/request'
import config from '@/config/index' // 路径配置
// 获取项目風險列表
export function getProjWarning(params) {
    return request({
        url: `${config.baseURL}/ussa/risk_warning/list`,
        method: 'get',
        params
    })
}
// 获取项目風險詳情
export function getProjWarningDetail(params) {
    return request({
        url: `${config.baseURL}/ussa/risk_warning/tx_detail`,
        method: 'get',
        params
    })
}