/* * @addr-monitor.vue * @deprecated 地址监控 * @author czh * @update (czh 2022/3/24) */
<template>
  <div class="addr-monitor-main eagle-page">
    <div class="addr-monitor-search">
      <div class="addr-monitor-search--input">
        <el-input
          v-model="searchParams"
          :placeholder="$t('lang.projectExplorer.searchP')"
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
    </div>
    <div class="project-search-result"></div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue'
  import { BeButton } from '../../../../public/be-ui/be-ui.es'
  // import { IProjParam } from '../../../api/project-explorer'
  // import { IPageParam } from '../../../utils/types'

  export default defineComponent({
    name: 'AddrMonitor',
    components: { BeButton },
    setup() {
      // 搜索参数
      const searchParams = ref<string>('')
      const loading = ref<boolean>(false)
      // 分页参数
      // const pageParams = ref<IPageParam>({
      //   currentPage: 1,
      //   pageSize: 10,
      //   total: 0,
      // })
      const getList = () => {
        loading.value = true
        // let params: IProjParam = {
        //   param: searchParams.value,
        // }
      }
      return {
        getList,
        searchParams,
      }
    },
  })
</script>

<style lang="scss">
  .addr-monitor-main {
    min-height: calc(100% - 100px);

    .subTitle {
      font-family: AlibabaPuHuiTi-Regular, sans-serif;
      font-size: 18px;
      font-weight: 400;
      color: $textColor12;
    }

    .item {
      font-family: AlibabaPuHuiTi-Medium, sans-serif;
      font-size: 14px;
      font-weight: bold;
      line-height: 22px;
      color: $lessColor3;
      word-break: break-all;
      cursor: pointer;
    }
  }

  .addr-monitor-search {
    width: 70%;
    margin: 40px auto 0 auto;
    text-align: center;

    .addr-monitor-search--input {
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
</style>
