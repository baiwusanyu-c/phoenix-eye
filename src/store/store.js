/*
* @store.js
* @deprecated 
* @author czh
* @update (czh 2021/8/2)
*/
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
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
    },
    mutations: {
        update(state,[key,value]){
            state[key]=value;
        },

    },
})

export default store