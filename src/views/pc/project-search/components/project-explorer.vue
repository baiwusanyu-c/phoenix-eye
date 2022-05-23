/* * @project-explorer.vue * @deprecated * @author czh * @update (czh 2022/5/23) */
<template>
  <div class="project-explorer-tb--body">
    <!--      TODO: Project Explorer Filter & Search         -->
    <div class="project-explorer-tb--search">
      <div class="title">
        <title-cell
          :name="$t('lang.projectExplorer.exp.title')"
          url="../src/assets/image/pc/add-proj.png">
        </title-cell>
        <div class="select">
          <img alt="beosin-select" src="../../../../assets/image/pc/select-all.png" />
          <el-select v-model="selectValue">
            <el-option label="All Chains" value="all"></el-option>
            <el-option
              v-for="item in platformListDict"
              :key="item.id"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <el-input v-model="searchParams" placeholder="请输入内容" class="input-with-select">
        <template #append>
          <be-icon icon="search"></be-icon>
        </template>
      </el-input>
    </div>
    <!--      TODO: Project Explorer Table         -->
    <div class="project-explorer--table eagle-table">
      <el-table ref="riskTrxList" v-loading="loading" tooltip-effect="light" :data="projectList">
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
            <project-name-cell size="24" :name="scope.row.project_name" :url="scope.row.logo_url">
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

        <el-table-column prop="trx_24" :width="tableHeader('trx_24')" align="center">
          <template #header>
            <span class="table-head">{{ $t('lang.projectExplorer.exp.tableHeader.trx_24') }}</span>
          </template>
          <template #default="scope">
            <span>{{
              isEmpty(scope.row.trx_24, '/') === '/' ? '/' : `${formatMoney(scope.row.market_cap)}`
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
            <span>{{ scope.row.create_time }}</span>
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
  import { computed, defineComponent, nextTick, ref } from 'vue'
  import compositionPage from '../../../../utils/mixin/page-param'
  import composition from '../../../../utils/mixin/common-func'
  import { getProjectListUser } from '../../../../api/project-explorer'
  // @ts-ignore
  import { BeIcon, BePagination } from '../../../../../public/be-ui/be-ui.es'
  import { formatMoney } from '../../../../utils/common'
  import { platformListDict } from '../../../../utils/platform-dict'
  import ProjectNameCell from '../../../../components/common-components/project-name-cell/project-name-cell.vue'
  import LineCell from '../../../../components/common-components/line-cell/line-cell.vue'
  import type { IOption, IPageParam } from '../../../../utils/types'
  import type { IProjParam } from '../../../../api/project-explorer'

  declare type projListType = {
    project_id?: string
    project_name?: string
    logo_url?: string
    platform?: string
    trx_24?: string
    market_cap?: number
    token_price?: number
    security_score?: string
    token_price_history?: Array<{ token_price: number; create_time: string }>
    create_time?: string
    audit_report_num?: number
  }
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
      const selectValue = ref<string>('all')
      const handleSearch = (data: string): void => {
        searchParams.value = data
        nextTick(() => {
          getList('reset')
        })
      }
      // loading
      const loading = ref<boolean>(false)
      /**
       * 获取项目列表
       * 重置：清空所有条件进行搜索
       * 翻页：带上所有现有条件搜索
       * 排序：只清空翻页搜索
       * 搜索：只清空翻页参数、排序参数，保留搜索参数，搜索
       */
      const projectList = ref<Array<projListType>>([
        {
          project_name: 'Projectname',
          project_id: 'dqwdasda',
          logo_url: 'https://avatars.githubusercontent.com/u/32354856?v=4',
          trx_24: '1234',
          platform: 'eth',
          security_score: '76',
          audit_report_num: 3,
          market_cap: 3234,
          token_price: 4234,
          token_price_history: [
            { token_price: 2034, create_time: '2020-11-11' },
            { token_price: 340, create_time: '2020-11-10' },
            { token_price: 234, create_time: '2020-11-09' },
            { token_price: 1114, create_time: '2020-11-08' },
            { token_price: 424, create_time: '2020-11-07' },
            { token_price: 434, create_time: '2020-11-06' },
            { token_price: 434, create_time: '2020-11-05' },
          ],
          create_time: '2020-11-11',
        },
        {
          project_name: 'Projectname',
          logo_url: 'https://avatars.githubusercontent.com/u/32354856?v=4',
          trx_24: '1234',
          project_id: 'dqwadawddasda',
          platform: 'eth',
          security_score: '76',
          audit_report_num: 0,
          market_cap: 3234,
          token_price: 4234,
          token_price_history: [
            { token_price: 2034, create_time: '2020-11-11' },
            { token_price: 340, create_time: '2020-11-10' },
            { token_price: 234, create_time: '2020-11-09' },
            { token_price: 1114, create_time: '2020-11-08' },
            { token_price: 424, create_time: '2020-11-07' },
            { token_price: 434, create_time: '2020-11-06' },
            { token_price: 434, create_time: '2020-11-05' },
          ],
          create_time: '2020-11-11',
        },
      ])
      const getList = (type?: string) => {
        if (type === 'reset') {
          resetPageParam(15)
        }
        loading.value = true
        const params: IProjParam = {
          param: searchParams.value,
        }
        getProjectListUser(params)
          .then((res: any) => {
            if (!res) {
              return
            }
            if (res && res.data) {
              projectList.value = res.data
              // 大于一条则显示列表
              // 等于一条则直接跳转到项目态势详情
              if (projectList.value.length === 1) {
                routerSwitch(projectList.value[0].project_id)
              }
            } else {
              message('warning', res.message || res)
            }
            loading.value = false
          })
          .catch(err => {
            message('error', err.message || err)
            console.error(err)
            loading.value = false
          })
      }

      /**
       * 路由跳轉
       */
      const routerSwitch = (id: string): void => {
        routerPush('/projectSearch/detail', { id })
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

      const screenWidth = window.screen.width
      const tableHeader = computed(() => {
        const headerDict: IOption = {
          project_name: '',
          security_score: '110',
          trx_24: '70',
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
      }
    },
  })
</script>

<style lang="scss">
  .project-explorer-tb--search {
    .title {
      display: flex;
      align-items: center;
      .select {
        display: flex;
        align-items: center;
        margin-left: 20px;
        background-color: $mainColor7;
        border-radius: 2px;
        padding: 0 6px;
        box-sizing: border-box;
      }
      .el-select {
        width: 120px;
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
