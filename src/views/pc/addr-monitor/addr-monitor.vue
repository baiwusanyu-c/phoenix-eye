/* * @addr-monitor.vue * @deprecated 地址监控 * @author czh * @update (czh 2022/3/24) */
<template>
  <div class="addr-monitor-main eagle-page">
    <div class="addr-monitor-search">
      <div class="addr-monitor-search--input">
        <el-input
          v-model="searchParams"
          :placeholder="$t('lang.addrMonitor.searchP')"
          style="margin-right: 16px" />
        <be-button
          type="success"
          custom-class="eagle-btn search-btn"
          size="large"
          round="4"
          @click="openDetail(searchParams)">
          <span>{{ $t('lang.searchT') }}</span>
        </be-button>
      </div>
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
      <el-table :data="addrMonitorList">
        <template #empty>
          <empty-data></empty-data>
        </template>
        <el-table-column prop="address">
          <template #header>
            <span class="table-head">{{ $t('lang.addrMonitor.tableHeader.addr') }}</span>
          </template>
          <template #default="scope">
            <span class="table--info">{{ scope.row.address }}</span>
            <be-button
              v-if="scope.row.warningNum > 0"
              round="4"
              type="default"
              bordered
              custom-class="ring-btn"
              prev-icon="iconRingEagle"
              size="mini">
              {{ scope.row.warningNum }}
            </be-button>
          </template>
        </el-table-column>
        <el-table-column prop="remark">
          <template #header>
            <span class="table-head">{{ $t('lang.addrMonitor.tableHeader.remark') }}</span>
          </template>
          <template #default="scope">
            <span class="table--info">{{ scope.row.remark }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="create_time" width="120">
          <template #header>
            <span class="table-head">{{ $t('lang.createProject.tableHeader.createTime') }}</span>
          </template>
          <template #default="scope">
            <el-tooltip placement="top" effect="light">
              <template #content>
                <span
                  >{{ formatDate(createDate(scope.row.create_time)) }} UTC：{{
                    beijing2utc(scope.row.create_time)
                  }}</span
                >
              </template>
              <span style="color: #888">
                <p>{{ formatDate(createDate(scope.row.create_time)).split(' ')[0] }}</p>
                <p>{{ formatDate(createDate(scope.row.create_time)).split(' ')[1] }}</p>
              </span>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="link">
          <template #header>
            <span class="table-head">{{ $t('lang.addrMonitor.tableHeader.link') }}</span>
          </template>
          <template #default="scope">
            <a :href="scope.row.link" target="_blank" class="table--link">{{ scope.row.link }}</a>
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
                @click="deleteAddressMonitorFn(scope.row)"></be-icon>
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
                @click="openDetail(scope.row.address)"></be-icon>
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
    <create-addr-monitor
      ref="createDialog"
      :type="opType"
      :cur-item="curItem"></create-addr-monitor>
  </div>
</template>

<script lang="ts">
  import { defineComponent, nextTick, ref } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { BeButton, BeIcon, BePagination } from '../../../../public/be-ui/be-ui.es'
  import { beijing2utc, createDate, formatDate, openWindow } from '../../../utils/common'
  import composition from '../../../utils/mixin/common-func'
  import MsgDialog from '../../../components/common-components/msg-dialog/msg-dialog.vue'
  import EmptyData from '../../../components/common-components/empty-data/empty-data.vue'
  import { deleteAddressMonitor } from '../../../api/addr-monitor'
  import createAddrMonitor from './components/create-addr-monitor.vue'
  import type { IAddrMonitor, IAddrMonitorForm, IPageParam } from '../../../utils/types'

  export default defineComponent({
    name: 'AddrMonitor',
    components: { EmptyData, BeButton, BeIcon, BePagination, MsgDialog, createAddrMonitor },
    setup() {
      const { t } = useI18n()
      const { message } = composition()
      // 当前操作的项目对象
      const curItem = ref<IAddrMonitor>({})
      // 当前操作类型
      const opType = ref<string>('add')
      // 删除弹窗显示
      const showDelete = ref<boolean>(false)

      // 搜索参数
      const searchParams = ref<string>('')
      const loading = ref<boolean>(false)
      // 分页参数
      const pageParams = ref<IPageParam>({
        currentPage: 1,
        pageSize: 10,
        total: 0,
      })
      const addrMonitorList = ref<Array<IAddrMonitor>>([])
      /**
       * 获取列表
       */
      const getList = (type?: string) => {
        if (type === 'reset') {
          resetVa()
        }
        loading.value = true
        /*let params: IProjParam = {
              param: searchParams.value,
              page_num: pageParams.value.currentPage,
              page_size: pageParams.value.pageSize,
            }*/
        addrMonitorList.value = [
          {
            address: '0xC1323fe4b68E9a4838168a',
            warningNum: 10,
            remark: 'hack address hack address hack address hack address hack address',
            create_time: '2022-03-31T05:53:31.000+0000',
            event_link: 'https://www.baidu.com',
            address_monitor_id: 'awdhawfgaugoasdad',
          },
        ]
        pageParams.value.total = 1
      }
      getList()
      /**
       * 重置参数
       */
      const resetVa = (): void => {
        pageParams.value = {
          currentPage: 1,
          pageSize: 10,
          total: 0,
        }
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
        pageParams.value.currentPage = 1
        pageParams.value.pageSize = data.pageSize!
        getList()
      }
      // 创建、编辑项目弹窗
      const createDialog = ref<any>({})
      const openDialog = (type: string, item?: IAddrMonitor): void => {
        opType.value = type
        if (type === 'edit' && item) {
          curItem.value = item
        }
        // 打开弹窗
        nextTick(() => {
          createDialog.value.showDialog = true
        })
      }
      /**
       * 删除方法
       * @param item
       */
      const deleteAddressMonitorFn = (item: IAddrMonitor): void => {
        curItem.value = item
        showDelete.value = true
      }
      /**
       * 确认删除
       */
      const confirmDelete = () => {
        const params: IAddrMonitorForm = {
          address_monitor_id: (curItem.value as IAddrMonitorForm).address_monitor_id as string,
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
        openWindow(`#/addressMonitor/detail?address=${params}`)
      }
      return {
        curItem,
        opType,
        createDialog,
        showDelete,
        confirmDelete,
        openDetail,
        openDialog,
        deleteAddressMonitorFn,
        addrMonitorList,
        pageChange,
        updateNum,
        pageParams,
        getList,
        searchParams,
        createDate,
        formatDate,
        beijing2utc,
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
    @include common-container(40px);
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
    }
  }
</style>
