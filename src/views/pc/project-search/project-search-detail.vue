/* * @project-search-detail.vue * @deprecated 項目瀏覽器搜索詳情 - 項目態勢頁面 * @author czh *
@update (czh 2022/2/25) */
<template>
  <div class="project-search-detail eagle-page">
    <contact-bar></contact-bar>
    <!--基本信息-->
    <div class="project-detail-base">
      <div class="project-detail--header">
        <div class="title">
          <project-name-cell
            :name="baseInfo.project_name"
            :url="baseInfo.logo_url"
            :is-ell="true"
            :ellipsis-len="30"
            :font-len="30"
            width="600"
            size="46"
            styles="font-size:30px">
          </project-name-cell>
          <img
            v-if="auditList.length > 0"
            alt=" "
            src="../../../assets/image/pc/audit-c.png"
            style="margin: 0 20px" />
          <be-tag type="info" custom-class="platform-tag-g">
            <div class="flex items-center">
              <span>{{ baseInfo.platform?.toUpperCase() }}</span>
            </div>
          </be-tag>
          <el-select
            v-if="hasTokenAddress"
            v-model="selectContract"
            placeholder="contract"
            class="contract-select"
            @change="handleContractSelect">
            <template #prefix>
              <be-icon color="#fff" icon="text"></be-icon>
            </template>
            <el-option
              v-for="item in baseInfo.contract_address_list"
              :key="item.contract_address"
              :label="item.contract_address_tag"
              :value="item.contract_address" />
          </el-select>
          <be-button
            v-if="hasTokenAddress"
            :custom-class="`eagle-btn subscribe--btn ${
              baseInfo.is_subscribe ? 'subscribe-btn__as' : 'subscribe-btn__ed'
            } `"
            :prev-icon="baseInfo.is_subscribe ? 'iconStarEagle' : 'iconStar2Eagle'"
            type="success"
            @click="handleSubscribe">
          </be-button>
        </div>
        <div style="height: 60px">
          <be-icon
            v-if="governData.website"
            :herf="governData.website"
            style="cursor: pointer"
            role="button"
            width="50"
            height="60"
            icon="iconWebsiteEagle"
            @click="openWindow(governData.website)"></be-icon>
          <be-icon
            v-if="governData.twitter"
            style="cursor: pointer"
            :herf="governData.twitter"
            role="button"
            width="60"
            height="60"
            icon="iconTwitterEagle"
            @click="openWindow(governData.twitter)"></be-icon>
          <be-icon
            v-if="governData.telegram"
            style="cursor: pointer"
            :herf="governData.telegram"
            role="button"
            width="60"
            height="60"
            icon="iconTelegramEagle"
            @click="openWindow(governData.telegram)"></be-icon>
          <be-icon
            v-if="governData.github"
            style="cursor: pointer"
            :herf="governData.github"
            role="button"
            width="50"
            height="60"
            icon="iconGithubEagle"
            @click="openWindow(governData.github)"></be-icon>
        </div>
      </div>
      <div v-loading="baseLoading" class="project-detail-base--body">
        <div class="body-left">
          <div v-if="hasTokenAddress" class="token-price">
            <div class="token-price-area">
              <div class="token-price-right">
                <p class="token-price--title">
                  {{ $t('lang.projectExplorer.detail.tokenPrice') }}
                  <el-tooltip placement="top">
                    <template #content>
                      {{ $t('lang.projectExplorer.detail.descr1') }}
                      <br />
                      {{ $t('lang.projectExplorer.detail.descr6') }}
                    </template>
                    <be-icon icon="iconHelpEagle" style="margin-left: 6px"></be-icon>
                  </el-tooltip>
                </p>

                <p
                  role="button"
                  @click="
                    openWindow(`${webURL[baseInfo.platform + '_token']}${baseInfo.token_address}`)
                  ">
                  <ellipsis-copy
                    :target-str="handleTokenAddress(baseInfo)"
                    :tooltip-txt="tokenAddrTips()"
                    :is-tooltip="true"
                    :is-ellipsis="handleTokenAddress(baseInfo).length > 30"
                    :is-show-copy-btn="false">
                  </ellipsis-copy>
                  <be-icon icon="iconEnter" style="margin-left: 6px"></be-icon>
                </p>
                <el-tooltip
                  :content="onChainData.token_price"
                  placement="top"
                  effect="light"
                  :disabled="!onChainData.token_price">
                  <p class="token-price-val">
                    {{
                      isEmpty(onChainData.token_price, '/') === '/'
                        ? '/'
                        : `$${nFormats(onChainData.token_price)}`
                    }}
                  </p>
                </el-tooltip>
                <up-down :data="onChainData.token_price_ratio"></up-down>
              </div>
              <div
                v-if="
                  marketVolatilityData.token_price_data &&
                  marketVolatilityData.token_price_data.every_day_data
                "
                class="token-price-left">
                <p>{{ $t('lang.projectExplorer.detail.tokenPrice1') }}</p>
                <area-line-cell
                  dom-id="token_price"
                  :height="234"
                  y-axis="date"
                  x-axis="value"
                  :line-data="
                    marketVolatilityData.token_price_data.every_day_data
                  "></area-line-cell>
              </div>
            </div>
            <div class="user-active-market">
              <div class="user">
                <div class="uam-item">
                  <span class="user-active-market--title">
                    {{ $t('lang.projectExplorer.detail.user') }}
                  </span>
                  <el-tooltip placement="top">
                    <template #content>
                      {{ $t('lang.projectExplorer.detail.descr2') }}
                      <br />
                      {{ $t('lang.projectExplorer.detail.descr6') }}
                    </template>
                    <be-icon icon="iconHelpEagle" style="margin-left: 6px"></be-icon>
                  </el-tooltip>
                </div>
                <p class="uam-item-val">
                  <el-tooltip
                    :content="onChainData.holders"
                    placement="top"
                    effect="light"
                    :disabled="!onChainData.holders">
                    <span style="width: max-content">
                      {{
                        isEmpty(onChainData.holders, '/') === '/'
                          ? '/'
                          : `${marketCapBaseInfo(onChainData.holders)}`
                      }}
                    </span>
                  </el-tooltip>
                </p>
                <up-down :data="onChainData.holders_ratio"></up-down>
              </div>
              <div class="active">
                <div class="uam-item">
                  <span class="user-active-market--title">
                    {{ $t('lang.projectExplorer.detail.activity') }}</span
                  >
                  <el-tooltip placement="top">
                    <template #content>
                      {{ $t('lang.projectExplorer.detail.descr3') }}
                      <br />
                      {{ $t('lang.projectExplorer.detail.descr6') }}
                    </template>
                    <be-icon icon="iconHelpEagle" style="margin-left: 6px"></be-icon>
                  </el-tooltip>
                </div>
                <p class="uam-item-val">
                  <el-tooltip
                    :content="onChainData.transactions"
                    placement="top"
                    effect="light"
                    :disabled="!onChainData.transactions">
                    <span style="width: max-content">
                      {{
                        isEmpty(onChainData.transactions, '/') === '/'
                          ? '/'
                          : `${marketCapBaseInfo(onChainData.transactions)}`
                      }}
                    </span>
                  </el-tooltip>
                </p>
                <up-down :data="onChainData.transactions_ratio" type="down"></up-down>
              </div>
              <div class="market">
                <div class="uam-item">
                  <span class="user-active-market--title">
                    {{ $t('lang.projectExplorer.detail.MarketCap') }}</span
                  >
                  <el-tooltip placement="top">
                    <template #content>
                      {{ $t('lang.projectExplorer.detail.descr4') }}
                      <br />
                      {{ $t('lang.projectExplorer.detail.descr5') }}
                      <br />
                      {{ $t('lang.projectExplorer.detail.descr6') }}
                    </template>
                    <be-icon icon="iconHelpEagle" style="margin-left: 6px"></be-icon>
                  </el-tooltip>
                </div>
                <p class="uam-item-val">
                  <el-tooltip
                    :content="onChainData.market_cap"
                    placement="top"
                    effect="light"
                    :disabled="!onChainData.market_cap">
                    <span style="width: max-content">
                      {{
                        isEmpty(onChainData.market_cap, '/') === '/'
                          ? '/'
                          : `$${marketCapBaseInfo(onChainData.market_cap)}`
                      }}
                    </span>
                  </el-tooltip>
                </p>
                <up-down :data="onChainData.market_cap_ratio"></up-down>
              </div>
            </div>
          </div>
          <div v-if="!hasTokenAddress" class="token-price" style="position: relative">
            <img alt="" src="../../../assets/image/pc/no-token1.png" />
            <div class="join">
              <p>
                {{ $t('lang.projectExplorer.detail.owner') }}
              </p>
              <p>
                {{ $t('lang.projectExplorer.detail.join') }}
              </p>
              <be-button
                type="success"
                custom-class="eagle-btn enable-eagle-btn"
                @click="openCreateProject"
                >{{ $t('lang.projectExplorer.detail.enableEagleEye') }}</be-button
              >
            </div>
          </div>
          <div class="twitter-analysis">
            <div v-if="hasTokenAddress" class="twitter-analysis-right">
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
                <el-tooltip
                  :content="twitterAnalysisData.value"
                  placement="top"
                  effect="light"
                  :disabled="!twitterAnalysisData.value">
                  <span style="width: max-content">
                    {{
                      isEmpty(twitterAnalysisData.value, '/') === '/'
                        ? '/'
                        : `${nFormats(twitterAnalysisData.value)}`
                    }}
                  </span>
                </el-tooltip>
              </p>
              <up-down :data="twitterAnalysisData.ratio"></up-down>
            </div>
            <div v-if="hasTokenAddress" class="twitter-analysis-left">
              <p>{{ $t('lang.projectExplorer.detail.twitterAnalysis1') }}</p>
              <area-line-cell
                v-if="
                  twitterAnalysisData.every_day_data &&
                  twitterAnalysisData.every_day_data.length > 0
                "
                dom-id="twitter_analysis"
                :line-data="twitterAnalysisData.every_day_data"
                x-axis="value"
                y-axis="date"
                prefix=" "
                :smooth="false"
                :height="180">
              </area-line-cell>
              <empty-data v-else></empty-data>
            </div>
            <div v-if="!hasTokenAddress">
              <p class="twitter-analysis--title">
                {{ $t('lang.projectExplorer.detail.twitterAnalysis') }}
              </p>
              <img alt="" src="../../../assets/image/pc/no-token2.png" />
            </div>
          </div>
        </div>
        <div class="body-right">
          <div class="score-report">
            <div v-if="hasTokenAddress" class="score-report--chart">
              <div style="display: flex; justify-content: center; position: relative">
                <be-progress
                  :hidden-path="false"
                  type="dashboard"
                  stroke-width="12"
                  width="222"
                  :color="handleScoreColor(projectScoreData.current_total_score)"
                  stroke-linecap="square"
                  :percent="projectScoreData.current_total_score"
                  status="normal"
                  gap="50">
                  <template #center>
                    <div class="progress-score">
                      <p>{{ projectScoreData.current_total_score }}</p>
                      <span>
                        {{ $t('lang.projectExplorer.detail.securityScore') }}
                        <el-tooltip placement="top">
                          <template #content>
                            <p>A security index that measures the audit status,</p>
                            <p>decentralization, market volatility, transparency,</p>
                            <p>and real-time transaction risks of crypto projects.</p>
                            <p>The higher the score, the better.</p>
                          </template>
                          <be-icon icon="iconHelpEagle" style="margin-left: 6px"></be-icon>
                        </el-tooltip>
                      </span>
                    </div>
                  </template>
                </be-progress>
              </div>
              <div class="low-high-score">
                <p class="score">
                  {{ $t('lang.projectExplorer.detail.scoreH') }}
                  <span
                    class="score-high"
                    :style="`color:${handleScoreColor(projectScoreData.high_total_score)}`"
                    >{{
                      projectScoreData.high_total_score > 0
                        ? projectScoreData.high_total_score
                        : 'N/A'
                    }}</span
                  >
                </p>
                <p class="score">
                  {{ $t('lang.projectExplorer.detail.scoreL') }}
                  <span
                    class="score-low"
                    :style="`color:${handleScoreColor(projectScoreData.low_total_score)}`"
                    >{{
                      projectScoreData.low_total_score > 0
                        ? projectScoreData.low_total_score
                        : 'N/A'
                    }}</span
                  >
                </p>
              </div>
              <bar-cell
                :show-axis="false"
                :line-data="projectScoreData.every_day_data"
                x-axis="date"
                y-axis="score"
                dom-id="score_report__chart"
                :height="80"></bar-cell>
              <p class="descr">{{ $t('lang.projectExplorer.detail.scoreItemDisc') }}</p>
            </div>
            <div v-if="!hasTokenAddress" class="score-report--chart">
              <img
                alt=""
                src="../../../assets/image/pc/no-token3.png"
                style="height: 284px; margin: 0 auto" />
            </div>
            <div class="score-report--list">
              <p class="score-report__title">{{ $t('lang.projectExplorer.detail.scoreItem1') }}</p>
              <div v-if="auditList.length > 0">
                <report-item
                  v-for="item in auditList"
                  :key="item.url + item.report_id"
                  :time="item.create_time"
                  :name="item.report_name"
                  :url="item.url">
                </report-item>
              </div>
              <div v-if="auditList.length === 0" class="score-report--body">
                <img alt="" src="../../../assets/image/pc/report-empty.png" />
                <p>{{ $t('lang.projectExplorer.detail.noAudit') }}</p>
                <be-button
                  custom-class="eagle-btn"
                  round="4"
                  type="success"
                  @click="openRequestAudit"
                  >{{ $t('lang.request.title') }}
                </be-button>
              </div>
            </div>
          </div>
          <component
            :is="scoreItemComp"
            :data="scoreItemDetail"
            :has-token-address="hasTokenAddress"></component>
        </div>
      </div>
    </div>
    <!--  Decentralization    -->
    <div v-if="hasTokenAddress" class="project-detail-decent">
      <div class="project-detail--header">
        <title-cell
          :url="decentLogo"
          :sub-content="$t('lang.projectExplorer.detail.titleDecentSub')"
          :name="$t('lang.projectExplorer.detail.titleDecent')">
        </title-cell>
      </div>
      <whale-holders :project-id="projectId" :pie-data="whalePieData"></whale-holders>
    </div>
    <!--  Market Volatility    -->
    <div v-if="hasTokenAddress" class="project-detail-market">
      <div class="market-line--container">
        <div class="project-detail--header">
          <title-cell
            :sub-content="$t('lang.projectExplorer.detail.titleMarketSub')"
            :url="marketLogo"
            :name="$t('lang.projectExplorer.detail.titleMarket')">
          </title-cell>
        </div>
        <div class="market-line">
          <market-line :data="marketVolatilityData"></market-line>
        </div>
      </div>
      <market-govern :data="governData"></market-govern>
    </div>
    <div v-show="showRiskList && hasTokenAddress" class="project-detail-risk">
      <div class="project-detail--header">
        <title-cell
          :sub-content="$t('lang.projectExplorer.detail.titleRiskSub')"
          :url="riskLogo"
          :name="$t('lang.projectExplorer.detail.titleRisk')">
        </title-cell>
      </div>
      <div class="project-detail-risk--body">
        <risk-chart v-if="showRiskList && hasTokenAddress" :data="riskChartData"></risk-chart>
        <risk-list :project-id="projectId" @show="handleShowRiskList"></risk-list>
      </div>
    </div>
    <div v-show="showSecurityList && hasTokenAddress" class="project-detail-public-info">
      <div class="project-detail--header">
        <title-cell :url="security" :name="$t('lang.projectExplorer.detail.titleInfo')">
        </title-cell>
      </div>
      <security-list :param="projectId" @show="handleShowSecurityList"></security-list>
    </div>
    <div v-if="securityEventList.length > 0 && hasTokenAddress" class="project-detail-security">
      <div class="project-detail--header">
        <title-cell :url="security2" :name="$t('lang.projectExplorer.detail.titleSecurity')">
        </title-cell>
      </div>
      <security-info-card :data-list="securityEventList"></security-info-card>
    </div>
    <!--  Related Project    -->
    <relate-project v-if="relatedProject.length > 0" :data="relatedProject"></relate-project>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, onMounted, ref } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { useEventBus } from '@vueuse/core'
  import {
    BeButton,
    BeIcon,
    BeProgress,
    BeTag,
    // @ts-ignore
  } from '@eagle-eye/be-ui'
  import composition from '../../../utils/mixin/common-func'
  import {
    createSubscribe,
    deleteSubscribe,
    getContractReportList,
    getProjectSituation,
  } from '../../../api/project-explorer'
  import {
    accAdd,
    accSub,
    createDate,
    formatDate,
    formatTimeStamp,
    getStore,
    nFormats,
    numberToCommaString,
    openWindow,
  } from '../../../utils/common'
  import EllipsisCopy from '../../../components/common-components/ellipsis-copy/ellipsis-copy.vue'
  import config from '../../../enums/config'
  import IconCell from '../../../components/common-components/icon-cell/icon-cell.vue'
  import TitleCell from '../../../components/common-components/title-cell/title-cell.vue'
  import AreaLineCell from '../../../components/common-components/area-line-cell/area-line-cell.vue'
  import UpDown from '../../../components/common-components/up-down/up-down.vue'
  import BarCell from '../../../components/common-components/bar-cell/bar-cell.vue'
  import { webURL } from '../../../enums/link'
  import decentLogo from '../../../assets/image/pc/decent-logo.png'
  import marketLogo from '../../../assets/image/pc/market-logo.png'
  import riskLogo from '../../../assets/image/pc/risk-logo.png'
  import security from '../../../assets/image/pc/security.png'
  import security2 from '../../../assets/image/pc/security2.png'
  import ContactBar from '../../../components/common-components/contact-bar/contact-bar.vue'
  import ProjectNameCell from '../../../components/common-components/project-name-cell/project-name-cell.vue'
  import { setPrevUrl } from '../../../utils/request'
  import EmptyData from '../../../components/common-components/empty-data/empty-data.vue'
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
  import RelateProject from './components/related-project.vue'
  import type {
    IAuditList,
    IBaseInfo,
    IChainData,
    IGovern,
    IMarketVolatility,
    IProjectScore,
    IRelateProject,
    IRiskChartData,
    IScoreItems,
    ISecurityEventList,
    ITwitterAnalysis,
    IWhalePieData,
  } from '../../../utils/types'

  import type { IContractReport, IPublicOpinion } from '../../../api/project-explorer'
  export default defineComponent({
    name: 'ProjectSearchDetail',
    components: {
      EmptyData,
      RelateProject,
      ProjectNameCell,
      ContactBar,
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
      ProjectDetailPubliOpinion,
      BeIcon,
      BeTag,
      BeButton,
      BeProgress,
      EllipsisCopy,
    },
    setup() {
      const { message, route, msgBox, openWeb, isEmpty } = composition()

      const { t } = useI18n()
      const selectContract = ref<string>('')
      const handleContractSelect = (data: string): void => {
        openWindow(`${webURL[`${baseInfo.value.platform}_addr` as keyof typeof webURL]}${data}`)
        selectContract.value = ''
      }
      const baseLoading = ref<boolean>(false)
      const securityEventList = ref<Array<ISecurityEventList>>([])
      const marketVolatilityData = ref<IMarketVolatility>({
        token_price_data: {},
        token_transfer_data: {},
        liquidity_data: {},
        market_cap_data: {},
      })
      const governData = ref<IGovern>({})
      const riskChartData = ref<IRiskChartData>({})
      const projectScoreData = ref<IProjectScore>({})
      const scoreItemDetail = ref<IScoreItems>({
        market_volatility_score: '',
        diaphaneity_score: '',
        decentralization_score: '',
        risk_tx_score: '',
        audit_report_score: '',
      })
      const whalePieData = ref<IWhalePieData>({})
      const twitterAnalysisData = ref<ITwitterAnalysis>({
        ratio: 0,
        every_day_data: [],
      })
      const onChainData = ref<IChainData>({
        token_price: 0,
        token_price_ratio: 0,
        market_cap: 0,
        market_cap_ratio: 0,
        holders: 0,
        holders_ratio: 0,
        transactions: 0,
        transactions_ratio: 0,
      })
      const relatedProject = ref<Array<IRelateProject>>([])
      const scoreItemComp = ref<string>('')
      const baseInfo = ref<IBaseInfo>({})
      const hasTokenAddress = ref<boolean>(false)
      const getProSituData = async () => {
        const params: IPublicOpinion = {
          project_id: parseInt(projectId.value),
        }
        baseLoading.value = true
        getProjectSituation(params)
          .then(res => {
            if (!res) {
              baseLoading.value = true
              return
            }
            if (res) {
              securityEventList.value = res.data.security_event_list
              if (res.data.market_volatility) {
                marketVolatilityData.value = res.data.market_volatility
              }

              governData.value = res.data.social_profiles
              riskChartData.value = res.data.risk_tx_info
              projectScoreData.value = res.data.project_score
              relatedProject.value =
                res.data.relate_project && res.data.relate_project.length > 5
                  ? res.data.relate_project.slice(0, 5)
                  : res.data.relate_project
              if (res.data.twitter_analysis.following_info) {
                twitterAnalysisData.value = res.data.twitter_analysis.following_info
              }
              onChainData.value = res.data.on_chain
              baseInfo.value = res.data.details
              //  token_address 有值，开启显示开关
              if (baseInfo.value.token_address) {
                hasTokenAddress.value = true
              }
              if (res.data.decentralization) {
                whalePieData.value.total = nFormats(res.data.details.total_supply)
                const radio1To10 =
                  Math.floor(res.data.decentralization.token_info.top_1_10_ratio * 10000) / 10000
                const radio11To50 =
                  Math.floor(res.data.decentralization.token_info.top_11_50_ratio * 10000) / 10000
                const radio51To100 =
                  Math.floor(res.data.decentralization.token_info.top_51_100_ratio * 10000) / 10000

                const sum = accAdd(accAdd(radio1To10, radio11To50), radio51To100)
                whalePieData.value.chartData = [
                  {
                    feature: t('lang.projectExplorer.detail.whalePie1'),
                    color: '#1A589B',
                    ratio: radio1To10,
                  },
                  {
                    feature: t('lang.projectExplorer.detail.whalePie2'),
                    color: '#F3BA2F',
                    ratio: radio11To50,
                  },
                  {
                    feature: t('lang.projectExplorer.detail.whalePie3'),
                    color: '#0ED9AC',
                    ratio: radio51To100,
                  },
                  {
                    feature: 'other',
                    color: '#15263A',
                    ratio: accSub([1, sum]),
                  },
                ]
              }
              scoreItemDetail.value = {
                market_volatility_score: res.data.project_score.market_volatility_score,
                diaphaneity_score: res.data.project_score.diaphaneity_score,
                decentralization_score: res.data.project_score.decentralization_score,
                risk_tx_score: res.data.project_score.risk_tx_score,
                audit_report_score: res.data.project_score.audit_report_score,
              }
              // scoreItemDetail数据拿到后，加载 scoreItemComp 组件
              scoreItemComp.value = 'ScoreItem'
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
        //  await getContractStatistics()
        // 获取项目舆情安全数据
        //  await getPublicOpinionData()
      }
      /**
       * 获取Audit数据
       */
      const auditList = ref<Array<IAuditList>>([])
      const getAuditData = (): void => {
        const params: IContractReport = {
          project_id: parseInt(projectId.value),
        }
        const prevUrl = setPrevUrl()
        const baseURL = config.baseURL
        getContractReportList(params)
          .then((res: any) => {
            if (res && res.success) {
              auditList.value = res.data || []
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
      onMounted(() => {
        getProSituData()
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
            if (res && res.success) {
              msgBox(
                t('lang.subscribe.titleSuccess'),
                `${t('lang.subscribe.success')}(${res.data.email}).`,
                'subscribe'
              )
              baseInfo.value.is_subscribe = !baseInfo.value.is_subscribe
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
              baseInfo.value.is_subscribe = !baseInfo.value.is_subscribe
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
        if (baseInfo.value.is_subscribe) {
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
        getProSituData()
      })
      // 语种切换重新赋值一下 解决不更新问题
      // const busLanguage = useEventBus<string>('language')
      // busLanguage.on(() => {})
      const marketCapBaseInfo = computed(() => {
        return function (val: number) {
          return nFormats(val)
        }
      })
      const handleScoreColor = computed(() => {
        return function (val: number) {
          if (Number(val) >= 80) {
            return '#0ED9AC'
          }
          if (Number(val) < 80 && Number(val) > 60) {
            return '#F4CC29'
          }
          if (Number(val) <= 60) {
            return '#F32F2F'
          }
        }
      })
      const showSecurityList = ref<boolean>(true)
      const handleShowSecurityList = (data: boolean) => {
        showSecurityList.value = data
      }
      const showRiskList = ref<boolean>(true)
      const handleShowRiskList = (data: boolean) => {
        showRiskList.value = data
      }
      // 打开审计请求弹窗
      const busRequestAudit = useEventBus<string>('openRequestAudit')
      const openRequestAudit = (): void => {
        busRequestAudit.emit()
      }
      const busCreateProjectUser = useEventBus<string>('openCreateProjectUser')
      const openCreateProject = (): void => {
        busCreateProjectUser.emit()
      }
      const handleTokenAddress = computed(() => {
        return function (val: IBaseInfo) {
          return val.token_address_symbol ? val.token_address_symbol : val.token_address
        }
      })
      const tokenAddrTips = computed(() => {
        return () => {
          if (baseInfo.value.token_address_symbol && !baseInfo.value.token_address) {
            return `Token Address Symbol: ${baseInfo.value.token_address_symbol}`
          }
          if (!baseInfo.value.token_address_symbol && baseInfo.value.token_address) {
            return `Token Address: ${baseInfo.value.token_address}`
          }
          if (baseInfo.value.token_address_symbol && baseInfo.value.token_address) {
            return `Token Address Symbol: ${baseInfo.value.token_address_symbol}
                      Token Address: ${baseInfo.value.token_address}`
          }
          return ''
        }
      })
      return {
        tokenAddrTips,
        relatedProject,
        handleTokenAddress,
        openCreateProject,
        openRequestAudit,
        showRiskList,
        handleShowRiskList,
        showSecurityList,
        handleShowSecurityList,
        handleScoreColor,
        marketCapBaseInfo,
        getAuditData,
        auditList,
        handleSubscribe,
        openWeb,
        projectId,
        baseLoading,
        isEmpty,
        baseInfo,
        numberToCommaString,
        createDate,
        formatDate,
        openWindow,
        formatTimeStamp,
        nFormats,
        selectContract,
        securityEventList,
        marketVolatilityData,
        governData,
        riskChartData,
        projectScoreData,
        scoreItemDetail,
        scoreItemComp,
        twitterAnalysisData,
        onChainData,
        webURL,
        decentLogo,
        marketLogo,
        riskLogo,
        security,
        security2,
        whalePieData,
        handleContractSelect,
        hasTokenAddress,
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
    .project-detail-related,
    .project-detail-risk,
    .project-detail-market {
      @include common-container(32px);
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
      .contract-select {
        .el-input {
          width: 120px;
          .el-input__inner {
            width: 46px;
            flex-grow: initial;
          }
        }
        .el-input--prefix .el-input__inner {
          padding-left: 0;
        }
        .el-input--suffix .el-input__inner {
          padding-right: 0;
        }
        .el-input.is-focus .el-input__wrapper {
          box-shadow: none !important;
        }
        .el-input__wrapper.is-focus {
          box-shadow: none !important;
        }
        .el-input__wrapper {
          background-color: $textColor3;
          box-shadow: none;
          .el-input__inner {
            color: $mainColor7;
          }
        }
      }
    }
    .project-detail-base {
      .platform-tag-g {
        border: 0;
        padding: 4px 8px;
        height: 26px;
        border-radius: 4px;
        margin: 0 20px;
        background-color: rgba(167, 199, 214, 0.29);
        font-size: 14px;
        font-family: 'Barlow', sans-serif;
        font-weight: bold;
        color: #18304e;
        line-height: 17px;
      }
      .el-input {
        width: 160px;
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
      .join {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        p {
          font-size: 32px;
          font-family: 'Barlow', sans-serif;
          font-weight: bold;
          color: $textColor3;
          line-height: 38px;
          margin-bottom: 14px;
        }
      }
      .token-price-area {
        display: flex;

        .token-price-right {
          width: 200px;

          .token-price--title {
            font-size: 18px;
            font-family: 'Barlow', sans-serif;
            font-weight: bold;
            color: $textColor3;
            line-height: 22px;
            display: flex;
            align-items: center;
          }
          p[role='button'] {
            width: max-content;
            color: $textColor3;
            padding: 0 10px;
            height: 24px;
            line-height: 24px;
            cursor: pointer;
            display: flex;
            font-family: 'Barlow', sans-serif;
            align-items: center;
            background: rgba(167, 199, 214, 0.3);
            border-radius: 2px;
            margin-top: 16px;
            margin-bottom: 72px;
            .ellipsis-copy {
              min-width: initial !important;
            }
          }
          .token-price-val {
            font-size: 48px;
            font-family: 'Barlow', sans-serif;
            font-weight: bold;
            color: $textColor3;
            line-height: 58px;
            margin-bottom: 10px;
            width: min-content;
          }
        }
        .token-price-left {
          padding-left: 30px;
          width: calc(100% - 200px);
          p {
            font-size: 14px;
            font-family: 'Barlow', sans-serif;
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
          font-family: 'Barlow', sans-serif;
          font-weight: 400;
          color: $textColor3;
          line-height: 17px;
        }
        .uam-item-val {
          font-size: 24px;
          font-family: 'Barlow', sans-serif;
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
        .twitter-analysis--title {
          font-size: 20px;
          font-family: 'Barlow', sans-serif;
          font-weight: bold;
          color: $textColor3;
          line-height: 24px;
        }
        .twitter-analysis-right {
          width: 200px;
          img {
            margin-top: 56px;
            margin-bottom: 10px;
          }
        }
        .twitter-analysis-left {
          .empty-data {
            width: 120px;
            margin: 0 auto;
          }
          width: calc(100% - 200px);
          p {
            font-size: 14px;
            font-family: 'Barlow', sans-serif;
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
          font-family: 'Barlow', sans-serif;
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
          font-family: 'Barlow', sans-serif;
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
              font-family: 'Barlow', sans-serif;
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
              font-family: 'Barlow', sans-serif;
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
              font-family: 'Barlow', sans-serif;
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
                font-family: 'Barlow', sans-serif;
                font-weight: bold;
                color: $textColor3;
                line-height: 58px;
              }
              span {
                font-size: 16px;
                font-family: 'Barlow', sans-serif;
                font-weight: 400;
                color: #444444;
                line-height: 18px;
                display: flex;
                width: 130px;
              }
              .be-icon--container {
                position: relative;
                top: 0;
                left: 0;
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
      margin-left: 16px;
      border-radius: 4px !important;
      .be-button--slot {
        display: none;
      }
    }
    .subscribe-btn__as {
      background: $mainColor3;
    }
    .subscribe-btn__ed {
      color: $textColor3;
      background: transparent;
      border: 1px solid $textColor7;

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
      justify-content: space-between;
      .market-line--container {
        margin-right: 20px;
        width: 70%;
        .market-line {
          margin: 12px 0;
          background-color: $mainColor7;
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
        font-family: 'Barlow', sans-serif;
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
  /* 移动端预留 适配 */
  @media screen and (max-width: 1280px) {
    .project-search-detail {
      .project-detail-base,
      .project-detail-decent,
      .project-detail-public-info,
      .project-detail-security,
      .project-detail-related,
      .project-detail-risk,
      .project-detail-market {
        width: 92%;
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
      .project-detail-related,
      .project-detail-risk,
      .project-detail-market {
        width: 92%;
      }
    }
  }
  /*
  !* 125% 适配 *!
  @media screen and (min-width: 1328px) and (max-width: 1538px) {
    .project-search-detail {
      .project-detail-base,
      .project-detail-decent,
      .project-detail-public-info,
      .project-detail-security,
      .project-detail-related,
      .project-detail-risk,
      .project-detail-market {
        width: 80%;
      }
    }
  }
  !* 110% 适配 *!
  @media screen and (min-width: 1540px) and (max-width: 1750px) {
    .project-search-detail {
      .project-detail-base,
      .project-detail-decent,
      .project-detail-public-info,
      .project-detail-security,
      .project-detail-related,
      .project-detail-risk,
      .project-detail-market {
        width: 72%;
      }
    }
  }*/
</style>
