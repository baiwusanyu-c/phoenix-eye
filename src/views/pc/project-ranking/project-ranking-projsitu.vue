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
                    {{ $t('el.projectRinking.onlineTime') }}：
                     <el-tooltip placement="top" effect="light">
                            <span slot="content">UTC：{{ beijing2utc(projectInfo.create_time) }}</span>
                            <span class="cursor">{{ formatDate($createDate(projectInfo.create_time)) }}</span>
                        </el-tooltip>
                </span>
            </div>
            <div class="projsitu-item-outline">
                <div class="outline-radar" id="outline_radar">
                    <div class='empty-data' v-if="staticPieData.length === 0" style="margin-top: 0">
                        <img class="img" src="@/assets/image/pc/empty-data.png" alt="" style="height: 180px;">
                        <p style="line-height: 25px">{{ $t('el.emptyData') }}</p>
                    </div>
                </div>
                <div class="outline-info">
                    <h2>{{ $t('el.projectRinking.outlineTitle') }}</h2>
                    <div class="outline-info-txt">
                        <div style="justify-content: flex-start">
                            <span class="label" style="min-width: 70px; align-items: flex-start;">{{ $t('el.projectRinking.staticDetection') }}:</span>
                            <span class='inner-text' v-html="outlineInfo.staticDetection || '暂无数据'"></span>
                        </div>
                        <div style="justify-content: flex-start">
                            <span class="label" style="min-width: 70px; align-items: flex-start;">{{ $t('el.projectRinking.txSecurity') }}:</span>
                            <span class='inner-text' v-html="outlineInfo.txSecurity || '暂无数据'"></span>
                        </div>
                        <div style="justify-content: flex-start">
                            <span class="label" style="min-width: 70px; align-items: flex-start;">{{ $t('el.projectRinking.txStability') }}:</span>
                            <span class='inner-text' v-html="outlineInfo.txStability || '暂无数据'"></span>
                        </div>
                        <div style="justify-content: flex-start">
                            <span class="label" style="min-width: 70px; align-items: flex-start;">{{ $t('el.projectRinking.feeling') }}:</span>
                            <span class='inner-text' v-html="outlineInfo.feeling || '暂无数据'"></span>
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
            <div :class="{
                        'projsitu-item-contractSecur':true,
                        'projsitu-item-hyaq':contractSecurity.length === 0
                    }"
                 v-loading='loadingCs'>
                <project-ranking-radar v-for="(item) in contractSecurity"
                                       :addr="item.contract_address"
                                       :contractId="item.project_contract_id"
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
                    <span slot="prev" class="table-page-info">{{ $t('el.total') }}{{ pageParamsCs.total }}{{ $t('el.piece') }}</span>
                    <span slot="next"></span>
                </be-pagination>
                <div class='empty-data' v-if="contractSecurity.length === 0" style="margin-top: 0">
                    <img class="img" src="@/assets/image/pc/empty-data.png" alt="" style="height: 180px;">
                    <p style="line-height: 25px">{{ $t('el.emptyData') }}</p>
                </div>
            </div>
        </div>
        <!--市场表现-->
        <!--<div class="projsitu-item">
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
            <project-ranking-market-performance
                :tx-quantity="mpTxNum"
                :new-user="mpNewUserNum">
            </project-ranking-market-performance>
        </div>-->
        <!--舆情安全-->
        <div class="projsitu-item">
            <div class="item-title">
                <h2>{{ $t('el.projectRinking.feelingSecurity') }}</h2>
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
                    <span slot="prev" class="table-page-info">{{ $t('el.total') }}{{ pageParamsFs.total }}{{ $t('el.piece') }}</span>
                    <span slot="next"></span>
                </be-pagination>
                <div class='empty-data' v-if="safetyData.length === 0" style="margin-top: 0">
                    <img class="img" src="@/assets/image/pc/empty-data.png" alt="" style="height: 180px;">
                    <p style="line-height: 25px">{{ $t('el.emptyData') }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

// import ProjectRankingNumCard from "./components/project-ranking-num-card";
import ProjectRankingRadar from "./components/project-ranking-radar";
import ProjectRankingSafetyOpinion from "./components/project-ranking-safety-opinion";
// import ProjectRankingMarketPerformance from "./components/project-ranking-market-performance";
import BePagination from "../../../components/common-components/pagination/be-pagination";
import DataSet from "@antv/data-set";
import {Chart, registerGeometryLabelLayout} from "@antv/g2";
import {getContractSecurity, getPublicSentimentSecurity} from "../../../api/project-ranking";

export default {
    name: "project-ranking-projsitu",
    components: {
        BePagination,
        // ProjectRankingNumCard,
        ProjectRankingRadar,
        ProjectRankingSafetyOpinion,
       // ProjectRankingMarketPerformance,
    },
    data() {
        return {
            // 项目检测评分信息
            outlineInfo: {
                staticDetection: '',
                txSecurity: '',
                txStability: '',
                feeling: ''
            },
            // 项目检测评分 雷达图数据
            staticPieData: [],
            // 项目安全评估
            safetyEvaluatePieData: 0,
            // 市场表现 基本数据
            marketPerformance: [],
            // 市場表現 交易量
            mpTxNum: [],
            // 市場表現 新增用户
            mpNewUserNum: [],
            // 合约安全数据
            contractSecurity: [],
            // 合约安全分页参数
            pageParamsCs: {
                currentPage: 1,
                pageNum: 1,
                pageSize: 5,
                total: 0
            },
            // 舆情安全分页参数
            pageParamsFs: {
                currentPage: 1,
                pageNum: 1,
                pageSize: 5,
                total: 0
            },

            // 项目信息
            projectInfo: {},
            // 合约安全loading
            loadingCs: false,
            // 舆情安全loading
            loadingFs: false,
            // 项目id
            projectId: '',
            // 舆情安全数据
            safetyData:[]
        }
    },
    computed: {
        radarDataCs() {
            return function (data) {
                if (data) {
                    return [
                        {key:'jtjc-staticDetection',item: this.$t('el.projectRinking.staticDetection'), a: data.static_testing},
                        {key:'jyaq-txSecurity',item: this.$t('el.projectRinking.txSecurity'), a: data.tx_safety},
                        {key:'jywd-txStability',item: this.$t('el.projectRinking.txStability'), a: data.tx_stability},
                    ]
                }
                return []
            }
        }
    },
    mounted() {
        this.projectId = this.$route.query.param || this.$route.query.project_id
        this.getProSituData()
        this.$nextTick(() => {
            this.renderOutlineRadar()
        })
    },
    methods: {
        /**
         * 获取舆情安全数据
         */
        getPublicSentimentSecurData() {
            this.safetyData = []
            const _this = this
            _this.loadingFs = true
            let params = {
                project_id: _this.projectId -0,
                page_num: _this.pageParamsFs.pageNum,
                page_size: _this.pageParamsFs.pageSize,
            }
            getPublicSentimentSecurity(params).then(res => {
                if (res) {
                    res.data.page_infos.forEach(val => {
                        _this.safetyData.push({
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
                    _this.pageParamsFs.total = res.data.total
                    _this.loadingFs = false
                }
            }).catch(err => {
                _this.$message.error(err.message)
                console.error(err)
            })
        },
        /**
         * 舆情安全分页方法
         * @param {Object} item - 分页参数对象
         */
        pageChangeFs(item) {
            this.pageParamsFs.pageNum = item.currentPage
            this.pageParamsFs.currentPage = item.currentPage
            this.getPublicSentimentSecurData()
        },
        /**
         * 获取合约安全数据
         */
        getContractSecurData() {
            const _this = this
            _this.loadingCs = true
            let params = {
                project_id: _this.projectId,
                page_num: _this.pageParamsCs.pageNum,
                page_size: _this.pageParamsCs.pageSize,
            }
            getContractSecurity(params).then(res => {
                if (res) {
                    _this.contractSecurity = res.data.page_infos
                    _this.pageParamsCs.total = res.data.total
                    _this.loadingCs = false
                }
            }).catch(err => {
                _this.$message.error(err.message)
                console.error(err)
            })
        },
        /**
         * 合约安全分页方法
         * @param {Object} item - 分页参数对象
         */
        pageChangeCs(item) {
            this.pageParamsCs.pageNum = item.currentPage
            this.pageParamsCs.currentPage = item.currentPage
            this.getContractSecurData()
        },
        /**
         * 数据重置
         */
        resetData() {
            // 合约安全数据
            this.contractSecurity = []
            // 合约安全分页参数
            this.pageParamsCs = {
                currentPage: 1,
                pageNum: 1,
                pageSize: 5,
                total: 0
            }
            // 舆情安全分页参数
            this.pageParamsFs = {
                currentPage: 1,
                pageNum: 1,
                pageSize: 5,
                total: 0
            }
            // 项目信息
            this.projectInfo = {}
            // 合约安全loading
            this.loadingCs = false
            // 舆情安全loading
            this.loadingFs = false
            // 项目id
            this.projectId = ''
            // 舆情安全数据
            this.safetyData = []

            this.projectInfo = {}
            this.outlineInfo = {
                staticDetection: this.$t('el.emptyData'),
                txSecurity:this.$t('el.emptyData'),
                txStability: this.$t('el.emptyData'),
                feeling: this.$t('el.emptyData'),
            }
            this.marketPerformance = [
                {title: this.$t('el.projectRinking.txSumNum'), num: this.$t('el.emptyData'),},
                {title: this.$t('el.projectRinking.userSumNum'), num: this.$t('el.emptyData'),},
                {title: this.$t('el.projectRinking.contractSumNum'), num: this.$t('el.emptyData'),},
            ]
            this.staticPieData = [
                { key:'jtjc-staticDetection',        item: '静态检测', a: 70, },
                { key:'jyaq-txSecurity',             item: '交易安全', a: 40 },
                { key:'jywd-txStability',            item: '交易稳定', a: 35 },
                { key:'yqaq-safetyPublicOptionClass',item: '风险舆情', a: 20 },
            ]
            this.safetyEvaluatePieData = 0
            this.mpTxNum = []
            this.mpNewUserNum = []
        },
        /**
         * 获取项目态势详情数据
         */
        async getProSituData() {
            // 这是在上级路由存储的数据
            const data = JSON.parse(this.getStore('ProjectTs'))
            if (!data) {
                this.resetData()
                return
            }
            // 项目态势基本信息
            this.projectInfo = data.project_info

            // 项目检测评分信息
            this.getOutLineData(this.projectInfo)
            // 项目检测评分雷达图
            this.staticPieData = [
                {key:'jtjc-staticDetection',item: this.$t('el.projectRinking.staticDetection'), a: this.projectInfo.static_testing.score},
                {key:'jyaq-txSecurity',item: this.$t('el.projectRinking.txSecurity'), a: this.projectInfo.tx_safety.score},
                {key:'jywd-txStability',item: this.$t('el.projectRinking.txStability'), a: this.projectInfo.tx_stability.score},
                {key:'yqaq-safetyPublicOptionClass',item: this.$t('el.systemConfigScore.safetyPublicOptionClass'), a: this.projectInfo.safety_opinion.score},
            ]
            this.safetyEvaluatePieData = this.projectInfo.safety_evaluate

            // 市场表现数据
            /*this.marketPerformance = [
                {title: this.$t('el.projectRinking.txSumNum'), num: data.market_performance.tx_total},
                {title: this.$t('el.projectRinking.userSumNum'), num: data.market_performance.user_total},
                {title: this.$t('el.projectRinking.contractSumNum'), num: data.market_performance.contract_total},
            ]*/
            // 市场表现图表数据
            // this.mpTxNum = data.market_performance.tx_amounts
            // this.mpNewUserNum = data.market_performance.new_user_nums
            // 获取合约安全数据
            await this.getContractSecurData()
            // 获取舆情安全数据
            await this.getPublicSentimentSecurData()
        },
        /**
         * 获取概要数据
         */
        getOutLineData(data) {
            this.outlineInfo.staticDetection = data.static_testing.text
            this.outlineInfo.txSecurity = data.tx_safety.text
            this.outlineInfo.txStability = data.tx_stability.text
            this.outlineInfo.feeling = data.safety_opinion.text
        },

        /**
         * 渲染概要雷達圖
         */
        renderOutlineRadar() {
            const _this = this
            if (this.staticPieData.length === 0) {
                return
            }
            const {DataView} = DataSet;
            // 坐标label缓存
            const labelCache = []
            function limitInShape(items, labels) {
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
                        text: _this.safetyEvaluatePieData,
                        textBaseline: 'middle',
                        fill: '#333333',
                        fontWeight: 'bold',
                        fontSize: 30
                    },
                })
            }
            // 注册 label 布局函数
            registerGeometryLabelLayout('limit-in-shape', limitInShape);
            const dv = new DataView().source(this.staticPieData);
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
        },

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
                font-family: PingFangSC-Medium, PingFang SC, sans-serif;
                color: $textColor3;
                margin-right: 15px;
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
                justify-content: center;
                align-items: center;
                background: linear-gradient(90deg, #FFFFFF 0%, #E3F2FF 100%);
                height: 400px;
                flex: 1;
            }

            .outline-info {
                background: $mainColor7;
                height: 400px;
                flex: 1;
                padding: 40px 30px 20px 30px;
                box-sizing: border-box;

                h2 {
                    font-family: PingFangSC-Medium, PingFang SC, sans-serif;
                    color: $textColor3;
                    margin-bottom: 20px;
                }

                .outline-info-txt {
                    height: 80%;

                    div {
                        display: flex;
                        margin-bottom: 15px;

                        .label {
                            font-family: PingFangSC-Medium, PingFang SC, sans-serif;
                            font-weight: 500;
                            color: $textColor3;
                            margin-right: 15px;
                        }

                        .inner-text {
                            color: $textColor4;
                        }
                    }
                }

                .height-light {
                    color: #FA6400;
                    font-weight: bold
                }

                p {
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

        .projsitu-item-hyaq {
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 300px;
            background-color: $mainColor7;
        }

        .projsitu-item-feelingSecurity {
            padding-bottom: 15px;
            box-sizing: border-box;
        }

        .projsitu-item-market {
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