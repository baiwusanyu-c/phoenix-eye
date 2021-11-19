// 风险警告 api
import request from '@/utils/request'
import config from '@/config/index' // 路径配置
// 获取项目列表
export function getProjWarning(params) {
    return request({
        url: `${config.baseURL}/ussa/risk_warning/list`,
        method: 'get',
        params
    })
}
