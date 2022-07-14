/* * @project-manage-table.vue * @deprecated * @author czh * @update (czh 2022/5/10) */
<template>
  <el-table
    ref="projManagementTable"
    :data="list"
    :cell-class-name="type === 'system' ? 'cursor-pointer' : ''"
    @sort-change="handleSort"
    @row-click="routerSwitch">
    <template #empty>
      <empty-data></empty-data>
    </template>
    <el-table-column prop="name" width="300">
      <template #header>
        <span class="table-head">{{ $t('lang.createProject.tableHeader.projectName') }}</span>
      </template>
      <template #default="scope">
        <project-name-cell
          :size="32"
          width="300"
          :name="scope.row.project_name"
          :url="scope.row.logo_url"
          :font-len="35"
          :ellipsis-len="35">
        </project-name-cell>
      </template>
    </el-table-column>
    <el-table-column prop="keywordList" width="180">
      <template #header>
        <span class="table-head">{{ $t('lang.createProject.tableHeader.shortName') }}</span>
      </template>
      <template #default="scope">
        <ellipsis-copy
          :target-str="scope.row.keywordList"
          :is-ellipsis="scope.row.keywordList && scope.row.keywordList.length >= 40 ? true : false"
          :is-show-copy-btn="false"
          :is-tooltip="true"
          styles="color: black;font-weight: 400;font-size: 14px;"
          font-length="25"
          end-length="0">
        </ellipsis-copy>
      </template>
    </el-table-column>
    <el-table-column
      prop="contract_num"
      width="120"
      sortable="custom"
      :sort-orders="['ascending', 'descending']">
      <template #header>
        <span class="table-head">{{ $t('lang.createProject.tableHeader.contractNum') }}</span>
      </template>
      <template #default="scope">
        <span>{{ scope.row.contract_num }}</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="audit_report_num"
      width="120"
      sortable="custom"
      :sort-orders="['ascending', 'descending']">
      <template #header>
        <span class="table-head">{{ $t('lang.createProject.tableHeader.auditNum') }}</span>
      </template>
      <template #default="scope">
        <span>{{ isEmpty(scope.row.audit_report_num, '/') }}</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="create_time"
      width="130"
      sortable="custom"
      :sort-orders="['ascending', 'descending']">
      <template #header>
        <span class="table-head">{{ $t('lang.createProject.tableHeader.createTime') }}</span>
      </template>
      <template #default="scope">
        <date-cell :time="scope.row.create_time" :is-break="false"></date-cell>
      </template>
    </el-table-column>
    <el-table-column prop="operation" width="160">
      <template #header>
        <span class="table-head">{{ $t('lang.createProject.tableHeader.operation') }}</span>
      </template>
      <template #default="scope">
        <be-button
          style="margin-right: 10px"
          type="success"
          custom-class="operate-btn"
          prev-icon="iconEditEagle"
          @click="handleOperation('edit', scope.row)">
          {{ $t('lang.edit') }}
        </be-button>
        <be-button
          custom-class="operate-btn"
          type="success"
          prev-icon="iconDeleteEagle"
          @click="handleOperation('delete', scope.row)">
          {{ $t('lang.delete') }}
        </be-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts">
  import { defineComponent, getCurrentInstance } from 'vue'
  // @ts-ignore
  import { BeButton } from '@eagle-eye/be-ui'
  import composition from '../../../../../utils/mixin/common-func'
  import EllipsisCopy from '../../../../../components/common-components/ellipsis-copy/ellipsis-copy.vue'
  import EmptyData from '../../../../../components/common-components/empty-data/empty-data.vue'
  import type { ElTable } from 'element-plus'
  import type { IProjectInfo } from '../../../../../utils/types'
  import type { PropType } from 'vue'
  export default defineComponent({
    name: 'ProjectManageTable',
    components: {
      EmptyData,
      EllipsisCopy,
      BeButton,
    },
    props: {
      list: {
        type: Array as PropType<Array<IProjectInfo>>,
      },
      type: {
        type: String,
        default: '',
      },
    },
    emits: ['operation', 'sort'],
    setup(props, ctx) {
      const { isEmpty, routerPush } = composition()
      const handleOperation = (type: string, data: IProjectInfo): void => {
        ctx.emit('operation', type, data)
      }
      /**
       * 路由跳轉
       */
      const routerSwitch = (row: any, col: any): void => {
        if (props.type !== 'system' || col.property === 'operation') return
        routerPush('/detail', { id: row.project_id, keyword: row.keyword })
      }
      const handleSort = (column: any): void => {
        const sortType = column.order === 'ascending' ? 'asc' : 'desc'
        ctx.emit('sort', { sort_field: column.prop, sort_type: sortType })
      }
      const curInst = getCurrentInstance()
      const projManagementTable = curInst?.refs.projManagementTable as typeof ElTable
      return {
        projManagementTable,
        handleSort,
        handleOperation,
        routerSwitch,
        isEmpty,
      }
    },
  })
</script>

<style scoped></style>
