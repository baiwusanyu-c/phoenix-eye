// 风险警告 api
import request from '../utils/request'
import config from '../enums/config'
import { IPageParam } from '../utils/types'
// 获取项目風險列表
interface IProjWarning extends IPageParam {
  platfrom?: string
  param?: string
  contract_address?: string
}
export function getProjWarning(params: IProjWarning) {
  return request({
    url: `${config.baseURL}/ussa/risk_tx/list`,
    method: 'post',
    params,
  })
}
// 获取项目風險詳情
export interface IProjDetail {
  tx_hash?: string
}
export function getProjWarningDetail(params: IProjDetail) {
  return request({
    url: `${config.baseURL}/ussa/risk_tx/tx_detail`,
    method: 'get',
    params,
  })
}