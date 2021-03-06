/* * @risk-alert-item.vue * @deprecated * @author czh * @update (czh 2022/5/24) */
<template>
  <el-table
    v-loading="loading"
    tooltip-effect="light"
    :data="currentPageData"
    row-class-name="risk-alert-row"
    @row-click="routerSwitch">
    <template #empty>
      <empty-data content="lang.noRisk"></empty-data>
    </template>
    <el-table-column align="center" width="40">
      <template #header></template>
      <template #default="scope">
        <span class="tx24">{{ scope.row.index }}</span>
      </template>
    </el-table-column>
    <el-table-column prop="project_name" align="center" width="200">
      <template #header></template>
      <template #default="scope">
        <project-name-cell
          :size="32"
          :name="scope.row.project_name"
          :url="scope.row.logo_url"
          :font-len="16"
          width="160"
          :ellipsis-len="20">
        </project-name-cell>
      </template>
    </el-table-column>

    <el-table-column prop="project_name" align="center" width="45">
      <template #header></template>
      <template #default="scope">
        <div style="display: flex; justify-content: center">
          <score-cell :score="scope.row.security_score"></score-cell>
        </div>
      </template>
    </el-table-column>

    <el-table-column prop="project_name" align="right">
      <template #header></template>
      <template #default="scope">
        <el-tooltip :content="scope.row.tx_24" placement="top" effect="light">
          <span class="tx24">
            {{ isEmpty(scope.row.tx_24, '/') === '/' ? '/' : `${nFormats(scope.row.tx_24)}` }}
          </span>
        </el-tooltip>
        <span class="trx">Tx<span>/24</span></span>
      </template>
    </el-table-column>
  </el-table>
  <div class="front-page">
    <div class="front-page--body">
      <span>{{ currentPage }} / {{ pageNum }}</span>
      <div class="page-btn-group">
        <div class="page-btn" @click="prevPage">◀</div>
        <div class="page-btn" @click="nextPage">▶</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, watch } from 'vue'
  import { nFormats } from '../../../../utils/common'
  import composition from '../../../../utils/mixin/common-func'
  import type { PropType } from 'vue'
  import type { IHotProjectList } from '../../../../utils/types'

  export default defineComponent({
    name: 'HotProjectItem',
    components: {},
    props: {
      dataList: {
        type: Array as PropType<Array<IHotProjectList>>,
        default: () => [],
      },
    },
    setup(props) {
      const { isEmpty, routerPush } = composition()
      const pageNum = ref<number>(0)
      const pageSize = 5
      const currentPage = ref<number>(1)
      const currentPageData = ref<Array<string>>([])
      // 分页切片
      const sliceList: Map<any, any> = new Map()
      const createData = (val: any): void => {
        pageNum.value = Math.ceil(val?.length / pageSize)
        for (let i = 1; i <= pageNum.value; i++) {
          const slice: Array<IHotProjectList> = val.slice((i - 1) * pageSize, i * pageSize)
          sliceList.set(i, slice)
        }
      }
      const loading = ref<boolean>(false)
      watch(
        () => {
          return props.dataList
        },
        nVal => {
          loading.value = true
          createData(nVal)
          currentPageData.value = sliceList.get(currentPage.value)
          loading.value = false
        },
        { immediate: true }
      )
      const nextPage = (): void => {
        currentPage.value++
        if (currentPage.value > pageNum.value) {
          currentPage.value = pageNum.value
        }
        currentPageData.value = sliceList.get(currentPage.value)
      }
      const prevPage = (): void => {
        currentPage.value--
        if (currentPage.value < 1) {
          currentPage.value = 1
        }
        currentPageData.value = sliceList.get(currentPage.value)
      }
      /**
       * 路由跳轉
       */
      const routerSwitch = (row: any): void => {
        routerPush('/detail', { id: row.project_id, keyword: row.keyword })
      }
      return {
        routerSwitch,
        currentPageData,
        currentPage,
        pageNum,
        prevPage,
        nextPage,
        loading,
        isEmpty,
        nFormats,
      }
    },
  })
</script>

<style lang="scss">
  .hot-project {
    .tx24 {
      font-size: 14px;
      font-family: 'Barlow', sans-serif;
      font-weight: bold;
      color: $textColor3;
      line-height: 18px;
      margin-right: 6px;
    }
    .trx {
      font-size: 12px;
      font-family: 'Barlow', sans-serif;
      font-weight: bold;
      color: $textColor3;
      line-height: 12px;
      span {
        font-weight: 400;
      }
    }
    .risk-alert-row {
      height: 64px;
      cursor: pointer;
    }
    .el-table .cell {
      padding: 0 12px 0 0;
    }
    .el-table__header-wrapper {
      display: none;
    }
  }
  /* 移动端预留 适配 */
  @media screen and (max-width: 1280px) {
    .hot-project {
      .el-table .cell {
        padding: 0 6px 0 0;
      }
      .tx24 {
        font-size: 12px;
      }
    }
  }
  @media screen and (min-width: 1280px) and (max-width: 1326px) {
    .hot-project {
      .el-table .cell {
        padding: 0 6px 0 0;
      }
      .tx24 {
        font-size: 12px;
      }
    }
  }
</style>
