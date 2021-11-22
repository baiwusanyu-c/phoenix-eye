/*
* @risk-warning-detail.vue
* @deprecated 风险警告交易详情分析页面
* @author czh
* @update (czh 2021/11/2)
*/
<template>
    <div class="risk-warning-detail">
        <!--   基本信息     -->
        <div class="detail-body">
            <div class="detail-item">
                <div class="detail-item-txt">
                    {{ $t('el.riskConfig.tableHeader.txHash') }}：
                    {{ baseInfo.txHash }}
                </div>
                <el-button class="default" @click="openWeb">{{ $t('el.riskConfig.txDetail') }} >></el-button>
            </div>
            <div class="detail-item detail-form">
                <div class="detail-item-txt">
                    <span class="label">{{ $t('el.riskConfig.platform') }}：</span>
                    {{ baseInfo.platform }}
                </div>
                <div class="detail-item-txt">
                    <span class="label">{{ $t('el.riskConfig.values') }}：</span>
                    {{baseInfo.value}}
                    Ether ($17)
                </div>
            </div>
            <div class="detail-item detail-form">
                <div class="detail-item-txt">
                    <span class="label">{{ $t('el.riskConfig.tableHeader.from') }}：</span>
                    {{ baseInfo.from }}
                </div>
                <div class="detail-item-txt">
                    <span class="label">{{ $t('el.riskConfig.tableHeader.to') }}：</span>
                    {{ baseInfo.to }}
                </div>
            </div>
            <div class="detail-item">
                <div class="detail-item-txt">
                    <span class="label">{{ $t('el.riskConfig.features') }}：</span>
                    <el-tag v-for="item in baseInfo.features"
                            :key="item">{{item}}</el-tag>
                </div>
            </div>
        </div>
        <!--   地址收益     -->
        <div class="detail-profit">
            <h3>{{ $t('el.riskConfig.profit') }}</h3>
            <div class="detail-profit-body scrollDiy">
                <div v-for="(item) in profitData" :key="item.txHash" class="detail-profit-container">
                    <div class="detail-profit-grid">
                        <be-svg-icon disabled-tool-tip icon-class="file"></be-svg-icon>
                        <be-ellipsis-copy :targetStr="item.tag"
                                          :tooltip-txt="item.txHash"
                                          :isEllipsis="false"
                                          v-if="item.tag">
                        </be-ellipsis-copy>
                        <be-ellipsis-copy :targetStr="item.txHash"
                                          v-if="!item.tag"
                                          fontLength="8"
                                          endLength="8">
                        </be-ellipsis-copy>
                    </div>
                    <div class="detail-profit-grid">
                        <be-svg-icon v-if="item.up === 'true'"  disabled-tool-tip icon-class="-arrow-up"></be-svg-icon>
                        <be-svg-icon v-if="item.up === 'false'" disabled-tool-tip icon-class="-arrow-down" style="margin-right: 4px;"></be-svg-icon>
                        <span>{{item.value}}</span>
                    </div>
                    <div class="profit-grid-list">
                        <div>
                            <ul>
                                <li v-for="(addrItem) in item.addrList" :key="addrItem">
                                    {{addrItem}}
                                </li>
                            </ul>
                        </div>
                        <div>
                            <ul>
                                <li v-for="(valueItem) in item.valueList" :key="valueItem">
                                    {{valueItem}}
                                </li>
                            </ul>
                        </div>
                        <div>
                            <ul>
                                <li v-for="(dollarItem) in item.dollarList" :key="dollarItem">
                                    {{dollarItem}}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import BeSvgIcon from "../../../components/common-components/svg-icon/be-svg-icon";

export default {
    name: "risk-warning-detail",
    components: {BeSvgIcon},
    data() {
        return {
            // 基础信息
            baseInfo:{},
            // 收益信息
            profitData:[]
        }
    },
    mounted() {
        this.getInfoData()
        this.getData()
    },
    computed:{

    },
    methods: {
        /**
         * 獲取地址收益數據
         */
        getData(){
            this.profitData = [
                {
                    tag:'AAVE',
                    txHash: '0x8c93d63a242ef09d0x8c93dd63a242ef09d0x8c93',
                    up:'false',
                    value:'-21930989 $',
                    addrList:['3Crv' ,'aWETH' ,'cvxyDAI+yUSDC+yUSDT+yTUSD' ,'DAI'],
                    valueList:['-36558164.848' ,'-0.0054737' ,'30266810.422' ,'10'],
                    dollarList:['(-21930989 $)' ,'(10 $)' ,'(18159662 $)' ,'(0 $)'],
                },
                {
                    tag:'',
                    txHash: '0x8c93d63a242ef09d0x8c93qd63a242ef09d0x8c93',
                    up:'true',
                    value:'+21930989 $',
                    addrList:['3Crv' ,'aWETH' ,'cvxyDAI+qyUSDC+yUSDT+yTUSD' ,'DAwI'],
                    valueList:['-3655164.848' ,'-0.000154737' ,'3026610.422' ,'40'],
                    dollarList:['(-21930989 $)' ,'(110 $)' ,'(18159662 $)' ,'(50 $)'],
                }, {
                    tag:'AAVE',
                    txHash: '0x8c93d63a242ef09d0x8cs93d63a242ef09d0x8c93',
                    up:'true',
                    value:'+21930989 $',
                    addrList:['3Crsv' ,'aWEcTH' ,'cvxyDAI+ydUSDC+yUSDT+yTUSD' ,'DqAI'],
                    valueList:['-36553164.848' ,'-0.0001454737' ,'30266610.422' ,'0'],
                    dollarList:['(-21930989 $)' ,'(1000 $)' ,'(18159662 $)' ,'(40 $)'],
                }, {
                    tag:'',
                    txHash: '0x8c93d63a242ef09d0x8cc93d63a242ef09d0x8c93',
                    up:'false',
                    value:'-21930989 $',
                    addrList:['3Crv' ,'aWETH' ,'cvxyDAI+yUSDC+yUSDTf+yTUSD' ,'DAfI'],
                    valueList:['-36551964.848' ,'-0.0000154737' ,'30266170.422' ,'60'],
                    dollarList:['(-21930989 $)' ,'(120 $)' ,'(18159662 $)' ,'(10 $)'],
                }
            ]
        },
        /**
         * 獲得基本信息
         */
        getInfoData(){
            this.baseInfo = {
                txHash:'0x8c93d63a242ef09d0x8c93d63a242ef09d0x8c93',
                platform:'ETH',
                value:0.004105453105278,
                from:'0x8c93d63a242ef09d0x8c93d63a242ef09d0x8c93',
                to:'0x8c93d63a242ef09d0x8c93d63a242ef09d0x8c93',
                features:[
                    this.$t('el.warningType.ContractExecution'),
                    this.$t('el.warningType.recall'),
                    this.$t('el.warningType.currencyTrade'),
                    this.$t('el.warningType.flash'),
                    this.$t('el.warningType.tradeLoop'),
                ]
            }
        },
        /**
         * 跳轉到第三方頁面
         */
        openWeb(){

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
                margin-top: 36px;
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
                .profit-grid-list{
                    display: flex;
                    align-items: center;
                    flex-direction: row;
                    justify-content: flex-start;
                    width: 50%;
                    div:nth-child(1){
                        width: 40%;
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
                        margin-bottom: 10px;
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
            }
        }
    }
}
</style>