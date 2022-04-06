/* * @risk-public-info.vue * @deprecated 公共风险舆情 * @author czh * @update (czh 2022/3/24) */
<template>
  <div class="risk-public-info-main eagle-page">
    <div class="risk-public-info-container">
      <div class="project-manage-search-input">
        <el-input
          v-model="searchParams"
          :placeholder="$t('lang.trxRetry.searchP')"
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
      <div class="risk-public-info-list eagle-table">
        <project-detail-public-opinion :info-data="list"> </project-detail-public-opinion>
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
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue'
  import { BeButton, BePagination } from '../../../../public/be-ui/be-ui.es'
  import ProjectDetailPublicOpinion from '../project-search/components/project-detail-public-opinion.vue'
  import { getPublicOpinionList } from '../../../api/risk-public-info'
  import type { IPageParam, ISafetyData } from '../../../utils/types'
  import type { IPOList } from '../../../api/risk-public-info'
  export default defineComponent({
    name: 'RiskPublicInfo',
    components: { ProjectDetailPublicOpinion, BeButton, BePagination },
    setup() {
      const searchParams = ref<string>('')
      const list = ref<Array<ISafetyData>>([])
      // 项目舆情安全分页参数
      const pageParams = ref<IPageParam>({
        currentPage: 1,
        pageSize: 5,
        total: 0,
      })
      /**
       * 获取列表数据
       */
      const getList = (): void => {
        const params: IPOList = {
          param: searchParams.value,
          page_num: pageParams.value.currentPage,
          page_size: pageParams.value.pageSize,
        }
        getPublicOpinionList(params).then((res: any) => {
          if (res.success) {
            list.value = res.data.page_infos
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
        })
      }
      const updateNum = (data: IPageParam): void => {
        pageParams.value.currentPage = 1
        pageParams.value.pageSize = data.pageSize!
        getList()
      }
      const pageChange = (item: IPageParam): void => {
        pageParams.value.currentPage = item.currentPage
        getList()
      }
      getList()
      return {
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
      font-family: AlibabaPuHuiTi-Regular, sans-serif;
      font-size: 18px;
      font-weight: 400;
      color: $textColor12;
    }
  }

  .risk-public-info-container {
    @include common-container(40px);
    text-align: center;

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
  }

  .risk-public-info-list {
    margin-top: 40px;
    text-align: left;
  }
</style>
