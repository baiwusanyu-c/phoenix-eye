/* * @project-manage-main.vue * @deprecated 项目管理页面框架 * @author czh * @update (czh 2021/11/1)
*/
<template>
  <div class="project-manage-main eagle-page">
    <div class="project-manage-search">
      <div class="project-manage-search-input">
        <el-input
          v-model="searchParams"
          :placeholder="$t('lang.createProject.searchP')"
          style="margin-right: 16px" />
        <be-button
          type="success"
          custom-class="eagle-btn search-btn"
          size="large"
          round="4"
          @click="getList">
          <span>{{ $t('lang.searchT') }}</span>
        </be-button>
      </div>
      <be-button
        type="success"
        custom-class="eagle-btn create-btn"
        size="large"
        prev-icon="add"
        round="4"
        @click="addProject">
        {{ $t('lang.createProject.createProjectTitle') }}
      </be-button>
    </div>
    <div class="project-manage-list eagle-table">
      <el-table :data="projectList.data">
        <el-table-column prop="name" width="180">
          <template #header>
            <span class="table-head">{{ $t('lang.createProject.tableHeader.projectName') }}</span>
          </template>
          <template #default="scope">
            <be-ellipsis-copy
              :target-str="scope.row.name"
              :is-ellipsis="scope.row.name.length > 8 ? true : false"
              :is-show-copy-btn="false"
              :is-tooltip="true"
              styles="color: black;font-weight: bold;font-size: 16px;"
              font-length="8"
              end-length="0">
            </be-ellipsis-copy>
          </template>
        </el-table-column>
        <el-table-column prop="keywordList" width="180">
          <template #header>
            <span class="table-head">{{ $t('lang.createProject.tableHeader.shortName') }}</span>
          </template>
          <template #default="scope">
            <be-ellipsis-copy
              :target-str="scope.row.keywordList"
              :is-ellipsis="
                scope.row.keywordList && scope.row.keywordList.length >= 14 ? true : false
              "
              :is-show-copy-btn="false"
              :is-tooltip="true"
              styles="color: black;font-weight: 400;font-size: 14px;"
              font-length="8"
              end-length="0">
            </be-ellipsis-copy>
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
            <el-tooltip placement="top" effect="light">
              <template #content>
                <span
                  >{{ formatDate(createDate(scope.row.create_time)) }} UTC：{{
                    beijing2utc(scope.row.create_time)
                  }}</span
                >
              </template>
              <span style="color: #888">
                <p>{{ formatDate(createDate(scope.row.create_time)).split(' ')[0] }}</p>
                <p>{{ formatDate(createDate(scope.row.create_time)).split(' ')[1] }}</p>
              </span>
            </el-tooltip>
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
                @click="editProject(scope.row)"></be-icon>
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
                @click="deleteProjects(scope.row)"></be-icon>
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
          :page-num="[{ label: 20 }, { label: 40 }, { label: 80 }, { label: 100 }]"
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
      ref="createProjectDialog"
      :type="opType"
      :project-id="curItem.data.project_id"
      :get-list="getList">
    </create-project>
    <!--    删除项目弹窗    -->
    <MsgDialog
      :header-title="$t('lang.delete')"
      :is-show="showDelete"
      :title="deleteText"
      @confirm="confirmDelete"
      @close="() => (showDelete = false)">
    </MsgDialog>
  </div>
</template>

<script lang="ts">
  import { BeButton, BeIcon, BePagination } from '../../../../public/be-ui/be-ui.es'
  import CreateProject from './components/create-project.vue'
  import { IPageParam } from '../../../utils/types'
  import {
    deleteProject,
    getProjectListAdmin,
    ICreateProj,
    IProjectListAdmin,
    IReappraise,
  } from '../../../api/project-management'
  import MsgDialog from '../../../components/common-components/msg-dialog/msg-dialog.vue'
  import { defineComponent, ref, reactive, onMounted, nextTick } from 'vue'
  import { useI18n } from 'vue-i18n'
  import composition from '../../../utils/mixin/common-func'
  import BeEllipsisCopy from '../../../components/common-components/ellipsis-copy/ellipsis-copy.vue'
  import { createDate, formatDate, beijing2utc, formatTimeStamp } from '../../../utils/common'

  export default defineComponent({
    name: 'ProjectManageMain',
    components: {
      BeEllipsisCopy,
      CreateProject,
      MsgDialog,
      BeButton,
      BeIcon,
      BePagination,
    },
    setup() {
      const { t } = useI18n()
      const { message, isEmpty } = composition()
      // 当前操作的项目对象
      const curItem = reactive({ data: {} })
      // 当前操作类型
      const opType = ref<string>('add')
      // 删除弹窗显示
      const showDelete = ref<boolean>(false)
      // 删除弹窗显示内容
      const deleteText = ref<string>('')
      // 项目列表示例
      const projectList = reactive({
        data: [],
      })

      // loading
      const loading = ref<boolean>(false)
      // 创建项目弹窗
      const createProjectDialog = ref<any>({})
      onMounted(() => {
        getList('reset')
      })

      /**
       * 新增类型方法
       */
      const addProject = () => {
        opType.value = 'add'
        nextTick(() => {
          createProjectDialog.value.createProjectWindow = true
        })
      }

      /**
       * 编辑类型方法
       */
      const editProject = (item: ICreateProj) => {
        opType.value = 'edit'
        curItem.data = item
        nextTick(() => {
          createProjectDialog.value.createProjectWindow = true
        })
      }

      /**
       * 删除类型方法
       * @param {Object} item - 项目数据对象
       */
      const deleteProjects = (item: ICreateProj) => {
        curItem.data = item
        deleteText.value = `${t('lang.systemConfig.delete')}${item.name}？`
        showDelete.value = true
      }
      /**
       * 确认删除项目信息
       */
      const confirmDelete = () => {
        const params: IReappraise = {
          id: (curItem.data as IReappraise).project_id as string,
        }
        deleteProject(params)
          .then(res => {
            if (!res) {
              return
            }
            if (res) {
              const msg = t('lang.delete') + t('lang.success')
              message('success', msg)
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
      // 分页参数
      const pageParams = ref<IPageParam>({
        currentPage: 1,
        pageSize: 10,
        total: 0,
      })
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
          pageParams.value = {
            currentPage: 1,
            pageSize: 10,
            total: 0,
          }
        }
        let params: IProjectListAdmin = {
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
              let keyword = val.keyword.replace('；', ';')
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
        pageParams.value.currentPage = 1
        pageParams.value.pageSize = data.pageSize!
        getList()
      }

      return {
        updateNum,
        isEmpty,
        createDate,
        formatDate,
        beijing2utc,
        formatTimeStamp,
        searchParams,
        curItem,
        opType,
        showDelete,
        deleteText,
        projectList,
        loading,
        createProjectDialog,
        confirmDelete,
        deleteProjects,
        editProject,
        addProject,
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
      width: 70%;
      margin: 40px auto 0 auto;

      .project-manage-search-input {
        display: flex;

        input::-webkit-input-placeholder {

          /* WebKit browsers */
          font-family: AlibabaPuHuiTi-Regular, sans-serif;
          font-size: 18px;
          color: $mainColor14;
        }

        .el-input__inner {
          height: 52px;
          font-family: AlibabaPuHuiTi-Regular, sans-serif;
          font-size: 18px;
          line-height: 52px;
          color: $textColor4;
        }
      }

      .create-btn {
        margin: 38px 0;
      }
    }

    .project-manage-list {
        background-color: #fff;
        padding: 20px;
      width: 70%;
      margin: 0 auto;
    }
  }
</style>
