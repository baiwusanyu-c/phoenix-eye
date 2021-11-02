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
         baseURL: 'https://trace.beosin.com',
         authBaseURL: '',
         imgURL: 'https://trace.beosin.com',
         codeURL: 'https://trace.beosin.com',
         helpURL: 'https://help.beosin.com',
       /* baseURL: 'http://124.71.181.201:9527',
        authBaseURL: '',
        imgURL: 'https://trace.beosin.com',
        codeURL: 'http://124.71.181.201:9527',
        helpURL: 'http://124.71.181.201:18081'*/

        clientSecret:'123456',// 免登密匙
        clientID:'no_sugar_system',// 免登id
    },
    // 开发环境
    'development': {
        baseURL: 'http://192.168.0.216:9527',
        authBaseURL: '',
        imgURL: 'http://124.71.193.230',
        codeURL: 'http://192.168.0.216',
        helpURL: 'http://192.168.0.216:18081',
      /* baseURL: 'http://124.71.193.230:9527',
       authBaseURL: '',
       imgURL: 'http://124.71.193.230',
       codeURL: 'http://124.71.193.230:9527',
       helpURL: 'http://192.168.0.50:8080',*/

        clientSecret:'123456',// 免登密匙
        clientID:'no_sugar_system',// 免登id
    },
    // 测试环境
    'staging': {
        baseURL: 'http://124.71.193.230:9527',
        authBaseURL: '',
        imgURL: 'http://124.71.193.230',
        codeURL: 'http://124.71.193.230:9527',
        helpURL: 'http://124.71.193.230:18081',


        clientSecret:'123456',// 免登密匙
        clientID:'no_sugar_system',// 免登id
    },
     // 预发布环境
     'pretest': {
        baseURL: 'http://124.71.154.20:9527',
        authBaseURL: '',
        imgURL: 'http://124.71.193.230', // ！！！勿动，预发布环境没有图片服务，需要用测试环境的
        codeURL: 'http://124.71.154.20:9527',
        helpURL: 'http://124.71.154.20:18081',


        clientSecret:'123456',// 免登密匙
        clientID:'no_sugar_system',// 免登id
    }
}
export default modeUrlObj[process.env.NODE_ENV]
