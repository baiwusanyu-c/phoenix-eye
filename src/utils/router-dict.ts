/*
 * @router-dict.ts
 * @deprecated
 * @author czh
 * @update (czh 2022/5/10)
 */

import type { IOption } from './types'
// 路由的metaTitle字典
export const META_TITLE_DICT: IOption = {
  XMSS: 'lang.subNav.navName5',
  XMGL: 'lang.subNav.navName3',
  DZJK: 'lang.subNav.navName7',
  TRXRESET: 'lang.subNav.navName8',
  YYTJ: 'lang.subNav.navName9',
  EYWZGL: 'lang.subNav.navName10',
  AQSJ: 'lang.subNav.navName11',
}
export const WHITE_LIST: Array<string> = [
  '/riskTrx/list',
  '/ProjectSearch',
  '/RiskPublicInformation',
]
// 组件字典
// 递归路由配置对象时会使用到，其key必须和bms的组件路径一致
// 有这个字典是为了保持对组建的引用，否则在打包时会被vite的tree shaking掉
export const ROUTER_COMPONENT_DICT: IOption = {
  'pc/manage/project-management/project-manage-main': () =>
    import('../views/pc/manage/project-management/project-manage-main.vue'),
  'pc/addr-monitor/addr-monitor': () => import('../views/pc/addr-monitor/addr-monitor.vue'),
  'pc/trx-retry/trx-retry': () => import('../views/pc/trx-retry/trx-retry.vue'),
  'pc/manage/malicious-site-management/malicious-site-management': () =>
    import('../views/pc/manage/malicious-site-management/malicious-site-management.vue'),
  'pc/manage/security-incident/security-incident': () =>
    import('../views/pc/manage/security-incident/security-incident.vue'),
  'pc/manage/operational-statistics/operational-statistics': () =>
    import('../views/pc/manage/operational-statistics/operational-statistics.vue'),
}
// 需要运营统计的路由,值由后端约定
export const STATISTICS_ROUTER: IOption = {
  '/projectSearch': 'project explore',
  '/projectSearch/detail': 'project details',
}
