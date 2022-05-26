/* * @area-line-cell.vue * @deprecated * @author czh * @update (czh 2022/5/25) */
<template>
  <div :id="domId"></div>
</template>

<script lang="ts">
  import { defineComponent, nextTick, onMounted, ref, watch } from 'vue'
  import { Chart } from '@antv/g2'
  import { formatMoney } from '../../../utils/common'
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
      x: {
        type: String,
        default: 'token_price',
      },
      y: {
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
          { create_time: '1998', token_price: 3 },
          { create_time: '1999', token_price: 4 },
          { create_time: '2000', token_price: 3.5 },
          { create_time: '2001', token_price: 5 },
          { create_time: '2002', token_price: 4.9 },
          { create_time: '2003', token_price: 2 },
          { create_time: '2004', token_price: 7 },
          { create_time: '2005', token_price: 3 },
          { create_time: '2006', token_price: 4 },
          { create_time: '2007', token_price: 3.5 },
          { create_time: '2008', token_price: 5 },
          { create_time: '2009', token_price: 4.9 },
          { create_time: '2010', token_price: 2 },
          { create_time: '2011', token_price: 7 },
          { create_time: '2012', token_price: 7 },
          { create_time: '2013', token_price: 7 },
          { create_time: '2014', token_price: 7 },
          { create_time: '2015', token_price: 7 },
          { create_time: '2016', token_price: 7 },
          { create_time: '2017', token_price: 7 },
          { create_time: '2018', token_price: 7 },
          { create_time: '2019', token_price: 7 },
          { create_time: '2020', token_price: 17 },
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
          height: props.height,
        })

        chart.value.data(data)

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
                  <p class="g2-tooltip-list-token">$ ${formatMoney(item.value)}</p>
                   <p>${item.title}</p>
              </li>`
            })
            container.innerHTML = listItem
            return container
          },
        })
        chart.value.axis(props.y, {
          label: {
            style: {
              fill: '#8A96A3',
            },
          },
          line: null,
          tickLine: null,
        })
        chart.value.axis(props.x, {
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
          .position(`${props.y}*${props.x}`)
          .shape(props.smooth ? 'smooth' : '')
          .style({ stroke: '#1A589B' })
        chart.value
          .area()
          .position(`${props.y}*${props.x}`)
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
