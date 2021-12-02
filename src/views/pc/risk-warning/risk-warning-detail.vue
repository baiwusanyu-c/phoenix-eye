/*
* @risk-warning-detail.vue
* @deprecated 风险警告交易详情分析页面
* @author czh
* @update (czh 2021/11/2)
*/
<template>
    <div class="risk-warning-detail scrollDiy" v-loading="loading">
        <!--   基本信息     -->
        <div class="detail-body">
            <div class="detail-item">
                <div class="detail-item-txt">
                    {{ $t('el.riskConfig.tableHeader.txHash') }}：
                    {{ baseInfo.tx_hash }}
                </div>
                <el-button class="default open-web" @click="openWeb">{{ $t('el.riskConfig.txDetail') }} >></el-button>
            </div>
            <div class="detail-item detail-form">
                <div class="detail-item-txt">
                    <span class="label">{{ $t('el.riskConfig.platform') }}：</span>
                    {{ baseInfo.platform ? baseInfo.platform.toUpperCase() : '' }}
                </div>
                <div class="detail-item-txt">
                    <span class="label">{{ $t('el.riskConfig.values') }}：</span>
                    <el-tooltip placement="top" effect="light">
                        <span slot="content">{{ baseInfo.token_num }}</span>
                        <span> {{$simulateToFixed(baseInfo.token_num,6)}}</span>
                    </el-tooltip>
                    <span>&nbsp;&nbsp;{{ baseInfo.token_unit ? baseInfo.token_unit.toUpperCase() : '' }}&nbsp;&nbsp;</span>
                    <el-tooltip placement="top" effect="light">
                        <span slot="content">{{ baseInfo.dollar_money }}</span>
                        <span> ${{$simulateToFixed(baseInfo.dollar_money,0)}}</span>
                    </el-tooltip>
                </div>
            </div>
            <div class="detail-item detail-form">
                <div class="detail-item-txt">
                    <span class="label">{{ $t('el.riskConfig.tableHeader.from') }}：</span>
                    {{ baseInfo.from_address_tag ? baseInfo.from_address_tag :  baseInfo.from_address}}
                </div>
                <div class="detail-item-txt">
                    <span class="label">{{ $t('el.riskConfig.tableHeader.to') }}：</span>
                    {{ baseInfo.to_address_tag ? baseInfo.to_address_tag :  baseInfo.to_address}}
                </div>
            </div>
            <div class="detail-item">
                <div class="detail-item-txt">
                    <span class="label">{{ $t('el.riskConfig.features') }}：</span>
                    <el-tag v-for="item in baseInfo.risk_features"
                            :key="item">{{item}}
                    </el-tag>
                </div>
            </div>
        </div>
        <!--   地址收益     -->
        <div class="detail-profit">
            <h3>{{ $t('el.riskConfig.profit') }}</h3>
            <div class="detail-profit-body" v-if="profitData.length > 0">
                <el-table
                    tooltip-effect="light"
                    :data="profitData">
                    <div slot="empty"
                         class = 'empty-table'>
                        <img class="img" src="@/assets/image/pc/empty-data.png" alt="">
                        <p style="line-height: 25px">{{$t('el.emptyData')}}</p>
                    </div>
                    <el-table-column
                        prop="platform"
                        :label="$t('el.riskConfig.profitTableHeader.addr')"
                        :width="addrCellWidth"
                        align="left">
                        <template slot-scope="scope">
                            <div style="display: flex;justify-content: center;align-items: center;">
                                <be-svg-icon disabled-tool-tip icon-class="files" style="margin-right: 15px"></be-svg-icon>
                                <be-ellipsis-copy :targetStr="scope.row.address_tag"
                                                  styles="font-weight: bold;color:#409EFF"
                                                  :tooltip-txt="scope.row.address"
                                                  :isEllipsis="false"
                                                  v-if="scope.row.address_tag">
                                </be-ellipsis-copy>
                                <be-ellipsis-copy :targetStr="scope.row.address"
                                                  v-if="!scope.row.address_tag"
                                                  :is-ellipsis="isEllipsis || scope.row.address.length >=45"
                                                  styles="font-weight: bold;"
                                                  fontLength="8"
                                                  endLength="8">
                                </be-ellipsis-copy>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="tx_hash"
                        :label="$t('el.riskConfig.profitTableHeader.profitSum')"
                        align="right">
                        <template slot-scope="scope">
                            <el-tooltip placement="top" effect="light">
                                <span slot="content">{{ scope.row.profit }}</span>
                                <span>{{handleProfit(scope.row.profit,0)}}</span>
                            </el-tooltip>
                            <be-svg-icon v-if="scope.row.profit > 0" content="收益" icon-class="-arrow-up"></be-svg-icon>
                            <be-svg-icon v-if="scope.row.profit < 0" content="亏损" icon-class="-arrow-down" style="margin-right: 4px;"></be-svg-icon>
                            <!-- 占位 -->
                            <be-svg-icon v-if="scope.row.profit === 0" disabled-tool-tip icon-class="-arrow-down" style="visibility: hidden"></be-svg-icon>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="addrList"
                        :label="$t('el.riskConfig.profitTableHeader.tokenName')"
                        align="right">
                        <template slot="header">
                            <div style="text-align: center;width: 100%">
                               {{ $t('el.riskConfig.profitTableHeader.tokenName') }}
                            </div>
                        </template>
                        <template slot-scope="scope">
                            <div  v-if="scope.row.addrList && scope.row.addrList.length > 0 ">
                                <p v-for="item in scope.row.addrList"
                                        style="margin-top: 10px;"
                                        :key="item.itemId">{{item.val}}</p>
                            </div>
                            <div style="display: flex;flex-direction: column;justify-content: center;align-items: center" v-else>
                                {{ $t('el.emptyData') }}</div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="valueList"
                        :label="$t('el.riskConfig.profitTableHeader.tokenNum')"
                        align="right">
                        <template slot-scope="scope">
                            <div  v-if="scope.row.valueList && scope.row.valueList.length > 0 ">
                                <p v-for="item in scope.row.valueList"
                                      style="margin-top: 10px;"
                                      :key="item.itemId">
                                    <el-tooltip placement="top" effect="light">
                                        <span slot="content">{{ item.ordVal }}</span>
                                        <span>{{item.val}}</span>
                                    </el-tooltip>
                                </p>
                            </div>
                            <div style="display: flex;flex-direction: column;justify-content: center;align-items: center" v-else>
                                {{ $t('el.emptyData') }}</div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="dollarList"
                        :label="$t('el.riskConfig.profitTableHeader.tokenVal')"
                        align="right">
                        <template slot-scope="scope">
                            <div  v-if="scope.row.dollarList && scope.row.dollarList.length > 0 ">
                                <p v-for="item in scope.row.dollarList"
                                      style="margin-top: 10px;font-weight: bold"
                                      :key="item.itemId">
                                    <el-tooltip placement="top" effect="light">
                                        <span slot="content">{{ item.ordVal }}</span>
                                        <span>({{handleProfit(item.val,0)}})</span>
                                    </el-tooltip>
                                </p>
                            </div>
                            <div style="display: flex;flex-direction: column;justify-content: center;align-items: center" v-else>
                                {{ $t('el.emptyData') }}</div>
                        </template>
                    </el-table-column>

                </el-table>
            </div>
        </div>
    </div>
</template>

<script>
import BeSvgIcon from "../../../components/common-components/svg-icon/be-svg-icon";
import {getProjWarningDetail} from "../../../api/risk-warning";
import webURL from '../../../../public/web-url.json'
import {platformToCurrency} from "../../../utils/platformDict";
export default {
    name: "risk-warning-detail",
    components: {BeSvgIcon},
    data() {
        return {
            // 基础信息
            baseInfo:{},
            // 收益信息
            profitData:[],
            // loading
            loading:false,
            // 是否缩略
            isEllipsis:false,
            // 缩略数量
            ellipsis:'8',
            // 链平台转化币种
            platformToCurrencyInner:platformToCurrency,
            //
            addrCellWidth:'430'
        }
    },
    mounted() {
        this.getInfoData()
        this.initView()
        window.onresize = this.initView
    },
    beforeDestroy() {
        window.onresize = null
    },
    computed:{
        handleProfit(){
            return function (val,dec){
                if(val< 0){
                    return `-$${this.$simulateToFixed(Math.abs(val),dec)}`
                }
                return `$${this.$simulateToFixed(val,dec)}`
            }
        }
    },
    methods: {
        /**
         * 根据屏幕分辨率调整
         */
        initView(){
            const width = window.screen.availWidth
            const height = window.screen.availHeight
            if(height <= 680 || width <=1280) {
                this.addrCellWidth = '260'
                this.isEllipsis = true
                this.ellipsis = '12'
            }
        },
        /**
         * 獲得基本信息
         */
        getInfoData(){
            const _this = this
            const params = {
                tx_hash:_this.$route.query.tx_hash
            }
            _this.loading = true
            getProjWarningDetail(params).then(res=>{
                _this.baseInfo = res.data
                _this.profitData = res.data.address_profits
                _this.profitData.forEach(val=>{
                    val.addrList = []
                    val.dollarList = []
                    val.valueList = []
                    val.token_profits.forEach(valRes=>{
                        res.itemId = this.$getUuid
                        val.addrList.push({val:valRes.token_name,itemId:'token_name'+_this.$getUuid(),tag:valRes.contract_address_tag})
                        val.valueList.push({
                            ordVal:valRes.token_num,
                            val:_this.$simulateToFixed(valRes.token_num,6),
                            itemId:'token_profit_no_dollar'+_this.$getUuid()})
                        val.dollarList.push({
                            ordVal:valRes.dollar_money,
                            val:_this.$simulateToFixed(valRes.dollar_money,0),
                            itemId:'token_profit_dollar'+_this.$getUuid()})
                    })
                })
                _this.loading = false
            }).catch(err=>{
                _this.$message.error(err.message)
                console.error(err)
                _this.loading = false
            })
        },
        /**
         * 跳轉到第三方頁面
         */
        openWeb(){
            if(!this.baseInfo.platform || !this.baseInfo.tx_hash) return
            const url = `${webURL[this.baseInfo.platform]}${this.baseInfo.tx_hash}`
            this.$openWindow(url, 'view_window')
        }

    },
}
</script>

<style lang="scss">
.risk-warning-detail{
    height: 100%;
    .detail-body{
        padding: 20px;
        background: $mainColor7;
        .detail-item{
            display: flex;
            align-items: center;
            justify-content: space-between;
            .open-web{
                width: 126px;
            }
            .detail-item-txt{
                flex:1;
                margin-top: 15px;
                display: flex;
                align-items: center;
                font-weight: bold;
                .label{
                    color: $textColor4;
                    font-weight: normal;
                }
                .el-tag {
                    height: 30px;
                    line-height: 30px;
                    margin-right: 15px;
                    margin-top: 5px;
                    border-radius: 0;
                }
            }
        }
    }
    .detail-profit{
        margin-top: 20px;
        padding: 20px;
        background: $mainColor7;
        min-height: 69.5%;
        .detail-profit-body{
            margin-top: 20px;
            height: calc(100% - 40px);

        }
    }
}
</style>
<!--1080p的145% - 150%放大-->
<style scoped lang="scss">
@media screen and (min-width: 1280px) and (max-height: 638px) and (max-width: 1326px) {
    .risk-warning-detail {
        .detail-body{
            padding: 10px;
            .detail-item {
                .detail-item-txt{
                    margin-top: 5px;
                    font-size: 12px;
                }
                .default{
                    font-size: 12px;
                    height: 25px;
                }
            }
        }
        .detail-profit{
            height: 65.5%;
            padding: 10px;
            h3{
                font-size: 16px;
            }
            .detail-profit-body{
                font-size: 12px;
            }
        }
    }
}
</style>