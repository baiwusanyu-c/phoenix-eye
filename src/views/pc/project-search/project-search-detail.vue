/*
* @project-search-detail.vue
* @deprecated 項目瀏覽器搜索詳情 - 項目態勢頁面
* @author czh
* @update (czh 2022/2/25)
*/
<template>
    <div class="project-search-detail">
        <!--基本信息-->
        <div class="proj-detail-item" style="margin-top: 32px" v-loading="baseLoading">
            <div class="item-title">
                <h2>{{ isEmpty(baseInfo.name) }}</h2>
                <span style="margin-right: 6px">{{ $t('lang.projectExplorer.detail.riskTrx') }}(24h)  :  </span>
                <span
                    style="margin-right: 30px;font-size: 14px;font-weight: bold;color: #333">{{
                        isEmpty(baseInfo.riksTrxNum)
                    }}</span>
                <span style="margin-right: 6px">{{
                        $t('lang.projectExplorer.detail.riskPublicOpinion')
                    }}(24h)  :  </span>
                <span
                    style="margin-right: 16px;font-size: 14px;font-weight: bold;color: #333">{{
                        isEmpty(baseInfo.riskPublicOpinion)
                    }}</span>
            </div>
            <div class="base-info">
                <div class="base-info-item">
                    <p>{{ $t('lang.projectExplorer.detail.transactions') }}(24h)</p>
                    <span v-if="baseInfo.transactions">{{ numberToCommaString(baseInfo.transactions) }}</span>
                    <span v-if="!baseInfo.transactions">{{ $t('lang.emptyData') }}</span>
                </div>
                <div class="base-info-item">
                    <div style="flex: 1">
                        <p>{{ $t('lang.projectExplorer.detail.transactionsTotal') }}</p>
                        <span class="total" v-if="baseInfo.transactionsTotal">{{
                                numberToCommaString(baseInfo.transactionsTotal)
                            }}</span>
                        <span class="total" v-if="!baseInfo.transactionsTotal">{{ $t('lang.emptyData') }}</span>
                    </div>
                    <div style="flex: 1">
                        <p>{{ $t('lang.projectExplorer.detail.lastDate') }}</p>
                        <p class="date" v-if="baseInfo.lastTradeData">{{
                                formatDate(createDate(baseInfo.lastTradeData))
                            }}</p>
                        <p class="date" v-if="!baseInfo.lastTradeData">{{ $t('lang.emptyData') }}</p>
                        <p class="time" v-if="baseInfo.lastTradeData">{{
                                formatTimeStamp(createDate(baseInfo.lastTradeData).getTime(), $i18n.locale)
                            }}</p>
                    </div>
                </div>
                <div class="base-info-item">
                    <p>{{ $t('lang.projectExplorer.detail.socialProfiles') }}:</p>
                    <be-icon @click='openWindow(baseInfo.website)' v-if="baseInfo.website" role="button" width="50"
                             height="60" icon="iconWebsiteEagle"></be-icon>
                    <be-icon @click='openWindow(baseInfo.twitter)' v-if="baseInfo.twitter" role="button" width="60"
                             height="60" icon="iconTwitterEagle"></be-icon>
                    <be-icon @click='openWindow(baseInfo.telegram)' v-if="baseInfo.telegram" role="button" width="60"
                             height="60" icon="iconTelegramEagle"></be-icon>
                    <be-icon @click='openWindow(baseInfo.github)' v-if="baseInfo.github" role="button" width="50"
                             height="60" icon="iconGithubEagle"></be-icon>
                    <span class="total"
                          v-if="!baseInfo.website && !baseInfo.twitter && !baseInfo.telegram && !baseInfo.github">
                        {{ $t('lang.emptyData') }}
                    </span>
                </div>
            </div>

        </div>
        <!--合约统计-->
        <div class="proj-detail-item eagle-table" v-loading="statisticsLoading">
            <div class="item-title">
                <h2>{{ $t('lang.projectExplorer.detail.contractStatistics') }}</h2>
            </div>
            <div v-for="item in contractStatisticsData" class="contract-statistics" :key="item.contract_address">
                <div style="flex:1">
                    <div style="margin-bottom: 6px;">
                        <be-tag type="info">
                            <div class="flex items-center">
                                <span style="margin-left: 10px;">{{ item.platform.toUpperCase() }}</span>
                            </div>
                        </be-tag>
                        <span class="total">{{ item.token_name }}</span>
                    </div>
                    <be-ellipsis-copy :targetStr="item.contract_address"
                                      @click="item.contract_address ? openWeb(item.contract_address,'token',item.platform) : null"
                                      styles="color: #008EE9;cursor:pointer;font-weight:400"
                                      fontLength="8"
                                      endLength="8">
                    </be-ellipsis-copy>
                </div>
                <div style="flex:1">
                    <p class="contract-statistics-label">{{ $t('lang.projectExplorer.detail.transactions') }}(24h)</p>
                    <span>{{ numberToCommaString(item.tx_24) }}</span>
                </div>
                <div style="flex:1">
                    <p class="contract-statistics-label">{{ $t('lang.projectExplorer.detail.transactionsTotal') }}</p>
                    <span class="total">{{ numberToCommaString(item.tx_total) }}</span>
                </div>
                <div style="flex:1">
                    <p class="contract-statistics-label">{{ $t('lang.projectExplorer.detail.lastDate') }}</p>
                    <p class="date">{{ formatDate(createDate(item.latest_trading_date)) }}</p>
                </div>
            </div>
            <be-pagination
                v-if="contractStatisticsData.length > 0"
                custom-class="table-page"
                :pageSize='pageParamsTj.pageSize'
                :currentPage='pageParamsTj.currentPage'
                :total='pageParamsTj.total'
                @updatePage="pageChangeTj"
                :is-front="false">
                <template #prev>
                        <span class="table-page-info">
                        {{ $t('lang.total') }} {{ pageParamsTj.total }}</span>
                </template>
                <template #next><span></span></template>
            </be-pagination>
        </div>
        <!--top5 数据表格 :data=" top5TokenHolder"-->
        <div class="proj-detail-item" style="display: flex" v-loading="baseLoading">
            <project-detail-top
                :token-name="top5TokenHolderName"
                :token-address="top5TokenHolderAddr"
                types="holder"
                :data="top5TokenHolder"
                style="margin-right: 16px"
                @select="handleSelectTop5"
                :header="top5THTableHeader"
                :title="$t('lang.projectExplorer.detail.top5Title1')"
            >
            </project-detail-top>
            <project-detail-top
                :data="top5QuidityPairs"
                types="pairs"
                @select="handleSelectTop5"
                :header="top5QPTableHeader"
                :title="$t('lang.projectExplorer.detail.top5Title2')">
            </project-detail-top>
        </div>
        <!--风险交易-->
        <div class="proj-detail-item">
            <div class="item-title" style="margin-bottom: 0">
                <h2>{{ $t('lang.projectExplorer.detail.riskTrx') }}</h2>
            </div>
            <risk-trx-table :project-id="projectId"></risk-trx-table>
        </div>
        <!--项目舆情安全-->
        <div class="proj-detail-item">
            <div class="item-title">
                <h2>{{ $t('lang.projectExplorer.detail.riskPublicOpinion') }}</h2>
            </div>
            <div :class="{
                        'eagle-table':true,
                        'proj-detail-item-feelingSecurity':true,
                        'proj-detail-item-hyaq':safetyData.length === 0
                    }"
                 v-loading="loadingFs">
                <project-detail-publi-opinion
                    :infoData="safetyData"
                    v-if="safetyData.length > 0">
                </project-detail-publi-opinion>
                <be-pagination
                    v-if="safetyData.length > 0"
                    custom-class="table-page"
                    :pageSize='pageParamsFs.pageSize'
                    :currentPage='pageParamsFs.currentPage'
                    :total='pageParamsFs.total'
                    @updatePage="pageChangeFs"
                    :is-front="false">
                    <template #prev>
                        <span class="table-page-info">
                        {{ $t('lang.total') }} {{ pageParamsFs.total }}</span>
                    </template>
                    <template #next><span></span></template>
                </be-pagination>
                <div class='empty-data' v-if="safetyData.length === 0" style="margin-top: 0">
                    <img class="img" src="@/assets/image/pc/empty-data.png" alt="" style="height: 180px;">
                    <p style="line-height: 25px">{{ $t('lang.emptyData') }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {defineComponent, onMounted, ref} from "vue";
import BePagination from "../../../components/common-components/pagination/be-pagination.vue";
import {IPageParam} from "../../../utils/types";
import {BeIcon, BeTag} from "../../../../public/be-ui/be-ui.es";
import composition from "../../../utils/mixin/common-func";
import {useI18n} from "vue-i18n";
import ProjectDetailPubliOpinion from "./components/project-detail-public-opinion.vue";
import {
    getProjectSituation,
    getProjectSituationStatistics,
    getPublicOpinion,
    IPublicOpinion
} from "../../../api/project-explorer";
import {numberToCommaString, createDate, formatDate, formatTimeStamp, openWindow} from "../../../utils/common";
import RiskTrxTable from "../risk-trx/components/risk-trx-table.vue";
import ProjectDetailTop, {ITableHeader} from "./components/project-detail-top.vue";
import BeEllipsisCopy from "../../../components/common-components/ellipsis-copy/ellipsis-copy.vue"
import {useEventBus} from "@vueuse/core";
import {webURL} from "../../../enums/link";
import { onBeforeRouteUpdate } from "vue-router";


interface ISafetyData {
    negative?: string
    negativeMsg?: string
    sourceUrl?: string
    title?: string
    message?: string
    from?: string
    time?: string
    label?: string
}

interface IContractStatistics {
    contract_address: string,
    token_name: string,
    platform: string
    tx_24?: number | string,
    tx_total?: number | string,
    latest_trading_date?: string,
}

interface IBaseInfo {
    transactions?: number | string,
    transactionsTotal?: number | string,
    lastTradeData?: string,
    riksTrxNum?: number | string,
    riskPublicOpinion?: number | string,
    github?: string
    telegram?: string
    twitter?: string
    website?: string
    name?: string
}

interface ITop5TokenHolder {
    address?: string,
    percentage?: number,
    quantity?: string,
}

interface ITop5QuidityPairs extends ITop5TokenHolder {
    pair?: string
}

interface ITop5QuiditySelect {
    platform?: string
    records: Array<any>
}

interface ITop5TokenHolderSelect {
    token_address?: string
    token_name?: string
    platform?: string
    records: Array<any>
}

export default defineComponent({
    name: "project-search-detail",
    components: {
        ProjectDetailTop,
        RiskTrxTable,
        BePagination,
        ProjectDetailPubliOpinion,
        BeIcon,
        BeTag,
        BeEllipsisCopy,
    },
    setup(props, ctx) {
        const {message, route, isEmpty} = composition(props, ctx)
        const {t} = useI18n()
        const baseInfo = ref<IBaseInfo>({})

        const top5TokenHolder = ref<Array<ITop5TokenHolder>>([])
        const top5TokenHolderAddr = ref<string>('')
        const top5TokenHolderName = ref<string>('')
        // top5表格header
        const top5THTableHeader = ref<Array<ITableHeader>>([
            {prop: 'address', label: t('lang.projectExplorer.detail.address')},
            {prop: 'percentage', label: t('lang.projectExplorer.detail.percentage')},
            {prop: 'quantity', label: t('lang.projectExplorer.detail.quantity')},
        ])
        const top5QPTableHeader = ref<Array<ITableHeader>>([
            {prop: 'address', label: t('lang.projectExplorer.detail.address')},
            {prop: 'percentage', label: t('lang.projectExplorer.detail.percentage')},
            {prop: 'quantity', label: t('lang.projectExplorer.detail.quantity')},
            {prop: 'pair', label: t('lang.projectExplorer.detail.pair')},
        ])
        const top5QuidityPairs = ref<Array<ITop5QuidityPairs>>([])
        const top5QuiditySelect = ref<Array<ITop5QuiditySelect>>([])
        const top5TokenHolderSelect = ref<Array<ITop5TokenHolderSelect>>([])
        const handleSelectTop5 = (params: { platform: string, type: string }): void => {
            // top5数据
            if (params.type === 'holder') {
                top5TokenHolder.value = []
                top5TokenHolderSelect.value && top5TokenHolderSelect.value.forEach((val: any) => {
                    if (val.platform === params.platform) {
                        top5TokenHolder.value = val.records
                        top5TokenHolderAddr.value = val.token_address
                        top5TokenHolderName.value = val.token_name
                    }
                })
            }
            if (params.type === 'pairs') {
                top5QuidityPairs.value = []
                top5QuiditySelect.value && top5QuiditySelect.value.forEach((val: any) => {
                    if (val.platform === params.platform) {
                        top5QuidityPairs.value = val.records
                    }
                })
            }
        }
        const baseLoading = ref<boolean>(false)
        const getProSituData = async () => {
            let params: IPublicOpinion = {
                project_id: parseInt(projectId.value),
            }
            baseLoading.value = true
            getProjectSituation(params).then(res => {
                if(!res){return}
                if (res) {
                    // 获取项目详情数据
                    baseInfo.value = {
                        transactions: res.data.details.tx_24,
                        transactionsTotal: res.data.details.tx_total,
                        lastTradeData: res.data.details.latest_trading_date,
                        riksTrxNum: res.data.details.risk_tx_24,
                        riskPublicOpinion: res.data.details.risk_public_opinion_24,
                        name: res.data.details.name,
                        github: res.data.social_profiles.github,
                        telegram: res.data.social_profiles.telegram,
                        twitter: res.data.social_profiles.twitter,
                        website: res.data.social_profiles.website,
                    }
                    // top5数据
                    top5TokenHolderSelect.value = res.data.top_5_token_holders
                    handleSelectTop5({platform: 'bsc', type: 'holder'})
                    top5QuiditySelect.value = res.data.top_5_liquidity_pairs_holders
                    handleSelectTop5({platform: 'bsc', type: 'pairs'})
                }
                baseLoading.value = false
            }).catch(err => {
                baseLoading.value = false
                message('error', err.message || err)
                console.error(err)
            })

            // 获取合约静态检测数据
            await getContractStatistics()
            // 获取项目舆情安全数据
            await getPublicOpinionData()
        }
        // 项目id
        const projectId = ref<string>('')
        const {param, id} = route.query
        projectId.value = (param || id) as string
        /**
         * 获取项目合约统计数据
         */
        const contractStatisticsData = ref<Array<IContractStatistics>>([])
        const pageParamsTj = ref<IPageParam>({
            currentPage: 1,
            pageSize: 3,
            total: 0
        })
        const statisticsLoading = ref<boolean>(false)
        const getContractStatistics = (): void => {
            const params: IPublicOpinion = {
                project_id: projectId.value,
                page_num: pageParamsTj.value.currentPage,
                page_size: pageParamsTj.value.pageSize,
            }
            statisticsLoading.value = true
            getProjectSituationStatistics(params).then(res => {
                if(!res){return}
                if (res) {
                    contractStatisticsData.value = res.data.page_infos
                    pageParamsTj.value = res.data.total
                }
                statisticsLoading.value = false
            }).catch(err => {
                statisticsLoading.value = false
                message('error', err.message || err)
                console.error(err)
            })
        }
        /**
         * 项目舆情安全分页方法
         * @param {IPageParam} item - 分页参数对象
         */
        const pageChangeTj = (item: IPageParam): void => {
            pageParamsTj.value.currentPage = item.currentPage
            getContractStatistics()
        }
        /**
         * 获取项目舆情安全数据
         */
            // 项目舆情安全数据
        const safetyData = ref<Array<ISafetyData>>([])
        // 项目舆情安全loading
        const loadingFs = ref<boolean>(false)
        // 项目舆情安全分页参数
        const pageParamsFs = ref<IPageParam>({
            currentPage: 1,
            pageSize: 5,
            total: 0
        })
        /**
         * 项目舆情安全数据获取方法
         */
        const getPublicOpinionData = (): void => {
            safetyData.value = []
            loadingFs.value = true
            let params: IPublicOpinion = {
                project_id: parseInt(projectId.value),
                page_num: pageParamsFs.value.currentPage,
                page_size: pageParamsFs.value.pageSize,
            }
            getPublicOpinion(params).then(res => {
                if(!res){return}
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
            }).catch(err => {
                loadingFs.value = false
                message('error', err.message || err)
                console.error(err)
            })
        }
        /**
         * 项目舆情安全分页方法
         * @param {IPageParam} item - 分页参数对象
         */
        const pageChangeFs = (item: IPageParam): void => {
            pageParamsFs.value.currentPage = item.currentPage
            getPublicOpinionData()
        }
        onMounted(() => {
            getProSituData()

        })
        onBeforeRouteUpdate((to) => {
            const {param, id} = to.query
            projectId.value = (param || id) as string
            pageParamsTj.value = {
                currentPage: 1,
                pageSize: 3,
                total: 0
            }
            pageParamsFs.value = {
                currentPage: 1,
                pageSize: 5,
                total: 0
            }
            getProSituData()
        });

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
         * 跳轉到第三方頁面
         */
        const openWeb = (params: string, type: string, platform: string): void => {
            if (!params || params === 'eth' || params === 'bnb' || params === 'ht' || params === 'matic') return
            let mainUrl: string = (webURL as any)[`${platform}_${type}`] as string
            const url = `${mainUrl}${params}`
            openWindow(url)
        }
        return {
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
            pageChangeFs,
            pageParamsTj,
            pageChangeTj,
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
    }
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

  .base-info {
    display: flex;
    width: 100%;

    .base-info-item:nth-child(1) {
      margin-right: 20px;
      background: linear-gradient(90deg, #FFF 0%, #E5F3F2 100%);

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
        @apply shadow-xl
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


  .proj-detail-item {
    width: 70%;
    margin: 24px auto 0 auto;

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
      height: 88px;
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
          @apply shadow
                }
      }

      .contract-statistics-label {
        margin-bottom: 12px;
        font-family: AlibabaPuHuiTi-Medium, sans-serif;
        color: $textColor4;
      }

      span, .date {
        font-family: AlibabaPuHuiTi-Medium, sans-serif;
        font-size: 16px;
        font-weight: bold;
        color: $textColor3;
      }


      &:hover {
        @apply shadow-md
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

</style>