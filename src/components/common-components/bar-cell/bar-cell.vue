/* * @bar-cell.vue * @deprecated * @author czh * @update (czh 2022/5/26) */
<template>
  <div :id="domId"></div>
</template>

<script lang="ts">
  import { defineComponent, nextTick, onMounted, ref, watch } from 'vue'
  import { Chart } from '@antv/g2'

  import DataSet from '@antv/data-set'
  import type { IStatisticsLine } from '../../../utils/types'
  import type { PropType } from 'vue'

  export default defineComponent({
    name: 'BarCell',
    props: {
      domId: {
        type: String,
        default: 'line-cell_domId',
      },
      height: {
        type: Number,
        default: 120,
      },
      lineData: {
        type: Array as PropType<Array<IStatisticsLine>>,
        default: () => [],
      },
      showAxis: {
        type: Boolean,
        default: true,
      },
      xAxis: {
        type: String,
        default: 'token_price',
      },
      yAxis: {
        type: String,
        default: 'create_time',
      },
    },
    setup(props) {
      onMounted(() => {
        nextTick(() => {
          renderChart()
        })
      })
      // 实例对象
      const chart = ref<any>()
      watch(
        () => props.lineData,
        (nVal, oVal) => {
          if (nVal && !oVal) {
            renderChart()
          } else {
            renderChart(true)
          }
        }
      )
      const renderChart = (isUpdate?: boolean) => {
        const { DataView } = DataSet
        const dv = new DataView().source(props.lineData ? props.lineData : [])
        dv.transform({
          type: 'sort-by',
          fields: [props.yAxis], // 根据指定的字段集进行排序，与lodash的sortBy行为一致
          order: 'ASC', // 默认为 ASC，DESC 则为逆序
        })
        // 更新
        if (isUpdate) {
          chart.value.data(dv.rows)
          chart.value.render(isUpdate)
          return
        }
        chart.value = new Chart({
          container: props.domId,
          autoFit: true,
          height: props.height,
        })
        chart.value.data(dv.rows)
        chart.value.tooltip({
          showCrosshairs: true,
          showTitle: false,
          showContent: true,
          marker: {
            fill: '#1A589B',
          },
          crosshairs: {
            type: 'x',
            line: {
              style: {
                stroke: 'l(90) 0:rgba(39, 114, 240, 0) 1:#1A589B32 ',
                lineWidth: 46,
              },
            },
          },
          customContent: (name: any, items: Array<{ title: string; value: number }>) => {
            const container = document.createElement('div')
            container.className = 'g2-tooltip'
            let listItem = ''
            items.forEach((item: { title: string; value: number }) => {
              listItem += `
              <li class="g2-tooltip-list-item" style="margin-bottom:4px;">
                  <p class="g2-tooltip-list-token">score: ${item.value}</p>
              </li>`
            })
            container.innerHTML = listItem
            return container
          },
        })
        const axisLabel = props.showAxis
          ? {
              style: {
                fill: '#8A96A3',
              },
            }
          : null
        const axisGrid = props.showAxis
          ? {
              line: {
                type: 'line',
                style: {
                  lineDash: [4],
                },
              },
            }
          : null
        chart.value.axis(props.xAxis, {
          label: axisLabel,
          line: null,
          tickLine: null,
        })
        chart.value.axis(props.yAxis, {
          label: axisLabel,
          grid: axisGrid,
        })

        chart.value
          .interval()
          .position(`${props.xAxis}*${props.yAxis}`)
          .style({
            fill: '#18304E',
            radius: [20, 20, 0, 0],
          })
        chart.value.render()
      }
    },
  })
</script>

<style scoped></style>
