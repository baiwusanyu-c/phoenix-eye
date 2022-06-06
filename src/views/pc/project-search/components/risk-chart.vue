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
        <template #prefix>
          <img alt="beosin-select" src="../../../../assets/image/pc/select-all.png" />
        </template>
        <el-option label="24h" value="1"></el-option>
        <el-option label="7d" value="7"></el-option>
        <el-option label="30d" value="30"></el-option>
      </el-select>
    </div>
    <div class="risk-chart--pie">
      <pie-cell
        v-if="innerData && innerData.length > 0"
        dom-id="risk_chart__pie"
        :pie-data="innerData"
        item="feature"
        percent="ratio"></pie-cell>
      <empty-data v-else></empty-data>
    </div>
    <div class="risk-chart--bar">
      <p>{{ $t('lang.projectExplorer.detail.riskTrx') }}</p>
      <bar-cell
        v-if="computePropsData.every_day_data && computePropsData.every_day_data.length > 0"
        :line-data="computePropsData.every_day_data"
        x-axis="date"
        y-axis="num"></bar-cell>
      <empty-data v-else></empty-data>
    </div>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, nextTick, ref, watch } from 'vue'
  import PieCell from '../../../../components/common-components/pie-cell/pie-cell.vue'
  import BarCell from '../../../../components/common-components/bar-cell/bar-cell.vue'
  import EmptyData from '../../../../components/common-components/empty-data/empty-data.vue'
  import type { PropType } from 'vue'
  import type { IOption, IRiskChartData, IRiskPie } from '../../../../utils/types'

  export default defineComponent({
    name: 'RiskChart',
    components: { EmptyData, BarCell, PieCell },
    props: {
      data: {
        type: Object as PropType<IRiskChartData>,
      },
    },
    setup(props) {
      const selectVal = ref<string>('1')
      const computePropsData = computed(() => {
        return props.data
      })
      watch(
        computePropsData,
        () => {
          nextTick(() => {
            innerData.value = computePropsData.value?.stat_30_day_data
            createPieData(innerData.value!)
          })
        },
        { immediate: true, deep: true }
      )
      const innerData = ref<Array<IRiskPie> | undefined>([])
      const handleSelectChange = (data: string): void => {
        if (data === '1') {
          innerData.value = computePropsData.value?.stat_1_day_data
        }
        if (data === '7') {
          innerData.value = computePropsData.value?.stat_7_day_data
        }
        if (data === '30') {
          innerData.value = computePropsData.value?.stat_30_day_data
        }
        createPieData(innerData.value!)
      }
      const createPieData = (data: Array<IOption>) => {
        const colorDist = ['#8A96A3', '#1A589B', '#18304E', '#84a5c5']
        data.forEach((val, index) => {
          val.color = colorDist[index]
        })
      }
      innerData.value = computePropsData.value?.stat_30_day_data

      return {
        handleSelectChange,
        computePropsData,
        selectVal,
        innerData,
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
        width: 120px;
      }
    }
    .risk-chart--pie {
      .empty-data {
        img {
          width: 130px;
          height: 130px;
        }
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
      .empty-data {
        img {
          width: 130px;
          height: 130px;
        }
      }
    }
  }
</style>
