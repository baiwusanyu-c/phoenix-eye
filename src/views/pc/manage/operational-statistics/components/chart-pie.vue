/* * @chart-pie.vue * @deprecated * @author czh * @update (czh 2022/5/10) */
<template>
  <div id="operational_statistics_pie"></div>
</template>

<script lang="ts">
  import { defineComponent, nextTick, onMounted, ref, watch } from 'vue'
  import { Chart } from '@antv/g2'
  import type { PropType } from 'vue'
  import type { IStatisticsPie } from '../../../../../utils/types'
  export default defineComponent({
    name: 'ChartPie',
    props: {
      pieData: {
        type: Array as PropType<Array<IStatisticsPie>>,
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
      watch(chart.value, () => {
        renderChart(true)
      })
      const renderChart = (isUpdate?: boolean) => {
        if (!props.pieData || (props.pieData && props.pieData?.length == 0)) {
          return
        }
        // 更新
        if (isUpdate) {
          chart.value.data(props.pieData)
          chart.value.render(isUpdate)
          return
        }
        chart.value = new Chart({
          container: 'operational_statistics_pie',
          autoFit: true,
          height: 350,
        })

        chart.value.coordinate('theta', {
          radius: 0.75,
        })

        chart.value.data(props.pieData)

        chart.value.scale('ratio', {
          formatter: (val: number) => {
            return `${val * 100}%`
          },
        })

        chart.value.tooltip({
          showTitle: false,
          showMarkers: false,
        })

        chart.value
          .interval()
          .position('ratio')
          .color('country')
          .label('ratio', {
            content: (data: IStatisticsPie) => {
              return `${data.country}: ${data.ratio * 100}%`
            },
          })
          .adjust('stack')

        chart.value.interaction('element-active')

        chart.value.render()
      }
    },
  })
</script>

<style scoped></style>
