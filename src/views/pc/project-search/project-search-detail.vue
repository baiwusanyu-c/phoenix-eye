/*
* @project-search-detail.vue
* @deprecated 項目瀏覽器搜索詳情 - 項目態勢頁面
* @author czh
* @update (czh 2022/2/25)
*/
<template>
    <div class="project-search-detail">
        <!--基本信息-->
        <div class="proj-detail-item" style="margin-top: 32px">
            <div class="item-title">
                <h2>{{ $t('lang.projectExplorer.detail.title') }}</h2>
                <span style="margin-right: 6px">{{ $t('lang.projectExplorer.detail.riskTrx') }}(24h)  :  </span>
                <span
                    style="margin-right: 30px;font-size: 14px;font-weight: bold;color: #333">{{
                        baseInfo.riksTrxNum
                    }}</span>
                <span style="margin-right: 6px">{{
                        $t('lang.projectExplorer.detail.riskPublicOpinion')
                    }}(24h)  :  </span>
                <span
                    style="margin-right: 16px;font-size: 14px;font-weight: bold;color: #333">{{
                        baseInfo.riskPublicOpinion
                    }}</span>
            </div>
            <div class="base-info">
                <div class="base-info-item">
                    <p>{{ $t('lang.projectExplorer.detail.transactions') }}(24h)</p>
                    <span>{{ numberToCommaString(baseInfo.transactions) }}</span>
                </div>
                <div class="base-info-item">
                    <div style="flex: 1">
                        <p>{{ $t('lang.projectExplorer.detail.transactionsTotal') }}(24h)</p>
                        <span class="total">{{ numberToCommaString(baseInfo.transactionsTotal) }}</span>
                    </div>
                    <div style="flex: 1">
                        <p>{{ $t('lang.projectExplorer.detail.lastDate') }}(24h)</p>
                        <p class="date">{{ formatDate(createDate(baseInfo.lastTradeData))}}</p>
                        <p class="time">{{ formatTimeStamp(createDate(baseInfo.lastTradeData).getTime(),$i18n.locale) }}</p>
                    </div>
                </div>
                <div class="base-info-item">
                    <p>{{ $t('lang.projectExplorer.detail.socialProfiles') }}:</p>
                    <be-icon @click='openWindow(baseInfo.website)' v-if="baseInfo.website" role="button" width="50" height="60" icon="iconWebsiteEagle"></be-icon>
                    <be-icon @click='openWindow(baseInfo.twitter)' v-if="baseInfo.twitter" role="button" width="60" height="60" icon="iconTwitterEagle"></be-icon>
                    <be-icon @click='openWindow(baseInfo.telegram)' v-if="baseInfo.telegram" role="button" width="60" height="60" icon="iconTelegramEagle"></be-icon>
                    <be-icon @click='openWindow(baseInfo.github)' v-if="baseInfo.github" role="button" width="50" height="60" icon="iconGithubEagle"></be-icon>
                </div>
            </div>

        </div>
        <!--top5 数据表格-->
        <div class="proj-detail-item" style="display: flex">
            <project-detail-top style="margin-right: 16px"></project-detail-top>
            <project-detail-top></project-detail-top>
        </div>
        <!--风险交易-->
        <div class="proj-detail-item">
            <div class="item-title" style="margin-bottom: 0">
                <h2>{{ $t('lang.projectExplorer.detail.riskTrx') }}</h2>
            </div>
            <risk-trx-table></risk-trx-table>
        </div>
        <!--舆情安全-->
        <div class="proj-detail-item">
            <div class="item-title">
                <h2>{{ $t('lang.projectExplorer.detail.riskPublicOpinion') }}</h2>
            </div>
            <div :class="{
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
import {defineComponent, nextTick, onMounted, ref} from "vue";
import BePagination from "../../../components/common-components/pagination/be-pagination.vue";
import {IPageParam} from "../../../utils/types";
import {BeIcon} from "../../../../public/be-ui/be-ui.es";
import composition from "../../../utils/mixin/common-func";
import {useI18n} from "vue-i18n";
import ProjectDetailPubliOpinion from "./components/project-detail-public-opinion.vue";
import {getPublicOpinion, IPublicOpinion} from "../../../api/project-explorer";
import {numberToCommaString, createDate, formatDate, formatTimeStamp, openWindow} from "../../../utils/common";
import RiskTrxTable from "../risk-trx/components/risk-trx-table.vue";
import ProjectDetailTop from "./components/project-detail-top.vue";

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
}

export default defineComponent({
    name: "project-search-detail",
    components: {
        ProjectDetailTop,
        RiskTrxTable,
        BePagination,
        ProjectDetailPubliOpinion,
        BeIcon,
    },
    setup(props, ctx) {
        const {message, route} = composition(props, ctx)
        const {t} = useI18n()
        const baseInfo = ref<IBaseInfo>({})
        const getProSituData = async () => {
            // 获取项目详情数据
            baseInfo.value = {
                transactions: 1122,
                transactionsTotal: 24393035,
                lastTradeData: '2022-02-01T10:04:00.000+0000',
                riksTrxNum: 1234,
                riskPublicOpinion: 1234,
                github: 'string',
                telegram: 'string',
                twitter: 'string',
                website: 'string',
            }
            // 获取合约静态检测数据

            // 获取舆情安全数据
            await getPublicOpinionData()
        }
        // 项目id
        const projectId = ref<string>('')
        /**
         * 获取舆情安全数据
         */
            // 舆情安全数据
        const safetyData = ref<Array<ISafetyData>>([])
        // 舆情安全loading
        const loadingFs = ref<boolean>(false)
        // 舆情安全分页参数
        const pageParamsFs = ref<IPageParam>({
            currentPage: 1,
            pageNum: 1,
            pageSize: 5,
            total: 0
        })
        /**
         * 舆情安全数据获取方法
         */
        const getPublicOpinionData = (): void => {
            safetyData.value = []
            loadingFs.value = true
            let params: IPublicOpinion = {
                project_id: parseInt(projectId.value),
                page_num: pageParamsFs.value.pageNum,
                page_size: pageParamsFs.value.pageSize,
            }
            getPublicOpinion(params).then(res => {
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
         * 舆情安全分页方法
         * @param {IPageParam} item - 分页参数对象
         */
        const pageChangeFs = (item: IPageParam): void => {
            pageParamsFs.value.pageNum = item.currentPage
            pageParamsFs.value.currentPage = item.currentPage
            getPublicOpinionData()
        }
        onMounted(() => {
            const {param, id} = route.query
            projectId.value = (param || id) as string
            getProSituData()

        })
        return {
            baseInfo,
            pageChangeFs,
            getPublicOpinionData,
            safetyData,
            pageParamsFs,
            loadingFs,
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
        font-family: AlibabaPuHuiTi-Medium, AlibabaPuHuiTi sans-serif;
        font-size: 36px;
        font-weight: bold;
        color: $textColor3;
      }
    }

    .base-info-item:nth-child(2) {
      display: flex;
      flex: 2;
      margin-right: 20px;

      .total{
        font-family: AlibabaPuHuiTi-Medium, AlibabaPuHuiTi sans-serif;
        font-size: 24px;
        font-weight: bold;
        color: $textColor3;
      }

      .date{
        font-family: AlibabaPuHuiTi-Medium, AlibabaPuHuiTi sans-serif;
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
        font-family: AlibabaPuHuiTi-Medium, AlibabaPuHuiTi sans-serif;
        color: $textColor4;
      }
    }
  }


  .proj-detail-item {
    width: 67.5%;
    margin: 24px auto 0 auto;

    .item-title {
      display: flex;
      align-items: center;
      margin-bottom: 16px;

      h2 {
        margin-right: 15px;
        font-family: AlibabaPuHuiTi-Medium, AlibabaPuHuiTi sans-serif;
        color: $textColor3;
      }

      span {
        font-family: AlibabaPuHuiTi-Medium, AlibabaPuHuiTi sans-serif;
        color: $textColor4;
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


    .table-page {
      display: flex;
      align-items: center;
      justify-content: flex-end;

      .table-page-info {
        margin-top: 20px;
        font-size: 14px;
        color: $textColor4;
      }
    }
  }
}

</style>