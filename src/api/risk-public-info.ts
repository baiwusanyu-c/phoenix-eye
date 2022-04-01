/*
* @risk-public-info.ts
* @deprecated 
* @author czh
* @update (czh 2022/4/1)
*/
// 获取项目合约报告
import request from "../utils/request";
import {IPageParam} from "../utils/types";
export interface IPOList extends IPageParam{
  param?:string
}

export function getPublicOpinionList(params: IPOList) {
  return request({
    url: '/ussa/public/opinion/list',
    method: 'post',
    params,
  })
}