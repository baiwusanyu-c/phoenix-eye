/* * @project-search-detail.vue * @deprecated 項目瀏覽器搜索詳情 - 項目態勢頁面 * @author czh *
@update (czh 2022/2/25) */
<template>
  <div class="project-search-detail">
    <!--基本信息-->
    <div v-loading="baseLoading" class="proj-detail-item" style="margin-top: 32px">
      <div class="item-title" style="position: relative; width: 100%">
        <h2>
          <ellipsis-copy
            :target-str="isEmpty(baseInfo.name)"
            :is-show-copy-btn="false"
            :is-ellipsis="
              isEmpty(baseInfo.name) && isEmpty(baseInfo.name).length > 20 ? true : false
            "
            styles="color:#333"
            font-length="8"
            end-length="8">
          </ellipsis-copy>
        </h2>
        <span style="margin-right: 6px"
          >{{ $t('lang.projectExplorer.detail.riskTrx') }}(24h) :
        </span>
        <span style="margin-right: 30px; font-size: 14px; font-weight: bold; color: #333">{{
          isEmpty(baseInfo.riksTrxNum)
        }}</span>
        <span style="margin-right: 6px"
          >{{ $t('lang.projectExplorer.detail.riskPublicOpinion') }}(24h) :</span
        >
        <span style="margin-right: 16px; font-size: 14px; font-weight: bold; color: #333">{{
          isEmpty(baseInfo.riskPublicOpinion)
        }}</span>
        <!--    订阅      -->
        <be-button
          :custom-class="`eagle-btn subscribe--btn ${
            baseInfo.isSubscribe ? 'subscribe-btn__as' : 'subscribe-btn__ed'
          } `"
          :prev-icon="baseInfo.isSubscribe ? 'iconStarEagle' : 'iconStar2Eagle'"
          type="success"
          @click="handleSubscribe">
          {{ $t('lang.projectExplorer.detail.subscribe') }}
        </be-button>
      </div>
      <div class="base-info">
        <div class="base-info-item">
          <p>{{ $t('lang.projectExplorer.detail.transactions') }}(24h)</p>
          <span v-if="baseInfo.transactions || baseInfo.transactions === 0">{{
            numberToCommaString(isEmpty(baseInfo.transactions))
          }}</span>
          <span v-if="!baseInfo.transactions && baseInfo.transactions !== 0">{{
            $t('lang.emptyData')
          }}</span>
        </div>
        <div class="base-info-item">
          <div style="flex: 1">
            <p>{{ $t('lang.projectExplorer.detail.transactionsTotal') }}</p>
            <span
              v-if="baseInfo.transactionsTotal || baseInfo.transactionsTotal === 0"
              class="total"
              >{{ numberToCommaString(isEmpty(baseInfo.transactionsTotal)) }}</span
            >
            <span
              v-if="!baseInfo.transactionsTotal && baseInfo.transactionsTotal !== 0"
              class="total"
              >{{ $t('lang.emptyData') }}</span
            >
          </div>
          <div style="flex: 1">
            <p>{{ $t('lang.projectExplorer.detail.lastDate') }}</p>
            <p v-if="baseInfo.lastTradeData || baseInfo.lastTradeData === 0" class="date">
              {{ formatDate(createDate(baseInfo.lastTradeData)) }}
            </p>
            <p v-if="!baseInfo.lastTradeData && baseInfo.lastTradeData !== 0" class="date">
              {{ $t('lang.emptyData') }}
            </p>
            <p v-if="baseInfo.lastTradeData || baseInfo.lastTradeData === 0" class="time">
              {{ formatTimeStamp(createDate(baseInfo.lastTradeData).getTime(), $i18n.locale) }}
            </p>
          </div>
        </div>
        <div class="base-info-item">
          <p>{{ $t('lang.projectExplorer.detail.socialProfiles') }}:</p>
          <be-icon
            v-if="baseInfo.website"
            role="button"
            width="50"
            height="60"
            icon="iconWebsiteEagle"
            @click="openWindow(baseInfo.website)"></be-icon>
          <be-icon
            v-if="baseInfo.twitter"
            role="button"
            width="60"
            height="60"
            icon="iconTwitterEagle"
            @click="openWindow(baseInfo.twitter)"></be-icon>
          <be-icon
            v-if="baseInfo.telegram"
            role="button"
            width="60"
            height="60"
            icon="iconTelegramEagle"
            @click="openWindow(baseInfo.telegram)"></be-icon>
          <be-icon
            v-if="baseInfo.github"
            role="button"
            width="50"
            height="60"
            icon="iconGithubEagle"
            @click="openWindow(baseInfo.github)"></be-icon>
          <span
            v-if="!baseInfo.website && !baseInfo.twitter && !baseInfo.telegram && !baseInfo.github"
            class="total">
            {{ $t('lang.emptyData') }}
          </span>
        </div>
      </div>
    </div>
    <!--合约统计-->
    <div
      v-if="contractStatisticsData.length > 0"
      v-loading="statisticsLoading"
      class="proj-detail-item eagle-table">
      <div class="item-title">
        <h2>{{ $t('lang.projectExplorer.detail.contractStatistics') }}</h2>
      </div>
      <div
        v-for="item in contractStatisticsData"
        :key="item.contract_address"
        class="contract-statistics">
        <div style="flex: 1">
          <div style="display: flex; margin-bottom: 6px">
            <be-tag type="info">
              <div class="flex items-center">
                <span>{{ item.platform.toUpperCase() }}</span>
              </div>
            </be-tag>
            <ellipsis-copy
              :target-str="item.token_name"
              custom-class="total"
              :is-show-copy-btn="false"
              :empty-text="' '"
              :is-ellipsis="(item.token_name && item.token_name.length) > 20 ? true : false"
              font-length="8"
              end-length="8">
            </ellipsis-copy>
          </div>
          <ellipsis-copy
            :target-str="item.contract_address"
            styles="color: #008EE9;cursor:pointer;font-weight:400"
            font-length="8"
            end-length="8"
            @click="
              item.contract_address ? openWeb(item.contract_address, 'token', item.platform) : null
            ">
          </ellipsis-copy>
        </div>
        <div style="flex: 1">
          <p class="contract-statistics-label">
            {{ $t('lang.projectExplorer.detail.transactions') }}(24h)
          </p>
          <span>{{ numberToCommaString(isEmpty(item.tx_24)) }}</span>
        </div>
        <div style="flex: 1">
          <p class="contract-statistics-label">
            {{ $t('lang.projectExplorer.detail.transactionsTotal') }}
          </p>
          <span class="total">{{ numberToCommaString(isEmpty(item.tx_total)) }}</span>
        </div>
        <div style="flex: 1">
          <p class="contract-statistics-label">{{ $t('lang.projectExplorer.detail.lastDate') }}</p>
          <p class="date">{{ formatDate(createDate(item.latest_trading_date)) }}</p>
        </div>
      </div>
      <div class="table-page">
        <be-pagination
          is-ordianry
          :page-size="pageParamsTj.pageSize"
          :page-count="pageParamsTj.total"
          :current-page="pageParamsTj.currentPage"
          :page-num="[{ label: 3 }, { label: 20 }, { label: 40 }, { label: 80 }, { label: 100 }]"
          :pager-show-count="5"
          page-unit="page"
          :layout="['prev', 'page']"
          @change-page="
            item => handlePageChange(item.currentPage, pageParamsTj, getContractStatistics)
          ">
          <template #prev>
            <span class="table-page-info"> {{ $t('lang.total') }} {{ pageParamsTj.total }}</span>
          </template>
        </be-pagination>
      </div>
    </div>
    <!--Audit-->
    <div v-if="auditList.length > 0" class="proj-detail-item eagle-table">
      <div class="item-title">
        <h2>{{ $t('lang.projectExplorer.detail.audit') }}</h2>
      </div>
      <div class="project-detail-audit--body">
        <project-detail-audit
          v-for="item in auditList"
          :key="item.report_id"
          :url="item.url"
          :name="item.report_name"
          :date="formatDate(createDate(item.create_time))">
        </project-detail-audit>
      </div>
      <div class="table-page">
        <be-pagination
          is-ordianry
          :page-size="pageParamsAudit.pageSize"
          :page-count="pageParamsAudit.total"
          :current-page="pageParamsAudit.currentPage"
          :page-num="[{ label: 20 }, { label: 40 }, { label: 80 }, { label: 100 }]"
          :pager-show-count="5"
          page-unit="page"
          :layout="['prev', 'page']"
          @change-page="item => handlePageChange(item.currentPage, pageParamsAudit, getAuditData)">
          <template #prev>
            <span class="table-page-info"> {{ $t('lang.total') }} {{ pageParamsAudit.total }}</span>
          </template>
        </be-pagination>
      </div>
    </div>
    <!--top5 数据表格 "-->
    <div v-loading="baseLoading" class="proj-detail-item" style="display: flex">
      <project-detail-top
        v-if="top5TokenHolderSelect.length > 0"
        :token-name="top5TokenHolderName"
        :token-address="top5TokenHolderAddr"
        types="holder"
        :default-platform="defaultPlatformTop5Token"
        :data="top5TokenHolder"
        style="margin-right: 16px"
        :header="top5THTableHeader"
        :title="$t('lang.projectExplorer.detail.top5Title1')"
        @select="handleSelectTop5">
      </project-detail-top>
      <project-detail-top
        v-if="top5QuiditySelect.length > 0"
        :data="top5QuidityPairs"
        types="pairs"
        :default-platform="defaultPlatformTop5Quidity"
        :header="top5QPTableHeader"
        :title="$t('lang.projectExplorer.detail.top5Title2')"
        @select="handleSelectTop5">
      </project-detail-top>
    </div>
    <!--风险交易-->
    <div class="proj-detail-item">
      <div class="item-title" style="margin-bottom: 32px">
        <h2>{{ $t('lang.projectExplorer.detail.riskTrx') }}</h2>
      </div>
      <risk-trx-table :project-id="projectId"></risk-trx-table>
    </div>
    <!--项目舆情安全-->
    <div v-if="safetyData.length > 0" class="proj-detail-item">
      <div class="item-title">
        <h2>{{ $t('lang.projectExplorer.detail.riskPublicOpinion') }}</h2>
      </div>
      <div
        v-loading="loadingFs"
        :class="{
          'eagle-table': true,
          'proj-detail-item-feelingSecurity': true,
          'proj-detail-item-hyaq': safetyData.length === 0,
        }">
        <project-detail-publi-opinion :info-data="safetyData"> </project-detail-publi-opinion>
        <div class="table-page">
          <be-pagination
            is-ordianry
            :page-size="pageParamsFs.pageSize"
            :page-count="pageParamsFs.total"
            :current-page="pageParamsFs.currentPage"
            :page-num="[{ label: 5 }, { label: 20 }, { label: 40 }, { label: 80 }, { label: 100 }]"
            :pager-show-count="5"
            page-unit="page"
            :layout="['prev', 'pNum', 'page']"
            @update-num="updateNumFs"
            @change-page="
              item => handlePageChange(item.currentPage, pageParamsFs, getPublicOpinionData)
            ">
            <template #prev>
              <span class="table-page-info"> {{ $t('lang.total') }} {{ pageParamsFs.total }}</span>
            </template>
          </be-pagination>
        </div>
        <!--        <div v-if="safetyData.length === 0" class="empty-data" style="margin-top: 0">
          <img class="img" src="@/assets/image/pc/empty-data.png" alt="" style="height: 180px" />
          <p style="line-height: 25px">{{ $t('lang.emptyData') }}</p>
        </div>-->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, onMounted, ref } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { useEventBus } from '@vueuse/core'
  import { BeButton, BeIcon, BePagination, BeTag } from '../../../../public/be-ui/be-ui.es'
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
    formatTimeStamp,
    getStore,
    numberToCommaString,
    openWindow,
  } from '../../../utils/common'
  import RiskTrxTable from '../risk-trx/components/risk-trx-table.vue'
  import EllipsisCopy from '../../../components/common-components/ellipsis-copy/ellipsis-copy.vue'
  import config from '../../../enums/config'
  import ProjectDetailPubliOpinion from './components/project-detail-public-opinion.vue'
  import ProjectDetailAudit from './components/project-detail-audit.vue'
  import ProjectDetailTop from './components/project-detail-top.vue'
  import type { IContractReport, IPublicOpinion } from '../../../api/project-explorer'
  import type {
    IAuditList,
    IBaseInfo,
    IContractStatistics,
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
      ProjectDetailAudit,
      ProjectDetailTop,
      RiskTrxTable,
      BePagination,
      ProjectDetailPubliOpinion,
      BeIcon,
      BeTag,
      BeButton,
      EllipsisCopy,
    },
    setup() {
      const { message, route, isEmpty, msgBox, openWeb } = composition()
      const { resetPageParam, createPageParam, updatePageSize } = compositionPage()
      const { t } = useI18n()
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
        const prevUrl =
          String(import.meta.env.VITE_PROJECT_ENV) === 'production' ? '/hermit/back' : ''
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
        getProSituData()
      })
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
      return {
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
      }
    },
  })
</script>

<style lang="scss">
  .project-search-detail {
    position: relative;
    top: 0;
    left: 0;
    z-index: 1;
    box-sizing: border-box;
    width: 100%;
    height: auto;
    min-height: calc(100% - 192px);
    padding-bottom: 86px;

    .subscribe--btn {
      position: absolute;
      right: 0;
      float: right;
      width: 118px;
      height: 40px;
      border-radius: 4px !important;
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

    .base-info {
      display: flex;
      width: 100%;

      .base-info-item:nth-child(1) {
        margin-right: 20px;
        background: linear-gradient(90deg, #fff 0%, #e5f3f2 100%);

        span {
          font-family: AlibabaPuHuiTi-Medium, sans-serif;
          font-size: 36px;
          font-weight: bold;
          color: $textColor3;
        }
      }

      .base-info-item:nth-child(2) {
        display: flex;
        flex: 2;
        margin-right: 20px;

        .total {
          font-family: AlibabaPuHuiTi-Medium, sans-serif;
          font-size: 24px;
          font-weight: bold;
          color: $textColor3;
        }

        .date {
          font-family: AlibabaPuHuiTi-Medium, sans-serif;
          font-size: 18px;
          font-weight: bold;
          color: $textColor3;
        }
      }

      .base-info-item {
        box-sizing: border-box;
        flex: 1;
        min-height: 126px;
        padding: 24px;
        background-color: $mainColor7-06;
        border-radius: 4px;

        &:hover {
          @apply shadow-xl;
        }

        .be-icon {
          fill: $textColor12;

          &:hover {
            fill: $mainColor11;
          }
        }

        p {
          margin-bottom: 12px;
          font-family: AlibabaPuHuiTi-Medium, sans-serif;
          color: $textColor4;
        }
      }
    }

    .project-detail-audit--body {
      display: grid;
      grid-template-columns: 24% 24% 24% 24%;
      grid-gap: 20px;
    }

    .proj-detail-item {
      @include common-container(24px);
      min-width: 1172px;
      .item-title {
        display: flex;
        align-items: center;
        margin-bottom: 16px;

        h2 {
          margin-right: 15px;
          font-family: AlibabaPuHuiTi-Medium, sans-serif;
          color: $textColor3;
        }

        span {
          font-family: AlibabaPuHuiTi-Medium, sans-serif;
          color: $textColor4;
        }
      }

      .contract-statistics {
        box-sizing: border-box;
        display: flex;
        width: 100%;
        min-height: 88px;
        padding: 16px;
        margin-bottom: 12px;
        background-color: $mainColor7;
        border-radius: 4px;

        .be-tag {
          height: 30px;
          margin-right: 14px;
          line-height: 30px;
          background-color: $mainColor16;
          border-width: 0;
          border-radius: 0;

          span {
            font-family: AlibabaPuHuiTi-Regular, sans-serif;
            font-size: 14px;
            font-weight: 500;
            color: $textColor3;
          }

          &:hover {
            @apply shadow;
          }
        }

        .contract-statistics-label {
          margin-bottom: 12px;
          font-family: AlibabaPuHuiTi-Medium, sans-serif;
          color: $textColor4;
        }

        span,
        .date {
          font-family: AlibabaPuHuiTi-Medium, sans-serif;
          font-size: 16px;
          font-weight: bold;
          color: $textColor3;
        }

        &:hover {
          @apply shadow-md;
        }
      }

      .proj-detail-item-hyaq {
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 300px;
        background-color: $mainColor7;
      }

      .proj-detail-item-feelingSecurity {
        box-sizing: border-box;
        padding-bottom: 15px;
      }
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
        font-family: AlibabaPuHuiTi-Medium, sans-serif;
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
    .project-search-detail .proj-detail-item {
      width: 92%;
    }
  }

  /* 125% 适配 */
  @media screen and (min-width: 1328px) and (max-width: 1538px) {
    .project-search-detail .proj-detail-item {
      width: 80%;
    }
  }
</style>
