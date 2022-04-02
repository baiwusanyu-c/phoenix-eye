/* * @project-detail-top.vue * @deprecated top5 数据表格 * @author czh * @update (czh 2022/2/25) */
<template>
  <div class="project-detail-top5">
    <div class="project-detail-top5-title">
      <span style="margin-right: 16px">{{ title }}</span>
      <be-tag v-if="tokenName" round="4" type="success" custom-class="tag">{{ tokenName }}</be-tag>
      <el-select v-model="curPlatform" style="float: right; width: 120px" @change="handleSelect">
        <el-option
          v-for="item in platformListDict"
          :key="item.id"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </div>
    <el-table ref="Top5List" tooltip-effect="light" :data="data" class="top5-list-table">
      <template #empty>
        <empty-data style="width: 100%"></empty-data>
      </template>
      <el-table-column
        v-for="item in header"
        :key="item.prop + 'detail'"
        :prop="item.prop"
        :width="item.prop === 'address' ? '140' : tableW"
        align="left">
        <template #header>
          <span class="table-head">{{ item.label }}</span>
        </template>
        <template #default="scope">
          <be-ellipsis-copy
            v-if="item.prop === 'address'"
            :target-str="scope.row.address"
            font-length="6"
            end-length="6">
          </be-ellipsis-copy>
          <span v-if="item.prop === 'quantity'">
            {{ simulateToFixed(scope.row.quantity) }}
          </span>
          <span v-if="item.prop === 'pair'">
            {{ scope.row.pair }}
          </span>
          <div v-if="item.prop === 'percentage'">
            <p>{{ scope.row.percentage }}%</p>
            <be-progress
              :percent="scope.row.percentage"
              stroke-width="6"
              color="#1CD2A9"
              :show-info="false">
            </be-progress>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
  import { defineComponent, PropType, ref, watch } from 'vue'
  import { BeTag, BeProgress } from '../../../../../public/be-ui/be-ui.es'
  import BeEllipsisCopy from '../../../../components/common-components/ellipsis-copy/ellipsis-copy.vue'
  import { simulateToFixed } from '../../../../utils/common'
  import { platformListDict } from '../../../../utils/platform-dict'
  import { ITableHeader } from '../../../../utils/types'
  import EmptyData from '../../../../components/common-components/empty-data/empty-data.vue'

  export default defineComponent({
    name: 'ProjectDetailTop',
    components: { EmptyData, BeTag, BeEllipsisCopy, BeProgress },
    props: {
      title: {
        type: String,
        default: 'Top 5 Token Holders',
      },
      data: {
        type: Array as PropType<any>,
      },
      header: {
        type: Array as PropType<ITableHeader[]>,
      },
      tokenName: {
        type: String,
        default: '',
      },
      tokenAddress: {
        type: String,
        default: '',
      },
      defaultPlatfom: {
        type: String,
        default: 'bsc',
      },
      types: {
        type: String,
        default: '',
      },
    },
    emits: ['select'],
    setup(props, ctx) {
      const curPlatform = ref<string>('')
      watch(
        () => props.defaultPlatfom,
        (nVal: string) => {
          curPlatform.value = nVal
        }
      )
      /**
       * 處理選擇事件
       * @param {String} platform - 幣種
       */
      const handleSelect = (platform: string): void => {
        let type: string = props.types
        ctx.emit('select', { platform: platform, type: type })
      }
      const windowInnerW: number = window.innerWidth
      const tableW = ref<number>(140)
      if (windowInnerW <= 1280) {
        tableW.value = 120
      }

      return {
        tableW,
        handleSelect,
        platformListDict,
        curPlatform,
        simulateToFixed,
      }
    },
  })
</script>

<style lang="scss">
  .project-detail-top5 {
    .el-table--enable-row-hover .el-table__body tr:hover > td.el-table__cell {
      background-color: $mainColor6;
    }

    .top5-list-table {
      .el-table__empty-block {
        width: 100% !important;
      }

      .el-table__body {
        border-spacing: 0;
      }

      thead {
        font-size: 16px;
        line-height: 30px;
      }

      .el-table__row {
        height: 20px;

        &:hover {
          box-shadow: none;
        }
      }
    }
    box-sizing: border-box;
    flex: 1;
    min-height: 284px;
    padding: 24px;
    background-color: $mainColor7;
    border-radius: 4px;

    &:hover {
      @apply shadow-xl;
    }

    .project-detail-top5-title {
      font-family: AlibabaPuHuiTi-Medium, sans-serif;
      font-size: 18px;
      font-weight: bold;
      color: $textColor3;

      .tag {
        background-color: $mainColor15;
        border: 0;
        opacity: 0.8;

        &:hover {
          opacity: 1;
        }
      }
    }
  }
</style>
