/*
* @risk-warning-detail.vue
* @deprecated 风险警告交易详情分析页面
* @author czh
* @update (czh 2021/11/2)
*/
<template>
    <div class="risk-warning-detail" v-loading>
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
                    {{baseInfo.money}}
                    {{ platformToCurrencyInner[baseInfo.platform] }} ($17)
                </div>
            </div>
            <div class="detail-item detail-form">
                <div class="detail-item-txt">
                    <span class="label">{{ $t('el.riskConfig.tableHeader.from') }}：</span>
                    {{ baseInfo.from_address }}
                </div>
                <div class="detail-item-txt">
                    <span class="label">{{ $t('el.riskConfig.tableHeader.to') }}：</span>
                    {{ baseInfo.to_address }}
                </div>
            </div>
            <div class="detail-item">
                <div class="detail-item-txt">
                    <span class="label">{{ $t('el.riskConfig.features') }}：</span>
                    <el-tag v-for="item in baseInfo.risk_features"
                            :key="item">{{item}}</el-tag>
                </div>
            </div>
        </div>
        <!--   地址收益     -->
        <div class="detail-profit">
            <h3>{{ $t('el.riskConfig.profit') }}</h3>
            <div class="detail-profit-body scrollDiy" v-if="profitData.length > 0">
                <div v-for="(item) in profitData" :key="item.address" class="detail-profit-container">
                    <div class="detail-profit-grid">
                        <be-svg-icon disabled-tool-tip icon-class="files"></be-svg-icon>
                        <be-ellipsis-copy :targetStr="item.address_tag"
                                          styles="font-weight: bold;color:#409EFF"
                                          :tooltip-txt="item.address"
                                          :isEllipsis="false"
                                          v-if="item.address_tag">
                        </be-ellipsis-copy>
                        <be-ellipsis-copy :targetStr="item.address"
                                          v-if="!item.address_tag"
                                          styles="font-weight: bold;"
                                          fontLength="8"
                                          endLength="8">
                        </be-ellipsis-copy>
                    </div>
                    <div class="detail-profit-grid" style="width: 30px">
                            <be-svg-icon v-if="item.profit > 0"  disabled-tool-tip icon-class="-arrow-up"></be-svg-icon>
                            <be-svg-icon v-if="item.profit < 0" disabled-tool-tip icon-class="-arrow-down" style="margin-right: 4px;"></be-svg-icon>
                    </div>
                    <div class="detail-profit-grid detail-profit-val">
                            <span  style="font-weight: bold;">{{handleProfit(item.profit)}}</span>
                    </div>
                    <div class="profit-grid-list">
                        <div class="profit-grid-list-addr">
                            <ul>
                                <li v-for="(addrItem) in item.addrList" :key="addrItem.itemId">
                                    <be-ellipsis-copy :targetStr="addrItem.val"
                                                      :is-ellipsis="isEllipsis"
                                                      :is-tooltip="isEllipsis"
                                                      v-if="!addrItem.tag"
                                                      :fontLength="ellipsis"
                                                      :endLength="ellipsis">
                                    </be-ellipsis-copy>
                                    <be-ellipsis-copy :targetStr="addrItem.tag"
                                                      styles="font-weight: bold;color:#409EFF"
                                                      :tooltip-txt="addrItem.val"
                                                      :isEllipsis="false"
                                                      v-if="addrItem.tag">
                                    </be-ellipsis-copy>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <ul>
                                <li v-for="(valueItem) in item.valueList" :key="valueItem.itemId">
                                    {{valueItem.val}}
                                </li>
                            </ul>
                        </div>
                        <div>
                            <ul>
                                <li v-for="(dollarItem) in item.dollarList" :key="dollarItem.itemId">
                                    {{dollarItem.val}}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="profitData.length === 0"
                 class = 'empty-data'>
                <img class="img" src="@/assets/image/pc/empty-data.png" alt="">
                <p style="line-height: 25px">{{$t('el.emptyData')}}</p>
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
            platformToCurrencyInner:platformToCurrency
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
            return function (val){
                if(val>0){
                    return `$${val}`
                }
                if(val< 0){
                    return `-$${Math.abs(val)}`
                }
                return `$${val}`
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
                    val.token_profits.forEach(res=>{
                        res.itemId = this.$getUuid
                        val.addrList.push({val:res.contract_address,itemId:'token_name'+_this.$getUuid(),tag:res.contract_address_tag})
                        val.valueList.push({val:res.token_profit_no_dollar,itemId:'token_profit_no_dollar'+_this.$getUuid()})
                        val.dollarList.push({val:res.token_profit_dollar,itemId:'token_profit_dollar'+_this.$getUuid()})
                    })
                })
                _this.loading = false
            }).catch(err=>{
                const msg = _this.$t('el.operation')+ _this.$t('el.failed')
                _this.$message.error(msg)
                console.error(err)
                _this.loading = false
            })
        },
        /**
         * 跳轉到第三方頁面
         */
        openWeb(){
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
        height: 69.5%;
        .detail-profit-body{
            margin-top: 20px;
            height: calc(100% - 40px);
            overflow-y: auto;
            .detail-profit-container{
                display: flex;
                align-items: center;
                flex-direction: row;
                min-height: 50px;
                margin-top: 16px;
                background: $mainColor8;
                padding: 15px 0;
                border-radius: 2px;
                .ellipsis-copy{
                 width: auto;
                    margin-left: 24px;
                }
                .detail-profit-grid{
                    display: flex;
                    align-items: center;
                    flex-direction: row;
                    justify-content: center;
                    width: 20%;
                }
                .detail-profit-val{
                    justify-content: flex-start;
                }
                .profit-grid-list{
                    display: flex;
                    align-items: center;
                    flex-direction: row;
                    justify-content: flex-start;
                    width: 50%;
                    .profit-grid-list-addr{
                        width: 60%;
                        color: $textColor4;
                        text-align: right;
                    }
                    div:nth-child(2){
                        width: 30%;
                        color: $textColor4;
                        text-align: right;
                    }
                    div:nth-child(3){
                        width: 30%;
                        font-weight: bold;
                        text-align: right;
                    }
                    li{
                        margin: 10px 0;
                    }
                }
            }

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
                .detail-profit-container{
                    .profit-grid-list{
                        width: 50%;
                        .profit-grid-list-addr{
                            width: 60%;

                        }
                        div:nth-child(2){
                            width: 30%;

                        }
                        div:nth-child(3){
                            width: 30%;
                        }
                    }
                }
            }
        }
    }
}
</style>