import type { IOption } from '../utils/types'
// 生产环境
enum productionUrl {
  baseURL = 'https://eagleeye.beosin.com/eagle-eye-ussa/',
}
// 开发环境
enum developmentUrl02 {
  baseURL = 'http://192.168.0.2:9527',
}
// 测试环境
enum stagingUrl02 {
  baseURL = 'http://124.71.132.90:9527',
}
const configUrl: IOption = {
  production: productionUrl,
  staging02: stagingUrl02,
  development02: developmentUrl02,
}
export default configUrl[String(import.meta.env.VITE_USER_NODE_ENV) as keyof typeof configUrl]
