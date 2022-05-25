/* * @market-line.vue * @deprecated * @author czh * @update (czh 2022/5/25) */
<template>
  <div class="market-line-tab">
    <div
      class="tab-item"
      :class="{ 'tab-item__active': activeTab === 'token_price_data' }"
      role="button"
      @click="handleTabClick('token_price_data')">
      {{ $t('lang.projectExplorer.detail.marketTab1') }}
    </div>
    <div
      class="tab-item"
      role="button"
      :class="{ 'tab-item__active': activeTab === 'token_transfer_data' }"
      @click="handleTabClick('token_transfer_data')">
      {{ $t('lang.projectExplorer.detail.marketTab2') }}
    </div>
    <div
      class="tab-item"
      role="button"
      :class="{ 'tab-item__active': activeTab === 'liquidity_data' }"
      @click="handleTabClick('liquidity_data')">
      {{ $t('lang.projectExplorer.detail.marketTab3') }}
    </div>
    <div
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
        <p class="info-val">{{ isEmpty(1234, '/') === '/' ? '/' : `$${formatMoney(1234)}` }}</p>
        <p>24h:&nbsp;&nbsp;<span>10.53%</span></p>
        <p>7d:&nbsp;&nbsp;<span>10.53%</span></p>
        <p>30d:&nbsp;&nbsp;<span>10.53%</span></p>
      </div>
    </div>
    <div class="area-container"></div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { formatMoney, isEmpty } from '../../../../utils/common'

  export default defineComponent({
    name: 'MarketLine',
    setup() {
      const { t } = useI18n()
      const activeTab = ref<string>('token_price_data')
      const handleTabClick = (type: string): void => {
        activeTab.value = type
        setTitle(type)
      }
      const titles = ref<string>(t('lang.projectExplorer.detail.marketTab1'))
      const setTitle = (type: string): void => {
        if (type === 'liquidity_data') {
          titles.value = t('lang.projectExplorer.detail.marketTab3')
        }
        if (type === 'market_cap_data') {
          titles.value = t('lang.projectExplorer.detail.marketTab4')
        }
        if (type === 'token_transfer_data') {
          titles.value = t('lang.projectExplorer.detail.marketTab2')
        }
        if (type === 'token_price_data') {
          titles.value = t('lang.projectExplorer.detail.marketTab1')
        }
      }
      return {
        activeTab,
        titles,
        handleTabClick,
        isEmpty,
        formatMoney,
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
      font-family: BarlowSemi-B, sans-serif;

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
          font-family: BarlowSemi-R, sans-serif;
          margin-top: 23px;
          span {
            font-weight: bold;
            font-family: BarlowSemi-B, sans-serif;
          }
        }
        .info-val {
          font-size: 24px;
          font-weight: bold;
          font-family: BarlowSemi-B, sans-serif;
          margin-bottom: 26px;
        }
      }
    }
    .area-container {
    }
  }
</style>
