import {
    createRouter,
    createWebHashHistory,
    RouterOptions,
    RouteRecordRaw,
    RouteLocationNormalized,
    Router,
} from 'vue-router'
import {isString, getStore, removeStore, clearSession} from "../utils/common";
import {i18n} from "../utils/i18n";
import {getRouterInfo} from "../api/login";
import store from "../store/store";
// @ts-ignore
import {BeMessage} from "../../public/be-ui/be-ui.es.js";
const routes =
    [
        {
            path: '/',
            redirect: '/riskTrx/list'
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
                {
                    path: '/riskTrx/list',
                    name: 'riskTrx',
                    component: () => import('../views/pc/risk-trx/risk-trx-list.vue'),
                    meta: {title: 'lang.subNav.navName2'},

                },
                {
                    path: '/riskTrx/detail',
                    name: 'riskTrxDetail',
                    component: () => import('../views/pc/risk-trx/risk-trx-detail.vue'),
                    meta: {title: 'lang.subNav.navName2'},
                },
            ]
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('../views/pc/login/login.vue'),
            meta: {title: '登录'}
        },
    ]
// 路由的metaTitle字典
const metaTitleDict:any = {
    XMSS:'lang.subNav.navName5',
    XMGL: 'lang.subNav.navName3',
}
// 递归路由配置对象
export const initRouterConfig = (treeData:any) => {
    treeData.forEach((val:any) => {
        // 删除bms默认的redirect配置
        if (val.redirect === "noRedirect") {
            Reflect.deleteProperty(val, 'redirect')
        }
        // 将meta.title 配置成国家化变量
        val.meta.title = metaTitleDict[val.perms]
        // 配置组件引入
        val.componentPath = isString(val.component) && val.component
        val.component = () => import(`../views/${val.componentPath}.vue`)
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

const beforeEachHandle = (router:Router) => {
    router.beforeEach( (to:RouteLocationNormalized, from:RouteLocationNormalized, next:Function) => {
        if(store.state.routeConfig.length > 0 || !getStore('token')){
            next()
            return;
        }else{
            const params = {
                systemCode: 'beosin-eye',
                userId: getStore('userId'),
            }
             getRouterInfo(params).then(res => {
                const routerConfig = initRouterConfig(res.data[0].children)
                store.commit('update', ['routeConfig', routerConfig])
                let title:string = ''
                routerConfig.map((val:RouteRecordRaw) => {
                     if(val.path === to.path ){
                         title = val?.meta?.title as string
                     }
                     router.addRoute('layout', val)
                })
                 router.addRoute({
                    path: '/:w+',
                    redirect: '/404'
                })
                setTimeout(() => {
                   i18n.global.locale.value = getStore('language') === 'en_US' ? 'en_US' : 'zh_CN'
                   to.meta.titleInfo = i18n.global.t(title)
                }, 100)
                next({path:to.path,query:to.query})
            }).catch(err=>console.log(err))

        }
    })
}

export const router = createRouter({
    history: createWebHashHistory(),
    routes,
} as RouterOptions)
beforeEachHandle(router)
router.afterEach((to, from) => {
    window.scrollTo(0,0);
})
