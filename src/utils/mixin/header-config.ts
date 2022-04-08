/*
* @header-config.ts
* @deprecated 
* @author czh
* @update (czh 2022/4/8)
*/
// 无需权限的功能模块菜单配置
export const publicHeaderConfig = {
  JYFX: {
    icon: '',
    index: '0',
    name: 'lang.subNav.navName2',
    show: true,
    path: '/riskTrx/list',
    isPush: true,
    children: [],
    isDisabled: false,
  },
  RPIF: {
    icon: '',
    index: '1',
    name: 'lang.subNav.navName6',
    show: true,
    path: '/RiskPublicInformation',
    isPush: true,
    children: [],
    isDisabled: false,
  },
  XMSS: {
    icon: '',
    index: '2',
    name: 'lang.subNav.navName5',
    show: true,
    path: '/projectSearch',
    isPush: true,
    children: [],
    isDisabled: false,
  }
}