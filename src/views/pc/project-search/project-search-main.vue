/* * @project-search-main.vue * @deprecated 项目搜索 * @author czh * @update (czh 2022/2/22) */
<template>
  <div class="project-search-main eagle-page">
    <div class="project-search-container">
      <search-input
        :search-btn-name="$t('lang.searchT')"
        :placeholder="$t('lang.projectExplorer.searchP')"
        @search="handleSearch">
      </search-input>
    </div>
    <div class="project-search-result">
      <!--   示例     -->
      <div v-if="projectList.length === 0" class="project-search-eg">
        <p>{{ $t('lang.projectExplorer.example') }}</p>
        <p>
          {{ $t('lang.projectExplorer.project') }}:
          <span class="item ml-4" @click="handleDefaultSearch('AAVE')">AAVE</span>
        </p>
        <p>
          {{ $t('lang.projectExplorer.contract') }}:
          <span
            class="item ml-4"
            @click="handleDefaultSearch('0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9')">
            0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9
          </span>
        </p>
      </div>
      <div v-if="projectList.length > 1">
        <p class="subTitle">{{ $t('lang.projectExplorer.MultipleResults') }}:</p>
        <div style="margin-top: 18px" class="res">
          <div v-for="item in projectList" :key="item.project_id">
            <p class="subTitle" style="font-size: 12px">{{ $t('lang.projectExplorer.name') }}:</p>
            <p class="subTitle mt-4">
              <span class="item" style="font-size: 18px" @click="routerSwitch(item.project_id)">
                {{ item.project_name }}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, nextTick, onMounted, ref } from 'vue'
  import composition from '../../../utils/mixin/common-func'
  import { getProjectListUser } from '../../../api/project-explorer'
  import { getUrlkey } from '../../../utils/common'
  import type { IProjParam } from '../../../api/project-explorer'
  declare type projListType = {
    project_id: string
    project_name: string
  }
  export default defineComponent({
    name: 'ProjectSearchMain',
    setup() {
      const { message, routerPush } = composition()
      /**
       * 获取项目列表
       */
      // 搜索参数
      const searchParams = ref<string>('')
      const handleSearch = (data: string): void => {
        searchParams.value = data
        nextTick(() => {
          getList()
        })
      }
      // loading
      const loading = ref<boolean>(false)
      /**
       * 获取项目列表
       * 重置：清空所有条件进行搜索
       * 翻页：带上所有现有条件搜索
       * 排序：只清空翻页搜索
       * 搜索：只清空翻页参数、排序参数，保留搜索参数，搜索
       */
      const projectList = ref<Array<projListType>>([])
      const getList = () => {
        loading.value = true
        const params: IProjParam = {
          param: searchParams.value,
        }
        getProjectListUser(params)
          .then((res: any) => {
            if (!res) {
              return
            }
            if (res && res.data) {
              projectList.value = res.data
              // 大于一条则显示列表
              // 等于一条则直接跳转到项目态势详情
              if (projectList.value.length === 1) {
                routerSwitch(projectList.value[0].project_id)
              }
            } else {
              message('warning', res.message || res)
            }
            loading.value = false
          })
          .catch(err => {
            message('error', err.message || err)
            console.error(err)
            loading.value = false
          })
      }
      /**
       * 路由跳轉
       */
      const routerSwitch = (id: string): void => {
        routerPush('/projectSearch/detail', { id })
      }
      const handleDefaultSearch = (params: string): void => {
        searchParams.value = params
        getList()
      }

      const ProjIdByEmail = ref<number>(-1)
      const initPage = (): void => {
        const urlParams = getUrlkey()
        // 来自email 打开 且有登录
        if (urlParams.from === 'email' && urlParams.id) {
          ProjIdByEmail.value = urlParams.id
          // 直接去态势详情页面
          routerSwitch(ProjIdByEmail.value.toString())
        }
      }
      onMounted(() => {
        initPage()
      })
      return {
        handleSearch,
        handleDefaultSearch,
        routerSwitch,
        projectList,
        searchParams,
        getList,
      }
    },
  })
</script>

<style lang="scss">
  .project-search-main {
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

  .project-search-container {
    @include common-container(40px);
    text-align: center;
  }

  .project-search-result {
    @include common-container(32px);

    .project-search-eg {
      padding: 24px 24px 8px 24px;
      background-color: $mainColor7;
      border-radius: 4px;

      p {
        margin-bottom: 16px;
        font-family: AlibabaPuHuiTi-Medium, sans-serif;
        font-size: 14px;
        font-weight: bold;
        line-height: 22px;
        color: $textColor3;
      }
    }

    .res {
      display: grid;
      grid-template-columns: 1fr;
      grid-gap: 22px;

      div {
        box-sizing: border-box;
        padding: 20px;
        background-color: $mainColor7;
        border-radius: 4px;
      }
    }
  }
</style>
