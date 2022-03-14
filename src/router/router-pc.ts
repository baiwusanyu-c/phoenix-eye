import {
    createRouter,
    createWebHashHistory,
    RouterOptions,
    RouteLocationNormalized,
    Router,
} from 'vue-router'
import {isString, getStore} from "../utils/common";
import {i18n} from "../utils/i18n";
import {getRouterInfo} from "../api/login";
import store from "../store/store";
// @ts-ignore
import {BeMessage} from "../../public/be-ui/be-ui.es.js";
import {IOption} from "../utils/types";
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
            path: '/external/riskTrx/list',
            name: 'externalRiskTrxDetail',
            component: () => import('../views/pc/external-page/external-risk-trx.vue'),
            meta: {title: 'lang.subNav.navName2'},
        },
    ]
// 路由的metaTitle字典
const metaTitleDict:any = {
    XMSS:'lang.subNav.navName5',
    XMGL: 'lang.subNav.navName3',
}
// 组件字典
// 递归路由配置对象时会使用到，其key必须和bms的组件路径一致
// 有这个字典是为了保持对组建的引用，否则在打包时会被vite的tree shaking掉
const routerDict:IOption = {
    'pc/project-management/project-manage-main':() => import('../views/pc/project-management/project-manage-main.vue'),
    'pc/project-search/project-search-main':() => import('../views/pc/project-search/project-search-main.vue'),
    'pc/project-search/project-search-detail':() => import('../views/pc/project-search/project-search-detail.vue')
}
// 递归路由配置对象
export const initRouterConfig = <T>(treeData:Array<T>):Array<T> => {
    treeData.forEach((val:any) => {
        // 删除bms默认的redirect配置
        if (val.redirect === "noRedirect") {
            Reflect.deleteProperty(val, 'redirect')
        }
        // 将meta.title 配置成国家化变量
        val.meta.title = metaTitleDict[val.perms]
        // 配置组件引入
        //val.component = () => import(`../views/${val.componentPath}.vue`)
        val.componentPath = isString(val.component) && val.component
        val.component = routerDict[val.componentPath]
        if (val.children && val.children.length > 0) {
            initRouterConfig(val.children)
        }
    })
    return treeData
}

export function getRouterData(router:Router,next:Function,to:RouteLocationNormalized) {
    const params = {
        systemCode: 'beosin-eye',
        userId: getStore('userId'),
    }
    getRouterInfo(params).then(res => {
        if (!res || res.data.length === 0) {
            next({
                path: '/riskTrx/list',
            })
            return
        }
        const routerConfig = initRouterConfig(res.data[0].children)
        store.commit('update', ['routeConfig', routerConfig])
        routerConfig.map((val: any) => {
            router.addRoute('layout', val)
        })
        router.addRoute({
            path: '/:w+',
            redirect: '/404'
        })
        setTimeout(() => {
            i18n.global.locale.value = getStore('language') === 'en_US' ? 'en_US' : 'zh_CN'

        }, 100)
        getRouterNum = 0
        next({path: to.path, query: to.query})
    }).catch(err => {
        next({
            path: '/riskTrx/list',
        })
        console.log(err)
    })
}

/**
 * 路由守卫方法
 * @param {Object} router - 路由对象
 */
let getRouterNum:number = 0
const beforeEachHandle = (router:Router) => {
    router.beforeEach( (to:RouteLocationNormalized, from:RouteLocationNormalized, next:Function) => {
        // 路由跳转白名单（不需要验证token,和获取路由）
        // const whiteList = ['/riskTrx/list']
        // let isWhitePath = false
        // whiteList.forEach(val=>{
        //     if(val === to.path){
        //         isWhitePath = true
        //     }
        // })
        if(store.state.routeConfig.length > 0 || !getStore('token') ){
            next()
            return;
        }else{
             getRouterData(router,next, to);
            // getRouterNum++
            // if(getRouterNum < 10){
            //     getRouterData(router,next, to);
            // }else{
            //     next({
            //         path: '/riskTrx/list',
            //     })
            // }
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
