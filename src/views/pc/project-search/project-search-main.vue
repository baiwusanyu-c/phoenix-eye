/* * @project-search-main.vue * @deprecated 项目搜索 * @author czh * @update (czh 2022/2/22) */
<template>
  <div class="project-search-main eagle-page">
    <div class="project-base--container">
      <h1>
        {{ $t('lang.projectExplorer.base.title') }}
        <span>{{ $t('lang.projectExplorer.base.title2') }}</span>
      </h1>
      <p>{{ $t('lang.projectExplorer.base.subTitle') }}</p>
      <div class="project-base-body">
        <div class="project-base-item">
          <p>{{ $t('lang.projectExplorer.base.item1') }}</p>
          <span>{{
            isEmpty(baseInfo.market_cap_total, '/') === '/'
              ? '/'
              : `$${marketCapBaseInfo(baseInfo.market_cap_total)}`
          }}</span>
        </div>
        <div class="project-base-item">
          <p>{{ $t('lang.projectExplorer.base.item2') }}</p>
          <span>{{
            isEmpty(baseInfo.project_total, '/') === '/'
              ? '/'
              : `${formatMoney(baseInfo.project_total)}`
          }}</span>
        </div>
        <div class="project-base-item">
          <p>{{ $t('lang.projectExplorer.base.item3') }}</p>
          <be-icon width="24" height="24" icon="iconHecoEagleG"></be-icon>
          <be-icon width="24" height="24" icon="iconBnbEagleG"></be-icon>
          <be-icon width="24" height="24" icon="iconEthEagleG"></be-icon>
          <be-icon width="24" height="24" icon="iconPolygonEagleG"></be-icon>
        </div>
      </div>
    </div>
    <div class="project-alert--container">
      <div class="risk-alert">
        <div class="project-alert--title">
          <title-cell :url="alert" :name="$t('lang.projectExplorer.alert.title')"> </title-cell>
          <be-button custom-class="eagle-btn more-alert-btn" round="4" type="success">
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

      <div class="get-plugin">
        <div class="plugin">
          <img
            alt=""
            src="../../../assets/image/pc/plugin-logo.png"
            style="width: 48px; height: 48px" />
          <p>
            {{ $t('lang.projectExplorer.alert.plugin') }}
          </p>
          <be-button custom-class="eagle-btn install-btn" round="4" type="success">
            {{ $t('lang.projectExplorer.alert.install') }}
          </be-button>
        </div>
        <div class="question">
          <h1>{{ $t('lang.projectExplorer.alert.quesTitle') }}</h1>
          <p>{{ $t('lang.projectExplorer.alert.quesTitle2') }}</p>
          <img
            alt=""
            src="../../../assets/image/pc/telegram.png"
            style="width: 36px; height: 36px" />
          <img
            alt=""
            src="../../../assets/image/pc/questions-bg.png"
            style="position: absolute; right: 0; bottom: 0" />
        </div>
      </div>
    </div>
    <div class="project-explorer--container">
      <project-explorer></project-explorer>
      <div class="project-explorer--guard">
        <div class="project-explorer--guard--title">
          <title-cell
            :name="$t('lang.projectExplorer.exp.addTitle')"
            :size="24"
            :font-size="18"
            :url="addProj">
          </title-cell>
        </div>
        <empty-data v-if="guardProjectList.length === 0"></empty-data>
        <div
          v-for="item in guardProjectList"
          :key="item.create_time + item.logo_url"
          class="project-explorer--guard--proj">
          <project-name-cell
            :name="item.project_name"
            :url="item.logo_url"
            :size="24"
            :font-size="12">
          </project-name-cell>
          <p class="date">{{ formatDate(createDate(item.create_time), 'Y-m-d') }}</p>
        </div>
      </div>
    </div>
    <div class="project-risk--container">
      <div class="project-risk--search">
        <title-cell :name="$t('lang.projectExplorer.security.title')" :url="security"> </title-cell>
      </div>
      <security-list></security-list>
    </div>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, nextTick, onMounted, ref } from 'vue'
  import composition from '../../../utils/mixin/common-func'
  import { getExploreInfo, getProjectListUser } from '../../../api/project-explorer'
  import {
    catchErr,
    createDate,
    formatDate,
    formatMoney,
    getUrlkey,
    nFormatter,
  } from '../../../utils/common'
  // @ts-ignore
  import { BeButton, BeIcon } from '../../../../public/be-ui/be-ui.es'
  import TitleCell from '../../../components/common-components/title-cell/title-cell.vue'
  import EmptyData from '../../../components/common-components/empty-data/empty-data.vue'
  import ProjectNameCell from '../../../components/common-components/project-name-cell/project-name-cell.vue'

  import security from '../../../assets/image/pc/security.png'
  import addProj from '../../../assets/image/pc/add-proj.png'
  import hot from '../../../assets/image/pc/hot.png'
  import alert from '../../../assets/image/pc/alert.png'
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
        routerPush('/projectSearch/detail', { id })
      }
      const handleDefaultSearch = (params: string): void => {
        searchParams.value = params
        getList()
      }

      const ProjIdByEmail = ref<number>(-1)
      const initPage = (): void => {
        const urlParams = getUrlkey()
        // 来自email 打开 且有登录
        if (urlParams.from === 'email' && urlParams.id) {
          ProjIdByEmail.value = urlParams.id
          // 直接去态势详情页面
          routerSwitch(ProjIdByEmail.value.toString())
        }
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
            if (res.success) {
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
          return formatMoney(val) + nFormatter(val, 0, true)
        }
      })
      onMounted(() => {
        initPage()
        getInfoData()
      })
      return {
        isEmpty,
        handleSearch,
        handleDefaultSearch,
        routerSwitch,
        projectList,
        searchParams,
        getList,
        formatMoney,
        baseInfo,
        guardProjectList,
        createDate,
        formatDate,
        marketCapBaseInfo,
        riskAlertList,
        hotProjectList,
        security,
        addProj,
        hot,
        alert,
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
    @include common-container(32px, 65.2%);
    padding: 40px 60px;
    box-sizing: border-box;

    h1 {
      font-size: 48px;
      font-family: BarlowSemi-B, sans-serif;
      font-weight: bold;
      color: $mainColor7;
      line-height: 58px;

      span {
        color: $mainColor3;
      }
    }

    p {
      font-size: 24px;
      font-family: BarlowSemi-R, sans-serif;
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
          font-family: BarlowSemi-B, sans-serif;
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
    @include common-container(32px, 65.2%);
    height: 500px;
    display: flex;

    .risk-alert {
      width: 36%;
      height: 100%;
      background-color: $mainColor7;
      border-radius: 4px;
      padding: 24px 20px;
      box-sizing: border-box;
      position: relative;
      left: 0;
      top: 0;
    }

    .hot-project {
      width: 36%;
      background-color: $mainColor7;
      height: 100%;
      border-radius: 4px;
      margin: 0 20px;
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

        p {
          font-size: 28px;
          font-family: BarlowSemi-B, sans-serif;
          font-weight: bold;
          color: $mainColor7;
          line-height: 34px;
          margin-top: 20px;
          margin-bottom: 44px;
        }

        .install-btn {
          height: 36px;
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

        h1 {
          font-size: 22px;
          font-family: BarlowSemi-B, sans-serif;
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
          font-family: BarlowSemi-B, sans-serif;
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
    @include common-container(32px, 65.2%);
    text-align: center;
    max-height: 1440px;
    display: flex;

    .project-explorer-tb--body {
      width: calc(75% - 20px);
      margin-right: 20px;

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
      width: 25%;
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
          font-size: 12px;
          font-family: BarlowSemi-B, sans-serif;
          font-weight: 400;
          color: $textColor3;
          line-height: 14px;
        }
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
  }

  /* 125% 适配 */
  @media screen and (min-width: 1328px) and (max-width: 1538px) {
    .project-search-main .project-base--container,
    .project-search-main .project-alert--container,
    .project-search-main .project-explorer--container {
      width: 80%;
    }
  }
</style>
