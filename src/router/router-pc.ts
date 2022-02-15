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
const routes =
    [
        {
            path: '/',
            //redirect: '/blockchainSituation'
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
            path: '/blockchainSituation',
            name: 'blockchainSituation',
            component: () => import('../views/pc/blockchain-situation/blotua-main.vue'),
            meta: {title: 'lang.subNav.navName0'}
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
    LSTS: 'lang.subNav.navName0',
    XMPH: 'lang.subNav.navName1',
    XMPH_XMXQ: "lang.subNav.navName1s2",
    XMPH_HYXQ: "lang.subNav.navName1s1",
    FXJG: 'lang.subNav.navName2',
    FXJG_XQ: "lang.subNav.navName2",
    FXJG_LB: "lang.subNav.navName2",
    XMGL: 'lang.subNav.navName3',
    XTPZ: 'lang.subNav.navName4',
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
    router.beforeEach((to:RouteLocationNormalized, from:RouteLocationNormalized, next:Function) => {
        if (to.path === '/login' || getStore('token') === null) {
            removeStore('userInfo')
            removeStore('token')
            clearSession();
            // 路由跳转白名单（不需要验证token）
            const whiteList = ['/login']
            // 这里必须加这个判断，否则会造成路由跳转死循环，从而无法跳转(用户服务协议 无权限)
            if(whiteList.includes(to.path)){
                next()
            }else{
                next({
                    path: '/login',
                })
            }
            return
        }
        if(store.state.routeConfig.length > 0){
            setTimeout(() => {
                i18n.global.locale.value = getStore('language') === 'en_US' ? 'en_US' : 'zh_CN'
                to.meta.titleInfo = i18n.global.t(to.meta.title as string)
            }, 100)
        }else{
            const params = {
                systemCode: 'beosin-eye',
                userId: getStore('userId'),
            }
            getRouterInfo(params).then(res => {
                const routerConfig = initRouterConfig(res.data[0].children)
                store.commit('update', ['routeConfig', routerConfig])
                routerConfig.map((val:RouteRecordRaw) => {
                    router.addRoute('layout', val)
                })
                router.addRoute({
                    path: '/:w+',
                    redirect: '/404'
                })
                setTimeout(() => {
                    i18n.global.locale.value = getStore('language') === 'en_US' ? 'en_US' : 'zh_CN'
                    to.meta.titleInfo = i18n.global.t(to.meta.title as string)
                }, 100)
            }).catch(err=>console.log(err))
        }
        next()
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
