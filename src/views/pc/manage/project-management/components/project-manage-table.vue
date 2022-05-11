/* * @project-manage-table.vue * @deprecated * @author czh * @update (czh 2022/5/10) */
<template>
  <el-table :data="list">
    <template #empty>
      <empty-data></empty-data>
    </template>
    <el-table-column prop="name" width="180">
      <template #header>
        <span class="table-head">{{ $t('lang.createProject.tableHeader.projectName') }}</span>
      </template>
      <template #default="scope">
        <ellipsis-copy
          :target-str="scope.row.project_name"
          :is-ellipsis="scope.row.project_name.length > 8 ? true : false"
          :is-show-copy-btn="false"
          :is-tooltip="true"
          styles="color: black;font-weight: bold;font-size: 16px;"
          font-length="8"
          end-length="0">
        </ellipsis-copy>
      </template>
    </el-table-column>
    <el-table-column prop="keywordList" width="180">
      <template #header>
        <span class="table-head">{{ $t('lang.createProject.tableHeader.shortName') }}</span>
      </template>
      <template #default="scope">
        <ellipsis-copy
          :target-str="scope.row.keywordList"
          :is-ellipsis="scope.row.keywordList && scope.row.keywordList.length >= 14 ? true : false"
          :is-show-copy-btn="false"
          :is-tooltip="true"
          styles="color: black;font-weight: 400;font-size: 14px;"
          font-length="8"
          end-length="0">
        </ellipsis-copy>
      </template>
    </el-table-column>
    <el-table-column prop="contract_num">
      <template #header>
        <span class="table-head">{{ $t('lang.createProject.tableHeader.contractNum') }}</span>
      </template>
      <template #default="scope">
        <span>{{ scope.row.contract_num }}</span>
      </template>
    </el-table-column>
    <el-table-column prop="audit_report_num">
      <template #header>
        <span class="table-head">{{ $t('lang.createProject.tableHeader.auditNum') }}</span>
      </template>
      <template #default="scope">
        <span>{{ isEmpty(scope.row.audit_report_num, '/') }}</span>
      </template>
    </el-table-column>
    <el-table-column prop="create_time">
      <template #header>
        <span class="table-head">{{ $t('lang.createProject.tableHeader.createTime') }}</span>
      </template>
      <template #default="scope">
        <date-cell :time="scope.row.create_time"></date-cell>
      </template>
    </el-table-column>
    <el-table-column prop="operation">
      <template #header>
        <span class="table-head">{{ $t('lang.createProject.tableHeader.operation') }}</span>
      </template>
      <template #default="scope">
        <el-tooltip placement="top">
          <template #content>
            {{ $t('lang.edit') }}
          </template>
          <be-icon
            custom-class="table-icon"
            icon="iconEditEagle"
            width="24"
            height="24"
            @click="handleOperation('edit', scope.row)"></be-icon>
        </el-tooltip>
        <el-tooltip placement="top">
          <template #content>
            {{ $t('lang.delete') }}
          </template>
          <be-icon
            custom-class="table-icon"
            icon="iconDeleteEagle"
            width="24"
            height="24"
            @click="handleOperation('delete', scope.row)"></be-icon>
        </el-tooltip>
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  // @ts-ignore
  import { BeIcon } from '../../../../../../public/be-ui/be-ui.es.js'
  import composition from '../../../../../utils/mixin/common-func'
  import EllipsisCopy from '../../../../../components/common-components/ellipsis-copy/ellipsis-copy.vue'
  import EmptyData from '../../../../../components/common-components/empty-data/empty-data.vue'
  import type { IProjectInfo } from '../../../../../utils/types'
  import type { PropType } from 'vue'
  export default defineComponent({
    name: 'ProjectManageTable',
    components: {
      EmptyData,
      EllipsisCopy,

      BeIcon,
    },
    props: {
      list: {
        type: Array as PropType<Array<IProjectInfo>>,
      },
    },
    emits: ['operation'],
    setup(props, ctx) {
      const { isEmpty } = composition()
      const handleOperation = (type: string, data: IProjectInfo): void => {
        ctx.emit('operation', type, data)
      }
      return {
        handleOperation,
        isEmpty,
      }
    },
  })
</script>

<style scoped></style>
