import websiteForm from '../views/pc/manage/project-management/components/website-form.vue'
import type { ComponentInternalInstance, Plugin, Ref } from 'vue'

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
export interface ICreateProjContact {
  contact_type?: string
  contact?: string
  message_board?: string
}
export interface ICreateProjBase {
  project_name?: string
  platform?: string
  keyword?: string
  token_address?: string
  logo_url?: string
  contract_address_arr?: Array<string>
}
export interface ICreateProjOperating {
  address_markup?: string
  white_paper?: string
  operation_manual?: string
  exchange_board?: string
  test_chain?: string
}
export interface ICreateProjExt {
  type?: string
  report_id_list?: Array<number>
}
export declare type ICreateProj = ICreateProjExt &
  ICreateProjOperating &
  ICreateProjBase &
  ICreateProjContact &
  IWebsiteForm

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
  day?: string
  num?: number
  create_time?: string
  token_price?: string
}
// getProjectListAdmin
export interface IProjectInfo {
  project_id: string
  name: string
  keyword: string
  contract_num: number
  risk_tx_num: number
  opinion_num: number
  contract_infos: {
    platform: string
    contract_address: string
    label: string
  }
  create_time: string
}

// project-search-main
export type IExploreInfo = {
  market_cap_total?: number
  project_total?: number
}
export type IGuardProjectList = {
  logo_url?: string
  project_name?: string
  create_time?: string
}

export type IRiskInfoList = {
  title?: string
  url?: string
  content?: string
  tag?: Array<string>
  source?: string
  pub_time?: string
}

export type IHotProjectList = {
  logo_url?: string
  project_name?: string
  security_score?: string
  tx_24?: number
  index: string
}
export type projListType = {
  project_id?: string
  project_name?: string
  logo_url?: string
  platform?: string
  tx_24?: string
  market_cap?: number
  token_price?: number
  security_score?: string
  token_price_up_down?: string // up 涨 down 跌
  token_price_history?: Array<{ token_price: number; create_time: string }>
  create_time?: string
  audit_report_num?: number
}

export type securityInfoList = {
  project_name?: string
  attect_type?: string
  amount?: number
  abstract?: string
}
export type IGovern = ICreateProjOperating & IWebsiteForm

export interface IScoreItems {
  market_volatility_score?: string
  diaphaneity_score?: string
  decentralization_score?: string
  risk_tx_score?: string
  audit_report_score?: string
}

export interface ISecurityEventList {
  project_name?: string
  abstract_content?: string
  attack_type?: string
  attack_time?: string
  loss_amount?: number
}
export interface IMarketItem {
  every_day_data?: Array<{ date: string; value: number }>
  day_1_ratio?: number
  day_7_ratio?: number
  day_30_ratio?: number
  value?: number
}
export interface IMarketVolatility {
  token_price_data: IMarketItem
  token_transfer_data: IMarketItem
  liquidity_data: IMarketItem
  market_cap_data: IMarketItem
}
