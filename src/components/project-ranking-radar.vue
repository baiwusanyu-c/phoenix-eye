/* * @project-ranking-radar.vue * @deprecated * @author czh * @update (czh 2021/11/23) */
<template>
  <div class="project-ranking-radar">
    <div class="project-ranking-radar-info">
      <img :src="logoType" alt="" />
      <span class="project-ranking-radar-platform">{{ platform.toUpperCase() }}</span>
    </div>
    <div :id="`radar_chart${uid}`" class="project-ranking-radar-chart"></div>
  </div>
</template>

<script lang="ts">
  import {
    computed,
    defineComponent,
    getCurrentInstance,
    nextTick,
    onMounted,
    ref,
    watch,
  } from 'vue'
  import DataSet from '@antv/data-set'
  import { Chart, registerGeometryLabelLayout } from '@antv/g2'
  import type { PropType } from 'vue'

  import type { LabelItem } from '@antv/g2/src/geometry/label/interface'
  import type { IGroup } from '@antv/g2/src/dependents'
  type IImgCodeDict = {
    [key: string]: any
  }
  type IInstance = {
    uid: number
  }
  type IRadarData = {
    key: string
    item: string
    a: number
  }
  export default defineComponent({
    name: 'ProjectRankingRadar',
    props: {
      platform: {
        type: String,
        default: 'bsc',
      },
      addr: {
        type: String,
        default: '8acef67c2719fb0fdd1a22c78fb7746f13e824c66b55c0f3dd0e17f50226f029',
      },
      radarData: {
        type: Array as PropType<Array<IRadarData>>,
        default() {
          return [
            { key: 'jtjc-staticDetection', item: '静态检测', a: 10 },
            { key: 'jywd-txStability', item: '市场波动', a: 6 },
            { key: 'jyaq-txSecurity', item: '交易安全', a: 5 },
          ]
        },
      },
      safetyEvaluate: {
        type: [Number, String],
        default: 0,
      },
    },
    setup(props) {
      const { uid } = getCurrentInstance() as IInstance
      // 雷达图实例对象
      const radarChart = ref<any>()
      watch(radarChart.value, () => {
        renderRadar(true)
      })
      // 圖片字典
      const imgImport = import.meta.globEager('../../../../assets/image/pc/*-logo-bz.png')
      const imgCodeDict = ref<IImgCodeDict>({
        bsc: '',
        heco: '',
        eth: '',
        polygon: '',
      })
      Object.keys(imgImport).forEach(val => {
        if (/bsc/.test(val)) {
          imgCodeDict.value.bsc = imgImport[val]
        }
        if (/heco/.test(val)) {
          imgCodeDict.value.heco = imgImport[val]
        }
        if (/eth/.test(val)) {
          imgCodeDict.value.eth = imgImport[val]
          imgCodeDict.value.polygon = imgImport[val]
        }
      })
      const logoType = computed(() => {
        return imgCodeDict.value[props.platform as keyof typeof imgCodeDict.value].default
      })
      onMounted(() => {
        nextTick(() => {
          renderRadar()
        })
      })
      const renderRadar = (isUpdate?: boolean) => {
        // 坐标label缓存
        const labelCache: any = []
        function limitInShape(items: LabelItem[], labels: IGroup[]) {
          labels.forEach(labelGroup => {
            labelGroup.cfg.children[0].cfg.visible = false
          })
          if (!chart) return
          chart?.getCanvas().cfg.children[0].addShape('text', {
            attrs: {
              x: (labelCache[3].point.x + labelCache[5].point.x) / 2 + 40,
              y: (labelCache[3].point.y + labelCache[5].point.y) / 2 + 25,
              text: props.safetyEvaluate,
              textBaseline: 'middle',
              fill: '#333333',
              fontWeight: 'bold',
              fontSize: 30,
            },
          })
        }
        // 注册 label 布局函数
        registerGeometryLabelLayout('limit-in-shape', limitInShape)
        const { DataView } = DataSet
        const dv = new DataView().source(props.radarData)
        dv.transform({
          type: 'fold',
          fields: ['a'], // 展开字段集
          key: 'user', // 设置数据key对应展开字段-》 user:'a'
          value: 'score', // 设置数据value字段 对应展开字段-》 a:70 => score:70
        })
        // 更新
        if (isUpdate) {
          radarChart.value.data(dv.rows)
          radarChart.value.render(isUpdate)
          return
        }
        const chart = new Chart({
          container: `radar_chart${uid}`,
          autoFit: true,
          height: 250,
          appendPadding: [10],
        })
        radarChart.value = chart
        chart.data(dv.rows)
        chart.scale('score', {
          min: 0,
          max: 100,
        })
        chart.coordinate('polar', {
          radius: 1,
        })
        // 坐标轴 - label文字
        chart.axis('item', {
          line: null,
          tickLine: null,
          grid: {
            line: {
              style: {
                lineDash: null,
              },
            },
          },
          label: {
            style: {
              fontWeight: 'bold',
              fontSize: 16,
              fill: 'black',
              fontFamily: 'PingFangSC-Medium, PingFang SC, sans-serif',
            },
            formatter: (text, item) => {
              labelCache.push(JSON.parse(JSON.stringify(item)))
              return text
            },
          },
        })
        // 坐标轴 - 刻度
        chart.axis('score', {
          line: null,
          tickLine: null,
          grid: {
            line: {
              type: 'line',
              style: {
                lineDash: null,
              },
            },
          },
        })

        chart
          .line()
          .position('item*score')
          .color('#1890FF')
          .size(2)
          .label('item*score', {
            autoRotate: false,
            layout: {
              type: 'limit-in-shape',
            },
          })

        chart.area().position('item*score').color('#1890FF')
        chart.legend(false)
        chart.render()
      }
      return {
        uid,
        logoType,
      }
    },
  })
</script>

<style lang="scss">
  .project-ranking-radar {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 32.5%;
    padding: 20px;
    margin: 0 5px 16px 5px;
    background: $mainColor7;
    border-radius: 4px;

    .project-ranking-radar-info {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      width: 100%;

      img {
        width: 25px;
        height: 25px;
      }

      .project-ranking-radar-platform {
        margin: 0 16px 0 6px;
        font-weight: bold;
        color: $textColor4;
      }

      .address {
        color: $textColor4;
      }
    }

    .project-ranking-radar-chart {
      width: 100%;
      height: 100%;
    }
  }
</style>
