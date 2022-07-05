/* * @area-line-cell.vue * @deprecated * @author czh * @update (czh 2022/5/25) */
<template>
  <div :id="domId"></div>
</template>

<script lang="ts">
  import { defineComponent, nextTick, onMounted, ref, watch } from 'vue'
  import { Chart } from '@antv/g2'
  import DataSet from '@antv/data-set'
  import { nFormats } from '../../../utils/common'
  import type { PropType } from 'vue'
  import type { IStatisticsLine } from '../../../utils/types'
  export default defineComponent({
    name: 'AreaLineCell',
    props: {
      domId: {
        type: String,
        default: 'line-cell_domId',
      },
      height: {
        type: Number,
        default: 360,
      },
      lineData: {
        type: Array as PropType<Array<IStatisticsLine>>,
      },
      smooth: {
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
        renderChart()
      })
      // 实例对象
      const chart = ref<any>()
      watch(
        () => props.lineData,
        () => {
          nextTick(() => {
            if (chart.value) {
              renderChart(true)
            }
          })
        },
        { deep: true, immediate: true }
      )
      const renderChart = (isUpdate?: boolean) => {
        const dom = document.getElementById(props.domId)
        if (!dom) return
        // 更新
        if (isUpdate && (!props.lineData || (props.lineData && props.lineData?.length === 0))) {
          return
        }
        const { DataView } = DataSet
        const dv = new DataView().source(props.lineData!)
        dv.transform({
          type: 'sort-by',
          fields: [props.yAxis], // 根据指定的字段集进行排序，与lodash的sortBy行为一致
          order: 'ASC', // 默认为 ASC，DESC 则为逆序
        })
        if (isUpdate && props.lineData && props.lineData?.length > 0) {
          chart.value.data(dv.rows)
          chart.value.render(isUpdate)
          return
        }
        chart.value = new Chart({
          container: props.domId,
          autoFit: true,
          height: props.height,
          appendPadding: [10, 10],
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
                  <p class="g2-tooltip-list-token">$ ${nFormats(item.value, null)}</p>
                   <p>${item.title}</p>
              </li>`
            })
            container.innerHTML = listItem
            return container
          },
        })
        chart.value.axis(props.xAxis, {
          label: {
            style: {
              fill: '#8A96A3',
            },
          },
          line: null,
          tickLine: null,
        })
        chart.value.axis(props.yAxis, {
          label: {
            style: {
              fill: '#8A96A3',
            },
          },
          grid: {
            line: {
              type: 'line',
              style: {
                lineDash: [4],
              },
            },
          },
        })

        chart.value
          .line()
          .position(`${props.yAxis}*${props.xAxis}`)
          .shape(props.smooth ? 'smooth' : '')
          .style({ stroke: '#1A589B' })
        chart.value
          .area()
          .position(`${props.yAxis}*${props.xAxis}`)
          .style({ fill: 'l(270) 0:rgba(39, 114, 240, 0) 1:#1A589B' })
          .shape(props.smooth ? 'smooth' : '')
        chart.value.render()
      }
    },
  })
</script>

<style lang="scss">
  .g2-tooltip {
    background-color: $textColor3 !important;
    border-radius: 8px !important;
    min-width: 110px !important;
    .g2-tooltip-marker {
      display: none !important;
    }
    .g2-tooltip-list-item {
      p {
        text-align: left !important;
        font-family: BarlowSemi-R, sans-serif;
        font-size: 12px;
        font-weight: 400;
        color: $textColor7 !important;
        line-height: 16px;
      }
      .g2-tooltip-list-token {
        font-size: 14px;
        font-family: BarlowSemi-B, sans-serif;
        font-weight: bold;
        line-height: 20px;
        color: $mainColor7 !important;
      }
    }
  }
</style>
