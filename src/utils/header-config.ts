/*
 * @header-config.ts
 * @deprecated
 * @author czh
 * @update (czh 2022/4/8)
 */
// 无需权限的功能模块菜单配置
export const publicHeaderConfig = {
  XMSS: {
    icon: '',
    index: '0',
    name: 'lang.subNav.navName5',
    show: true,
    path: '/ProjectSearch',
    isPush: true,
    children: [],
    isDisabled: false,
  },
  JYFX: {
    icon: '',
    index: '1',
    name: 'lang.subNav.navName2',
    show: true,
    path: '/riskTrxList',
    isPush: true,
    children: [],
    isDisabled: false,
  },
  RPIF: {
    icon: '',
    index: '2',
    name: 'lang.subNav.navName6',
    show: true,
    path: '/RiskPublicInformation',
    isPush: true,
    children: [],
    isDisabled: false,
  },
  DZJK: {
    icon: '',
    index: '3',
    name: 'lang.subNav.navName7',
    show: true,
    path: '/addressMonitor',
    isPush: true,
    children: [],
    isDisabled: false,
  },
}
