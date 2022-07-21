/* * @project-explorer.vue * @deprecated * @author czh * @update (czh 2022/5/23) */
<template>
  <div class="project-explorer-tb--body">
    <!--      TODO: Project Explorer Filter & Search         -->
    <div class="project-explorer-tb--search">
      <div class="title">
        <title-cell :name="$t('lang.projectExplorer.exp.title')" :url="explorerProj"> </title-cell>
        <el-select v-model="selectValue" @change="handleSelect">
          <template #prefix>
            <img alt="beosin-select" src="../../../../assets/image/pc/select-all.png" />
          </template>

          <el-option label="All Chains" value=""></el-option>
          <el-option
            v-for="item in platformListDict"
            :key="item.id"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div style="display: flex; align-items: center">
        <remote-search
          :remote-search="getProjectUser"
          custom-list-class="remote-search-custom-list"
          @select="handleProjectSelect">
          <template #option="slotProps">
            <div class="remote-search-item">
              <el-avatar :size="32" :src="slotProps.item.logo_url" fit="cover">
                <img src="../../../../assets/image/pc/empty-avt.png" />
              </el-avatar>
              <span class="item-project-name">
                {{ slotProps.item.project_name }}
                <span class="project-platform">
                  {{ platformToCurrency[slotProps.item.platform] }}
                </span>
              </span>
            </div>
          </template>
          <template #listFooter>
            <div id="create_one_body" class="create-one--body">
              <span>{{ $t('lang.createProject.notFound') }}?</span>
              <div role="button" class="create-one eagle-btn" @click="openDialog()">
                {{ $t('lang.createProject.createOne') }}
              </div>
            </div>
          </template>
          <template #next>
            <div class="project-select-remote--btn">
              <be-icon icon="iconSearchEagle" color="#fff"></be-icon>
            </div>
          </template>
        </remote-search>
      </div>
    </div>
    <div class="project-explorer--table eagle-table">
      <el-table
        ref="riskTrxList"
        v-loading="loading"
        tooltip-effect="light"
        :data="projectList"
        @sort-change="handleSort"
        @row-click="routerSwitch">
        <template #empty>
          <empty-data content="lang.emptyData"></empty-data>
        </template>
        <el-table-column
          prop="project_name"
          :width="tableHeader('project_name')"
          align="left"
          fixed>
          <template #header>
            <span class="table-head">{{
              $t('lang.projectExplorer.exp.tableHeader.project_name')
            }}</span>
          </template>
          <template #default="scope">
            <project-name-cell
              :size="32"
              width="180"
              :name="scope.row.project_name"
              :url="scope.row.logo_url"
              :font-len="16"
              :ellipsis-len="20">
            </project-name-cell>
          </template>
        </el-table-column>

        <el-table-column
          prop="security_score"
          sortable="custom"
          :sort-orders="['ascending', 'descending']"
          :width="tableHeader('security_score')"
          align="center">
          <template #header>
            <span class="table-head">{{
              $t('lang.projectExplorer.exp.tableHeader.security_score')
            }}</span>
          </template>
          <template #default="scope">
            <div style="display: flex; justify-content: center">
              <score-cell :score="scope.row.security_score"></score-cell>
            </div>
          </template>
        </el-table-column>

        <el-table-column
          sortable="custom"
          :sort-orders="['ascending', 'descending']"
          prop="tx_24"
          :width="tableHeader('tx_24')"
          align="center">
          <template #header>
            <span class="table-head">{{ $t('lang.projectExplorer.exp.tableHeader.tx_24') }}</span>
          </template>
          <template #default="scope">
            <el-tooltip :content="scope.row.tx_24" placement="top" effect="light">
              <span>{{
                isEmpty(scope.row.tx_24, '/') === '/' ? '/' : `${nFormats(scope.row.tx_24)}`
              }}</span>
            </el-tooltip>
          </template>
        </el-table-column>

        <el-table-column
          sortable="custom"
          :sort-orders="['ascending', 'descending']"
          prop="market_cap"
          :width="tableHeader('market_cap')"
          align="center">
          <template #header>
            <span class="table-head">{{
              $t('lang.projectExplorer.exp.tableHeader.market_cap')
            }}</span>
          </template>
          <template #default="scope">
            <el-tooltip :content="scope.row.market_cap" placement="top" effect="light">
              <span>{{
                isEmpty(scope.row.market_cap, '/') === '/'
                  ? '/'
                  : `$${nFormats(scope.row.market_cap)}`
              }}</span>
            </el-tooltip>
          </template>
        </el-table-column>

        <el-table-column
          sortable="custom"
          :sort-orders="['ascending', 'descending']"
          prop="token_price"
          :width="tableHeader('token_price')"
          align="left">
          <template #header>
            <span class="table-head">{{
              $t('lang.projectExplorer.exp.tableHeader.token_price')
            }}</span>
          </template>
          <template #default="scope">
            <div style="display: flex; justify-content: space-between; align-items: center">
              <el-tooltip :content="scope.row.token_price" placement="top" effect="light">
                <span>{{
                  isEmpty(scope.row.token_price, '/') === '/'
                    ? '/'
                    : `$${nFormats(scope.row.token_price)}`
                }}</span>
              </el-tooltip>
              <line-cell
                :dom-id="`line-cell_${scope.row.project_id}`"
                :type="scope.row.token_price_up_down"
                :line-data="scope.row.token_price_history">
              </line-cell>
            </div>
          </template>
        </el-table-column>

        <el-table-column
          sortable="custom"
          :sort-orders="['ascending', 'descending']"
          prop="create_time"
          :width="tableHeader('create_time')"
          align="center">
          <template #header>
            <span class="table-head">{{
              $t('lang.projectExplorer.exp.tableHeader.create_time')
            }}</span>
          </template>
          <template #default="scope">
            <span>{{ formatDate(createDate(scope.row.create_time), 'Y-m-d') }}</span>
          </template>
        </el-table-column>

        <el-table-column prop="platform" :width="tableHeader('platform')" align="center">
          <template #header>
            <span class="table-head">{{
              $t('lang.projectExplorer.exp.tableHeader.platform')
            }}</span>
          </template>
          <template #default="scope">
            <platform-cell :platform="scope.row.platform" :show-platform="false"></platform-cell>
          </template>
        </el-table-column>

        <!--        <el-table-column
          prop="audit_report_num"
          :width="tableHeader('audit_report_num')"
          align="center">
          <template #header>
            <span class="table-head">{{
              $t('lang.projectExplorer.exp.tableHeader.audit_report_num')
            }}</span>
          </template>
          <template #default="scope">
            <div style="display: flex; justify-content: center">
              <img
                v-if="scope.row.audit_report_num > 0"
                alt="beosin-audit"
                src="../../../../assets/image/pc/audit-c.png" />
              <img
                v-if="scope.row.audit_report_num === 0"
                alt="beosin-audit"
                src="../../../../assets/image/pc/audit.png" />
            </div>
          </template>
        </el-table-column>-->
      </el-table>
      <div v-if="projectList.length > 0" class="table-page">
        <el-pagination
          v-model:currentPage="pageParams.currentPage"
          v-model:page-size="pageParams.pageSize"
          :page-sizes="[10, 15, 20, 40, 80, 100]"
          layout="total, sizes, prev, pager, next"
          :total="pageParams.total"
          @size-change="updateNum"
          @current-change="pageChange" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, getCurrentInstance, nextTick, onMounted, ref } from 'vue'
  import { BeIcon } from '@eagle-eye/be-ui'
  import { useEventBus } from '@vueuse/core'
  import compositionPage from '../../../../utils/mixin/page-param'
  import composition from '../../../../utils/mixin/common-func'
  import { getExploreList, getProjectListCurUser } from '../../../../api/project-explorer'
  // @ts-ignore
  import { catchErr, createDate, formatDate, nFormats } from '../../../../utils/common'
  import { platformListDict, platformToCurrency } from '../../../../utils/platform-dict'
  import ProjectNameCell from '../../../../components/common-components/project-name-cell/project-name-cell.vue'
  import LineCell from '../../../../components/common-components/line-cell/line-cell.vue'
  import explorerProj from '../../../../assets/image/pc/explorer-proj.png'
  import type { IOption, ISort, projListType } from '../../../../utils/types'
  import type { IProjParam } from '../../../../api/project-explorer'
  import type { ElTable } from 'element-plus'
  export default defineComponent({
    name: 'ProjectExplorer',
    components: {
      LineCell,
      ProjectNameCell,
      BeIcon,
    },
    setup() {
      const { pageParams, resetPageParam, updatePageSize } = compositionPage()
      const { message, routerPush, isEmpty } = composition()
      /**
       * 获取项目列表
       */
      // 搜索参数
      const selectValue = ref<string>('')
      const curInst = getCurrentInstance()
      const handleSelect = (): void => {
        nextTick(() => {
          ;(curInst?.refs.riskTrxList as typeof ElTable).clearSort()
          sortParams.value = {}
          getList('reset')
        })
      }
      onMounted(() => {
        resetPageParam(15)
        getList('reset')
      })
      // loading
      const loading = ref<boolean>(false)
      /**
       * 获取项目列表
       * 重置：清空所有条件进行搜索
       * 翻页：带上所有现有条件搜索
       * 排序：只清空翻页搜索，保留分页尺寸pageSize
       * 搜索：只清空翻页参数、排序参数，保留搜索参数，搜索
       */
      const projectList = ref<Array<projListType>>([])
      const getList = (type?: string) => {
        if (type === 'reset') {
          const currentPageSize = pageParams.value.pageSize
          resetPageParam(currentPageSize === 15 ? 15 : currentPageSize)
        }
        loading.value = true
        const params: IProjParam = {
          param: '',
          platform: selectValue.value,
          page_num: pageParams.value.currentPage,
          page_size: pageParams.value.pageSize,
          ...sortParams.value,
        }
        getExploreList(params)
          .then((res: any) => {
            if (!res) {
              return
            }
            if (res && res.success) {
              projectList.value = res.data.page_infos
              pageParams.value.total = res.data.total
            } else {
              message('warning', res.message || res)
            }
          })
          .catch(catchErr)
          .finally(() => (loading.value = false))
      }

      /**
       * 路由跳轉
       */
      const routerSwitch = (row: any): void => {
        routerPush('/detail', { id: row.project_id, keyword: row.keyword })
      }
      /**
       * 分页方法
       * @param item 分页参数
       */
      const pageChange = (item: number): void => {
        pageParams.value.currentPage = item
        getList()
      }
      const updateNum = (item: number): void => {
        updatePageSize(item!, pageParams)
        getList()
      }

      // const screenWidth = window.screen.width
      const tableHeader = computed(() => {
        const headerDict: IOption = {
          //project_name: '160',
          project_name: '180',
          security_score: '60',
          tx_24: '70',
          market_cap: '120',
          token_price: '160',
          create_time: '80',
          platform: '40',
          audit_report_num: '100',
        }
        return function (key: string) {
          return headerDict[key]
        }
      })

      /****************************** 项目选择相关 ******************************/
      // 获取用户项目下拉列表
      const searchProjectList = ref<Array<IOption>>([])
      const selectVal = ref<string>('')
      const getProjectUser = (params: string, cb: Function): void => {
        getProjectListCurUser({ param: params })
          .then(res => {
            if (!res.data) {
              searchProjectList.value = []
            } else {
              res.data.forEach((val: any) => {
                val.project_id = val.project_id.toString()
              })
              searchProjectList.value = res.data
            }
            cb(searchProjectList.value)
          })
          .catch(err => {
            cb([])
            message('error', err.message || err)
          })
      }
      const handleProjectSelect = (data: IOption): void => {
        routerPush('/detail', { id: data.project_id })
      }
      const busCreateProjectUser = useEventBus<string>('openCreateProjectUser')
      const openDialog = (): void => {
        busCreateProjectUser.emit()
      }

      const sortParams = ref<ISort>({})
      const handleSort = (column: any): void => {
        const sortType = column.order === 'ascending' ? 'asc' : 'desc'
        sortParams.value = { sort_field: column.prop, sort_type: sortType }
        getList('reset')
      }
      return {
        handleSort,
        openDialog,
        platformToCurrency,
        handleProjectSelect,
        getProjectUser,
        selectVal,
        searchProjectList,
        tableHeader,
        selectValue,
        isEmpty,
        routerSwitch,
        projectList,
        getList,
        pageParams,
        pageChange,
        updateNum,
        platformListDict,
        loading,
        handleSelect,
        createDate,
        formatDate,
        explorerProj,
        nFormats,
      }
    },
  })
</script>

<style lang="scss">
  .project-explorer-tb--search {
    .remote-search-input {
      height: 32px;
      border: none;
    }
    .project-select-remote--btn {
      height: 32px;
    }
    .title {
      display: flex;
      align-items: center;
    }
    .el-select.is-focus .el-input__wrapper {
      border: 0;
      box-shadow: none !important;
    }
    .el-select .el-input__wrapper.is-focus {
      border: 0;
      box-shadow: none !important;
    }
    .el-select {
      width: 160px;
      .el-input__wrapper,
      .el-input.is-focus .el-input__wrapper {
        box-shadow: none !important;
      }
    }
    .el-input__wrapper,
    .el-input.is-focus .el-input__wrapper {
      box-shadow: none !important;
    }
    .el-input-group {
      width: 330px;
      .el-input__wrapper {
        box-shadow: none;
        border-radius: 2px;
      }
      .el-input-group__append {
        border: 0;
        background-color: $mainColor3;
        box-shadow: none;
        width: 46px;
        padding: 0;
      }
      .be-icon--container {
        use {
          fill: $mainColor7;
        }
      }
    }
  }
  .project-explorer--table {
    margin-top: 16px;
    padding: 16px;
    box-sizing: border-box;
    .el-table__row {
      cursor: pointer;
    }
    .table-head {
      font-size: 12px;
    }
    .el-table .cell {
      padding: 0 4px;
    }
  }
</style>
