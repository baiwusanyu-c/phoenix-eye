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
                <span style="color: #84CCFF">{{formatDate(createDate(now))}}</span>
                <el-select v-model="step"
                           style="width:80px;margin-left: 10px"
                           @change="resetTimer()">
                    <el-option value="" label="OFF"> </el-option>
                    <el-option :value="1000" label="1S"> </el-option>
                    <el-option :value="5000" label="5S"> </el-option>
                    <el-option :value="10000" label="10s"> </el-option>
                    <el-option :value="60000" label="1min"> </el-option>
                </el-select>
                <el-dropdown @command="changeLanguage" style="margin-left: 5px">
                            <span class="el-dropdown-link" style="display: flex;align-items: center">
                              {{ $t('lang.header.language') }}
                              <be-icon icon="under" style="margin-left: 5px" color="#777"></be-icon>
                            </span>
                    <template #dropdown>
                        <el-dropdown-menu >
                            <el-dropdown-item command="zh_CN"
                                              :class="`${getStore('language') === 'zh_CN' ? 'active-dropdown' :''}`">
                                {{$t('lang.header.chinese')}}
                            </el-dropdown-item>
                            <el-dropdown-item command="en_US"
                                              :class="`${getStore('language') === 'en_US' ? 'active-dropdown' :''}`">
                                {{$t('lang.header.english')}}
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </template>

                </el-dropdown>
            </div>

            <h1 class="project-name">{{ $t('lang.blotua.projectName') }}</h1>
            <div class="blotua-main-user">
                <img src="@/assets/image/pc/user2.png" alt="" style="margin-bottom: 10px">
                <span style="margin: 0 10px 10px 10px;color: white">{{ loginUser }}</span>
                <el-button class="btn" @click="routerPushSwitch" style="width: auto;padding-right: 5px;padding-left: 5px">{{ $t('lang.blotua.enter') }}</el-button>
            </div>
        </div>
        <!--   主体     -->
        <div class="blotua-main-body">
            <div class="left">
                <!--       今日交易         -->
                <div class="jrjyl" v-loading="loadingTxNum" element-loading-background="rgba(0, 0, 0, 0.8)">
                    <div class="titles">
                        <span>{{ $t('lang.blotua.jrjyl') }}</span>
                    </div>
                    <div class="sum-div">
                        <div class="sum">{{ txTotal }} {{ $t('lang.piece') }}</div>
                    </div>
                    <div class="scroll-ranking">
                        <blotua-progress ref="progress" v-if="scrollConfig.data"></blotua-progress>
                        <!--<dv-scroll-ranking-board :config="scrollConfig" v-if="scrollConfig.data" style="width:100%;height:208px"/>
                    -->
                    </div>
                </div>
                <!--       项目排行        -->
                <div class="xmph" v-loading="loadingProjRank" element-loading-background="rgba(0, 0, 0, 0.8)">
                    <div class="titles">
                        <span>{{ $t('lang.blotua.xmph') }}</span>
                    </div>
                    <table class="blotua-table" >
                        <thead class="blotua-table-header">
                            <th v-for="item in xmphHeader" :key="item + 'xmph'">{{ item }}</th>
                        </thead>
<!--                        <tr class="blotua-table-col" @click="openProjectRanking(rankListTop[0].project_id,'project_id')">
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
                        </tr>-->



                        <tr class="blotua-table-col"
                             v-for="(item,index) in rankList"
                             @click="openProjectRanking(item.project_id,'project_id')"
                            :key="item.project_id">
                            <td v-if="index === 0"><img src="@/assets/image/pc/xmph-1.png" alt="" style="margin: 0 auto"></td>
                            <td v-if="index === 1"><img src="@/assets/image/pc/xmph-2.png" alt="" style="margin: 0 auto"></td>
                            <td v-if="index === 2"><img src="@/assets/image/pc/xmph-3.png" alt="" style="margin: 0 auto"></td>
                            <td v-if="index >= 3">{{ ((index + 1) >= 10 ) ? index + 1 : '0' + (index + 1) }}</td>
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
                        <p v-if="contractAudit[0]" class="card-info" style="position: absolute;bottom:40px;left: 18px">Safety score:{{contractAudit[0].safety_score}}</p>
                    </div>
                    <!--      openProjectRanking(contractAudit[1].project_contract_id,'project_contract_id')              -->
                    <div class="card2" >
                        <p v-if="contractAudit[1]" class="card-title1">Scanning Contract</p>
                        <p v-if="contractAudit[1]" class="card-info">{{ contractAudit[1].platform }}:{{contractAudit[1].contract_address}}</p>
                        <p v-if="contractAudit[1]" class="card-info">High risk:{{contractAudit[1].high_risk_count}} Medium risk:{{contractAudit[1].middle_risk_count}} Low risk:{{contractAudit[1].low_risk_count}}</p>
                        <p v-if="contractAudit[1]" class="card-info" style="position: absolute;bottom:40px;left: 18px">Safety score:{{contractAudit[1].safety_score}}</p>
                    </div>
                        <!--        @click="openProjectRanking(contractAudit[2].project_contract_id,'project_contract_id')"            -->
                    <div class="card3" >
                        <p v-if="contractAudit[2]" class="card-title2">Scanning Contract</p>
                        <p v-if="contractAudit[2]" class="card-info">{{ contractAudit[2].platform }}:{{contractAudit[2].contract_address}}</p>
                        <p v-if="contractAudit[2]" class="card-info">High risk:{{contractAudit[2].high_risk_count}} Medium risk:{{contractAudit[2].middle_risk_count}} Low risk:{{contractAudit[2].low_risk_count}}</p>
                        <p v-if="contractAudit[2]" class="card-info" style="position: absolute;bottom:40px;left: 18px">Safety score:{{contractAudit[2].safety_score}}</p>
                    </div>
                    <!--       @click="openProjectRanking(contractAudit[3].project_contract_id,'project_contract_id')"          -->
                    <div class="card4" >
                        <p v-if="contractAudit[3]" class="card-title1">Scanning Contract</p>
                        <p v-if="contractAudit[3]" class="card-info">{{ contractAudit[3].platform }}:{{contractAudit[3].contract_address}}</p>
                        <p v-if="contractAudit[3]" class="card-info">High risk:{{contractAudit[3].high_risk_count}} Medium risk:{{contractAudit[3].middle_risk_count}} Low risk:{{contractAudit[3].low_risk_count}}</p>
                        <p v-if="contractAudit[3]" class="card-info" style="position: absolute;bottom:40px;left: 18px">Safety score:{{contractAudit[3].safety_score}}</p>
                    </div>
                </div>
                <!--       风险交易趋势         -->
                <div class="yxfx-line" v-loading="loadingFxTx" element-loading-background="rgba(0, 0, 0, 0.8)">
                     <p>{{ $t('lang.blotua.jyfxqs') }}</p>
                    <div id="yxfx_line"></div>
                </div>
            </div>
            <div class="right">
                <!--       交易风险         -->
                <div class="jyfx" v-loading="loadingTxFx" element-loading-background="rgba(0, 0, 0, 0.8)">
                    <div class="titles">
                        <span>{{ $t('lang.blotua.jyfx') }}</span>
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
                                    :isTooltip="false"
                                    :isShowCopyBtn="false"
                                    fontLength="8"
                                    endLength="8">
                                </be-ellipsis-copy>
                            </td>
                            <td>{{ item.risk_score }}</td>
                            <td>
                                <el-tooltip placement="top" effect="light" >
                                    <template #content>
                                     <span >{{formatDate(createDate(item.tx_time))}} UTC：{{beijing2utc(item.tx_time) }}</span>
                                    </template>
                                    <span class="cursor">{{formatTimeStamp(createDate(item.tx_time).getTime(),$i18n.locale)}}</span>
                                </el-tooltip>
                            </td>
                        </tr>
                    </table>
                </div>
                <!--       风险舆情         -->
                <div class="fxyq" v-loading="loadingFxYq" element-loading-background="rgba(0, 0, 0, 0.8)">
                    <div class="titles">
                        <span>{{ $t('lang.blotua.fxyq') }}</span>
                    </div>
                    <div class="fxyq-body scrollDiy">
                        <div style="position: relative" v-for="item in safetyData"
                             @click="lookTextOriginal(item.sourceUrl)"
                             :key="item.sourceUrl + item.time">
                            <div style="margin-bottom: 10px">
                                <be-ellipsis-copy :targetStr="item.title"
                                                  :is-ellipsis="true"
                                                  :isShowCopyBtn="false"
                                                  :isTooltip="false"
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
                                    :isTooltip="false"
                                    styles="color: #0468C2;font-weight: 400;font-size: 14px;line-height:1.5"
                                    fontLength="35"
                                    endLength="0">
                                </be-ellipsis-copy>
                            </div>
                            <p style="float:right;font-size: 14px;font-weight: 400; color: #0468C2;">
                                <el-tooltip placement="top" effect="light">
                                    <template #content>
                                        <span >UTC：{{beijing2utc(item.time)}}</span>
                                    </template>
                                    <span class="cursor">{{formatDate(createDate(item.time))}}</span>
                                </el-tooltip>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Chart} from '@antv/g2';
import {MarkerCfg} from '@antv/g2/lib/interface';
import {ShapeAttrs} from "@antv/g2/src/dependents";
import {getContractAudit, getTxFxQs, getTxNum} from "../../../../api/blotua";
import {getProjWarning} from "../../../../api/risk-trx";
import {getProjectRankList, getPublicSentimentSecurity,ISentimentSecurity} from "../../../../api/project-ranking";
import {nFormatter, getStore, setStore,openWindow,formatDate,createDate,formatTimeStamp,beijing2utc} from "../../../../utils/common";
import {computed, defineComponent, nextTick, onBeforeUnmount, onMounted, ref, getCurrentInstance} from "vue";
import {useI18n} from "vue-i18n";
import composition from "../../../../utils/mixin/common-func";
import {IPageParam} from "../../../../utils/types";
import {useStore} from "vuex";
import BeEllipsisCopy from "../../../../components/common-components/ellipsis-copy/ellipsis-copy.vue"
import BlotuaProgress from "./blotua-progress.vue"

import {BeIcon} from '../../../../../public/be-ui/be-ui.es.js'
interface IScrollConfigData{
    name:string,
    value:string | number
}
export default defineComponent({
    name: "BlotuaMain",
    components:{BeEllipsisCopy,BlotuaProgress,BeIcon},
    setup(props, ctx){
        const {t,locale} = useI18n()
        const {message,routerPush,route} = composition(props, ctx)
        // 用户名
        const loginUser = ref<string>('')
        // 表头
        const xmphHeader = ref<Array<string>>([])
        const jxfxHeader = ref<Array<string>>([])
        onMounted(()=>{
            loginUser.value = JSON.parse(getStore('userInfo') as string)?.username
            xmphHeader.value = [t('lang.blotua.rank'), t('lang.createProject.createProjectName'), t('lang.projectRinking.score'), t('lang.blotua.xmgm')]
            jxfxHeader.value = [t('lang.riskConfig.tableHeader.txHash'), t('lang.projectRinking.score'), t('lang.blotua.time')]

            nowTimer.value = window.setInterval(()=>{
                now.value = new Date()
            },1000)
            nextTick(()=>{
                 getTxNumToDay()
                 getLineData()
                 getContractAuditData()
                 getWarningRiskData()
                 getFxYqData()
                 getProjRanking()
                 startTimer()
            })
        })
        /**
         * 渲染折线图
         */
        const chart = ref<any>(null)
        const renderLine = ():void =>{
            const chartInner = new Chart({
                container: 'yxfx_line',
                autoFit: true,
                height: 270,
            });
            chart.value = chartInner
            chartInner.data(lineData.value);
            chartInner.scale({
                create_time: {
                    range: [0, 1],
                },
                count: {
                    nice: true,
                },
            });

            chartInner.tooltip({
                showCrosshairs: true,
                shared: true,
            });
            chartInner.legend({
                position: 'top-right',
                marker: (name):MarkerCfg => {
                    const config:MarkerCfg = {
                        symbol: 'circle',
                        style: {
                            fill: 'green',
                            lineWidth: 0,
                        } as ShapeAttrs,
                    }
                    if(name === 'eth'){
                        config.style = (config:ShapeAttrs)=>{return config.fill = '#E6F7FF'}
                        //config.style && config.style.fill =  '#E6F7FF'
                    }
                    if(name === 'bsc'){
                        config.style = (config:ShapeAttrs)=>{return config.fill = '#1496F2'}
                       // config.style.fill =  '#1496F2'

                    }
                    if(name === 'heco'){
                        config.style = (config:ShapeAttrs)=>{return config.fill = '#44D7B6'}
                        //config.style.fill =  '#44D7B6'

                    }
                    if(name === 'polygon'){
                        config.style = (config:ShapeAttrs)=>{return config.fill = '#FFD788'}
                       // config.style.fill =  '#FFD788'

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
            chartInner.axis('create_time', {
                title:{
                    text:t('lang.projectRinking.marketPerformance.time'),
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
            chartInner.axis('count', {
                title:{
                    text:t('lang.blotua.jyfxNum'),
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
            const platformColor = (val:string):string=> {
                if (val === 'eth') {
                    return '#E6F7FF'
                }
                if (val === 'bsc') {
                    return '#1496F2'
                }
                if (val === 'heco') {
                    return '#44D7B6'
                }
                if (val === 'polygon') {
                    return '#FFD788'
                }
                return ''
            }
            chartInner
                .line()
                .position('create_time*count')
                .color('platform', platformColor)
                .shape('smooth');
            chartInner.render();
        }
        /**
         * 获取今日交易量
         */
        const loadingTxNum = ref<boolean>(false)
        const txTotal = ref<number>(0)
        const progress = ref<any>([])
        const instanceInner = getCurrentInstance()
        const scrollConfig = ref<{
            data?:Array<IScrollConfigData>
            unit?:string
            valueFormatter?:any
        }>({data:[]})
        const getTxNumToDay = ():void =>{
            loadingTxNum.value = true
            getTxNum().then(res => {
                if (res) {
                    txTotal.value = res.data.tx_total
                    scrollConfig.value.data = []
                    Object.keys(res.data.platform_tx_info).forEach(val=>{
                        scrollConfig.value.data?.push({
                            name: val,
                            value: res.data.platform_tx_info[val] === '-' ? 0  : res.data.platform_tx_info[val] - 0
                        })
                    })
                    scrollConfig.value.data.sort((a:any,b:any)=>b.value - a.value)
                    scrollConfig.value.unit = t('lang.piece')
                    scrollConfig.value.valueFormatter = ({value}:{value:string | number})=>{
                        if(value === 0){
                            return t('lang.blotua.noData')
                        }
                        return (value as string) +  t('lang.piece')
                    }
                    instanceInner.refs.progress.progressData = scrollConfig.value.data
                }
                loadingTxNum.value = false
            }).catch(err => {
                loadingTxNum.value = false
                message('error', err.message || err)
                console.error(err)
            })
        }
        /**
         * 获取交易风险折线图数据
         */
        const lineData = ref<Array<any>>([])
        const loadingFxTx = ref<boolean>(false)
        const getLineData = ():void =>{
            lineData.value =  []
            loadingFxTx.value = true
            getTxFxQs().then(res => {
                if (res) {
                    Object.keys(res.data).forEach(val=>{
                        lineData.value = lineData.value.concat(res.data[val])
                    })
                    renderLine()
                }
                loadingFxTx.value = false
            }).catch(err => {
                loadingFxTx.value = false
                message('error', err.message || err)
                console.error(err)
            })
        }
        /**
         * 獲取合約審計信息數據
         */
        const contractAudit = ref<Array<any>>([])
        const pageParams = ref<IPageParam>({
                currentPage: 1,
                pageNum: 1,
                pageSize: 4,
                total: 0
            })
        const getContractAuditData = ():void =>{
            contractAudit.value = []
            const params:IPageParam = {
                page_num:pageParams.value.pageNum,
                page_size:pageParams.value.pageSize,
            }
            getContractAudit(params).then(res => {
                if (res) {
                    contractAudit.value = res.data.page_infos
                    pageParams.value.total = res.data.total
                }
            }).catch(err => {
                message('error', err.message || err)
                console.error(err)
            })
        }
        /**
         * 获取风险警告数据
         */
        const loadingTxFx = ref<boolean>(false)
        const warningRisk = ref<Array<any>>([])
        const pageParamsWR = ref<IPageParam>({
            currentPage: 1,
            pageNum: 1,
            pageSize: 4,
            total: 0
        })
        const getWarningRiskData = ():void =>{
            let params = {
                page_num:pageParamsWR.value.pageNum,
                page_size:pageParamsWR.value.pageSize,
                platform:'',
            }
           loadingTxFx.value = true
            warningRisk.value = []
            getProjWarning(params).then(res=>{
                if(res){
                    warningRisk.value = res.data.page_infos
                    pageParamsWR.value.total = res.data.total
                }
                loadingTxFx.value = false
            }).catch(err=>{
                loadingTxFx.value = false
                message('error', err.message || err)
                console.error(err)
            })
        }
        /**
         * 获取风险舆情新闻数据
         */
        const loadingFxYq = ref<boolean>(false)
        const safetyData = ref<Array<any>>([])
        const getFxYqData = ():void =>{
            safetyData.value = []
            let params:ISentimentSecurity = {
                project_id: null,
                page_num: 1,
                page_size: 5,
            }
            loadingFxYq.value = true
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
                }
                loadingFxYq.value = false
            }).catch(err => {
                loadingFxYq.value = false
                message('error', err.message || err)
                console.error(err)
            })
        }
        /**
         * 获取項目排行數據
         */
        const loadingProjRank = ref<boolean>(false)
        const rankList = ref<Array<any>>([])
        const getProjRanking = ():void =>{
            const _this = this
            let params = {
                page_num:1,
                page_size:10,
            }
            rankList.value = []
            loadingProjRank.value = true
            getProjectRankList(params).then(res=>{
                if(res){
                    rankList.value = res.data.page_info
                }
                loadingProjRank.value = false
            }).catch(err=>{
                loadingProjRank.value = false
                message('error', err.message || err)
                console.error(err)
            })
        }
        /**
         * 启动轮询
         */
            // 定时器相关
        const step = ref<number>(5000)
        const now = ref<Date>(new Date())
        const timer = ref<number>(0)
        const nowTimer = ref<number>(0)
        const startTimer = ():void =>{
            timer.value = (window.setInterval(()=>{
                pageParams.value.pageNum = (pageParams.value.pageNum!) + 1
                if((pageParams.value.pageNum!) > Math.ceil((pageParams.value.total!)/4)){
                    pageParams.value.pageNum = 1
                }

                getContractAuditData()
                getWarningRiskData()
            },step.value))
        }
        /**
         * 重新设置定时器轮询
         */
        const resetTimer = ():void =>{
            clearInterval(timer.value)
            if(!step.value){
                return
            }
            startTimer()
        }
        // 查看原文按钮
        const lookTextOriginal = (url:string):void =>{
            if(url){
                openWindow(url)
            }
        }
        /**
         * 打開交易分析詳情tab
         */
        const openDetail = (params: { tx_hash:string }):void =>{
            openWindow(`#/riskTrx/detail?tx_hash=${params.tx_hash}`)
        }
        /**
         * 打開到项目态势详情
         */
        const openProjectRanking = (params:string,name:string):void =>{
            openWindow(`#/projectRanking?${name}=${params}&type=outLink`)
        }
        const store = useStore()
        const routerPushSwitch = ():void =>{
            try {
                store.state.routeConfig.forEach((val:any)=>{
                    if(val.path  && val.path !== '/blockchainSituation'){
                        routerPush(val.path)
                        throw new Error('')
                    }
                })
            } catch (e) {
                console.log(e);
            }
        }

        onBeforeUnmount(()=>{
            clearInterval(timer.value)
            clearInterval(nowTimer.value)
        })
        // 格式化时间为 xxx分钟前
        const formatterSize = computed(()=>{
            return function (val:number,d:number){
                return nFormatter(val,d)
            }
        })

        const changeLanguage = (data:string):void =>{
            if(data === 'logout'){
                routerPush('/login')
                return
            }
            setStore('language', data)
            locale.value = data
            route.meta.titleInfo = t(route.meta.title)
        }
        return {
            changeLanguage,
            getStore,
            loginUser,
            loadingTxNum ,
            loadingTxFx ,
            loadingProjRank,
            loadingFxYq ,
            loadingFxTx ,
            openProjectRanking,
            routerPushSwitch,
            formatterSize,
            openDetail,
            lookTextOriginal,
            resetTimer,
            startTimer,
            getProjRanking,
            formatDate,
            safetyData,
            createDate,
            formatTimeStamp,
            beijing2utc,
            scrollConfig,
            txTotal,
            rankList,
            contractAudit,
            xmphHeader,
            jxfxHeader,
            warningRisk,
            progress,
        }
    }

})

</script>
<style lang="scss">
.blotua-main {
  width: 100vw;
  height: 100vh;
  background-image: url("../../../../assets/image/pc/lsts-bg.png");
  background-repeat: round;
  background-size: 100%;

  .jrjyl {
    box-sizing: border-box;
    height: 40%;
    padding-bottom: 10px;
    margin-bottom: 18px;
    background-image: url("../../../../assets/image/pc/box-1.png");
    background-repeat: round;
    background-size: 100%;

    .sum-div {
      display: flex;
      justify-content: center;

      .sum {
        min-width: 60%;
        margin: 20px 0;
        font-family: PingFang-SC-Heavy, PingFang-SC sans-serif;
        font-size: 28px;
        font-weight: 800;
        line-height: 36px;
        color: #84CCFF;
        text-align: center;
        background-image: url("../../../../assets/image/pc/sum.png");
        background-repeat: round;
        background-size: 100%;
      }
    }

    .scroll-ranking {
      box-sizing: initial;
      padding: 0 18px;

      .dv-scroll-ranking-board .ranking-column {
        background: #002546;
        border-bottom: 0;
      }

      .dv-scroll-ranking-board .ranking-column .inside-column {
        margin-bottom: 0;
        background-color: #0468C2;
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
    box-sizing: border-box;
    height: 56%;
    padding-bottom: 10px;
    background-image: url("../../../../assets/image/pc/box-3.png");
    background-repeat: round;
    background-size: 100%;
  }

  .jyfx {
    box-sizing: border-box;
    height: 40%;
    padding-bottom: 10px;
    margin-bottom: 18px;
    background-image: url("../../../../assets/image/pc/box-2.png");
    background-repeat: round;
    background-size: 100%;

    .ellipsis-copy {
      width: 124px;
      min-width: initial !important;
    }

    .index {
      float: left;
      width: 30px;
      height: 30px;
      margin: auto 10px auto 0;
      -webkit-clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
      clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
      line-height: 30px;
      background: #0A5292
    }
  }

  .fxyq {
    box-sizing: border-box;
    height: 56%;
    padding-bottom: 10px;
    background-image: url("../../../../assets/image/pc/box-4.png");
    background-repeat: round;
    background-size: 100%;

    .fxyq-body {
      box-sizing: border-box;
      height: 90%;
      padding: 0 18px;
      overflow-y: auto;
    }
  }

  .titles {
    width: 100%;
    height: 30px;
    margin-bottom: 15px;
    font-family: PingFang-SC-Heavy, PingFang-SC sans-serif;
    font-size: 16px;
    font-weight: bold;
    line-height: 46px;
    color: #1496F2;
    text-align: center;

    span {
      margin-right: 20px;
    }
  }

  .blotua-table {
    box-sizing: border-box;
    width: 100%;
    padding: 14px;
    margin-top: 30px;
    border-collapse: initial;

    .blotua-table-header {
      font-family: PingFang-SC-Heavy, PingFang-SC sans-serif;
      font-size: 12px;
      font-weight: 800;
      line-height: 18px;
      color: #0468C2;
      text-align: center;
    }

    .blotua-table-col {
      font-family: PingFangSC-Regular, PingFang SC sans-serif;
      font-size: 12px;
      font-weight: 400;
      line-height: 34px;
      color: #84CCFF;
      text-align: center;

      &:hover {
        background: rgba(0, 0, 0, .4);
      }

      .ellipsis-copy{
        justify-content: center;
        min-width: initial !important;
      }
    }
  }
}

.blotua-main-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  padding: 0 20px;

  .timer{
    display: flex;
    align-items: center;
    margin-bottom: 10px;

    .el-input__inner{
      height: 24px;
      line-height: 24px;
      background: transparent;
      border-color:#0A4066;
    }
  }

  .blotua-main-user {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .btn {
      width: 88px;
      height: 24px;
      margin-bottom: 10px;
      color: $mainColor7;
      background: linear-gradient(180deg, #67BCF7 0%, #07659E 100%);
      border: 0;
      border-radius: 2px
    }
  }

  .project-name {
    font-family: YouSheBiaoTiHei sans-serif;
    font-size: 32px;
    line-height: 42px;
    color: #FFF;
    text-shadow: 2px 6px 10px rgba(9, 39, 67, .8);
    background: linear-gradient(180deg, #FFF 0%, #2F86C9 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}

.blotua-main-body {
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  width: 100vw;
  height: calc(100% - 60px);
  padding: 18px;

  .left {
    width: 20%;
  }

  .right {
    width: 20%;
  }

  .center {
    box-sizing: border-box;
    width: 60%;
    padding: 18px;

    .four-card {
      position: relative;
      width: 100%;
      height: 60%;

      .card1 {
        position: absolute;
        top: 0;
        left: 0;
        box-sizing: border-box;
        width: 40%;
        height: 40%;
        padding: 30px 18px;
        background-image: url("../../../../assets/image/pc/card1.png");
        background-repeat: round;
        background-size: 100%;
      }

      .card2 {
        position: absolute;
        top: 0;
        right: 0;
        box-sizing: border-box;
        width: 40%;
        height: 40%;
        padding: 30px 18px;
        background-image: url("../../../../assets/image/pc/card2.png");
        background-repeat: round;
        background-size: 100%;
      }

      .card3 {
        position: absolute;
        bottom: 0;
        left: 0;
        box-sizing: border-box;
        width: 40%;
        height: 40%;
        padding: 30px 18px;
        background-image: url("../../../../assets/image/pc/card3.png");
        background-repeat: round;
        background-size: 100%;
      }

      .card4 {
        position: absolute;
        right: 0;
        bottom: 0;
        box-sizing: border-box;
        width: 40%;
        height: 40%;
        padding: 30px 18px;
        background-image: url("../../../../assets/image/pc/card4.png");
        background-repeat: round;
        background-size: 100%;
      }

      .card-title1 {
        margin-bottom: 10px;
        font-family: PingFang-SC-Heavy, PingFang-SC sans-serif;
        font-size: 16px;
        font-weight: 800;
        line-height: 16px;
        color: #44D7B6;
      }

      .card-title2 {
        margin-bottom: 10px;
        font-family: PingFang-SC-Heavy, PingFang-SC sans-serif;
        font-size: 16px;
        font-weight: 800;
        line-height: 16px;
        color: #FFD788;
      }

      .card-info {
        font-family: PingFang-SC-Heavy, PingFang-SC sans-serif;
        font-size: 14px;
        font-weight: 400;
        line-height: 1.5;
        color: #84CCFF;
      }
    }

    .yxfx-line {
      box-sizing: border-box;
      width: 100%;
      height: 328px;
      padding: 18px;

      p{
        margin-bottom: 10px;
        font-family: PingFang-SC-Heavy, PingFang-SC sans-serif;
        font-size: 16px;
        font-weight: 800;
        line-height: 24px;
        color: #1496F2;
      }
    }
  }
}
</style>