import type { ComponentInternalInstance, Plugin } from 'vue'
import type { Ref } from '@vue/reactivity'

// 定义插件类型，组件的引用会用到这个，然后走use、install
export type SFCWithInstall<T> = T & Plugin

export interface IEvent extends MouseEvent {
  path: Array<HTMLElement>
}
export type TimeoutHandle = ReturnType<typeof window.setTimeout>

export interface IOption {
  [key: string]: any
}
export declare type VNodeNormalizedRefAtom = {
  i: ComponentInternalInstance
  r: VNodeRef
  f?: boolean
}
export declare type VNodeRef =
  | string
  | Ref
  | ((ref: object | null, refs: Record<string, any>) => void)

export interface IDialog {
  isShow: boolean
}
export interface IPageParam {
  page_num?: number
  page_size?: number

  currentPage?: number
  pageNum?: number
  pageSize?: number
  total?: number
}
export interface IPopover {
  close: Function
}
export interface ILoginDialog {
  showDialog: boolean
}

// project-search-detail
export interface ISafetyData {
  negative?: string
  negativeMsg?: string
  sourceUrl?: string
  title?: string
  message?: string
  from?: string
  time?: string
  label?: Array<string>
}

export interface IContractStatistics {
  contract_address: string
  token_name: string
  platform: string
  tx_24?: number | string
  tx_total?: number | string
  latest_trading_date?: string
}

export interface IBaseInfo {
  transactions?: number | string
  transactionsTotal?: number | string
  lastTradeData?: string
  riksTrxNum?: number | string
  riskPublicOpinion?: number | string
  github?: string
  telegram?: string
  twitter?: string
  website?: string
  isSubscribe?: boolean
  name?: string
}

export interface ITop5TokenHolder {
  address?: string
  percentage?: number
  quantity?: string
}

export interface ITop5QuidityPairs extends ITop5TokenHolder {
  pair?: string
}

export interface ITop5QuiditySelect {
  platform?: string
  records: Array<any>
}

export interface ITop5TokenHolderSelect {
  token_address?: string
  token_name?: string
  platform?: string
  records: Array<any>
}

export interface IAuditList {
  uuid: string
  report_num: string
  report_id: string
  report_name: string
  url: string
  create_time: string
}
// create-project

export interface IWebsiteForm {
  website?: string
  github?: string
  twitter?: string
  telegram?: string
}
// risk-trx-list
export interface IFilterItem {
  label?: string
  val: string
  isActive: boolean
}
export interface IRiskTable {
  getList: Function
  loading: Ref<boolean>
}
// risk-trx-detail
export interface IBaseInfoRiskInfo {
  platform?: string
  tx_hash?: string
  slump?: any
}
// zipdownload.ts
export interface INavigator {
  msSaveBlob?: (blob: any, defaultName?: string) => boolean
}
// project-search-detail/project-detail-top
export interface ITableHeader {
  prop: string
  label: string
}
// create-addr-monitor
export interface IAddrMonitorForm {
  address?: string
  remark?: string
  event_link?: string
  address_monitor_id?: string
  id?: string
}

// addr-monitor
export interface IAddrMonitor extends IAddrMonitorForm {
  warningNum?: number
  create_time?: string
}
// addr-monitor-detail
export type IAddrMonitorInfo = IAddrMonitor
export interface IAddrMonitorDetail {
  platform: string
  tx_hash?: string
  create_time?: string
  value?: string
  from_address?: string
  to_address?: string
}
// chart-pie
export interface IStatisticsPie {
  country: string
  num: number
  ratio: number
}

// chart-pie
export interface IStatisticsLine {
  day: string
  num: number
}
