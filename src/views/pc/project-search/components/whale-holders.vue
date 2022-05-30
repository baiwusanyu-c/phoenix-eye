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
          <el-table :data="list">
            <template #empty>
              <empty-data></empty-data>
            </template>
            <el-table-column prop="name" width="180">
              <template #header>
                <span class="table-head">{{
                  $t('lang.createProject.tableHeader.projectName')
                }}</span>
              </template>
              <template #default="scope">
                <ellipsis-copy
                  :target-str="scope.row.project_name"
                  :is-ellipsis="scope.row.project_name.length > 8 ? true : false"
                  :is-show-copy-btn="false"
                  :is-tooltip="true"
                  styles="color: black;font-weight: bold;font-size: 16px;"
                  font-length="8"
                  end-length="0">
                </ellipsis-copy>
              </template>
            </el-table-column>
          </el-table>
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
  import type { ITop10Holder } from '../../../../utils/types'

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
      const top10HolderList = ref<Array<ITop10Holder>>([])
      const getTop10Holder = (): void => {
        console.log(111)
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
