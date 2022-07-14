/*
 * @risk-trx.ts
 * @deprecated 交易风险
 * @author czh
 * @update (czh 2022/2/25)
 */

import request from '../utils/request'
import config from '../enums/config'
import type { IPageParam } from '../utils/types'
// 获取项目風險列表
interface IProjWarning extends IPageParam {
  param?: string
  contract_address?: string
  project_id?: string | number
  platform?: Array<string>
  alert_level?: Array<string>
  type?: Array<string>
}
export function getProjWarning(params: IProjWarning) {
  return request({
    url: `${config.baseURL}/ussa/risk_tx/list`,
    method: 'post',
    params,
    isNanToken: true,
  } as any)
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
    isNanToken: true,
  } as any)
}
