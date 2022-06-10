/* * @pie-cell.vue * @deprecated * @author czh * @update (czh 2022/5/26) */
<template>
  <div class="pie-cell">
    <div class="pie-cell-legend">
      <div class="pie-cell-body">
        <div
          v-for="pieItems in pieData"
          :key="pieItems.color + pieItems.item"
          class="pie-cell-legend--item">
          <div>
            <span class="item-marker" :style="`background-color: ${pieItems.color}`"></span>
            <span class="item-name">{{ pieItems[item] }}</span>
          </div>
          <span class="item-value">{{
            `${simulateToFixed(floatMultiply(pieItems[percent], 100), 4)}%`
          }}</span>
        </div>
      </div>
    </div>
    <div :id="domId" class="pie-cell--chart"></div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, nextTick, onMounted, ref, watch } from 'vue'
  import { Chart } from '@antv/g2'
  import { floatMultiply, simulateToFixed } from '../../../utils/common'
  import type { IOption } from '../../../utils/types'
  import type { PropType } from 'vue'
  export default defineComponent({
    name: 'PieCell',
    props: {
      domId: {
        type: String,
        default: 'pie-cell_domId',
      },
      pieData: {
        type: Array as PropType<Array<IOption>>,
      },
      item: {
        type: String,
        default: 'item',
      },
      percent: {
        type: String,
        default: 'percent',
      },
      content: {
        type: String,
        default: '',
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
        },
        { deep: true }
      )
      const renderChart = (isUpdate?: boolean) => {
        if (props.pieData) {
          const pieData = props.pieData
          pieData.map((val: any) => (val.ratio = Number(val.ratio.toFixed(4))))

          // 更新
          if (isUpdate) {
            nextTick(() => {
              chart.value.forceFit()
            })
            chart.value.data(pieData)
            chart.value.render(isUpdate)
            return
          }
          chart.value = new Chart({
            container: props.domId,
            autoFit: true,
          })

          chart.value.legend(false)
          chart.value.data(pieData)
          chart.value.scale(props.percent, {
            formatter: (val: any) => {
              val = `${floatMultiply(val, 100)}%`
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
            .position(props.percent)
            .color(props.item, (item: string) => {
              for (let i = 0; i < props.pieData?.length!; i++) {
                if (props.pieData![i][props.item] === item) {
                  return props.pieData![i]!.color
                }
              }
            })
            .label(props.percent, (percent: any) => {
              return {
                content: () => {
                  return `${floatMultiply(percent, 100)}%`
                },
              }
            })
            .tooltip(`${props.item}*${props.percent}`, (item: any, percent: any) => {
              percent = `${floatMultiply(percent, 100)}%`
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
          if (props.content) {
            chart.value
              .annotation()
              .text({
                position: ['50%', '50%'],
                content: props.content,
                style: {
                  fontSize: 26,
                  fill: '#18304E',
                  textAlign: 'center',
                },
                offsetY: -10,
              })
              .text({
                position: ['50%', '50%'],
                content: 'Total supply',
                style: {
                  fontSize: 12,
                  fill: '#8A96A3',
                  textAlign: 'center',
                },
                offsetY: 20,
              })
          }

          chart.value.interaction('element-active')
          chart.value.render()
          nextTick(() => {
            chart.value.forceFit()
          })
        }
      }
      return {
        simulateToFixed,
        floatMultiply,
      }
    },
  })
</script>

<style lang="scss">
  .pie-cell {
    display: flex;
    align-items: center;
    .pie-cell-legend {
      width: 50%;
      height: 200px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      position: relative;
    }
    .pie-cell-body {
      position: absolute;
    }
    .pie-cell--chart {
      width: 50%;
      height: 200px;
    }
    .pie-cell-legend--item {
      display: flex;
      align-items: center;
      justify-content: space-between;
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
        margin-left: 16px;
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
