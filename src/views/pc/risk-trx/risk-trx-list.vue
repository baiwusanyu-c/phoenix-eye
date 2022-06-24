/* * @risk-trx-list.vue * @deprecated * @author czh * @update (czh 2021/11/2) */
<template>
  <div class="risk-trx-list eagle-page">
    <div class="search-area">
      <search-input
        :search-btn-name="$t('lang.searchT')"
        :placeholder="$t('lang.riskConfig.searchP')"
        @search="handleSearch">
      </search-input>
      <div class="risk-trx-search-filter">
        <span class="filter-label">{{ $t('lang.riskConfig.filter.chain') }}:</span>
        <div v-for="item in filterChainItem" :key="item.label + 'filterChainItem'">
          <be-button
            :key="item.label + 'chain'"
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
            {{ item.label }}
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
  import { BeButton } from '@eagle-eye/be-ui'
  import { debounce } from '../../../utils/common'
  import RiskTrxTable from './components/risk-trx-table.vue'
  import type { IFilterItem, IRiskTable } from '../../../utils/types'

  export default defineComponent({
    name: 'RiskTrxList',
    components: { RiskTrxTable, BeButton },
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
        { label: 'Large outflow', val: 'Large outflow', isActive: false },
        { label: 'Flash loan', val: 'Flash loan', isActive: false },
        { label: 'Privileged operation', val: 'Privileged operation', isActive: false },
        { label: 'Slump', val: 'Slump', isActive: false },
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
      return {
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
  .risk-trx-list {
    min-height: calc(100% - 100px);

    .search-area {
      @include common-container(40px);
      min-width: 1172px;
      .risk-trx-search-filter {
        box-sizing: border-box;
        display: grid;
        grid-template-columns: 100px 160px 140px 210px 100px;
        grid-gap: 20px;
        width: 100%;
        padding: 20px;
        margin-top: 36px;
        background-color: $mainColor7;
        border-radius: 4px;
        opacity: 0.69;

        .filter-label {
          font-weight: bold;
          vertical-align: sub;
        }
      }

      .filter-btn {
        margin-right: 16px;
        color: $textColor11;
        background-color: transparent;

        .be-button--slot {
          font-family: BarlowSemi-R, sans-serif;
        }

        &:hover {
          color: $mainColor7;
          background-color: $mainColor3;
        }
      }

      .filter-btn-active {
        color: $mainColor7;
        background-color: $mainColor3;
      }
    }

    .risk-table {
      @include common-container(30px);
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
