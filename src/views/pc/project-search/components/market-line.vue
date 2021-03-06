/* * @market-line.vue * @deprecated * @author czh * @update (czh 2022/5/25) */
<template>
  <div v-if="!(!showTabList[0] && !showTabList[1] && !showTabList[2])" class="market-line-tab">
    <div
      class="tab-item"
      :class="{ 'tab-item__active': activeTab === 'token_price_data' }"
      role="button"
      @click="handleTabClick('token_price_data')">
      {{ $t('lang.projectExplorer.detail.marketTab1') }}
    </div>
    <div
      v-if="showTabList[0]"
      class="tab-item"
      role="button"
      :class="{ 'tab-item__active': activeTab === 'token_transfer_data' }"
      @click="handleTabClick('token_transfer_data')">
      {{ $t('lang.projectExplorer.detail.marketTab2') }}
    </div>
    <div
      v-if="showTabList[1]"
      class="tab-item"
      role="button"
      :class="{ 'tab-item__active': activeTab === 'liquidity_data' }"
      @click="handleTabClick('liquidity_data')">
      {{ $t('lang.projectExplorer.detail.marketTab3') }}
    </div>
    <div
      v-if="showTabList[2]"
      class="tab-item"
      role="button"
      :class="{ 'tab-item__active': activeTab === 'market_cap_data' }"
      @click="handleTabClick('market_cap_data')">
      {{ $t('lang.projectExplorer.detail.marketTab4') }}
    </div>
  </div>
  <div class="market-line-tab--body">
    <div class="info-data">
      <div>
        <p>{{ titles }}</p>
        <el-tooltip :content="innerData.value" placement="top" effect="light">
          <p class="info-val">
            {{
              isEmpty(innerData.value, '/') === '/'
                ? '/'
                : `${activeTab === 'token_transfer_data' ? '' : '$'}${nFormats(innerData.value)}`
            }}
          </p>
        </el-tooltip>
        <p>
          24h:&nbsp;&nbsp;<span>{{
            isEmpty(innerData.day_1_ratio, '/') === '/'
              ? '/'
              : `${formatMoney(floatMultiply(innerData.day_1_ratio, 100))}%`
          }}</span>
        </p>
        <p>
          7d:&nbsp;&nbsp;<span>{{
            isEmpty(innerData.day_7_ratio, '/') === '/'
              ? '/'
              : `${formatMoney(floatMultiply(innerData.day_7_ratio, 100))}%`
          }}</span>
        </p>
        <p>
          30d:&nbsp;&nbsp;<span>{{
            isEmpty(innerData.day_30_ratio, '/') === '/'
              ? '/'
              : `${formatMoney(floatMultiply(innerData.day_30_ratio, 100))}%`
          }}</span>
        </p>
      </div>
    </div>
    <div
      v-if="innerData.every_day_data && innerData.every_day_data.length > 0"
      class="area-container">
      <p>{{ titles }} for the past 30 days</p>
      <area-line-cell
        dom-id="market_line_tab"
        :line-data="innerData.every_day_data"
        :prefix="activeTab === 'token_transfer_data' ? '' : '$'"
        y-axis="date"
        x-axis="value">
      </area-line-cell>
    </div>
    <div
      v-if="!innerData.every_day_data || innerData.every_day_data.length === 0"
      class="area-container">
      <empty-data></empty-data>
    </div>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, nextTick, ref, watch } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { floatMultiply, formatMoney, nFormats } from '../../../../utils/common'
  import AreaLineCell from '../../../../components/common-components/area-line-cell/area-line-cell.vue'
  import composition from '../../../../utils/mixin/common-func'
  import EmptyData from '../../../../components/common-components/empty-data/empty-data.vue'
  import type { PropType } from 'vue'
  import type { IMarketItem, IMarketVolatility } from '../../../../utils/types'

  export default defineComponent({
    name: 'MarketLine',
    components: { EmptyData, AreaLineCell },
    props: {
      data: {
        type: Object as PropType<IMarketVolatility>,
      },
    },
    setup(props) {
      const { t } = useI18n()
      const { isEmpty } = composition()
      const activeTab = ref<string>('token_price_data')
      const handleTabClick = (type: string): void => {
        activeTab.value = type
        setTitle(type)
      }
      const titles = ref<string>(t('lang.projectExplorer.detail.marketTab1'))
      const innerData = ref<IMarketItem>({})
      const computePropsData = computed(() => {
        return props.data
          ? props.data
          : {
              token_price_data: {},
              token_transfer_data: {},
              liquidity_data: {},
              market_cap_data: {},
            }
      })
      watch(
        computePropsData,
        () => {
          nextTick(() => {
            innerData.value = computePropsData.value.token_price_data
          })
        },
        { immediate: true, deep: true }
      )
      const setTitle = (type: string): void => {
        if (type === 'liquidity_data') {
          titles.value = t('lang.projectExplorer.detail.marketTab3')
          props.data && (innerData.value = computePropsData.value.liquidity_data)
        }
        if (type === 'market_cap_data') {
          titles.value = t('lang.projectExplorer.detail.marketTab4')
          props.data && (innerData.value = computePropsData.value.market_cap_data)
        }
        if (type === 'token_transfer_data') {
          titles.value = t('lang.projectExplorer.detail.marketTab2')
          props.data && (innerData.value = computePropsData.value.token_transfer_data)
        }
        if (type === 'token_price_data') {
          titles.value = t('lang.projectExplorer.detail.marketTab1')
          props.data && (innerData.value = computePropsData.value.token_price_data)
        }
      }
      setTitle('token_price_data')
      const showTabList = ref<Array<boolean>>(new Array<boolean>(true, true, true))
      const showTab = (): void => {
        //if (!computePropsData.value.token_transfer_data.every_day_data) {
        //  showTabList.value[0] = false
        //}
        if (computePropsData.value.liquidity_data.value! < 0) {
          showTabList.value[1] = false
        }
        // if (!computePropsData.value.market_cap_data.every_day_data) {
        //   showTabList.value[2] = false
        // }
      }
      showTab()
      return {
        showTabList,
        innerData,
        activeTab,
        titles,
        handleTabClick,
        isEmpty,
        formatMoney,
        nFormats,
        floatMultiply,
      }
    },
  })
</script>

<style lang="scss">
  .market-line-tab {
    padding: 2px;
    box-sizing: border-box;
    display: flex;
    height: 36px;
    background-color: $mainColor22;
    width: max-content;
    border-radius: 4px;
    .tab-item {
      border-radius: 4px;
      font-size: 16px;
      font-family: 'Barlow', sans-serif;

      color: $textColor2;
      line-height: 36px;
      padding: 0 10px;
      cursor: pointer;
    }
    .tab-item__active {
      background-color: $mainColor7;
      color: $textColor3;
      font-weight: bold;
    }
  }
  .market-line-tab--body {
    height: calc(100% - 40px);
    .info-data {
      width: 200px;
      height: 100%;
      display: inline-block;
      div {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100%;
        p {
          text-align: left;
          color: $textColor3;
          font-size: 14px;
          line-height: 17px;
          font-family: 'Barlow', sans-serif;
          margin-top: 23px;
          span {
            font-weight: bold;
            font-family: 'Barlow', sans-serif;
          }
        }
        .info-val {
          font-size: 24px;
          font-weight: bold;
          font-family: 'Barlow', sans-serif;
          margin-bottom: 26px;
        }
      }
    }
    .area-container {
      height: 100%;
      display: inline-block;
      width: calc(100% - 200px);
      float: right;
      p {
        width: 100%;
        text-align: right;
        margin-bottom: 10px;
        font-size: 14px;
        font-family: 'Barlow', sans-serif;
        font-weight: 400;
        color: $textColor3;
        line-height: 20px;
      }
    }
  }
</style>
