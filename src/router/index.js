import Vue from 'vue';
import Router from 'vue-router';
import _this from '../main.js'
import {getRouterInfo} from "../api/login";
import {getStore, isString} from "../utils/auth";
import store from "../store/store";

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

    ]
}
const metaTitleDict = {
    LSTS: 'el.subNav.navName0',
    XMPH: 'el.subNav.navName1',
    XMPH_XMXQ: "el.subNav.navName1s2",
    XMPH_HYXQ: "el.subNav.navName1s1",
    FXJG: 'el.subNav.navName2',
    FXJG_XQ: "el.subNav.navName2",
    FXJG_LB: "el.subNav.navName2",
    XMGL: 'el.subNav.navName3',
    XTPZ: 'el.subNav.navName4',
}

// 递归路由配置对象
export const initRouterConfig = (treeData) => {
    treeData.forEach(val => {
        // 删除bms默认的redirect配置
        if (val.redirect === "noRedirect") {
            Reflect.deleteProperty(val, 'redirect')
        }
        // 将meta.title 配置成国家化变量
        val.meta.title = metaTitleDict[val.perms]
        // 配置组件引入
        val.componentPath = isString(val.component) && val.component
        val.component = () => import(`../views/${val.componentPath}`)
        if (val.children && val.children.length > 0) {
            initRouterConfig(val.children)
        }
    })
    return treeData
}
/**
 * 路由守卫方法
 * @param {Object} router - 路由对象
 */
const beforeEachHandle = (router) => {
    router.beforeEach((to, from, next) => {
        if(store.state.routeConfig.length > 0){
            setTimeout(() => {
                _this.$i18n.locale = _this.getStore('language')
                to.meta.titleInfo = _this.$t(to.meta.title)
            }, 100)
        }else{
            const params = {
                systemCode: 'beosin-eye',
                userId: getStore('userId'),
            }
            getRouterInfo(params).then(res => {
                const routerConfig = initRouterConfig(res.data[0].children)
                store.commit('update', ['routeConfig', routerConfig])
                routerConfig.map(val => {
                    router.addRoute('layout', val)
                })
                router.addRoute({
                    path: '*',
                    redirect: '/404'
                })
                setTimeout(() => {
                    _this.$i18n.locale = _this.getStore('language')
                    to.meta.titleInfo = _this.$t(to.meta.title)
                }, 100)
            })
        }
        next()
    })
}
/**
 * 初始化路由实例
 * @param {Object} option 路由配置
 * @returns {VueRouter}
 */
export const routerInit = (option) => {
    const router = new Router(option)
    beforeEachHandle(router)
    return router
}
