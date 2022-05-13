/* * @addr-monitor-detail.vue * @deprecated * @author czh * @update (czh 2022/4/2) */
<template>
  <div class="addr_monitor_detail">
    <!--   基本信息     -->
    <div v-loading="baseLoading" class="detail-body">
      <div class="detail-item">
        <div class="detail-item-txt detail-item--hash">
          <span>{{ $t('lang.addrMonitor.tableHeader.addr') }}：</span>
          <ellipsis-copy
            custom-class="detail-copy"
            :target-str="baseInfo.address"
            :is-ellipsis="false"
            :is-tooltip="false"
            empty-text="/"
            styles="font-weight:500"
            font-length="8"
            end-length="8">
          </ellipsis-copy>
        </div>
        <div class="detail-item-txt detail-item--date">
          <span class="date-label">{{ $t('lang.addrMonitor.tableHeader.createTime') }}：</span>
          <el-tooltip placement="top" effect="light">
            <template #content>
              <span style="font-weight: 500">UTC：{{ beijing2utc(baseInfo.create_time) }}</span>
            </template>
            <span style="font-weight: 500">{{
              formatDate(createDate(baseInfo.create_time).getTime())
            }}</span>
          </el-tooltip>
        </div>
      </div>
      <div class="detail-item detail-item--remark">
        <div class="detail-item-txt">
          <span>{{ $t('lang.addrMonitor.tableHeader.remark') }}：</span>
          <ellipsis-copy
            :target-str="baseInfo.remark"
            :is-show-copy-btn="false"
            custom-class="detail-item--ellipsis"
            :is-ellipsis="baseInfo.remark && baseInfo.remark.length > 45"
            styles="font-weight: 500"
            font-length="18"
            end-length="18"></ellipsis-copy>
        </div>
      </div>
      <div class="detail-item">
        <div class="detail-item-txt">
          <span>{{ $t('lang.addrMonitor.tableHeader.link') }}：</span>
          <ellipsis-copy
            :target-str="baseInfo.event_link"
            :is-show-copy-btn="false"
            :is-ellipsis="baseInfo.event_link && baseInfo.event_link.length > 45"
            styles="font-weight: 500"
            font-length="18"
            custom-class="detail-item--ellipsis"
            end-length="18">
            <template #text="slotProps">
              <a class="link" :href="baseInfo.event_link" target="_blank">{{ slotProps.item }}</a>
            </template>
          </ellipsis-copy>
        </div>
      </div>
    </div>
    <!--   表格   -->
    <div class="addr-monitor-detail-table eagle-table">
      <el-table v-loading="listLoading" :data="list">
        <template #empty>
          <empty-data></empty-data>
        </template>
        <el-table-column prop="platform" width="140">
          <template #header>
            <span class="table-head">{{ $t('lang.riskConfig.tableHeader.platform') }}</span>
          </template>
          <template #default="scope">
            <platform-cell :platform="scope.row.platform"></platform-cell>
          </template>
        </el-table-column>
        <el-table-column prop="hash">
          <template #header>
            <span class="table-head">{{ $t('lang.riskConfig.tableHeader.txHash') }}</span>
          </template>
          <template #default="scope">
            <ellipsis-copy
              :target-str="scope.row.hash"
              :is-show-copy-btn="true"
              font-length="7"
              end-length="7">
            </ellipsis-copy>
          </template>
        </el-table-column>
        <el-table-column prop="block_time" width="120">
          <template #header>
            <span class="table-head">{{ $t('lang.createProject.tableHeader.createTime') }}</span>
          </template>
          <template #default="scope">
            <date-cell :time="scope.row.block_time"></date-cell>
          </template>
        </el-table-column>

        <el-table-column prop="from">
          <template #header>
            <span class="table-head">{{ $t('lang.riskConfig.tableHeader.from') }}</span>
          </template>
          <template #default="scope">
            <ellipsis-copy
              :target-str="scope.row.from_tag ? scope.row.from_tag : scope.row.from"
              :copy-content="scope.row.from"
              :tooltip-txt="scope.row.from"
              :is-ellipsis="handleIsEllipsis(scope.row.from, scope.row.from_tag)"
              font-length="8"
              end-length="8"
              empty-text="/">
            </ellipsis-copy>
          </template>
        </el-table-column>
        <el-table-column prop="to">
          <template #header>
            <span class="table-head">{{ $t('lang.riskConfig.tableHeader.to') }}</span>
          </template>
          <template #default="scope">
            <ellipsis-copy
              :target-str="scope.row.to_tag ? scope.row.to_tag : scope.row.to"
              :copy-content="scope.row.to"
              :tooltip-txt="scope.row.to"
              :is-ellipsis="handleIsEllipsis(scope.row.to, scope.row.to_tag)"
              font-length="8"
              end-length="8"
              empty-text="/">
            </ellipsis-copy>
          </template>
        </el-table-column>

        <el-table-column prop="value">
          <template #header>
            <span class="table-head">{{ $t('lang.riskConfig.profitTableHeader.tokenNum') }}</span>
          </template>
          <template #default="scope">
            <div v-if="scope.row.value || scope.row.value === 0">
              <el-tooltip placement="top" effect="light">
                <template #content>
                  <span>{{ scope.row.value }}</span>
                </template>
                <span>{{ handleProfit(scope.row.value, 6) }}</span>
              </el-tooltip>
            </div>
            <div
              v-else
              style="
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
              ">
              /
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="token_name">
          <template #header>
            <span class="table-head">{{ $t('lang.riskConfig.profitTableHeader.tokenName') }}</span>
          </template>
          <template #default="scope">
            <div
              style="
                display: flex;

                align-items: center;
                justify-content: center;
              ">
              {{ scope.row.token_name || scope.row.token_name === 0 ? scope.row.token_name : '/' }}
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
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, onMounted, ref } from 'vue'
  import { useI18n } from 'vue-i18n'
  import EllipsisCopy from '../../../components/common-components/ellipsis-copy/ellipsis-copy.vue'
  import {
    beijing2utc,
    createDate,
    formatDate,
    getStore,
    simulateToFixed,
  } from '../../../utils/common'
  import EmptyData from '../../../components/common-components/empty-data/empty-data.vue'
  // @ts-ignore
  import { BePagination } from '../../../../public/be-ui/be-ui.es'
  import PlatformCell from '../../../components/common-components/platform-cell/platform-cell.vue'
  import { getAddressMonitorOutList } from '../../../api/addr-monitor'
  import composition from '../../../utils/mixin/common-func'
  import compositionPage from '../../../utils/mixin/page-param'
  import type { IAddrMonitorDetailOut, IAddrMonitorSearch } from '../../../api/addr-monitor'
  import type { IAddrMonitorDetail, IAddrMonitorInfo, IPageParam } from '../../../utils/types'
  export default defineComponent({
    name: 'AddrMonitorDetail',
    components: { PlatformCell, EmptyData, EllipsisCopy, BePagination },
    setup() {
      const baseInfo = ref<IAddrMonitorInfo>({})
      const addressParams = ref<string>('')
      const { message, route } = composition()
      const { pageParams, updatePageSize } = compositionPage()
      const { t } = useI18n()
      const baseLoading = ref<boolean>(false)
      /**
       * 获取基本信息数据
       */
      const getBaseInfo = (): void => {
        baseLoading.value = true
        // 读取上个搜索页面缓存的数据
        const resCache = getStore('addressMonitor')
        if (resCache) {
          baseInfo.value = JSON.parse(resCache)[addressParams.value]
        }
        baseLoading.value = false
      }
      // 列表数据
      const list = ref<Array<IAddrMonitorDetail>>([])
      const listLoading = ref<boolean>(false)
      /**
       * 获取列表数据
       */
      const getList = (): void => {
        const params: IAddrMonitorDetailOut = {
          page_num: pageParams.value.currentPage,
          page_size: pageParams.value.pageSize,
          param: addressParams.value,
        }
        listLoading.value = true
        getAddressMonitorOutList(params)
          .then(res => {
            if (!res) {
              return
            }
            if (res) {
              list.value = res.data.page_infos
              pageParams.value.total = res.data.total
            }
            listLoading.value = false
          })
          .catch((err: any) => {
            message('error', err.message || err)
            console.error(err)
            listLoading.value = false
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
      /**
       * 修改分页显示数量
       * @param data
       */
      const updateNum = (data: IPageParam): void => {
        updatePageSize(data.pageSize!, pageParams)
        getList()
      }
      /**
       * 初始化页面
       */
      const initPage = (): void => {
        const { address, id } = route.query
        addressParams.value = (address || id) as string
        getBaseInfo()
        getList()
      }
      /**
       * 处理数值
       */
      const handleProfit = computed(() => {
        return function (val: number, dec: number) {
          if (val === null) {
            return t('lang.emptyData')
          }
          if (val === 0) {
            return `0`
          }
          return `-${simulateToFixed(val, dec)}`
        }
      })
      const handleIsEllipsis = computed(() => {
        return function (addr: string, tag: string) {
          if ((tag && tag.length > 40) || (!tag && addr.length > 40)) {
            return true
          }
          return false
        }
      })
      onMounted(() => {
        initPage()
      })
      return {
        handleIsEllipsis,
        baseLoading,
        listLoading,
        handleProfit,
        list,
        pageParams,
        pageChange,
        updateNum,
        createDate,
        beijing2utc,
        formatDate,
        baseInfo,
      }
    },
  })
</script>

<style lang="scss">
  .addr_monitor_detail {
    position: relative;
    top: 0;
    left: 0;
    z-index: 1;
    box-sizing: border-box;
    width: 100%;
    height: auto;
    min-height: calc(100% - 100px);
    padding-bottom: 86px;

    .detail-body {
      @include common-container(40px);
      background: $mainColor7-06;
      padding: 20px;
      box-sizing: border-box;
      .detail-item--remark {
        grid-template-columns: 1fr 1fr;
      }

      .detail-item {
        display: grid;
        grid-template-columns: 2fr 1fr;

        .open-web {
          width: 126px;
        }

        .detail-item-txt {
          display: flex;
          align-items: center;
          margin-top: 15px;
          font-weight: bold;
          color: $textColor3;
          .detail-item--ellipsis {
            width: 85%;
          }
        }

        .detail-item--hash {
          justify-content: flex-start;
        }

        .link {
          font-size: 14px;
          font-family: AlibabaPuHuiTi-Regular, sans-serif;
          font-weight: 600;
          color: #008ee9;
          line-height: 22px;
        }
      }
    }
    .addr-monitor-detail-table {
      @include common-container(40px);
      background: $mainColor7;
      padding: 20px;
      box-sizing: border-box;
    }
  }

  /* 150% 适配 */
  @media screen and (min-width: 1280px) and (max-width: 1326px) {
    .addr_monitor_detail {
      .detail-body,
      .addr-monitor-detail-table {
        width: 92%;
      }
    }
    .addr_monitor_detail .detail-body .detail-item .detail-item-txt .detail-item--ellipsis {
      width: 80%;
    }
  }

  /* 125% 适配 */
  @media screen and (min-width: 1328px) and (max-width: 1538px) {
    .addr_monitor_detail {
      .detail-body,
      .addr-monitor-detail-table {
        width: 80%;
      }
    }
    .addr_monitor_detail .detail-body .detail-item .detail-item-txt .detail-item--ellipsis {
      width: 83%;
    }
  }
  /* 110% 适配 */
  @media screen and (min-width: 1540px) and (max-width: 1750px) {
    .addr_monitor_detail .detail-body .detail-item .detail-item-txt .detail-item--ellipsis {
      width: 81%;
    }
  }
</style>
