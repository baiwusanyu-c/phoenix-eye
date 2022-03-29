/* * @tsgz-nav-menu.vue * @deprecated 虚拟货币系统 - 左侧菜单导航 * @author czh * @update (czh
2021/8/2) */
<template>
  <div id="xnhb_nav_menu" class="tsgz-nav-menu">
    <!--    logo    -->
    <div style="display: flex; align-items: center">
      <div class="expend-logo"></div>
      <el-select
        v-if="isLogin"
        v-model="selectVal"
        filterable
        :placeholder="$t('lang.pleaseSelect')"
        clearable
        @change="handleProjectSelect">
        <el-option
          v-for="item in projectList"
          :key="item.project_id + item.name"
          :label="item.name"
          :value="item.project_id">
        </el-option>
      </el-select>
      <!--    菜单    -->
      <div class="tsgz-nav-menu-container">
        <el-menu
          ref="menuPart1"
          unique-opened
          mode="horizontal"
          :ellipsis="false"
          :default-active="active"
          class="el-menu-demo menu-part1">
          <div v-for="(value, key) in headerConfig" :key="key">
            <el-menu-item
              v-if="value !== undefined && value.show && value?.children.length === 0"
              :key="key"
              :index="value.index"
              :disabled="value.isDisabled"
              @click="routerSwitch(value, value.isPush)">
              <span style="margin-left: 10px">{{ $t(value.name) }}</span>
            </el-menu-item>
          </div>
        </el-menu>
      </div>
    </div>
    <!--    语种、设置菜单等    -->
    <div class="tsgz-slogan">
      <!--    需求反馈   -->
      <be-button
        custom-class="eagle-btn feedback-btn"
        prev-icon="iconFeedbackEagle"
        round="4"
        type="success"
        @click="openFeedBack"
        >{{ $t('lang.feedback.title') }}</be-button
      >
      <!--    设置菜单   -->
      <be-popover
        v-if="isLogin && headerConfigMore.length > 0"
        ref="popoverRouter"
        placement="bottom"
        trigger="click"
        custom-class="popover-router">
        <template #trigger>
          <be-icon icon="iconSetting" custom-class="setting"></be-icon>
        </template>
        <div
          v-for="item in headerConfigMore"
          :key="item.path + 'router'"
          class="popover-item popover-router-item"
          @click="routerSwitch(item, item.isPush)">
          <span>{{ $t(item.name) }}</span>
        </div>
      </be-popover>
      <!--    语种   -->
      <be-popover ref="popoverLang" placement="bottom" trigger="click" custom-class="popover-lang">
        <template #trigger>
          <div
            class="dropdown-link dropdown-lang"
            style="display: flex; align-items: center; margin: 0 18px">
            {{ computeLang }}
            <be-icon
              icon="under"
              style="margin-left: 5px"
              color="#777"
              custom-class="lang-under"></be-icon>
          </div>
        </template>
        <div
          :class="`${getStore('language') === 'zh_CN' ? 'active-dropdown' : ''} popover-item`"
          @click="changeLanguage('zh_CN')">
          中文
        </div>
        <div
          :class="`${getStore('language') === 'en_US' ? 'active-dropdown' : ''} popover-item`"
          @click="changeLanguage('en_US')">
          EN
        </div>
      </be-popover>
      <!--    登出   -->
      <be-popover v-if="isLogin" placement="bottom" trigger="click" custom-class="popover-logout">
        <template #trigger>
          <span class="dropdown-link">
            <div class="tsgz-user">{{ loginUser }}</div>
          </span>
        </template>
        <div class="popover-item" @click="routerSwitch('/logout')">
          {{ $t('lang.header.logout') }}
        </div>
      </be-popover>
      <!--    登陆   -->
      <be-button
        v-if="!isLogin"
        custom-class="eagle-btn sign-up-btn"
        round="4"
        type="success"
        @click="openLogin"
        >{{ $t('lang.loginConfig.login') }}</be-button
      >
    </div>
    <!--退出弹窗-->
    <MsgDialog
      :is-show="isLogout"
      :title="$t('lang.loginConfig.confirmLogout')"
      @confirm="confirm(true)"
      @close="confirm(false)">
    </MsgDialog>
    <!--登錄彈窗-->
    <login-dialog ref="loginDialog"></login-dialog>
    <!--需求反馈彈窗-->
    <feed-back ref="feedbackDialog"></feed-back>
  </div>
</template>

<script lang="ts">
  import { defineComponent, getCurrentInstance, nextTick, onMounted, ref, watch } from 'vue'
  import {
    clearSession,
    clearStore,
    getStore,
    setSession,
    setStore,
    removeStore,
  } from '../utils/common'
  import composition from '../utils/mixin/common-func'
  import { useStore } from 'vuex'
  import MsgDialog from './common-components/msg-dialog/msg-dialog.vue'
  import { BeIcon, BePopover, BeButton } from '../../public/be-ui/be-ui.es.js'
  import { useI18n } from 'vue-i18n'
  import { ILoginDialog, IOption, IPopover } from '../utils/types'
  import LoginDialog from '../views/pc/login/login-dialog.vue'
  import { getProjectListCurUser } from '../api/project-explorer'
  import { useEventBus } from '@vueuse/core'
  import { onBeforeRouteUpdate } from 'vue-router'
  import FeedBack from './feed-back.vue'
  /**
   * 头部菜单导航
   */
  export default defineComponent({
    name: 'TsgzNavMenu',
    components: {
      FeedBack,
      LoginDialog,
      MsgDialog,
      BeIcon,
      BePopover,
      BeButton,
    },
    setup() {
      const { routerPush, route, message } = composition()
      //是否登出
      const isLogout = ref<boolean>(false)
      //是否登陆
      const isLogin = ref<boolean>(false)
      /**
       * 登出方法
       * @param {String} command - 登出指令类型
       */
      const loginOut = (command = 'logout'): void => {
        // 退出登录
        if (command === 'logout') {
          isLogout.value = true
        }
      }

      /**
       * 退出调用方法
       */
      const confirm = (isConfirm: boolean | string): void => {
        if (isConfirm === true || isConfirm === 'true') {
          clearSession()
          clearStore()
          isLogin.value = false
          headerConfig.value = {
            JYFX: {
              icon: '',
              index: '0',
              name: 'lang.subNav.navName2',
              show: true,
              path: '/riskTrx/list',
              isPush: true,
              children: [],
              isDisabled: false,
            },
            RPIF: {
              icon: '',
              index: '1',
              name: 'lang.subNav.navName6',
              show: true,
              path: '/RiskPublicInformation',
              isPush: true,
              children: [],
              isDisabled: false,
            },
          }
          headerConfigMore.value = []
          setStore('language', locale.value)
        }
        isLogout.value = false
        routerPush('/riskTrx/list')
        setActiveNav()
      }
      const bus = useEventBus<string>('loginExpired')
      bus.on(confirm)

      const openLogin = (): void => {
        ;(instanceInner?.refs.loginDialog as ILoginDialog).showDialog = true
      }
      // 外部通知打開登錄窗口
      const busLogin = useEventBus<string>('openLogin')
      busLogin.on(() => {
        openLogin()
      })
      /**
       * 路由跳转方法
       * @param {any} router
       * @param {Boolean} isPush
       */
      const routerSwitch = (router: any, isPush: boolean): void => {
        ;(instanceInner?.refs.popoverRouter as IPopover)?.close()
        if (router === '/logout') {
          loginOut()
          return
        }
        if (!isPush || !router.path) {
          return
        }
        routerPush(router.path)
      }
      watch(route, () => {
        nextTick(() => {
          setActiveNav()
        })
      })
      const loginUser = ref<string>('')
      const busRouterInfo = useEventBus<string>('getRouterInfo')
      busRouterInfo.on(() => {
        initVar()
      })
      // 初始化方法
      const initVar = (): void => {
        isLogin.value = getStore('token') ? true : false
        const userInfo = JSON.parse(getStore('userInfo') as string)
        loginUser.value = userInfo ? userInfo.username.substring(0, 2) : ''
        computeLang.value = locale.value === 'en_US' ? 'EN' : '中文'
        nextTick(() => {
          if (loginUser.value) {
            getProjectUser()
            setSession('loginExpiredNum', 'false')
            setHeaderConfig()
          }
        })
      }
      onMounted(() => {
        initVar()
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
      const headerConfig = ref<any>({
        JYFX: {
          icon: '',
          index: '0',
          name: 'lang.subNav.navName2',
          show: true,
          path: '/riskTrx/list',
          isPush: true,
          children: [],
          isDisabled: false,
        },
        RPIF: {
          icon: '',
          index: '1',
          name: 'lang.subNav.navName6',
          show: true,
          path: '/RiskPublicInformation',
          isPush: true,
          children: [],
          isDisabled: false,
        },
      })
      const headerConfigMore = ref<any>([])
      const store = useStore()
      const initHeaderConfig = (): void => {
        headerConfigMore.value = []
        const menuConfig = store.state.routeConfig
        const iconList: Array<string> = [
          '-renwu',
          '-liulanqi',
          '-tiaochaquzheng',
          '-jiaoyifenxi',
          '-xitongpeizhi',
        ]
        menuConfig.forEach((val: any, index: number) => {
          if (val.perms === 'XMGL' || val.perms === 'TRXRESET') {
            headerConfigMore.value.push({
              index: (index + 1).toString(),
              name: val.meta.title,
              show: !val.hidden,
              path: val.path,
              isPush: true,
              children: [],
              isDisabled: false,
            })
            return
          }
          headerConfig.value[val.perms as string] = {
            icon: iconList[index],
            index: (index + 1).toString(),
            name: val.meta.title,
            show: !val.hidden,
            path: val.path,
            isPush: true,
            children: [],
            isDisabled: false,
          }
        })
        console.log(headerConfig)
      }
      /**
       * 设置激活菜单
       * 某些场景下，需要根据当前路由高亮显示激活的菜单
       * 这里就是根据路由进行了匹配进行激活高亮
       */
      const active = ref<string>('0')
      const setActiveNav = (): void => {
        active.value = ''
        // prettier-ignore
        const menuList: any = document.getElementsByClassName('el-menu-item')
        nextTick(() => {
          try {
            Object.keys(headerConfig.value).forEach(val => {
              if (
                route.path.indexOf(headerConfig.value[val].path) > -1 ||
                route.meta.title === headerConfig.value[val].name
              ) {
                active.value = `${parseInt(headerConfig.value[val].index)}`
                throw new Error('')
              }
              if (!headerConfig.value[val].path) {
                headerConfig.value[val].children.forEach((res: any) => {
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
      // prettier-ignore
      const setFocusStyle = (menuList: any): void => {
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

      // 语种切换
      const { locale } = useI18n()
      const instanceInner = getCurrentInstance()
      const busLanguage = useEventBus<string>('language')
      const changeLanguage = (data: string): void => {
        setStore('language', data)
        locale.value = data
        computeLang.value = locale.value === 'en_US' ? 'EN' : '中文'
        ;(instanceInner?.refs.popoverLang as IPopover).close()
        busLanguage.emit(locale.value)
      }
      const computeLang = ref<string>('EN')

      // 获取用户项目下拉列表
      const projectList = ref<Array<IOption>>([])
      const selectVal = ref<string>('')
      const getProjectUser = (): void => {
        getProjectListCurUser()
          .then(res => {
            if (!res) {
              return
            }
            let list = res.data
            list.map((val: any) => {
              val.project_id = val.project_id.toString()
            })
            projectList.value = list
            if (route.path === '/projectSearch/detail') {
              selectVal.value = getStore('curSelectProjId')!
            }
          })
          .catch(err => {
            message('error', err.message || err)
          })
      }

      // 路由不在項目態勢詳情也就清空選擇值
      onBeforeRouteUpdate(to => {
        if (to.path !== '/projectSearch/detail') {
          selectVal.value = ''
          removeStore('curSelectProjId')
        }
      })
      /**
       * 项目选择事件
       */
      const selectProjBus = useEventBus<string>('selectProjBus')
      const handleProjectSelect = (): void => {
        // 清空時
        if (selectVal.value === '') {
          removeStore('curSelectProjId')
          routerPush('/riskTrx/list')
          return
        }
        setStore('curSelectProjId', selectVal.value)
        routerPush('/projectSearch/detail', { id: selectVal.value })
        selectProjBus.emit(selectVal.value)
      }
      /**
       * 打开需求反馈
       */
      const openFeedBack = (): void => {
        ;(instanceInner?.refs.feedbackDialog as ILoginDialog).showDialog = true
      }
      return {
        openFeedBack,
        handleProjectSelect,
        getProjectUser,
        projectList,
        selectVal,
        headerConfigMore,
        loginUser,
        computeLang,
        isLogin,
        active,
        changeLanguage,
        getStore,
        headerConfig,
        routerSwitch,
        confirm,
        isLogout,
        openLogin,
      }
    },
  })
</script>

<style lang="scss">
  .tsgz-nav-menu .sign-up-btn {
    width: 90px;
    min-width: initial;
  }

  .tsgz-nav-menu .feedback-btn {
    width: 120px;
    min-width: initial;
  }

  .popover-logout,
  .popover-lang,
  .popover-router {
    .be-popover {
      z-index: 10;
    }

    .be-popover-body {
      padding: 0;

      .popover-item {
        min-width: 60px;
        height: 35px;
        line-height: 35px;
        cursor: pointer;

        &:hover {
          color: $mainColor3;
          background-color: $mainColor16;
        }
      }
    }

    .popover-router-item {
      span {
        margin: 0 10px;
      }
    }
  }

  .el-dropdown-menu__item_on {
    color: $mainColor3;
    background-color: $mainColor10;
  }

  .tsgz-nav-menu-container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 60px;
    overflow-x: hidden;
    overflow-y: auto;
    text-align: left;

    .nav-menu-icon {
      fill: $textColor8 !important;
    }
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
    box-shadow: 2px 0 6px 0 rgba(0, 21, 41, 0.12);

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

      .setting {
        margin-left: 10px;
        vertical-align: middle;
        cursor: pointer;

        .be-icon {
          fill: $textColor4;

          &:hover {
            fill: $mainColor3;
          }
        }
      }

      .dropdown-lang {
        display: flex;
        justify-content: center;
        width: 60px;
        height: 32px;
        background-color: $mainColor17;
      }

      .dropdown-link {
        font-size: 14px;
        color: $textColor4;
        cursor: pointer;

        .lang-under {
          .be-icon {
            width: 14px;
            height: 14px;
          }
        }
      }

      .tsgz-user {
        width: 28px;
        height: 28px;
        line-height: 28px;
        color: $mainColor7;
        text-align: center;
        background-color: $textColor4;
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
      width: 164px;
      height: 60px;
      margin: 0 30px;
      background-image: url('../assets/image/pc/logo-white.png');
      background-repeat: no-repeat;
      background-position-y: center;
    }

    .el-menu-item {
      margin-bottom: 0 !important;
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
      border: 0;

      .el-menu-item,
      .el-submenu__title {
        position: relative;
        height: 40px;
        margin-bottom: 10px;
        font-weight: bold;
        line-height: 40px;
        color: $textColor3;
        white-space: nowrap;
        list-style: none;
      }

      .el-submenu__title:hover,
      .el-menu-item:hover {
        font-weight: bold;
        color: $mainColor3;
        background-color: transparent;
      }
    }

    .menu-part1 {
      .el-menu-item.is-active,
      .el-menu-item:focus {
        font-weight: bold;
        color: $mainColor3;
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
<!--
<style scoped lang="scss">
@media screen and (min-width: 1536px) and (max-height: 880px) and (max-width: 1830px) {

}
</style>
<style lang="scss">
@media screen and (min-width: 1536px) and (max-height: 880px) and (max-width: 1830px) {

}
</style>
&lt;!&ndash;1080p的130% - 140%放大&ndash;&gt;
<style scoped lang="scss">
@media screen and (min-width: 1326px) and (max-height: 710px) and (max-width: 1478px) {

}
</style>
<style lang="scss">
@media screen and (min-width: 1326px) and (max-height: 710px) and (max-width: 1478px) {

}
</style>
&lt;!&ndash;1080p的145% - 150%放大&ndash;&gt;
<style scoped lang="scss">
@media screen and (min-width: 1280px) and (max-height: 638px) and (max-width: 1326px) {

}
</style>
<style lang="scss">
@media screen and (min-width: 1280px) and (max-height: 638px) and (max-width: 1326px) {

}
</style>-->
