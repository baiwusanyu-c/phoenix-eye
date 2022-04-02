/* * @risk-trx-detail.vue * @deprecated 风险警告交易详情分析页面 * @author czh * @update (czh
2021/11/2) */
<template>
  <div v-loading="loading" class="risk-trx-detail">
    <!--   基本信息     -->
    <div class="detail-body">
      <div class="detail-item">
        <div class="detail-item-txt detail-item--hash">
          <span style="width: 12%">{{ $t('lang.riskConfig.tableHeader.txHash') }}：</span>
          <be-ellipsis-copy
            custom-class="detail-copy"
            :target-str="baseInfo.tx_hash"
            :is-ellipsis="false"
            empty-text="/"
            styles="color: #008EE9;cursor:pointer;"
            font-length="8"
            end-length="8"
            @click="openWeb(baseInfo.tx_hash, 'tx')">
          </be-ellipsis-copy>
          <be-tag v-if="baseInfo.platform" type="info">
            <div class="flex items-center">
              <be-icon
                :content="$t('lang.profit')"
                :icon="iconDict[baseInfo.platform.toUpperCase()]"></be-icon>
              <span style="margin-left: 10px">{{ baseInfo.platform.toUpperCase() }}</span>
            </div>
          </be-tag>
        </div>
        <div class="detail-item-txt detail-item--date">
          <span class="date-label">{{ $t('lang.riskConfig.tableHeader.txTime') }}：</span>
          <el-tooltip placement="top" effect="light">
            <template #content>
              <span style="font-weight: 400">UTC：{{ beijing2utc(baseInfo.tx_time) }}</span>
            </template>
            <span style="font-weight: 400">{{
              formatDate(createDate(baseInfo.tx_time).getTime())
            }}</span>
          </el-tooltip>
        </div>
      </div>
      <div class="detail-item detail-form">
        <div class="detail-item-txt">
          <span style="width: 24%">{{ $t('lang.riskConfig.tableHeader.from') }}：</span>
          <be-ellipsis-copy
            :tooltip-txt="baseInfo.from_address"
            :target-str="
              baseInfo.from_address_tag ? baseInfo.from_address_tag : baseInfo.from_address
            "
            :copy-content="baseInfo.from_address"
            :is-ellipsis="
              baseInfo.from_address &&
              baseInfo.from_address.length > 15 &&
              !baseInfo.from_address_tag
                ? true
                : false
            "
            empty-text="/"
            styles="color: #008EE9;cursor:pointer;font-weight:400"
            font-length="8"
            end-length="8"
            @click="openWeb(baseInfo.from_address, 'addr')">
          </be-ellipsis-copy>
        </div>
        <div class="detail-item-txt">
          <span style="width: 24%">{{ $t('lang.riskConfig.tableHeader.to') }}：</span>
          <be-ellipsis-copy
            :tooltip-txt="baseInfo.to_address"
            :target-str="baseInfo.to_address_tag ? baseInfo.to_address_tag : baseInfo.to_address"
            :copy-content="baseInfo.to_address"
            :is-ellipsis="
              baseInfo.to_address && baseInfo.to_address.length > 15 && !baseInfo.to_address_tag
                ? true
                : false
            "
            empty-text="/"
            styles="color: #008EE9;cursor:pointer;font-weight:400"
            font-length="8"
            end-length="8"
            @click="openWeb(baseInfo.to_address, 'addr')">
          </be-ellipsis-copy>
        </div>
        <div class="detail-item-txt">
          <span>{{ $t('lang.riskConfig.values') }}：</span>
          <el-tooltip placement="top" effect="light">
            <template #content>
              <span>{{ baseInfo.token_num }}</span>
            </template>
            <span style="font-weight: 400"> {{ simulateToFixed(baseInfo.token_num, 6) }}</span>
          </el-tooltip>
          <span style="font-weight: 400"
            >&nbsp;&nbsp;{{
              baseInfo.token_unit ? baseInfo.token_unit.toUpperCase() : ''
            }}&nbsp;&nbsp;</span
          >
          <el-tooltip placement="top" effect="light">
            <template #content>
              <span>{{ baseInfo.dollar_money }}</span>
            </template>
            <span style="font-weight: 400"> ({{ handleProfit(baseInfo.dollar_money, 0) }})</span>
          </el-tooltip>
        </div>
      </div>
      <div class="detail-item">
        <div class="detail-item-txt">
          <span>{{ $t('lang.riskConfig.features') }}：</span>
          <be-tag v-for="item in baseInfo.risk_features" :key="item" type="info"
            >{{ item }}
          </be-tag>
        </div>
      </div>
    </div>
    <!--   地址收益     -->
    <div v-if="profitData.length > 0" class="detail-profit">
      <h3>{{ $t('lang.riskConfig.profit') }}</h3>
      <div class="detail-profit-body">
        <el-table tooltip-effect="light" :data="profitData">
          <template #empty>
            <div class="empty-data">
              <img class="img" src="@/assets/image/pc/empty-data.png" alt="" />
              <p style="line-height: 25px">{{ $t('lang.emptyData') }}</p>
            </div>
          </template>
          <el-table-column prop="platform" :width="addrCellWidth" align="left">
            <template #header>
              <span class="table-head">{{ $t('lang.riskConfig.profitTableHeader.addr') }}</span>
            </template>
            <template #default="scope">
              <div
                style="
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  cursor: pointer;
                ">
                <be-ellipsis-copy
                  v-if="scope.row.address_tag"
                  :target-str="scope.row.address_tag"
                  styles="font-weight: bold;color:#409EFF"
                  :copy-content="scope.row.address"
                  :tooltip-txt="scope.row.address"
                  empty-text="/"
                  :is-ellipsis="false"
                  @click="openWeb(scope.row.address, 'addr')">
                </be-ellipsis-copy>
                <be-ellipsis-copy
                  v-if="!scope.row.address_tag"
                  :target-str="scope.row.address"
                  empty-text="/"
                  :is-ellipsis="isEllipsis || scope.row.address.length >= 45"
                  styles="font-weight: bold;color:#409EFF"
                  font-length="8"
                  end-length="8"
                  @click="openWeb(scope.row.address, 'addr')">
                </be-ellipsis-copy>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="tx_hash" align="left">
            <template #header>
              <span class="table-head">{{
                $t('lang.riskConfig.profitTableHeader.profitSum')
              }}</span>
              <be-tooltip :content="$t('lang.riskConfig.amountExp')" custom-class="table-tooltip">
                <be-icon icon="iconHelpEagle"></be-icon>
              </be-tooltip>
            </template>
            <template #default="scope">
              <be-icon
                v-if="scope.row.profit > 0"
                :content="$t('lang.profit')"
                icon="iconArrowUp"></be-icon>
              <be-icon
                v-if="scope.row.profit < 0"
                :content="$t('lang.loss')"
                icon="iconArrowDown"
                style="margin-right: 4px"></be-icon>
              <!-- 占位 -->
              <be-icon
                v-if="scope.row.profit === 0"
                disabled-tool-tip
                icon-class="iconArrowDown"
                style="visibility: hidden"></be-icon>

              <el-tooltip placement="top" effect="light">
                <template #content>
                  <span>{{ scope.row.profit }}</span>
                </template>
                <span
                  style="margin-left: 10px; font-weight: bold; vertical-align: super"
                  :class="profitClass(scope.row.profit)">
                  {{ handleProfit(scope.row.profit, 0) }}
                </span>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column prop="addrList" align="left">
            <template #header>
              <span class="table-head">{{
                $t('lang.riskConfig.profitTableHeader.tokenName')
              }}</span>
            </template>
            <template #default="scope">
              <div v-if="scope.row.addrList && scope.row.addrList.length > 0">
                <be-ellipsis-copy
                  v-for="item in scope.row.addrList"
                  :key="item.itemId"
                  :target-str="item.val"
                  :is-ellipsis="item.val.length > 25 ? true : false"
                  :is-show-copy-btn="true"
                  :copy-content="item.contractAddress"
                  :tooltip-txt="item.contractAddress"
                  empty-text="/"
                  styles="color: #008EE9;cursor:pointer;font-weight:400;"
                  font-length="8"
                  end-length="8"
                  @click="item.val ? openWeb(item.contractAddress, 'token') : null">
                </be-ellipsis-copy>
              </div>

              <div
                v-else
                style="
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  justify-content: center;
                ">
                /
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="valueList" align="left">
            <template #header>
              <span class="table-head">{{ $t('lang.riskConfig.profitTableHeader.tokenNum') }}</span>
            </template>
            <template #default="scope">
              <div v-if="scope.row.valueList && scope.row.valueList.length > 0">
                <p v-for="item in scope.row.valueList" :key="item.itemId">
                  <el-tooltip placement="top" effect="light">
                    <template #content>
                      <span>{{ item.ordVal }}</span>
                    </template>
                    <span>{{ item.val }}</span>
                  </el-tooltip>
                </p>
              </div>
              <div
                v-else
                style="
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  justify-content: center;
                ">
                /
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="dollarList" align="left">
            <template #default="scope">
              <div v-if="scope.row.dollarList && scope.row.dollarList.length > 0">
                <p v-for="item in scope.row.dollarList" :key="item.itemId">
                  <el-tooltip placement="top" effect="light">
                    <template #content>
                      <span>{{ item.ordVal }}</span>
                    </template>
                    <span>({{ handleProfit(item.val, 0) }})</span>
                  </el-tooltip>
                </p>
              </div>
              <div
                v-else
                style="
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  justify-content: center;
                ">
                /
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <!--   Slump 与 PrivilegedOperation   -->
    <div class="detail-slump">
      <div v-if="baseInfo.privileged_operation" class="detail-slump--container">
        <h3>{{ $t('lang.riskConfig.PrivilegedOperation') }}</h3>
        <div class="detail-slump--body">
          <div style="display: flex">
            <span class="label">{{ $t('lang.projectExplorer.contract') }} :</span>
            <be-ellipsis-copy
              custom-class="detail-copy"
              :target-str="baseInfo.privileged_operation.contract"
              :is-ellipsis="false"
              empty-text="/"
              styles="color: #008EE9;cursor:pointer;">
            </be-ellipsis-copy>
          </div>
          <div style="display: flex; margin-top: 20px">
            <be-ellipsis-copy
              custom-class="detail-copy"
              :target-str="baseInfo.privileged_operation.from"
              :is-ellipsis="true"
              empty-text="/"
              styles="color: #008EE9;cursor:pointer;font-weight:bold">
            </be-ellipsis-copy>
            <be-icon icon="iconArrowRightEagle" style="width: 60px"></be-icon>
            <be-ellipsis-copy
              custom-class="detail-copy"
              :target-str="baseInfo.privileged_operation.to"
              :is-ellipsis="true"
              empty-text="/"
              styles="color: #008EE9;cursor:pointer;font-weight:bold">
            </be-ellipsis-copy>
          </div>
        </div>
      </div>
      <div v-if="baseInfo.slump" class="detail-slump--container">
        <h3>{{ $t('lang.riskConfig.slump') }}</h3>
        <div class="detail-slump--body">
          <div style="display: flex">
            <span class="label">Token :</span>
            <be-ellipsis-copy
              custom-class="detail-copy"
              :target-str="baseInfo.slump.token"
              :is-ellipsis="false"
              empty-text="/"
              styles="color: #008EE9;cursor:pointer;">
            </be-ellipsis-copy>
          </div>
          <div style="display: flex; align-items: center; margin-top: 20px">
            <span class="label">{{ $t('lang.riskConfig.presentPrice') }} : </span>
            <span style="width: 160px; font-weight: bold">{{
              handleProfit(baseInfo.slump.present_price, 0)
            }}</span>
            <span
              v-if="baseInfo.slump.drop_prop"
              :class="'profit-d'"
              style="margin-right: 6px; font-weight: bold">
              {{ (baseInfo.slump.drop_prop * 100).toFixed(2) }} %
            </span>
            <be-icon
              v-if="baseInfo.slump.drop_prop"
              :content="$t('lang.loss')"
              icon="iconArrowDown"
              style="margin-right: 4px"></be-icon>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import BeEllipsisCopy from '../../../components/common-components/ellipsis-copy/ellipsis-copy.vue'
  import { getProjWarningDetail, IProjDetail } from '../../../api/risk-trx'
  import { webURL } from '../../../enums/link'
  import { platformToCurrency, IPlatformToCurrency } from '../../../utils/platform-dict'
  import { defineComponent, ref, onMounted, computed, onUnmounted } from 'vue'
  import composition from '../../../utils/mixin/common-func'
  import { useI18n } from 'vue-i18n'
  import {
    getUuid,
    simulateToFixed,
    openWindow,
    beijing2utc,
    formatDate,
    createDate,
  } from '../../../utils/common'
  import { BeTag, BeIcon, BeTooltip } from '../../../../public/be-ui/be-ui.es'
  import { iconDict } from '../../../utils/platform-dict'
  interface IBaseInfo {
    platform?: string
    tx_hash?: string
    slump?: any
  }

  export default defineComponent({
    name: 'RiskTrxDetail',
    components: { BeEllipsisCopy, BeTag, BeIcon, BeTooltip },
    setup() {
      const { message, route } = composition()
      // 基础信息
      const baseInfo = ref<IBaseInfo>({})
      // 收益信息
      const profitData = ref<Array<any>>([])
      // loading
      const loading = ref<boolean>(false)
      // 是否缩略
      const isEllipsis = ref<boolean>(false)
      // 缩略数量
      const ellipsis = ref<string>('8')
      // 链平台转化币种
      const platformToCurrencyInner = ref<IPlatformToCurrency>(platformToCurrency)
      const addrCellWidth = ref<string>('430')
      const { t } = useI18n()
      const handleProfit = computed(() => {
        return function (val: number, dec: number) {
          if (val === null) {
            return t('lang.emptyData')
          }
          if (val < 0) {
            return `-$${simulateToFixed(Math.abs(val), dec)}`
          }
          return `$${simulateToFixed(val, dec)}`
        }
      })

      onMounted(() => {
        getInfoData()
        initView()
        window.onresize = initView
      })

      onUnmounted(() => {
        window.onresize = null
      })
      /**
       * 根据屏幕分辨率调整
       */
      const initView = (): void => {
        const width = window.screen.availWidth
        const height = window.screen.availHeight
        if (height <= 680 || width <= 1280) {
          addrCellWidth.value = '260'
          isEllipsis.value = true
          ellipsis.value = '12'
        }
      }
      /**
       * 獲得基本信息
       */
      const getInfoData = (): void => {
        const params: IProjDetail = {
          tx_hash: route.query.tx_hash as string,
        }
        loading.value = true
        getProjWarningDetail(params)
          .then((res: any) => {
            if (!res) {
              return
            }
            baseInfo.value = res.data
            profitData.value = res.data.address_profits
            profitData.value.forEach(val => {
              val.addrList = []
              val.dollarList = []
              val.valueList = []
              val.token_profits.forEach((valRes: any) => {
                res.itemId = getUuid()
                if (valRes.token_name === null) {
                  valRes.token_name = valRes.contract_address
                }
                val.addrList.push({
                  val: valRes.token_name,
                  itemId: 'token_name' + getUuid(),
                  tag: valRes.contract_address_tag,
                  contractAddress: valRes.contract_address,
                })
                val.valueList.push({
                  ordVal: valRes.token_num,
                  val: simulateToFixed(valRes.token_num, 6),
                  itemId: 'token_profit_no_dollar' + getUuid(),
                })
                val.dollarList.push({
                  ordVal: valRes.dollar_money,
                  val: simulateToFixed(valRes.dollar_money, 0),
                  itemId: 'token_profit_dollar' + getUuid(),
                })
              })
            })
            loading.value = false
          })
          .catch(err => {
            message('error', err.message || err)
            console.error(err)
            loading.value = false
          })
      }
      /**
       * 跳轉到第三方頁面
       */
      const openWeb = (params: string, type: string): void => {
        if (
          !params ||
          params === 'eth' ||
          params === 'bnb' ||
          params === 'ht' ||
          params === 'matic'
        )
          return
        let mainUrl: string = (webURL as any)[`${baseInfo.value.platform}_${type}`] as string
        const url = `${mainUrl}${params}`
        openWindow(url)
      }
      /**
       * 收益浮动样式夹杂
       */
      const profitClass = computed(() => {
        return function (val: number) {
          if (val > 0) {
            return 'profit-x'
          }
          if (val < 0) {
            return 'profit-d'
          }
          return ''
        }
      })

      return {
        beijing2utc,
        formatDate,
        createDate,
        iconDict,
        profitClass,
        baseInfo,
        profitData,
        loading,
        isEllipsis,
        ellipsis,
        platformToCurrencyInner,
        addrCellWidth,
        handleProfit,
        getInfoData,
        simulateToFixed,
        openWeb,
        getUuid,
        openWindow,
      }
    },
  })
</script>

<style lang="scss">
  .risk-trx-detail {

    .detail-copy {
      width: initial;
    }

    .profit-d {
      color: $lessColor4;
    }

    .profit-x {
      color: $mainColor3;
    }
    position: relative;
    top: 0;
    left: 0;
    z-index: 1;
    box-sizing: border-box;
    width: 100%;
    height: auto;
    min-height: calc(100% - 100px);
    padding-bottom: 86px;

    .detail-body {
      box-sizing: border-box;
      width: 70%;
      min-width: 1172px;
      padding: 20px;
      margin: 40px auto 0 auto;
      background: $mainColor7-06;

      .detail-item {
        display: flex;
        align-items: center;
        justify-content: space-between;

        .open-web {
          width: 126px;
        }

        .detail-item-txt {
          display: flex;
          flex: 1;
          align-items: center;
          margin-top: 15px;
          font-weight: bold;
          color: $textColor3;

          .be-tag {
            height: 30px;
            margin-left: 16px;
            line-height: 30px;
            cursor: context-menu;
            background-color: $mainColor16;
            border-width: 0;
            border-radius: 0;

            span {
              font-family: AlibabaPuHuiTi-Regular, sans-serif;
              font-size: 14px;
              font-weight: 500;
              color: $textColor3;
            }
          }
        }

        .detail-item--hash {
          flex: 2;
          justify-content: flex-start;
        }

        .detail-item--date {
          flex: 1;

          .date-label {
            width: 12%;
          }
        }
      }
    }

    .detail-profit {
      width: 70%;
      min-width: 1172px;
      margin: 40px auto 0 auto;
      color: $textColor3;
      background: transparent;

      .detail-profit-body {
        height: calc(100% - 40px);
        padding: 20px;
        margin-top: 20px;
        background-color: $mainColor7;
      }
    }

    .detail-slump {
      display: flex;
      width: 70%;
      margin: 40px auto 0 auto;
      color: $textColor3;

      & .detail-slump--container:nth-child(1) {
        margin-right: 10px;
      }

      & .detail-slump--container:nth-child(2) {
        margin-left: 10px;
      }

      .detail-slump--container {
        flex: 1;

        h3 {
          line-height: 40px;
        }

        .detail-slump--body {
          box-sizing: border-box;
          width: 100%;
          padding: 20px;
          margin-top: 20px;
          background-color: $mainColor7;
          border-radius: 4px;
        }
      }

      .label {
        margin-right: 20px;
        font-family: AlibabaPuHuiTi-Regular, sans-serif;
        font-size: 14px;
        font-weight: 400;
        line-height: 22px;
        color: #666;
      }
    }
  }
</style>
<!--1080p的145% - 150%放大-->
<style scoped lang="scss">
  @media screen and (min-width: 1280px) and (max-width: 1326px) {

    .risk-trx-detail .detail-body,
    .risk-trx-detail .detail-profit {
      width: 92%;
    }

    .risk-trx-detail {

      .detail-body {
        padding: 10px;

        .detail-item {

          .detail-item-txt {
            margin-top: 5px;
            font-size: 12px;
          }

          .detail-item--date {

            .date-label {
              width: 16%;
            }
          }

          .default {
            height: 25px;
            font-size: 12px;
          }
        }
      }

      .detail-profit {
        height: 65.5%;
        padding: 10px;

        h3 {
          font-size: 16px;
        }

        .detail-profit-body {
          font-size: 12px;
        }
      }
    }
  }

  /* 125% 适配 */
  @media screen and (min-width: 1328px) and (max-width: 1538px) {

    .risk-trx-detail .detail-body,
    .risk-trx-detail .detail-profit {
      width: 86%;
    }
  }

  /* 110% 适配 */
  @media screen and (min-width: 1540px) and (max-width: 1750px) {

    .risk-trx-detail .detail-body,
    .risk-trx-detail .detail-profit {
      width: 80%;
    }
  }
</style>
