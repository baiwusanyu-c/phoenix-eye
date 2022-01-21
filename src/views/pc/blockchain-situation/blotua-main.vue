/*
* @blotua-main.vue
* @deprecated
* @author czh
* @update (czh 2021/11/1)
*/
<template>
    <div class="blotua-main">
        <!--   头部     -->
        <div class="blotua-main-header">
            <div class="timer">
                <span style="color: #84CCFF;margin-bottom: 10px">{{formatDate($createDate(now))}}</span>
                <el-select v-model="step"
                           style="width:80px;margin-left: 10px"
                           @change="resetTimer()">
                    <el-option value="" label="OFF"> </el-option>
                    <el-option :value="1000" label="1S"> </el-option>
                    <el-option :value="5000" label="5S"> </el-option>
                    <el-option :value="10000" label="10s"> </el-option>
                    <el-option :value="60000" label="1min"> </el-option>
                </el-select>
            </div>

            <h1 class="project-name">{{ $t('el.blotua.projectName') }}</h1>
            <div class="blotua-main-user">
                <img src="@/assets/image/pc/user2.png" alt="" style="margin-bottom: 10px">
                <span style="margin: 0 10px 10px 10px;color: white">{{ loginUser }}</span>
                <el-button class="btn" @click="routerPush" style="width: auto;padding-left: 5px;padding-right: 5px">{{ $t('el.blotua.enter') }}</el-button>
            </div>
        </div>
        <!--   主体     -->
        <div class="blotua-main-body">
            <div class="left">
                <!--       今日交易         -->
                <div class="jrjyl" v-loading="loadingTxNum" element-loading-background="rgba(0, 0, 0, 0.8)">
                    <div class="titles">
                        <span>{{ $t('el.blotua.jrjyl') }}</span>
                    </div>
                    <div class="sum-div">
                        <div class="sum">{{ txTotal }} {{ $t('el.piece') }}</div>
                    </div>
                    <div class="scroll-ranking">
                        <dv-scroll-ranking-board :config="scrollConfig" v-if="scrollConfig.data" style="width:100%;height:208px"/>
                    </div>
                </div>
                <!--       项目排行        -->
                <div class="xmph" v-loading="loadingProjRank" element-loading-background="rgba(0, 0, 0, 0.8)">
                    <div class="titles">
                        <span>{{ $t('el.blotua.xmph') }}</span>
                    </div>
                    <table class="blotua-table" v-if="rankListTop.length >0 && rankList.length > 0">
                        <thead class="blotua-table-header">
                            <th v-for="item in xmphHeader" :key="item + 'xmph'">{{ item }}</th>
                        </thead>
                        <tr class="blotua-table-col" @click="openProjectRanking(rankListTop[0].project_id,'project_id')">
                            <td><img src="@/assets/image/pc/xmph-1.png" alt=""></td>
                            <td>
                                <be-ellipsis-copy
                                    :targetStr="rankListTop[0].name"
                                    :is-ellipsis="rankListTop[0].name.length > 15 ? true : false"
                                    :isShowCopyBtn="false"
                                    fontLength="8"
                                    endLength="8">
                                </be-ellipsis-copy>
                            </td>
                            <td>{{ rankListTop[0].safety_score}}</td>
                            <td>{{formatterSize(rankListTop[0].trade_size,2)}}</td>
                        </tr>
                        <tr class="blotua-table-col" @click="openProjectRanking(rankListTop[1].project_id,'project_id')">
                            <td><img src="@/assets/image/pc/xmph-2.png" alt=""></td>
                            <td>
                                <be-ellipsis-copy
                                    :targetStr="rankListTop[1].name"
                                    :is-ellipsis="rankListTop[1].name.length > 15 ? true : false"
                                    :isShowCopyBtn="false"
                                    fontLength="8"
                                    endLength="8">
                                </be-ellipsis-copy>
                            </td>
                            <td>{{ rankListTop[1].safety_score}}</td>
                            <td>{{formatterSize(rankListTop[1].trade_size,2)}}</td>
                        </tr>
                        <tr class="blotua-table-col" @click="openProjectRanking(rankListTop[2].project_id,'project_id')">
                            <td><img src="@/assets/image/pc/xmph-3.png" alt=""></td>
                            <td>
                                <be-ellipsis-copy
                                    :targetStr="rankListTop[2].name"
                                    :is-ellipsis="rankListTop[2].name.length > 15 ? true : false"
                                    :isShowCopyBtn="false"
                                    fontLength="8"
                                    endLength="8">
                                </be-ellipsis-copy>
                            </td>
                            <td>{{ rankListTop[2].safety_score}}</td>
                            <td>{{formatterSize(rankListTop[2].trade_size,2)}}</td>
                        </tr>
                        <tr class="blotua-table-col"
                             v-for="(item,index) in rankList"
                             @click="openProjectRanking(item.project_id,'project_id')"
                            :key="item.project_id">
                            <td>{{ ((index + 4) >= 10 ) ? index + 4 : '0' + (index + 4) }}</td>
                            <td>
                                <be-ellipsis-copy
                                    :targetStr="item.name"
                                    :is-ellipsis="item.name.length > 15 ? true : false"
                                    :isShowCopyBtn="false"
                                    fontLength="8"
                                    endLength="8">
                                </be-ellipsis-copy>
                            </td>
                            <td>{{ item.safety_score}}</td>
                            <td>{{ formatterSize(item.trade_size, 2)}}</td>
                        </tr>
                    </table>
                </div>
            </div>
            <div class="center">
                <!--       四个轮播信息         openProjectRanking(contractAudit[0].project_contract_id,'project_contract_id')-->
                <div class="four-card">
                    <div class="card1">
                        <p v-if="contractAudit[0]" class="card-title2">Scanning Contract</p>
                        <p v-if="contractAudit[0]" class="card-info">{{ contractAudit[0].platform }}:{{contractAudit[0].contract_address}}</p>
                        <p v-if="contractAudit[0]" class="card-info">High risk:{{contractAudit[0].high_risk_count}} Medium risk:{{contractAudit[0].middle_risk_count}} Low risk:{{contractAudit[0].low_risk_count}}</p>
                        <p v-if="contractAudit[0]" class="card-info" style="position: absolute;left: 18px;bottom:40px">Safety score:{{contractAudit[0].safety_score}}</p>
                    </div>
                    <!--      openProjectRanking(contractAudit[1].project_contract_id,'project_contract_id')              -->
                    <div class="card2" >
                        <p v-if="contractAudit[1]" class="card-title1">Scanning Contract</p>
                        <p v-if="contractAudit[1]" class="card-info">{{ contractAudit[1].platform }}:{{contractAudit[1].contract_address}}</p>
                        <p v-if="contractAudit[1]" class="card-info">High risk:{{contractAudit[1].high_risk_count}} Medium risk:{{contractAudit[1].middle_risk_count}} Low risk:{{contractAudit[1].low_risk_count}}</p>
                        <p v-if="contractAudit[1]" class="card-info" style="position: absolute;left: 18px;bottom:40px">Safety score:{{contractAudit[1].safety_score}}</p>
                    </div>
                        <!--        @click="openProjectRanking(contractAudit[2].project_contract_id,'project_contract_id')"            -->
                    <div class="card3" >
                        <p v-if="contractAudit[2]" class="card-title2">Scanning Contract</p>
                        <p v-if="contractAudit[2]" class="card-info">{{ contractAudit[2].platform }}:{{contractAudit[2].contract_address}}</p>
                        <p v-if="contractAudit[2]" class="card-info">High risk:{{contractAudit[2].high_risk_count}} Medium risk:{{contractAudit[2].middle_risk_count}} Low risk:{{contractAudit[2].low_risk_count}}</p>
                        <p v-if="contractAudit[2]" class="card-info" style="position: absolute;left: 18px;bottom:40px">Safety score:{{contractAudit[2].safety_score}}</p>
                    </div>
                    <!--       @click="openProjectRanking(contractAudit[3].project_contract_id,'project_contract_id')"          -->
                    <div class="card4" >
                        <p v-if="contractAudit[3]" class="card-title1">Scanning Contract</p>
                        <p v-if="contractAudit[3]" class="card-info">{{ contractAudit[3].platform }}:{{contractAudit[3].contract_address}}</p>
                        <p v-if="contractAudit[3]" class="card-info">High risk:{{contractAudit[3].high_risk_count}} Medium risk:{{contractAudit[3].middle_risk_count}} Low risk:{{contractAudit[3].low_risk_count}}</p>
                        <p v-if="contractAudit[3]" class="card-info" style="position: absolute;left: 18px;bottom:40px">Safety score:{{contractAudit[3].safety_score}}</p>
                    </div>
                </div>
                <!--       风险交易趋势         -->
                <div class="yxfx-line" v-loading="loadingFxTx" element-loading-background="rgba(0, 0, 0, 0.8)">
                     <p>{{ $t('el.blotua.jyfxqs') }}</p>
                    <div id="yxfx_line"></div>
                </div>
            </div>
            <div class="right">
                <!--       交易风险         -->
                <div class="jyfx" v-loading="loadingTxFx" element-loading-background="rgba(0, 0, 0, 0.8)">
                    <div class="titles">
                        <span>{{ $t('el.blotua.jyfx') }}</span>
                    </div>
                    <table class="blotua-table">
                        <tr class="blotua-table-header">
                            <td v-for="item in jxfxHeader" :key="item + 'jyfx'">{{ item }}</td>
                        </tr>
                        <tr class="blotua-table-col"
                            style="height: 45px;"
                            @click="openDetail(item)"
                            v-for="(item,index) in warningRisk" :key="item.tx_hash">
                            <td style="display: flex;justify-content: center;line-height: 45px">
                                <div class="index" >{{ index + 1 }}</div>
                                <be-ellipsis-copy
                                    :targetStr="item.tx_hash"
                                    :is-ellipsis="true"
                                    :isShowCopyBtn="false"
                                    fontLength="8"
                                    endLength="8">
                                </be-ellipsis-copy>
                            </td>
                            <td>{{ item.risk_score }}</td>
                            <td>
                                <el-tooltip placement="top" effect="light" >
                                    <span slot="content">{{formatDate($createDate(item.tx_time))}} UTC：{{beijing2utc(item.tx_time) }}</span>
                                    <span class="cursor">{{$fomateTimeStamp($createDate(item.tx_time).getTime(),$i18n.locale)}}</span>
                                </el-tooltip>
                            </td>
                        </tr>
                    </table>
                </div>
                <!--       风险舆情         -->
                <div class="fxyq" v-loading="loadingFxYq" element-loading-background="rgba(0, 0, 0, 0.8)">
                    <div class="titles">
                        <span>{{ $t('el.blotua.fxyq') }}</span>
                    </div>
                    <div class="fxyq-body scrollDiy">
                        <div style="position: relative" v-for="item in safetyData"
                             @click="lookTextOriginal(item.sourceUrl)"
                             :key="item.sourceUrl + item.time">
                            <div style="margin-bottom: 10px">
                                <be-ellipsis-copy :targetStr="item.title"
                                                  :is-ellipsis="true"
                                                  :isShowCopyBtn="false"
                                                  styles="color: #84CCFF;font-weight: 500;font-size: 16px;"
                                                  fontLength="20"
                                                  endLength="0">
                                </be-ellipsis-copy>
                            </div>
                            <div>
                                <be-ellipsis-copy
                                    :targetStr="item.message"
                                    :is-ellipsis="true"
                                    :isShowCopyBtn="false"
                                    styles="color: #0468C2;font-weight: 400;font-size: 14px;line-height:1.5"
                                    fontLength="35"
                                    endLength="0">
                                </be-ellipsis-copy>
                            </div>
                            <p style="float:right; color: #0468C2;font-weight: 400;font-size: 14px;">
                                <el-tooltip placement="top" effect="light">
                                    <span slot="content">UTC：{{beijing2utc(item.time)}}</span>
                                    <span class="cursor">{{formatDate($createDate(item.time))}}</span>
                                </el-tooltip>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Chart } from '@antv/g2';
import {getContractAudit, getTxFxQs, getTxNum} from "../../../api/blotua";
import {getProjWarning} from "../../../api/risk-warning";
import {getProjectRankList, getPublicSentimentSecurity} from "../../../api/project-ranking";
import {nFormatter} from "../../../utils/auth";
export default {
    name: "BlotuaMain",
    data() {
        return {

            loginUser: '',
            xmphHeader: [],
            jxfxHeader: [],
            scrollConfig: {},
            lineData:[],
            txTotal:0,
            contractAudit:[],
            warningRisk:[],
            rankListTop:[],
            rankList:[],
            safetyData:[],
            // 合約審計信息數據分页参数
            pageParams: {
                currentPage: 1,
                pageNum: 1,
                pageSize: 4,
                total: 0
            },
            // 交易风险参数
            pageParamsWR: {
                currentPage: 1,
                pageNum: 1,
                pageSize: 5,
                total: 0
            },
            timer:null,
            step:5000,
            nowTimer:null,
            now:null,
            loadingTxNum:false,
            loadingTxFx:false,
            loadingProjRank:false,
            loadingFxYq:false,
            loadingFxTx:false,
        }
    },
    computed:{
       formatterSize(){
           return function (val,d){
              return nFormatter(val,d)
           }
       }
    },
    created() {
        this.loginUser = JSON.parse(this.getStore('userInfo')).username
        this.xmphHeader = [this.$t('el.blotua.rank'), this.$t('el.createProject.createProjectName'), this.$t('el.projectRinking.score'), this.$t('el.blotua.xmgm')]
        this.jxfxHeader = [this.$t('el.riskConfig.tableHeader.txHash'), this.$t('el.projectRinking.score'), this.$t('el.blotua.time')]
    },
    beforeDestroy() {
        clearInterval(this.timer)
        clearInterval(this.nowTimer)
    },
    mounted() {
         this.nowTimer = setInterval(()=>{
             this.now = new Date()
         },1000)
        this.$nextTick(()=>{
            this.getTxNumToDay()
            this.getLineData()
            this.getContractAuditData()
            this.getWarningRiskData()
            this.getFxYqData()
            this.getProjRanking()
            this.startTimer()
        })
    },
    methods: {
        /**
         * 渲染折线图
         */
        renderLine(){
            const _this = this
            const chart = new Chart({
                container: 'yxfx_line',
                autoFit: true,
                height: 270,
            });
            this.chart = chart
            chart.data(this.lineData);
            chart.scale({
                create_time: {
                    range: [0, 1],
                },
                count: {
                    nice: true,
                },
            });

            chart.tooltip({
                showCrosshairs: true,
                shared: true,
            });
            chart.legend({
                position: 'top-right',
                marker: (name) => {
                    const config = {
                        symbol: 'circle',
                        style: {
                            fill: 'green',
                            lineWidth: 0,
                        },
                    }
                    if(name === 'eth'){
                        config.style.fill =  '#E6F7FF'
                    }
                    if(name === 'bsc'){
                        config.style.fill =  '#1496F2'

                    }
                    if(name === 'heco'){
                        config.style.fill =  '#44D7B6'

                    }
                    if(name === 'polygon'){
                        config.style.fill =  '#FFD788'

                    }
                    return config
                },
                itemName: {
                    style:{
                        fill:'#0468C2',
                    },
                    formatter:(text)=>{
                        return text.toUpperCase()
                    }
                },
            });
            chart.axis('create_time', {
                title:{
                    text:_this.$t('el.projectRinking.marketPerformance.time'),
                    position:'end',
                    style:{
                        fill:'#0468C2'
                    }
                },
                label: {
                    style:{
                        fill:'#0468C2'
                    }
                },
                line:{
                    style:{
                        stroke:'#0468C2'
                    }
                },
                tickLine:{
                    style:{
                        stroke:'#0468C2'
                    }
                },
            });
            chart.axis('count', {
                title:{
                    text:_this.$t('el.blotua.jyfxNum'),
                    position:'end',
                    style:{
                        fill:'#0468C2'
                    }
                },
                grid: {
                    line: {
                        style: {
                            stroke: '#0468C2',}
                    }
                },
                label: {
                    style:{
                        fill:'#0468C2'
                    }
                },
            });
            chart
                .line()
                .position('create_time*count')
                .color('platform', (val) => {
                    if(val === 'eth'){
                        return '#E6F7FF'
                    }
                    if(val === 'bsc'){
                        return '#1496F2'
                    }
                    if(val === 'heco'){
                        return '#44D7B6'
                    }
                    if(val === 'polygon'){
                        return '#FFD788'
                    }
                })
                .shape('smooth');
            chart.render();
        },
        /**
         * 获取今日交易量
         */
        getTxNumToDay(){
            const _this = this
            this.loadingTxNum = true
            getTxNum().then(res => {
                if (res) {
                    _this.txTotal = res.data.tx_total
                    _this.scrollConfig.data = []
                    Object.keys(res.data.platform_tx_info).forEach(val=>{
                        _this.scrollConfig.data.push({
                            name: val,
                            value: res.data.platform_tx_info[val] === '-' ? 0  : res.data.platform_tx_info[val] - 0
                        })
                    })
                    _this.scrollConfig.data.sort((a,b)=>b.value - a.value)
                    _this.scrollConfig.unit = this.$t('el.piece')
                    _this.scrollConfig.valueFormatter = ({ value }) =>{
                        if(value === 0){
                            return this.$t('el.blotua.noData')
                        }
                        return value +  this.$t('el.piece')
                    }
                }
                this.loadingTxNum = false
            }).catch(err => {
                this.loadingTxNum = false
                _this.$message.error(err.message)
                console.error(err)
            })
        },
        /**
         * 获取交易风险折线图数据
         */
        getLineData(){
            const _this = this
            _this.lineData =  []
           _this.loadingFxTx = true
            getTxFxQs().then(res => {
                if (res) {
                    Object.keys(res.data).forEach(val=>{
                        _this.lineData = _this.lineData.concat(res.data[val])
                    })
                    _this.renderLine()
                }
                _this.loadingFxTx = false
            }).catch(err => {
                _this.loadingFxTx = false
                _this.$message.error(err.message)
                console.error(err)
            })
        },
        /**
         * 獲取合約審計信息數據
         */
        getContractAuditData(){
            const _this = this
            _this.contractAudit = []
            const params = {
                page_num:_this.pageParams.pageNum,
                page_size:_this.pageParams.pageSize,
            }
            getContractAudit(params).then(res => {
                if (res) {
                    _this.contractAudit = res.data.page_infos
                    _this.pageParams.total = res.data.total
                }
            }).catch(err => {
                _this.$message.error(err.message)
                console.error(err)
            })
        },
        /**
         * 获取风险警告数据
         */
        getWarningRiskData(){
            const _this = this
            let params = {
                page_num:_this.pageParamsWR.pageNum,
                page_size:_this.pageParamsWR.pageSize,
                platform:'',
            }
            _this.loadingTxFx = true
            _this.warningRisk = []
            getProjWarning(params).then(res=>{
                if(res){
                    _this.warningRisk = res.data.page_infos
                    _this.pageParamsWR.total = res.data.total
                }
                _this.loadingTxFx = false
            }).catch(err=>{
                _this.loadingTxFx = false
                _this.$message.error(err.message)
                console.error(err)
            })
        },
        /**
         * 获取风险舆情新闻数据
         */
        getFxYqData(){
            this.safetyData = []
            const _this = this

            let params = {
                project_id: null,
                page_num: 1,
                page_size: 5,
            }
            _this.loadingFxYq = true
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
                }
                _this.loadingFxYq = false
            }).catch(err => {
                _this.loadingFxYq = false
                _this.$message.error(err.message)
                console.error(err)
            })
        },
        /**
         * 获取項目排行數據
         */
        getProjRanking(){
            const _this = this
            let params = {
                page_num:1,
                page_size:10,
            }
            this.rankListTop = []
            this.rankList = []
            this.loadingProjRank = true
            getProjectRankList(params).then(res=>{
                if(res){
                    _this.rankListTop = res.data.page_info.slice(0,3)
                    _this.rankList = res.data.page_info.slice(3,res.data.page_info.length)
                }
                _this.loadingProjRank = false
            }).catch(err=>{
                _this.loadingProjRank = false
                _this.$message.error(err.message)
                console.error(err)
            })
        },
        /**
         * 启动轮询
         */
        startTimer(){
            this.timer = setInterval(()=>{
                this.pageParams.pageNum = this.pageParams.pageNum + 1
                if(this.pageParams.pageNum > Math.ceil(this.pageParams.total/4)){
                    this.pageParams.pageNum = 1
                }

                this.getContractAuditData()
                this.getWarningRiskData()
            },this.step)
        },
        /**
         * 重新设置定时器轮询
         */
        resetTimer(){
            clearInterval(this.timer)
            if(!this.step){
                return
            }
            this.startTimer()
        },
        // 查看原文按钮
        lookTextOriginal(url){
            if(url){
                this.$openWindow(url, 'view_window')
            }
        },
        /**
         * 打開交易分析詳情tab
         */
        openDetail(params){
            this.$openWindow(`#/riskWarning/detail?tx_hash=${params.tx_hash}`, 'view_window')
        },
        /**
         * 打開到项目态势详情
         */
        openProjectRanking(params,name){
            this.$openWindow(`#/projectRanking?${name}=${params}&type=outLink`, 'view_window')
        },
        routerPush(){
            try {
                this.$store.state.routeConfig.forEach(val=>{
                    if(val.path  && val.path !== '/blockchainSituation'){
                        this.$router.push(val.path)
                        throw new Error('')
                    }
                })
            } catch (e) {
                console.log(e);
            }


        }
    },
}
</script>
<style lang="scss">
.blotua-main {
    background-image: url("../../../assets/image/pc/lsts-bg.png");
    background-repeat: round;
    background-size: 100%;
    height: 100vh;
    width: 100vw;

    .jrjyl {
        background-image: url("../../../assets/image/pc/box-1.png");
        background-repeat: round;
        background-size: 100%;
        height: 40%;
        margin-bottom: 18px;
        padding-bottom: 10px;
        box-sizing: border-box;

        .sum-div {
            display: flex;
            justify-content: center;

            .sum {
                width: 60%;
                font-size: 28px;
                font-family: PingFang-SC-Heavy, PingFang-SC sans-serif;
                font-weight: 800;
                color: #84CCFF;
                line-height: 36px;
                background-image: url("../../../assets/image/pc/sum.png");
                background-repeat: round;
                background-size: 100%;
                text-align: center;
                margin: 20px 0;
            }
        }

        .scroll-ranking {
            padding: 0 18px;
            box-sizing: initial;

            .dv-scroll-ranking-board .ranking-column {
                border-bottom: 0;
                background: #002546;
            }

            .dv-scroll-ranking-board .ranking-column .inside-column {
                background-color: #0468C2;
                margin-bottom: 0;
            }

            .dv-scroll-ranking-board .ranking-info .rank,
            .dv-scroll-ranking-board .ranking-info .info-name {
                color: #84CCFF;
            }

            .dv-scroll-ranking-board .ranking-info {
                color: #1496F2;
            }
        }

    }

    .xmph {
        background-image: url("../../../assets/image/pc/box-3.png");
        background-repeat: round;
        background-size: 100%;
        height: 56%;
        padding-bottom: 10px;
        box-sizing: border-box;
    }

    .jyfx {
        background-image: url("../../../assets/image/pc/box-2.png");
        background-repeat: round;
        background-size: 100%;
        height: 40%;
        margin-bottom: 18px;
        padding-bottom: 10px;
        box-sizing: border-box;

        .ellipsis-copy {
            min-width: initial !important;
            width: 124px;
        }

        .index {
            background: #0A5292;
            width: 30px;
            height: 30px;
            float: left;
            margin: auto 10px auto 0;
            line-height: 30px;
            -webkit-clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
            clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)
        }
    }

    .fxyq {
        background-image: url("../../../assets/image/pc/box-4.png");
        background-repeat: round;
        background-size: 100%;
        height: 56%;
        padding-bottom: 10px;
        box-sizing: border-box;

        .fxyq-body {
            height: 90%;
            overflow-y: auto;
            padding: 0 18px;
            box-sizing: border-box;
        }
    }

    .titles {
        height: 30px;
        text-align: center;
        width: 100%;
        font-size: 16px;
        font-family: PingFang-SC-Heavy, PingFang-SC sans-serif;
        font-weight: bold;
        color: #1496F2;
        line-height: 46px;
        margin-bottom: 15px;

        span {
            margin-right: 20px;
        }
    }

    .blotua-table {
        width: 100%;
        margin-top: 30px;
        padding: 18px;
        box-sizing: border-box;
        .blotua-table-header {
            font-size: 12px;
            font-family: PingFang-SC-Heavy, PingFang-SC sans-serif;
            font-weight: 800;
            color: #0468C2;
            line-height: 18px;
            text-align: center;
        }

        .blotua-table-col {
            font-size: 12px;
            font-family: PingFangSC-Regular, PingFang SC sans-serif;
            font-weight: 400;
            color: #84CCFF;
            line-height: 34px;
            text-align: center;
            &:hover {
                background: rgba(0, 0, 0, 0.4);
            }
            .ellipsis-copy{
                min-width: initial !important;
                justify-content: center;
            }
        }
    }
}

.blotua-main-header {
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    .timer{
        .el-input__inner{
            height: 24px;
            line-height: 24px;
            background: transparent;
            border-color:#0A4066;
        }
    }
    .blotua-main-user {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .btn {
            width: 88px;
            height: 24px;
            background: linear-gradient(180deg, #67BCF7 0%, #07659E 100%);
            border-radius: 2px;
            color: $mainColor7;
            border: 0;
            margin-bottom: 10px
        }
    }

    .project-name {
        font-size: 32px;
        font-family: YouSheBiaoTiHei sans-serif;
        color: #FFFFFF;
        line-height: 42px;
        text-shadow: 2px 6px 10px rgba(9, 39, 67, 0.8);
        background: linear-gradient(180deg, #FFFFFF 0%, #2F86C9 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }
}

.blotua-main-body {
    width: 100vw;
    padding: 18px;
    box-sizing: border-box;
    height: calc(100% - 60px);
    display: flex;
    justify-content: space-between;

    .left {
        width: 20%;
    }

    .right {
        width: 20%;
    }

    .center {
        width: 60%;
        padding: 18px;
        box-sizing: border-box;

        .four-card {
            position: relative;
            height: 60%;
            width: 100%;

            .card1 {
                background-image: url("../../../assets/image/pc/card1.png");
                background-repeat: round;
                background-size: 100%;
                position: absolute;
                top: 0;
                left: 0;
                width: 40%;
                height: 40%;
                padding: 30px 18px;
                box-sizing: border-box;
            }

            .card2 {
                background-image: url("../../../assets/image/pc/card2.png");
                background-repeat: round;
                background-size: 100%;
                position: absolute;
                top: 0;
                right: 0;
                width: 40%;
                height: 40%;
                padding: 30px 18px;
                box-sizing: border-box;
            }

            .card3 {
                background-image: url("../../../assets/image/pc/card3.png");
                background-repeat: round;
                background-size: 100%;
                position: absolute;
                bottom: 0;
                left: 0;
                width: 40%;
                height: 40%;
                padding: 30px 18px;
                box-sizing: border-box;
            }

            .card4 {
                background-image: url("../../../assets/image/pc/card4.png");
                background-repeat: round;
                background-size: 100%;
                position: absolute;
                bottom: 0;
                right: 0;
                width: 40%;
                height: 40%;
                padding: 30px 18px;
                box-sizing: border-box;
            }

            .card-title1 {
                font-size: 16px;
                font-family: PingFang-SC-Heavy, PingFang-SC sans-serif;
                font-weight: 800;
                color: #44D7B6;
                margin-bottom: 10px;
                line-height: 16px;
            }

            .card-title2 {
                font-size: 16px;
                font-family: PingFang-SC-Heavy, PingFang-SC sans-serif;
                font-weight: 800;
                color: #FFD788;
                line-height: 16px;
                margin-bottom: 10px;
            }

            .card-info {
                font-size: 14px;
                font-family: PingFang-SC-Heavy, PingFang-SC sans-serif;
                font-weight: 400;
                color: #84CCFF;
                line-height: 1.5;
            }
        }

        .yxfx-line {
            height: 328px;
            padding: 18px;
            box-sizing: border-box;
            width: 100%;
            p{
                font-size: 16px;
                font-family: PingFang-SC-Heavy, PingFang-SC sans-serif;
                font-weight: 800;
                color: #1496F2;
                line-height: 24px;
                margin-bottom: 10px;
            }
        }
    }
}
</style>