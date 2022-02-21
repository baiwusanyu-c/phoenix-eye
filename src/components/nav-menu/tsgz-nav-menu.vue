/*
* @tsgz-nav-menu.vue
* @deprecated 虚拟货币系统 - 左侧菜单导航
* @author czh
* @update (czh 2021/8/2)
*/
<template>
    <div class="tsgz-nav-menu" id="xnhb_nav_menu">
        <!--    展开时logo    -->
        <div style="display: flex">
            <div class="expend-logo"></div>
            <!--    展开时菜单    -->
            <div class="tsgz-nav-menu-container">
                <el-menu
                    unique-opened
                    ref="menuPart1"
                    mode="horizontal"
                    :ellipsis="false"
                    :default-active="active"
                    class="el-menu-demo menu-part1">

                    <div v-for="(value,key) in headerConfig" :key="key">
                        <el-menu-item  :key="key" :index="value.index"
                                       v-if='value !== undefined && value.show && value?.children.length === 0'
                                       :disabled="value.isDisabled"
                                       @click="routerSwitch(value,value.isPush)">
                            <span style="margin-left: 10px">{{ $t(value.name) }}</span>
                        </el-menu-item>
                    </div>
                </el-menu>
            </div>
        </div>
        <div class="tsgz-slogan">
            <el-dropdown @command="changeLanguage">
                            <span class="el-dropdown-link" style="display: flex;align-items: center;margin:0 30px">
                              {{ computeLang }}
                              <be-icon icon="under" style="margin-left: 5px" color="#777"></be-icon>
                            </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item command="zh_CN"
                                          :class="`${getStore('language') === 'zh_CN' ? 'active-dropdown' :''}`">
                            {{ $t('lang.header.chinese') }}
                        </el-dropdown-item>
                        <el-dropdown-item command="en_US"
                                          :class="`${getStore('language') === 'en_US' ? 'active-dropdown' :''}`">
                            {{ $t('lang.header.english') }}
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
            <el-dropdown @command="changeLanguage">
                            <span class="el-dropdown-link">
                              <div class="tsgz-user">{{ $t('lang.header.me') }}</div>
                            </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item command="logout">{{ $t('lang.header.logout') }}</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
        <!--退出弹窗-->
        <MsgDialog
            @confirm="() => (isLogout = false)"
            @close="() => (isLogout = false)"
            :isShow.sync="isLogout"
            :isShowCancel="false"
            :title="$t('lang.loginConfig.confirmLogout')">
        </MsgDialog>
    </div>

</template>

<script lang="ts">
import {computed, defineComponent, nextTick, onMounted, ref, watch} from "vue";
import {onBeforeRouteUpdate} from "vue-router";
import {clearSession, clearStore, getStore, setStore} from "../../utils/common";
import composition from "../../utils/mixin/common-func";
import {useStore} from "vuex";
import MsgDialog from '../../components/common-components/msg-dialog/msg-dialog.vue'
import BeSvgIcon from "../../components/common-components/svg-icon/be-svg-icon.vue";
import {BeIcon} from '../../../public/be-ui/be-ui.es.js'
import {useI18n} from "vue-i18n";
/**
 * 头部菜单导航
 */
export default defineComponent({
    name: "TsgzNavMenu",
    components:{
        MsgDialog,
        BeSvgIcon,
        BeIcon
    },
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
        watch(route,()=>{
            nextTick(() => {
                setActiveNav()
            })
        })
        onMounted(() => {
            nextTick(()=>{
                loginUser.value = JSON.parse(getStore('userInfo') as string).username
                setHeaderConfig()
            })

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
                            active.value = `${parseInt(headerConfig.value[val].index)}`
                            throw new Error('')
                        }
                        if (!headerConfig.value[val].path) {
                            headerConfig.value[val].children.forEach((res:any) => {
                                if (route.path.indexOf(res.path) > -1) {
                                    debugger
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
        const loginUser = ref<string>('')
        // 语种切换
        const {t, locale} = useI18n()
        const changeLanguage = (data: string): void => {
            if (data === 'logout') {
                routerPush('/login')
                return
            }
            setStore('language', data)
            locale.value = data
            computeLang.value = locale.value === 'en_US' ? 'EN' : 'ZH'
            route.meta.titleInfo = t(route.meta.title)
        }
        const computeLang = ref<string>('EN')
        return {
            computeLang,
            active,
            changeLanguage,
            getStore,
            headerConfig,
            routerSwitch,
        }
    }
})

</script>

<style lang="scss">


.el-dropdown-menu__item_on {
  color: $mainColor3;
  background-color: $mainColor10;
}

.tsgz-nav-menu-container, {
  text-align: left;

  .nav-menu-icon {
    fill: $textColor8 !important;
  }

}

.tsgz-nav-menu-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 800px;
  height: 60px;
  overflow-x: hidden;
  overflow-y: auto;
}

.tsgz-nav-menu-container-free {
  height: calc(68% - 16px);
}

.tsgz-nav-menu {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  overflow-x: hidden;
  overflow-y: auto;
  text-align: center;
  background-color: $mainColor7;
  box-shadow: 2px 0 6px 0 rgba(0, 21, 41, .12);
    .tsgz-slogan {
        display: flex;
        flex: 4;
        flex-direction: row;
        align-items: center;
        justify-content: flex-end;
        height: 100%;
        margin-right: 30px;
        background-repeat: no-repeat;
        background-position: right;
        background-size: 100% 100%;

        .tsgz-user {
            width: 28px;
            height: 28px;
            line-height: 28px;
            color: $textColor6;
            text-align: center;
            background-color: $mainColor3;
            border-radius: 30px;
        }

        h3 {
            margin: 0 10px;
            font-family: PingFangSC-Semibold, PingFang SC, sans-serif;
            font-size: 20px;
            font-weight: 500;
            color: $textColor4;
        }
    }

    .expend-logo {
        background-image: url("../../assets/image/pc/logo-white.png");
        background-repeat: no-repeat;
        width: 164px;
        margin-left: 30px;
        background-position-y: center;
    }

    .el-menu-item{
        margin-bottom: 0!important;
    }
    .menu-disable {
        cursor: not-allowed;
    }

  .nav-menu-icon {

    /* margin-right: 10px; */
    fill: $textColor8 !important;
  }

  .el-menu {

    /* width: 100% !important; */
    background-color: transparent;
    border:0;

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
        color: $mainColor3;
        background-color: transparent;
        font-weight: bold;
    }

  }

  .menu-part1 {
    .el-menu-item.is-active,
    .el-menu-item:focus {
      color: $mainColor3;
      font-weight: bold;
      background-color: transparent;
      .nav-menu-icon {
        fill: #fff !important;
      }
    }
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

  }
}
</style>
<style lang="scss">
@media screen and (min-width: 1536px) and (max-height: 880px) and (max-width: 1830px) {

}
</style>
<!--1080p的130% - 140%放大-->
<style scoped lang="scss">
@media screen and (min-width: 1326px) and (max-height: 710px) and (max-width: 1478px) {

  .tsgz-nav-menu {

  }
}
</style>
<style lang="scss">
@media screen and (min-width: 1326px) and (max-height: 710px) and (max-width: 1478px) {



}
</style>
<!--1080p的145% - 150%放大-->
<style scoped lang="scss">
@media screen and (min-width: 1280px) and (max-height: 638px) and (max-width: 1326px) {



}
</style>
<style lang="scss">
@media screen and (min-width: 1280px) and (max-height: 638px) and (max-width: 1326px) {



}
</style>