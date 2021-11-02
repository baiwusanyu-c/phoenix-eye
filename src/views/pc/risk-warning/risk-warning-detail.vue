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
                    {{ $t('lang.riskConfig.tableHeader.txHash') }}：
                    {{ baseInfo.txHash }}
                </div>
                <el-button class="default" @click="openWeb">{{ $t('lang.riskConfig.txDetail') }} >></el-button>
            </div>
            <div class="detail-item detail-form">
                <div class="detail-item-txt">
                    <span class="label">{{ $t('lang.riskConfig.platform') }}：</span>
                    {{ baseInfo.platform }}
                </div>
                <div class="detail-item-txt">
                    <span class="label">{{ $t('lang.riskConfig.values') }}：</span>
                    {{baseInfo.value}}
                    Ether ($17)
                </div>
            </div>
            <div class="detail-item detail-form">
                <div class="detail-item-txt">
                    <span class="label">{{ $t('lang.riskConfig.tableHeader.from') }}：</span>
                    {{ baseInfo.from }}
                </div>
                <div class="detail-item-txt">
                    <span class="label">{{ $t('lang.riskConfig.tableHeader.to') }}：</span>
                    {{ baseInfo.to }}
                </div>
            </div>
            <div class="detail-item">
                <div class="detail-item-txt">
                    <span class="label">{{ $t('lang.riskConfig.features') }}：</span>
                    <el-tag v-for="item in baseInfo.features"
                            :key="item">{{item}}</el-tag>
                </div>
            </div>
        </div>
        <!--   地址收益     -->
        <div class="detail-profit">
            <h3>{{ $t('lang.riskConfig.profit') }}</h3>
            <div class="detail-profit-body">
                <div v-for="(item) in profitData" :key="item.txHash" class="detail-profit-container">
                    <div class="detail-profit-grid">
                        <be-svg-icon disabled-tool-tip icon-class="file"></be-svg-icon>
                        <be-ellipsis-copy :targetStr="item.txHash"
                                          fontLength="8"
                                          endLength="8">
                        </be-ellipsis-copy>
                    </div>
                    <div class="detail-profit-grid">
                        <be-svg-icon v-if="item.up === 'true'"  disabled-tool-tip icon-class="-arrow-up"></be-svg-icon>
                        <be-svg-icon v-if="item.up === 'false'" disabled-tool-tip icon-class="-arrow-down" style="margin-right: 4px;"></be-svg-icon>
                        <span>{{item.value}}</span>
                    </div>
                    <div>

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
                    value:'-21930989 $'
                },
                {
                    tag:'',
                    txHash: '0x8c93d63a242ef09d0x8c93qd63a242ef09d0x8c93',
                    up:'true',
                    value:'+21930989 $'
                }, {
                    tag:'AAVE',
                    txHash: '0x8c93d63a242ef09d0x8cs93d63a242ef09d0x8c93',
                    up:'true',
                    value:'+21930989 $'
                }, {
                    tag:'',
                    txHash: '0x8c93d63a242ef09d0x8cc93d63a242ef09d0x8c93',
                    up:'false',
                    value:'-21930989 $'
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
                features:['合约执行','交易回环','重复调用','币种兑换','闪电贷']
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
                .ellipsis-copy{
                 width: auto;
                    margin-left: 24px;
                }
                .detail-profit-grid{
                    display: flex;
                    align-items: center;
                    flex-direction: row;
                    justify-content: center;
                    width: 25%;
                }
            }

        }
    }
}
</style>