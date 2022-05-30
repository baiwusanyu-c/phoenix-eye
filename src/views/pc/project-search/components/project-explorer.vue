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
      <el-input
        v-model="searchParams"
        :placeholder="$t('lang.projectExplorer.exp.searchP')"
        class="input-with-select">
        <template #append>
          <be-icon icon="search" @click="handleSearch"></be-icon>
        </template>
      </el-input>
    </div>
    <!--      TODO: Project Explorer Table         -->
    <div class="project-explorer--table eagle-table">
      <el-table
        ref="riskTrxList"
        v-loading="loading"
        tooltip-effect="light"
        :data="projectList"
        @row-click="routerSwitch">
        <template #empty>
          <empty-data content="lang.noRisk"></empty-data>
        </template>
        <el-table-column prop="project_name" :width="tableHeader('project_name')" align="center">
          <template #header>
            <span class="table-head">{{
              $t('lang.projectExplorer.exp.tableHeader.project_name')
            }}</span>
          </template>
          <template #default="scope">
            <project-name-cell :size="32" :name="scope.row.project_name" :url="scope.row.logo_url">
            </project-name-cell>
          </template>
        </el-table-column>

        <el-table-column
          prop="security_score"
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

        <el-table-column prop="tx_24" :width="tableHeader('tx_24')" align="center">
          <template #header>
            <span class="table-head">{{ $t('lang.projectExplorer.exp.tableHeader.tx_24') }}</span>
          </template>
          <template #default="scope">
            <span>{{
              isEmpty(scope.row.tx_24, '/') === '/' ? '/' : `${formatMoney(scope.row.tx_24)}`
            }}</span>
          </template>
        </el-table-column>

        <el-table-column prop="market_cap" :width="tableHeader('market_cap')" align="center">
          <template #header>
            <span class="table-head">{{
              $t('lang.projectExplorer.exp.tableHeader.market_cap')
            }}</span>
          </template>
          <template #default="scope">
            <span>{{
              isEmpty(scope.row.market_cap, '/') === '/'
                ? '/'
                : `$${formatMoney(scope.row.market_cap)}M`
            }}</span>
          </template>
        </el-table-column>

        <el-table-column prop="token_price" :width="tableHeader('token_price')" align="left">
          <template #header>
            <span class="table-head">{{
              $t('lang.projectExplorer.exp.tableHeader.token_price')
            }}</span>
          </template>
          <template #default="scope">
            <div style="display: flex; justify-content: center; align-items: center">
              <span>{{
                isEmpty(scope.row.token_price, '/') === '/'
                  ? '/'
                  : `$${formatMoney(scope.row.token_price)}M`
              }}</span>
              <line-cell
                :dom-id="`line-cell_${scope.row.project_id}`"
                :type="scope.row.token_price_up_down"
                :line-data="scope.row.token_price_history">
              </line-cell>
            </div>
          </template>
        </el-table-column>

        <el-table-column prop="create_time" :width="tableHeader('create_time')" align="center">
          <template #header>
            <span class="table-head">{{
              $t('lang.projectExplorer.exp.tableHeader.create_time')
            }}</span>
          </template>
          <template #default="scope">
            <span>{{ formatDate(createDate(scope.row.create_time), 'Y-m-d') }}</span>
          </template>
        </el-table-column>

        <el-table-column prop="platform" :width="tableHeader('platform')" align="left">
          <template #header>
            <span class="table-head">{{
              $t('lang.projectExplorer.exp.tableHeader.platform')
            }}</span>
          </template>
          <template #default="scope">
            <platform-cell :platform="scope.row.platform"></platform-cell>
          </template>
        </el-table-column>

        <el-table-column
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
        </el-table-column>
      </el-table>
      <div v-if="projectList.length > 0" class="table-page">
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
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, nextTick, onMounted, ref } from 'vue'
  import compositionPage from '../../../../utils/mixin/page-param'
  import composition from '../../../../utils/mixin/common-func'
  import { getExploreList } from '../../../../api/project-explorer'
  // @ts-ignore
  import { BeIcon, BePagination } from '../../../../../public/be-ui/be-ui.es'
  import { catchErr, createDate, formatDate, formatMoney } from '../../../../utils/common'
  import { platformListDict } from '../../../../utils/platform-dict'
  import ProjectNameCell from '../../../../components/common-components/project-name-cell/project-name-cell.vue'
  import LineCell from '../../../../components/common-components/line-cell/line-cell.vue'
  import explorerProj from '../../../../assets/image/pc/explorer-proj.png'
  import type { IOption, IPageParam, projListType } from '../../../../utils/types'
  import type { IProjParam } from '../../../../api/project-explorer'

  export default defineComponent({
    name: 'ProjectExplorer',
    components: {
      LineCell,
      ProjectNameCell,
      BeIcon,
      BePagination,
    },
    setup() {
      const { pageParams, resetPageParam, updatePageSize } = compositionPage()
      const { message, routerPush, isEmpty } = composition()
      /**
       * 获取项目列表
       */
      // 搜索参数
      const searchParams = ref<string>('')
      const selectValue = ref<string>('')
      const handleSearch = (): void => {
        nextTick(() => {
          getList('reset')
        })
      }
      const handleSelect = (): void => {
        searchParams.value = ''
        nextTick(() => {
          getList('reset')
        })
      }
      onMounted(() => {
        getList('reset')
      })
      // loading
      const loading = ref<boolean>(false)
      /**
       * 获取项目列表
       * 重置：清空所有条件进行搜索
       * 翻页：带上所有现有条件搜索
       * 排序：只清空翻页搜索
       * 搜索：只清空翻页参数、排序参数，保留搜索参数，搜索
       */
      const projectList = ref<Array<projListType>>([])
      const getList = (type?: string) => {
        if (type === 'reset') {
          resetPageParam(15)
        }
        loading.value = true
        const params: IProjParam = {
          param: searchParams.value,
          platform: selectValue.value,
          page_num: pageParams.value.currentPage,
          page_size: pageParams.value.pageSize,
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
        routerPush('/projectSearch/detail', { id: row.project_id })
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

      // const screenWidth = window.screen.width
      const tableHeader = computed(() => {
        const headerDict: IOption = {
          project_name: '',
          security_score: '110',
          tx_24: '70',
          market_cap: '120',
          token_price: '160',
          create_time: '80',
          platform: '70',
          audit_report_num: '100',
        }
        /* if (1280 <= screenWidth && 1326 <= screenWidth) {
                headerDict.risk_features = '320'
                headerDict.from_address = '140'
                headerDict.tx_hash = '140'
                headerDict.platform = '90'
            }*/
        return function (key: string) {
          return headerDict[key]
        }
      })
      return {
        tableHeader,
        selectValue,
        isEmpty,
        handleSearch,
        routerSwitch,
        projectList,
        searchParams,
        getList,
        formatMoney,
        pageParams,
        pageChange,
        updateNum,
        platformListDict,
        loading,
        handleSelect,
        createDate,
        formatDate,
        explorerProj,
      }
    },
  })
</script>

<style lang="scss">
  .project-explorer-tb--search {
    .title {
      display: flex;
      align-items: center;

      .el-select {
        width: 160px;
        .el-input__wrapper,
        .el-input.is-focus .el-input__wrapper {
          box-shadow: none !important;
        }
      }
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
    .table-head {
      font-size: 12px;
    }
    .el-table .cell {
      padding: 0 4px;
    }
  }
</style>
