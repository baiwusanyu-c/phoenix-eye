/*
 * @Author: your name
 * @Date: 2021-08-26 15:30:27
 * @LastEditTime: 2021-08-26 15:35:52
 * @LastEditors: Please set LastEditors
 * @Description: 地址/交易 中间省略显示，鼠标移入显示复制按钮
 * @FilePath: \anti-fraud-front\src\components\common-components\ellipsis-copy\index.js
 */
import elllipsisCopyComponents from './ellipsis-copy.vue';

const BeElllipsisCopy = {
    install:function(Vue) {
        Vue.component('be-ellipsis-copy', elllipsisCopyComponents)
    }
}

export default BeElllipsisCopy;