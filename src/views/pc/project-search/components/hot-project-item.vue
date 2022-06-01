/* * @risk-alert-item.vue * @deprecated * @author czh * @update (czh 2022/5/24) */
<template>
  <el-table
    v-loading="loading"
    tooltip-effect="light"
    :data="currentPageData"
    row-class-name="risk-alert-row">
    <template #empty>
      <empty-data content="lang.noRisk"></empty-data>
    </template>
    <el-table-column align="center" width="48">
      <template #header></template>
      <template #default="scope">
        <span class="tx24">{{ scope.row.index }}</span>
      </template>
    </el-table-column>
    <el-table-column prop="project_name" align="center">
      <template #header></template>
      <template #default="scope">
        <project-name-cell
          :size="32"
          :name="scope.row.project_name"
          :url="scope.row.logo_url"
          :ellipsis-len="10">
        </project-name-cell>
      </template>
    </el-table-column>

    <el-table-column prop="project_name" align="center" width="50">
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
        <span class="tx24">
          {{ isEmpty(scope.row.tx_24, '/') === '/' ? '/' : `${formatMoney(scope.row.tx_24)}` }}
        </span>
        <span class="trx">trx<span>/24</span></span>
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
  import EllipsisCopy from '../../../../components/common-components/ellipsis-copy/ellipsis-copy.vue'
  import { formatMoney } from '../../../../utils/common'
  import composition from '../../../../utils/mixin/common-func'
  import type { PropType } from 'vue'
  import type { IHotProjectList } from '../../../../utils/types'

  export default defineComponent({
    name: 'HotProjectItem',
    components: { EllipsisCopy },
    props: {
      dataList: {
        type: Array as PropType<Array<IHotProjectList>>,
        default: () => [],
      },
    },
    setup(props) {
      const { isEmpty } = composition()
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
      return {
        currentPageData,
        currentPage,
        pageNum,
        prevPage,
        nextPage,
        loading,
        isEmpty,
        formatMoney,
      }
    },
  })
</script>

<style lang="scss">
  .hot-project {
    .tx24 {
      font-size: 14px;
      font-family: BarlowSemi-B, sans-serif;
      font-weight: bold;
      color: $textColor3;
      line-height: 18px;
      margin-right: 6px;
    }
    .trx {
      font-size: 12px;
      font-family: BarlowSemi-B, sans-serif;
      font-weight: bold;
      color: $textColor3;
      line-height: 12px;
      span {
        font-weight: 400;
      }
    }
    .risk-alert-row {
      height: 64px;
    }
    .el-table__header-wrapper {
      display: none;
    }
  }
</style>
