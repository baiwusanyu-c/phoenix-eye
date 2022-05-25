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
          { create_time: '1991', token_price: 3 },
          { create_time: '1992', token_price: 4 },
          { create_time: '1993', token_price: 3.5 },
          { create_time: '1994', token_price: 5 },
          { create_time: '1995', token_price: 4.9 },
          { create_time: '1996', token_price: 2 },
          { create_time: '1997', token_price: 7 },
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
          width: 76,
          padding: 10,
        })

        chart.value.data(data)
        chart.value.scale({
          token_price: {
            min: 10000,
            nice: true,
          },
          create_time: {
            range: [0, 1],
          },
        })

        chart.value
          .line()
          .position('create_time*token_price')
          .shape('smooth')
          .style({ stroke: props.type === 'up' || !props.type ? '#11CABE' : '#F32F2F' })
        chart.value.axis('create_time', false)
        chart.value.axis('token_price', false)
        chart.value.tooltip(false)
        chart.value.render()
      }
    },
  })
</script>

<style scoped></style>
