/* * @project-manage-main.vue * @deprecated 项目管理页面框架 * @author czh * @update (czh 2021/11/1)
*/
<template>
  <div class="project-manage-main eagle-page">
    <div class="project-manage-search">
      <search-input
        :search-btn-name="$t('lang.searchT')"
        :placeholder="$t('lang.createProject.searchP')"
        @search="handleSearch">
      </search-input>
      <be-button
        type="success"
        custom-class="eagle-btn create-btn"
        size="large"
        prev-icon="add"
        round="4"
        @click="openDialog('add')">
        {{ $t('lang.createProject.createProjectTitle') }}
      </be-button>
    </div>
    <div class="project-manage-list eagle-table">
      <el-table :data="projectList.data">
        <template #empty>
          <empty-data></empty-data>
        </template>
        <el-table-column prop="name" width="180">
          <template #header>
            <span class="table-head">{{ $t('lang.createProject.tableHeader.projectName') }}</span>
          </template>
          <template #default="scope">
            <ellipsis-copy
              :target-str="scope.row.name"
              :is-ellipsis="scope.row.name.length > 8 ? true : false"
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
              :is-ellipsis="
                scope.row.keywordList && scope.row.keywordList.length >= 14 ? true : false
              "
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
        <el-table-column prop="risk_tx_num">
          <template #header>
            <span class="table-head">{{ $t('lang.createProject.tableHeader.riskTrx') }}</span>
          </template>
          <template #default="scope">
            <span>{{ isEmpty(scope.row.risk_tx_num, '/') }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="opinion_num">
          <template #header>
            <span class="table-head">{{ $t('lang.createProject.tableHeader.publicOpinion') }}</span>
          </template>
          <template #default="scope">
            <span>{{ isEmpty(scope.row.opinion_num, '/') }}</span>
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
                @click="openDialog('edit', scope.row)"></be-icon>
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
                @click="openDialog('delete', scope.row)"></be-icon>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <div class="table-page">
        <be-pagination
          is-ordianry
          :page-size="pageParams.pageSize"
          :page-count="pageParams.total"
          :current-page="pageParams.currentPage"
          :page-num="[{ label: 10 }, { label: 20 }, { label: 40 }, { label: 80 }, { label: 100 }]"
          :pager-show-count="5"
          page-unit="page"
          :layout="['prev', 'pNum', 'page']"
          @update-num="updateNum"
          @change-page="pageChange">
          <template #prev>
            <span class="table-page-info"> {{ $t('lang.total') }} {{ pageParams.total }}</span>
          </template>
        </be-pagination>
      </div>
    </div>
    <!--    新增、编辑项目弹窗 -->
    <create-project
      ref="createDialog"
      :type="opType"
      :project-id="curItem.project_id"
      :get-list="getList">
    </create-project>
    <!--    删除项目弹窗    -->
    <MsgDialog
      :header-title="$t('lang.delete')"
      :is-show="showDelete"
      :title="$t('lang.systemConfig.delete') + '?'"
      @confirm="confirmDelete"
      @close="() => (showDelete = false)">
    </MsgDialog>
  </div>
</template>

<script lang="ts">
  import { defineComponent, nextTick, onMounted, reactive, ref } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { deleteProject, getProjectListAdmin } from '../../../api/project-management'
  import EmptyData from '../../../components/common-components/empty-data/empty-data.vue'
  import MsgDialog from '../../../components/common-components/msg-dialog/msg-dialog.vue'
  // @ts-ignore
  import { BeButton, BeIcon, BePagination } from '../../../../public/be-ui/be-ui.es'
  import composition from '../../../utils/mixin/common-func'
  import EllipsisCopy from '../../../components/common-components/ellipsis-copy/ellipsis-copy.vue'
  import compositionPage from '../../../utils/mixin/page-param'
  import compositionDialog from '../../../utils/mixin/dialog-func'
  import CreateProject from './components/create-project.vue'
  import type { ICreateProj, IProjectListAdmin, IReappraise } from '../../../api/project-management'
  import type { IPageParam } from '../../../utils/types'

  export default defineComponent({
    name: 'ProjectManageMain',
    components: {
      EmptyData,
      EllipsisCopy,
      CreateProject,
      MsgDialog,
      BeButton,
      BeIcon,
      BePagination,
    },
    setup() {
      const { t } = useI18n()
      const { message, isEmpty } = composition()
      const { pageParams, resetPageParam, updatePageSize } = compositionPage()
      let { createCurItem, curItem, createDialog, opType, openDialog, showDelete } =
        compositionDialog()
      // 当前操作的项目对象
      curItem = createCurItem<ICreateProj>({})
      // 项目列表示例
      const projectList = reactive({
        data: [],
      })

      // loading
      const loading = ref<boolean>(false)
      onMounted(() => {
        getList('reset')
      })
      /**
       * 确认删除项目信息
       */
      const confirmDelete = () => {
        const params: IReappraise = {
          id: (curItem.value as IReappraise).project_id as string,
        }
        deleteProject(params)
          .then(res => {
            if (!res) {
              return
            }
            if (res) {
              message('success', `${t('lang.delete')} ${t('lang.success')}`)
              // 更新列表
              getList('reset')
              showDelete.value = false
            }
          })
          .catch(err => {
            message('error', err.message || err)
            console.error(err)
          })
      }

      /**
       * 获取项目列表
       */
      // 搜索参数
      const searchParams = ref<string>('')
      const handleSearch = (data: string): void => {
        searchParams.value = data
        nextTick(() => {
          getList()
        })
      }
      /**
       * 获取项目列表
       * 重置：清空所有条件进行搜索
       * 翻页：带上所有现有条件搜索
       * 排序：只清空翻页搜索
       * 搜索：只清空翻页参数、排序参数，保留搜索参数，搜索
       */
      const getList = (type?: string) => {
        loading.value = true
        if (type === 'reset') {
          searchParams.value = ''
          resetPageParam()
        }
        const params: IProjectListAdmin = {
          page_num: pageParams.value.currentPage,
          page_size: pageParams.value.pageSize,
          param: searchParams.value,
        }
        getProjectListAdmin(params)
          .then(res => {
            if (!res) {
              return
            }
            // 项目列表
            projectList.data = res.data.page_infos
            pageParams.value.total = res.data.total
            // 關鍵詞字符串轉化為數組
            projectList.data.forEach((val: any) => {
              const keyword = val.keyword.replace('；', ';')
              val.keywordList = keyword
                .split(';')
                .filter((filterVal: any) => filterVal)
                .join(',')
            })
            loading.value = false
          })
          .catch(err => {
            message('error', err.message || err)
            console.error(err)
          })
      }
      /**
       * 分页方法
       * @param item 分页参数
       */
      const pageChange = (item: IPageParam): void => {
        pageParams.value.currentPage = item.currentPage
        getList()
      }
      const updateNum = (data: IPageParam): void => {
        updatePageSize(data.pageSize!, pageParams)
        getList()
      }

      return {
        handleSearch,
        updateNum,
        isEmpty,
        searchParams,
        curItem,
        opType,
        showDelete,
        projectList,
        loading,
        createDialog,
        confirmDelete,
        openDialog,
        getList,
        pageParams,
        pageChange,
      }
    },
  })
</script>

<style lang="scss">
  .project-manage-main {
    min-height: calc(100% - 100px);

    .project-manage-search {
      @include common-container(40px);
    }

    .project-manage-list {
      width: 70%;
      padding: 20px;
      margin: 0 auto;
      background-color: $mainColor7;
    }
  }
  /* 150% 适配 */
  @media screen and (min-width: 1280px) and (max-width: 1326px) {
    .project-manage-main .project-manage-list,
    .project-manage-main .project-manage-search {
      width: 92%;
    }
  }

  /* 125% 适配 */
  @media screen and (min-width: 1328px) and (max-width: 1538px) {
    .project-manage-main .project-manage-list,
    .project-manage-main .project-manage-search {
      width: 80%;
    }
  }
</style>
