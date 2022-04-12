/* * @addr-monitor-detail.vue * @deprecated * @author czh * @update (czh 2022/4/2) */
<template>
  <div class="addr_monitor_detail">
    <!--   基本信息     -->
    <div class="detail-body">
      <div class="detail-item">
        <div class="detail-item-txt detail-item--hash">
          <span>{{ $t('lang.addrMonitor.tableHeader.addr') }}：</span>
          <be-ellipsis-copy
            custom-class="detail-copy"
            :target-str="baseInfo.address"
            :is-ellipsis="false"
            :is-tooltip="false"
            empty-text="/"
            styles="font-weight:500"
            font-length="8"
            end-length="8">
          </be-ellipsis-copy>
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
          <span style="font-weight: 500">{{ baseInfo.remark }}</span>
        </div>
      </div>
      <div class="detail-item">
        <div class="detail-item-txt">
          <span>{{ $t('lang.addrMonitor.tableHeader.link') }}：</span>
          <a class="link" :href="baseInfo.link" target="_blank">{{ baseInfo.link }}</a>
        </div>
      </div>
    </div>
    <!--   表格   -->
    <div class="addr-monitor-detail-table eagle-table">
      <el-table :data="list">
        <template #empty>
          <empty-data></empty-data>
        </template>
        <el-table-column prop="platform">
          <template #header>
            <span class="table-head">{{ $t('lang.riskConfig.tableHeader.platform') }}</span>
          </template>
          <template #default="scope">
            <platform-cell :platform="scope.row.platform"></platform-cell>
          </template>
        </el-table-column>
        <el-table-column prop="tx_hash">
          <template #header>
            <span class="table-head">{{ $t('lang.riskConfig.tableHeader.txHash') }}</span>
          </template>
          <template #default="scope">
            <be-ellipsis-copy
              :target-str="scope.row.tx_hash"
              :is-show-copy-btn="false"
              font-length="7"
              end-length="7">
            </be-ellipsis-copy>
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
        <el-table-column prop="from_address">
          <template #header>
            <span class="table-head">{{ $t('lang.riskConfig.tableHeader.from') }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="to_address">
          <template #header>
            <span class="table-head">{{ $t('lang.riskConfig.tableHeader.to') }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="value">
          <template #header>
            <span class="table-head">{{ $t('lang.riskConfig.profitTableHeader.tokenNum') }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="value">
          <template #header>
            <span class="table-head">{{ $t('lang.riskConfig.profitTableHeader.tokenName') }}</span>
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
  import { defineComponent, onMounted, ref } from 'vue'
  import BeEllipsisCopy from '../../../components/common-components/ellipsis-copy/ellipsis-copy.vue'
  import { beijing2utc, createDate, formatDate } from '../../../utils/common'
  import EmptyData from '../../../components/common-components/empty-data/empty-data.vue'
  import { BePagination } from '../../../../public/be-ui/be-ui.es'
  import PlatformCell from '../../../components/common-components/platform-cell/platform-cell.vue'
  import { getAddressMonitorInfo } from '../../../api/addr-monitor'
  import composition from '../../../utils/mixin/common-func'
  import type { IAddrMonitorSearch } from '../../../api/addr-monitor'
  import type { IAddrMonitorDetail, IAddrMonitorInfo, IPageParam } from '../../../utils/types'
  export default defineComponent({
    name: 'AddrMonitorDetail',
    components: { PlatformCell, EmptyData, BeEllipsisCopy, BePagination },
    setup() {
      const baseInfo = ref<IAddrMonitorInfo>({})
      const addressParams = ref<string>('')
      const { message, route } = composition()
      /**
       * 获取基本信息数据
       */
      const getBaseInfo = (): void => {
        const params: IAddrMonitorSearch = {
          address: addressParams.value,
        }
        getAddressMonitorInfo(params)
          .then((res: any) => {
            if (!res) {
              return
            }
            if (res && res.code === '0000') {
              baseInfo.value = res.data
            } else {
              message('warning', res.message || res)
            }
          })
          .catch((err: any) => {
            message('error', err.message || err)
            console.error(err)
          })
      }
      // 列表数据
      const list = ref<Array<IAddrMonitorDetail>>([])
      /**
       * 获取列表数据
       */
      const getList = (): void => {
        list.value = [
          {
            platform: 'bsc',
            tx_hash: 'hack address hack addresshack address hack addresshack address hack address',
            create_time: '2022-03-31T05:53:31.000+0000',
            value: '-123456',
            from_address: '0xC1323fe4b68E9a483awdqwasqwdddddddddasdwd8168a',
            to_address: '0xC1323fe4b68E9a483awdqwasqwdddddddddasdwd8168a',
          },
        ]
      }
      // 分页参数
      const pageParams = ref<IPageParam>({
        currentPage: 1,
        pageSize: 10,
        total: 0,
      })
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
      /**
       * 初始化页面
       */
      const initPage = (): void => {
        const { address } = route.query
        addressParams.value = address as string
        getBaseInfo()
        getList()
      }
      onMounted(() => {
        initPage()
      })
      return {
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
</style>
