/* * @security-incident.vue * @deprecated * @author czh * @update (czh 2022/5/9) */
<template>
  <div class="security-incident-main eagle-page">
    <div class="security-incident-search">
      <search-input
        :search-btn-name="$t('lang.searchT')"
        :placeholder="$t('lang.securityIncident.searchP')"
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
    <div class="security-incident-list eagle-table">
      <el-table v-loading="loading" :data="incidentList.data">
        <template #empty>
          <empty-data></empty-data>
        </template>
        <el-table-column prop="project" width="180">
          <template #header>
            <span class="table-head">{{ $t('lang.securityIncident.tableHeader.project') }}</span>
          </template>
          <template #default="scope">
            <ellipsis-copy
              :target-str="scope.row.project"
              :is-ellipsis="scope.row.project.length > 8 ? true : false"
              :is-show-copy-btn="false"
              :is-tooltip="true"
              styles="color: black;font-weight: bold;font-size: 16px;"
              font-length="8"
              end-length="0">
            </ellipsis-copy>
          </template>
        </el-table-column>
        <el-table-column prop="attack_type" width="180">
          <template #header>
            <span class="table-head">{{ $t('lang.securityIncident.tableHeader.attackType') }}</span>
          </template>
          <template #default="scope">
            <ellipsis-copy
              :target-str="scope.row.attack_type"
              :is-ellipsis="
                scope.row.attack_type && scope.row.attack_type.length >= 14 ? true : false
              "
              :is-show-copy-btn="false"
              :is-tooltip="true"
              styles="color: black;font-weight: 400;font-size: 14px;"
              font-length="8"
              end-length="0">
            </ellipsis-copy>
          </template>
        </el-table-column>
        <el-table-column prop="loss_amount">
          <template #header>
            <span class="table-head">{{ $t('lang.securityIncident.tableHeader.amount') }}</span>
          </template>
          <template #default="scope">
            {{ isEmpty(scope.row.loss_amount, '/') === '/' ? '/' : `$ ${scope.row.loss_amount}` }}
          </template>
        </el-table-column>
        <el-table-column prop="event_link">
          <template #header>
            <span class="table-head">{{ $t('lang.securityIncident.tableHeader.link') }}</span>
          </template>
          <template #default="scope">
            <ellipsis-copy
              :target-str="scope.row.event_link"
              :is-ellipsis="scope.row.event_link.length > 16 ? true : false"
              :is-show-copy-btn="false"
              :is-tooltip="true"
              styles="color:#008EE9;font-weight: bold;font-size: 16px;cursor:pointer"
              font-length="8"
              end-length="0"
              @click="openWindow(`${scope.row.event_link}`)">
            </ellipsis-copy>
          </template>
        </el-table-column>
        <el-table-column prop="attack_address_arr">
          <template #header>
            <span class="table-head">{{ $t('lang.securityIncident.tableHeader.attackAddr') }}</span>
          </template>
          <template #default="scope">
            <ellipsis-copy
              v-for="item in scope.row.attack_address_arr"
              :key="item + 'attack_address_arr'"
              :target-str="item"
              :is-ellipsis="item.length > 25 ? true : false"
              :is-show-copy-btn="false"
              :is-tooltip="true"
              font-length="8"
              end-length="8">
            </ellipsis-copy>
          </template>
        </el-table-column>
        <el-table-column prop="attacked_address_arr">
          <template #header>
            <span class="table-head">{{
              $t('lang.securityIncident.tableHeader.attackedAddr')
            }}</span>
          </template>
          <template #default="scope">
            <ellipsis-copy
              v-for="item in scope.row.attacked_address_arr"
              :key="item + 'attacked_address_arr'"
              :target-str="item"
              :is-ellipsis="item.length > 25 ? true : false"
              :is-show-copy-btn="false"
              :is-tooltip="true"
              font-length="8"
              end-length="8">
            </ellipsis-copy>
          </template>
        </el-table-column>
        <el-table-column prop="attack_trx_arr">
          <template #header>
            <span class="table-head">{{
              $t('lang.securityIncident.tableHeader.attackedTrx')
            }}</span>
          </template>
          <template #default="scope">
            <ellipsis-copy
              v-for="item in scope.row.attack_trx_arr"
              :key="item + 'attack_trx_arr'"
              :target-str="item"
              :is-ellipsis="item.length > 25 ? true : false"
              :is-show-copy-btn="false"
              :is-tooltip="true"
              styles="color:#008EE9;font-weight: bold;font-size: 16px;cursor:pointer"
              font-length="8"
              end-length="8"
              @click="openWindow(`${item}`)">
            </ellipsis-copy>
          </template>
        </el-table-column>
        <el-table-column prop="operation">
          <template #header>
            <span class="table-head">{{ $t('lang.securityIncident.tableHeader.operation') }}</span>
          </template>
          <template #default="scope">
            <el-tooltip placement="top">
              <template #content>
                {{ $t('lang.edit') }}
              </template>
              <be-icon
                custom-class="table-icon"
                icon="iconEditEagle"
                width="24"
                height="24"
                @click="openDialog('edit', scope.row)"></be-icon>
            </el-tooltip>
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
    <add-site ref="createDialog" :type="opType" :cur-item="curItem" :get-list="getList"> </add-site>
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
  import EllipsisCopy from '../../../../components/common-components/ellipsis-copy/ellipsis-copy.vue'
  import compositionPage from '../../../../utils/mixin/page-param'
  import compositionDialog from '../../../../utils/mixin/dialog-func'
  import { openWindow } from '../../../../utils/common'
  import { deleteIncidentInfo, getIncidentList } from '../../../../api/security-incident'
  import addSite from './components/add-incident.vue'
  import type { IPageParam } from '../../../../utils/types'
  import type { IIncident, IIncidentList } from '../../../../api/security-incident'
  export default defineComponent({
    name: 'SecurityIncident',
    components: {
      EmptyData,
      EllipsisCopy,
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
      curItem = createCurItem<IIncident>({})
      // 项目列表示例
      const incidentList = reactive({
        data: [],
      })
      // loading
      const loading = ref<boolean>(false)
      onMounted(() => {
        getList('reset')
      })
      /**
       * 确认删除
       */
      const confirmDelete = () => {
        deleteIncidentInfo(curItem.value.event_id as string)
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
       * 获取列表
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
        const params: IIncidentList = {
          page_num: pageParams.value.currentPage,
          page_size: pageParams.value.pageSize,
          param: searchParams.value,
        }
        getIncidentList(params)
          .then(res => {
            if (!res) {
              return
            }
            // 项目列表
            incidentList.data = res.data.page_infos
            pageParams.value.total = res.data.total
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
      const pageChange = (item: IPageParam): void => {
        pageParams.value.currentPage = item.currentPage
        getList()
      }
      const updateNum = (data: IPageParam): void => {
        updatePageSize(data.pageSize!, pageParams)
        getList()
      }

      return {
        openWindow,
        handleSearch,
        updateNum,
        isEmpty,
        searchParams,
        curItem,
        opType,
        showDelete,
        incidentList,
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
  .security-incident-main {
    min-height: calc(100% - 100px);

    .security-incident-search {
      @include common-container(40px, 80%);
    }

    .security-incident-list {
      width: 80%;
      padding: 20px;
      margin: 0 auto;
      background-color: $mainColor7;
    }
  }
  /* 移动端预留 适配 */
  @media screen and (max-width: 1280px) {
    .security-incident-main .security-incident-list,
    .security-incident-main .security-incident-search {
      width: 92%;
    }
  }
  /* 150% 适配 */
  @media screen and (min-width: 1280px) and (max-width: 1326px) {
    .security-incident-main .security-incident-list,
    .security-incident-main .security-incident-search {
      width: 92%;
    }
  }

  /* 125% 适配 */
  @media screen and (min-width: 1328px) and (max-width: 1538px) {
    .security-incident-main .security-incident-list,
    .security-incident-main .security-incident-search {
      width: 80%;
    }
  }
</style>
