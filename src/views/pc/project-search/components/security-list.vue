/* * @security-list.vue * @deprecated * @author czh * @update (czh 2022/5/25) */
<template>
  <div class="project-risk--card">
    <security-card
      v-for="item in riskInfoList"
      :key="item.content"
      :source-url="item.url"
      :title="item.title"
      :info="item.content"
      :create-time="item.pub_time"
      :source-name="item.source"
      :tag-list="item.tag">
    </security-card>
  </div>
  <div style="float: right">
    <be-pagination
      is-ordianry
      :page-size="pageParams.pageSize"
      :page-count="pageParams.total"
      :current-page="pageParams.currentPage"
      :page-num="[{ label: 10 }, { label: 20 }, { label: 40 }, { label: 80 }, { label: 100 }]"
      :pager-show-count="5"
      page-unit="page"
      :layout="['prev', 'page']"
      @change-page="pageChange">
      <template #prev> </template>
    </be-pagination>
  </div>
</template>

<script lang="ts">
  import { defineComponent, onMounted, ref } from 'vue'
  import compositionPage from '../../../../utils/mixin/page-param'
  import { getPublicOpinionList } from '../../../../api/risk-public-info'
  import { catchErr } from '../../../../utils/common'
  // @ts-ignore
  import { BePagination } from '../../../../../public/be-ui/be-ui.es'
  import SecurityCard from './security-card.vue'
  import type { IPageParam, IRiskInfoList } from '../../../../utils/types'
  import type { IPOList } from '../../../../api/risk-public-info'
  import type { IAxiosRes } from '../../../../utils/request'
  export default defineComponent({
    name: 'SecurityList',
    components: {
      BePagination,
      SecurityCard,
    },
    props: {
      param: {
        type: String,
        default: '',
      },
    },
    emits: ['show'],
    setup(props, { emit }) {
      const { pageParams, resetPageParam } = compositionPage()
      resetPageParam(4, pageParams)
      const riskInfoList = ref<Array<IRiskInfoList>>([])
      const getRiskInfo = (): void => {
        const params: IPOList = {
          param: props.param,
          page_num: pageParams.value.currentPage,
          page_size: pageParams.value.pageSize,
        }
        emit('show', false)
        getPublicOpinionList(params)
          .then((res: IAxiosRes) => {
            if (res.success) {
              riskInfoList.value = res.data.page_infos
              pageParams.value.total = res.data.total
              emit('show', true)
            } else {
              catchErr(res)
            }
          })
          .catch(catchErr)
      }
      /**
       * 分页方法
       * @param item 分页参数
       */
      const pageChange = (item: IPageParam): void => {
        pageParams.value.currentPage = item.currentPage
        getRiskInfo()
      }
      onMounted(() => {
        getRiskInfo()
      })
      return {
        pageChange,
        pageParams,
        resetPageParam,
        riskInfoList,
      }
    },
  })
</script>

<style lang="scss">
  .project-risk--container {
    @include common-container(32px, 65.2%);
    text-align: center;
    min-height: 480px;
    height: auto;

    .project-risk--search {
      height: 60px;
    }
  }
  .project-risk--card {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
  }
  /* 150% 适配 */
  @media screen and (min-width: 1280px) and (max-width: 1326px) {
    .project-search-main .project-risk--container {
      width: 92%;
    }
  }

  /* 125% 适配 */
  @media screen and (min-width: 1328px) and (max-width: 1538px) {
    .project-search-main .project-risk--container {
      width: 80%;
    }
  }
</style>
