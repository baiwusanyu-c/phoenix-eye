/*
 * @Author: yinian430
 * @Date: 2020-07-06 18:36:58
 * @Last Modified by: yinian430
 * @Last Modified time: 2020-08-05 11:04:33
 */
import { createRouter, createWebHashHistory, RouterOptions } from 'vue-router'
const wap = () => import('../views/wap/wap.vue')
const routes = [
  {
    path: '/',
    name: 'wap',
    component: wap,
  },
  {
    path: '/:w+',
    redirect: '/',
  },
]
export const router = createRouter({
  history: createWebHashHistory(),
  routes,
} as RouterOptions)
