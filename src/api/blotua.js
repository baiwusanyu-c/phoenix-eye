/*
* @blotua.js
* @deprecated 
* @author czh
* @update (czh 2022/1/20)
*/
import request from '@/utils/request'
import config from '@/config/index' //路径配置
//获取今日交易量
export function getTxNum() {
    return request({
        url: `${config.baseURL}/ussa/chain/state/today/tx_num`,
        method: 'get'
    })
}
//风险交易趋势
export function getTxFxQs() {
    return request({
        url: `${config.baseURL}/ussa/chain/state/risk_tx/trend`,
        method: 'get'
    })
}
// 获取合约审计信息
export function getContractAudit(params) {
    return request({
        url: `${config.baseURL}/ussa/chain/state/contract/audit`,
        method: 'get',
        params
    })
}