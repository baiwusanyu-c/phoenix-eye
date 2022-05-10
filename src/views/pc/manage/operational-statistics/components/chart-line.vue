/* * @chart-line.vue * @deprecated * @author czh * @update (czh 2022/5/10) */
<template>
  <div id="operational_statistics_line"></div>
</template>

<script lang="ts">
  import { defineComponent, nextTick, onMounted, ref, watch } from 'vue'
  import { Chart } from '@antv/g2'
  import type { PropType } from 'vue'
  import type { IStatisticsLine } from '../../../../../utils/types'

  export default defineComponent({
    name: 'ChartLine',
    props: {
      lineData: {
        type: Array as PropType<Array<IStatisticsLine>>,
      },
    },
    setup(props) {
      onMounted(() => {
        nextTick(() => {
          renderChart()
        })
      })
      // 雷达图实例对象
      const chart = ref<any>()
      watch(
        () => props.lineData,
        () => {
          renderChart(true)
        }
      )
      const renderChart = (isUpdate?: boolean) => {
        // 更新
        if (isUpdate) {
          chart.value.data(props.lineData)
          chart.value.render(isUpdate)
          return
        }
        chart.value = new Chart({
          container: 'operational_statistics_line',
          autoFit: true,
          height: 300,
        })

        chart.value.data(props.lineData)
        chart.value.scale({
          num: {
            min: 10000,
            nice: true,
          },
          day: {
            range: [0, 1],
          },
        })
        chart.value.tooltip({
          showCrosshairs: true,
          shared: true,
        })

        chart.value.axis('num', {
          label: {
            formatter: (val: string) => {
              return val
            },
          },
        })

        chart.value.area().position('day*num')
        chart.value.line().position('day*num')
        chart.value.render()
      }
    },
  })
</script>

<style scoped>
  #operational_statistics_line {
    margin-top: 20px;
  }
</style>
