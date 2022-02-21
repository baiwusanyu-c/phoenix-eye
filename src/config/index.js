/*
 * @Author: your name
 * @Date: 2021-08-04 09:52:49
 * @LastEditTime: 2021-10-20 11:28:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \anti-fraud-front\src\config\index.js
 */
// 一些全局的config配置
const modeUrlObj = {
    // 生产环境
    'production': {
         baseURL: 'https://eagle.beosin.com/eagle-eye-ussa/',
    },
    // 开发环境
    'development': {
        baseURL: 'http://192.168.0.216:9527',
        //baseURL: 'http://124.71.193.230:9527',

    },
    // 测试环境
    'staging': {
        baseURL: 'http://124.71.193.230:9527',

    },
     // 预发布环境
     'pretest': {
        baseURL: 'http://124.71.154.20:9527',
    }
}
export default modeUrlObj[process.env.NODE_ENV]
