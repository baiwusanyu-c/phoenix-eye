/*
* @risk-trx-list.vue
* @deprecated
* @author czh
* @update (czh 2021/11/2)
*/
<template>
    <div class="risk-trx-list eagle-page">

        <div class="search-area">
            <div class="risk-trx-search-input">
                <el-input v-model="searchParams"
                          :placeholder="$t('lang.riskConfig.searchP')"
                          style="margin-right: 16px"/>
                <be-button type="success"
                           customClass="eagle-btn search-btn"
                           size="large"
                           @click="getData"
                           round="4">
                    <span>{{ $t('lang.searchT') }}</span>
                </be-button>
            </div>
            <div class="risk-trx-search-filter">
                <span class="filter-label">{{ $t('lang.riskConfig.filter.chain') }}:</span>
                <div v-for="(item) in filterChainItem">
                    <be-button
                        type="success"
                        :customClass="item.isActive ? `filter-btn filter-btn-active` : `filter-btn`"
                        @click="handleFilterClick('platform',item)"
                        :key="item.label + 'chain'">
                        {{ item.label }}
                    </be-button>
                </div>
                <span class="filter-label">
                        <span class="filter-label">{{ $t('lang.riskConfig.filter.type') }}:</span>
                    </span>
                <div v-for="(item) in filterTypeItem">
                    <be-button type="success"
                               v-if="item.val"
                               :customClass="item.isActive ? `filter-btn filter-btn-active` : `filter-btn`"
                               @click="handleFilterClick('type',item)"
                               :key="item.label + 'type'">
                        {{ item.label }}
                    </be-button>
                    <!--         占位           -->
                    <div v-else></div>
                </div>
                <span class="filter-label">
                         <span class="filter-label">{{ $t('lang.riskConfig.filter.level') }}:</span>
                    </span>
                <div v-for="(item) in filterLevelItem">
                    <be-button
                        type="success"
                        :customClass="item.isActive ? `filter-btn filter-btn-active` : `filter-btn`"
                        @click="handleFilterClick('level',item)"
                        :key="item.label + 'level'">
                        {{ item.label }}
                    </be-button>
                </div>

            </div>
        </div>
        <div class="risk-table">
            <risk-trx-table
                ref="RiskTrxTable"
                :filterChainItem="filterChainItem"
                :filterTypeItem="filterTypeItem"
                :filterLevelItem="filterLevelItem"
                :search-params="searchParams"
            ></risk-trx-table>
        </div>
    </div>
</template>

<script lang="ts">
import BePagination from "../../../components/common-components/pagination/be-pagination.vue";
import BeEllipsisCopy from "../../../components/common-components/ellipsis-copy/ellipsis-copy.vue"
import {defineComponent, ref, reactive, onMounted, getCurrentInstance} from "vue";
import {useI18n} from "vue-i18n";
import {BeButton,BeIcon,BeTag} from "../../../../public/be-ui/be-ui.es";
import RiskTrxTable from "./components/risk-trx-table.vue";


export interface IFilterItem {
    label: string,
    val: string,
    isActive: boolean
}
interface IRiskTable {
    getList:Function
}

export default defineComponent({
    name: "RiskTrxList",
    components: {RiskTrxTable, BePagination, BeEllipsisCopy, BeButton,BeIcon,BeTag},
    setup() {
        const {t} = useI18n()
        const searchParams = ref<string>('')

        /**
         * 筛选框选择
         */
        const filterChainItem = ref<Array<IFilterItem>>([
            {label: 'ETH', val: 'eth', isActive: false},
            {label: 'BSC', val: 'bsc', isActive: false},
            {label: 'HECO', val: 'heco', isActive: false},
            {label: 'POLYGON', val: 'polygon', isActive: false},
        ])
        const filterTypeItem = ref<Array<IFilterItem>>([
            {label: 'BlockTrade', val: 'BlockTrade', isActive: false},
            {label: 'FlashLoan', val: 'FlashLoan', isActive: false},
            {label: 'PrivilegedOperation', val: 'PrivilegedOperation', isActive: false},
            {label: '', val: '', isActive: false},
            /*{label: 'Slippage', val: 'Slippage', isActive: false},*/
        ])
        const filterLevelItem = ref<Array<IFilterItem>>([
            {label: t('lang.riskConfig.filter.dangerHigh'), val: 'High', isActive: false},
            {label: t('lang.riskConfig.filter.dangerMiddle'), val: 'Medium', isActive: false},
            {label: t('lang.riskConfig.filter.dangerLow'), val: 'Low', isActive: false},
        ])
        /**
         * 处理过滤点击
         */
        const handleFilterClick = (type: string, item: IFilterItem): void => {
            item.isActive = !item.isActive
            getData()
        }
        const tabelInstance = getCurrentInstance()
        const getData = ():void =>{
            (tabelInstance?.refs.RiskTrxTable as IRiskTable).getList('reset')
        }
        return {
            getData,
            filterChainItem,
            filterTypeItem,
            filterLevelItem,
            handleFilterClick,
            searchParams,
        }
    },
})
</script>

<style lang="scss">
.risk-trx-list {
  min-height: calc(100% - 100px);

  .search-area {
    width: 67.5%;
    margin: 40px auto 0 auto;

    .risk-trx-search-input {
      display: flex;

      input::-webkit-input-placeholder { /* WebKit browsers */
        font-family: AlibabaPuHuiTi-Regular, sans-serif;
        font-size: 18px;
        color: $mainColor14;
      }

      .el-input__inner {
        height: 52px;
        font-family: AlibabaPuHuiTi-Regular, sans-serif;
        font-size: 18px;
        line-height: 52px;
        color: $textColor4;
      }
    }

    .risk-trx-search-filter {
      box-sizing: border-box;
      display: grid;
      grid-template-columns:100px 120px 120px 200px 100px;
      grid-gap: 20px;
      width: 100%;
      padding: 20px;
      margin-top: 36px;
      background-color: $mainColor7;
      border-radius: 4px;
      opacity: .69;

      .filter-label {
        font-weight: bold;
      }
    }

    .filter-btn {
      margin-right: 16px;
      color: $textColor11;
      background-color: transparent;

      .be-button-slot {
        font-family: AlibabaPuHuiTi-Regular, AlibabaPuHuiTi sans-serif;
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
    width: 67.5%;
    margin: 30px auto 0 auto;
  }
}

</style>