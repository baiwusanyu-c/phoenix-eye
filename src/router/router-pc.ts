import { nextTick } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { useEventBus } from '@vueuse/core'
import { getStore, isString } from '../utils/common'
import { i18n } from '../utils/i18n'
import { getRouterInfo } from '../api/login'
import store from '../store/store'
import { addIpLog } from '../api/operational-statistics'
import {
  META_TITLE_DICT,
  MOBILE_ROUTER_LIST,
  ROUTER_COMPONENT_DICT,
  STATISTICS_ROUTER,
  WHITE_LIST,
} from './router-dict'

import type { RouteLocationNormalized, Router, RouterOptions } from 'vue-router'
const routes = [
  {
    path: '/',
    redirect: '/ProjectSearch',
  },
  // 手机端创建项目表单重定向到首页，自动打开表单
  {
    path: '/form/create',
    redirect: '/ProjectSearch?create=project',
  },
  {
    path: '/',
    component: () => import('../views/pc/layout/layout.vue'),
    meta: { title: 'Layout' },
    name: 'layout',
    children: [
      {
        path: '/404',
        name: '404',
        component: () => import('../views/pc/empty-page/404.vue'),
        meta: { title: '404' },
      },
      // 风险交易
      {
        path: '/riskTrxList',
        name: 'RiskTrx',
        component: () => import('../views/pc/risk-trx/risk-trx-list.vue'),
        meta: { title: 'lang.subNav.navName2' },
      },
      {
        path: '/riskTrxDetail',
        name: 'RiskTrxDetail',
        component: () => import('../views/pc/risk-trx/risk-trx-detail.vue'),
        meta: { title: 'lang.subNav.navName2' },
      },
      // 公共舆情
      {
        path: '/RiskPublicInformation',
        name: 'RiskPublicInformation',
        component: () => import('../views/pc/risk-public-info/risk-public-info.vue'),
        meta: { title: 'lang.subNav.navName6' },
      },
      {
        path: '/addressMonitor',
        name: 'AddressMonitor',
        component: () => import('../views/pc/addr-monitor/addr-monitor.vue'),
        meta: { title: 'lang.subNav.navName7' },
      },
      // 地址监控详情
      {
        path: '/addressMonitorDetail',
        name: 'AddressMonitorDetail',
        component: () => import('../views/pc/addr-monitor/addr-monitor-detail.vue'),
        meta: { title: 'lang.subNav.navName7' },
      },
      // 项目浏览器
      {
        path: '/ProjectSearch',
        name: 'ProjectSearch',
        component: () => import('../views/pc/project-search/project-search-main.vue'),
        meta: { title: 'lang.subNav.navName5' },
      },
      {
        path: '/detail',
        name: 'ProjectSearchDetail',
        component: () => import('../views/pc/project-search/project-search-detail.vue'),
        meta: { title: 'lang.subNav.navName5' },
      },
      {
        path: '/disclaimers',
        name: 'Disclaimers',
        component: () => import('../views/pc/disclaimer-page/disclaimer-page.vue'),
        meta: { title: 'lang.subNav.navName5' },
      },
    ],
  },
]
let isEmptyRouterInfo = false
// 递归路由配置对象
export const initRouterConfig = <T>(treeData: Array<T>): Array<T> => {
  treeData.forEach((val: any) => {
    // 删除bms默认的redirect配置
    if (val.redirect === 'noRedirect') {
      Reflect.deleteProperty(val, 'redirect')
    }
    // 将meta.title 配置成国家化变量
    val.meta.title = META_TITLE_DICT[val.perms]
    // 配置组件引入
    val.componentPath = isString(val.component) && val.component
    val.component = ROUTER_COMPONENT_DICT[val.componentPath]
    if (val.children && val.children.length > 0) {
      initRouterConfig(val.children)
    }
  })
  return treeData
}

export function getRouterData(
  router: Router,
  next?: Function,
  to?: RouteLocationNormalized,
  isWhitePath?: boolean
) {
  const params = {
    systemCode: 'beosin-eye',
    userId: getStore('userId'),
  }
  const bus = useEventBus<string>('getRouterInfo')
  isEmptyRouterInfo = false
  getRouterInfo(params)
    .then(res => {
      router.addRoute({
        path: '/:w+',
        redirect: '/404',
      })
      if (!res || res.data.length === 0) {
        // 白名单内疚跳转白名单
        if (isWhitePath && to) {
          next && next({ path: to.path, query: to.query })
        }
        next &&
          next({
            path: '/ProjectSearch',
          })
        isEmptyRouterInfo = true
        return
      }
      const routerConfig = initRouterConfig(res.data[0].children)
      store.commit('update', ['routeConfig', routerConfig])
      routerConfig.forEach((val: any) => {
        router.addRoute('layout', val)
      })
      setTimeout(() => {
        i18n.global.locale.value = getStore('language') === 'en_US' ? 'en_US' : 'zh_CN'
        bus.emit('true')
      }, 100)
      next && to && next({ path: to.path, query: to.query })
    })
    .catch(err => {
      next &&
        next({
          path: '/ProjectSearch',
        })
      console.error(err)
    })
}
/**
 * 路由守卫方法
 * @param {Object} router - 路由对象
 */
const beforeEachHandle = (router: Router) => {
  router.beforeEach(
    (to: RouteLocationNormalized, from: RouteLocationNormalized, next: Function) => {
      // 处理手机端的地址
      const arg: Array<string> = to.path.split('/')
      if (to.path.indexOf(MOBILE_ROUTER_LIST[0]) >= 0) {
        next(`/addressMonitorDetail?address=${arg[arg.length - 1]}`)
      }
      if (to.path.indexOf(MOBILE_ROUTER_LIST[1]) >= 0) {
        next(`/detail?id=${arg[arg.length - 1]}`)
      }
      if (to.path.indexOf(MOBILE_ROUTER_LIST[2]) >= 0) {
        next(`/riskTrxDetail?tx_hash=${arg[arg.length - 1]}`)
      }
      // 匹配运营统计路由
      if (STATISTICS_ROUTER[to.path]) {
        addIpLog({ module: STATISTICS_ROUTER[to.path] }).catch(err => {
          console.error(err)
        })
      }
      let isWhitePath = false
      WHITE_LIST.forEach(val => {
        if (val === to.path) {
          isWhitePath = true
        }
      })
      if (store.state.routeConfig.length > 0 || isEmptyRouterInfo) {
        next()
        return
      } else {
        getRouterData(router, next, to, isWhitePath)
      }
    }
  )
}

export const router = createRouter({
  history: createWebHistory(),
  routes,
} as RouterOptions)
beforeEachHandle(router)
router.afterEach(() => {
  window.scrollTo(0, 0)
  nextTick(() => {
    const mainBody: HTMLElement | null = document.getElementById('main_body')
    mainBody && mainBody.scrollTo(0, 0)
  })
})
