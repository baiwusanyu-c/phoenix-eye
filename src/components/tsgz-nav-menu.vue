/* * @tsgz-nav-menu.vue * @deprecated 虚拟货币系统 - 左侧菜单导航 * @author czh * @update (czh
2021/8/2) */
<template>
  <div id="xnhb_nav_menu" class="tsgz-nav-menu">
    <div class="tsgz-nav-menu-body">
      <!--    logo    -->
      <div class="expend-logo" @click="routerPush('/ProjectSearch')">
        <img src="../assets/image/pc/logo.png" alt="Beosin-Eagle-Eye" />
      </div>
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
              <span class="nav-name">{{ $t(value.name) }}</span>
            </el-menu-item>
          </div>
        </el-menu>
      </div>
      <!--    语种、设置菜单等    -->
      <div class="tsgz-slogan">
        <remote-search
          custom-list-class="remote-search-custom-list"
          :remote-search="getProjectUser"
          select-clear
          @select="handleProjectSelect">
          <template #option="slotProps">
            <div class="remote-search-item">
              <el-avatar :size="32" :src="slotProps.item.logo_url" fit="cover">
                <img src="../assets/image/pc/empty-avt.png" />
              </el-avatar>
              <span class="item-project-name">
                {{ slotProps.item.project_name }}
                <span class="project-platform">
                  {{ platformToCurrency[slotProps.item.platform] }}
                </span>
              </span>
            </div>
            <!--            <project-name-cell
              :url="slotProps.item.logo_url"
              :name="slotProps.item.project_name"
              :is-ell="false">
            </project-name-cell>
            <span style="font-size: 14px; color: #7c9aaa; font-weight: bold">{{
              platformToCurrency[slotProps.item.platform]
            }}</span>-->
          </template>
          <template #listFooter>
            <div id="create_one_body" class="create-one--body">
              <span>{{ $t('lang.createProject.notFound') }}?</span>
              <div role="button" class="create-one eagle-btn" @click="busCreateProjectUser.emit()">
                {{ $t('lang.createProject.createOne') }}
              </div>
            </div>
          </template>
          <template #next>
            <div class="project-select-remote--btn">
              <be-icon icon="iconSearchEagle"></be-icon>
            </div>
          </template>
        </remote-search>
        <!--    需求反馈   -->
        <be-button
          custom-class="eagle-btn feedback-btn"
          round="4"
          type="success"
          @click="openRequestAudit"
          >{{ $t('lang.request.title') }}
        </be-button>

        <!--    语种   -->
        <!--      <be-popover ref="popoverLang" placement="bottom" trigger="click" custom-class="popover-lang">
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
                        </be-popover>-->
        <!--    登出   -->
        <div v-show="isLogin">
          <be-popover placement="bottom" trigger="click" custom-class="popover-logout">
            <template #trigger>
              <span class="dropdown-link">
                <div class="tsgz-user">{{ loginUser }}</div>
              </span>
            </template>
            <div class="popover-item" @click="routerSwitch('/logout')">
              {{ $t('lang.header.logout') }}
            </div>
          </be-popover>
        </div>
        <!--    设置菜单   -->
        <div v-show="isLogin && headerConfigMore.length > 0">
          <be-popover
            ref="popoverRouter"
            placement="bottom"
            trigger="click"
            custom-class="popover-router">
            <template #trigger>
              <be-icon icon="iconSetting" custom-class="setting" width="28" height="28"></be-icon>
            </template>
            <div
              v-for="item in headerConfigMore"
              :key="item.path + 'router'"
              :class="`popover-item popover-router-item ${
                item.index === active ? 'active-dropdown' : ''
              }`"
              @click="routerSwitch(item, item.isPush)">
              <span>{{ $t(item.name) }}</span>
            </div>
          </be-popover>
        </div>
        <!--    登陆   -->
        <div v-show="!isLogin">
          <be-button custom-class="login-btn" round="4" type="success" @click="openLogin"
            >{{ $t('lang.loginConfig.login') }}
          </be-button>
        </div>
        <div v-show="!isLogin">
          <be-button custom-class="sign-up-btn" round="4" type="success" @click="openRegistry"
            >{{ $t('lang.signUp') }}
          </be-button>
        </div>
      </div>
    </div>
  </div>
  <!--退出弹窗-->
  <MsgDialog
    :is-show="isLogout"
    :title="$t('lang.loginConfig.confirmLogout')"
    @confirm="confirm(true)"
    @close="confirm(false)">
  </MsgDialog>
  <!--登錄彈窗-->
  <login-dialog ref="loginDialog" type></login-dialog>
  <!--合约请求彈窗-->

  <request-audit ref="requestAudit"></request-audit>
  <!--项目创建弹窗-->
  <create-project
    ref="createDialog"
    style="text-align: initial"
    type="add"
    tab-type="usr"
    @on-close="handleClose">
  </create-project>
</template>

<script lang="ts">
  import { defineComponent, getCurrentInstance, nextTick, onMounted, ref, watch } from 'vue'
  import { useStore } from 'vuex'
  import { useI18n } from 'vue-i18n'
  import { useEventBus } from '@vueuse/core'
  import { onBeforeRouteUpdate } from 'vue-router'
  import { BeButton, BeIcon, BePopover } from '@eagle-eye/be-ui'
  import LoginDialog from '../views/pc/login/login-dialog.vue'
  import { getProjectListCurUser } from '../api/project-explorer'
  // @ts-ignore
  import composition from '../utils/mixin/common-func'
  import { clearSession, clearStore, getStore, setSession, setStore } from '../utils/common'
  import { publicHeaderConfig } from '../utils/header-config'
  import { WHITE_LIST } from '../router/router-dict'
  import compositionDialog from '../utils/mixin/dialog-func'
  import CreateProject from '../views/pc/manage/project-management/components/create-project.vue'
  import { platformToCurrency } from '../utils/platform-dict'
  import MsgDialog from './common-components/msg-dialog/msg-dialog.vue'
  import RequestAudit from './request-audit.vue'
  import type { ILoginDialog, IOption, IPopover } from '../utils/types'
  // 管理頁的相關頁面匹配標識
  // XMSS: Project Explorer
  // XMGL: Project Management
  // DZJK: Address Monitor
  // YYTJ: 'Operational Statistics
  // EYWZGL: Malicious Website
  // AQSJ: Security Incident,
  // FXJY:Risk Tx
  // FXGGYQ:Risk Public Information
  const MANAGEMENT_DICT = {
    XMGL: true,
    TRXRESET: true,
    YYTJ: true,
    EYWZGL: true,
    AQSJ: true,
  }
  /**
   * 头部菜单导航
   */
  export default defineComponent({
    name: 'TsgzNavMenu',
    components: {
      RequestAudit,
      CreateProject,
      LoginDialog,
      MsgDialog,
      BeIcon,
      BePopover,
      BeButton,
    },
    setup() {
      const { routerPush, route, message } = composition()

      /****************************** 登出相关 ******************************/
      //是否登出
      const isLogout = ref<boolean>(false)
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
      const isLogoutBus = useEventBus<string>('isLogout')
      const confirm = (isConfirm: boolean | string): void => {
        if (isConfirm === true || isConfirm === 'true') {
          isLogin.value = false
          headerConfig.value = { ...publicHeaderConfig }
          headerConfigMore.value = []
          clearSession()
          clearStore()
          setStore('language', locale.value)
          // // 在白名单内的页面，刷新页面来重置权限菜单等
          nextTick(() => {
            if (WHITE_LIST.indexOf(route.path) < 0) {
              window.location.href = '/ProjectSearch'
            }
          })
        }
        isLogoutBus.emit()
        isLogout.value = false
      }
      // 初始化 登录过期bus，登录过期 就调用登出方法
      const bus = useEventBus<string>('loginExpired')
      bus.on(confirm)
      /****************************** 登录相关 ******************************/
      //是否登陆
      const isLogin = ref<boolean>(false)
      const openLogin = (): void => {
        ;(instanceInner?.refs.loginDialog as ILoginDialog).loginType = 'login'
        ;(instanceInner?.refs.loginDialog as ILoginDialog).showDialog = true
      }
      const openRegistry = (): void => {
        ;(instanceInner?.refs.loginDialog as ILoginDialog).loginType = 'register'
        ;(instanceInner?.refs.loginDialog as ILoginDialog).showDialog = true
      }
      // 外部通知打開登錄窗口
      const busLogin = useEventBus<string>('openLogin')
      busLogin.on(() => {
        openLogin()
      })
      /****************************** 路由跳转相关 ******************************/
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
      /****************************** 菜单初始化相关 ******************************/
      const loginUser = ref<string>('')
      // 初始化 路由信息 bus，接口拿到路由信息就初始化相关配置
      const busRouterInfo = useEventBus<string>('getRouterInfo')
      busRouterInfo.on(() => {
        initVar()
      })
      const reInit = useEventBus<string>('reInit')
      reInit.on(() => {
        initVar()
      })
      // 初始化方法
      const initVar = (): void => {
        isLogin.value = !!getStore('token')
        const userInfo = JSON.parse(getStore('userInfo') as string)
        loginUser.value = userInfo ? userInfo.username.substring(0, 2) : ''
        computeLang.value = locale.value === 'en_US' ? 'EN' : '中文'
        nextTick(() => {
          if (loginUser.value) {
            setSession('loginExpiredNum', 'false')
            // 登錄了 才根據路由接口設置header
            initHeaderConfig()
          }
          // 設置高亮
          setActiveNav()
        })
      }
      onMounted(() => {
        initVar()
      })

      /**
       * 初始化菜单配置
       */
      const headerConfig = ref<any>({ ...publicHeaderConfig })
      const headerConfigMore = ref<any>([])
      const store = useStore()
      const initHeaderConfig = (): void => {
        headerConfigMore.value = []
        const menuConfig = store.state.routeConfig
        menuConfig.forEach((val: any, index: number) => {
          if (MANAGEMENT_DICT[val.perms as keyof typeof MANAGEMENT_DICT]) {
            headerConfigMore.value.push({
              index: (index + 4).toString(),
              name: val.meta.title,
              show: !val.hidden,
              path: val.path,
              isPush: true,
              children: [],
              isDisabled: false,
            })
            return
          }
          const menu = ref<any>({
            index: (index + 3).toString(),
            name: val.meta.title,
            show: !val.hidden,
            path: val.path,
            isPush: true,
            children: [],
            isDisabled: false,
          })
          headerConfig.value[val.perms as string] = menu
        })
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
            // 匹配设置内的菜单
            if (active.value === '') {
              matchMenu()
            }
          } catch (e) {
            setFocusStyle(menuList)
          }
        })
      }
      const matchMenu = (): void => {
        Object.keys(headerConfigMore.value).forEach(val => {
          if (
            route.path.indexOf(headerConfigMore.value[val].path) > -1 ||
            route.meta.title === headerConfigMore.value[val].name
          ) {
            active.value = `${parseInt(headerConfigMore.value[val].index)}`
            throw new Error('')
          }
        })
      }
      // prettier-ignore
      const setFocusStyle = (menuList: any): void => {
            // 激活元素设置聚焦 规避bug 3825
            nextTick(() => {
                for (let i = 0; i < menuList.length; i++) {
                    const elm = menuList[Number(i)] as HTMLElement
                    if (elm.className.indexOf('is-active') > -1) {
                        elm.focus()
                    }
                }
            })
        }
      /****************************** 语种切换相关 ******************************/
      // 语种切换
      const { locale } = useI18n()
      const instanceInner = getCurrentInstance()
      const busLanguage = useEventBus<string>('language')
      const computeLang = ref<string>('EN')
      const changeLanguage = (data: string): void => {
        setStore('language', data)
        locale.value = data
        computeLang.value = locale.value === 'en_US' ? 'EN' : '中文'
        ;(instanceInner?.refs.popoverLang as IPopover).close()
        busLanguage.emit(locale.value)
      }
      /****************************** 项目选择相关 ******************************/
      // 获取用户项目下拉列表
      const projectList = ref<Array<IOption>>([])
      const selectVal = ref<string>('')
      const getProjectUser = (params: string, cb: Function): void => {
        getProjectListCurUser({ param: params })
          .then(res => {
            if (!res.data) {
              projectList.value = []
            } else {
              res.data.forEach((val: any) => {
                val.project_id = val.project_id.toString()
              })
              projectList.value = res.data
            }
            cb(projectList.value)
          })
          .catch(err => {
            cb([])
            message('error', err.message || err)
          })
      }

      // 路由不在項目態勢詳情也就清空選擇值
      onBeforeRouteUpdate(to => {
        if (to.path !== '/detail') {
          selectVal.value = ''
        }
      })
      /**
       * 项目选择事件
       */
      const selectProjBus = useEventBus<string>('selectProjBus')
      const handleProjectSelect = (data: IOption): void => {
        window.scrollTo(0, 0)
        nextTick(() => {
          const mainBody: HTMLElement | null = document.getElementById('main_body')
          mainBody && mainBody.scrollTo(0, 0)
        })
        routerPush('/detail', { id: data.project_id })
        selectProjBus.emit(data.project_id)
      }
      /**
       * 打开需求反馈
       */
      const busRequestAudit = useEventBus<string>('openRequestAudit')
      const openRequestAudit = (): void => {
        ;(instanceInner?.refs.requestAudit as ILoginDialog).showDialog = true
      }
      busRequestAudit.on(openRequestAudit)
      /**
       * 打开用户创建项目
       */
      const { createDialog, openDialog } = compositionDialog()
      const busCreateProjectUser = useEventBus<string>('openCreateProjectUser')
      busCreateProjectUser.on(() => {
        routerPush(route.path, { create: 'project' })
        openDialog('add')
      })
      const handleClose = (): void => {
        routerPush(route.path)
      }
      const searchParamsInput = ref<string>('')
      return {
        handleClose,
        searchParamsInput,
        openDialog,
        busCreateProjectUser,
        createDialog,
        getProjectUser,
        openRequestAudit,
        routerPush,
        handleProjectSelect,
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
        openRegistry,
        platformToCurrency,
      }
    },
  })
</script>

<style lang="scss">
  .remote-search-custom-list {
    overflow-x: hidden;
    .remote-search-list--item {
      height: auto;
      min-height: 48px;
    }
  }
  .nav-name {
    margin-left: 10px;
    font-size: 16px;
  }
  .remote-search-item {
    width: 250px;
    display: flex;
    align-items: center;
    .el-avatar {
      width: 32px;
      height: 32px;
    }
    .item-project-name {
      width: 218px;
      line-height: 20px;
      text-align: left;
      margin-left: 4px;
      font-weight: bold;
      font-size: 14px;
      color: $textColor3;
      font-family: 'Barlow', sans-serif;
      margin-right: 6px;
      .project-platform {
        font-size: 14px;
        color: #7c9aaa;
        font-weight: bold;
      }
    }
  }
  /* #xnhb_nav_menu .project-select-remote {
    height: 40px;
    .el-input.is-focus .el-input__wrapper {
      box-shadow: none !important;
    }
    .el-input__wrapper.is-focus {
      box-shadow: none !important;
    }
    .el-input__wrapper {
      background: $mainColor1;
      box-shadow: none;
      .el-input__inner {
        color: $mainColor7;
        height: 40px;
        line-height: 40px;
      }
    }

    width: 200px;
  }*/
  .project-select-remote--btn {
    background-color: $mainColor3;
    height: 40px;
    line-height: 40px;
    width: 56px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0 4px 4px 0;
  }
  .project-select {
    /*max-width: 214px;*/
    background: $mainColor7;
    .el-select-dropdown__item {
      height: 48px;
      line-height: 48px;
    }

    .project-select--option {
      display: flex;
      align-items: center;
      height: 48px;
      line-height: 48px;
      .ellipsis-copy {
        min-width: 200px !important;
      }
      .project-select--platform {
        font-weight: bold;
        color: $textColor13;
        line-height: 17px;
        margin-left: 4px;
      }
    }
  }

  .create-one--body {
    border-radius: 4px;
    width: 100%;
    background-color: $mainColor2;
    display: flex;
    height: 48px;
    padding: 15px 24px;
    align-items: center;
    justify-content: space-between;
    span {
      font-family: 'Barlow', sans-serif;
      font-weight: 400;
      color: $textColor3;
      line-height: 17px;
      font-size: 14px;
    }
    .create-one {
      color: $mainColor7;
      min-width: 86px;
      border-radius: 4px;
      height: 24px;
      line-height: 24px;
      margin-left: 6px;
      font-family: 'Barlow', sans-serif;
      font-weight: bold;
      cursor: pointer;
    }
  }

  .tsgz-nav-menu .sign-up-btn {
    width: 92px;
    min-width: initial;
    background-color: #162e47;
    height: 40px;
    .be-button--slot {
      font-size: 14px;
      margin: 0;
    }
  }
  .tsgz-nav-menu .login-btn {
    width: 90px;
    min-width: initial;
    background-color: transparent;
    height: 40px;
    .be-button--slot {
      font-size: 14px;
      font-weight: normal !important;
      margin: 0;
      color: $mainColor7;
    }
    &:hover {
      .be-button--slot {
        color: $textColor13;
      }
    }
  }
  .tsgz-nav-menu .feedback-btn {
    width: 125px;
    height: 40px;
    min-width: initial;
    margin-right: 20px;

    .be-button--slot {
      font-size: 14px;
      margin: 0;
    }
  }

  .popover-logout,
  .popover-lang,
  .popover-router {
    .be-popover {
      z-index: 10;
    }

    .be-popover--body {
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
    overflow-x: hidden;
    overflow-y: auto;
    text-align: center;
    background-color: $mainColor20;
    box-shadow: 2px 0 6px 0 rgba(0, 21, 41, 0.12);
    height: 68px;
    .tsgz-nav-menu-body {
      margin: 0 auto;
      width: 1300px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 68px;
    }
    .tsgz-slogan {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-end;
      height: 100%;
      background-repeat: no-repeat;
      background-position: right;
      background-size: 100% 100%;
      .remote-search-input {
        background: $mainColor1;
        border: none;
        width: 240px;
        margin-right: 20px;
        .be-input__inner {
          background: $mainColor1;
          color: $mainColor7;
        }
      }

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
        color: $textColor3;
        text-align: center;
        background-color: $mainColor21;
        border-radius: 30px;
      }

      h3 {
        margin: 0 10px;
        font-family: 'Barlow', sans-serif;
        font-size: 20px;
        font-weight: 500;
        color: $textColor4;
      }
    }

    .expend-logo {
      width: 160px;
      height: 60px;
      line-height: 52px;
      cursor: pointer;
      img {
        display: inline;
      }

      span {
        font-family: 'Barlow', sans-serif;
        color: $mainColor7;
        font-size: 24px;
        font-weight: bold;
        line-height: 29px;
        margin-left: 8px;
        vertical-align: middle;
      }
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

      .el-menu-item {
        padding: 0 8px;
      }

      .el-menu-item,
      .el-submenu__title {
        position: relative;
        height: 40px;
        margin-bottom: 10px;
        font-weight: bold;
        line-height: 40px;
        color: $mainColor7;
        white-space: nowrap;
        list-style: none;

        span {
          font-family: 'Barlow', sans-serif;
        }
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

  /* 150% 适配 */
  @media screen and (max-width: 1326px) {
    .tsgz-nav-menu .tsgz-nav-menu-body {
      width: 1160px;
    }
    .tsgz-nav-menu {
      padding: 0 2%;
    }
    .tsgz-nav-menu .feedback-btn {
      width: 108px;
      .be-button--slot {
        font-size: 12px;
      }
    }
    .tsgz-nav-menu .nav-name {
      margin-left: 4px;
      font-size: 12px;
    }
    .tsgz-nav-menu .remote-search-input {
      width: 160px;
    }
    .tsgz-nav-menu .el-input__inner {
      width: 120px;
    }
    .tsgz-nav-menu .el-menu-item {
      padding: 0 5px;
      font-size: 12px;
    }
  }
  /*
  !* 125% 适配 *!
  @media screen and (min-width: 1328px) and (max-width: 1538px) {
    .tsgz-nav-menu {
      padding: 0 10%;
    }

    .tsgz-nav-menu .el-input__inner {
      width: 160px;
    }
    !*.project-select{
          width: 160px;
      }*!
    .tsgz-nav-menu .el-menu-item {
      padding: 0 10px;
    }
  }*/
</style>
