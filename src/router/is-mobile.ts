/*
 * @Author: yinian430
 * @Date: 2020-07-06 18:36:42
 * @Last Modified by: yinian430
 * @Last Modified time: 2021-03-23 14:32:49
 */
// 設置是否手機訪問變量

const ua = navigator.userAgent
const ipad = ua.match(/(iPad).*OS\s([\d_]+)/)
const isIphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/)
const isAndroid = ua.match(/(Android)\s+([\d.]+)/)
const isMobile: RegExpMatchArray | null = isIphone || isAndroid
//判断访问设备为手机还是pc，并引入对应的路由
let router
const configList = import.meta.globEager('./router-*.ts')
if (isMobile) {
  // router = configList['./router-mobile.ts']
  router = configList['./router-pc.ts']
} else {
  router = configList['./router-pc.ts']
}
export default router.router
