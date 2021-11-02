/*
 * @Author: yinian430 
 * @Date: 2020-07-09 15:26:58 
 * @Last Modified by: yinian430
 * @Last Modified time: 2021-06-22 15:20:06
 */
import Vue from 'vue'
import App from './App.vue'
import 'babel-polyfill'
import '@/utils/element.js' //按需引入element-ui
import '@/utils/auth.js' //公共方法
import '@/utils/request.js' //axios拦截器
import '@/utils/components.js' //公共组件引入
import '@/utils/create-verification-code.js' //生成图形验证码
import '@/utils/reg.js' //公用正则
import router from '@/router/isMobile.js' //判断访问设备并引入对应路由
import i18n from '@/utils/i18n.js' //国际化
import '@/components/common-components/svg-icon/icons' // icon
import '@/components/common-components/svg-icon/icons/iconfont/iconfont.js'
import readDirective from '@/utils/direactives/read-directive'
import '../node_modules/animate.css/animate.css'
import store from './store/store.js'
//读取动态装在vue自定义指令
readDirective(Vue)
let routerInstance = router
if(router.routerInit){
    routerInstance = router.routerInit(router.routerOption)
}
Vue.config.productionTip = false
export default new Vue({
    el: '#app',
    i18n,
    router:routerInstance,
    store,
    components: { App },
    template: '<App/>',
    render: h => h(App),
})