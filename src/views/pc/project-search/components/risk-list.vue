/* * @risk-list.vue * @deprecated * @author czh * @update (czh 2022/5/26) */
<template>
  <div class="risk-list">
    <el-table
      ref="riskTrxList"
      v-loading="loading"
      tooltip-effect="light"
      :data="tableData"
      @row-click="routerSwitch">
      <template #empty>
        <empty-data content="lang.noRisk"></empty-data>
      </template>
      <el-table-column prop="tx_hash" align="center">
        <template #header>
          <span class="table-head">{{ $t('lang.riskConfig.tableHeader.txHash') }}</span>
        </template>
        <template #default="scope">
          <ellipsis-copy
            :target-str="scope.row.tx_hash"
            :is-show-copy-btn="false"
            styles="font-weight:bold;font-family:Barlow, sans-serif;color:#18304E"
            font-length="7"
            end-length="7">
          </ellipsis-copy>
        </template>
      </el-table-column>
      <el-table-column prop="alert_level" align="center" width="110">
        <template #header>
          <span class="table-head">{{ $t('lang.riskConfig.tableHeader.level') }}</span>
        </template>
        <template #default="scope">
          <span v-if="scope.row.alert_level === 'LOW'" class="level-low">Low</span>
          <span v-if="scope.row.alert_level === 'HIGH'" class="level-high">High</span>
          <span v-if="scope.row.alert_level === 'MEDIUM'" class="level-medium">Medium</span>
        </template>
      </el-table-column>
      <el-table-column prop="tag_list" align="left">
        <template #header>
          <span class="table-head">{{ $t('lang.riskConfig.tableHeader.warningType') }}</span>
        </template>
        <template #default="scope">
          <be-icon
            v-for="item in scope.row.tag_list"
            :key="item + scope.row.tx_hash"
            width="32"
            height="32"
            :title="item"
            style="margin-right: 8px"
            :icon="setTypeIcon(item)">
          </be-icon>
        </template>
      </el-table-column>
      <el-table-column prop="tx_time" align="right">
        <template #header>
          <span class="table-head">{{ $t('lang.riskConfig.tableHeader.txTime') }}</span>
        </template>
        <template #default="scope">
          <date-cell :time="scope.row.tx_time" :is-break="false"></date-cell>
        </template>
      </el-table-column>
    </el-table>
    <div v-if="tableData.length > 0" class="front-page">
      <div class="front-page--body">
        <span>{{ pageParams.currentPage }} / {{ pageNum }}</span>
        <div class="page-btn-group">
          <div class="page-btn" @click="prevPage">◀</div>
          <div class="page-btn" @click="nextPage">▶</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, onMounted, ref, watch } from 'vue'
  import { BeIcon } from '@eagle-eye/be-ui'
  import compositionPage from '../../../../utils/mixin/page-param'
  // @ts-ignore
  import composition from '../../../../utils/mixin/common-func'
  import { getProjWarning } from '../../../../api/risk-trx'
  import EllipsisCopy from '../../../../components/common-components/ellipsis-copy/ellipsis-copy.vue'
  import { openWindow } from '../../../../utils/common'

  export default defineComponent({
    name: 'RiskList',
    components: {
      EllipsisCopy,
      BeIcon,
    },
    props: {
      projectId: {
        type: [String, Number],
        default: '',
      },
    },
    emits: ['show'],
    setup(props, { emit }) {
      watch(
        () => props.projectId,
        () => {
          getList('reset')
        }
      )
      const setTypeIcon = computed(() => {
        return function (data: string) {
          if (data === 'Large outflow') {
            return 'iconLargeOutflow'
          }
          if (data === 'Slump') {
            return 'iconSlump'
          }
          if (data === 'Flash loan') {
            return 'iconFlash'
          }
          if (data === 'Privileged operation') {
            return 'iconPrivileged'
          }
        }
      })
      /* const filterTypeItem = ref<Array<IFilterItem>>([
            { label: 'Large outflow', val: 'Large outflow', isActive: false },
            { label: 'Flash loan', val: 'Flash loan', isActive: false },
            { label: 'Privileged operation', val: 'Privileged operation', isActive: false },
            { label: 'Slump', val: 'Slump', isActive: false },
        ])*/
      const { pageParams, resetPageParam } = compositionPage()
      const pageNum = ref<number>(0)
      const nextPage = (): void => {
        pageParams.value.currentPage!++
        if (pageParams.value.currentPage! > pageNum.value) {
          pageParams.value.currentPage! = pageNum.value
        }
        getList()
      }
      const prevPage = (): void => {
        pageParams.value.currentPage!--
        if (pageParams.value.currentPage! < 1) {
          pageParams.value.currentPage! = 1
        }
        getList()
      }
      const { message } = composition()
      const tableData = ref<Array<any>>([])
      const loading = ref<boolean>(false)

      /**
       * 获取表格数据
       */
      const getList = (type?: string) => {
        // 使用loading变量防抖
        if (loading.value) {
          return
        }
        loading.value = true
        if (type === 'reset') {
          resetPageParam(5, pageParams)
        }
        const params = {
          page_num: pageParams.value.currentPage,
          page_size: pageParams.value.pageSize,
          project_id: Number(props.projectId),
        }
        getProjWarning(params)
          .then((res: any) => {
            if (res && res.success) {
              tableData.value = res.data.page_infos
              pageParams.value.total = res.data.total
              pageNum.value = Math.ceil(res.data.total / pageParams.value.pageSize!)
              if (tableData.value.length > 0) {
                emit('show', true)
              } else {
                emit('show', false)
              }
            } else {
              tableData.value = []
              resetPageParam()
              // message('error', 'system error')
            }
            loading.value = false
          })
          .catch(err => {
            emit('show', false)
            message('error', err.message || err)
            loading.value = false
            console.error(err)
          })
      }
      /**
       * 路由跳轉
       */
      const routerSwitch = (row: any): void => {
        openWindow(`/riskTrxDetail?tx_hash=${row.tx_hash}`)
      }
      onMounted(() => {
        getList('reset')
      })
      return {
        routerSwitch,
        tableData,
        loading,
        pageNum,
        prevPage,
        nextPage,
        pageParams,
        setTypeIcon,
      }
    },
  })
</script>

<style lang="scss">
  .risk-list {
    .el-table__row {
      height: 54px;
    }
    width: 50%;
    height: 388px;
    position: relative;
    .front-page {
      .front-page--body {
        justify-content: flex-end;
        align-items: center;
      }
      margin-top: 16px;
    }
    .level-low {
      font-size: 14px;
      font-family: 'Barlow', sans-serif;
      font-weight: bold;
      color: $mainColor3;
      background-color: $mainColor16-025;
      padding: 4px 12px;
      border-radius: 30px;
    }
    .level-high {
      font-size: 14px;
      font-family: 'Barlow', sans-serif;
      font-weight: bold;
      color: $lessColor4;
      padding: 4px 12px;
      background-color: $lessColor4-025;
      border-radius: 30px;
    }
    .level-medium {
      font-size: 14px;
      font-family: 'Barlow', sans-serif;
      font-weight: bold;
      padding: 4px 12px;
      color: $mainColor19;
      background-color: $mainColor23;
      border-radius: 30px;
    }
  }
</style>
