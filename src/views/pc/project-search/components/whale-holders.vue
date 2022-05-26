/* * @whale-holders.vue * @deprecated * @author czh * @update (czh 2022/5/26) */
<template>
  <div class="project-detail-decent--body">
    <div class="project-detail-decent--title">
      <p>{{ $t('lang.projectExplorer.detail.whaleTitle') }}</p>
      <div class="project-detail-decent-tab">
        <div
          class="tab-item"
          :class="{ 'tab-item__active': activeTab === 'Token' }"
          role="button"
          @click="handleTabClick('Token')">
          {{ $t('lang.projectExplorer.detail.whaleTab1') }}
        </div>
        <div
          class="tab-item"
          role="button"
          :class="{ 'tab-item__active': activeTab === 'Liquidity' }"
          @click="handleTabClick('Liquidity')">
          {{ $t('lang.projectExplorer.detail.whaleTab2') }}
        </div>
      </div>
    </div>
    <div v-if="activeTab === 'Token'">
      <div class="token-holders-distribution">
        <div style="width: 50%">
          <p class="whale-sub-title" style="margin-bottom: 22px">
            {{ $t('lang.projectExplorer.detail.whaleTitle1') }}
          </p>
          <pie-cell dom-id="whale_chart__pie"></pie-cell>
        </div>
        <div style="width: 50%">
          <p class="whale-sub-title">{{ $t('lang.projectExplorer.detail.whaleTitle2') }}</p>
        </div>
      </div>
      <div style="margin-top: 22px">
        <p class="whale-sub-title">{{ $t('lang.projectExplorer.detail.whaleTitle3') }}</p>
      </div>
    </div>
    <div v-if="activeTab === 'Liquidity'">
      <p class="whale-sub-title">{{ $t('lang.projectExplorer.detail.whaleTitle4') }}</p>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue'

  export default defineComponent({
    name: 'WhaleHolders',
    props: {
      projectId: {
        type: String,
        default: '',
      },
    },
    setup() {
      const activeTab = ref<string>('Token')
      const handleTabClick = (type: string): void => {
        activeTab.value = type
      }
      return {
        activeTab,
        handleTabClick,
      }
    },
  })
</script>

<style lang="scss">
  .project-detail-decent--body {
    padding: 24px;
    box-sizing: border-box;
    background-color: $mainColor7;
    .project-detail-decent--title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 28px;
      p {
        font-size: 20px;
        font-family: BarlowSemi-B, sans-serif;
        font-weight: bold;
        color: $textColor3;
        line-height: 24px;
      }
    }
    .project-detail-decent-tab {
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
        min-width: 112px;
        color: $textColor2;
        line-height: 32px;
        padding: 0 10px;
        cursor: pointer;
        text-align: center;
      }
      .tab-item__active {
        background-color: $mainColor7;
        color: $textColor3;
        font-weight: bold;
      }
    }
    .whale-sub-title {
      font-size: 16px;
      font-family: BarlowSemi-B, sans-serif;
      font-weight: bold;
      color: $textColor3;
      line-height: 20px;
    }
    .token-holders-distribution {
      display: flex;
      justify-content: space-between;
    }
  }
</style>
