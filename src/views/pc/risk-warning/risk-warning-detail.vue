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
                    {{ $t('lang.riskConfig.tableHeader.txHash') }}：
                    {{ baseInfo.tx_hash }}
                </div>
                <el-button class="default open-web" @click="openWeb">{{ $t('lang.riskConfig.txDetail') }} >></el-button>
            </div>
            <div class="detail-item detail-form">
                <div class="detail-item-txt">
                    <span class="label">{{ $t('lang.riskConfig.platform') }}：</span>
                    {{ baseInfo.platform ? baseInfo.platform.toUpperCase() : '' }}
                </div>
                <div class="detail-item-txt">
                    <span class="label">{{ $t('lang.riskConfig.values') }}：</span>
                    <el-tooltip placement="top" effect="light">
                        <span slot="content">{{ baseInfo.token_num }}</span>
                        <span> {{simulateToFixed(baseInfo.token_num,6)}}</span>
                    </el-tooltip>
                    <span>&nbsp;&nbsp;{{ baseInfo.token_unit ? baseInfo.token_unit.toUpperCase() : '' }}&nbsp;&nbsp;</span>
                    <el-tooltip placement="top" effect="light">
                        <span slot="content">{{ baseInfo.dollar_money }}</span>
                        <span> ({{handleProfit(baseInfo.dollar_money,0)}})</span>
                    </el-tooltip>
                </div>
            </div>
            <div class="detail-item detail-form">
                <div class="detail-item-txt">
                    <span class="label">{{ $t('lang.riskConfig.tableHeader.from') }}：</span>
                    {{ baseInfo.from_address_tag ? baseInfo.from_address_tag :  baseInfo.from_address}}
                </div>
                <div class="detail-item-txt">
                    <span class="label">{{ $t('lang.riskConfig.tableHeader.to') }}：</span>
                    {{ baseInfo.to_address_tag ? baseInfo.to_address_tag :  baseInfo.to_address}}
                </div>
            </div>
            <div class="detail-item">
                <div class="detail-item-txt">
                    <span class="label">{{ $t('lang.riskConfig.features') }}：</span>
                    <el-tag v-for="item in baseInfo.risk_features"
                            :key="item">{{item}}
                    </el-tag>
                </div>
            </div>
        </div>
        <!--   地址收益     -->
        <div class="detail-profit">
            <h3>{{ $t('lang.riskConfig.profit') }}</h3>
            <div class="detail-profit-body" v-if="profitData.length > 0">
                <el-table
                    tooltip-effect="light"
                    :data="profitData">
                    <div slot="empty"
                         class = 'empty-table'>
                        <img class="img" src="@/assets/image/pc/empty-data.png" alt="">
                        <p style="line-height: 25px">{{$t('lang.emptyData')}}</p>
                    </div>
                    <el-table-column
                        prop="platform"
                        :label="$t('lang.riskConfig.profitTableHeader.addr')"
                        :width="addrCellWidth"
                        align="left">
                        <template #default="scope">
                            <div style="display: flex;align-items: center;justify-content: center;">
                                <be-svg-icon disabled-tool-tip icon-class="files" style="margin-right: 15px"  v-if="scope.row.address_tag"></be-svg-icon>
                                <!--             占位                   -->
                                <be-svg-icon disabled-tool-tip icon-class="files" style="margin-right: 15px;visibility: hidden"  v-if="!scope.row.address_tag"></be-svg-icon>
                                <be-ellipsis-copy :targetStr="scope.row.address_tag"
                                                  styles="font-weight: bold;color:#409EFF"
                                                  :copyContent="scope.row.address"
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
                        :label="$t('lang.riskConfig.profitTableHeader.profitSum')"
                        align="right">
                        <template #default="scope">
                            <el-tooltip placement="top" effect="light">
                                <span slot="content">{{ scope.row.profit }}</span>
                                <span>{{handleProfit(scope.row.profit,0)}}</span>
                            </el-tooltip>
                            <be-svg-icon v-if="scope.row.profit > 0" :content="$t('lang.profit')" icon-class="-arrow-up"></be-svg-icon>
                            <be-svg-icon v-if="scope.row.profit < 0" :content="$t('lang.loss')" icon-class="-arrow-down" style="margin-right: 4px;"></be-svg-icon>
                            <!-- 占位 -->
                            <be-svg-icon v-if="scope.row.profit === 0" disabled-tool-tip icon-class="-arrow-down" style="visibility: hidden"></be-svg-icon>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="addrList"
                        :label="$t('lang.riskConfig.profitTableHeader.tokenName')"
                        align="right">
                        <template #header>
                            <div style="width: 100%;text-align: right">
                               {{ $t('lang.riskConfig.profitTableHeader.tokenName') }}
                            </div>
                        </template>
                        <template #default="scope">
                            <div  v-if="scope.row.addrList && scope.row.addrList.length > 0 ">
                                <p v-for="item in scope.row.addrList"
                                        style="margin-top: 10px;"
                                        :key="item.itemId">{{item.val}}</p>
                            </div>
                            <div style="display: flex;flex-direction: column;align-items: center;justify-content: center" v-else>
                                {{ $t('lang.emptyData') }}</div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="valueList"
                        :label="$t('lang.riskConfig.profitTableHeader.tokenNum')"
                        align="right">
                        <template #default="scope">
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
                            <div style="display: flex;flex-direction: column;align-items: center;justify-content: center" v-else>
                                {{ $t('lang.emptyData') }}</div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="dollarList"
                        :label="$t('lang.riskConfig.profitTableHeader.tokenVal')"
                        align="right">
                        <template #default="scope">
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
                            <div style="display: flex;flex-direction: column;align-items: center;justify-content: center" v-else>
                                {{ $t('lang.emptyData') }}</div>
                        </template>
                    </el-table-column>

                </el-table>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import BeSvgIcon from "../../../components/common-components/svg-icon/be-svg-icon.vue";
import BeEllipsisCopy from "../../../components/common-components/ellipsis-copy/ellipsis-copy.vue";
import {getProjWarningDetail} from "../../../api/risk-warning";
import {webURL} from "../../../enums/link";
import {platformToCurrency} from "../../../utils/platformDict";
import {defineComponent, reactive, ref, onMounted, computed, onUnmounted} from 'vue'
import composition from "../../../utils/mixin/common-func"
import {getUuid,simulateToFixed,openWindow} from "../../../utils/common";
import {use} from "marked";
import {ElMessage} from "element-plus/es";

export default defineComponent({
    name: "risk-warning-detail",
    components: {BeSvgIcon,BeEllipsisCopy},
    setup(props:any,ctx:any){
        const {message,routerPush,route} = composition(props, ctx)
        // 基础信息
        const baseInfo = ref({})
        // 收益信息
        const profitData = ref<Array<any>>([])
        // loading
        const loading = ref<boolean>(false)
        // 是否缩略
        const isEllipsis = ref<boolean>(false)
        // 缩略数量
        const ellipsis = ref<string>('8')
        // 链平台转化币种
        const platformToCurrencyInner = ref<Array<object>>(platformToCurrency)
        //
        const addrCellWidth= ref<string>('430')

        const handleProfit = computed(()=>{
            return function (val:number,dec:number){
                if(val< 0){
                    return `-$${simulateToFixed(Math.abs(val),dec)}`
                }
                return `$${simulateToFixed(val,dec)}`
            }
        })

        onMounted(()=>{
            getInfoData()
            initView()
            window.onresize = initView
        })

        onUnmounted(()=>{
            window.onresize = null
        })
        /**
         * 根据屏幕分辨率调整
         */
        const initView = ():void => {
            const width = window.screen.availWidth
            const height = window.screen.availHeight
            if(height <= 680 || width <=1280) {
                addrCellWidth.value = '260'
                isEllipsis.value = true
                ellipsis.value = '12'
            }
        }
        /**
         * 獲得基本信息
         */
        const getInfoData = ():void =>{
            const params = {
                tx_hash: route.query.tx_hash
            }
            loading.value = true
            getProjWarningDetail(params).then(res=>{
                baseInfo.value = res.data
                profitData.value = res.data.address_profits
                profitData.value.forEach(val=>{
                    val.addrList = []
                    val.dollarList = []
                    val.valueList = []
                    val.token_profits.forEach(valRes=>{
                        res.itemId = getUuid()
                        if(valRes.token_name === null){
                            valRes.token_name = valRes.contract_address
                        }
                        val.addrList.push({val:valRes.token_name,itemId:'token_name'+getUuid(),tag:valRes.contract_address_tag})
                        val.valueList.push({
                            ordVal:valRes.token_num,
                            val:simulateToFixed(valRes.token_num,6),
                            itemId:'token_profit_no_dollar'+getUuid()})
                        val.dollarList.push({
                            ordVal:valRes.dollar_money,
                            val:simulateToFixed(valRes.dollar_money,0),
                            itemId:'token_profit_dollar'+getUuid()})
                    })
                })
                loading.value = false
            }).catch(err=>{
                ElMessage.error(err.message)
                console.error(err)
                loading.value = false
            })
        }
        /**
         * 跳轉到第三方頁面
         */
        const openWeb = ():void => {
            console.log(baseInfo.value)
            console.log(baseInfo.value.platform,baseInfo.value.tx_hash)
            console.log(baseInfo.value.platform || baseInfo.value.tx_hash)
            if(!baseInfo.value.platform || !baseInfo.value.tx_hash) return
            console.log(`${webURL[baseInfo.value.platform]}${baseInfo.value.tx_hash}`)
            const url = `${webURL[baseInfo.value.platform]}${baseInfo.value.tx_hash}`
            openWindow(url)
        }

        return {
            baseInfo,
            profitData,
            loading,
            isEllipsis,
            ellipsis,
            platformToCurrencyInner,
            addrCellWidth,
            getInfoData,
            simulateToFixed,
            openWeb,
            handleProfit,
        }
    },
    /*  data() {
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
          /!**
           * 根据屏幕分辨率调整
           *!/
          initView(){
              const width = window.screen.availWidth
              const height = window.screen.availHeight
              if(height <= 680 || width <=1280) {
                  this.addrCellWidth = '260'
                  this.isEllipsis = true
                  this.ellipsis = '12'
              }
          },
          /!**
           * 獲得基本信息
           *!/
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
          /!**
           * 跳轉到第三方頁面
           *!/
          openWeb(){
              if(!this.baseInfo.platform || !this.baseInfo.tx_hash) return
              const url = `${webURL[this.baseInfo.platform]}${this.baseInfo.tx_hash}`
              this.$openWindow(url, 'view_window')
          }

      },*/
})
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
        display: flex;
        flex:1;
        align-items: center;
        margin-top: 15px;
        font-weight: bold;

        .label{
          font-weight: normal;
          color: $textColor4;
        }

        .el-tag {
          height: 30px;
          margin-top: 5px;
          margin-right: 15px;
          line-height: 30px;
          border-radius: 0;
        }
      }
    }
  }

  .detail-profit{
    min-height: 69.5%;
    padding: 20px;
    margin-top: 20px;
    background: $mainColor7;

    .detail-profit-body{
      height: calc(100% - 40px);
      margin-top: 20px;

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
          height: 25px;
          font-size: 12px;
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