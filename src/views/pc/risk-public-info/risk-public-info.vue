/* * @risk-public-info.vue * @deprecated 公共风险舆情 * @author czh * @update (czh 2022/3/24) */
<template>
  <div class="risk-public-info-main eagle-page">
    <div class="risk-public-info-container">
      <search-input
        :search-btn-name="$t('lang.searchT')"
        :placeholder="$t('lang.riskPublicInfo.searchP')"
        @search="handleSearch">
      </search-input>
      <div v-loading="loading" class="risk-public-info-list eagle-table">
        <empty-data v-if="list.length === 0"></empty-data>
        <project-detail-public-opinion :info-data="list"> </project-detail-public-opinion>
        <div v-if="list.length > 0" class="table-page">
          <el-pagination
            v-model:currentPage="pageParams.currentPage"
            v-model:page-size="pageParams.pageSize"
            :page-sizes="[5, 10, 20, 40, 80, 100]"
            layout="total, sizes, prev, pager, next"
            :total="pageParams.total"
            @size-change="updateNum"
            @current-change="pageChange" />
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent, nextTick, ref } from 'vue'

  import ProjectDetailPublicOpinion from '../project-search/components/project-detail-public-opinion.vue'
  import { getPublicOpinionList } from '../../../api/risk-public-info'
  import composition from '../../../utils/mixin/common-func'
  import compositionPage from '../../../utils/mixin/page-param'
  import type { ISafetyData } from '../../../utils/types'
  import type { IPOList } from '../../../api/risk-public-info'
  export default defineComponent({
    name: 'RiskPublicInfo',
    components: { ProjectDetailPublicOpinion },
    setup() {
      const { message } = composition()
      const { pageParams, resetPageParam, updatePageSize } = compositionPage()
      const searchParams = ref<string>('')
      const handleSearch = (data: string): void => {
        searchParams.value = data
        nextTick(() => {
          getList('reset')
        })
      }
      const list = ref<Array<ISafetyData>>([])
      const loading = ref<boolean>(false)
      /**
       * 获取列表数据
       */
      const getList = (type?: string): void => {
        if (type === 'reset') {
          resetPageParam(5)
        }
        const params: IPOList = {
          param: searchParams.value,
          page_num: pageParams.value.currentPage,
          page_size: pageParams.value.pageSize,
        }
        list.value = []
        loading.value = true
        getPublicOpinionList(params)
          .then((res: any) => {
            if (res && res.success) {
              res.data.page_infos.forEach((value: any) => {
                list.value.push({
                  negativeMsg: '经自动识别，该资讯为负面信息',
                  sourceUrl: value.url,
                  title: value.title,
                  message: value.content,
                  from: value.source,
                  time: value.pub_time,
                  label: value.tag,
                })
              })
              pageParams.value.total = res.data.total
            }
            loading.value = false
          })
          .catch(err => {
            loading.value = false
            message('error', err.message || err)
            console.error(err)
          })
      }
      const updateNum = (data: number): void => {
        updatePageSize(data!, pageParams)
        getList()
      }
      const pageChange = (item: number): void => {
        pageParams.value.currentPage = item
        getList()
      }
      getList('reset')
      return {
        handleSearch,
        loading,
        pageChange,
        updateNum,
        pageParams,
        list,
        getList,
        searchParams,
      }
    },
  })
</script>

<style lang="scss">
  .risk-public-info-main {
    min-height: calc(100% - 100px);

    .subTitle {
      font-family: 'Barlow', sans-serif;
      font-size: 18px;
      font-weight: 400;
      color: $textColor12;
    }
  }

  .risk-public-info-container {
    @include common-container(40px);
    text-align: center;
    background-color: $mainColor7;
    border-radius: 4px;
    padding: 32px 22px;
    box-sizing: border-box;
  }

  .risk-public-info-list {
    margin-top: 40px;
    text-align: left;
  }
  /* 移动端预留 适配 */
  @media screen and (max-width: 1280px) {
    .risk-public-info-container {
      width: 92%;
    }
  }
  /* 150% 适配 */
  @media screen and (min-width: 1280px) and (max-width: 1326px) {
    .risk-public-info-container {
      width: 92%;
    }
  }
  /*
  !* 125% 适配 *!
  @media screen and (min-width: 1328px) and (max-width: 1538px) {
    .risk-public-info-container {
      width: 80%;
    }
  }*/
</style>
