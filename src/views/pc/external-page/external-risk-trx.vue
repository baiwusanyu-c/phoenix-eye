/*
* @external-risk-trx.vue
* @deprecated 提供给外部的风险交易列表
* @author czh
* @update (czh 2022/3/11)
*/
<template>
    <div id="external_risk_trx" class="scroll-diy">
        <be-container>
            <be-header height="60px">

            </be-header>
            <be-main style="box-sizing: border-box;width: calc(100vw - 60px)">
                <risk-trx-table
                    :show-operation="false"
                    :show-pager="false"
                    ref="RiskTrxTable"
                    :filterChainItem="filterChainItem"
                ></risk-trx-table>
            </be-main>
        </be-container>
    </div>
</template>

<script lang="ts">
import RiskTrxTable from "../risk-trx/components/risk-trx-table.vue";
import {defineComponent,ref} from 'vue'
import {IFilterItem} from "../risk-trx/risk-trx-list.vue";
import {BeContainer,BeHeader,BeMain} from "../../../../public/be-ui/be-ui.es";

export default defineComponent({
    name: "external-risk-trx",
    components: {RiskTrxTable,BeContainer,BeHeader,BeMain},
    setup(){
        /**
         * 筛选框选择
         */
        const filterChainItem = ref<Array<IFilterItem>>([
            {label: 'ETH', val: 'eth', isActive: false},
            {label: 'BSC', val: 'bsc', isActive: false},
            {label: 'HECO', val: 'heco', isActive: false},
            {label: 'POLYGON', val: 'polygon', isActive: false},
        ])
        return{
            filterChainItem
        }
    }
})
</script>

<style scoped>
  #external_risk_trx {
    height: 100vh;
    overflow-y: auto;
  }
</style>