/* * @project-search-main.vue * @deprecated 项目搜索 * @author czh * @update (czh 2022/2/22) */
<template>
  <div class="project-search-main eagle-page">
    <div class="project-base--container">
      <h1>
        <span>{{ $t('lang.projectExplorer.base.title2') }}</span>
        {{ $t('lang.projectExplorer.base.title') }}
      </h1>
      <p>{{ $t('lang.projectExplorer.base.subTitle') }}</p>
      <div class="project-base-body">
        <div class="project-base-item">
          <p>{{ $t('lang.projectExplorer.base.item1') }}</p>
          <el-tooltip :content="baseInfo.market_cap_total" placement="top" effect="light">
            <span>{{
              isEmpty(baseInfo.market_cap_total, '/') === '/'
                ? '/'
                : `$${marketCapBaseInfo(baseInfo.market_cap_total)}`
            }}</span>
          </el-tooltip>
        </div>
        <div class="project-base-item">
          <p>{{ $t('lang.projectExplorer.base.item2') }}</p>
          <span>{{
            isEmpty(baseInfo.project_total, '/') === '/' ? '/' : `${baseInfo.project_total}`
          }}</span>
        </div>
        <div class="project-base-item">
          <p>{{ $t('lang.projectExplorer.base.item3') }}</p>
          <be-icon
            :herf="webURL.chains_eth"
            role="link"
            width="24"
            height="24"
            icon="iconEthEagleG"
            @click="openWindow(webURL.chains_eth)"></be-icon>
          <be-icon
            :herf="webURL.chains_bsc"
            role="link"
            width="24"
            height="24"
            icon="iconBnbEagleG"
            @click="openWindow(webURL.chains_bsc)"></be-icon>
          <be-icon
            :herf="webURL.chains_heco"
            role="link"
            width="24"
            height="24"
            icon="iconHecoEagleG"
            @click="openWindow(webURL.chains_heco)"></be-icon>
          <be-icon
            :herf="webURL.chains_polygon"
            role="link"
            width="24"
            height="24"
            icon="iconPolygonEagleG"
            @click="openWindow(webURL.chains_polygon)"></be-icon>
        </div>
      </div>
    </div>
    <div class="project-alert--container project-explorer--container">
      <div class="alert-hot">
        <div class="alert">
          <div class="risk-alert">
            <div class="project-alert--title">
              <title-cell :url="alert" :name="$t('lang.projectExplorer.alert.title')"> </title-cell>
              <be-button
                custom-class="eagle-btn more-alert-btn"
                round="4"
                type="success"
                @click="openWindow(webURL.twitter_alert)">
                {{ $t('lang.projectExplorer.alert.more') }}
              </be-button>
            </div>
            <risk-alert-item
              v-if="riskAlertList.length > 0"
              :data-list="riskAlertList"></risk-alert-item>
            <empty-data v-if="riskAlertList.length === 0" content="lang.noRisk"> </empty-data>
          </div>
          <div class="hot-project">
            <div class="project-alert--title">
              <title-cell :url="hot" :name="$t('lang.projectExplorer.alert.title2')"> </title-cell>
            </div>
            <hot-project-item
              v-if="hotProjectList.length > 0"
              :data-list="hotProjectList"></hot-project-item>
            <empty-data v-if="hotProjectList.length === 0" content="lang.noRisk"> </empty-data>
          </div>
        </div>
        <project-explorer></project-explorer>
      </div>

      <div class="get-plugin">
        <div class="plugin">
          <img
            alt=""
            src="../../../assets/image/pc/plugin-logo.png"
            style="width: 48px; height: 48px" />
          <p>
            {{ $t('lang.projectExplorer.alert.plugin') }}
          </p>
          <be-button
            custom-class="eagle-btn install-btn"
            round="4"
            type="success"
            @click="openWindow(webURL.plugin_link)">
            <img src="../../../assets/image/pc/download-mini.png" alt="" />
            {{ $t('lang.projectExplorer.alert.install') }}
          </be-button>
        </div>
        <div class="computer">
          <h1>{{ $t('lang.projectExplorer.alert.quesTitle2') }}</h1>
          <be-button
            custom-class="eagle-btn request-btn"
            round="4"
            type="success"
            @click="openRequestAudit">
            <img src="../../../assets/image/pc/request-q.png" alt="" />
            {{ $t('lang.projectExplorer.alert.quoteBtn') }}
          </be-button>
          <img alt="" src="../../../assets/image/pc/computer.png" class="computer-bg" />
        </div>
        <div class="question">
          <h1>{{ $t('lang.projectExplorer.alert.quesTitle3') }}</h1>
          <div style="display: flex">
            <img
              role="link"
              alt=""
              src="../../../assets/image/pc/telegram.png"
              style="width: 36px; height: 36px; margin-top: 20px; cursor: pointer"
              @click="openWindow(webURL.contact_telegram)" />
            <img
              role="link"
              alt=""
              src="../../../assets/image/pc/discord.png"
              style="
                margin-left: 10px;
                width: 36px;
                height: 36px;
                margin-top: 20px;
                cursor: pointer;
              "
              @click="openWindow(webURL.contact_discord)" />
          </div>
          <img
            alt=""
            src="../../../assets/image/pc/questions-bg.png"
            style="position: absolute; right: 0; bottom: 0" />
        </div>
        <div class="project-explorer--guard">
          <div class="project-explorer--guard--title">
            <title-cell
              :name="$t('lang.projectExplorer.exp.addTitle')"
              :size="24"
              :font-size="18"
              svg
              icon="iconAddProjEagle">
            </title-cell>
          </div>
          <empty-data v-if="guardProjectList.length === 0"></empty-data>
          <div
            v-for="item in guardProjectList"
            :key="item.create_time + item.logo_url"
            class="project-explorer--guard--proj"
            @click="routerSwitch(item.project_id)">
            <project-name-cell
              :name="item.project_name"
              :url="item.logo_url"
              is-fixed-width
              :size="24"
              :font-len="17"
              width="140"
              :ellipsis-len="20"
              :font-size="12">
            </project-name-cell>
            <p class="date">{{ formatDate(createDate(item.create_time), 'Y-m-d') }}</p>
          </div>
        </div>
      </div>
    </div>
    <div v-show="showSecurityList" class="project-risk--container">
      <div class="project-risk--search">
        <title-cell :name="$t('lang.projectExplorer.security.title')" svg icon="iconSecurityEagle">
        </title-cell>
      </div>
      <security-list @show="handleShowSecurityList"></security-list>
    </div>
    <contact-bar></contact-bar>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, nextTick, ref } from 'vue'
  import { useEventBus } from '@vueuse/core'
  import { BeButton, BeIcon } from '@eagle-eye/be-ui'
  import composition from '../../../utils/mixin/common-func'
  import { getExploreInfo, getProjectListUser } from '../../../api/project-explorer'
  import {
    catchErr,
    createDate,
    formatDate,
    getUrlkey,
    nFormats,
    openWindow,
  } from '../../../utils/common'
  // @ts-ignore
  import TitleCell from '../../../components/common-components/title-cell/title-cell.vue'
  import EmptyData from '../../../components/common-components/empty-data/empty-data.vue'
  import ProjectNameCell from '../../../components/common-components/project-name-cell/project-name-cell.vue'
  import hot from '../../../assets/image/pc/hot.png'
  import alert from '../../../assets/image/pc/alert.png'
  import ContactBar from '../../../components/common-components/contact-bar/contact-bar.vue'
  import { webURL } from '../../../enums/link'
  import ProjectExplorer from './components/project-explorer.vue'
  import RiskAlertItem from './components/risk-alert-item.vue'
  import HotProjectItem from './components/hot-project-item.vue'
  import SecurityList from './components/security-list.vue'
  import type { IExploreInfo, IGuardProjectList, IHotProjectList } from '../../../utils/types'
  import type { IAxiosRes } from '../../../utils/request'

  import type { IProjParam } from '../../../api/project-explorer'
  declare type projListType = {
    project_id: string
    project_name: string
  }

  export default defineComponent({
    name: 'ProjectSearchMain',
    components: {
      ContactBar,
      SecurityList,
      ProjectNameCell,
      HotProjectItem,
      RiskAlertItem,
      EmptyData,
      ProjectExplorer,

      TitleCell,

      BeIcon,
      BeButton,
    },
    setup() {
      const { message, routerPush, isEmpty } = composition()

      /**
       * 获取项目列表
       */
      // 搜索参数
      const searchParams = ref<string>('')
      const handleSearch = (data: string): void => {
        searchParams.value = data
        nextTick(() => {
          getList()
        })
      }
      // loading
      const loading = ref<boolean>(false)
      /**
       * 获取项目列表
       * 重置：清空所有条件进行搜索
       * 翻页：带上所有现有条件搜索
       * 排序：只清空翻页搜索
       * 搜索：只清空翻页参数、排序参数，保留搜索参数，搜索
       */
      const projectList = ref<Array<projListType>>([])
      const getList = () => {
        loading.value = true
        const params: IProjParam = {
          param: searchParams.value,
        }
        getProjectListUser(params)
          .then((res: any) => {
            if (!res) {
              return
            }
            if (res && res.data) {
              projectList.value = res.data
              // 大于一条则显示列表
              // 等于一条则直接跳转到项目态势详情
              if (projectList.value.length === 1) {
                routerSwitch(projectList.value[0].project_id)
              }
            } else {
              message('warning', res.message || res)
            }
            loading.value = false
          })
          .catch(err => {
            message('error', err.message || err)
            console.error(err)
            loading.value = false
          })
      }
      /**
       * 路由跳轉
       */
      const routerSwitch = (id: string): void => {
        routerPush('/detail', { id })
      }
      const handleDefaultSearch = (params: string): void => {
        searchParams.value = params
        getList()
      }

      const busCreateProjectUser = useEventBus<string>('openCreateProjectUser')
      const ProjIdByEmail = ref<number>(-1)
      const initPage = (): void => {
        const urlParams = getUrlkey()
        // 来自email 打开 且有登录
        if (urlParams.from === 'email' && urlParams.id) {
          ProjIdByEmail.value = urlParams.id
          // 直接去态势详情页面
          routerSwitch(ProjIdByEmail.value.toString())
        }
        // 从 create/form 重定向到首页，打开项目创建弹窗
        if (urlParams.create === 'project') {
          busCreateProjectUser.emit()
        }
      }
      const showSecurityList = ref<boolean>(true)
      const handleShowSecurityList = (data: boolean) => {
        showSecurityList.value = data
      }
      // 打开审计请求弹窗
      const busRequestAudit = useEventBus<string>('openRequestAudit')
      const openRequestAudit = (): void => {
        busRequestAudit.emit()
      }
      /******************************* 基本信息、热门项目、风险警告 ***********************************/
      const baseInfo = ref<IExploreInfo>({
        market_cap_total: 0,
        project_total: 0,
      })
      const guardProjectList = ref<Array<IGuardProjectList>>([])
      const riskAlertList = ref<Array<string>>([])
      const hotProjectList = ref<Array<IHotProjectList>>([])
      const getInfoData = (): void => {
        getExploreInfo()
          .then((res: IAxiosRes) => {
            if (res && res.success) {
              // 基本信息
              baseInfo.value.market_cap_total = res.data.market_cap_total
              baseInfo.value.project_total = res.data.project_total
              // New Project Added
              guardProjectList.value = res.data.guard_project_list
              // 风险警告
              riskAlertList.value = res.data.risk_alert_list
              // 热门项目
              hotProjectList.value = res.data.hot_project_list
              hotProjectList.value.forEach((val, index) => {
                val.index = index + 1 < 10 ? `0${index + 1}` : `${index + 1}`
              })
            } else {
              catchErr(res)
            }
          })
          .catch(catchErr)
      }
      const marketCapBaseInfo = computed(() => {
        return function (val: number) {
          return nFormats(val)
        }
      })
      initPage()
      getInfoData()
      return {
        showSecurityList,
        handleShowSecurityList,
        isEmpty,
        handleSearch,
        handleDefaultSearch,
        routerSwitch,
        projectList,
        searchParams,
        getList,
        nFormats,
        baseInfo,
        guardProjectList,
        createDate,
        formatDate,
        marketCapBaseInfo,
        riskAlertList,
        hotProjectList,
        hot,
        alert,
        openWindow,
        webURL,
        openRequestAudit,
      }
    },
  })
</script>

<style lang="scss">
  .project-search-main {
    min-height: calc(100% - 100px);
  }

  .project-base--container {
    height: 280px;
    background-image: url('../../../assets/image/pc/bg-base-info.png');
    background-repeat: round;
    border-radius: 4px;
    @include common-container(32px);
    padding: 40px 60px;
    box-sizing: border-box;

    h1 {
      font-size: 48px;
      font-family: 'Barlow', sans-serif;
      font-weight: bold;
      color: $mainColor7;
      line-height: 58px;

      span {
        color: $mainColor3;
      }
    }

    p {
      font-size: 24px;
      font-family: 'Barlow', sans-serif;
      font-weight: 400;
      color: $textColor13;
      line-height: 30px;
      margin-top: 10px;
    }

    .project-base-body {
      margin-top: 34px;
      display: grid;
      grid-template-columns: 200px 200px 200px;
      grid-gap: 20px;

      .project-base-item {
        p {
          font-size: 16px;
          line-height: 20px;
        }

        span {
          font-size: 28px;
          font-family: 'Barlow', sans-serif;
          font-weight: bold;
          color: $mainColor3;
          line-height: 34px;
          margin-top: 6px;
          display: inline-block;
        }

        .be-icon--container {
          margin-top: 12px;
          margin-right: 8px;
          cursor: pointer;
        }
      }
    }
  }

  .project-alert--container {
    @include common-container(32px);
    display: flex;
    .alert-hot {
      width: calc(75% - 20px);
      margin-right: 20px;
      .alert {
        display: flex;
        margin-bottom: 20px;
      }
    }
    .risk-alert {
      flex: 1;
      height: 492px;
      background-color: $mainColor7;
      border-radius: 4px;
      padding: 24px 20px;
      box-sizing: border-box;
      position: relative;
      left: 0;
      top: 0;
    }

    .hot-project {
      flex: 1;
      background-color: $mainColor7;
      height: 492px;
      border-radius: 4px;
      margin-left: 20px;
      padding: 24px 20px;
      box-sizing: border-box;
      position: relative;
      left: 0;
      top: 0;
    }

    .project-alert--title {
      border-radius: 4px;
      background-color: $mainColor22;
      height: 68px;
      padding: 16px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      .more-alert-btn {
        height: 36px;
        color: $mainColor7;
      }
    }

    .get-plugin {
      width: calc(28% - 40px);
      height: 100%;

      .plugin {
        padding: 28px;
        box-sizing: border-box;
        border-radius: 4px;
        height: calc(60% - 20px);
        margin-bottom: 20px;
        background-image: url('../../../assets/image/pc/bg-plugin.png');
        background-repeat: round;
        text-align: left;
        p {
          font-size: 26px;
          font-family: 'Barlow', sans-serif;
          font-weight: bold;
          color: $mainColor7;
          line-height: 34px;
          margin-top: 20px;
          margin-bottom: 44px;
        }

        .install-btn {
          height: 36px;
          .be-button--slot {
            display: flex;
            align-items: center;
            line-height: 14px;
            font-size: 12px;
            img {
              height: 16px;
              margin-right: 4px;
            }
          }
        }
      }
      .computer {
        padding: 28px;
        box-sizing: border-box;
        border-radius: 4px;
        background: $mainColor3;
        height: 40%;
        position: relative;
        left: 0;
        top: 0;
        margin-bottom: 20px;
        text-align: left;
        h1 {
          font-size: 22px;
          font-family: 'Barlow', sans-serif;
          font-weight: bold;
          color: $textColor3;
          line-height: 28px;
          position: relative;
          left: 0;
          top: 0;
          z-index: 1;
        }
        .computer-bg {
          position: absolute;
          right: 0;
          bottom: 8px;
          width: 50%;
        }
        .request-btn {
          height: 36px;
          background: $mainColor7;
          margin-top: 20px;
          font-size: 14px;
          .be-button--slot {
            display: flex;
            align-items: center;
            font-size: 12px;
            img {
              height: 16px;
              margin-right: 4px;
            }
          }
        }
      }
      .question {
        padding: 28px;
        box-sizing: border-box;
        border-radius: 4px;
        background: linear-gradient(360deg, #e3f8fa 0%, #c8e3e9 100%);
        height: 40%;
        position: relative;
        left: 0;
        top: 0;
        margin-bottom: 20px;
        text-align: left;
        h1 {
          font-size: 22px;
          font-family: 'Barlow', sans-serif;
          font-weight: bold;
          color: $textColor3;
          line-height: 28px;
          position: relative;
          left: 0;
          top: 0;
          z-index: 1;
        }

        p {
          font-size: 14px;
          font-family: 'Barlow', sans-serif;
          font-weight: 400;
          color: $textColor3;
          line-height: 30px;
          margin-bottom: 28px;
          position: relative;
          left: 0;
          top: 0;
          z-index: 1;
        }
      }
    }
  }

  .project-explorer--container {
    text-align: center;
    display: flex;
    .project-explorer-tb--body {
      .project-explorer-tb--search {
        height: 46px;
        justify-content: space-between;
        display: flex;
        align-items: center;
        padding-left: 20px;
      }

      .project-explorer--table {
        background-color: $mainColor7;
      }
    }

    .project-explorer--guard {
      background-color: $mainColor7;
      border-radius: 4px;
      padding: 20px 16px;
      box-sizing: border-box;
      height: fit-content;

      .project-explorer--guard--title {
        border-radius: 4px;
        background-color: $mainColor22;
        height: 40px;
        display: flex;
        align-items: center;
        padding: 8px 12px;
        margin-bottom: 10px;
      }

      .project-explorer--guard--proj {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 32px;
        border-radius: 4px;
        padding: 4px 8px;
        margin-top: 20px;
        cursor: pointer;

        &:hover {
          background-color: $mainColor22;
        }

        .date {
          font-size: 14px;
          font-family: 'Barlow', sans-serif;
          font-weight: 400;
          color: $textColor3;
          line-height: 14px;
        }
      }
    }
  }
  /* 移动端预留 适配 */
  @media screen and (max-width: 1280px) {
    .project-search-main .project-base--container,
    .project-search-main .project-alert--container,
    .project-search-main .project-explorer--container {
      width: 92%;
    }
    .computer-bg {
      position: absolute;
      right: 0;
      bottom: 8px;
      width: 45%;
    }
    .project-explorer--container .project-explorer--guard .project-explorer--guard--proj {
      .date {
        font-size: 12px;
      }
    }
  }
  /* 150% 适配 */
  @media screen and (min-width: 1280px) and (max-width: 1326px) {
    .project-search-main .project-base--container,
    .project-search-main .project-alert--container,
    .project-search-main .project-explorer--container {
      width: 92%;
    }
    .computer-bg {
      position: absolute;
      right: 0;
      bottom: 8px;
      width: 45%;
    }
    .project-explorer--container .project-explorer--guard .project-explorer--guard--proj {
      .date {
        font-size: 12px;
      }
    }
  }
  /*
  !* 125% 适配 *!
  @media screen and (min-width: 1328px) and (max-width: 1538px) {
    .project-search-main .project-base--container,
    .project-search-main .project-alert--container,
    .project-search-main .project-explorer--container {
      width: 80%;
    }
  }
  !* 110% 适配 *!
  @media screen and (min-width: 1540px) and (max-width: 1750px) {
    .project-search-main .project-base--container,
    .project-search-main .project-alert--container,
    .project-search-main .project-explorer--container {
      width: 72%;
    }
  }*/
</style>
