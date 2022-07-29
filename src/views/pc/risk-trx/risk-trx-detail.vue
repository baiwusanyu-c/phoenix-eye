/* * @risk-trx-detail.vue * @deprecated 风险警告交易详情分析页面 * @author czh * @update (czh
2021/11/2) */
<template>
  <div v-loading="loading" class="risk-trx-detail">
    <!--   基本信息     -->
    <div class="detail-title">
      <title-cell :name="$t('lang.riskConfig.transactions')" :url="transactionIcon"> </title-cell>
    </div>
    <div class="detail-body">
      <div class="detail-item">
        <span class="detail-item-txt">{{ $t('lang.riskConfig.tableHeader.txHash') }}：</span>
        <ellipsis-copy
          custom-class="detail-copy"
          :target-str="baseInfo.tx_hash"
          :is-ellipsis="false"
          empty-text="/"
          styles="color: #008EE9;cursor:pointer;font-weight: 500"
          font-length="30"
          end-length="30"
          @click="openWeb(baseInfo.tx_hash, 'tx', baseInfo.platform)">
        </ellipsis-copy>
        <be-tag v-if="baseInfo.platform" type="info">
          <div class="flex items-center">
            <be-icon
              :content="$t('lang.profit')"
              :icon="iconDict[baseInfo.platform.toUpperCase()]"></be-icon>
            <span style="margin-left: 10px">{{ baseInfo.platform.toUpperCase() }}</span>
          </div>
        </be-tag>
      </div>
      <span class="detail-item-txt">{{ $t('lang.riskConfig.description') }}：</span>
      <p v-if="descriptionTemplate['Large Outflow']" class="descr">
        <icon-cell
          font-weight="400"
          font-size="16"
          size="20"
          content="Large Outflow"
          style="margin-right: 10px; width: 200px; height: 26px"
          icon="iconLargeOutflow2"></icon-cell>
        <span class="descr-text"
          >{{ descriptionTemplate['Large Outflow'].text }} &nbsp;
          <ellipsis-copy
            custom-class="detail-copy"
            :tooltip-txt="descriptionTemplate['Large Outflow'].address"
            :target-str="descriptionTemplate['Large Outflow'].content"
            :is-ellipsis="descriptionTemplate['Large Outflow'].content.length > 20 ? true : false"
            empty-text="/"
            font-length="6"
            end-length="6">
            <template #text="textScope">
              <a
                :href="createLink(baseInfo.platform, descriptionTemplate['Large Outflow'].address)"
                target="_blank">
                {{ ` ${textScope.item}` }}</a
              >
            </template>
          </ellipsis-copy>
        </span>
      </p>
      <p v-if="descriptionTemplate['Flash Loan']" class="descr">
        <icon-cell
          font-weight="400"
          font-size="16"
          size="20"
          style="margin-right: 10px; width: 200px; height: 26px"
          content="Flash Loan"
          icon="iconFlash2"></icon-cell>
        <span class="descr-text"
          >{{ descriptionTemplate['Flash Loan'].text }} &nbsp;
          <ellipsis-copy
            custom-class="detail-copy"
            :tooltip-txt="descriptionTemplate['Flash Loan'].address"
            :target-str="descriptionTemplate['Flash Loan'].content"
            :is-ellipsis="descriptionTemplate['Flash Loan'].content.length > 20 ? true : false"
            empty-text="/"
            font-length="6"
            end-length="6">
            <template #text="textScope">
              <a
                :href="createLink(baseInfo.platform, descriptionTemplate['Flash Loan'].address)"
                target="_blank">
                {{ ` ${textScope.item}` }}</a
              >
            </template>
          </ellipsis-copy>
        </span>
      </p>
      <p v-if="descriptionTemplate['Privileged Operation']" class="descr">
        <icon-cell
          font-weight="400"
          font-size="16"
          size="20"
          style="margin-right: 10px; width: 200px; height: 26px"
          content="Privileged Operation"
          icon="iconPrivileged2"></icon-cell>
        <span v-if="descriptionTemplate['Privileged Operation'].type === 1" class="descr-text"
          >{{ descriptionTemplate['Privileged Operation'].text }} &nbsp;
          <ellipsis-copy
            v-if="descriptionTemplate['Privileged Operation'].type === 1"
            :is-show-copy-btn="false"
            custom-class="detail-copy"
            :tooltip-txt="descriptionTemplate['Privileged Operation'].address"
            :target-str="descriptionTemplate['Privileged Operation'].content"
            :is-ellipsis="
              descriptionTemplate['Privileged Operation'].content.length > 20 ? true : false
            "
            empty-text="/"
            font-length="6"
            end-length="6">
            <template #text="textScope">
              <a
                :href="
                  createLink(baseInfo.platform, descriptionTemplate['Privileged Operation'].address)
                "
                target="_blank">
                {{ ` ${textScope.item}` }}</a
              >
            </template>
          </ellipsis-copy>
        </span>
        <span v-if="descriptionTemplate['Privileged Operation'].type === 2" class="descr-text"
          >&nbsp;{{ descriptionTemplate['Privileged Operation'].text }}&nbsp;
          <ellipsis-copy
            v-if="descriptionTemplate['Privileged Operation'].type === 2"
            custom-class="detail-copy"
            :tooltip-txt="descriptionTemplate['Privileged Operation'].addressOne"
            :target-str="descriptionTemplate['Privileged Operation'].contentOne"
            :is-ellipsis="
              descriptionTemplate['Privileged Operation'].contentOne.length > 20 ? true : false
            "
            empty-text="/"
            font-length="6"
            end-length="6">
            <template #text="textScope">
              <a
                :href="
                  createLink(
                    baseInfo.platform,
                    descriptionTemplate['Privileged Operation'].addressOne
                  )
                "
                target="_blank">
                {{ ` ${textScope.item}` }}</a
              >
            </template>
          </ellipsis-copy>
          To
          <ellipsis-copy
            v-if="descriptionTemplate['Privileged Operation'].type === 2"
            custom-class="detail-copy"
            :tooltip-txt="descriptionTemplate['Privileged Operation'].addressSec"
            :target-str="descriptionTemplate['Privileged Operation'].contentSec"
            :is-ellipsis="
              descriptionTemplate['Privileged Operation'].contentSec.length > 20 ? true : false
            "
            empty-text="/"
            font-length="6"
            end-length="6">
            <template #text="textScope">
              <a
                :href="
                  createLink(
                    baseInfo.platform,
                    descriptionTemplate['Privileged Operation'].addressSec
                  )
                "
                target="_blank">
                {{ ` ${textScope.item}` }}</a
              >
            </template>
          </ellipsis-copy>
        </span>
      </p>
      <p v-if="descriptionTemplate['Exploiter On The Move']" class="descr">
        <icon-cell
          font-weight="400"
          font-size="16"
          size="20"
          style="margin-right: 10px; width: 200px; height: 26px"
          content="Exploiter On The Move"
          icon="iconExploiter"></icon-cell>
        <span class="descr-text">
          <ellipsis-copy
            custom-class="detail-copy"
            :is-show-copy-btn="false"
            :tooltip-txt="descriptionTemplate['Exploiter On The Move'].addressOne"
            :target-str="descriptionTemplate['Exploiter On The Move'].contentOne"
            :is-ellipsis="
              descriptionTemplate['Exploiter On The Move'].contentOne.length > 20 ? true : false
            "
            empty-text="/"
            font-length="6"
            end-length="6">
            <template #text="textScope">
              <a
                :href="
                  createLink(
                    baseInfo.platform,
                    descriptionTemplate['Exploiter On The Move'].addressOne
                  )
                "
                target="_blank">
                {{ ` ${textScope.item}` }}</a
              >
            </template>
          </ellipsis-copy>
          &nbsp;{{ descriptionTemplate['Exploiter On The Move'].text }}&nbsp;
          <ellipsis-copy
            custom-class="detail-copy"
            :tooltip-txt="descriptionTemplate['Exploiter On The Move'].addressSec"
            :target-str="descriptionTemplate['Exploiter On The Move'].contentSec"
            :is-ellipsis="
              descriptionTemplate['Exploiter On The Move'].contentSec.length > 20 ? true : false
            "
            empty-text="/"
            font-length="6"
            end-length="6">
            <template #text="textScope">
              <a
                :href="
                  createLink(
                    baseInfo.platform,
                    descriptionTemplate['Exploiter On The Move'].addressSec
                  )
                "
                target="_blank">
                {{ ` ${textScope.item}` }}</a
              >
            </template>
          </ellipsis-copy>
        </span>
      </p>
    </div>
    <!--   地址收益     -->
    <div v-if="profitData.length > 0" class="detail-title">
      <title-cell :name="$t('lang.riskConfig.profit')" :url="addrIncomeIcon"> </title-cell>
    </div>
    <div v-if="profitData.length > 0" class="detail-profit">
      <div class="detail-profit-body">
        <el-table
          tooltip-effect="light"
          :data="profitData"
          :span-method="objectSpanMethod"
          row-class-name="detail-profit--row">
          <template #empty>
            <empty-data></empty-data>
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
                <ellipsis-copy
                  v-if="scope.row.address_tag"
                  :target-str="scope.row.address_tag"
                  :copy-content="scope.row.address"
                  :tooltip-txt="scope.row.address"
                  empty-text="/"
                  :is-ellipsis="false"
                  @click="openWeb(scope.row.address, 'addr', baseInfo.platform)">
                  <template #text="textScope">
                    <div :class="`tag__${scope.row.address_label}`">
                      <a style="font-weight: bold; color: #409eff; margin-right: 10px">{{
                        textScope.item
                      }}</a>
                      <be-tag v-if="scope.row.address_label" round="12">{{
                        scope.row.address_label
                      }}</be-tag>
                    </div>
                  </template>
                </ellipsis-copy>
                <ellipsis-copy
                  v-if="!scope.row.address_tag"
                  :target-str="scope.row.address"
                  empty-text="/"
                  :is-ellipsis="isEllipsis || scope.row.address.length >= 45"
                  styles="font-weight: bold;color:#409EFF"
                  font-length="8"
                  end-length="8"
                  @click="openWeb(scope.row.address, 'addr', baseInfo.platform)">
                  <template #text="textScope">
                    <div :class="`tag__${scope.row.address_label}`">
                      <a style="font-weight: bold; color: #409eff; margin-right: 10px">{{
                        textScope.item
                      }}</a>
                      <be-tag v-if="scope.row.address_label" round="12">{{
                        scope.row.address_label
                      }}</be-tag>
                    </div>
                  </template>
                </ellipsis-copy>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="addrList" align="left">
            <template #header>
              <span class="table-head">{{
                $t('lang.riskConfig.profitTableHeader.tokenName')
              }}</span>
            </template>
            <template #default="scope">
              <ellipsis-copy
                :target-str="scope.row.token_name"
                :is-ellipsis="scope.row.token_name.length > 25 ? true : false"
                :copy-content="scope.row.contract_address"
                :tooltip-txt="scope.row.contract_address"
                empty-text="/"
                styles="color: #008EE9;cursor:pointer;font-weight:600;"
                font-length="8"
                end-length="8"
                @click="
                  scope.row.token_name
                    ? openWeb(scope.row.contract_address, 'token', baseInfo.platform)
                    : null
                ">
              </ellipsis-copy>
            </template>
          </el-table-column>
          <el-table-column prop="valueList" align="left">
            <template #header>
              <span class="table-head">{{ $t('lang.riskConfig.profitTableHeader.tokenNum') }}</span>
            </template>
            <template #default="scope">
              <el-tooltip placement="top" effect="light">
                <template #content>
                  <span>{{ scope.row.token_num }}</span>
                </template>
                <span style="font-weight: 600">{{
                  numberToCommaString(scope.row.token_num, 6)
                }}</span>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <!--   Slump 与 PrivilegedOperation   -->
    <!--    <div class="detail-slump">
      <div v-if="baseInfo.privileged_operation" class="detail-slump&#45;&#45;container">
        <h3>{{ $t('lang.riskConfig.PrivilegedOperation') }}</h3>
        <div class="detail-slump&#45;&#45;body">
          <div style="display: flex">
            <span class="label">{{ $t('lang.projectExplorer.contract') }} :</span>
            <ellipsis-copy
              custom-class="detail-copy"
              :target-str="
                baseInfo.privileged_operation.contract_tag
                  ? baseInfo.privileged_operation.contract_tag
                  : baseInfo.privileged_operation.contract
              "
              :copy-content="baseInfo.privileged_operation.contract"
              :tooltip-txt="baseInfo.privileged_operation.contract"
              :is-ellipsis="false"
              empty-text="/"
              styles="color: #008EE9;cursor:pointer;"
              @click="openWeb(baseInfo.privileged_operation.contract, 'addr', baseInfo.platform)">
            </ellipsis-copy>
          </div>
          <div style="display: flex; margin-top: 20px">
            <ellipsis-copy
              custom-class="detail-copy"
              :target-str="
                baseInfo.privileged_operation.from_tag
                  ? baseInfo.privileged_operation.from_tag
                  : baseInfo.privileged_operation.from
              "
              :copy-content="baseInfo.privileged_operation.from"
              :tooltip-txt="baseInfo.privileged_operation.from"
              :is-ellipsis="true"
              empty-text="/"
              styles="color: #008EE9;cursor:pointer;font-weight:bold"
              @click="openWeb(baseInfo.privileged_operation.from, 'addr', baseInfo.platform)">
            </ellipsis-copy>
            <be-icon icon="iconArrowRightEagle" style="width: 60px"></be-icon>
            <ellipsis-copy
              custom-class="detail-copy"
              :target-str="
                baseInfo.privileged_operation.to_tag
                  ? baseInfo.privileged_operation.to_tag
                  : baseInfo.privileged_operation.to
              "
              :copy-content="baseInfo.privileged_operation.to"
              :tooltip-txt="baseInfo.privileged_operation.to"
              :is-ellipsis="true"
              empty-text="/"
              styles="color: #008EE9;cursor:pointer;font-weight:bold"
              @click="openWeb(baseInfo.privileged_operation.to, 'addr', baseInfo.platform)">
            </ellipsis-copy>
          </div>
        </div>
      </div>
      <div v-if="baseInfo.slump" class="detail-slump&#45;&#45;container">
        <h3>{{ $t('lang.riskConfig.slump') }}</h3>
        <div class="detail-slump&#45;&#45;body">
          <div style="display: flex">
            <span class="label">Token :</span>
            <ellipsis-copy
              custom-class="detail-copy"
              :target-str="baseInfo.slump.token ? baseInfo.slump.token : baseInfo.slump.token"
              :copy-content="baseInfo.slump.token"
              :tooltip-txt="baseInfo.slump.token"
              :is-ellipsis="false"
              empty-text="/"
              styles="color: #008EE9;cursor:pointer;"
              @click="openWeb(baseInfo.slump.token, 'token', baseInfo.platform)">
            </ellipsis-copy>
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
              {{ floatMultiply(baseInfo.slump.drop_prop, 100).toFixed(2) }} %
            </span>
            <be-icon
              v-if="baseInfo.slump.drop_prop"
              :content="$t('lang.loss')"
              icon="iconArrowDown"
              style="margin-right: 4px"></be-icon>
          </div>
        </div>
      </div>
    </div>-->
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, onMounted, onUnmounted, ref } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { BeIcon, BeTag } from '@eagle-eye/be-ui'
  import EllipsisCopy from '../../../components/common-components/ellipsis-copy/ellipsis-copy.vue'
  import { getProjWarningDetail } from '../../../api/risk-trx'
  import { iconDict, platformToCurrency } from '../../../utils/platform-dict'
  import composition from '../../../utils/mixin/common-func'
  import {
    beijing2utc,
    createDate,
    floatMultiply,
    formatDate,
    numberToCommaString,
    openWindow,
    simulateToFixed,
  } from '../../../utils/common'
  // @ts-ignore
  import EmptyData from '../../../components/common-components/empty-data/empty-data.vue'
  import transactionIcon from '../../../assets/image/pc/transaction.png'
  import addrIncomeIcon from '../../../assets/image/pc/address-income.png'
  import { webURL } from '../../../enums/link'
  import type { IBaseInfoRiskInfo, IDescriptionTemplate, IOption } from '../../../utils/types'

  import type { IPlatformToCurrency } from '../../../utils/platform-dict'
  import type { IProjDetail } from '../../../api/risk-trx'
  import type { TableColumnCtx } from 'element-plus/es/components/table/src/table-column/defaults'
  interface SpanMethodProps {
    row: any
    column: TableColumnCtx<any>
    rowIndex: number
    columnIndex: number
  }
  export default defineComponent({
    name: 'RiskTrxDetail',
    components: { EmptyData, EllipsisCopy, BeTag, BeIcon },
    setup() {
      const { message, route, openWeb } = composition()
      // 基础信息
      const baseInfo = ref<IBaseInfoRiskInfo>({})
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
      const addrCellWidth = ref<string>('460')
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
      const descriptionTemplate = ref<IOption>({})
      const handlerDescription = (data: Array<IDescriptionTemplate>): void => {
        data.forEach(val => {
          if (
            val.type === 'Large Outflow' ||
            val.type === 'Flash Loan' ||
            (val.type === 'Privileged Operation' && val.params?.length === 1)
          ) {
            descriptionTemplate.value[val.type!] = {
              text: val.text ? val.text.replace('%s', '') : '',
              address: val.params && val.params.length > 0 ? val.params[0].address : '',
              tag_name: val.params && val.params.length > 0 ? val.params[0].tag_name : '',
              type: 1,
            }
            descriptionTemplate.value[val.type!].content = descriptionTemplate.value[val.type!]
              .tag_name
              ? descriptionTemplate.value[val.type!].tag_name
              : descriptionTemplate.value[val.type!].address
          }
          if (val.type === 'Privileged Operation' && val.params?.length === 2) {
            val.text = val.text?.split('%s To')[0]
          }
          if (
            val.type === 'Exploiter On The Move' ||
            (val.type === 'Privileged Operation' && val.params?.length === 2)
          ) {
            descriptionTemplate.value[val.type!] = {
              text: val.text ? val.text.replaceAll('%s', '') : '',
              addressOne: val.params && val.params.length > 0 ? val.params[0].address : '',
              tag_nameOne: val.params && val.params.length > 0 ? val.params[0].tag_name : '',
              addressSec: val.params && val.params.length > 0 ? val.params[1].address : '',
              tag_nameSec: val.params && val.params.length > 0 ? val.params[1].tag_name : '',
              type: 2,
            }
            descriptionTemplate.value[val.type!].contentOne = descriptionTemplate.value[val.type!]
              .tag_nameOne
              ? descriptionTemplate.value[val.type!].tag_nameOne
              : descriptionTemplate.value[val.type!].addressOne
            descriptionTemplate.value[val.type!].contentSec = descriptionTemplate.value[val.type!]
              .tag_nameSec
              ? descriptionTemplate.value[val.type!].tag_nameSec
              : descriptionTemplate.value[val.type!].addressSec
          }
        })
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
            handlerDescription(res.data.description)
            // 重组数据，把token_profits的数据提取出来，
            // 拼凑成表格可以合并单元格的数据结构
            res.data.address_profits.forEach((val: any) => {
              const tokenLen = val.token_profits.length
              val.token_profits.forEach((valRes: any) => {
                if (valRes.token_name === null) {
                  valRes.token_name = valRes.contract_address
                }
                profitData.value.push({ ...val, ...valRes, tokenLen })
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
       * 合并单元格
       */
      let cache = { address: '' }
      const objectSpanMethod = ({ row, columnIndex }: SpanMethodProps) => {
        if (columnIndex === 0) {
          if (cache.address !== row.address) {
            cache = row
            return {
              rowspan: row.tokenLen,
              colspan: 1,
            }
          } else {
            return {
              rowspan: 0,
              colspan: 0,
            }
          }
        }
      }
      const createLink = computed(() => {
        return function (platform: string, addr: string) {
          const mainUrl: string = (webURL as any)[`${platform}_addr`] as string
          return `${mainUrl}${addr}`
        }
      })

      return {
        createLink,
        descriptionTemplate,
        beijing2utc,
        formatDate,
        createDate,
        iconDict,
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
        openWindow,
        floatMultiply,
        transactionIcon,
        addrIncomeIcon,
        numberToCommaString,
        objectSpanMethod,
      }
    },
  })
</script>

<style lang="scss">
  .risk-trx-detail {
    .detail-copy {
      width: initial;
      min-width: initial !important;
      display: inline-flex;
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
    .detail-title {
      @include common-container(40px);
      h3 {
        font-size: 24px;
        font-family: 'Barlow', sans-serif;
        font-weight: bold;
        color: $textColor3;
        line-height: 29px;
      }
    }
    .detail-body {
      box-sizing: border-box;
      @include common-container(20px);
      min-width: 1172px;
      padding: 20px;
      background: $mainColor7;
      .descr {
        margin: 32px 0 16px 0;
        display: flex;
        .descr-text {
          font-size: 16px;
          font-family: 'Barlow', sans-serif;
          font-weight: bold;
          color: $textColor3;
          line-height: 26px;
          display: inline-block;
          width: 900px;
        }
        a {
          font-weight: bold;
          color: $lessColor3;
          font-family: 'Barlow', sans-serif;
          font-size: 16px;
          line-height: 26px;
        }
      }
      .detail-item {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        margin-bottom: 16px;
        .be-tag {
          height: 30px;
          line-height: 30px;
          cursor: context-menu;
          background-color: transparent;
          border-width: 0;
          border-radius: 0;
          span {
            font-family: 'Barlow', sans-serif;
            font-size: 14px;
            font-weight: 500;
            color: $textColor3;
          }
        }
      }
      .detail-item-txt {
        font-weight: bold;
        color: $textColor3;
        font-size: 18px;
        font-family: 'Barlow', sans-serif;
        line-height: 32px;
      }
    }

    .detail-profit {
      @include common-container(40px);
      min-width: 1172px;
      color: $textColor3;
      background: transparent;

      .detail-profit-body {
        .detail-profit--row {
          height: 30px;
        }
        .tag__To {
          .be-tag__default {
            width: 60px;
            height: 24px;
            background: #ecf5f9;
            border-radius: 12px;
            border: 0;
            span {
              width: 40px;
              height: 20px;
              font-size: 14px;
              font-family: 'Barlow', sans-serif;
              font-weight: bold;
              color: #008ee9;
              line-height: 20px;
              text-align: center;
            }
          }
        }
        .tag__From {
          .be-tag__default {
            width: 60px;
            height: 24px;
            background: #ecf9f5;
            border-radius: 12px;
            border: 0;
            span {
              width: 40px;
              height: 20px;
              font-size: 14px;
              font-family: 'Barlow', sans-serif;
              font-weight: bold;
              color: $mainColor3;
              line-height: 20px;
              text-align: center;
            }
          }
        }
        height: calc(100% - 40px);
        padding: 20px;
        margin-top: 20px;
        background-color: $mainColor7;
      }
    }

    .detail-slump {
      display: flex;
      @include common-container(40px);
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
        font-family: 'Barlow', sans-serif;
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
  /* 移动端预留 适配 */
  @media screen and (max-width: 1280px) {
    .risk-trx-detail .detail-body,
    .risk-trx-detail .detail-profit,
    .risk-trx-detail .detail-title,
    .risk-trx-detail .detail-slump {
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
  @media screen and (min-width: 1280px) and (max-width: 1326px) {
    .risk-trx-detail .detail-body,
    .risk-trx-detail .detail-profit,
    .risk-trx-detail .detail-title,
    .risk-trx-detail .detail-slump {
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
  /*
  !* 125% 适配 *!
  @media screen and (min-width: 1328px) and (max-width: 1538px) {
    .risk-trx-detail .detail-body,
    .risk-trx-detail .detail-profit,
    .risk-trx-detail .detail-slump {
      width: 86%;
    }
  }

  !* 110% 适配 *!
  @media screen and (min-width: 1540px) and (max-width: 1750px) {
    .risk-trx-detail .detail-body,
    .risk-trx-detail .detail-profit,
    .risk-trx-detail .detail-slump {
      width: 80%;
    }
  }*/
</style>
