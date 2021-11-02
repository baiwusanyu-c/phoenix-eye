import Vue from 'vue';
import Router from 'vue-router';
import _this from '../main.js'
Vue.use(Router);
//获取原型对象上的push函数
const originalPush = Router.prototype.push
//修改原型对象中的push方法
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}
// 路由配置项
export const routerOption = {
    mode: 'hash',
    routes: [
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/',
            component: () => import('../views/pc/layout/layout.vue'),
            meta: {title: 'Layout'},
            name: 'layout',
            children: [
                {
                    path: '/blockchainSituation',
                    name: 'BlockchainSituation',
                    component: () => import('../views/pc/blockchain-situation/blotua-main.vue'),
                    meta: {title: 'lang.navTextConfig.navName0'},
                    children: []
                },
                {
                    path: '/projectRanking',
                    name: 'ProjectRanking',
                    component: () => import('../views/pc/project-ranking/project-ranking-main.vue'),
                    meta: {title: 'lang.navTextConfig.navName1'},
                    children: []
                },
                {
                    path: '/riskWarning',
                    name: 'RiskWarning',
                    component: () => import('../views/pc/risk-warning/risk-warning-main.vue'),
                    meta: {title: 'lang.navTextConfig.navName2'},
                    children: []
                },
                {
                    path: '/projectManagement',
                    name: 'ProjectManagement',
                    component: () => import('../views/pc/project-management/project-manage-main.vue'),
                    meta: {title: 'lang.navTextConfig.navName3'},
                    children: []
                },
                {
                    path: '/systemConfig',
                    name: 'SystemConfig',
                    component: () => import('../views/pc/system-config/system-config-main.vue'),
                    meta: {title: 'lang.navTextConfig.navName4'},
                },
                {
                    path: '/404',
                    name: '404',
                    component: () => import('../views/pc/empty-page/404.vue'),
                    meta: {title: '404'}
                },

            ]
        },

        {
            path: '/login',
            name: 'login',
            component: () => import('../views/pc/login/login.vue'),
            meta: {title: '登录'}
        },
        {
            path: '/test',
            name: 'test',
            component: () => import('../views/test.vue')
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
}
/**
 * 路由守卫方法
 * @param {Object} router - 路由对象
 */
const beforeEachHandle = (router)=>{
    router.beforeEach((to, from, next) => {
        setTimeout(() => {
            _this.$i18n.locale = 'zh_CN'
            to.meta.title = _this.$t(to.meta.title)
            next()
        }, 100)
    })
}
/**
 * 初始化路由实例
 * @param {Object} option 路由配置
 * @returns {VueRouter}
 */
export const routerInit = (option)=>{
    const router = new Router(option)
    beforeEachHandle(router)
    return router
}
