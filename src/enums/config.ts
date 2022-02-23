// 生产环境
import {IOption} from "../utils/types";

enum productionUrl {
    baseURL = 'https://eagle.beosin.com/eagle-eye-ussa/',
}
// 开发环境
enum developmentUrl {
    baseURL= 'http://192.168.0.216:9527',

}
// 测试环境
enum stagingnUrl {
    baseURL= 'http://124.71.193.230:9527',

}
// 预发布环境
enum pretestnUrl {
    baseURL= 'http://124.71.154.20:9527',
}
const configUrl:IOption = {
    production:productionUrl,
    development:developmentUrl,
    staging:stagingnUrl,
    pretest:pretestnUrl
}
export default configUrl[String(import.meta.env.VITE_PROJECT_ENV)]
