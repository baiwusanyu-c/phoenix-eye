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
             合约：{{resData.addr}}
              <div class="platform-logo" style="margin-left: 15px;">
                  <img :src="logoType(resData.platform)"/>
                  {{resData.platform && resData.platform.toUpperCase()}}
              </div>
            </div>
            <div class="item-res-tag">
                <div class="platform-logo" v-for="(item) in resData.tagList" :key="item">
                    {{item}}
                </div>
            </div>
            <div class="contractjsitu-item-outline">
               <project-ranking-score-card title="安全评估 value" :label-config="aqpgConfig" :data="aqpgData"></project-ranking-score-card>
               <project-ranking-score-card title="合约概况" :label-config="hyGkConfig" :data="hyGkData"></project-ranking-score-card>
               <project-ranking-score-card title="合约余额" :label-config="hyYeConfig" :data="hyYeData"></project-ranking-score-card>
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
                <h2>{{ $t('el.projectRinking.txSecurity') }} value</h2>
            </div>
            <div class="contractjsitu-item-tx-secur">
                <el-table
                    tooltip-effect="light"
                    :data="tableDataTxSecur"
                    v-loading="loading"
                    ref="riskWarningList">
                    <div slot="empty"
                         class = 'empty-table'>
                        <img class="img" src="@/assets/image/pc/empty-data.png" alt="">
                        <p style="line-height: 25px">{{$t('el.emptyData')}}</p>
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
                                <span slot="content">UTC：{{beijing2utc(scope.row.tx_time)}}</span>
                                <span class="cursor">{{formatDate($createDate(scope.row.tx_time))}}</span>
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
                            {{stateTxt(scope.row.tx_status)}}
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
                            <span style="color: #1496F2" v-if="scope.row.from_address_tag">{{scope.row.from_tag}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="to_address"
                        width="170"
                        :label="$t('el.riskConfig.tableHeader.to')"
                        align="center" >
                        <template slot-scope="scope">
                            <be-ellipsis-copy :targetStr="scope.row.to_address"
                                              v-if="!scope.row.to_address_tag"
                                              fontLength="8"
                                              endLength="8">
                            </be-ellipsis-copy>
                            <span style="color: #1496F2" v-if="scope.row.to_address_tag">{{scope.row.to_address_tag}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="risk_features"
                        :label="$t('el.riskConfig.features')"
                        align="center">
                        <template slot-scope="scope">
                            <div style="display: flex;flex-direction: column;justify-content: center;align-items: center"
                                 v-if="scope.row.risk_features && scope.row.risk_features.length > 0 ">
                                <el-tag v-for="item in scope.row.risk_features"
                                        style="margin-top: 10px;width: min-content;"
                                        :key="item">{{item}}</el-tag>
                            </div>
                            <div style="display: flex;flex-direction: column;justify-content: center;align-items: center" v-else>暂无</div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="risk_score"
                        :label="$t('el.riskConfig.tableHeader.score')"
                        align="center"
                        show-overflow-tooltip>
                        <template slot-scope="scope">
                            <span style="font-weight: bold">{{scope.row.risk_score || '暂无'}}</span>
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
                    <span slot="prev" class="table-page-info">共计{{pageParams.total}}条</span>
                    <span slot="next"></span>
                </be-pagination>
            </div>
        </div>
        <!--交易稳定-->
        <div class="contractjsitu-item">
            <div class="item-title">
                <h2>{{ $t('el.projectRinking.txStability') }} value</h2>
            </div>
            <div class="contractjsitu-item-tx-stable">
              <project-ranking-trade-stability></project-ranking-trade-stability>
            </div>
        </div>
        <!--高频调用-->
        <div class="contractjsitu-item">
            <div class="item-title">
                <h2>{{ $t('el.projectRinking.highCall') }} value</h2>
            </div>
            <div class="contractjsitu-item-high-call">
                <el-table
                    tooltip-effect="light"
                    :data="tableData"
                    v-loading="loading"
                    ref="riskWarningList">
                    <div slot="empty"
                         class = 'empty-table'>
                        <img class="img" src="@/assets/image/pc/empty-data.png" alt="">
                        <p style="line-height: 25px">{{$t('el.emptyData')}}</p>
                    </div>
                    <el-table-column
                        prop="no"
                        :label="$t('el.projectRinking.hCRanking')"
                        width="80"
                        align="center">
                        <template slot-scope="scope">
                            {{scope.row.no}}
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="addr"
                        :label="$t('el.projectRinking.hCAddr')"
                        align="center">
                        <template slot-scope="scope">
                            <be-ellipsis-copy :targetStr="scope.row.addr"
                                              fontLength="8"
                                              :is-ellipsis="false"
                                              endLength="8">
                            </be-ellipsis-copy>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="num"
                        :label="$t('el.projectRinking.hCCallNum')"
                        align="center">
                        <template slot-scope="scope">
                            {{scope.row.num}}
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
import { Chart } from '@antv/g2';
export default {
    name: "project-ranking-contractjsitu",
    components: {BePagination, ProjectRankingTradeStability, ProjectRankingScoreCard},
    data() {
        return {
            loading:false,
            resData:{
                addr:'0x9b3dedee4534fee9dbecd6238df2c6a77804f331',
                platform:'bsc',
                tagList:['PancakeSwap','lable1','lable2','lable3']
            },
            // 合约余额配置
            hyYeConfig:[
                {label:'BNB',val:'tx_num'},
                {label:'代币1',val:'call_num'},
                {label:'代币2',val:'time'},
            ],
            // 合约概况配置
            hyGkConfig:[
                {label:'总交易数',val:'tx_num'},
                {label:'总调用数',val:'call_num'},
                {label:'创建时间',val:'time'},
            ],
            // 安全评估配置
            aqpgConfig:[
                {label:'静态检测',val:'tx_num'},
                {label:'交易安全',val:'call_num'},
                {label:'交易稳定',val:'time'},
            ],
            // 合约余额数据
            hyYeData:{
                'tx_num':'123456',
                'call_num':'12345',
                'time':'2011.11.11.12:30'
            },
            // 合约概况数据
            hyGkData:{
                'tx_num':'123456',
                'call_num':'12345',
                'time':'2011.11.11.12:30'
            },
            // 安全评估数据
            aqpgData:{
                'tx_num':'123456',
                'call_num':'冲冲冲',
                'time':'2011.11.11.12:30'
            },
            // 幣種字典
            imgCodeDict:{
                bsc: require('@/assets/image/pc/bsc.png'),
                heco: require('@/assets/image/pc/heco.png'),
                eth: require('@/assets/image/pc/eth.png'),
                polygon: require('@/assets/image/pc/heco.png'),
            },
            // 表格數據
            tableData:[],
            // 交易安全表格数据
            tableDataTxSecur:[],
            // 分页参数
            pageParams:{
                currentPage: 1,
                pageNum: 1,
                pageSize: 5,
                total: 0
            },
            // 饼图数据
            pieData:[
                { item: '低危', count: 40, percent: 0.4 },
                { item: '中危', count: 21, percent: 0.21 },
                { item: '高危', count: 17, percent: 0.17 },
            ],
            // 条形图
            barData:[
                { type: '代码规范', value: 34 },
                { type: '函数调用', value: 85 },
                { type: '业务逻辑', value: 103 },
                { type: '溢出检测', value: 142 },
                { type: '异常可达状态', value: 251 },
                { type: 'ERC20规范', value: 367 },
            ],
            // 饼图数据
            pieColor: {
                '低危':'#5D7092',
                '中危':'#F6BD16',
                '高危':'#E8684A',
            }
        }
    },
    computed:{
        logoType(){
            return function (platform){
                return this.imgCodeDict[platform]
            }

        }
    },
    mounted() {
        // this.$nextTick(()=>{
        //     this.renderStaticPie()
        //     this.renderStaticBar()
        // })
    },
    methods: {
        /**
         * 分页方法
         * @param {Object} item - 分页参数对象
         */
        pageChange(item){
            this.pageParams.pageNum = item.currentPage
            this.pageParams.currentPage = item.currentPage

        },
        /**
         * 打開交易分析詳情tab
         */
        openDetail(params){
            this.$openWindow(`#/riskWarning/detail?tx_hash=${params.tx_hash}`, 'view_window')
        },
        /**
         * 跳轉到第三方頁面
         */
        openWeb(){

        },
        /**
         * 渲染静态检测饼图
         */
        renderStaticPie(){
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
                .color('item',(item)=>{
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
        renderStaticBar(){
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
                font-family: PingFangSC-Medium, PingFang SC,sans-serif;
                color: $textColor3;
                margin-right: 15px;
            }

            span {
                font-family: PingFangSC-Medium, PingFang SC,sans-serif;
                color: $textColor4;
            }
        }
        .item-res{
            display: flex;
            align-items: center;
            font-family: PingFangSC-Medium, PingFang SC,sans-serif;
            font-size: 20px;
        }
        .item-res-tag{
            display: flex;
            align-items: center;
            margin-top: 15px;
        }
        .platform-logo{
            height: 20px;
            background: $mainColor7;
            line-height: 20px;
            padding: 5px;
            border:1px solid rgba(0, 0, 0, 0.15);
            font-size: 16px;
            margin-right: 15px;
            font-family: PingFangSC-Medium, PingFang SC,sans-serif;
            img{
                height: 15px;
                width: 15px;
            }
        }
        .contractjsitu-item-outline{
            display: flex;
            margin-top: 15px;
            justify-content: space-between;
        }
        .contractjsitu-item-static{
            display: flex;
            width: 100%;
            flex-direction: column;
            background: $mainColor7;
            padding: 24px;
            box-sizing: border-box;
            min-height: 300px;
            margin-bottom: 24px;
            .static-pie{
                flex: 1;
            }
            .static-bar{
                flex: 1;
            }
            p{
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
            .el-table thead{
                line-height: 34px;
            }
        }
        .contractjsitu-item-high-call{
            padding-bottom: 15px;
            box-sizing: border-box;
            .el-table thead{
                line-height: 34px;
            }
        }
        .contractjsitu-item-tx-stable{
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