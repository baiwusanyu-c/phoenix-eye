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
            <span style="color: #84CCFF;margin-bottom: 10px">2021.11.15 12:32</span>
            <h1 class="project-name">{{ $t('el.blotua.projectName') }}</h1>
            <div class="blotua-main-user">
                <img src="@/assets/image/pc/user2.png" alt="" style="margin-bottom: 10px">
                <span style="margin: 0 10px 10px 10px;color: white">{{ loginUser }}</span>
                <el-button class="btn" @click="$router.push('/projectRanking')">{{ $t('el.blotua.enter') }}</el-button>
            </div>
        </div>
        <!--   主体     -->
        <div class="blotua-main-body">
            <div class="left">
                <!--       今日交易         -->
                <div class="jrjyl">
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
                <!--       项目排行         -->
                <div class="xmph">
                    <div class="titles">
                        <span>{{ $t('el.blotua.xmph') }}</span>
                    </div>
                    <table class="blotua-table">
                        <tr class="blotua-table-header">
                            <td v-for="item in xmphHeader" :key="item + 'xmph'">{{ item }}</td>
                        </tr>
                        <tr class="blotua-table-col">
                            <td><img src="@/assets/image/pc/xmph-1.png" alt=""></td>
                            <td>String</td>
                            <td>''</td>
                            <td>绑定值</td>
                        </tr>
                        <tr class="blotua-table-col">
                            <td><img src="@/assets/image/pc/xmph-2.png" alt=""></td>
                            <td>String</td>
                            <td>''</td>
                            <td>绑定值</td>
                        </tr>
                        <tr class="blotua-table-col">
                            <td><img src="@/assets/image/pc/xmph-3.png" alt=""></td>
                            <td>String</td>
                            <td>''</td>
                            <td>绑定值</td>
                        </tr>
                        <tr class="blotua-table-col">
                            <td>modelValue</td>
                            <td>String</td>
                            <td>''</td>
                            <td>绑定值</td>
                        </tr>
                    </table>
                </div>
            </div>
            <div class="center">
                <!--       四个轮播信息         -->
                <div class="four-card">
                    <div class="card1">
                        <p v-if="contractAudit[0]" class="card-title2">Scanning Contract</p>
                        <p v-if="contractAudit[0]" class="card-info">{{ contractAudit[0].platform }}:{{contractAudit[0].contract_address}}</p>
                        <p v-if="contractAudit[0]" class="card-info">High risk:{{contractAudit[0].high_risk_count}} Medium risk:{{contractAudit[0].middle_risk_count}} Low risk:{{contractAudit[0].low_risk_count}}</p>
                        <p v-if="contractAudit[0]" class="card-info" style="position: absolute;left: 18px;bottom:40px">Safety score:{{contractAudit[0].safety_score}}</p>
                    </div>
                    <div class="card2">
                        <p v-if="contractAudit[1]" class="card-title1">Scanning Contract</p>
                        <p v-if="contractAudit[1]" class="card-info">{{ contractAudit[1].platform }}:{{contractAudit[1].contract_address}}</p>
                        <p v-if="contractAudit[1]" class="card-info">High risk:{{contractAudit[1].high_risk_count}} Medium risk:{{contractAudit[1].middle_risk_count}} Low risk:{{contractAudit[1].low_risk_count}}</p>
                        <p v-if="contractAudit[1]" class="card-info" style="position: absolute;left: 18px;bottom:40px">Safety score:{{contractAudit[1].safety_score}}</p>
                    </div>
                    <div class="card3">
                        <p v-if="contractAudit[2]" class="card-title2">Scanning Contract</p>
                        <p v-if="contractAudit[2]" class="card-info">{{ contractAudit[2].platform }}:{{contractAudit[2].contract_address}}</p>
                        <p v-if="contractAudit[2]" class="card-info">High risk:{{contractAudit[2].high_risk_count}} Medium risk:{{contractAudit[2].middle_risk_count}} Low risk:{{contractAudit[2].low_risk_count}}</p>
                        <p v-if="contractAudit[2]" class="card-info" style="position: absolute;left: 18px;bottom:40px">Safety score:{{contractAudit[2].safety_score}}</p>
                    </div>
                    <div class="card4">
                        <p v-if="contractAudit[3]" class="card-title1">Scanning Contract</p>
                        <p v-if="contractAudit[3]" class="card-info">{{ contractAudit[3].platform }}:{{contractAudit[3].contract_address}}</p>
                        <p v-if="contractAudit[3]" class="card-info">High risk:{{contractAudit[3].high_risk_count}} Medium risk:{{contractAudit[3].middle_risk_count}} Low risk:{{contractAudit[3].low_risk_count}}</p>
                        <p v-if="contractAudit[3]" class="card-info" style="position: absolute;left: 18px;bottom:40px">Safety score:{{contractAudit[3].safety_score}}</p>
                    </div>
                </div>
                <!--       风险交易趋势         -->
                <div class="yxfx-line">
                     <p>风险交易趋势</p>
                    <div id="yxfx_line"></div>
                </div>
            </div>
            <div class="right">
                <!--       交易风险         -->
                <div class="jyfx">
                    <div class="titles">
                        <span>{{ $t('el.blotua.jyfx') }}</span>
                    </div>
                    <table class="blotua-table">
                        <tr class="blotua-table-header">
                            <td v-for="item in jxfxHeader" :key="item + 'jyfx'">{{ item }}</td>
                        </tr>
                        <tr class="blotua-table-col">
                            <td style="display: flex;justify-content: center">
                                <div class="index">01</div>
                                <be-ellipsis-copy
                                    targetStr="0x1231230x280x1231230x2800x1231230x280x1231230x280x1231230x280x1231230x280x1231230x280x1231230x28x1231230x28"
                                    :is-ellipsis="true"
                                    :isShowCopyBtn="false"
                                    fontLength="8"
                                    endLength="8">
                                </be-ellipsis-copy>
                            </td>
                            <td>55</td>
                            <td>3分钟前</td>
                        </tr>
                    </table>
                </div>
                <!--       风险舆情         -->
                <div class="fxyq">
                    <div class="titles">
                        <span>{{ $t('el.blotua.fxyq') }}</span>
                    </div>
                    <div class="fxyq-body scrollDiy">
                        <div style="position: relative">
                            <div style="margin-bottom: 10px">
                                <be-ellipsis-copy targetStr="英国Metro银行和汇丰银行冻结并关闭英国Metro银行和汇丰银行冻结并关闭英国Metro银行和汇丰银行冻结并关闭"
                                                  :is-ellipsis="true"
                                                  :isShowCopyBtn="false"
                                                  styles="color: #84CCFF;font-weight: 500;font-size: 16px;"
                                                  fontLength="20"
                                                  endLength="0">
                                </be-ellipsis-copy>
                            </div>
                            <div>
                                <be-ellipsis-copy
                                    targetStr="9月3日消息，英国Metro银行和汇丰银行近期几乎同一时间 英国Metro银行和汇丰银行近期几乎同一时间英国Metro银行和汇丰银行近期几乎同一时间英国Metro银行和汇丰银行近期几乎同一时间"
                                    :is-ellipsis="true"
                                    :isShowCopyBtn="false"
                                    styles="color: #0468C2;font-weight: 400;font-size: 14px;line-height:1.5"
                                    fontLength="35"
                                    endLength="0">
                                </be-ellipsis-copy>
                            </div>
                            <p style="position: absolute;bottom: 0;right:0;color: #0468C2;font-weight: 400;font-size: 14px;">
                                2021.11.15 11:20</p>
                        </div>

                        <div style="position: relative">
                            <div style="margin-bottom: 10px">
                                <be-ellipsis-copy targetStr="英国Metro银行和汇丰银行冻结并关闭英国Metro银行和汇丰银行冻结并关闭英国Metro银行和汇丰银行冻结并关闭"
                                                  :is-ellipsis="true"
                                                  :isShowCopyBtn="false"
                                                  styles="color: #84CCFF;font-weight: 500;font-size: 16px;"
                                                  fontLength="20"
                                                  endLength="0">
                                </be-ellipsis-copy>
                            </div>
                            <div>
                                <be-ellipsis-copy
                                    targetStr="9月3日消息，英国Metro银行和汇丰银行近期几乎同一时间 英国Metro银行和汇丰银行近期几乎同一时间英国Metro银行和汇丰银行近期几乎同一时间英国Metro银行和汇丰银行近期几乎同一时间"
                                    :is-ellipsis="true"
                                    :isShowCopyBtn="false"
                                    styles="color: #0468C2;font-weight: 400;font-size: 14px;line-height:1.5"
                                    fontLength="35"
                                    endLength="0">
                                </be-ellipsis-copy>
                            </div>
                            <p style="position: absolute;bottom: 0;right:0;color: #0468C2;font-weight: 400;font-size: 14px;">
                                2021.11.15 11:20</p>
                        </div>
                        <div style="position: relative">
                            <div style="margin-bottom: 10px">
                                <be-ellipsis-copy targetStr="英国Metro银行和汇丰银行冻结并关闭英国Metro银行和汇丰银行冻结并关闭英国Metro银行和汇丰银行冻结并关闭"
                                                  :is-ellipsis="true"
                                                  :isShowCopyBtn="false"
                                                  styles="color: #84CCFF;font-weight: 500;font-size: 16px;"
                                                  fontLength="20"
                                                  endLength="0">
                                </be-ellipsis-copy>
                            </div>
                            <div>
                                <be-ellipsis-copy
                                    targetStr="9月3日消息，英国Metro银行和汇丰银行近期几乎同一时间 英国Metro银行和汇丰银行近期几乎同一时间英国Metro银行和汇丰银行近期几乎同一时间英国Metro银行和汇丰银行近期几乎同一时间"
                                    :is-ellipsis="true"
                                    :isShowCopyBtn="false"
                                    styles="color: #0468C2;font-weight: 400;font-size: 14px;line-height:1.5"
                                    fontLength="35"
                                    endLength="0">
                                </be-ellipsis-copy>
                            </div>
                            <p style="position: absolute;bottom: 0;right:0;color: #0468C2;font-weight: 400;font-size: 14px;">
                                2021.11.15 11:20</p>
                        </div>
                        <div style="position: relative">
                            <div style="margin-bottom: 10px">
                                <be-ellipsis-copy targetStr="英国Metro银行和汇丰银行冻结并关闭英国Metro银行和汇丰银行冻结并关闭英国Metro银行和汇丰银行冻结并关闭"
                                                  :is-ellipsis="true"
                                                  :isShowCopyBtn="false"
                                                  styles="color: #84CCFF;font-weight: 500;font-size: 16px;"
                                                  fontLength="20"
                                                  endLength="0">
                                </be-ellipsis-copy>
                            </div>
                            <div>
                                <be-ellipsis-copy
                                    targetStr="9月3日消息，英国Metro银行和汇丰银行近期几乎同一时间 英国Metro银行和汇丰银行近期几乎同一时间英国Metro银行和汇丰银行近期几乎同一时间英国Metro银行和汇丰银行近期几乎同一时间"
                                    :is-ellipsis="true"
                                    :isShowCopyBtn="false"
                                    styles="color: #0468C2;font-weight: 400;font-size: 14px;line-height:1.5"
                                    fontLength="35"
                                    endLength="0">
                                </be-ellipsis-copy>
                            </div>
                            <p style="position: absolute;bottom: 0;right:0;color: #0468C2;font-weight: 400;font-size: 14px;">
                                2021.11.15 11:20</p>
                        </div>
                        <div style="position: relative">
                            <div style="margin-bottom: 10px">
                                <be-ellipsis-copy targetStr="英国Metro银行和汇丰银行冻结并关闭英国Metro银行和汇丰银行冻结并关闭英国Metro银行和汇丰银行冻结并关闭"
                                                  :is-ellipsis="true"
                                                  :isShowCopyBtn="false"
                                                  styles="color: #84CCFF;font-weight: 500;font-size: 16px;"
                                                  fontLength="20"
                                                  endLength="0">
                                </be-ellipsis-copy>
                            </div>
                            <div>
                                <be-ellipsis-copy
                                    targetStr="9月3日消息，英国Metro银行和汇丰银行近期几乎同一时间 英国Metro银行和汇丰银行近期几乎同一时间英国Metro银行和汇丰银行近期几乎同一时间英国Metro银行和汇丰银行近期几乎同一时间"
                                    :is-ellipsis="true"
                                    :isShowCopyBtn="false"
                                    styles="color: #0468C2;font-weight: 400;font-size: 14px;line-height:1.5"
                                    fontLength="35"
                                    endLength="0">
                                </be-ellipsis-copy>
                            </div>
                            <p style="position: absolute;bottom: 0;right:0;color: #0468C2;font-weight: 400;font-size: 14px;">
                                2021.11.15 11:20</p>
                        </div>
                        <div style="position: relative">
                            <div style="margin-bottom: 10px">
                                <be-ellipsis-copy targetStr="英国Metro银行和汇丰银行冻结并关闭英国Metro银行和汇丰银行冻结并关闭英国Metro银行和汇丰银行冻结并关闭"
                                                  :is-ellipsis="true"
                                                  :isShowCopyBtn="false"
                                                  styles="color: #84CCFF;font-weight: 500;font-size: 16px;"
                                                  fontLength="20"
                                                  endLength="0">
                                </be-ellipsis-copy>
                            </div>
                            <div>
                                <be-ellipsis-copy
                                    targetStr="9月3日消息，英国Metro银行和汇丰银行近期几乎同一时间 英国Metro银行和汇丰银行近期几乎同一时间英国Metro银行和汇丰银行近期几乎同一时间英国Metro银行和汇丰银行近期几乎同一时间"
                                    :is-ellipsis="true"
                                    :isShowCopyBtn="false"
                                    styles="color: #0468C2;font-weight: 400;font-size: 14px;line-height:1.5"
                                    fontLength="35"
                                    endLength="0">
                                </be-ellipsis-copy>
                            </div>
                            <p style="position: absolute;bottom: 0;right:0;color: #0468C2;font-weight: 400;font-size: 14px;">
                                2021.11.15 11:20</p>
                        </div>
                        <div style="position: relative">
                            <div style="margin-bottom: 10px">
                                <be-ellipsis-copy targetStr="英国Metro银行和汇丰银行冻结并关闭英国Metro银行和汇丰银行冻结并关闭英国Metro银行和汇丰银行冻结并关闭"
                                                  :is-ellipsis="true"
                                                  :isShowCopyBtn="false"
                                                  styles="color: #84CCFF;font-weight: 500;font-size: 16px;"
                                                  fontLength="20"
                                                  endLength="0">
                                </be-ellipsis-copy>
                            </div>
                            <div>
                                <be-ellipsis-copy
                                    targetStr="9月3日消息，英国Metro银行和汇丰银行近期几乎同一时间 英国Metro银行和汇丰银行近期几乎同一时间英国Metro银行和汇丰银行近期几乎同一时间英国Metro银行和汇丰银行近期几乎同一时间"
                                    :is-ellipsis="true"
                                    :isShowCopyBtn="false"
                                    styles="color: #0468C2;font-weight: 400;font-size: 14px;line-height:1.5"
                                    fontLength="35"
                                    endLength="0">
                                </be-ellipsis-copy>
                            </div>
                            <p style="position: absolute;bottom: 0;right:0;color: #0468C2;font-weight: 400;font-size: 14px;">
                                2021.11.15 11:20</p>
                        </div>
                        <div style="position: relative">
                            <div style="margin-bottom: 10px">
                                <be-ellipsis-copy targetStr="英国Metro银行和汇丰银行冻结并关闭英国Metro银行和汇丰银行冻结并关闭英国Metro银行和汇丰银行冻结并关闭"
                                                  :is-ellipsis="true"
                                                  :isShowCopyBtn="false"
                                                  styles="color: #84CCFF;font-weight: 500;font-size: 16px;"
                                                  fontLength="20"
                                                  endLength="0">
                                </be-ellipsis-copy>
                            </div>
                            <div>
                                <be-ellipsis-copy
                                    targetStr="9月3日消息，英国Metro银行和汇丰银行近期几乎同一时间 英国Metro银行和汇丰银行近期几乎同一时间英国Metro银行和汇丰银行近期几乎同一时间英国Metro银行和汇丰银行近期几乎同一时间"
                                    :is-ellipsis="true"
                                    :isShowCopyBtn="false"
                                    styles="color: #0468C2;font-weight: 400;font-size: 14px;line-height:1.5"
                                    fontLength="35"
                                    endLength="0">
                                </be-ellipsis-copy>
                            </div>
                            <p style="position: absolute;bottom: 0;right:0;color: #0468C2;font-weight: 400;font-size: 14px;">
                                2021.11.15 11:20</p>
                        </div>
                        <div style="position: relative">
                            <div style="margin-bottom: 10px">
                                <be-ellipsis-copy targetStr="英国Metro银行和汇丰银行冻结并关闭英国Metro银行和汇丰银行冻结并关闭英国Metro银行和汇丰银行冻结并关闭"
                                                  :is-ellipsis="true"
                                                  :isShowCopyBtn="false"
                                                  styles="color: #84CCFF;font-weight: 500;font-size: 16px;"
                                                  fontLength="20"
                                                  endLength="0">
                                </be-ellipsis-copy>
                            </div>
                            <div>
                                <be-ellipsis-copy
                                    targetStr="9月3日消息，英国Metro银行和汇丰银行近期几乎同一时间 英国Metro银行和汇丰银行近期几乎同一时间英国Metro银行和汇丰银行近期几乎同一时间英国Metro银行和汇丰银行近期几乎同一时间"
                                    :is-ellipsis="true"
                                    :isShowCopyBtn="false"
                                    styles="color: #0468C2;font-weight: 400;font-size: 14px;line-height:1.5"
                                    fontLength="35"
                                    endLength="0">
                                </be-ellipsis-copy>
                            </div>
                            <p style="position: absolute;bottom: 0;right:0;color: #0468C2;font-weight: 400;font-size: 14px;">
                                2021.11.15 11:20</p>
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
            contractAudit:[]
        }
    },
    created() {
        this.loginUser = JSON.parse(this.getStore('userInfo')).username
        this.xmphHeader = ['排行', '项目名称', '安全评分', '项目规模']
        this.jxfxHeader = ['交易哈希', '安全评分', '时间']
        this.lineData =  [
            { month: 'Jan', city: 'Tokyo', temperature: 7 },
            { month: 'Jan', city: 'London', temperature: 3.9 },
            { month: 'Feb', city: 'Tokyo', temperature: 6.9 },
            { month: 'Feb', city: 'London', temperature: 4.2 },
            { month: 'Mar', city: 'Tokyo', temperature: 9.5 },
            { month: 'Mar', city: 'London', temperature: 5.7 },
            { month: 'Apr', city: 'Tokyo', temperature: 14.5 },
            { month: 'Apr', city: 'London', temperature: 8.5 },
            { month: 'May', city: 'Tokyo', temperature: 18.4 },
            { month: 'May', city: 'London', temperature: 11.9 },
            { month: 'Jun', city: 'Tokyo', temperature: 21.5 },
            { month: 'Jun', city: 'London', temperature: 15.2 },
            { month: 'Jul', city: 'Tokyo', temperature: 25.2 },
            { month: 'Jul', city: 'London', temperature: 17 },
            { month: 'Aug', city: 'Tokyo', temperature: 26.5 },
            { month: 'Aug', city: 'London', temperature: 16.6 },
            { month: 'Sep', city: 'Tokyo', temperature: 23.3 },
            { month: 'Sep', city: 'London', temperature: 14.2 },
            { month: 'Oct', city: 'Tokyo', temperature: 18.3 },
            { month: 'Oct', city: 'London', temperature: 10.3 },
            { month: 'Nov', city: 'Tokyo', temperature: 13.9 },
            { month: 'Nov', city: 'London', temperature: 6.6 },
            { month: 'Dec', city: 'Tokyo', temperature: 9.6 },
            { month: 'Dec', city: 'London', temperature: 4.8 },
        ];

    },
    mounted() {
        this.$nextTick(()=>{
            this.getTxNumToDay()
            //this.getLineData()
            this.getContractAuditData()
        })
    },
    methods: {
        /**
         * 渲染折线图
         */
        renderLine(){
            const chart = new Chart({
                container: 'yxfx_line',
                autoFit: true,
                height: 300,
            });
            this.chart = chart
            chart.data(this.lineData);
            chart.scale({
                month: {
                    range: [0, 1],
                },
                temperature: {
                    nice: true,
                },
            });

            chart.tooltip({
                showCrosshairs: true,
                shared: true,
            });
            chart.legend({
                position: 'top-right',
                marker: (name, index) => {
                    return {
                        symbol: 'circle',
                        style: {
                            fill: index === 0 ? 'purple' : 'green',
                            lineWidth: 0,
                        },
                    };
                },
                itemName: {
                    style:{
                        fill:'#0468C2',
                    }
                },
            });
            chart.axis('month', {
                title:{
                    text:'日期',
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
            chart.axis('temperature', {
                title:{
                    text:'风险交易数',
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
                .position('month*temperature')
                .color('city', (val) => {
                    return '#2194ff';
                })
                .shape('smooth');
            chart.render();
        },
        /**
         * 获取今日交易量
         */
        getTxNumToDay(){
            const _this = this
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
            }).catch(err => {
                _this.$message.error(err.message)
                console.error(err)
            })
        },
        /**
         * 获取交易风险折线图数据
         */
        getLineData(){
            const _this = this
            getTxFxQs().then(res => {
                if (res) {
                    debugger
                    //this.renderLine()
                }
            }).catch(err => {
                _this.$message.error(err.message)
                console.error(err)
            })
        },
        /**
         * 獲取合約審計信息數據
         */
        getContractAuditData(){
            const _this = this
            getContractAudit().then(res => {
                if (res) {
                    _this.contractAudit = res.data
                }
            }).catch(err => {
                _this.$message.error(err.message)
                console.error(err)
            })
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
            width: auto;
        }

        .index {
            background: #0A5292;
            width: 30px;
            height: 30px;
            margin-right: 10px;
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
            line-height: 30px;
            text-align: center;

            &:hover {
                background: rgba(0, 0, 0, 0.4);
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