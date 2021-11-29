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
                <h2>PancakeSwap</h2>
                <span>{{ $t('el.projectRinking.onlineTime') }}：2020/10/10</span>
            </div>
            <div class="projsitu-item-outline">
                <div class="outline-radar" id="outline_radar"></div>
                <div class="outline-info">
                    <h2>{{ $t('el.projectRinking.outlineTitle') }}</h2>
                    <div class="outline-info-txt">
                        <div>
                            <span class="label">{{ $t('el.projectRinking.staticDetection') }}:</span>
                            <span class='inner-text' v-html="outlineInfo.staticDetection"></span>
                        </div>
                        <div>
                            <span class="label">{{ $t('el.projectRinking.txSecurity') }}:</span>
                            <span class='inner-text' v-html="outlineInfo.txSecurity"></span>
                        </div>
                        <div>
                            <span class="label">{{ $t('el.projectRinking.txStability') }}:</span>
                            <span class='inner-text' v-html="outlineInfo.txStability"></span>
                        </div>
                        <div>
                            <span class="label">{{ $t('el.projectRinking.feeling') }}:</span>
                            <span class='inner-text' v-html="outlineInfo.feeling"></span>
                        </div>
                    </div>
                    <p>*{{ $t('el.sevenD') }}</p>
                </div>
            </div>
        </div>
        <!--合约安全-->
        <div class="projsitu-item">
            <div class="item-title">
                <h2>{{ $t('el.projectRinking.contractSecurity') }}</h2>
            </div>
            <div class="projsitu-item-contractSecur">
                <project-ranking-radar v-for="(item) in contractSecurity"
                                       :addr="item.addr"
                                       :platform="item.platform"
                                       :key="item.addr">
                </project-ranking-radar>
                <be-pagination
                    custom-class="table-page"
                    :pageSize='pageParamsCs.pageSize'
                    :currentPage='pageParamsCs.currentPage'
                    :total='pageParamsCs.total'
                    @updatePage="pageChangeCs"
                    :is-front="false">
                    <span slot="prev" class="table-page-info">共计{{pageParamsCs.total}}条</span>
                    <span slot="next"></span>
                </be-pagination>
            </div>
        </div>
        <!--市场表现-->
        <div class="projsitu-item">
            <div class="item-title">
                <h2>{{ $t('el.projectRinking.marketPerformance.headerTitle') }}</h2>
            </div>
            <div class="projsitu-item-market">
                <project-ranking-num-card v-for="(item) in marketPerformance"
                                          :key="item.title"
                                          :num="item.num"
                                          :title="item.title">
                </project-ranking-num-card>
            </div>
            <project-ranking-market-performance></project-ranking-market-performance>
        </div>
        <!--舆情安全-->
        <div class="projsitu-item">
            <div class="item-title">
                <h2>{{ $t('el.projectRinking.feelingSecurity') }}</h2>
            </div>
            <div class="projsitu-item-feelingSecurity">
                <project-ranking-safety-opinion></project-ranking-safety-opinion>
                <be-pagination
                    custom-class="table-page"
                    :pageSize='pageParamsFs.pageSize'
                    :currentPage='pageParamsFs.currentPage'
                    :total='pageParamsFs.total'
                    @updatePage="pageChangeFs"
                    :is-front="false">
                    <span slot="prev" class="table-page-info">共计{{pageParamsFs.total}}条</span>
                    <span slot="next"></span>
                </be-pagination>
            </div>
        </div>
    </div>
</template>

<script>

import ProjectRankingNumCard from "./components/project-ranking-num-card";
import ProjectRankingRadar from "./components/project-ranking-radar";
import ProjectRankingSafetyOpinion from "./components/project-ranking-safety-opinion";
import ProjectRankingMarketPerformance from "./components/project-ranking-market-performance";
import BePagination from "../../../components/common-components/pagination/be-pagination";
import DataSet from "@antv/data-set";
import {Chart} from "@antv/g2";
export default {
    name: "project-ranking-projsitu",
    components: {
        BePagination,
        ProjectRankingNumCard,
        ProjectRankingRadar,
        ProjectRankingSafetyOpinion,
        ProjectRankingMarketPerformance,
    },
    data() {
        return {
            outlineInfo:{
                staticDetection:'',
                txSecurity:'',
                txStability:'',
                feeling:''
            },
            // 市场表现 基本数据
            marketPerformance: [
                {title: '交易总量', num: 0},
                {title: '用户总数', num: 0},
                {title: '合约总数', num: 0}
            ],
            // 合约安全数据
            contractSecurity: [
                {platform: 'bsc', addr: '0x123123123c123211231'},
                {platform: 'heco', addr: '0x1231231q23123211231'},
                {platform: 'eth', addr: '0x123123123s123211231'},
                {platform: 'bsc', addr: '0x123123s123123211231'},
                {platform: 'bsc', addr: '0x123123c123123211231'},
                {platform: 'bsc', addr: '0x1qw23123123123211231'},
            ],
            // 合约安全分页参数
            pageParamsCs:{
                currentPage: 1,
                pageNum: 1,
                pageSize: 5,
                total: 0
            },
            // 舆情安全分页参数
            pageParamsFs:{
                currentPage: 1,
                pageNum: 1,
                pageSize: 5,
                total: 0
            }
        }
    },
    mounted() {
        this.getOutLineData()
        this.$nextTick(()=>{
            this.renderOutlineRadar()
        })
    },
    methods: {
        /**
         * 合约安全分页方法
         * @param {Object} item - 分页参数对象
         */
        pageChangeCs(item){
            this.pageParamsCs.pageNum = item.currentPage
            this.pageParamsCs.currentPage = item.currentPage
        },
        /**
         * 舆情安全分页方法
         * @param {Object} item - 分页参数对象
         */
        pageChangeFs(item){
            this.pageParamsFs.pageNum = item.currentPage
            this.pageParamsFs.currentPage = item.currentPage
        },
        /**
         * 渲染概要雷達圖
         */
        renderOutlineRadar(){
            const { DataView } = DataSet;
            const data = [
                { item: '静态检测', a: 70, },
                { item: '交易安全', a: 60 },
                { item: '交易稳定', a: 50 },
                { item: '安全舆情', a: 50 },
            ];
            const dv = new DataView().source(data);
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
                appendPadding:[20,0,20,0]
            });
            chart.data(dv.rows);
            chart.scale('score', {
                min: 0,
                max: 80,
            });
            chart.coordinate('polar', {
                radius:1,
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
                label:{
                    style:{
                        fontWeight:'bold',
                        fontSize:16
                    }
                }
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

            chart
                .area()
                .position('item*score')
                .color('#1890FF');
            chart.legend(false);
            chart.render();

        },
        /**
         * 获取概要数据
         */
        getOutLineData(){
            const attackList = `<span class="height-light">闪电贷攻击</span>、<span class="height-light">重入攻击</span>`
            this.outlineInfo.staticDetection = `
                ${this.$t('el.projectRinking.outlineSDTxt')}
                <span class="height-light">10</span>
                  ${this.$t('el.projectRinking.outlineSDH')} ，
                 <span class="height-light">10</span>
                  ${this.$t('el.projectRinking.outlineSDM')} ，
                 <span class="height-light">10</span>
                  ${this.$t('el.projectRinking.outlineSDL')}
            `
            this.outlineInfo.txSecurity = `
                 ${this.$t('el.projectRinking.outlineTS')}
                <span class="height-light">1024笔</span>
                 ${this.$t('el.projectRinking.outlineTSM')}
                ${attackList}
            `
            this.outlineInfo.txStability = `
                 ${this.$t('el.projectRinking.outlineTST')}
                <span class="height-light">20%</span>`
            this.outlineInfo.feeling = `
                 ${this.$t('el.projectRinking.outlineTS')}
                <span class="height-light">20%条</span>
                 ${this.$t('el.projectRinking.outlineFL')}  `
        }
    },
}
</script>

<style lang="scss">
.project-ranking-projsitu {
    .projsitu-item {
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
        .projsitu-item-outline{
            display: flex;
            .outline-radar{
                background: linear-gradient(90deg, #FFFFFF 0%, #E3F2FF 100%);
                height: 400px;
                flex:1;
            }
            .outline-info{
                background:$mainColor7;
                height: 400px;
                flex:1;
                padding: 40px 30px 20px 30px;
                box-sizing: border-box;
                h2 {
                    font-family: PingFangSC-Medium, PingFang SC,sans-serif;
                    color: $textColor3;
                    margin-bottom: 20px;
                }
                .outline-info-txt{
                    height: 80%;
                    div{
                        display: flex;
                        margin-bottom: 15px;
                        .label{
                            font-family: PingFangSC-Medium, PingFang SC,sans-serif;
                            font-weight: 500;
                            color: $textColor3;
                            margin-right: 15px;
                        }
                        .inner-text{
                            color: $textColor4;
                        }
                    }
                }
                .height-light{
                    color:#FA6400;
                    font-weight: bold
                }
                p{
                    text-align: right;
                    color: $mainColor14;
                    font-size: 12px;
                }
            }
        }
        .projsitu-item-contractSecur {
            display: flex;
            justify-content: space-between;
            margin-bottom: 24px;
            flex-wrap: wrap;
        }
        .projsitu-item-feelingSecurity{
            padding-bottom: 15px;
            box-sizing: border-box;
        }
        .projsitu-item-market{
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