/* * @risk-trx-list.vue * @deprecated * @author czh * @update (czh 2021/11/2) */
<template>
  <div class="risk-trx-list eagle-page">
    <div class="search-area">
      <search-input
        :search-btn-name="$t('lang.searchT')"
        :placeholder="$t('lang.riskConfig.searchP')"
        @search="handleSearch">
        <be-icon
          icon="iconFilter"
          custom-class="filter--btn"
          width="24"
          height="24"
          color="#18304E"
          @click="handleShowFilter"></be-icon>
      </search-input>
      <div v-show="showFilter" class="risk-trx-search-filter">
        <span class="filter-label">{{ $t('lang.riskConfig.filter.chain') }}:</span>
        <div v-for="item in filterChainItem" :key="item.label + 'filterChainItem'">
          <be-button
            :key="item.label + 'chain'"
            :prev-icon="iconDict[item.label.toUpperCase()]"
            type="success"
            :custom-class="item.isActive ? `filter-btn filter-btn-active` : `filter-btn`"
            @click="handleFilterClick('platform', item)">
            {{ item.label }}
          </be-button>
        </div>

        <span class="filter-label">
          <span class="filter-label">{{ $t('lang.riskConfig.filter.type') }}:</span>
        </span>
        <div v-for="item in filterTypeItem" :key="item.label + 'filterTypeItem'">
          <be-button
            v-if="item.val"
            :key="item.label + 'type'"
            :prev-icon="item.icon"
            type="success"
            :custom-class="item.isActive ? `filter-btn filter-btn-active` : `filter-btn`"
            @click="handleFilterClick('type', item)">
            {{ item.label }}
          </be-button>
          <!--         占位           -->
          <div v-else></div>
        </div>

        <span class="filter-label">
          <span class="filter-label">{{ $t('lang.riskConfig.filter.level') }}:</span>
        </span>
        <div v-for="item in filterLevelItem" :key="item.label + 'filterLevelItem'">
          <be-button
            :key="item.label + 'level'"
            type="success"
            :custom-class="item.isActive ? `filter-btn filter-btn-active` : `filter-btn`"
            @click="handleFilterClick('level', item)">
            <div>
              <span :class="`level__${item.label}`"></span>
              {{ item.label }}
            </div>
          </be-button>
        </div>
      </div>
    </div>
    <div class="risk-table">
      <risk-trx-table
        ref="RiskTrxTable"
        :filter-chain-item="filterChainItem"
        :filter-type-item="filterTypeItem"
        :filter-level-item="filterLevelItem"
        :search-params="searchParams"></risk-trx-table>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, getCurrentInstance, nextTick, ref } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { useEventBus } from '@vueuse/core'
  // @ts-ignore
  import { BeButton, BeIcon } from '@eagle-eye/be-ui'
  import { debounce } from '../../../utils/common'
  import { iconDict } from '../../../utils/platform-dict'
  import RiskTrxTable from './components/risk-trx-table.vue'
  import type { IFilterItem, IRiskTable } from '../../../utils/types'
  export default defineComponent({
    name: 'RiskTrxList',
    components: { BeIcon, RiskTrxTable, BeButton },
    setup() {
      const { t } = useI18n()
      const searchParams = ref<string>('')
      const handleSearch = (data: string): void => {
        searchParams.value = data
        nextTick(() => {
          getList()
        })
      }
      /**
       * 筛选框选择
       */
      const filterChainItem = ref<Array<IFilterItem>>([
        { label: 'ETH', val: 'eth', isActive: false },
        { label: 'BSC', val: 'bsc', isActive: false },
        { label: 'HECO', val: 'heco', isActive: false },
        { label: 'POLYGON', val: 'polygon', isActive: false },
      ])
      const filterTypeItem = ref<Array<IFilterItem>>([
        {
          icon: 'iconLargeOutflow2',
          label: 'Large Outflow',
          val: 'Large outflow',
          isActive: false,
        },
        { icon: 'iconFlash2', label: 'Flash Loan', val: 'Flash loan', isActive: false },
        {
          icon: 'iconPrivileged2',
          label: 'Privileged Operation',
          val: 'Privileged operation',
          isActive: false,
        },
        {
          icon: 'iconExploiter',
          label: 'Exploiter On The Move',
          val: 'Exploiter On The Move',
          isActive: false,
        },
      ])

      const filterLevelItem = ref<Array<IFilterItem>>([
        { label: t('lang.riskConfig.filter.dangerHigh'), val: 'High', isActive: false },
        { label: t('lang.riskConfig.filter.dangerMiddle'), val: 'Medium', isActive: false },
        { label: t('lang.riskConfig.filter.dangerLow'), val: 'Low', isActive: false },
      ])
      // 语种切换重新赋值一下 解决不更新问题
      const busLanguage = useEventBus<string>('language')
      busLanguage.on(() => {
        filterLevelItem.value[0].label = t('lang.riskConfig.filter.dangerHigh')
        filterLevelItem.value[1].label = t('lang.riskConfig.filter.dangerMiddle')
        filterLevelItem.value[2].label = t('lang.riskConfig.filter.dangerLow')
      })
      /**
       * 处理过滤点击
       */
      const handleFilterClick = debounce((type: string, item: IFilterItem) => {
        item.isActive = !item.isActive
        getList()
      }, 500)
      const tabelInstance = getCurrentInstance()
      const getList = (): void => {
        ;(tabelInstance?.refs.RiskTrxTable as IRiskTable).getList('reset')
      }
      const showFilter = ref<boolean>(true)
      const handleShowFilter = (): void => {
        showFilter.value = !showFilter.value
      }
      return {
        handleShowFilter,
        iconDict,
        showFilter,
        debounce,
        getList,
        filterChainItem,
        filterTypeItem,
        filterLevelItem,
        handleFilterClick,
        searchParams,
        handleSearch,
      }
    },
  })
</script>

<style lang="scss">
  .level__High {
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 10px;
    background-color: $lessColor4;
  }
  .level__Medium {
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 10px;
    background-color: $mainColor3;
  }
  .level__Low {
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 10px;
    background-color: $mainColor24;
  }
  .risk-trx-list {
    min-height: calc(100% - 100px);

    .search-area {
      padding: 32px 20px 0 20px;
      box-sizing: border-box;
      background-color: $mainColor7;
      border-radius: 4px;
      @include common-container(40px);
      min-width: 1172px;
      .filter--btn {
        cursor: pointer;
        margin-left: 24px;
      }
      .risk-trx-search-filter {
        box-sizing: border-box;
        display: grid;
        grid-template-columns: 100px 180px 140px 230px 240px;
        grid-gap: 10px;
        width: 100%;
        padding: 20px;
        margin-top: 36px;
        background-color: $mainColor7;
        border-radius: 4px;
        user-select: none;
        .be-button--slot {
          font-weight: 500;
          border-radius: 4px;
        }
        .filter-label {
          color: $textColor3;
          font-weight: bold;
          vertical-align: sub;
          font-family: 'Barlow', sans-serif;
        }
      }

      .filter-btn {
        margin-right: 16px;
        background-color: transparent;
        color: $textColor3;
        .be-button--slot {
          font-family: 'Barlow', sans-serif;
        }

        &:hover {
          color: $mainColor3;
          background-color: $mainColor16-025;
        }
      }

      .filter-btn-active {
        color: $mainColor3;
        background-color: $mainColor16-025;
      }
    }

    .risk-table {
      @include common-container(0px);
      background-color: $mainColor7;
      border-radius: 4px;
      min-width: 1172px;
    }
  }
  /* 移动端预留 适配 */
  @media screen and (max-width: 1280px) {
    .risk-trx-list .search-area,
    .risk-trx-list .risk-table {
      width: 92%;
    }
  }
  /* 150% 适配 */
  @media screen and (min-width: 1280px) and (max-width: 1326px) {
    .risk-trx-list .search-area,
    .risk-trx-list .risk-table {
      width: 92%;
    }
  }
  /*
  !* 125% 适配 *!
  @media screen and (min-width: 1328px) and (max-width: 1538px) {
    .risk-trx-list .search-area,
    .risk-trx-list .risk-table {
      width: 80%;
    }
  }*/
</style>
