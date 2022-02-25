/*
* @project-explorer.ts
* @deprecated 
* @author czh
* @update (czh 2022/2/25)
*/


import request from '../utils/request'
import config from '../enums/config'
import {IPageParam} from "../utils/types"; //路径配置

export interface IProjParam extends IPageParam{
    param?:string
}
export function getProjectListUser(params:IProjParam) {
    return request({
        url: `${config.baseURL}/ussa/project/user/search`,
        method: 'post',
        params
    })
}
