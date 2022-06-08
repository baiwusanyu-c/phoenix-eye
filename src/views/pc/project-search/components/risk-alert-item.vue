/* * @risk-alert-item.vue * @deprecated * @author czh * @update (czh 2022/5/24) */
<template>
  <div style="height: calc(100% - 112px)">
    <div v-for="item in currentPageData" :key="item" class="project-alert--item">
      <img alt="" src="../../../../assets/image/pc/alert-logo.png" />
      <ellipsis-copy
        :target-str="`🔥🔥${item.replace(/[\r\n]/g, '')}`"
        :is-show-copy-btn="false"
        custom-class="detail-item--ellipsis"
        :is-ellipsis="item.length > 40"
        styles="font-weight: 500"
        font-length="80"
        :is-tooltip="false"
        end-length="0">
      </ellipsis-copy>
    </div>
  </div>
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
  import type { PropType } from 'vue'

  export default defineComponent({
    name: 'RiskAlertItem',
    components: { EllipsisCopy },
    props: {
      dataList: {
        type: Array as PropType<Array<string>>,
        default: () => [],
      },
    },
    setup(props) {
      const pageNum = ref<number>(0)
      const pageSize = 3
      const currentPage = ref<number>(1)
      const currentPageData = ref<Array<string>>([])
      // 分页切片
      const sliceList: Map<any, any> = new Map()
      const createData = (val: any): void => {
        pageNum.value = Math.ceil(val?.length / pageSize)
        for (let i = 1; i <= pageNum.value; i++) {
          const slice: Array<string> = val.slice((i - 1) * pageSize, i * pageSize)
          sliceList.set(i, slice)
        }
      }
      watch(
        () => {
          return props.dataList
        },
        nVal => {
          createData(nVal)
          currentPageData.value = sliceList.get(currentPage.value)
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
      }
    },
  })
</script>

<style lang="scss">
  .project-alert--item {
    display: flex;
    align-items: center;
    padding: 16px;
    box-sizing: border-box;
    border-radius: 4px;
    margin-top: 10px;
    text-align: left;
    &:hover {
      background-color: $mainColor22;
    }
    img {
      width: 64px;
      height: 64px;
      margin-right: 12px;
    }
    p {
      font-size: 16px;
      font-family: BarlowSemi-B, sans-serif;
      font-weight: bold;
      color: $textColor3;
      line-height: 24px;
    }
    .el-tooltip__trigger {
      word-break: break-all;
    }
  }
  /* 移动端预留 适配 */
  @media screen and (max-width: 1280px) {
    .project-alert--item {
      padding: 10px;
    }
  }
  @media screen and (min-width: 1280px) and (max-width: 1326px) {
    .project-alert--item {
      padding: 10px;
    }
  }
  /* 125% 适配 */
  @media screen and (min-width: 1328px) and (max-width: 1538px) {
    .project-alert--item {
      padding: 10px;
    }
  }
</style>
