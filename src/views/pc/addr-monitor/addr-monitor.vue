/* * @addr-monitor.vue * @deprecated 地址监控 * @author czh * @update (czh 2022/3/24) */
<template>
  <div class="addr-monitor-main eagle-page">
    <div class="addr-monitor-container">
      <div class="addr-monitor-search">
        <be-button
          type="success"
          custom-class="eagle-btn create-btn create-addr-monitor"
          size="large"
          prev-icon="iconAddPlus"
          round="4"
          @click="openAddAddrMonitor">
          {{ $t('lang.addrMonitor.create') }}
        </be-button>
      </div>
      <div class="addr-monitor-result eagle-table">
        <div v-if="!isLogin" class="empty-info__un_login">
          <img class="img" src="@/assets/image/pc/addr-monitor-un-login.png" alt="" />
          <p>
            <span class="empty-info" role="button" @click="openAddAddrMonitor">{{
              $t('lang.addrMonitor.login')
            }}</span>
            <span>{{ $t('lang.addrMonitor.loginTo') }}</span>
          </p>
        </div>
        <el-table v-if="isLogin" v-loading="loading" :data="addrMonitorList" tooltip-effect="light">
          <template #empty>
            <empty-data></empty-data>
          </template>
          <el-table-column prop="address">
            <template #header>
              <span class="table-head">{{ $t('lang.addrMonitor.tableHeader.addr') }}</span>
            </template>
            <template #default="scope">
              <el-tooltip
                placement="top"
                effect="light"
                class="address"
                :content="scope.row.address">
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
                :disabled="!scope.row.remark"
                popper-class="addr-monitor-main--address"
                :content="scope.row.remark">
                <span class="table--info">{{ scope.row.remark ? scope.row.remark : '/' }}</span>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column prop="create_time">
            <template #header>
              <span class="table-head">{{ $t('lang.createProject.tableHeader.createTime') }}</span>
            </template>
            <template #default="scope">
              <date-cell :time="scope.row.create_time" :is-break="false"></date-cell>
            </template>
          </el-table-column>
          <el-table-column prop="operation">
            <template #header>
              <span class="table-head">{{ $t('lang.addrMonitor.tableHeader.operate') }}</span>
            </template>
            <template #default="scope">
              <be-button
                style="margin-right: 10px"
                type="success"
                custom-class="operate-btn"
                prev-icon="iconEditEagle"
                @click="openDialog('edit', scope.row)">
                {{ $t('lang.edit') }}
              </be-button>
              <be-button
                custom-class="operate-btn"
                type="success"
                prev-icon="iconDeleteEagle"
                @click="openDialog('delete', scope.row)">
                {{ $t('lang.delete') }}
              </be-button>

              <!--              <el-tooltip placement="top">
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
              </el-tooltip>-->
            </template>
          </el-table-column>
          <el-table-column label=" " align="center">
            <template #header>
              <span class="table-head">{{ $t('lang.addrMonitor.tableHeader.result') }}</span>
            </template>
            <template #default="scope">
              <be-button
                type="success"
                custom-class="view-btn"
                @click="handleSearch(scope.row.address)">
                {{ $t('lang.projectExplorer.detail.view') }}
              </be-button>
            </template>
          </el-table-column>
        </el-table>
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
  import { BeButton } from '@eagle-eye/be-ui'
  import { Base64 } from 'js-base64'
  import { catchErr, getStore, getUrlkey, openWindow, setStore } from '../../../utils/common'
  import composition from '../../../utils/mixin/common-func'
  import MsgDialog from '../../../components/common-components/msg-dialog/msg-dialog.vue'
  import EmptyData from '../../../components/common-components/empty-data/empty-data.vue'
  import {
    deleteAddressMonitor,
    getAddressMonitorInfo,
    getAddressMonitorList,
  } from '../../../api/addr-monitor'
  import compositionDialog from '../../../utils/mixin/dialog-func'
  import createAddrMonitor from './components/create-addr-monitor.vue'
  import type { IAddrMonitorSearch } from '../../../api/addr-monitor'
  import type { IAddrMonitor, IAddrMonitorForm, IOption } from '../../../utils/types'

  export default defineComponent({
    name: 'AddrMonitor',
    components: {
      EmptyData,
      BeButton,
      MsgDialog,
      createAddrMonitor,
    },
    setup() {
      const { t } = useI18n()
      const { message } = composition()
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
      const getList = () => {
        loading.value = true
        getAddressMonitorList()
          .then(res => {
            if (!res) {
              return
            }
            if (res) {
              addrMonitorList.value = res.data
            }
          })
          .catch((err: any) => {
            message('error', err.message || err)
            console.error(err)
          })
          .finally(() => (loading.value = false))
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
              getList()
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
        openWindow(`/addressMonitorDetail?address=${params}`, params)
      }
      /**
       * 处理email、移动端打开打开
       */
      const busLogin = useEventBus<string>('openLogin')
      const isLogin = ref<boolean>(false)
      const initPage = (): void => {
        const urlParams = getUrlkey()
        isLogin.value = !!getStore('token')
        // 没登录。看看url是否有移动端传参
        if (!isLogin.value) {
          if (urlParams.from === 'mobile' && urlParams.token) {
            isLogin.value = true
            setStore('token', Base64.decode(urlParams.token))
            setStore('userInfo', urlParams.userInfo)
            const reInit = useEventBus<string>('reInit')
            reInit.emit()
          }
        }
        // 来自email 打开
        if (urlParams.from === 'email' && urlParams.address) {
          // 如果没登录就通知显示登录
          if (!isLogin.value) {
            // 开启登录窗口
            busLogin.emit()
            return
          }
          // 直接去态势详情页面
          handleSearch(urlParams.address)
        } else {
          // 不是email打开，且登录了则调接口拿列表
          if (isLogin.value) {
            getList()
          }
        }
      }
      const isLogoutBus = useEventBus<string>('isLogout')
      isLogoutBus.on(() => {
        isLogin.value = false
      })
      const openAddAddrMonitor = (): void => {
        if (isLogin.value) {
          openDialog('add')
        } else {
          // 开启登录窗口
          busLogin.emit()
        }
      }

      onMounted(() => {
        initPage()
      })
      return {
        openAddAddrMonitor,
        isLogin,
        loading,
        curItem,
        opType,
        createDialog,
        showDelete,
        confirmDelete,
        openDetail,
        openDialog,
        addrMonitorList,
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
  .addr-monitor-container {
    @include common-container(0px);
    background-color: $mainColor7;
    padding: 32px 20px;
    box-sizing: border-box;
    height: 678px;
    margin-top: 40px;
  }
  .addr-monitor-main {
    min-height: calc(100% - 100px);
    .subTitle {
      font-family: BarlowSemi-R, sans-serif;
      font-size: 18px;
      font-weight: 400;
      color: $textColor12;
    }

    .item {
      font-family: BarlowSemi-B, sans-serif;
      font-size: 14px;
      font-weight: bold;
      line-height: 22px;
      color: $lessColor3;
      word-break: break-all;
      cursor: pointer;
    }
  }

  .addr-monitor-search {
    text-align: center;
    margin-bottom: 16px;
    .create-addr-monitor {
      margin: 0;
    }
  }

  .addr-monitor-result {
    border-radius: 4px;
    .empty-info__un_login {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      height: 380px;
      p {
        margin-top: 16px;
        font-size: 18px;
        font-weight: 400;
        line-height: 26px;
        font-family: BarlowSemi-R, sans-serif;
        color: $textColor3;
        .empty-info {
          color: $mainColor3;
          cursor: pointer;
        }
      }
    }
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
      max-width: 600px;
      display: block;
      font-size: 14px;
      font-family: BarlowSemi-R, sans-serif;
      font-weight: 600;
      color: $textColor3;
      line-height: 22px;
      margin-right: 4px;
      @include ellipsis;
    }

    .table--link {
      @include ellipsis;
      font-size: 14px;
      font-family: BarlowSemi-R, sans-serif;
      font-weight: 600;
      color: #008ee9;
      line-height: 22px;
      display: block;
    }
  }
  /* 移动端预留 适配 */
  @media screen and (max-width: 1280px) {
    .addr-monitor-main .addr-monitor-search,
    .addr-monitor-main .addr-monitor-result {
      width: 92%;
    }
  }
  /* 150% 适配 */
  @media screen and (min-width: 1280px) and (max-width: 1326px) {
    .addr-monitor-main .addr-monitor-search,
    .addr-monitor-main .addr-monitor-result {
      width: 92%;
    }
  }
  /*
  !* 125% 适配 *!
  @media screen and (min-width: 1328px) and (max-width: 1538px) {
    .addr-monitor-main .addr-monitor-search,
    .addr-monitor-main .addr-monitor-result {
      width: 80%;
    }
  }*/
</style>
