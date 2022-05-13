/* * @addr-monitor.vue * @deprecated 地址监控 * @author czh * @update (czh 2022/3/24) */
<template>
  <div class="addr-monitor-main eagle-page">
    <div class="addr-monitor-search">
      <search-input
        :search-btn-name="$t('lang.searchT')"
        :placeholder="$t('lang.addrMonitor.searchP')"
        @search="handleSearch">
      </search-input>
      <be-button
        type="success"
        custom-class="eagle-btn create-btn"
        size="large"
        prev-icon="add"
        round="4"
        @click="openDialog('add')">
        {{ $t('lang.addrMonitor.create') }}
      </be-button>
    </div>
    <div class="addr-monitor-result eagle-table">
      <el-table v-loading="loading" :data="addrMonitorList" tooltip-effect="light">
        <template #empty>
          <empty-data></empty-data>
        </template>
        <el-table-column prop="address">
          <template #header>
            <span class="table-head">{{ $t('lang.addrMonitor.tableHeader.addr') }}</span>
          </template>
          <template #default="scope">
            <el-tooltip placement="top" effect="light" class="address" :content="scope.row.address">
              <span class="table--info">{{ scope.row.address }}</span>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="today_transfer_num" show-overflow-tooltip width="100">
          <template #header>
            <span class="table-head"></span>
          </template>
          <template #default="scope">
            <div style="display: flex; justify-content: center; align-items: center">
              <be-button
                v-if="scope.row.today_transfer_num > 0"
                round="4"
                type="default"
                bordered
                custom-class="ring-btn"
                prev-icon="iconRingEagle"
                size="mini">
                {{ scope.row.today_transfer_num }}
              </be-button>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="remark">
          <template #header>
            <span class="table-head">{{ $t('lang.addrMonitor.tableHeader.remark') }}</span>
          </template>
          <template #default="scope">
            <el-tooltip
              placement="top"
              effect="light"
              popper-class="addr-monitor-main--address"
              :content="scope.row.remark">
              <span class="table--info">{{ scope.row.remark }}</span>
            </el-tooltip>
            <!--            <span class="table&#45;&#45;info">{{ scope.row.remark }}</span>-->
          </template>
        </el-table-column>
        <el-table-column prop="create_time" width="120">
          <template #header>
            <span class="table-head">{{ $t('lang.createProject.tableHeader.createTime') }}</span>
          </template>
          <template #default="scope">
            <date-cell :time="scope.row.create_time"></date-cell>
          </template>
        </el-table-column>
        <el-table-column prop="event_link">
          <template #header>
            <span class="table-head">{{ $t('lang.addrMonitor.tableHeader.link') }}</span>
          </template>
          <template #default="scope">
            <el-tooltip
              placement="top"
              effect="light"
              popper-class="addr-monitor-main--address"
              :content="scope.row.event_link">
              <a :href="scope.row.event_link" target="_blank" class="table--link">{{
                scope.row.event_link
              }}</a>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="operation" width="120">
          <template #header>
            <span class="table-head">{{ $t('lang.addrMonitor.tableHeader.operate') }}</span>
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
        <el-table-column width="50" label=" " align="center">
          <template #default="scope">
            <div class="more-btn">
              <be-icon
                icon="more"
                width="20"
                height="21"
                @click="handleSearch(scope.row.address)"></be-icon>
            </div>
          </template>
        </el-table-column>
      </el-table>
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
    <!--    删除弹窗    -->
    <MsgDialog
      :header-title="$t('lang.delete')"
      :is-show="showDelete"
      :title="$t('lang.systemConfig.delete') + '?'"
      @confirm="confirmDelete"
      @close="() => (showDelete = false)">
    </MsgDialog>
    <!--    创建、 编辑弹窗    -->
    <create-addr-monitor ref="createDialog" :type="opType" :get-list="getList" :cur-item="curItem">
    </create-addr-monitor>
  </div>
</template>

<script lang="ts">
  import { defineComponent, nextTick, onMounted, ref } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { useEventBus } from '@vueuse/core'
  // @ts-ignore
  import { BeButton, BeIcon, BePagination } from '../../../../public/be-ui/be-ui.es.js'
  import { catchErr, getStore, getUrlkey, openWindow, setStore } from '../../../utils/common'
  import composition from '../../../utils/mixin/common-func'
  import MsgDialog from '../../../components/common-components/msg-dialog/msg-dialog.vue'
  import EmptyData from '../../../components/common-components/empty-data/empty-data.vue'
  import {
    deleteAddressMonitor,
    getAddressMonitorInfo,
    getAddressMonitorList,
  } from '../../../api/addr-monitor'
  import compositionPage from '../../../utils/mixin/page-param'
  import compositionDialog from '../../../utils/mixin/dialog-func'
  import createAddrMonitor from './components/create-addr-monitor.vue'
  import type { IAddrMonitorSearch } from '../../../api/addr-monitor'
  import type { IAddrMonitor, IAddrMonitorForm, IOption, IPageParam } from '../../../utils/types'

  export default defineComponent({
    name: 'AddrMonitor',
    components: {
      EmptyData,
      BeButton,
      BeIcon,
      BePagination,
      MsgDialog,
      createAddrMonitor,
    },
    setup() {
      const { t } = useI18n()
      const { message } = composition()
      const { pageParams, resetPageParam, updatePageSize } = compositionPage()
      let { createCurItem, curItem, createDialog, opType, openDialog, showDelete } =
        compositionDialog()
      // 当前操作的项目对象（给curItem响应式化）
      curItem = createCurItem<IAddrMonitor>({})

      // 搜索参数
      const searchParams = ref<string>('')
      const handleSearch = (data: string): void => {
        searchParams.value = data
        nextTick(() => {
          getBaseInfo()
        })
      }
      /**
       * 获取基本信息数据
       */
      const getBaseInfo = (): void => {
        const params: IAddrMonitorSearch = {
          address: searchParams.value,
        }
        getAddressMonitorInfo(params)
          .then((res: any) => {
            if (!res) {
              return
            }
            if (res && res.code === '0000' && res.data) {
              let resObj: IOption = {}
              const resCache = getStore('addressMonitor')
              if (resCache) {
                resObj = JSON.parse(resCache)
              }
              resObj[searchParams.value] = res.data
              setStore('addressMonitor', JSON.stringify(resObj))
              openDetail(searchParams.value)
            } else {
              console.error(res)
              message('warning', t('lang.emptyData'))
            }
          })
          .catch(catchErr)
      }

      const loading = ref<boolean>(false)

      const addrMonitorList = ref<Array<IAddrMonitor>>([])
      /**
       * 获取列表
       */
      const getList = (type?: string) => {
        if (type === 'reset') {
          resetPageParam()
        }
        const params: IPageParam = {
          page_num: pageParams.value.currentPage,
          page_size: pageParams.value.pageSize,
        }
        loading.value = true
        getAddressMonitorList(params)
          .then(res => {
            if (!res) {
              return
            }
            if (res) {
              addrMonitorList.value = res.data.page_infos
              pageParams.value.total = res.data.total
            }
          })
          .catch((err: any) => {
            message('error', err.message || err)
            console.error(err)
          })
          .finally(() => (loading.value = false))
      }
      /**
       * 分页方法
       * @param item 分页参数
       */
      const pageChange = (item: IPageParam): void => {
        pageParams.value.currentPage = item.currentPage
        getList()
      }
      /**
       * 修改分页显示数量
       * @param data
       */
      const updateNum = (data: IPageParam): void => {
        updatePageSize(data.pageSize!, pageParams)
        getList()
      }
      /**
       * 确认删除
       */
      const confirmDelete = () => {
        const params: IAddrMonitorForm = {
          address_monitor_id: (curItem.value as IAddrMonitorForm).id as string,
        }
        deleteAddressMonitor(params)
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
          .catch((err: any) => {
            message('error', err.message || err)
            console.error(err)
          })
      }
      /**
       * 打開詳情页
       */
      const openDetail = (params: string) => {
        openWindow(`#/addressMonitor/detail?address=${params}`, params)
      }
      /**
       * 处理email打开
       */
      const busLogin = useEventBus<string>('openLogin')
      const initPage = (): void => {
        const urlParams = getUrlkey()
        // 来自email 打开
        if (urlParams.from === 'email' && urlParams.address) {
          // 如果没登录就通知显示登录
          const isLogin = !!getStore('token')
          if (!isLogin) {
            // 开启登录窗口
            busLogin.emit()
            return
          }
          // 直接去态势详情页面
          handleSearch(urlParams.address)
        }
        getList()
      }
      onMounted(() => {
        initPage()
      })
      return {
        loading,
        curItem,
        opType,
        createDialog,
        showDelete,
        confirmDelete,
        openDetail,
        openDialog,
        addrMonitorList,
        pageChange,
        updateNum,
        pageParams,
        getList,
        handleSearch,
        searchParams,
      }
    },
  })
</script>

<style lang="scss">
  .addr-monitor-main--address {
    width: 300px;
  }

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
    @include common-container(40px);
    text-align: center;
  }

  .addr-monitor-result {
    @include common-container(32px);
    padding: 20px;
    box-sizing: border-box;
    background-color: $mainColor7;
    border-radius: 4px;

    .ring-btn {
      padding: 0 4px;
      border-color: $mainColor19;
      color: $mainColor19;

      &:hover {
        background-color: transparent;
      }

      .be-button-prevIcon {
        .be-icon {
          width: 12px;
          height: 12px;
        }
      }
    }

    .table--info {
      max-width: 300px;
      display: block;
      font-size: 14px;
      font-family: AlibabaPuHuiTi-Regular, sans-serif;
      font-weight: 600;
      color: $textColor3;
      line-height: 22px;
      margin-right: 4px;
      @include ellipsis;
    }

    .table--link {
      @include ellipsis;
      font-size: 14px;
      font-family: AlibabaPuHuiTi-Regular, sans-serif;
      font-weight: 600;
      color: #008ee9;
      line-height: 22px;
      display: block;
    }
  }

  /* 150% 适配 */
  @media screen and (min-width: 1280px) and (max-width: 1326px) {
    .addr-monitor-main .addr-monitor-search,
    .addr-monitor-main .addr-monitor-result {
      width: 92%;
    }
  }

  /* 125% 适配 */
  @media screen and (min-width: 1328px) and (max-width: 1538px) {
    .addr-monitor-main .addr-monitor-search,
    .addr-monitor-main .addr-monitor-result {
      width: 80%;
    }
  }
</style>
