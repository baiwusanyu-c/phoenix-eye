/* * @risk-chart.vue * @deprecated * @author czh * @update (czh 2022/5/26) */
<template>
  <div class="risk-chart">
    <div class="risk-chart--title">
      <p>{{ $t('lang.projectExplorer.detail.riskChartTitle') }}</p>
      <el-select
        v-model="selectVal"
        class="contract-type--select"
        :placeholder="$t('lang.createProject.selectContractClass')"
        @change="handleSelectChange">
        <el-option label="24h" value="24"></el-option>
        <el-option label="7d" value="7"></el-option>
        <el-option label="30d" value="30"></el-option>
      </el-select>
    </div>
    <div class="risk-chart--pie">
      <pie-cell dom-id="risk_chart__pie"></pie-cell>
    </div>
    <div class="risk-chart--bar">
      <p>{{ $t('lang.projectExplorer.detail.riskTrx') }}</p>
      <bar-cell></bar-cell>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue'
  import PieCell from '../../../../components/common-components/pie-cell/pie-cell.vue'
  import BarCell from '../../../../components/common-components/bar-cell/bar-cell.vue'

  export default defineComponent({
    name: 'RiskChart',
    components: { BarCell, PieCell },
    setup() {
      const selectVal = ref<string>('24')
      const handleSelectChange = (data: string): void => {
        console.log(data)
      }
      return {
        handleSelectChange,
        selectVal,
      }
    },
  })
</script>

<style lang="scss">
  .risk-chart {
    width: 50%;
    height: 388px;
    position: relative;
    .risk-chart--title {
      display: flex;
      align-items: center;
      p {
        font-size: 16px;
        font-family: BarlowSemi-B, sans-serif;
        font-weight: bold;
        color: $textColor3;
        line-height: 20px;
        margin-right: 20px;
      }
      .el-input {
        width: 80px;
      }
    }
    .risk-chart--bar {
      p {
        font-size: 14px;
        font-family: BarlowSemi-B, sans-serif;
        font-weight: bold;
        color: $textColor3;
        line-height: 17px;
        margin-bottom: 16px;
      }
    }
  }
</style>
