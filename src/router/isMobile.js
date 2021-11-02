/*
 * @Author: yinian430 
 * @Date: 2020-07-06 18:36:42 
 * @Last Modified by: yinian430
 * @Last Modified time: 2021-03-23 14:32:49
 */
var ua = navigator.userAgent;

var ipad = ua.match(/(iPad).*OS\s([\d_]+)/),

isIphone =!ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/),

isAndroid = ua.match(/(Android)\s+([\d.]+)/),

isMobile = isIphone || isAndroid;

//判断访问设备为手机还是pc，并引入对应的路由

let router;
let pcRouter = {}
if(isMobile){
  import('@/router/auto-size.js')
  router = require('@/router/indexMobile.js')
}else{ 
  router = require('@/router/index.js')
  pcRouter = {...router}
  router.default = pcRouter
}
export default router.default;
