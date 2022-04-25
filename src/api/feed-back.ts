/*
 * @feed-back.ts
 * @deprecated 需求反馈
 * @author czh
 * @update (czh 2022/4/1)
 */

import request from '../utils/request'
import config from '../enums/config'
export interface IFeedBack {
  title?: string
  content?: string
}

// 创建需求反馈
export function createFeedBack(params: IFeedBack) {
  return request({
    url: `${config.baseURL}/ussa/public/feedback/create`,
    method: 'post',
    params,
  })
}
