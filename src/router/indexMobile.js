/*
 * @Author: yinian430 
 * @Date: 2020-07-06 18:36:58 
 * @Last Modified by: yinian430
 * @Last Modified time: 2020-08-05 11:04:33
 */
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
		{
      path: '/',
      name: 'wap',
      component: resolve => require(['@/views/wap/wap.vue'],resolve)
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
