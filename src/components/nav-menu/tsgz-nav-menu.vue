/*
* @tsgz-nav-menu.vue
* @deprecated 虚拟货币系统 - 左侧菜单导航
* @author czh
* @update (czh 2021/8/2)
*/
<template>
    <div class="tsgz-nav-menu" id="xnhb_nav_menu">
        <!--    展开时logo    -->
        <div>
            <div class="expend-logo"></div>
        </div>
        <!--    展开时項目名稱    -->
        <span class="tsgz-name">{{ $t('lang.loginConfig.prodName') }}</span>
        <!--    展开时菜单    -->
        <div class="tsgz-nav-menu-container">
            <el-menu
                unique-opened
                ref="menuPart1"
                :default-active="active"
                class="el-menu-vertical-demo menu-part1">
                <div v-for="(value,key) in headerConfig" :key="key">
                    <el-menu-item :index="value.index" v-if='value.show && value.children.length === 0'
                                  :disabled="value.isDisabled"
                                  @click="routerSwitch(value,value.isPush)">
                        <svg-icon disabled-tool-tip :iconClass="value.icon" class-name="nav-menu-icon"></svg-icon>
                        <span style="margin-left: 10px">{{ $t(value.name) }}</span>
                    </el-menu-item>
                    <el-sub-menu v-if='value.show && value.children.length > 0' :index="value.index"
                                :disabled="value.isDisabled">
                        <template #title>
                            <svg-icon disabled-tool-tip :iconClass="value.icon" class-name="nav-menu-icon"></svg-icon>
                            <span style="margin-left: 10px">{{ $t(value.name) }}}</span>
                        </template>
                        <div v-for="item in value.children" :key="item.key">
                            <el-menu-item :index="item.index" @click.self="routerSwitch(item,value.isPush)">
                                <span>{{ item.name }}</span>
                            </el-menu-item>
                        </div>
                    </el-sub-menu>
                </div>
            </el-menu>
        </div>
        <!--退出弹窗-->
        <be-msg-dialog
            @confirm="() => (isLogout = false)"
            @close="() => (isLogout = false)"
            :isShow.sync="isLogout"
            :isShowCancel="false"
            :title="$t('lang.loginConfig.confirmLogout')">
        </be-msg-dialog>
    </div>

</template>

<script lang="ts">
import {defineComponent, nextTick, onMounted, ref} from "vue";
import {onBeforeRouteUpdate} from "vue-router";
import {clearSession, clearStore} from "../../utils/common";
import composition from "../../utils/mixin/common-func";
import {useStore} from "vuex";

/**
 * 头部菜单导航
 */
export default defineComponent({
    name: "TsgzNavMenu",
    setup(props, ctx) {
        const {routerPush,route} = composition(props, ctx)
        //是否登出
        const isLogout = ref<boolean>(false)
        /**
         * 登出方法
         * @param {String} command - 登出指令类型
         */
        const loginOut = (command: string = 'logout'): void => {
            // 退出登录
            if (command === 'logout') {
                isLogout.value = true;
            }
        }
        /**
         * 退出接口调用方法
         */
        const confirm = (): void => {
            routerPush("/login")
            clearSession();
            clearStore();
            isLogout.value = false;
        }
        /**
         * 路由跳转方法
         * @param {any} router
         * @param {Boolean} isPush
         */
        const routerSwitch = (router: any, isPush: boolean): void => {
            if (router.path === '/logout') {
                loginOut()
                return;
            }
            if (!isPush || !router.path) {
                return
            }
            routerPush(router.path)

        }
        onBeforeRouteUpdate(() => {
            nextTick(() => {
                setActiveNav()
            })
        })
        onMounted(() => {
            setHeaderConfig()
        })
        /**
         * 配置头部菜单方法
         * 这里根据权限、禁用等进行设置
         */
        const setHeaderConfig = (): void => {
            initHeaderConfig()
            setActiveNav()
        }

        /**
         * 初始化菜单配置
         */
        const headerConfig = ref<any>({})
        const store = useStore()
        const initHeaderConfig = (): void => {
            const menuConfig = store.state.routeConfig
            const iconList: Array<string> = ['-renwu', '-liulanqi', '-tiaochaquzheng', '-jiaoyifenxi', '-xitongpeizhi']
            menuConfig.forEach((val: any, index: number) => {
                headerConfig.value[val.perms as string] = {
                    icon: iconList[index],
                    index: index.toString(),
                    name: val.meta.title,
                    show: !val.hidden,
                    path: val.path,
                    isPush: true,
                    children: [],
                    isDisabled: false,
                }
            })
        }
        /**
         * 设置激活菜单
         * 某些场景下，需要根据当前路由高亮显示激活的菜单
         * 这里就是根据路由进行了匹配进行激活高亮
         */
        const active = ref<string>('0')
        const setActiveNav = (): void => {
            const menuList:HTMLCollectionOf<Element> = document.getElementsByClassName('el-menu-item')
            nextTick(() => {
                try {
                    Object.keys(headerConfig.value).forEach(val => {
                        if (route.path.indexOf(headerConfig.value[val].path) > -1 || route.meta.title === headerConfig.value[val].name
                        ) {
                            active.value = headerConfig.value[val].index
                            throw new Error('')
                        }
                        if (!headerConfig.value[val].path) {
                            headerConfig.value[val].children.forEach((res:any) => {
                                if (route.path.indexOf(res.path) > -1) {
                                    active.value = res.index
                                    throw new Error('')
                                }
                            })
                        }
                    })
                } catch (e) {
                    setFocusStyle(menuList)
                }
            })
        }
        const setFocusStyle = (menuList:HTMLCollectionOf<Element>): void => {
            // 激活元素设置聚焦 规避bug 3825
            nextTick(() => {
                for (let i = 0; i < menuList.length; i++) {
                    let elm = menuList[Number(i)] as HTMLElement
                    if (elm.className.indexOf('is-active') > -1) {
                        elm.focus()
                    }
                }
            })
        }
        return {
            active,
            headerConfig,
            routerSwitch,
        }
    }
})

</script>

<style lang="scss">
.no-active {

    .el-menu-item.is-active {
        color: $textColor8 !important;
        background-color: transparent !important;
    }

    .el-menu-item.is-active:hover {
        background-color: $mainColor3 !important;
    }
}

.el-dropdown-menu__item_on {
    color: $mainColor3;
    background-color: $mainColor10;
}

.tsgz-nav-menu-container,
.tsgz-nav-menu-p2 {
    text-align: left;

    .nav-menu-icon {
        fill: $textColor8 !important;
    }

}

.tsgz-nav-menu-container {
    height: 76%;
    overflow-x: hidden;
    overflow-y: auto;
}

.tsgz-nav-menu-container-free {
    height: calc(68% - 16px);
}

.tsgz-nav-menu {
    box-sizing: border-box;

    overflow-x: hidden;
    overflow-y: auto;
    text-align: center;
    background: #0A5292 linear-gradient(180deg, #002E57 0%, #0A5292 100%);
    background-image: url("../../assets/image/pc/menu-textrue.png");
    background-repeat: no-repeat;
    background-position: bottom;
    background-size: 100%;
    box-shadow: 2px 0 6px 0 rgba(0, 21, 41, .12);

    .expend-logo {
        width: 168px !important;
        height: 94px !important;
        margin: 32px 20px 0 20px !important;
        -webkit-clip-path: polygon(22% 0, 84% 0, 62% 100%, 29% 100%);
        clip-path: polygon(22% 0, 84% 0, 62% 100%, 29% 100%);
        font-size: 20px !important;
        color: white !important;
        vertical-align: middle !important;
        background-image: url("../../assets/image/pc/logo-white.png");
        background-repeat: repeat;
        background-position-x: -38%
    }

    .logo-fold {
        width: 44px;
        height: 44px;
        margin: 12px 6px;
        font-size: 35px;
        color: white;
        vertical-align: middle;
    }

    .nav-menu-icon-fold {
        width: 32px;
        height: 60px;
        margin: 0 auto;
        font-size: 30px;
        line-height: 50px;
        vertical-align: middle;
        cursor: pointer;

        .svg-icon {
            width: .9em;
            height: .9em;
        }
    }

    .menu-disable {
        cursor: not-allowed;
    }

    .nav-menu-icon-fold-150 {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 60px;
        margin: 0 auto;
        font-size: 30px;
        line-height: 50px;
        vertical-align: middle;
        cursor: pointer;

        .svg-icon {
            width: .9em;
            height: .9em;
        }
    }

    .nav-menu-icon-last {
        height: 60px;
        margin-top: 0;
        margin-bottom: 0;
        line-height: 50px;
    }

    .nav-menu-icon {

        /* margin-right: 10px; */
        fill: $textColor8 !important;
    }

    .tsgz-name {
        display: inline-block;
        max-width: 168px;

        /* text-align: center; */
        height: 24px;
        margin-top: 12px;
        margin-bottom: 25px;
        font-family: "PingFang Medium", sans-serif;
        font-size: 14px;
        color: $textColor6;
    }

    .el-menu {
        width: 100% !important;
        height: 70%;
        background-color: transparent;
        border-right: 0;

        .el-menu-item, .el-submenu__title {
            position: relative;
            height: 40px;
            margin-bottom: 10px;
            line-height: 40px;
            color: $textColor8;
            white-space: nowrap;
            list-style: none;
        }

        .el-submenu__title:hover,
        .el-menu-item:hover {
            background-color: $mainColor3;
        }

    }

    .menu-part1 {

        .el-menu-item.is-active,
        .el-menu-item:focus {
            color: #fff;
            background-color: $mainColor3;

            .nav-menu-icon {
                fill: #fff !important;
            }
        }
    }

    .menu-part2 {

        .el-menu-item.is-active {
            color: $textColor8;
            background-color: transparent;
        }
    }

    .tsgz-nav-menu-textrue {
        width: 100%;
        margin-top: 10px;
    }

    .tsgz-nav-menu-p2 {
        width: 208px;

    }

    .menu-container-fold {
        width: 60px;
        height: 84%;

        .menu-fold-item-active {
            background-color: $mainColor3;
        }
    }

    .menu-container-fold2 {
        width: 60px;
    }

    .menu-fold-item {

        &:hover {
            background-color: $mainColor3;
        }
    }
}
</style>

<!--1080p的105% - 125%放大-->
<style scoped lang="scss">
@media screen and (min-width: 1536px) and (max-height: 880px) and (max-width: 1830px) {

    .tsgz-nav-menu {

        .expend-logo {
            width: 146px !important;
            margin: 10px 10px 0 10px !important;

        }

        .tsgz-nav-menu-container {
            height: 73%;
        }

        .menu-container-fold {
            height: 78%;
        }

        .nav-menu-icon-fold {
            width: 24px;
            height: 45px;
            line-height: 38px;

            .svg-icon {
                width: 1.2em;
                height: 1.2em;
                font-size: 20px !important;
            }
        }

        .tsgz-nav-menu-p2 {
            width: 178px;
        }

        .menu-container-fold2 {
            width: 60px;
        }

        .nav-menu-icon-fold-150 {
            height: 45px;
            line-height: 38px;

            .svg-icon {
                width: 1.2em;
                height: 1.2em;
                font-size: 20px !important;
            }
        }
    }
}
</style>
<style lang="scss">
@media screen and (min-width: 1536px) and (max-height: 880px) and (max-width: 1830px) {

    .tsgz-nav-menu .el-menu .el-menu-item {
        min-width: 160px;
    }
}
</style>
<!--1080p的130% - 140%放大-->
<style scoped lang="scss">
@media screen and (min-width: 1326px) and (max-height: 710px) and (max-width: 1478px) {

    .tsgz-nav-menu {

        .expend-logo {
            width: 146px !important;
            margin: 10px 10px 0 10px !important;

        }

        .tsgz-nav-menu-container {
            height: 72%;
        }

        .menu-container-fold {
            height: 78%;
        }

        .nav-menu-icon-fold {
            width: 24px;
            height: 45px;
            line-height: 38px;

            .svg-icon {
                width: 1.2em;
                height: 1.2em;
                font-size: 20px !important;
            }
        }

        .tsgz-nav-menu-p2 {
            width: 178px;
        }

        .menu-container-fold2 {
            width: 60px;
        }

        .nav-menu-icon-fold-150 {
            height: 45px;
            line-height: 38px;

            .svg-icon {
                width: 1.2em;
                height: 1.2em;
                font-size: 20px !important;
            }
        }
    }
}
</style>
<style lang="scss">
@media screen and (min-width: 1326px) and (max-height: 710px) and (max-width: 1478px) {

    .tsgz-nav-menu .el-menu .el-menu-item, .tsgz-nav-menu .el-menu .el-submenu__title {
        height: 28px;
        line-height: 28px;
    }

    .tsgz-nav-menu .el-menu .el-menu-item {
        min-width: 160px;
    }

}
</style>
<!--1080p的145% - 150%放大-->
<style scoped lang="scss">
@media screen and (min-width: 1280px) and (max-height: 638px) and (max-width: 1326px) {

    .tsgz-nav-menu {

        .tsgz-name {
            font-size: 12px;
        }

        .expend-logo {
            width: 146px !important;
            margin: 10px 10px 0 10px !important;
            -webkit-clip-path: polygon(22% 0%, 100% -15%, 63% 107%, 30% 100%);
            clip-path: polygon(22% 0%, 100% -15%, 63% 107%, 30% 100%);
            background-image: url("../../assets/image/pc/logo-white.png");
            background-repeat: repeat;
            background-position-x: -28%
        }

        .tsgz-nav-menu-container {
            height: 69%;
        }

        .menu-container-fold {
            height: 78%;
        }

        .nav-menu-icon-fold {
            width: 24px;
            height: 45px;
            line-height: 38px;

            .svg-icon {
                width: 1.2em;
                height: 1.2em;
                font-size: 20px !important;
            }
        }

        .tsgz-nav-menu-p2 {
            width: 160px;
        }

        .menu-container-fold2 {
            width: 60px;
        }

        .nav-menu-icon-fold-150 {
            height: 45px;
            line-height: 38px;

            .svg-icon {
                width: 1.2em;
                height: 1.2em;
                font-size: 20px !important;
            }
        }
    }

}
</style>
<style lang="scss">
@media screen and (min-width: 1280px) and (max-height: 638px) and (max-width: 1326px) {

    .tsgz-nav-menu .el-menu .el-menu-item, .tsgz-nav-menu .el-menu .el-submenu__title {
        height: 28px;
        line-height: 28px;
    }

    .tsgz-nav-menu .el-menu .el-menu-item {
        min-width: 160px;
    }

}
</style>