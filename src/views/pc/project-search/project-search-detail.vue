/* * @project-search-detail.vue * @deprecated 項目瀏覽器搜索詳情 - 項目態勢頁面 * @author czh *
@update (czh 2022/2/25) */
<template>
  <div class="project-search-detail eagle-page">
    <!--基本信息-->
    <div class="project-detail-base">
      <div class="project-detail--header">
        <div class="title">
          <icon-cell content="Project name" is-platform icon="eth" size="46" font-size="30">
          </icon-cell>
          <img alt=" " src="../../../assets/image/pc/audit-c.png" style="margin: 0 20px" />
          <!--            <img
                style="margin: 0 20px;"
                alt=" "
                src="../../../assets/image/pc/audit.png" />-->
          <be-tag type="info" custom-class="platform-tag-g">
            <div class="flex items-center">
              <span>BSC</span>
            </div>
          </be-tag>
          <el-select v-model="selectContract" placeholder="Select">
            <template #prefix>123</template>
            <el-option
              v-for="item in contractList"
              :key="item.value"
              :label="item.label"
              :value="item.value" />
          </el-select>
          <be-button
            :custom-class="`eagle-btn subscribe--btn ${
              baseInfo.isSubscribe ? 'subscribe-btn__as' : 'subscribe-btn__ed'
            } `"
            :prev-icon="baseInfo.isSubscribe ? 'iconStarEagle' : 'iconStar2Eagle'"
            type="success"
            @click="handleSubscribe">
          </be-button>
        </div>
        <div>
          <be-icon
            role="button"
            width="50"
            height="60"
            icon="iconWebsiteEagle"
            @click="openWindow(baseInfo.website)"></be-icon>
          <be-icon
            role="button"
            width="60"
            height="60"
            icon="iconTwitterEagle"
            @click="openWindow(baseInfo.twitter)"></be-icon>
          <be-icon
            role="button"
            width="60"
            height="60"
            icon="iconTelegramEagle"
            @click="openWindow(baseInfo.telegram)"></be-icon>
          <be-icon
            role="button"
            width="50"
            height="60"
            icon="iconGithubEagle"
            @click="openWindow(baseInfo.github)"></be-icon>
        </div>
      </div>
      <div class="project-detail-base--body">
        <div class="body-left">
          <div class="token-price">
            <div class="token-price-area">
              <div class="token-price-right">
                <p class="token-price--title">
                  {{ $t('lang.projectExplorer.detail.tokenPrice') }}
                  <be-icon icon="iconHelpEagle" style="margin-left: 6px"></be-icon>
                </p>
                <p role="button">
                  Dai Stablecoin (DAI)
                  <be-icon icon="iconEnter" style="margin-left: 6px"></be-icon>
                </p>
                <p class="token-price-val">
                  {{ isEmpty(1234, '/') === '/' ? '/' : `$${formatMoney(1234)}` }}
                </p>
                <up-down :data="12.34"></up-down>
              </div>
              <div class="token-price-left">
                <p>{{ $t('lang.projectExplorer.detail.tokenPrice1') }}</p>
                <area-line-cell dom-id="token_price" :height="234"></area-line-cell>
              </div>
            </div>
            <div class="user-active-market">
              <div class="user">
                <div class="uam-item">
                  <span class="user-active-market--title">
                    {{ $t('lang.projectExplorer.detail.user') }}
                  </span>
                  <be-icon icon="iconHelpEagle" style="margin-left: 6px"></be-icon>
                </div>
                <p class="uam-item-val">
                  {{ isEmpty(1234, '/') === '/' ? '/' : `${marketCapBaseInfo(1234)}` }}
                </p>
                <up-down :data="12.34"></up-down>
              </div>
              <div class="active">
                <div class="uam-item">
                  <span class="user-active-market--title">
                    {{ $t('lang.projectExplorer.detail.activity') }}</span
                  >
                  <be-icon icon="iconHelpEagle" style="margin-left: 6px"></be-icon>
                </div>
                <p class="uam-item-val">
                  {{ isEmpty(1234, '/') === '/' ? '/' : `${marketCapBaseInfo(1234)}` }}
                </p>
                <up-down :data="12.34" type="down"></up-down>
              </div>
              <div class="market">
                <div class="uam-item">
                  <span class="user-active-market--title">
                    {{ $t('lang.projectExplorer.detail.MarketCap') }}</span
                  >
                  <be-icon icon="iconHelpEagle" style="margin-left: 6px"></be-icon>
                </div>
                <p class="uam-item-val">
                  {{ isEmpty(1234, '/') === '/' ? '/' : `$${marketCapBaseInfo(1234)}` }}
                </p>
                <up-down :data="12.34"></up-down>
              </div>
            </div>
          </div>
          <div class="twitter-analysis">
            <div class="twitter-analysis-right">
              <p class="twitter-analysis--title">
                {{ $t('lang.projectExplorer.detail.twitterAnalysis') }}
              </p>
              <img
                alt=""
                style="width: 40px; height: 40px"
                src="../../../assets/image/pc/follow.png" />
              <p class="following">
                {{ $t('lang.projectExplorer.detail.follow') }}
                <span>
                  {{ $t('lang.projectExplorer.detail.total') }}
                </span>
              </p>
              <p class="twitter-analysis-val">
                {{ isEmpty(123456, '/') === '/' ? '/' : `${formatMoney(123456)}` }}
              </p>
              <up-down :data="12.34"></up-down>
            </div>
            <div class="twitter-analysis-left">
              <p>{{ $t('lang.projectExplorer.detail.twitterAnalysis1') }}</p>
              <area-line-cell dom-id="twitter_analysis" :smooth="false" :height="180">
              </area-line-cell>
            </div>
          </div>
        </div>
        <div class="body-right">
          <div class="score-report">
            <div class="score-report--chart">
              <div style="display: flex; justify-content: center; position: relative">
                <be-progress
                  type="dashboard"
                  stroke-width="12"
                  width="222"
                  :color="handleScoreColor(80)"
                  stroke-linecap="square"
                  percent="80"
                  status="normal"
                  gap="50">
                  <template #center>
                    <div class="progress-score">
                      <p>80</p>
                      <span>
                        {{ $t('lang.projectExplorer.detail.securityScore') }}
                      </span>
                    </div>
                  </template>
                </be-progress>
              </div>
              <div class="low-high-score">
                <p class="score">
                  {{ $t('lang.projectExplorer.detail.scoreH') }}
                  <span class="score-high">98</span>
                </p>
                <p class="score">
                  {{ $t('lang.projectExplorer.detail.scoreL') }}
                  <span class="score-low">64</span>
                </p>
              </div>
              <bar-cell :show-axis="false" dom-id="score_report__chart" :height="80"></bar-cell>
              <p class="descr">{{ $t('lang.projectExplorer.detail.scoreItemDisc') }}</p>
            </div>
            <div class="score-report--list">
              <p class="score-report__title">{{ $t('lang.projectExplorer.detail.scoreItem1') }}</p>
              <div>
                <!--                <report-item></report-item>
                <report-item></report-item>
                <report-item></report-item>-->
              </div>
              <div class="score-report--body">
                <img alt="" src="../../../assets/image/pc/report-empty.png" />
                <p>{{ $t('lang.projectExplorer.detail.noAudit') }}</p>
                <be-button custom-class="eagle-btn" round="4" type="success"
                  >{{ $t('lang.request.title') }}
                </be-button>
              </div>
            </div>
          </div>
          <score-item></score-item>
        </div>
      </div>
    </div>
    <!--  TODO:project-detail-decent    -->
    <div class="project-detail-decent">
      <div class="project-detail--header">
        <title-cell
          url="../src/assets/image/pc/decent-logo.png"
          :sub-content="$t('lang.projectExplorer.detail.titleDecentSub')"
          :name="$t('lang.projectExplorer.detail.titleDecent')">
        </title-cell>
      </div>
      <whale-holders></whale-holders>
    </div>

    <div class="project-detail-market">
      <div class="market-line--container">
        <div class="project-detail--header">
          <title-cell
            :sub-content="$t('lang.projectExplorer.detail.titleMarketSub')"
            url="../src/assets/image/pc/market-logo.png"
            :name="$t('lang.projectExplorer.detail.titleMarket')">
          </title-cell>
        </div>
        <div class="market-line">
          <market-line></market-line>
        </div>
      </div>
      <market-govern></market-govern>
    </div>
    <div class="project-detail-risk">
      <div class="project-detail--header">
        <title-cell
          :sub-content="$t('lang.projectExplorer.detail.titleRiskSub')"
          url="../src/assets/image/pc/risk-logo.png"
          :name="$t('lang.projectExplorer.detail.titleRisk')">
        </title-cell>
      </div>
      <div class="project-detail-risk--body">
        <risk-chart></risk-chart>
        <risk-list></risk-list>
      </div>
    </div>
    <div class="project-detail-public-info">
      <div class="project-detail--header">
        <title-cell
          url="../src/assets/image/pc/security.png"
          :name="$t('lang.projectExplorer.detail.titleInfo')">
        </title-cell>
      </div>
      <security-list></security-list>
    </div>
    <div class="project-detail-security">
      <div class="project-detail--header">
        <title-cell
          url="../src/assets/image/pc/security2.png"
          :name="$t('lang.projectExplorer.detail.titleSecurity')">
        </title-cell>
      </div>
      <security-info-card></security-info-card>
    </div>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, onMounted, ref } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { useEventBus } from '@vueuse/core'
  // @ts-ignore
  import {
    BeButton,
    BeIcon,
    BePagination,
    BeProgress,
    BeTag,
  } from '../../../../public/be-ui/be-ui.es.js'
  import composition from '../../../utils/mixin/common-func'
  import compositionPage from '../../../utils/mixin/page-param'
  import {
    createSubscribe,
    deleteSubscribe,
    getContractReportList,
    getProjectSituation,
    getProjectSituationStatistics,
    getPublicOpinion,
  } from '../../../api/project-explorer'
  import {
    createDate,
    formatDate,
    formatMoney,
    formatTimeStamp,
    getStore,
    isEmpty,
    nFormatter,
    numberToCommaString,
    openWindow,
  } from '../../../utils/common'
  import RiskTrxTable from '../risk-trx/components/risk-trx-table.vue'
  import EllipsisCopy from '../../../components/common-components/ellipsis-copy/ellipsis-copy.vue'
  import config from '../../../enums/config'
  import { setPrevUrl } from '../../../utils/request'
  import IconCell from '../../../components/common-components/icon-cell/icon-cell.vue'
  import TitleCell from '../../../components/common-components/title-cell/title-cell.vue'
  import AreaLineCell from '../../../components/common-components/area-line-cell/area-line-cell.vue'
  import UpDown from '../../../components/common-components/up-down/up-down.vue'
  import BarCell from '../../../components/common-components/bar-cell/bar-cell.vue'
  import ProjectDetailPubliOpinion from './components/project-detail-public-opinion.vue'
  import ProjectDetailAudit from './components/project-detail-audit.vue'
  import ProjectDetailTop from './components/project-detail-top.vue'
  import SecurityList from './components/security-list.vue'
  import SecurityInfoCard from './components/security-info-card.vue'
  import MarketGovern from './components/market-govern.vue'
  import MarketLine from './components/market-line.vue'
  import RiskList from './components/risk-list.vue'
  import RiskChart from './components/risk-chart.vue'
  import ScoreItem from './components/score-item.vue'
  import ReportItem from './components/report-item.vue'
  import WhaleHolders from './components/whale-holders.vue'
  import type { IContractReport, IPublicOpinion } from '../../../api/project-explorer'
  import type {
    IAuditList,
    IBaseInfo,
    IContractStatistics,
    IOption,
    IPageParam,
    ISafetyData,
    ITableHeader,
    ITop5QuidityPairs,
    ITop5QuiditySelect,
    ITop5TokenHolder,
    ITop5TokenHolderSelect,
  } from '../../../utils/types'
  export default defineComponent({
    name: 'ProjectSearchDetail',
    components: {
      WhaleHolders,
      BarCell,
      ReportItem,
      ScoreItem,
      UpDown,
      AreaLineCell,
      RiskChart,
      RiskList,
      MarketLine,
      MarketGovern,
      SecurityInfoCard,
      SecurityList,
      TitleCell,
      IconCell,
      ProjectDetailAudit,
      ProjectDetailTop,
      RiskTrxTable,
      BePagination,
      ProjectDetailPubliOpinion,
      BeIcon,
      BeTag,
      BeButton,
      BeProgress,
      EllipsisCopy,
    },
    setup() {
      const { message, route, msgBox, openWeb } = composition()
      const { resetPageParam, createPageParam, updatePageSize } = compositionPage()
      const { t } = useI18n()
      const selectContract = ref<string>('')
      const contractList = ref<Array<IOption>>([
        {
          value: 'Option1',
          label: 'Option1',
        },
        {
          value: 'Option2',
          label: 'Option2',
        },
        {
          value: 'Option3',
          label: 'Option3',
        },
        {
          value: 'Option4',
          label: 'Option4',
        },
        {
          value: 'Option5',
          label: 'Option5',
        },
      ])

      const baseInfo = ref<IBaseInfo>({})

      const top5TokenHolder = ref<Array<ITop5TokenHolder>>([])
      const top5TokenHolderAddr = ref<string>('')
      const top5TokenHolderName = ref<string>('')
      const defaultPlatformTop5Token = ref<string>('')
      const defaultPlatformTop5Quidity = ref<string>('')
      // top5表格header
      const top5THTableHeader = ref<Array<ITableHeader>>([
        { prop: 'address', label: t('lang.projectExplorer.detail.address') },
        { prop: 'percentage', label: t('lang.projectExplorer.detail.percentage') },
        { prop: 'quantity', label: t('lang.projectExplorer.detail.quantity') },
      ])
      const top5QPTableHeader = ref<Array<ITableHeader>>([
        { prop: 'address', label: t('lang.projectExplorer.detail.address') },
        { prop: 'percentage', label: t('lang.projectExplorer.detail.percentage') },
        { prop: 'quantity', label: t('lang.projectExplorer.detail.quantity') },
        { prop: 'pair', label: t('lang.projectExplorer.detail.pair') },
      ])
      const top5QuidityPairs = ref<Array<ITop5QuidityPairs>>([])
      const top5QuiditySelect = ref<Array<ITop5QuiditySelect>>([])
      const top5TokenHolderSelect = ref<Array<ITop5TokenHolderSelect>>([])
      const handleSelectTop5 = (params: { platform: string; type: string }): void => {
        // top5数据
        if (params.type === 'holder') {
          top5TokenHolder.value = []
          top5TokenHolderAddr.value = ''
          top5TokenHolderName.value = ''
          top5TokenHolderSelect.value &&
            top5TokenHolderSelect.value.forEach((val: any) => {
              if (val.platform === params.platform) {
                top5TokenHolder.value = val.records
                top5TokenHolderAddr.value = val.token_address
                top5TokenHolderName.value = val.token_name
              }
            })
        }
        if (params.type === 'pairs') {
          top5QuidityPairs.value = []
          top5QuiditySelect.value &&
            top5QuiditySelect.value.forEach((val: any) => {
              if (val.platform === params.platform) {
                top5QuidityPairs.value = val.records
              }
            })
        }
      }
      const baseLoading = ref<boolean>(false)
      const getProSituData = async () => {
        const params: IPublicOpinion = {
          project_id: parseInt(projectId.value),
        }
        baseLoading.value = true
        getProjectSituation(params)
          .then(res => {
            if (!res) {
              return
            }
            if (res) {
              // 获取项目详情数据
              baseInfo.value = {
                transactions: res.data.details.tx_24,
                transactionsTotal: res.data.details.tx_total,
                lastTradeData: res.data.details.latest_trading_date,
                riksTrxNum: res.data.details.risk_tx_24,
                isSubscribe: res.data.details.is_subscribe,
                riskPublicOpinion: res.data.details.risk_public_opinion_24,
                name: res.data.details.name,
                github: res.data.social_profiles.github,
                telegram: res.data.social_profiles.telegram,
                twitter: res.data.social_profiles.twitter,
                website: res.data.social_profiles.website,
              }
              // top5数据
              top5TokenHolderSelect.value = res.data.top_5_token_holders
              // 默认取第一个币种
              defaultPlatformTop5Token.value =
                top5TokenHolderSelect.value && top5TokenHolderSelect.value.length > 0
                  ? (top5TokenHolderSelect.value[0].platform as string)
                  : 'bsc'
              handleSelectTop5({ platform: defaultPlatformTop5Token.value, type: 'holder' })

              top5QuiditySelect.value = res.data.top_5_liquidity_pairs_holders
              defaultPlatformTop5Quidity.value =
                top5QuiditySelect.value && top5QuiditySelect.value.length > 0
                  ? (top5QuiditySelect.value[0].platform as string)
                  : 'bsc'
              handleSelectTop5({ platform: defaultPlatformTop5Quidity.value, type: 'pairs' })
            }
            baseLoading.value = false
          })
          .catch(err => {
            baseLoading.value = false
            message('error', err.message || err)
            console.error(err)
          })
        // 获取Audit数据
        await getAuditData()

        // 获取合约静态检测数据
        await getContractStatistics()
        // 获取项目舆情安全数据
        await getPublicOpinionData()
      }
      /**
       * 获取Audit数据
       */
      const auditList = ref<Array<IAuditList>>([])
      const pageParamsAudit = createPageParam(4)
      const getAuditData = (): void => {
        const params: IContractReport = {
          project_id: parseInt(projectId.value),
          page_num: pageParamsAudit.value.currentPage,
          page_size: pageParamsAudit.value.pageSize,
        }
        const prevUrl = setPrevUrl()
        const baseURL = config.baseURL
        getContractReportList(params)
          .then((res: any) => {
            if (res.success) {
              auditList.value = res.data.page_infos
              pageParamsAudit.value.total = res.data.total
              auditList.value.forEach(val => {
                val.url = `${baseURL}${prevUrl}/website/common/preview/single?fileUuid=${val.uuid}&reportNum=${val.report_num}`
              })
            }
          })
          .catch(err => {
            message('error', err.message || err)
            console.error(err)
          })
      }

      // 项目id
      const projectId = ref<string>('')
      const { param, id } = route.query
      projectId.value = (param || id) as string
      /**
       * 获取项目合约统计数据
       */
      const contractStatisticsData = ref<Array<IContractStatistics>>([])
      const pageParamsTj = createPageParam(3)
      const statisticsLoading = ref<boolean>(false)
      const getContractStatistics = (): void => {
        const params: IPublicOpinion = {
          project_id: projectId.value,
          page_num: pageParamsTj.value.currentPage,
          page_size: pageParamsTj.value.pageSize,
        }
        statisticsLoading.value = true
        getProjectSituationStatistics(params)
          .then(res => {
            if (!res) {
              return
            }
            if (res) {
              contractStatisticsData.value = res.data.page_infos
              pageParamsTj.value.total = res.data.total
            }
            statisticsLoading.value = false
          })
          .catch(err => {
            statisticsLoading.value = false
            message('error', err.message || err)
            console.error(err)
          })
      }

      /**
       * 获取项目舆情安全数据
       */
      // 项目舆情安全数据
      const safetyData = ref<Array<ISafetyData>>([])
      // 项目舆情安全loading
      const loadingFs = ref<boolean>(false)
      // 项目舆情安全分页参数
      const pageParamsFs = createPageParam(5)
      /**
       * 项目舆情安全数据获取方法
       */
      const getPublicOpinionData = (): void => {
        safetyData.value = []
        loadingFs.value = true
        const params: IPublicOpinion = {
          project_id: parseInt(projectId.value),
          page_num: pageParamsFs.value.currentPage,
          page_size: pageParamsFs.value.pageSize,
        }
        getPublicOpinion(params)
          .then(res => {
            if (!res) {
              return
            }
            if (res) {
              res.data.page_infos.forEach((val: any) => {
                safetyData.value.push({
                  negative: val.is_negative_news,
                  negativeMsg: '经自动识别，该资讯为负面信息',
                  sourceUrl: val.url,
                  title: val.title,
                  message: val.content,
                  from: val.source,
                  time: val.pub_time,
                  label: val.tag,
                })
              })
              pageParamsFs.value.total = res.data.total
              loadingFs.value = false
            }
          })
          .catch(err => {
            loadingFs.value = false
            message('error', err.message || err)
            console.error(err)
          })
      }

      /**
       * 分页处理方法
       * @param currentPage 当前页
       * @param item 分页参数
       * @param cb 回调方法获取数据
       */
      const handlePageChange = (currentPage: number, item: IPageParam, cb: Function): void => {
        item.currentPage = currentPage
        cb()
      }
      const updateNumFs = (data: IPageParam): void => {
        updatePageSize(data.pageSize!, pageParamsFs)
        getPublicOpinionData()
      }
      onMounted(() => {
        // getProSituData()
      })

      /*******************************   订阅  ******************************/
      /**
       * 发送订阅
       */
      const submitSubscribe = (): void => {
        const params = {
          project_id: parseInt(projectId.value),
        }
        createSubscribe(params)
          .then((res: any) => {
            if (res.success) {
              msgBox(
                t('lang.subscribe.titleSuccess'),
                `${t('lang.subscribe.success')}(${res.data.email}).`,
                'subscribe'
              )
              baseInfo.value.isSubscribe = !baseInfo.value.isSubscribe
            } else {
              msgBox(
                t('lang.subscribe.titleFailed'),
                t('lang.subscribe.failed'),
                'subscribe subscribe--normal'
              )
            }
          })
          .catch(err => {
            message('error', err.message || err)
            console.error(err)
          })
      }
      /**
       * 取消订阅
       */
      const cancelSubscribe = (): void => {
        const params = {
          project_id: parseInt(projectId.value),
        }
        deleteSubscribe(params)
          .then((res: any) => {
            if (res.code === '0000') {
              msgBox(t('lang.subscribe.titleUn'), t('lang.subscribe.unSubscribes'), 'subscribe')
              baseInfo.value.isSubscribe = !baseInfo.value.isSubscribe
            } else {
              message('warning', 'An unknown error has occurred in the system')
            }
          })
          .catch(err => {
            message('error', err.message || err)
            console.error(err)
          })
      }
      const busLogin = useEventBus<string>('openLogin')
      const handleSubscribe = (): void => {
        // 如果没登录就通知显示登录
        const isLogin = !!getStore('token')
        if (!isLogin) {
          // 开启登录窗口
          busLogin.emit()
          return
        }
        if (baseInfo.value.isSubscribe) {
          cancelSubscribe()
        } else {
          submitSubscribe()
        }
      }
      /*******************************   其他杂项逻辑  ******************************/
      /**
       * 选择项目 重置变量
       */
      const selectProjBus = useEventBus<string>('selectProjBus')
      selectProjBus.on((id: string) => {
        projectId.value = id
        resetPageParam(5, pageParamsFs)
        resetPageParam(3, pageParamsTj)
        resetPageParam(5, pageParamsAudit)
        getProSituData()
      })
      // 语种切换重新赋值一下 解决不更新问题
      const busLanguage = useEventBus<string>('language')
      busLanguage.on(() => {
        top5THTableHeader.value[0].label = t('lang.projectExplorer.detail.address')
        top5THTableHeader.value[1].label = t('lang.projectExplorer.detail.percentage')
        top5THTableHeader.value[2].label = t('lang.projectExplorer.detail.quantity')

        top5QPTableHeader.value[0].label = t('lang.projectExplorer.detail.address')
        top5QPTableHeader.value[1].label = t('lang.projectExplorer.detail.percentage')
        top5QPTableHeader.value[2].label = t('lang.projectExplorer.detail.quantity')
        top5QPTableHeader.value[3].label = t('lang.projectExplorer.detail.pair')
      })
      const marketCapBaseInfo = computed(() => {
        return function (val: number) {
          return formatMoney(val) + nFormatter(val, 0, true)
        }
      })
      const handleScoreColor = computed(() => {
        return function (val: number) {
          if (Number(val) >= 90) {
            return '#0ED9AC'
          }
          if (Number(val) < 90 && Number(val) > 60) {
            return '#F4CC29'
          }
          if (Number(val) <= 60) {
            return '#F32F2F'
          }
        }
      })
      return {
        handleScoreColor,
        marketCapBaseInfo,
        getAuditData,
        handlePageChange,
        pageParamsAudit,
        auditList,
        getContractStatistics,
        handleSubscribe,
        updateNumFs,
        defaultPlatformTop5Token,
        defaultPlatformTop5Quidity,
        openWeb,
        projectId,
        statisticsLoading,
        baseLoading,
        isEmpty,
        top5QPTableHeader,
        top5THTableHeader,
        top5TokenHolderAddr,
        top5TokenHolderName,
        top5TokenHolder,
        top5QuidityPairs,
        contractStatisticsData,
        baseInfo,
        pageParamsTj,
        getPublicOpinionData,
        safetyData,
        pageParamsFs,
        loadingFs,
        top5QuiditySelect,
        top5TokenHolderSelect,
        handleSelectTop5,
        numberToCommaString,
        createDate,
        formatDate,
        openWindow,
        formatTimeStamp,
        formatMoney,
        selectContract,
        contractList,
      }
    },
  })
</script>

<style lang="scss">
  .project-search-detail {
    min-height: calc(100% - 92px);
    .project-detail-base,
    .project-detail-decent,
    .project-detail-public-info,
    .project-detail-security,
    .project-detail-risk,
    .project-detail-market {
      @include common-container(32px, 65.2%);
    }
    .project-detail--header {
      height: 60px;
      line-height: 60px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .title {
        display: flex;
        align-items: center;
      }
    }
    .project-detail-base {
      .platform-tag-g {
        border: 0;
        padding: 4px 8px;
        height: 26px;
        border-radius: 4px;
      }
      .el-input {
        width: 160px;
        margin: 0 16px;
        line-height: 26px;
        .el-input__inner {
          height: 26px;
          line-height: 26px;
        }
      }
    }
    .project-detail-base--body {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      margin-top: 16px;
      .body-left,
      .body-right {
        width: calc(50% - 10px);
      }
      .token-price-area {
        display: flex;

        .token-price-right {
          width: 200px;

          .token-price--title {
            font-size: 18px;
            font-family: BarlowSemi-B, sans-serif;
            font-weight: bold;
            color: $textColor3;
            line-height: 22px;
            display: flex;
            align-items: center;
          }
          p[role='button'] {
            color: $textColor3;
            padding: 0 10px;
            height: 24px;
            line-height: 24px;
            cursor: pointer;
            display: flex;
            font-family: BarlowSemi-B, sans-serif;
            align-items: center;
            background: rgba(167, 199, 214, 0.3);
            border-radius: 2px;
            margin-top: 16px;
            margin-bottom: 72px;
          }
          .token-price-val {
            font-size: 48px;
            font-family: BarlowSemi-B, sans-serif;
            font-weight: bold;
            color: $textColor3;
            line-height: 58px;
            margin-bottom: 10px;
          }
        }
        .token-price-left {
          padding-left: 30px;
          width: calc(100% - 200px);
          p {
            font-size: 14px;
            font-family: BarlowSemi-R, sans-serif;
            font-weight: 400;
            color: $textColor3;
            line-height: 24px;
            text-align: right;
            margin: 32px 0;
          }
        }
      }

      .user-active-market {
        display: flex;
        margin-top: 32px;
        justify-content: space-between;
        .active,
        .market,
        .user {
          flex: 1;
        }
        .uam-item {
          display: flex;
          align-items: center;
        }
        .user-active-market--title {
          text-align: left;
          font-size: 14px;
          font-family: BarlowSemi-B, sans-serif;
          font-weight: 400;
          color: $textColor3;
          line-height: 17px;
        }
        .uam-item-val {
          font-size: 24px;
          font-family: BarlowSemi-B, sans-serif;
          font-weight: bold;
          color: $textColor3;
          line-height: 29px;
          margin-top: 8px;
          margin-bottom: 20px;
        }
      }

      .twitter-analysis {
        margin-top: 38px;
        background: $mainColor7;
        border-radius: 8px;
        padding: 24px 32px;
        display: flex;
        .twitter-analysis-right {
          width: 200px;
          img {
            margin-top: 56px;
            margin-bottom: 10px;
          }
          .twitter-analysis--title {
            font-size: 20px;
            font-family: BarlowSemi-B, sans-serif;
            font-weight: bold;
            color: $textColor3;
            line-height: 24px;
          }
        }
        .twitter-analysis-left {
          width: calc(100% - 200px);
          p {
            font-size: 14px;
            font-family: BarlowSemi-R, sans-serif;
            font-weight: 400;
            color: $textColor3;
            line-height: 24px;
            text-align: right;
            margin-bottom: 16px;
            margin-top: 20px;
          }
        }
        .following {
          font-size: 20px;
          font-family: BarlowSemi-R, sans-serif;
          font-weight: 400;
          color: $textColor3;
          line-height: 24px;
          span {
            font-size: 14px;
            color: $textColor2;
          }
        }
        .twitter-analysis-val {
          font-size: 24px;
          font-family: BarlowSemi-B, sans-serif;
          font-weight: bold;
          color: $textColor3;
          line-height: 34px;
          margin-top: 10px;
          margin-bottom: 16px;
        }
      }

      .body-right {
        padding: 24px;
        box-sizing: border-box;
        border-radius: 8px;
        background-color: $mainColor7;
        margin-left: 20px;
        .score-report {
          display: flex;
          margin-bottom: 12px;
          .score-report--list {
            background-color: $mainColor22;
            border-radius: 4px;
            padding: 20px 12px;
            box-sizing: border-box;
            width: 226px;
            .score-report__title {
              font-size: 18px;
              font-family: BarlowSemi-B, sans-serif;
              font-weight: bold;
              color: $textColor3;
              line-height: 22px;
              margin-bottom: 16px;
            }
            .score-report--body {
              height: 80%;
              display: flex;
              justify-content: center;
              align-items: center;
              flex-direction: column;
              p {
                margin: 10px 0 15px 0;
              }
            }
          }
          .score-report--chart {
            width: calc(100% - 226px);
            padding: 20px;
            box-sizing: border-box;
            .low-high-score {
              display: flex;
              justify-content: space-around;
              margin-bottom: 28px;
              margin-top: 20px;
            }
            .score {
              font-size: 14px;
              font-family: BarlowSemi-B, sans-serif;
              font-weight: bold;
              color: $textColor3;
              line-height: 18px;
            }
            .score-high {
              margin-left: 6px;
              color: $mainColor3;
            }
            .score-low {
              margin-left: 6px;
              color: $mainColor19;
            }
            .descr {
              font-size: 12px;
              font-family: BarlowSemi-R, sans-serif;
              font-weight: 400;
              color: $textColor2;
              line-height: 20px;
              text-align: center;
              margin-top: 8px;
            }
            .be-progress-body {
              height: 112px !important;
              svg {
                position: absolute;
                top: -22px;
              }
            }
            .progress-score {
              text-align: center;
              p {
                font-size: 48px;
                font-family: BarlowSemi-B, sans-serif;
                font-weight: bold;
                color: $textColor3;
                line-height: 58px;
              }
              span {
                font-size: 16px;
                font-family: BarlowSemi-R, sans-serif;
                font-weight: 400;
                color: #444444;
                line-height: 18px;
              }
            }
          }
        }
      }
    }
    .subscribe--btn {
      width: 40px;
      height: 40px;
      min-width: initial;
      border-radius: 4px !important;
      .be-button-slot {
        display: none;
      }
    }
    .subscribe-btn__as {
      background: $mainColor3;
    }
    .subscribe-btn__ed {
      color: $textColor3;
      background: transparent;
      border: 1px solid $textColor3;

      .be-icon use {
        fill: $textColor3 !important;
      }

      &:hover {
        color: $mainColor7;
        background: $mainColor3;
        border-color: transparent;

        .be-icon use {
          fill: $mainColor7 !important;
        }
      }
    }
    .project-detail-public-info {
      text-align: center;
      min-height: 480px;
      height: auto;
    }
    .project-detail-market {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      .market-line--container {
        .market-line {
          margin: 12px 0;
          background-color: $mainColor7;
          width: 843px;
          height: 477px;
          border-radius: 8px;
          padding: 24px;
          box-sizing: border-box;
        }
      }
    }
    .project-detail-risk--body {
      padding: 20px;
      box-sizing: border-box;
      background-color: $mainColor7;
      border-radius: 8px;
      display: flex;
    }
  }
  .subscribe {
    .be-message-box--container {
      width: 575px;
      height: 148px;
      background: $mainColor7;
      border-radius: 4px;
      box-shadow: 0 12px 34px 0 rgba(0, 0, 0, 0.1);

      .be-message-box--title .be-message-box--head div:nth-child(1) .text-info {
        color: $mainColor3;
      }

      .be-message-box--body p {
        margin-top: 20px;
        font-family: BarlowSemi-B, sans-serif;
        font-size: 14px;
        font-weight: 400;
        line-height: 22px;
        color: #333;
      }
    }
  }

  .subscribe--normal {
    .be-message-box--container {
      .be-message-box--title .be-message-box--head div:nth-child(1) .text-info {
        color: $mainColor19;
      }
    }
  }
  /* 150% 适配 */
  @media screen and (min-width: 1280px) and (max-width: 1326px) {
    .project-search-detail {
      .project-detail-base,
      .project-detail-decent,
      .project-detail-public-info,
      .project-detail-security,
      .project-detail-risk,
      .project-detail-market {
        width: 92%;
      }
    }
  }

  /* 125% 适配 */
  @media screen and (min-width: 1328px) and (max-width: 1538px) {
    .project-search-detail {
      .project-detail-base,
      .project-detail-decent,
      .project-detail-public-info,
      .project-detail-security,
      .project-detail-risk,
      .project-detail-market {
        width: 80%;
      }
    }
  }
</style>
