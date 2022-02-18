/*
* @project-ranking-projsitu.vue
* @deprecated 项目排行- 项目态势页面
* @author czh
* @update (czh 2021/11/29)
*/
<template>
    <div class="project-ranking-projsitu">
        <!--态势概要-->
        <div class="projsitu-item" style="margin-bottom: 20px">
            <div class="item-title">
                <h2>{{ projectInfo.name }}</h2>
                <span v-if="projectInfo.create_time">
                    {{ $t('lang.projectRinking.onlineTime') }}：
                     <el-tooltip placement="top" effect="light">
                             <template #content>
                                  <span slot="content">UTC：{{ beijing2utc(projectInfo.create_time) }}</span>
                             </template>
                            <span class="cursor">{{ formatDate(createDate(projectInfo.create_time)) }}</span>
                     </el-tooltip>
                </span>
            </div>
            <div class="projsitu-item-outline">
                <div class="outline-radar" id="outline_radar">
                    <div class='empty-data' v-if="staticPieData.length === 0" style="margin-top: 0">
                        <img class="img" src="@/assets/image/pc/empty-data.png" alt="" style="height: 180px;">
                        <p style="line-height: 25px">{{ $t('lang.emptyData') }}</p>
                    </div>
                </div>
                <div class="outline-info">
                    <h2>{{ $t('lang.projectRinking.outlineTitle') }}</h2>
                    <div class="outline-info-txt">
                        <div>
                            <span class="label">{{ $t('lang.projectRinking.staticDetection') }}:</span>
                            <span class='inner-text' v-html="outlineInfo.staticDetection"></span>
                        </div>
                        <div>
                            <span class="label">{{ $t('lang.projectRinking.txSecurity') }}:</span>
                            <span class='inner-text' v-html="outlineInfo.txSecurity"></span>
                        </div>
                        <div>
                            <span class="label">{{ $t('lang.projectRinking.txStability') }}:</span>
                            <span class='inner-text' v-html="outlineInfo.txStability"></span>
                        </div>
                        <div>
                            <span class="label">{{ $t('lang.projectRinking.feeling') }}:</span>
                            <span class='inner-text' v-html="outlineInfo.feeling"></span>
                        </div>
                    </div>
                    <p>*{{ $t('lang.sevenD') }}</p>
                </div>
            </div>
        </div>
        <!--合约安全-->
        <div class="projsitu-item">
            <div class="item-title">
                <h2>{{ $t('lang.projectRinking.contractSecurity') }}</h2>
            </div>
            <div :class="{
                        'projsitu-item-contractSecur':true,
                        'projsitu-item-hyaq':contractSecurity.length === 0
                    }"
                 v-loading='loadingCs'>
                <project-ranking-radar v-for="(item) in contractSecurity"
                                       :addr="item.contract_address"
                                       :safetyEvaluate="item.score.safety_evaluate"
                                       :platform="item.platform"
                                       :radar-data="radarDataCs(item.score)"
                                       :key="item.contract_address_id">
                </project-ranking-radar>
                <be-pagination
                    v-if="contractSecurity.length > 0"
                    custom-class="table-page"
                    :pageSize='pageParamsCs.pageSize'
                    :currentPage='pageParamsCs.currentPage'
                    :total='pageParamsCs.total'
                    @updatePage="pageChangeCs"
                    :is-front="false">
                    <template #prev>
                        <span class="table-page-info">{{ $t('lang.total') }}{{ pageParamsCs.total }}{{ $t('lang.piece') }}</span>
                    </template>
                    <template #next><span ></span></template>
                </be-pagination>
                <div class='empty-data' v-if="contractSecurity.length === 0" style="margin-top: 0">
                    <img class="img" src="@/assets/image/pc/empty-data.png" alt="" style="height: 180px;">
                    <p style="line-height: 25px">{{ $t('lang.emptyData') }}</p>
                </div>
            </div>
        </div>
        <!--市场表现-->
        <!--<div class="projsitu-item">
            <div class="item-title">
                <h2>{{ $t('lang.projectRinking.marketPerformance.headerTitle') }}</h2>
            </div>
            <div class="projsitu-item-market">
                <project-ranking-num-card v-for="(item) in marketPerformance"
                                          :key="item.title"
                                          :num="item.num"
                                          :title="item.title">
                </project-ranking-num-card>
            </div>
            <project-ranking-market-performance
                :tx-quantity="mpTxNum"
                :new-user="mpNewUserNum">
            </project-ranking-market-performance>
        </div>-->
        <!--舆情安全-->
        <div class="projsitu-item">
            <div class="item-title">
                <h2>{{ $t('lang.projectRinking.feelingSecurity') }}</h2>
            </div>
            <div :class="{
                        'projsitu-item-feelingSecurity':true,
                        'projsitu-item-hyaq':safetyData.length === 0
                    }"
                 v-loading="loadingFs">
                <project-ranking-safety-opinion
                    v-if="safetyData.length > 0"
                    :infoData="safetyData">
                </project-ranking-safety-opinion>
                <be-pagination
                    v-if="safetyData.length > 0"
                    custom-class="table-page"
                    :pageSize='pageParamsFs.pageSize'
                    :currentPage='pageParamsFs.currentPage'
                    :total='pageParamsFs.total'
                    @updatePage="pageChangeFs"
                    :is-front="false">
                    <template #prev>
                        <span class="table-page-info">{{ $t('lang.total') }}{{ pageParamsFs.total }}{{ $t('lang.piece') }}</span>
                    </template>
                    
                    <template #next><span ></span></template>
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

// import ProjectRankingNumCard from "./components/project-ranking-num-card";
import ProjectRankingRadar from "./components/project-ranking-radar.vue";
import ProjectRankingSafetyOpinion from "./components/project-ranking-safety-opinion.vue";
// import ProjectRankingMarketPerformance from "./components/project-ranking-market-performance";
import BePagination from "../../../components/common-components/pagination/be-pagination.vue";
import DataSet from "@antv/data-set";
import {Chart, registerGeometryLabelLayout} from "@antv/g2";
import {getContractSecurity, getPublicSentimentSecurity, ISentimentSecurity} from "../../../api/project-ranking";
import {computed, defineComponent, nextTick, onMounted, ref} from "vue";
import {IOption, IPageParam} from "../../../utils/types";
import composition from "../../../utils/mixin/common-func";
import {getStore,beijing2utc,createDate,formatDate} from '../../../utils/common'
import {useI18n} from "vue-i18n";
import {LabelItem} from "@antv/g2/src/geometry/label/interface";
import {IGroup} from "@antv/g2/src/dependents";
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
interface IProjectInfo {
    static_testing?:{score:number,text:string}
    tx_safety?:{score:number,text:string}
    tx_stability?:{score:number,text:string}
    safety_opinion?:{score:number,text:string}
    safety_evaluate?:number
}
interface IOutlineInfo {
    staticDetection?: string
    txSecurity?: string
    txStability?: string
    feeling?: string
}

export default defineComponent({
    name: "project-ranking-projsitu",
    components: {
        BePagination,
        // ProjectRankingNumCard,
        ProjectRankingRadar,
        ProjectRankingSafetyOpinion,
        // ProjectRankingMarketPerformance,
    },
    setup(props,ctx){
        const {message,route} = composition(props, ctx)
        const {t} = useI18n()
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
        const getPublicSentimentSecurData = ():void=> {
            safetyData.value = []
            loadingFs.value = true
            let params:ISentimentSecurity = {
                project_id: parseInt(projectId.value),
                page_num: pageParamsFs.value.pageNum,
                page_size: pageParamsFs.value.pageSize,
            }
            getPublicSentimentSecurity(params).then(res => {
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
            getPublicSentimentSecurData()
        }
        /**
         * 获取合约安全数据
         */
        // 合约安全数据
        const contractSecurity = ref<any>([])
        // 合约安全分页参数
        const pageParamsCs = ref<IPageParam>({
            currentPage: 1,
            pageNum: 1,
            pageSize: 5,
            total: 0
        })
        // 合约安全loading
        const loadingCs = ref<boolean>(false)
        const getContractSecurData = ():void=> {
            loadingCs.value = true
            let params = {
                project_id: parseInt(projectId.value),
                page_num: pageParamsCs.value.pageNum,
                page_size: pageParamsCs.value.pageSize,
            }
            getContractSecurity(params).then(res => {
                if (res) {
                    contractSecurity.value = res.data.page_infos
                    pageParamsCs.value.total = res.data.total
                    loadingCs.value = false
                }
            }).catch(err => {
                message('error', err.message || err)
                console.error(err)
            })
        }
        /**
         * 合约安全分页方法
         * @param {IPageParam} item - 分页参数对象
         */
        const pageChangeCs = (item:IPageParam):void=> {
            pageParamsCs.value.pageNum = item.currentPage
            pageParamsCs.value.currentPage = item.currentPage
            getContractSecurData()
        }
        /**
         * 获取项目态势详情数据
         */
        // 项目信息
        const projectInfo = ref<IProjectInfo>({})
        // 项目检测评分 雷达图数据
        const staticPieData = ref<Array<IOption>>([])
        // 项目安全评估
        const safetyEvaluatePieData = ref<number | undefined>(0)
        // 市场表现 基本数据
        const marketPerformance = ref<Array<IOption>>([])
        // 市場表現 交易量
        const mpTxNum = ref<Array<IOption>>([])
        // 市場表現 新增用户
        const mpNewUserNum = ref<Array<IOption>>([])
        const getProSituData  = async () => {
            // 这是在上级路由存储的数据
            const data = JSON.parse(getStore('ContractProjectTs') as string)
            if (!data) {
                resetData()
                return
            }
            // 项目态势基本信息
            projectInfo.value = data.project_info

            // 项目检测评分信息
            getOutLineData(projectInfo.value)
            // 项目检测评分雷达图
            staticPieData.value = [
                {key:'jtjc-staticDetection',item: t('lang.projectRinking.staticDetection'), a: projectInfo.value?.static_testing?.score},
                {key:'jyaq-txSecurity',item: t('lang.projectRinking.txSecurity'), a: projectInfo.value?.tx_safety?.score},
                {key:'jywd-txStability',item: t('lang.projectRinking.txStability'), a: projectInfo.value?.tx_stability?.score},
                {key:'yqaq-safetyPublicOptionClass',item: t('lang.systemConfigScore.safetyPublicOptionClass'), a: projectInfo.value?.safety_opinion?.score},
            ]
            safetyEvaluatePieData.value = projectInfo.value.safety_evaluate


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
            await getContractSecurData()
            // 获取舆情安全数据
            await getPublicSentimentSecurData()
        }
        /**
         * 获取概要数据
         */
        // 项目检测评分信息
        const outlineInfo = ref<IOutlineInfo>({
                staticDetection: '',
                txSecurity: '',
                txStability: '',
                feeling: ''
            })
        const getOutLineData = (data:IProjectInfo):void =>{
            outlineInfo.value.staticDetection = data?.static_testing?.text
            outlineInfo.value.txSecurity = data?.tx_safety?.text
            outlineInfo.value.txStability = data?.tx_stability?.text
            outlineInfo.value.feeling = data?.safety_opinion?.text
        }

        /**
         * 渲染概要雷達圖
         */
        const renderOutlineRadar = ():void=> {
            if (staticPieData.value.length === 0) {
                return
            }
            const {DataView} = DataSet;
            // 坐标label缓存
            const labelCache:any = []
            function limitInShape(items:LabelItem[], labels:IGroup[]) {
                labels.forEach((labelGroup) => {
                    labelGroup.cfg.children[0].cfg.visible = false
                    /*
                      const labelBBox = labelGroup.getCanvasBBox()
                    let offsetX = labelCache[index].point.x
                    let offsetY = labelCache[index].point.y
                    if(labelGroup.cfg.data.key === 'jtjc-staticDetection'){
                        offsetX = offsetX + labelBBox.width/2 + 8
                        offsetY = labelCache[index + 4].point.y / 2 + 8
                    }
                    if(labelGroup.cfg.data.key === 'jywd-txStability'){
                        offsetX = offsetX + labelBBox.width/2 + 8
                        offsetY = labelCache[index + 4].point.y + 16
                    }
                    if(labelGroup.cfg.data.key === 'jyaq-txSecurity'){
                        offsetY = offsetY + labelBBox.height/2 + 10
                        offsetX = offsetX - 10
                    }
                    if(labelGroup.cfg.data.key === 'yqaq-safetyPublicOptionClass'){
                        offsetY = offsetY + labelBBox.height/2 + 10
                        offsetX = offsetX - 8

                    }*/
                    // 添加分数label
                    /*labelGroup.addShape('text', {
                        attrs: {
                            x: offsetX,
                            y: offsetY,
                            text: items[index].data.score,
                            textBaseline: 'middle',
                            fill: '#1890FF',
                            fontWeight: 'bold',
                            fontSize: 16
                        },
                    })*/
                })

                chart.getCanvas().cfg.children[0].addShape('text', {
                    attrs: {
                        x: (labelCache[4].point.x + labelCache[6].point.x)/2,
                        y: (labelCache[4].point.y + labelCache[6].point.y)/2,
                        text: safetyEvaluatePieData.value,
                        textBaseline: 'middle',
                        fill: '#333333',
                        fontWeight: 'bold',
                        fontSize: 30
                    },
                })
            }
            // 注册 label 布局函数
            registerGeometryLabelLayout('limit-in-shape', limitInShape);
            const dv = new DataView().source(staticPieData.value);
            dv.transform({
                type: 'fold',
                fields: ['a'], // 展开字段集
                key: 'user', // 设置数据key对应展开字段-》 user:'a'
                value: 'score', // 设置数据value字段 对应展开字段-》 a:70 => score:70
            });
            const chart = new Chart({
                container: `outline_radar`,
                autoFit: true,
                height: 250,
                width:400,
                // padding: [20, 0, 20, 0],
                appendPadding: [20, 0, 20, 0]
            });
            chart.data(dv.rows);
            chart.scale('score', {
                min: 0,
                max: 100,
            });
            chart.coordinate('polar', {
                radius: 1,
            });
            // 坐标轴 - label文字
            chart.axis('item', {
                line: null,
                tickLine: null,
                grid: {
                    line: {
                        style: {
                            lineDash: null,
                        },
                    },
                },
                label: {
                    style: {
                        fontWeight: 'bold',
                        fontSize: 16,
                        fill:'black',
                        fontFamily:'PingFangSC-Medium, PingFang SC, sans-serif'
                    },
                    formatter: (text, item) => {
                        labelCache.push(JSON.parse(JSON.stringify(item)))
                        return text
                    }
                },
            });
            // 坐标轴 - 刻度
            chart.axis('score', {
                line: null,
                tickLine: null,
                grid: {
                    line: {
                        type: 'line',
                        style: {
                            lineDash: null,
                        },
                    },
                },
            });

            chart
                .line()
                .position('item*score')
                .color('#1890FF')
                .size(2)
                .label('item*score', {
                    autoRotate:false,
                    layout: {
                        type: 'limit-in-shape',
                    },
                });
            chart
                .point()
                .position('item*score')
                .color('white')
                .shape('circle')
                .size(4)
                .style({
                    stroke: '#1890FF',
                    lineWidth: 1,
                    fillOpacity: 1,
                });
            chart
                .area()
                .position('item*score')
                .color('#1890FF')

            chart.legend(false);
            chart.render();
        }
        /**
         * 数据重置
         */
        const resetData = ():void=> {
            // 合约安全数据
            contractSecurity.value = []
            // 合约安全分页参数
            pageParamsCs.value = {
                currentPage: 1,
                pageNum: 1,
                pageSize: 5,
                total: 0
            }
            // 舆情安全分页参数
            pageParamsFs.value = {
                currentPage: 1,
                pageNum: 1,
                pageSize: 5,
                total: 0
            }
            // 项目信息
            projectInfo.value = {}
            // 合约安全loading
            loadingCs.value = false
            // 舆情安全loading
            loadingFs.value = false
            // 项目id
            projectId.value = ''
            // 舆情安全数据
            safetyData.value = []

            projectInfo.value = {}
            outlineInfo.value = {
                staticDetection: t('lang.emptyData'),
                txSecurity:t('lang.emptyData'),
                txStability: t('lang.emptyData'),
                feeling: t('lang.emptyData'),
            }
            marketPerformance.value = [
                {title: t('lang.projectRinking.txSumNum'), num: t('lang.emptyData'),},
                {title: t('lang.projectRinking.userSumNum'), num: t('lang.emptyData'),},
                {title: t('lang.projectRinking.contractSumNum'), num: t('lang.emptyData'),},
            ]
            staticPieData.value = [
                { key:'jtjc-staticDetection',        item: '静态检测', a: 70, },
                { key:'jyaq-txSecurity',             item: '交易安全', a: 40 },
                { key:'jywd-txStability',            item: '交易稳定', a: 35 },
                { key:'yqaq-safetyPublicOptionClass',item: '风险舆情', a: 20 },
            ]
            safetyEvaluatePieData.value = 0
            mpTxNum.value = []
            mpNewUserNum.value = []
        }
        const radarDataCs = computed(()=>{
            return function (data:IProjectInfo){
                if (data) {
                    return [
                        {key:'jtjc-staticDetection',item: t('lang.projectRinking.staticDetection'), a: data.static_testing},
                        {key:'jyaq-txSecurity',item: t('lang.projectRinking.txSecurity'), a: data.tx_safety},
                        {key:'jywd-txStability',item: t('lang.projectRinking.txStability'), a: data.tx_stability},
                    ]
                }
                return []
            }
        })
        onMounted(()=>{
            const {param,project_id} = route.query
            projectId.value = (param || project_id) as string
            getProSituData()
            nextTick(() => {
                renderOutlineRadar()
            })
        })
        return {
            beijing2utc,
            createDate,
            formatDate,
            radarDataCs,
            getPublicSentimentSecurData,
            renderOutlineRadar,
            getProSituData,
            resetData,
            pageChangeCs,
            getContractSecurData,
            pageChangeFs,
            // 项目检测评分信息
            outlineInfo,
            // 项目检测评分 雷达图数据
            staticPieData,
            // 项目安全评估
            safetyEvaluatePieData,
            // 市场表现 基本数据
            marketPerformance,
            // 市場表現 交易量
            mpTxNum,
            // 市場表現 新增用户
            mpNewUserNum,
            // 合约安全数据
            contractSecurity,
            // 合约安全分页参数
            pageParamsCs,
            // 舆情安全分页参数
            pageParamsFs,
            // 项目信息
            projectInfo,
            // 合约安全loading
            loadingCs,
            // 舆情安全loading
            loadingFs,
            // 项目id
            projectId,
            // 舆情安全数据
            safetyData,
        }
    },
})

</script>

<style lang="scss">
.project-ranking-projsitu {

  .projsitu-item {

    .item-title {
      display: flex;
      align-items: center;
      margin-bottom: 16px;

      h2 {
        margin-right: 15px;
        font-family: PingFangSC-Medium, PingFang SC, sans-serif;
        color: $textColor3;
      }

      span {
        font-family: PingFangSC-Medium, PingFang SC, sans-serif;
        color: $textColor4;
      }
    }

    .projsitu-item-outline {
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

    .projsitu-item-contractSecur {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      margin-bottom: 24px;
    }

    .projsitu-item-hyaq {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 300px;
      background-color: $mainColor7;
    }

    .projsitu-item-feelingSecurity {
      box-sizing: border-box;
      padding-bottom: 15px;
    }

    .projsitu-item-market {
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