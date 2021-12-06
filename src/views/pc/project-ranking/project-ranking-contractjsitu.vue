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
                {{ $t('el.projectRinking.contract') }}：{{ resData.contract_address || $t('el.emptyData') }}
                <div class="platform-logo" style="margin-left: 15px;" v-if="resData.platform">
                    <img :src="logoType(resData.platform)" alt=""/>
                    {{ resData.platform && resData.platform.toUpperCase() }}
                </div>
            </div>
            <div class="item-res-tag">
                <div class="platform-logo" v-for="(item) in resData.label" :key="item">
                    {{ item }}
                </div>
            </div>
            <div class="contractjsitu-item-outline">
                <project-ranking-score-card :title="$t('el.projectRinking.safetyAssessment') +  safetyEvaluate(resData.scores)"
                                            :label-config="aqpgConfig"
                                            :data="resData.scores"></project-ranking-score-card>
                <project-ranking-score-card :title="$t('el.projectRinking.contractOverview')"
                                            :label-config="hyGkConfig"
                                            :data="resData.contract_profile"></project-ranking-score-card>
                <project-ranking-score-card :title="$t('el.projectRinking.contractBalance')"
                                            :label-config="hyYeConfig"
                                            :data="resData.contract_balance"></project-ranking-score-card>
            </div>
        </div>
        <!--静态检测-->
        <!--        <div class="contractjsitu-item">
            <div class="item-title">
                <h2>{{ $t('el.projectRinking.staticDetection') }} value</h2>
            </div>
            <div class="contractjsitu-item-static">
               <p @click="openWeb">{{ $t('el.detail') }} >></p>
                <div style="display: flex">
                    <div class="static-pie" id="static_pie"></div>
                    <div class="static-bar" id="static_bar"></div>
                </div>
            </div>
        </div>-->
        <!--交易安全-->
        <div class="contractjsitu-item">
            <div class="item-title">
                <h2>{{ $t('el.projectRinking.txSecurity') }}</h2>
            </div>
            <div class="contractjsitu-item-tx-secur">
                <el-table
                    tooltip-effect="light"
                    :data="tableDataTxSecur"
                    v-loading="loadingTxS">
                    <div slot="empty"
                         class='empty-table'>
                        <img class="img" src="@/assets/image/pc/empty-data.png" alt="">
                        <p style="line-height: 25px">{{ $t('el.emptyData') }}</p>
                    </div>
                    <el-table-column
                        prop="tx_hash"
                        :label="$t('el.riskConfig.tableHeader.txHash')"
                        width="170"
                        align="center">
                        <template slot-scope="scope">
                            <be-ellipsis-copy :targetStr="scope.row.tx_hash"
                                              fontLength="8"
                                              endLength="8">
                            </be-ellipsis-copy>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="tx_time"
                        :label="$t('el.riskConfig.tableHeader.txTime')"
                        align="center">
                        <template slot-scope="scope">
                            <el-tooltip placement="top" effect="light">
                                <span slot="content">UTC：{{ beijing2utc(scope.row.tx_time) }}</span>
                                <span class="cursor">{{ formatDate($createDate(scope.row.tx_time)) }}</span>
                            </el-tooltip>
                        </template>
                    </el-table-column>
                    <el-table-column
                        width="100"
                        prop="tx_status"
                        :label="$t('el.riskConfig.tableHeader.state')"
                        align="center">
                        <template slot-scope="scope">
                        <span :style="stateSuccess(scope.row.tx_status)">
                            {{ stateTxt(scope.row.tx_status) }}
                        </span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="from_address"
                        width="170"
                        :label="$t('el.riskConfig.tableHeader.from')"
                        align="center">
                        <template slot-scope="scope">
                            <be-ellipsis-copy :targetStr="scope.row.from_address"
                                              v-if="!scope.row.from_address_tag"
                                              fontLength="8"
                                              endLength="8">
                            </be-ellipsis-copy>
                            <span style="color: #1496F2"
                                  v-if="scope.row.from_address_tag">{{ scope.row.from_tag }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="to_address"
                        width="170"
                        :label="$t('el.riskConfig.tableHeader.to')"
                        align="center">
                        <template slot-scope="scope">
                            <be-ellipsis-copy :targetStr="scope.row.to_address"
                                              v-if="!scope.row.to_address_tag"
                                              fontLength="8"
                                              endLength="8">
                            </be-ellipsis-copy>
                            <span style="color: #1496F2"
                                  v-if="scope.row.to_address_tag">{{ scope.row.to_address_tag }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="risk_features"
                        :label="$t('el.projectRinking.txFeatures')"
                        align="center">
                        <template slot-scope="scope">
                            <div
                                style="display: flex;flex-direction: column;justify-content: center;align-items: center"
                                v-if="scope.row.risk_features && scope.row.risk_features.length > 0 ">
                                <el-tag v-for="item in scope.row.risk_features"
                                        style="margin-top: 10px;width: min-content;"
                                        :key="item">{{ item }}
                                </el-tag>
                            </div>
                            <div style="display: flex;flex-direction: column;justify-content: center;align-items: center"
                                v-else>{{ $t('el.emptyData') }}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="risk_score"
                        :label="$t('el.riskConfig.tableHeader.score')"
                        align="center"
                        show-overflow-tooltip>
                        <template slot-scope="scope">
                            <span style="font-weight: bold">{{ scope.row.risk_score || $t('el.emptyData') }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        width="100"
                        :label="$t('el.riskConfig.tableHeader.detail')"
                        align="center">
                        <template slot-scope="scope">
                        <span style="color: #1496F2;cursor: pointer"
                              @click="openDetail(scope.row)">{{ $t('el.scan') }} >></span>
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
                    <span slot="prev" class="table-page-info">{{ $t('el.total') }}{{ pageParams.total }}{{ $t('el.piece') }}</span>
                    <span slot="next"></span>
                </be-pagination>
            </div>
        </div>
        <!--交易稳定   :char-data="txStabilityChartData" :select-data="txStabilitySelect"-->
        <div class="contractjsitu-item" >
            <div class="item-title">
                <h2>{{ $t('el.projectRinking.txStability') }}</h2>
            </div>
            <div class="contractjsitu-item-tx-stable" v-loading="loadingTxST">
                <project-ranking-trade-stability
                    :char-data="{token_name:'bsc',list:[{date:'2021-12-06',tx_money:10}]}"
                    :select-data="['bsc','heco']">
                </project-ranking-trade-stability>
            </div>
        </div>
        <!--高频调用-->
        <div class="contractjsitu-item">
            <div class="item-title">
                <h2>{{ $t('el.projectRinking.highCall') }}</h2>
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
                        <p style="line-height: 25px">{{ $t('el.emptyData') }}</p>
                    </div>
                    <el-table-column
                        prop="no"
                        :label="$t('el.projectRinking.hCRanking')"
                        width="80"
                        align="center">
                        <template slot-scope="scope">
                            {{ scope.row.no }}
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="from_address"
                        :label="$t('el.projectRinking.hCAddr')"
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
                        :label="$t('el.projectRinking.hCCallNum')"
                        align="center">
                        <template slot-scope="scope">
                            {{ scope.row.call_num }}
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
    </div>
</template>

<script>
import ProjectRankingScoreCard from "./components/project-ranking-score-card";
import ProjectRankingTradeStability from "./components/project-ranking-trade-stability";
import BePagination from "../../../components/common-components/pagination/be-pagination";
import {Chart} from '@antv/g2';
import {getProjWarning} from "../../../api/risk-warning";
import {getTxStability} from "../../../api/project-ranking";

export default {
    name: "project-ranking-contractjsitu",
    components: {BePagination, ProjectRankingTradeStability, ProjectRankingScoreCard},
    data() {
        return {
            loading: false,
            // 合约基本信息
            resData: {},
            // 合约余额配置
            hyYeConfig: [],
            // 合约概况配置
            hyGkConfig: [],
            // 安全评估配置
            aqpgConfig: [],
            // 幣種字典
            imgCodeDict: {
                bsc: require('@/assets/image/pc/bsc.png'),
                heco: require('@/assets/image/pc/heco.png'),
                eth: require('@/assets/image/pc/eth.png'),
                polygon: require('@/assets/image/pc/heco.png'),
            },

            // 饼图数据
            pieData: [
                {item: '低危', count: 40, percent: 0.4},
                {item: '中危', count: 21, percent: 0.21},
                {item: '高危', count: 17, percent: 0.17},
            ],
            // 条形图
            barData: [
                {type: '代码规范', value: 34},
                {type: '函数调用', value: 85},
                {type: '业务逻辑', value: 103},
                {type: '溢出检测', value: 142},
                {type: '异常可达状态', value: 251},
                {type: 'ERC20规范', value: 367},
            ],
            // 饼图数据
            pieColor: {
                '低危': '#5D7092',
                '中危': '#F6BD16',
                '高危': '#E8684A',
            },


            // 合约地址id
            contractAddressId: '',
            // 交易安全表格数据
            tableDataTxSecur: [],
            // 交易安全表格loading
            loadingTxS:false,
            // 交易稳定loading
            loadingTxST:false,
            // 交易安全表格分页参数
            pageParams: {
                currentPage: 1,
                pageNum: 1,
                pageSize: 5,
                total: 0
            },
            // 高频调用表格数据
            tableDataHC:[],
            // 高频调用loading
            loadingHC:false,
            // 交易安全图表数据
            txStabilityChartData: {},
            //交易安全图表代币选择下拉
            txStabilitySelect:[]


        }
    },
    computed: {
        logoType() {
            return function (platform) {
                return this.imgCodeDict[platform]
            }
        },
        safetyEvaluate(){
            return function (data) {
                return (data && data.safety_evaluate) ? data.safety_evaluate : ''
            }
        }
    },
    mounted() {
        this.contractAddressId = this.$route.query.param || this.$route.query.contract_address_id
        this.getContractSituData()
        // this.$nextTick(()=>{
        //     this.renderStaticPie()
        //     this.renderStaticBar()
        // })
    },
    methods: {
        /**
         * 打開交易分析詳情tab
         */
        openDetail(params) {
            this.$openWindow(`#/riskWarning/detail?tx_hash=${params.tx_hash}`, 'view_window')
        },
        /**
         * 跳轉到頁面
         */
        openWeb(params) {
            this.$openWindow(`#/riskWarning/detail?tx_hash=${params.tx_hash}`, 'view_window')
        },
        /**
         * 渲染静态检测饼图
         */
        renderStaticPie() {
            const chart = new Chart({
                container: 'static_pie',
                autoFit: true,
                height: 300,
            });
            chart.coordinate('theta', {
                radius: 0.75,
            });
            chart.data(this.pieData);
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
                    return this.pieColor[item]
                })
                .label('percent', {
                    content: (data) => {
                        return `${data.item}: ${data.percent * 100}% `;
                    },
                })
                .adjust('stack');

            chart.interaction('element-active');

            chart.render();
        },
        /**
         * 渲染静态检测条形图
         */
        renderStaticBar() {
            const chart = new Chart({
                container: 'static_bar',
                autoFit: true,
                height: 300,
            });
            chart.data(this.barData);
            chart.scale({
                value: {
                    max: 500,
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
        },
        /**
         * 数据重置
         */
        resetData() {
            this.resData = {}
            this.tableDataTxSecur = []
            this.pageParams = {
                currentPage: 1,
                pageNum: 1,
                pageSize: 5,
                total: 0
            }
            this.tableDataHC = []
            this.loadingHC = false
            this.loading = false
            this.hyYeConfig = []
            this.hyGkConfig = []
            this.aqpgConfig = []
            this.loadingTxS = false
            this.loadingTxST = false
            this.txStabilitySelect = []
            this.txStabilityChartData = {}
        },
        /**
         * 获取合约态势详情数据
         */
        async getContractSituData() {
            // 重置数据
            this.resetData()
            this.loadingHC = true
            // 合约概况配置
            this.hyGkConfig = [
                {label: this.$t('el.projectRinking.txSumTotal'), val: 'tx_total'},
                {label: this.$t('el.projectRinking.callSumTotal'), val: 'call_total'},
                {label: this.$t('el.projectRinking.createTime'), val: 'create_time'},
            ]
            // 安全评估配置
            this.aqpgConfig = [
                {label: this.$t('el.projectRinking.staticDetection'), val: 'static_testing'},
                {label: this.$t('el.projectRinking.txSecurity'), val: 'tx_safety'},
                {label: this.$t('el.projectRinking.txStability'), val: 'tx_stability'},
            ]
            // 这是在上级路由存储的数据
            const data = JSON.parse(this.getStore('ContractProjectTs'))
            if (!data) {
                this.loadingHC = false
                return
            }
            // 合约基本信息数据
            this.resData = data.contract_info
            // 合约余额配置
            if(this.resData.contract_balance){
                this.resData.contract_balance.forEach((val,index)=>{
                    this.hyYeConfig.push( {label: val.token_name, val:index,valKey:val.balance})
                })
            }

            // 交易安全
            await this.getTxSecurityData()
            // 交易稳定
            await this.getTxStabilityData()
            // 高频调用数据
            this.tableDataHC = data.high_call
            this.loadingHC = false
        },
        /**
         * 获取交易安全数据
         */
         getTxSecurityData(){
            const _this = this
            _this.loadingTxS = true
            let params = {
                page_num:this.pageParams.pageNum,
                page_size:this.pageParams.pageSize,
                platform:this.resData.platform,
            }
            getProjWarning(params).then(res=>{
                if(res){
                    _this.tableDataTxSecur = res.data.page_infos
                    _this.pageParams.total =  res.data.total
                    _this.loadingTxS = false
                }
            }).catch(err=>{
                _this.loadingTxS = false
                _this.$message.error(err.message)
                console.error(err)
            })
        },
        /**
         * 获取交易稳定数据
         */
        getTxStabilityData(){
            const _this = this
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
            })
        },
        /**
         * 分页方法
         * @param {Object} item - 分页参数对象
         */
        pageChange(item) {
            this.pageParams.pageNum = item.currentPage
            this.pageParams.currentPage = item.currentPage
            this.getTxSecurityData()
        },
    },
}
</script>

<style lang="scss">
.project-ranking-contractjsitu {
    .contractjsitu-item {
        .item-title {
            display: flex;
            align-items: center;
            margin-bottom: 16px;

            h2 {
                font-family: PingFangSC-Medium, PingFang SC, sans-serif;
                color: $textColor3;
                margin-right: 15px;
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
            height: 20px;
            background: $mainColor7;
            line-height: 20px;
            padding: 5px;
            border: 1px solid rgba(0, 0, 0, 0.15);
            font-size: 16px;
            margin-right: 15px;
            font-family: PingFangSC-Medium, PingFang SC, sans-serif;

            img {
                height: 15px;
                width: 15px;
            }
        }

        .contractjsitu-item-outline {
            display: flex;
            margin-top: 15px;
            justify-content: space-between;
        }

        .contractjsitu-item-static {
            display: flex;
            width: 100%;
            flex-direction: column;
            background: $mainColor7;
            padding: 24px;
            box-sizing: border-box;
            min-height: 300px;
            margin-bottom: 24px;

            .static-pie {
                flex: 1;
            }

            .static-bar {
                flex: 1;
            }

            p {
                cursor: pointer;
                text-align: right;
                color: $mainColor15;
            }
        }

        .contractjsitu-item-tx-secur {
            display: flex;
            justify-content: space-between;
            flex-direction: column;
            margin-bottom: 24px;
            flex-wrap: wrap;

            .el-table thead {
                line-height: 34px;
            }
        }

        .contractjsitu-item-high-call {
            padding-bottom: 15px;
            box-sizing: border-box;

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
            justify-content: flex-end;
            align-items: center;

            .table-page-info {
                font-size: 14px;
                margin-top: 20px;
                color: $textColor4;
            }
        }
    }
}

</style>