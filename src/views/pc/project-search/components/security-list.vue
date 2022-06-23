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
  <div style="float: right; margin-top: 20px">
    <el-pagination
      v-model:currentPage="pageParams.currentPage"
      v-model:page-size="pageParams.pageSize"
      :page-sizes="[10, 15, 20, 40, 80, 100]"
      layout="prev, pager, next"
      :total="pageParams.total"
      @current-change="pageChange" />
  </div>
</template>

<script lang="ts">
  import { defineComponent, onMounted, ref, watch } from 'vue'
  import compositionPage from '../../../../utils/mixin/page-param'
  import { getPublicOpinionList } from '../../../../api/risk-public-info'
  import { catchErr } from '../../../../utils/common'
  // @ts-ignore

  import SecurityCard from './security-card.vue'
  import type { IRiskInfoList } from '../../../../utils/types'
  import type { IPOList } from '../../../../api/risk-public-info'
  import type { IAxiosRes } from '../../../../utils/request'
  export default defineComponent({
    name: 'SecurityList',
    components: {
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
      watch(
        () => props.param,
        () => {
          resetPageParam(4, pageParams)
          getRiskInfo()
        }
      )
      const { pageParams, resetPageParam } = compositionPage()
      resetPageParam(4, pageParams)
      const riskInfoList = ref<Array<IRiskInfoList>>([])
      const getRiskInfo = (): void => {
        const params: IPOList = {
          project_id: props.param,
          page_num: pageParams.value.currentPage,
          page_size: pageParams.value.pageSize,
        }
        emit('show', false)
        getPublicOpinionList(params)
          .then((res: IAxiosRes) => {
            if (res && res.success) {
              riskInfoList.value = res.data.page_infos
              pageParams.value.total = res.data.total
              if (riskInfoList.value.length > 0) {
                emit('show', true)
              }
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
      const pageChange = (item: number): void => {
        pageParams.value.currentPage = item
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
    @include common-container(32px, 67.2%);
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
    .security-card:last-child {
      margin-right: 0;
    }
  }
  /* 移动端预留 适配 */
  /*@media screen and (max-width: 1280px) {
    .project-search-main .project-risk--container {
      width: 92%;
    }
  }
  !* 150% 适配 *!
  @media screen and (min-width: 1280px) and (max-width: 1326px) {
    .project-search-main .project-risk--container {
      width: 92%;
    }
  }

  !* 125% 适配 *!
  @media screen and (min-width: 1328px) and (max-width: 1538px) {
    .project-search-main .project-risk--container {
      width: 80%;
    }
  }

  !* 110% 适配 *!
  @media screen and (min-width: 1540px) and (max-width: 1750px) {
    .project-search-main .project-risk--container {
      width: 72%;
    }
  }*/
</style>
