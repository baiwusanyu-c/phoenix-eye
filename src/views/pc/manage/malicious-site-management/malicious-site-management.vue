/* * @malicious-site-management.vue * @deprecated * @author czh * @update (czh 2022/5/7) */
<template>
  <div class="malicious-site-main eagle-page">
    <div class="malicious-site-search">
      <search-input
        :search-btn-name="$t('lang.searchT')"
        :placeholder="$t('lang.siteManage.searchP')"
        @search="handleSearch">
      </search-input>
      <be-button
        type="success"
        custom-class="eagle-btn create-btn"
        size="large"
        round="4"
        @click="openDialog('add')">
        {{ $t('lang.createProject.createProjectTitle') }}
      </be-button>
    </div>
    <div class="malicious-site-list eagle-table">
      <el-table :data="riskUrlList.data">
        <template #empty>
          <empty-data></empty-data>
        </template>
        <el-table-column prop="url">
          <template #header>
            <span class="table-head">{{ $t('lang.siteManage.tableHeader.url') }}</span>
          </template>
          <template #default="scope">
            <span>{{ scope.row.url }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="tag">
          <template #header>
            <span class="table-head">{{ $t('lang.siteManage.tableHeader.tag') }}</span>
          </template>
          <template #default="scope">
            <span>{{ isEmpty(scope.row.tag, '/') }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="source">
          <template #header>
            <span class="table-head">{{ $t('lang.siteManage.tableHeader.source') }}</span>
          </template>
          <template #default="scope">
            <span>{{ scope.row.source }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="create_time">
          <template #header>
            <span class="table-head">{{ $t('lang.siteManage.tableHeader.createTime') }}</span>
          </template>
          <template #default="scope">
            <date-cell :time="scope.row.create_time"></date-cell>
          </template>
        </el-table-column>
        <el-table-column prop="operation">
          <template #header>
            <span class="table-head">{{ $t('lang.siteManage.tableHeader.operation') }}</span>
          </template>
          <template #default="scope">
            <el-tooltip placement="top">
              <template #content>
                {{ $t('lang.delete') }}
              </template>
              <be-icon
                custom-class="table-icon"
                icon="iconDeleteEagle"
                width="24"
                height="24"
                @click="openDialog('delete', scope.row)"></be-icon>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <div class="table-page">
        <el-pagination
          v-model:currentPage="pageParams.currentPage"
          v-model:page-size="pageParams.pageSize"
          :page-sizes="[10, 20, 40, 80, 100]"
          layout="total, sizes, prev, pager, next"
          :total="pageParams.total"
          @size-change="updateNum"
          @current-change="pageChange" />
      </div>
    </div>
    <!--    新增、编辑项目弹窗 -->
    <add-site
      ref="createDialog"
      :type="opType"
      :project-id="curItem.project_id"
      :get-list="getList">
    </add-site>
    <!--    删除项目弹窗    -->
    <MsgDialog
      :header-title="$t('lang.delete')"
      :is-show="showDelete"
      :title="$t('lang.systemConfig.delete') + '?'"
      @confirm="confirmDelete"
      @close="() => (showDelete = false)">
    </MsgDialog>
  </div>
</template>

<script lang="ts">
  import { defineComponent, nextTick, onMounted, reactive, ref } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { BeButton, BeIcon } from '@eagle-eye/be-ui'
  import EmptyData from '../../../../components/common-components/empty-data/empty-data.vue'
  import MsgDialog from '../../../../components/common-components/msg-dialog/msg-dialog.vue'
  // @ts-ignore
  import composition from '../../../../utils/mixin/common-func'

  import compositionPage from '../../../../utils/mixin/page-param'
  import compositionDialog from '../../../../utils/mixin/dialog-func'

  import { deleteRiskUrl, getRiskUrl } from '../../../../api/malicious-site'
  import addSite from './components/add-site.vue'
  import type { IDelRiskUrl, IRiskUrl, IRiskUrlList } from '../../../../api/malicious-site'

  export default defineComponent({
    name: 'MaliciousSiteManagement',
    components: {
      EmptyData,

      addSite,
      MsgDialog,
      BeButton,
      BeIcon,
    },
    setup() {
      const { t } = useI18n()
      const { message, isEmpty } = composition()
      const { pageParams, resetPageParam, updatePageSize } = compositionPage()
      let { createCurItem, curItem, createDialog, opType, openDialog, showDelete } =
        compositionDialog()
      // 当前操作的项目对象
      curItem = createCurItem<IRiskUrl>({})
      // 列表示例
      const riskUrlList = reactive({
        data: [],
      })

      // loading
      const loading = ref<boolean>(false)
      onMounted(() => {
        getList('reset')
      })
      /**
       * 确认删除项目信息
       */
      const confirmDelete = () => {
        const params: IDelRiskUrl = {
          id: (curItem.value as IDelRiskUrl).id as string,
        }
        deleteRiskUrl(params)
          .then(res => {
            if (!res) {
              return
            }
            if (res) {
              message('success', `${t('lang.delete')} ${t('lang.success')}`)
              // 更新列表
              getList('reset')
              showDelete.value = false
            }
          })
          .catch(err => {
            message('error', err.message || err)
            console.error(err)
          })
      }

      /**
       * 获取项目列表
       */
      // 搜索参数
      const searchParams = ref<string>('')
      const handleSearch = (data: string): void => {
        searchParams.value = data
        nextTick(() => {
          resetPageParam()
          getList()
        })
      }
      /**
       * 获取项目列表
       * 重置：清空所有条件进行搜索
       * 翻页：带上所有现有条件搜索
       * 排序：只清空翻页搜索
       * 搜索：只清空翻页参数、排序参数，保留搜索参数，搜索
       */
      const getList = (type?: string) => {
        loading.value = true
        if (type === 'reset') {
          searchParams.value = ''
          resetPageParam()
        }
        const params: IRiskUrlList = {
          page_num: pageParams.value.currentPage,
          page_size: pageParams.value.pageSize,
          param: searchParams.value,
        }
        getRiskUrl(params)
          .then(res => {
            if (!res) {
              return
            }
            // 项目列表
            riskUrlList.data = res.data.page_infos
            pageParams.value.total = res.data.total
            // 關鍵詞字符串轉化為數組
            riskUrlList.data.forEach((val: any) => {
              val.tag = val.tag.join('')
            })
            loading.value = false
          })
          .catch(err => {
            message('error', err.message || err)
            console.error(err)
          })
      }
      /**
       * 分页方法
       * @param item 分页参数
       */
      const pageChange = (item: number): void => {
        pageParams.value.currentPage = item
        getList()
      }
      const updateNum = (data: number): void => {
        updatePageSize(data!, pageParams)
        getList()
      }

      return {
        handleSearch,
        updateNum,
        isEmpty,
        searchParams,
        curItem,
        opType,
        showDelete,
        riskUrlList,
        loading,
        createDialog,
        confirmDelete,
        openDialog,
        getList,
        pageParams,
        pageChange,
      }
    },
  })
</script>

<style lang="scss">
  .malicious-site-main {
    min-height: calc(100% - 100px);

    .malicious-site-search {
      @include common-container(40px);
    }

    .malicious-site-list {
      width: 70%;
      padding: 20px;
      margin: 0 auto;
      background-color: $mainColor7;
    }
  }
  /* 移动端预留 适配 */
  /* @media screen and (max-width: 1280px) {
    .malicious-site-main .malicious-site-list,
    .malicious-site-main .malicious-site-search {
      width: 92%;
    }
  }
  !* 150% 适配 *!
  @media screen and (min-width: 1280px) and (max-width: 1326px) {
    .malicious-site-main .malicious-site-list,
    .malicious-site-main .malicious-site-search {
      width: 92%;
    }
  }

  !* 125% 适配 *!
  @media screen and (min-width: 1328px) and (max-width: 1538px) {
    .malicious-site-main .malicious-site-list,
    .malicious-site-main .malicious-site-search {
      width: 80%;
    }
  }*/
</style>
