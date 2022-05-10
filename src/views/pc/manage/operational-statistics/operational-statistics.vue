/* * @operational-statistics.vue * @deprecated * @author czh * @update (czh 2022/5/7) */
<template>
  <div class="operational-statistics-main eagle-page">
    <div class="operational-statistics-title">
      <h2>访问量</h2>
      <span>统计访问本系统的IP</span>
    </div>
    <div class="operational-statistics-chart"></div>
    <div class="operational-statistics-search">
      <search-input
        :search-btn-name="$t('lang.searchT')"
        :placeholder="$t('lang.operationalStatistics.searchP')"
        @search="handleSearch">
      </search-input>
    </div>
    <div class="operational-statistics-list eagle-table">
      <el-table :data="projectList.data">
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
  import { defineComponent, nextTick, onMounted, reactive, ref } from 'vue'
  import { useI18n } from 'vue-i18n'
  import compositionPage from '../../../../utils/mixin/page-param'
  import composition from '../../../../utils/mixin/common-func'
  import { getLogList } from '../../../../api/operational-statistics'
  import { BePagination } from '../../../../../public/be-ui/be-ui.es.js'
  import type { IPageParam } from '../../../../utils/types'
  import type { ILogParam } from '../../../../api/operational-statistics'
  // @ts-ignore
  export default defineComponent({
    name: 'OperationalStatistics',
    components: { BePagination },
    setup() {
      const { t } = useI18n()
      const { message, isEmpty } = composition()
      const { pageParams, resetPageParam, updatePageSize } = compositionPage()
      const projectList = reactive({
        data: [],
      })
      const searchParams = ref<string>('')
      const handleSearch = (data: string): void => {
        searchParams.value = data
        nextTick(() => {
          getList()
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
      // loading
      const loading = ref<boolean>(false)
      onMounted(() => {
        getList('reset')
      })
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
            projectList.data = res.data.page_infos
            pageParams.value.total = res.data.total
            loading.value = false
          })
          .catch(err => {
            loading.value = false
            message('error', err.message || err)
            console.error(err)
          })
      }
      return {
        handleSearch,
        updateNum,
        isEmpty,
        searchParams,
        projectList,
        loading,
        getList,
        pageParams,
        pageChange,
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
        margin-right: 6px;
      }
      span {
        font-size: 14px;
        font-weight: 400;
        color: $textColor12;
        line-height: 1.8;
      }
    }
    .operational-statistics-list {
      width: 70%;
      padding: 20px;
      margin: 36px auto 0 auto;
      background-color: $mainColor7;
    }
  }
  /* 150% 适配 */
  @media screen and (min-width: 1280px) and (max-width: 1326px) {
    .operational-statistics-main .operational-statistics-list,
    .operational-statistics-main .operational-statistics-search {
      width: 92%;
    }
  }

  /* 125% 适配 */
  @media screen and (min-width: 1328px) and (max-width: 1538px) {
    .operational-statistics-main .operational-statistics-list,
    .operational-statistics-main .operational-statistics-search {
      width: 80%;
    }
  }
</style>
