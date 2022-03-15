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
                <div  class="external-header">
                    <div class="expend-logo"></div>
                    <div class="external-select">
                        <span style="margin-right: 10px">{{ $t('lang.riskConfig.filter.chain') }} : </span>
                        <el-select v-model="curPlatform" style="float:right;width: 120px;margin-right: 30px" @change="handleSelect">
                            <el-option
                                v-for="item in platformListDict"
                                :key="item.id"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </div>

                </div>
            </be-header>
            <be-main class="external-risk-trx--main">
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
import {defineComponent,ref,getCurrentInstance,nextTick} from 'vue'
import {IFilterItem, IRiskTable} from "../risk-trx/risk-trx-list.vue";
import {BeContainer,BeHeader,BeMain} from "../../../../public/be-ui/be-ui.es";
import {platformListDict} from '../../../utils/platform-dict'

export default defineComponent({
    name: "external-risk-trx",
    components: {RiskTrxTable,BeContainer,BeHeader,BeMain},
    setup(){
        console.log('w:',window.innerWidth)
        console.log('h:',window.innerHeight)
        /**
         * 筛选框选择
         */
        const filterChainItem = ref<Array<IFilterItem>>([])
        const curPlatform = ref<string>('bsc')
        /**
         * 處理選擇事件
         * @param {String} platform - 幣種
         */
        const tableInst = getCurrentInstance()
        const handleSelect = (platform:string):void =>{
            filterChainItem.value = [{val:platform, isActive: true}];
            nextTick(()=>{
                (tableInst?.refs.RiskTrxTable as IRiskTable).getList('reset')
            })

        }
        return{
            handleSelect,
            curPlatform,
            platformListDict,
            filterChainItem
        }
    }
})
</script>

<style lang="scss">
  #external_risk_trx {
    height: 100vh;
    overflow-y: auto;

    .expend-logo {
      width: 164px;
      height: 60px;
      margin: 0 30px;
      background-image: url("../../../assets/image/pc/logo-white.png");
      background-repeat: no-repeat;
      background-position-y: center;
    }

    .external-header{
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      background-image: url("../../../assets/image/pc/bg.png");
      background-repeat: no-repeat;
      background-position-y: 10%;
      background-size: 100%;

    }
      .external-select{
          display: flex;
          align-items: center;
      }
  }

  .external-risk-trx--main{
    box-sizing: border-box;
    width: 100%;
    padding: 0;
      .el-table__header-wrapper tr th.el-table-fixed-column--left,
      .el-table__header-wrapper tr th.el-table-fixed-column--right{
          background-color: transparent;
      }
  }
  @media screen and (min-width: 1200px) and (max-width: 1278px) {

    .noM{
      min-width: 1200px;
    }

    .external-risk-trx--main{
      box-sizing: border-box;
      width: calc(100vw - 8px);
      margin: 0;
    }
  }
</style>