/* * @project-manage-main.vue * @deprecated 项目管理页面框架 * @author czh * @update (czh 2021/11/1)
*/
<template>
  <div class="project-manage-search">
    <search-input
      :search-btn-name="$t('lang.searchT')"
      :placeholder="$t('lang.createProject.searchP')"
      @search="handleSearch">
    </search-input>
    <!--   占位     -->
    <div class="eagle-btn create-btn"></div>
  </div>
  <div class="project-manage-list eagle-table">
    <project-manage-table
      ref="projectManageTable"
      :list="projectList.data"
      @operation="openDialog"
      @sort="handleSort"></project-manage-table>
    <div class="table-page">
      <el-pagination
        v-model:currentPage="pageParams.currentPage"
        v-model:page-size="pageParams.pageSize"
        :page-sizes="[10, 20, 40, 80, 100]"
        layout="total, sizes, prev, pager, next"
        :total="pageParams.total"
        @size-change="updateNum"
        @current-change="pageChange" />
    </div>
  </div>
  <!--    新增、编辑项目弹窗 -->
  <create-project
    ref="createDialog"
    type="edit"
    tab-type="usr"
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
</template>

<script lang="ts">
  import { defineComponent, getCurrentInstance, nextTick, onMounted, reactive, ref } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { deleteProject, getProjectListAdmin } from '../../../../api/project-management'
  import MsgDialog from '../../../../components/common-components/msg-dialog/msg-dialog.vue'

  import composition from '../../../../utils/mixin/common-func'
  import compositionPage from '../../../../utils/mixin/page-param'
  import compositionDialog from '../../../../utils/mixin/dialog-func'
  import searchInput from '../../../../components/search-input.vue'
  import CreateProject from './components/create-project.vue'
  import ProjectManageTable from './components/project-manage-table.vue'
  import type { ICreateProj, IProjectManageTable, ISort } from '../../../../utils/types'
  import type { ElTable } from 'element-plus'
  import type { IProjectListAdmin, IReappraise } from '../../../../api/project-management'

  export default defineComponent({
    name: 'ProjectManageUsr',
    components: {
      ProjectManageTable,
      CreateProject,
      MsgDialog,

      searchInput,
    },
    setup() {
      const { t } = useI18n()
      const { message, isEmpty } = composition()
      const { pageParams, resetPageParam, updatePageSize } = compositionPage()
      let { createCurItem, curItem, createDialog, openDialog, showDelete } = compositionDialog()
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
      const curInst = getCurrentInstance()
      const handleSearch = (data: string): void => {
        searchParams.value = data
        nextTick(() => {
          ;(
            (curInst?.refs.projectManageTable as IProjectManageTable)
              .projManagementTable as typeof ElTable
          ).clearSort()
          sortParams.value = {}
          resetPageParam()
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
          type: 'user',
          param: searchParams.value,
          ...sortParams.value,
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
      const pageChange = (item: number): void => {
        pageParams.value.currentPage = item
        getList()
      }
      const updateNum = (data: number): void => {
        updatePageSize(data!, pageParams)
        getList()
      }
      const sortParams = ref<ISort>({})
      const handleSort = (sort: ISort): void => {
        sortParams.value = sort
        const currentPageSize = pageParams.value.pageSize
        resetPageParam(currentPageSize === 10 ? 10 : currentPageSize)
        getList()
      }
      return {
        handleSort,
        handleSearch,
        updateNum,
        isEmpty,
        searchParams,
        curItem,
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
