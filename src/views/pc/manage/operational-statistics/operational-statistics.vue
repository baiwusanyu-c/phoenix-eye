/* * @operational-statistics.vue * @deprecated * @author czh * @update (czh 2022/5/7) */
<template>
  <div class="operational-statistics-main eagle-page">
    <div class="operational-statistics-title">
      <h2>{{ $t('lang.operationalStatistics.title') }}</h2>
      <span>{{ $t('lang.operationalStatistics.titleDesc') }}</span>
    </div>
    <div class="operational-statistics-chart">
      <div class="operational-statistics--chart">
        <span>{{ $t('lang.operationalStatistics.lineTitle') }}:</span>
        <chart-line :line-data="lineData"></chart-line>
      </div>
      <div class="operational-statistics--chart">
        <chart-pie :pie-data="pieData"></chart-pie>
      </div>
    </div>
    <div class="operational-statistics-search">
      <search-input
        :search-btn-name="$t('lang.searchT')"
        :placeholder="$t('lang.operationalStatistics.searchP')"
        @search="handleSearch">
      </search-input>
    </div>
    <div class="operational-statistics-list eagle-table">
      <el-table :data="ipLogList.data">
        <template #empty>
          <empty-data></empty-data>
        </template>
        <el-table-column prop="ip_address">
          <template #header>
            <span class="table-head">{{
              $t('lang.operationalStatistics.tableHeader.IPAddress')
            }}</span>
          </template>
          <template #default="scope">
            <span>{{ scope.row.ip_address }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="belong_info">
          <template #header>
            <span class="table-head">{{
              $t('lang.operationalStatistics.tableHeader.IPAttribution')
            }}</span>
          </template>
          <template #default="scope">
            <span>{{ scope.row.belong_info }}</span>
          </template>
        </el-table-column>

        <el-table-column prop="create_time">
          <template #header>
            <span class="table-head">{{
              $t('lang.operationalStatistics.tableHeader.accessTime')
            }}</span>
          </template>
          <template #default="scope">
            <date-cell :time="scope.row.create_time"></date-cell>
          </template>
        </el-table-column>
        <el-table-column prop="module">
          <template #header>
            <span class="table-head">{{
              $t('lang.operationalStatistics.tableHeader.accessModule')
            }}</span>
          </template>
          <template #default="scope">
            <span>{{ scope.row.module }}</span>
          </template>
        </el-table-column>
      </el-table>
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
  </div>
</template>

<script lang="ts">
  import { defineComponent, nextTick, onMounted, reactive, ref } from 'vue'
  import compositionPage from '../../../../utils/mixin/page-param'
  import composition from '../../../../utils/mixin/common-func'
  import { getIpStatistics, getLogList } from '../../../../api/operational-statistics'

  import ChartLine from './components/chart-line.vue'
  import ChartPie from './components/chart-pie.vue'
  import type { ILogParam } from '../../../../api/operational-statistics'
  import type { IPageParam, IStatisticsLine, IStatisticsPie } from '../../../../utils/types'

  export default defineComponent({
    name: 'OperationalStatistics',
    components: { ChartPie, ChartLine },
    setup() {
      const { message, isEmpty } = composition()
      const { pageParams, resetPageParam, updatePageSize } = compositionPage()
      const ipLogList = reactive({
        data: [],
      })
      const searchParams = ref<string>('')
      /**
       * 搜索方法
       * @param data
       */
      const handleSearch = (data: string): void => {
        searchParams.value = data
        nextTick(() => {
          resetPageParam()
          getList()
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
      // loading
      const loading = ref<boolean>(false)
      onMounted(() => {
        getList('reset')
        getChartData()
      })
      /**
       * 获取列表数据
       * @param type
       */
      const getList = (type?: string) => {
        loading.value = true
        if (type === 'reset') {
          searchParams.value = ''
          resetPageParam()
        }
        const params: ILogParam = {
          page_num: pageParams.value.currentPage,
          page_size: pageParams.value.pageSize,
          ip_address: searchParams.value.trim(),
        }
        getLogList(params)
          .then(res => {
            if (!res) {
              return
            }
            // log列表
            ipLogList.data = res.data.page_infos
            pageParams.value.total = res.data.total
            loading.value = false
          })
          .catch(err => {
            loading.value = false
            message('error', err.message || err)
            console.error(err)
          })
      }
      /**
       * 获取图标数据
       */
      const lineData = ref<Array<IStatisticsLine>>()
      const pieData = ref<Array<IStatisticsPie>>()
      const getChartData = (): void => {
        getIpStatistics()
          .then(res => {
            if (!res) {
              return
            }
            lineData.value = res.data.history_stat
            pieData.value = res.data.country_stat
          })
          .catch(err => {
            message('error', err.message || err)
            console.error(err)
          })
      }
      return {
        handleSearch,
        updateNum,
        isEmpty,
        searchParams,
        ipLogList,
        loading,
        getList,
        pageParams,
        pageChange,
        lineData,
        pieData,
      }
    },
  })
</script>

<style lang="scss">
  .operational-statistics-main {
    min-height: calc(100% - 100px);

    .operational-statistics-title,
    .operational-statistics-chart,
    .operational-statistics-search {
      @include common-container(40px);
    }

    .operational-statistics-title {
      display: flex;
      align-items: end;

      h2 {
        margin-right: 12px;
        line-height: 1;
      }

      span {
        font-size: 14px;
        font-weight: 400;
        color: $textColor12;
        line-height: 1.3;
      }
    }

    .operational-statistics-list {
      width: 70%;
      padding: 20px;
      margin: 36px auto 0 auto;
      background-color: $mainColor7;
    }

    .operational-statistics-chart {
      padding: 20px;
      height: 400px;
      display: flex;
      box-sizing: border-box;
      background-color: $mainColor7;
    }

    .operational-statistics--chart {
      flex: 1;
    }
  }
  /* 移动端预留 适配 */
  @media screen and (max-width: 1280px) {
    .operational-statistics-main .operational-statistics-list,
    .operational-statistics-main .operational-statistics-chart,
    .operational-statistics-main .operational-statistics-title,
    .operational-statistics-main .operational-statistics-search {
      width: 92%;
    }
  }
  /* 150% 适配 */
  @media screen and (min-width: 1280px) and (max-width: 1326px) {
    .operational-statistics-main .operational-statistics-list,
    .operational-statistics-main .operational-statistics-chart,
    .operational-statistics-main .operational-statistics-title,
    .operational-statistics-main .operational-statistics-search {
      width: 92%;
    }
  }

  /* 125% 适配 */
  @media screen and (min-width: 1328px) and (max-width: 1538px) {
    .operational-statistics-main .operational-statistics-list,
    .operational-statistics-main .operational-statistics-chart,
    .operational-statistics-main .operational-statistics-title,
    .operational-statistics-main .operational-statistics-search {
      width: 80%;
    }
  }
</style>
