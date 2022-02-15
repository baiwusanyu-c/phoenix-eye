/*
* @store.ts
* @deprecated 
* @author czh
* @update (czh 2021/8/2)
*/

import { createStore } from 'vuex'
const store = createStore({
    state () {
        return {
            // 菜单禁用配置，在任务进行中‘已完成切换是用到
            menuDisable: {
                'FRAUD_ISN':false,
                'FRAUD_IMN':false,
                'FRAUD_BRO':false,
                'FRAUD_ISN_ADDR':false,
                'FRAUD_ISN_INTEL':false,
                'FRAUD_ISN_TX':false,
            },
            routeConfig:[],
            lang:'',
        }
    },
    mutations: {
        update(state:any,[key,value]:[string,any]){
            state[key]=value;
        },

    },
})

export default store