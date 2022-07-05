/*
 * @risk-public-info.ts
 * @deprecated 公共舆情
 * @author czh
 * @update (czh 2022/4/1)
 */
// 获取项目合约报告
import request from '../utils/request'
import config from '../enums/config'
import type { IPageParam } from '../utils/types'
export interface IPOList extends IPageParam {
  project_id?: string
  param?: string
}

export function getPublicOpinionList(params: IPOList) {
  return request({
    url: `${config.baseURL}/ussa/opinion/list`,
    method: 'post',
    params,
  })
}
