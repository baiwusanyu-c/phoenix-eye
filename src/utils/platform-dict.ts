/*
 * @platform-dict.ts
 * @deprecated 一些关于币种、链平台的下拉数据、字典等
 * @author czh
 * @update (czh 2021/11/19)
 */
export interface IPlatformDict {
  HT?: string
  ETH: string
  BSC: string
  HECO: string
  BNB?: string
  POLYGON: string
}
export const platformDict: IPlatformDict = {
  ETH: 'eth',
  BSC: 'bsc',
  HECO: 'heco',
  POLYGON: 'polygon',
}
export interface IPlatformListItem {
  label: string
  id: string
  value: string
}
export const platformListDict: Array<IPlatformListItem> = [
  {
    label: 'ETH',
    value: 'eth',
    id: 'jhgadjghzngrgegkdfjg',
  },
  {
    label: 'BSC',
    value: 'bsc',
    id: 'jhgadjghzngradwqgegkdfjg',
  },
  {
    label: 'HECO',
    value: 'heco',
    id: 'jhgadjghzngrdfggegkdfjg',
  },
  {
    label: 'POLYGON',
    value: 'polygon',
    id: 'jhgadjghzngrgefdghhgkdfjg',
  },
]
export interface IPlatformToCurrency {
  eth: string
  bsc: string
  heco: string
  Polygon: string
}
export const platformToCurrency: IPlatformToCurrency = {
  eth: 'ETH',
  bsc: 'BNB',
  heco: 'HT',
  Polygon: 'POLYGON',
}
export const iconDict: IPlatformDict = {
  HT: 'iconHecoEagle',
  HECO: 'iconHecoEagle',
  BSC: 'iconBnbEagle',
  BNB: 'iconBnbEagle',
  ETH: 'iconEthEagle',
  POLYGON: 'iconPolygonEagle',
}
