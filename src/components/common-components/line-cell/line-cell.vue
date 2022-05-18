/* * @line-cell.vue * @deprecated * @author czh * @update (czh 2022/5/18) */
<template>
  <div :id="domId"></div>
</template>

<script lang="ts">
  import { defineComponent, nextTick, onMounted, ref, watch } from 'vue'
  import { Chart } from '@antv/g2'
  import type { PropType } from 'vue'
  import type { IStatisticsLine } from '../../../utils/types'
  export default defineComponent({
    name: 'LineCell',
    props: {
      domId: {
        type: String,
        default: 'line-cell_domId',
      },
      type: {
        type: String,
        default: 'up',
      },
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
        const data = [
          { day: '1991', num: 3 },
          { day: '1992', num: 4 },
          { day: '1993', num: 3.5 },
          { day: '1994', num: 5 },
          { day: '1995', num: 4.9 },
          { day: '1996', num: 2 },
          { day: '1997', num: 7 },
        ]
        // 更新
        if (isUpdate) {
          chart.value.data(props.lineData)
          chart.value.render(isUpdate)
          return
        }
        chart.value = new Chart({
          container: props.domId,
          autoFit: true,
          height: 40,
          width: 120,
          padding: 10,
        })

        chart.value.data(data)
        chart.value.scale({
          num: {
            min: 10000,
            nice: true,
          },
          day: {
            range: [0, 1],
          },
        })

        chart.value
          .line()
          .position('day*num')
          .shape('smooth')
          .style({ stroke: props.type === 'up' ? '#11CABE' : '#F32F2F' })
        chart.value.axis('day', false)
        chart.value.axis('num', false)
        chart.value.tooltip(false)
        chart.value.render()
      }
    },
  })
</script>

<style scoped></style>
