/*
* @project-search-detail.vue
* @deprecated 項目瀏覽器搜索詳情 - 項目態勢頁面
* @author czh
* @update (czh 2022/2/25)
*/
<template>
    <div class="project-search-detail">
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

import composition from "../../../utils/mixin/common-func";
import {useI18n} from "vue-i18n";
import ProjectDetailPubliOpinion from "./components/project-detail-public-opinion.vue";
import {getPublicOpinion,IPublicOpinion} from "../../../api/project-explorer";
import {getStore} from "../../../utils/common";
import RiskTrxTable from "../risk-trx/components/risk-trx-table.vue";
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
export default defineComponent({
    name: "project-search-detail",
    components:{
        RiskTrxTable,
        BePagination,
        ProjectDetailPubliOpinion,
    },
    setup(props, ctx){
        const {message,route} = composition(props, ctx)
        const {t} = useI18n()
        const getProSituData  = async () => {
            // 这是在上级路由存储的数据
            //const data = JSON.parse(getStore('ContractProjectTs') as string)
            //if (!data) {
            //    resetData()
            //    return
            //}
            //// 项目态势基本信息
            //projectInfo.value = data.project_info
            //
            //// 项目检测评分信息
            //getOutLineData(projectInfo.value)
            //// 项目检测评分雷达图
            //staticPieData.value = [
            //    {key:'jtjc-staticDetection',item: t('lang.projectRinking.staticDetection'), a: projectInfo.value?.static_testing?.score},
            //    {key:'jyaq-txSecurity',item: t('lang.projectRinking.txSecurity'), a: projectInfo.value?.tx_safety?.score},
            //    {key:'jywd-txStability',item: t('lang.projectRinking.txStability'), a: projectInfo.value?.tx_stability?.score},
            //    {key:'yqaq-safetyPublicOptionClass',item: t('lang.systemConfigScore.safetyPublicOptionClass'), a: projectInfo.value?.safety_opinion?.score},
            //]
            //safetyEvaluatePieData.value = projectInfo.value.safety_evaluate


            // 市场表现数据
            /*this.marketPerformance = [
                {title: this.$t('lang.projectRinking.txSumNum'), num: data.market_performance.tx_total},
                {title: this.$t('lang.projectRinking.userSumNum'), num: data.market_performance.user_total},
                {title: this.$t('lang.projectRinking.contractSumNum'), num: data.market_performance.contract_total},
            ]*/
            // 市场表现图表数据
            // this.mpTxNum = data.market_performance.tx_amounts
            // this.mpNewUserNum = data.market_performance.new_user_nums
            // 获取合约安全数据
            //await getContractSecurData()
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
        const getPublicOpinionData = ():void=> {
            safetyData.value = []
            loadingFs.value = true
            let params:IPublicOpinion = {
                project_id: parseInt(projectId.value),
                page_num: pageParamsFs.value.pageNum,
                page_size: pageParamsFs.value.pageSize,
            }
            getPublicOpinion(params).then(res => {
                if (res) {
                    res.data.page_infos.forEach((val:any) => {
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
        const pageChangeFs = (item:IPageParam):void =>{
            pageParamsFs.value.pageNum = item.currentPage
            pageParamsFs.value.currentPage = item.currentPage
            getPublicOpinionData()
        }
        onMounted(()=>{
            const {param,project_id} = route.query
            projectId.value = (param || project_id) as string
            getProSituData()

        })
        return {
            getPublicOpinionData,
            safetyData,
            pageParamsFs,
            loadingFs,
        }
    }
})
</script>

<style lang="scss">
.project-search-detail{
  position: relative;
  top: 0;
  left: 0;
  z-index: 1;
  box-sizing: border-box;
  width: 100%;
  height: auto;
  min-height: calc(100% - 192px);
  padding-bottom: 86px;

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

    .proj-detail-item-outline {
      display: flex;

      .outline-radar {
        display: flex;
        flex: 1;
        align-items: center;
        justify-content: center;
        height: 400px;
        background: linear-gradient(90deg, #FFF 0%, #E3F2FF 100%);
      }

      .outline-info {
        box-sizing: border-box;
        flex: 1;
        height: 400px;
        padding: 40px 30px 20px 30px;
        background: $mainColor7;

        h2 {
          margin-bottom: 20px;
          font-family: PingFangSC-Medium, PingFang SC, sans-serif;
          color: $textColor3;
        }

        .outline-info-txt {
          height: 80%;

          div {
            display: flex;
            margin-bottom: 15px;

            .label {
              margin-right: 15px;
              font-family: PingFangSC-Medium, PingFang SC, sans-serif;
              font-weight: 500;
              color: $textColor3;
            }

            .inner-text {
              color: $textColor4;
            }
          }
        }

        .height-light {
          font-weight: bold;
          color: #FA6400
        }

        p {
          font-size: 12px;
          color: $mainColor14;
          text-align: right;
        }
      }
    }

    .proj-detail-item-contractSecur {
      display: flex;
      flex-wrap: wrap;
      justify-content: start;
      margin-bottom: 24px;
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

    .proj-detail-item-market {
      display: flex;
      justify-content: space-between;
      margin-bottom: 24px;
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