import { createRouter, createWebHashHistory } from 'vue-router'
import { useEventBus } from '@vueuse/core'
import { getStore, isString } from '../utils/common'
import { i18n } from '../utils/i18n'
import { getRouterInfo } from '../api/login'
import store from '../store/store'
import type { IOption } from '../utils/types'
import type { RouteLocationNormalized, Router, RouterOptions } from 'vue-router'
const routes = [
  {
    path: '/',
    redirect: '/ProjectSearch',
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
        path: '/riskTrx/list',
        name: 'RiskTrx',
        component: () => import('../views/pc/risk-trx/risk-trx-list.vue'),
        meta: { title: 'lang.subNav.navName2' },
      },
      {
        path: '/riskTrx/detail',
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
      // 地址监控详情
      {
        path: '/addressMonitor/detail',
        name: 'AddressMonitorDetail',
        component: () => import('../views/pc/addr-monitor/addr-monitor-detail.vue'),
        meta: { title: 'lang.subNav.navName7' },
      },
      // 项目浏览器
      {
        path: '/projectSearch',
        name: 'ProjectSearch',
        component: () => import('../views/pc/project-search/project-search-main.vue'),
        meta: { title: 'lang.subNav.navName5' },
      },
      {
        path: '/projectSearch/detail',
        name: 'ProjectSearchDetail',
        component: () => import('../views/pc/project-search/project-search-detail.vue'),
        meta: { title: 'lang.subNav.navName5' },
      },
    ],
  },
  // 外部对接页面
  {
    path: '/external/riskTrx/list',
    name: 'externalRiskTrxDetail',
    component: () => import('../views/pc/external-page/external-risk-trx.vue'),
    meta: { title: 'lang.subNav.navName2' },
  },
]
// 路由的metaTitle字典
const metaTitleDict: any = {
  XMSS: 'lang.subNav.navName5',
  XMGL: 'lang.subNav.navName3',
  DZJK: 'lang.subNav.navName7',
  TRXRESET: 'lang.subNav.navName8',
}
// 组件字典
// 递归路由配置对象时会使用到，其key必须和bms的组件路径一致
// 有这个字典是为了保持对组建的引用，否则在打包时会被vite的tree shaking掉
const routerDict: IOption = {
  'pc/project-management/project-manage-main': () =>
    import('../views/pc/project-management/project-manage-main.vue'),
  'pc/addr-monitor/addr-monitor': () => import('../views/pc/addr-monitor/addr-monitor.vue'),
  'pc/trx-retry/trx-retry': () => import('../views/pc/trx-retry/trx-retry.vue'),
}
// 递归路由配置对象
export const initRouterConfig = <T>(treeData: Array<T>): Array<T> => {
  treeData.forEach((val: any) => {
    // 删除bms默认的redirect配置
    if (val.redirect === 'noRedirect') {
      Reflect.deleteProperty(val, 'redirect')
    }
    // 将meta.title 配置成国家化变量
    val.meta.title = metaTitleDict[val.perms]
    // 配置组件引入
    val.componentPath = isString(val.component) && val.component
    val.component = routerDict[val.componentPath]
    if (val.children && val.children.length > 0) {
      initRouterConfig(val.children)
    }
  })
  return treeData
}

export function getRouterData(router: Router, next?: Function, to?: RouteLocationNormalized) {
  const params = {
    systemCode: 'beosin-eye',
    userId: getStore('userId'),
  }
  const bus = useEventBus<string>('getRouterInfo')
  getRouterInfo(params)
    .then(res => {
      if (!res || res.data.length === 0) {
        next &&
          next({
            path: '/ProjectSearch',
          })
        return
      }
      const routerConfig = initRouterConfig(res.data[0].children)
      store.commit('update', ['routeConfig', routerConfig])
      routerConfig.forEach((val: any) => {
        router.addRoute('layout', val)
      })
      router.addRoute({
        path: '/:w+',
        redirect: '/404',
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
      // 路由跳转白名单（不需要验证token,和获取路由）
      const whiteList = ['/riskTrx/list', '/ProjectSearch', '/RiskPublicInformation']
      let isWhitePath = false
      whiteList.forEach(val => {
        if (val === to.path) {
          isWhitePath = true
        }
      })

      if (store.state.routeConfig.length > 0 || isWhitePath) {
        next()
        return
      } else {
        getRouterData(router, next, to)
      }
    }
  )
}

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
} as RouterOptions)
beforeEachHandle(router)
router.afterEach(() => {
  window.scrollTo(0, 0)
})
