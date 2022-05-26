/* * @pie-cell.vue * @deprecated * @author czh * @update (czh 2022/5/26) */
<template>
  <div class="pie-cell">
    <div class="pie-cell-legend">
      <div v-for="item in pieData" :key="item.color + item.item" class="pie-cell-legend--item">
        <div>
          <span class="item-marker" :style="`background-color: ${item.color}`"></span>
          <span class="item-name">{{ item.item }}</span>
        </div>
        <span class="item-value">{{ `${item.percent * 100}%` }}</span>
      </div>
    </div>
    <div :id="domId" class="pie-cell--chart"></div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, nextTick, onMounted, ref, watch } from 'vue'
  import { Chart } from '@antv/g2'
  import { formatMoney } from '../../../utils/common'
  import type { IStatisticsLine } from '../../../utils/types'
  import type { PropType } from 'vue'

  export default defineComponent({
    name: 'PieCell',
    props: {
      domId: {
        type: String,
        default: 'pie-cell_domId',
      },
      pieData: {
        type: Array as PropType<Array<IStatisticsLine>>,
        default() {
          return [
            { color: '#8A96A3', item: 'Large outflow', count: 40, percent: 0.4 },
            { color: '#1A589B', item: 'Flash loan', count: 21, percent: 0.3 },
            { color: '#18304E', item: 'Privileged operation', count: 17, percent: 0.17 },
            { color: '#84a5c5', item: 'Slump', count: 13, percent: 0.13 },
          ]
        },
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
        () => props.pieData,
        () => {
          renderChart(true)
        }
      )
      const renderChart = (isUpdate?: boolean) => {
        const colorArr = ['#8A96A3', '#1A589B', '#18304E', '#84a5c5']
        // 更新
        if (isUpdate) {
          chart.value.data(props.pieData)
          chart.value.render(isUpdate)
          return
        }
        chart.value = new Chart({
          container: props.domId,
          autoFit: true,
          height: 180,
          width: 180,
        })

        chart.value.legend(false)
        chart.value.data(props.pieData)
        chart.value.scale('percent', {
          formatter: (val: any) => {
            val = `${val * 100}%`
            return val
          },
        })
        chart.value.coordinate('theta', {
          radius: 0.75,
          innerRadius: 0.6,
        })
        chart.value.tooltip({
          showCrosshairs: false,
          marker: null,
          showTitle: false,
          showContent: true,
          customContent: (name: any, items: Array<{ name: string; value: number }>) => {
            const container = document.createElement('div')
            container.className = 'g2-tooltip'
            let listItem = ''
            items.forEach((item: { name: string; value: number }) => {
              listItem += `
              <li class="g2-tooltip-list-item" style="margin-bottom:4px;">
                  <p class="g2-tooltip-list-token">${item.value}</p>
                   <p>${item.name}</p>
              </li>`
            })
            container.innerHTML = listItem
            return container
          },
        })
        chart.value
          .interval()
          .adjust('stack')
          .position('percent')
          .color('item', colorArr)
          .label('percent', (percent: any) => {
            return {
              content: () => {
                return `${percent * 100}%`
              },
            }
          })
          .tooltip('item*percent', (item: any, percent: any) => {
            percent = `${percent * 100}%`
            return {
              name: item,
              value: percent,
            }
          })
          .state({
            active: {
              style: (element: any) => {
                const shape = element.shape
                return {
                  lineWidth: 10,
                  stroke: shape.attr('fill'),
                }
              },
            },
          })

        chart.value.interaction('element-active')
        chart.value.render()
      }
    },
  })
</script>

<style lang="scss">
  .pie-cell {
    display: flex;
    .pie-cell-legend {
      width: 50%;
      height: 180px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
    }
    .pie-cell--chart {
      width: 50%;
      height: 180px;
    }
    .pie-cell-legend--item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 80%;
      margin-top: 16px;
      .item-name {
        font-size: 14px;
        font-family: BarlowSemi-R sans-serif;
        font-weight: 400;
        color: $textColor3;
        line-height: 24px;
      }
      .item-value {
        font-size: 14px;
        font-family: BarlowSemi-B sans-serif;
        font-weight: bold;
        color: $textColor3;
        line-height: 24px;
      }
      .item-marker {
        width: 16px;
        border-radius: 16px;
        height: 16px;
        display: inline-block;
        margin-right: 4px;
        vertical-align: text-top;
      }
    }
  }
</style>
