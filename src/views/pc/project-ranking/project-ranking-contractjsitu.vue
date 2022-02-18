/*
* @project-ranking-contractjsitu.vue
* @deprecated 项目排行- 合约态势页面
* @author czh
* @update (czh 2021/11/29)
*/
<template>
    <div class="project-ranking-contractjsitu">
        <!--态势概要-->
        <div class="contractjsitu-item" style="margin-bottom: 20px">
            <div class="item-res">
                {{ $t('lang.projectRinking.contract') }}：{{ resData.contract_info.contract_info || $t('lang.emptyData') }}
                <div class="platform-logo" style="margin-left: 15px;" v-if="resData.contract_info.platform">
                    <img :src="logoType(resData.contract_info.platform)" alt=""/>
                    {{ resData.contract_info.platform && resData.contract_info.platform.toUpperCase() }}
                </div>
            </div>
            <div class="item-res-tag" v-if="resData.contract_info.label && resData.contract_info.label.length > 0">
                <div class="platform-logo" v-for="(item) in resData.contract_info.label" :key="item">
                    {{ item }}
                </div>
            </div>
            <div class="contractjsitu-item-outline">
                <project-ranking-score-card
                    :title="$t('lang.projectRinking.safetyAssessment') + ':  ' +safetyEvaluate(resData.scores)"
                    :label-config="aqpgConfig"
                    :data="resData.scores">
                </project-ranking-score-card>
                <!--                <project-ranking-score-card :title="$t('lang.projectRinking.contractOverview')"
                                                            :label-config="hyGkConfig"
                                                            :data="resData.contract_profile"></project-ranking-score-card>-->
                <project-ranking-score-card :title="$t('lang.projectRinking.contractBalance')"
                                            :label-config="hyYeConfig"
                                             :platform="resData.contract_info && resData.contract_info.platform"
                                            :data="resData.contract_balance">
                </project-ranking-score-card>
            </div>
        </div>
        <!--静态检测-->
        <div class="contractjsitu-item">
            <div class="item-title">
                <h2>{{ $t('lang.projectRinking.staticDetection') }} </h2>
            </div>
            <div class="contractjsitu-item-static">
<!--                <p @click="openWeb(resData.contract_info.contract_info)">{{ $t('lang.detail') }} >></p>-->
                <div style="display: flex">
                    <div class="static-pie" id="static_pie" style="height: 300px">
                        <div v-if="pieData.length === 0" style="display: flex;flex-direction: column;align-items: center;justify-content: center">
                            <img class="img" src="@/assets/image/pc/empty-data.png" alt="">
                            <p style="line-height: 25px;color: #909399">{{ $t('lang.emptyData') }}</p>
                        </div>
                    </div>
                    <div class="static-bar" id="static_bar" >
                        <div v-if="pieData.length === 0"
                             style="position: absolute;left: 50%;display: flex;flex-direction: column;align-items: center;justify-content: center;transform: translateX(-50%)">
                            <img class="img" src="@/assets/image/pc/empty-data.png" alt="">
                            <p style="line-height: 25px;color: #909399">{{ $t('lang.emptyData') }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--交易安全-->
        <div class="contractjsitu-item">
            <div class="item-title">
                <h2>{{ $t('lang.projectRinking.txSecurity') }}</h2>
            </div>
            <div class="contractjsitu-item-tx-secur">
                <el-table
                    tooltip-effect="light"
                    :data="tableDataTxSecur"
                    v-loading="loadingTxS">
                    <template #empty>
                        <div class='empty-data'>
                            <img class="img" src="@/assets/image/pc/empty-data.png" alt="">
                            <p style="line-height: 25px">{{ $t('lang.emptyData') }}</p>
                        </div>
                    </template>
                    <el-table-column
                        prop="tx_hash"
                        :label="$t('lang.riskConfig.tableHeader.txHash')"
                        width="170"
                        align="center">
                        <template #default="scope">
                            <be-ellipsis-copy :targetStr="scope.row.tx_hash"
                                              fontLength="8"
                                              endLength="8">
                            </be-ellipsis-copy>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="tx_time"
                        :label="$t('lang.riskConfig.tableHeader.txTime')"
                        align="center">
                        <template #default="scope">
                            <el-tooltip placement="top" effect="light">
                                <template #content>
                                    <span>UTC：{{ beijing2utc(scope.row.tx_time) }}</span>
                                </template>
                                <span class="cursor">{{ formatDate(createDate(scope.row.tx_time)) }}</span>
                            </el-tooltip>
                        </template>
                    </el-table-column>
                    <el-table-column
                        width="100"
                        prop="tx_status"
                        :label="$t('lang.riskConfig.tableHeader.state')"
                        align="center">
                        <template #default="scope">
                        <span :style="stateSuccess(scope.row.tx_status)">
                            {{ stateTxt(scope.row.tx_status) }}
                        </span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="from_address"
                        width="170"
                        :label="$t('lang.riskConfig.tableHeader.from')"
                        align="center">
                        <template #default="scope">
                            <be-ellipsis-copy :targetStr="scope.row.from_address"
                                              v-if="!scope.row.from_address_tag"
                                              fontLength="8"
                                              endLength="8">
                            </be-ellipsis-copy>
                            <be-ellipsis-copy :targetStr="scope.row.from_address_tag"
                                              :copyContent="scope.row.from_address"
                                              :tooltipTxt="scope.row.from_address"
                                              v-if="scope.row.from_address_tag"
                                              :is-ellipsis="false"
                                              style="color: #1496F2"
                                              fontLength="8"
                                              endLength="8">
                            </be-ellipsis-copy>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="to_address"
                        width="170"
                        :label="$t('lang.riskConfig.tableHeader.to')"
                        align="center">
                        <template #default="scope">
                            <be-ellipsis-copy :targetStr="scope.row.to_address"
                                              v-if="!scope.row.to_address_tag"
                                              fontLength="8"
                                              endLength="8">
                            </be-ellipsis-copy>
                            <be-ellipsis-copy :targetStr="scope.row.to_address_tag"
                                              :tooltipTxt="scope.row.to_address"
                                              :copyContent="scope.row.to_address"
                                              v-if="scope.row.to_address_tag"
                                              :is-ellipsis="false"
                                              style="color: #1496F2"
                                              fontLength="8"
                                              endLength="8">
                            </be-ellipsis-copy>

                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="risk_features"
                        :label="$t('lang.projectRinking.txFeatures')"
                        align="center">
                        <template #default="scope">
                            <div
                                style="display: flex;flex-direction: column;align-items: center;justify-content: center"
                                v-if="scope.row.risk_features && scope.row.risk_features.length > 0 ">
                                <el-tag v-for="item in scope.row.risk_features"
                                        style="width: min-content;margin-top: 10px;"
                                        :key="item">{{ item }}
                                </el-tag>
                            </div>
                            <div
                                style="display: flex;flex-direction: column;align-items: center;justify-content: center"
                                v-else>{{ $t('lang.emptyData') }}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="risk_score"
                        :label="$t('lang.riskConfig.tableHeader.score')"
                        align="center"
                        show-overflow-tooltip>
                        <template #default="scope">
                            <span style="font-weight: bold">{{ scope.row.risk_score || $t('lang.emptyData') }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        width="100"
                        :label="$t('lang.riskConfig.tableHeader.detail')"
                        align="center">
                        <template #default="scope">
                        <span style="color: #1496F2;cursor: pointer"
                              @click="openDetail(scope.row)">{{ $t('lang.scan') }} >></span>
                        </template>
                    </el-table-column>
                </el-table>
                <be-pagination
                    custom-class="table-page"
                    :pageSize='pageParams.pageSize'
                    :currentPage='pageParams.currentPage'
                    :total='pageParams.total'
                    @updatePage="pageChange"
                    :is-front="false">
                    <template #prev>
                        <span class="table-page-info">{{ $t('lang.total') }}{{
                                pageParams.total
                            }}{{ $t('lang.piece') }}</span>
                    </template>
                    <template #next></template>
                </be-pagination>
            </div>
        </div>
        <!--交易稳定-->
        <div class="contractjsitu-item">
            <div class="item-title">
                <h2>{{ $t('lang.projectRinking.txStability') }}</h2>
            </div>
            <div class="contractjsitu-item-tx-stable" v-loading="loadingTxST">
                <project-ranking-trade-stability
                    :char-data="txStabilityChartData"
                    :select-data="txStabilitySelect">
                </project-ranking-trade-stability>
            </div>
        </div>
        <!--高频调用-->
        <!--        <div class="contractjsitu-item">
            <div class="item-title">
                <h2>{{ $t('lang.projectRinking.highCall') }}</h2>
            </div>
            <div class="contractjsitu-item-high-call">
                <el-table
                    tooltip-effect="light"
                    :data="tableDataHC"
                    v-loading="loadingHC"
                    ref="riskWarningList">
                    <div slot="empty"
                         class='empty-table'>
                        <img class="img" src="@/assets/image/pc/empty-data.png" alt="">
                        <p style="line-height: 25px">{{ $t('lang.emptyData') }}</p>
                    </div>
                    <el-table-column
                        prop="no"
                        :label="$t('lang.projectRinking.hCRanking')"
                        width="80"
                        align="center">
                        <template slot-scope="scope">
                            {{ scope.row.no }}
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="from_address"
                        :label="$t('lang.projectRinking.hCAddr')"
                        align="left">
                        <template slot-scope="scope">
                            <be-ellipsis-copy :targetStr="scope.row.from_address"
                                              fontLength="8"
                                              :is-ellipsis="false"
                                              endLength="8">
                            </be-ellipsis-copy>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="call_num"
                        :label="$t('lang.projectRinking.hCCallNum')"
                        align="center">
                        <template slot-scope="scope">
                            {{ scope.row.call_num }}
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>-->
    </div>
</template>

<script lang="ts">
import ProjectRankingScoreCard from "./components/project-ranking-score-card.vue";
import ProjectRankingTradeStability from "./components/project-ranking-trade-stability.vue";
import BePagination from "../../../components/common-components/pagination/be-pagination.vue";
import BeEllipsisCopy from "../../../components/common-components/ellipsis-copy/ellipsis-copy.vue"
import {Chart} from '@antv/g2';
import {getProjWarning} from "../../../api/risk-warning";
import {getTxStability} from "../../../api/project-ranking";
import {computed, defineComponent, nextTick, onMounted, ref} from "vue";
import {getStore,openWindow,formatDate,createDate,beijing2utc} from '../../../utils/common'
import {IOption, IPageParam} from "../../../utils/types";
import composition from "../../../utils/mixin/common-func";
import {useI18n} from "vue-i18n";
interface IImgCodeDict{
    [key:string]:any
}
export default defineComponent({
    name: "project-ranking-contractjsitu",
    components: {BePagination, ProjectRankingTradeStability, ProjectRankingScoreCard,BeEllipsisCopy},
    setup(props, ctx){
        const {message,route} = composition(props, ctx)
        const {t} = useI18n()
        const stateSuccess = computed(()=>{
            return function (val:string) {
                const lang = getStore('language')
                if (lang === 'zh_CN') {
                    if (val !== '成功') {
                        return {
                            color: '#FA6400'
                        }
                    }
                    return {
                        color: '#44D7B6'
                    }
                } else {
                    if (val !== 'success') {
                        return {
                            color: '#FA6400'
                        }
                    }
                    return {
                        color: '#44D7B6'
                    }
                }

            }
        })
        const stateTxt = computed(()=>{
            return function (val:string){
                const lang = getStore('language')
                if(lang === 'zh_CN'){
                    if(val !== '成功'){
                        return t('lang.riskConfig.stateFailed')
                    }
                    return t('lang.riskConfig.stateSuccess')
                }else{
                    if(val !== 'success'){
                        return t('lang.riskConfig.stateFailed')
                    }
                    return t('lang.riskConfig.stateSuccess')
                }
            }
        })
        // 圖片字典
        const imgImport = import.meta.globEager("../../../assets/image/pc/*-logo-bz.png");
        const imgCodeDict:IImgCodeDict = {
            'bsc': '',
            'heco': '',
            'eth': '',
            'polygon': '',
        }
        Object.keys(imgImport).forEach(val=>{
            if(/bsc/.test(val)){
                imgCodeDict.bsc = imgImport[val]
            }
            if(/heco/.test(val)){
                imgCodeDict.heco = imgImport[val]
            }
            if(/eth/.test(val)){
                imgCodeDict.eth = imgImport[val]
                imgCodeDict.polygon = imgImport[val]
            }
        })
        const logoType = computed(()=>{
            return function (platform:string) {
                return imgCodeDict[platform].default
            }
        })
        const safetyEvaluate = computed(()=>{
            return function (data:any) {
                return (data && data.safety_evaluate) ? data.safety_evaluate : ''
            }
        })
        /**
         * 打開交易分析詳情tab
         */
        const openDetail = (params: { tx_hash:string }) =>{
            openWindow(`#/riskWarning/detail?tx_hash=${params.tx_hash}`)
        }
        /**
         * 跳轉到頁面
         */
        const openWeb = (params:string) =>{
            openWindow(`#/riskWarning/detail?tx_hash=${params}`)
        }
        /**
         * 渲染静态检测饼图
         */
        // 饼图数据
        const pieData = ref<Array<{item:string,percent:number,count:number}>>([])
        const pieColor:IOption =  {
            '低危': '#5D7092',
            '中危': '#F6BD16',
            '高危': '#E8684A',
        }
        const renderStaticPie = ():void => {
            const chart = new Chart({
                container: 'static_pie',
                autoFit: true,
                height: 300,
            });
            chart.coordinate('theta', {
                radius: 0.75,
            });
            chart.data(pieData.value);
            chart.scale('percent', {
                formatter: (val) => {
                    val = val * 100 + '%';
                    return val;
                },
            });

            chart.tooltip({
                showTitle: false,
                showMarkers: false,
            });
            chart
                .interval()
                .position('percent')
                .color('item', (item) => {
                    return pieColor[item]
                })
                .label('percent', {
                    content: (data) => {
                        return `${data.item}: ${data.percent * 100}% `;
                    },
                })
                .adjust('stack');

            chart.interaction('element-active');

            chart.render();
        }
        /**
         * 渲染静态检测条形图
         */
        // 条形图
        const barData = ref<Array<{type:string,value:string | number}>>([])
        const renderStaticBar= ():void =>{
            if(barData.value.length === 0) return
            const chart = new Chart({
                container: 'static_bar',
                autoFit: true,
                height: 300,
            });
            chart.data(barData.value);
            let barD = JSON.parse(JSON.stringify(barData.value))
            chart.scale({
                value: {
                    max: barD.sort((a:any, b:any) => a.value - b.value).slice().pop().value,
                    min: 0,
                    alias: '问题数量',
                },
            });
            chart.axis('type', {
                title: null,
                tickLine: null,
                line: null,
            });

            chart.axis('value', {
                label: null,
                title: {
                    offset: 30,
                    style: {
                        fontSize: 12,
                        fontWeight: 300,
                    },
                },
            });
            chart.legend(false);
            chart.coordinate().transpose();
            chart
                .interval()
                .position('type*value')
                .size(26)
                .label('value', {
                    style: {
                        fill: '#8d8d8d',
                    },
                    offset: 10,
                });
            chart.interaction('element-active');
            chart.render();
        }
        /**
         * 获取交易安全数据
         */
        const loadingTxS = ref<boolean>()
        const pageParams = ref<IPageParam>({
            currentPage: 1,
                pageNum: 1,
                pageSize: 5,
                total: 0
        })
        const resData = ref<any>({contract_info:{}})
        // 交易安全表格数据
        const tableDataTxSecur = ref<Array<any>>([])
        const getTxSecurityData = ():void =>{
            loadingTxS.value = true
            let params = {
                page_num: pageParams.value.pageNum,
                page_size: pageParams.value.pageSize,
                platform: resData.value.contract_info.platform,
                contract_address: resData.value.contract_info.contract_info,
            }
            getProjWarning(params).then(res => {
                if (res) {
                    tableDataTxSecur.value = res.data.page_infos
                    pageParams.value.total = res.data.total
                    loadingTxS.value = false
                }
            }).catch(err => {
                loadingTxS.value = false
                message('error', err.message || err)
                console.error(err)
            })
        }
        /**
         * 分页方法
         * @param {Object} item - 分页参数对象
         */
        const pageChange = (item:IPageParam):void =>{
            pageParams.value.pageNum = item.currentPage
            pageParams.value.currentPage = item.currentPage
            getTxSecurityData()
        }
        /**
         * 获取交易稳定数据
         */
        const loadingTxST = ref<boolean>()
        //交易安全图表代币选择下拉
        const txStabilitySelect = ref<Array<string>>([])
        const txStabilityChartData = ref<{list:Array<any>}>({list:[]})
        const getTxStabilityData = ():void => {
            txStabilitySelect.value = Object.keys(resData.value.tx_stability)
            txStabilityChartData.value = {list:txStabilitySelect.value.map((val:string)=>{
                    resData.value.tx_stability[val].forEach((listData:any)=>{
                        let createTime:string = listData.create_time
                        listData.create_time = formatDate(createDate(createTime).toString())
                    })
                    return {token_name:val,list:resData.value.tx_stability[val]}
                })}
            loadingTxST.value = false
            /*const _this = this
            _this.loadingTxST = false
            let params = {
                contract_address:this.contractAddressId
            }
            getTxStability(params).then(res=>{
                if(res){
                    _this.txStabilitySelect = res.data.token_names
                    _this.txStabilityChartData = res.data.tx_data
                    _this.loadingTxST = false
                }
            }).catch(err=>{
                _this.loadingTxST = false
                _this.$message.error(err.message)
                console.error(err)
            })*/
        }
        /**
         * 获取合约态势详情数据
         */
        // 高频调用loading
        const loadingHC =  ref<boolean>(false)
        // 合约余额配置
        const hyYeConfig = ref<Array<IOption>>([])
        // 合约概况配置
        const hyGkConfig = ref<Array<IOption>>([])
        // 安全评估配置
        const aqpgConfig = ref<Array<IOption>>([])
        const tableDataHC = ref<Array<IOption>>([])
        const getContractSituData= async () => {
            // 重置数据
            resetData()
            loadingHC.value = true
            // 合约概况配置
            hyGkConfig.value = [
                {label: t('lang.projectRinking.txSumTotal'), val: 'tx_total'},
                {label: t('lang.projectRinking.callSumTotal'), val: 'call_total'},
                {label: t('lang.projectRinking.createTime'), val: 'create_time'},
            ]
            // 安全评估配置
            aqpgConfig.value = [
                {label: t('lang.projectRinking.staticDetection'), val: 'static_testing'},
                {label: t('lang.projectRinking.txSecurity'), val: 'tx_safety'},
                {label: t('lang.projectRinking.txStability'), val: 'tx_stability'},
            ]
            // 这是在上级路由存储的数据
            const data = JSON.parse(getStore('ContractProjectTs') as string)
            if (!data) {
                loadingHC.value = false
                return
            }
            // 合约基本信息数据
            resData.value = data
            // 合约余额配置
            if (resData.value.contract_balance) {
                Object.keys(resData.value.contract_balance).forEach((val,) => {
                    hyYeConfig.value.push({label: val, val: val, valKey: resData.value.contract_balance[val] + val + ''})
                })
            }
            // 静态检测餅圖数据
            const sum = resData.value.static_testing.high_risk_count + resData.value.static_testing.low_risk_count + resData.value.static_testing.middle_risk_count
            pieData.value = []
            if(sum > 0){
                pieData.value = [
                    {item: '低危', count: resData.value.static_testing.low_risk_count,percent: Number((resData.value.static_testing.low_risk_count/sum).toFixed(2))},
                    {item: '中危', count: resData.value.static_testing.middle_risk_count, percent: Number((resData.value.static_testing.middle_risk_count/sum).toFixed(2))},
                    {item: '高危', count: resData.value.static_testing.high_risk_count, percent: Number((resData.value.static_testing.high_risk_count/sum).toFixed(2))},
                ]
            }
            // 静态检测餅條形圖数据
            barData.value = []
            Object.keys(resData.value.static_testing.kind_count_map).forEach(val=>{
                barData.value.push( {type: val, value: resData.value.static_testing.kind_count_map[val]})
            })
            // 交易安全
            await getTxSecurityData()
            // 交易稳定
            loadingTxST.value = true
            await getTxStabilityData()
            // 高频调用数据
            // this.tableDataHC = data.high_call
            loadingHC.value = false
        }
        /**
         * 数据重置
         */
        const resetData = ():void => {
            resData.value = {contract_info:{}}
            tableDataTxSecur.value = []
            pageParams.value = {
                currentPage: 1,
                pageNum: 1,
                pageSize: 5,
                total: 0
            }
            tableDataHC.value = []
            loadingHC.value = false

            hyYeConfig.value = []
            hyGkConfig.value = []
            aqpgConfig.value = []
            loadingTxS.value = false
            loadingTxST.value = false
            txStabilitySelect.value = []
            txStabilityChartData.value = {list:[]}
        }
        const contractAddressId = ref<string>('')
        onMounted(()=>{
            const {param,contract_address_id} = route.query
            contractAddressId.value = (param || contract_address_id) as string
            getContractSituData()
            nextTick(()=>{
                renderStaticPie()
                renderStaticBar()
            })
        })
        return {
            formatDate,
            createDate,
            beijing2utc,
            stateSuccess,
            safetyEvaluate,
            stateTxt,
            logoType,
            pageChange,
            getTxStabilityData,
            getTxSecurityData,
            getContractSituData,
            resetData,
            renderStaticBar,
            renderStaticPie,
            openWeb,
            openDetail,

            // 合约基本信息
            resData,
            // 合约余额配置
            hyYeConfig,
            // 合约概况配置
            hyGkConfig,
            // 安全评估配置
            aqpgConfig,
            // 饼图数据
            pieData,
            // 条形图
            barData,
            // 饼图数据
            pieColor,
            // 合约地址id
            contractAddressId,
            // 交易安全表格数据
            tableDataTxSecur,
            // 交易安全表格loading
            loadingTxS,
            // 交易稳定loading
            loadingTxST,
            // 交易安全表格分页参数
            pageParams,
            // 高频调用表格数据
            tableDataHC,
            // 高频调用loading
            loadingHC,
            // 交易安全图表数据
            txStabilityChartData,
            //交易安全图表代币选择下拉
            txStabilitySelect,
        }
    },


})

</script>

<style lang="scss">
.project-ranking-contractjsitu {

  .contractjsitu-item {

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

    .item-res {
      display: flex;
      align-items: center;
      font-family: PingFangSC-Medium, PingFang SC, sans-serif;
      font-size: 20px;
    }

    .item-res-tag {
      display: flex;
      align-items: center;
      margin-top: 15px;
    }

    .platform-logo {
      height: 30px;
      padding: 5px;
      margin-right: 15px;
      font-family: PingFangSC-Medium, PingFang SC, sans-serif;
      font-size: 16px;
      line-height: 20px;
      background: $mainColor7;
      border: 1px solid rgba(0, 0, 0, .15);
      display: flex;
      align-items: center;
      img {
        width: 15px;
        height: 15px;
        margin-right: 5px;
        display: inline-block;
      }
    }

    .contractjsitu-item-outline {
      display: flex;
      justify-content: flex-start;
      margin-top: 15px;
    }

    .contractjsitu-item-static {
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      width: 100%;
      min-height: 300px;
      padding: 24px;
      margin-bottom: 24px;
      background: $mainColor7;

      .static-pie {
        flex: 1;
        height: 300px;
      }

      .static-bar {
        position: relative;
        top: 0;
        left: 0;
        flex: 1;
        height: 300px;
      }

      p {
        color: $mainColor15;
        text-align: right;
        cursor: pointer;
      }
    }

    .contractjsitu-item-tx-secur {
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
      justify-content: space-between;
      margin-bottom: 24px;

      .el-table thead {
        line-height: 34px;
      }
    }

    .contractjsitu-item-high-call {
      box-sizing: border-box;
      padding-bottom: 15px;

      .el-table thead {
        line-height: 34px;
      }
    }

    .contractjsitu-item-tx-stable {
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