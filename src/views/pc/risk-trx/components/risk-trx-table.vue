/* * @risk-trx-table.vue * @deprecated * @author czh * @update (czh 2022/2/25) */
<template>
  <div class="risk-table-inner eagle-table">
    <el-table
      ref="riskTrxList"
      v-loading="loading"
      tooltip-effect="light"
      :data="tableData"
      cell-class-name="cursor-pointer"
      @row-click="openDetail">
      <template #empty>
        <empty-data content="lang.noRisk"></empty-data>
      </template>
      <el-table-column prop="platform" width="120" align="center">
        <template #header>
          <span class="table-head">{{ $t('lang.riskConfig.tableHeader.platform') }}</span>
        </template>
        <template #default="scope">
          <platform-cell :platform="scope.row.platform"></platform-cell>
        </template>
      </el-table-column>
      <el-table-column prop="tx_hash" width="180" align="left">
        <template #header>
          <span class="table-head">{{ $t('lang.riskConfig.tableHeader.txHash') }}</span>
        </template>
        <template #default="scope">
          <ellipsis-copy
            custom-class="risk-table-inner--addr"
            :target-str="scope.row.tx_hash"
            :is-show-copy-btn="false"
            font-length="6"
            end-length="6">
          </ellipsis-copy>
        </template>
      </el-table-column>
      <el-table-column prop="alert_level" width="126" align="left">
        <template #header>
          <span class="table-head">{{ $t('lang.riskConfig.tableHeader.level') }}</span>
        </template>
        <template #default="scope">
          <div v-if="scope.row.alert_level === 'LOW'">
            <span class="level__Low"></span>
            Low
          </div>
          <div v-if="scope.row.alert_level === 'HIGH'">
            <span class="level__High"></span>
            High
          </div>
          <div v-if="scope.row.alert_level === 'MEDIUM'">
            <span class="level__Medium"></span>
            Medium
          </div>
        </template>
      </el-table-column>

      <el-table-column prop="risk_features" width="180" align="left">
        <template #header>
          <span class="table-head">{{ $t('lang.riskConfig.tableHeader.warningType') }}</span>
        </template>
        <template #default="scope">
          <div v-if="scope.row.tag_list && scope.row.tag_list.length > 0" style="display: flex">
            <div v-for="item in scope.row.tag_list" :key="item">
              <el-tooltip effect="light" placement="top" :content="item">
                <be-icon width="24" height="24" style="margin-right: 8px" :icon="typeDict[item]">
                </be-icon>
              </el-tooltip>
            </div>
          </div>
          <div
            v-else
            style="
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
            ">
            {{ '/' }}
          </div>
        </template>
      </el-table-column>

      <!--      <el-table-column prop="from_address" :width="tableHeader('from_address')" align="left">
        <template #header>
          <span class="table-head">
            {{ $t('lang.riskConfig.tableHeader.gainer') }}
          </span>
          <be-tooltip :content="$t('lang.riskConfig.gainerExp')" custom-class="table-tooltip">
            <be-icon icon="iconHelpEagle"></be-icon>
          </be-tooltip>
        </template>
        <template #default="scope">
          <ellipsis-copy
            v-if="!scope.row.gainer_address_tag"
            :target-str="scope.row.gainer_address"
            :is-show-copy-btn="false"
            empty-text="/"
            font-length="8"
            end-length="8">
          </ellipsis-copy>
          <ellipsis-copy
            v-if="scope.row.gainer_address_tag"
            :target-str="scope.row.gainer_address_tag"
            :is-show-copy-btn="false"
            :tooltip-txt="scope.row.gainer_address"
            empty-text="/"
            :is-ellipsis="scope.row.gainer_address_tag.length > 16 ? true : false"
            style="color: #1496f2"
            font-length="8"
            end-length="8">
            <template #content>
              <p style="text-align: center">{{ scope.row.gainer_address }}</p>
              <p v-if="scope.row.gainer_address_tag.length > 16" style="text-align: center">
                {{ scope.row.gainer_address_tag }}
              </p>
            </template>
          </ellipsis-copy>
        </template>
      </el-table-column>
      <el-table-column prop="amount" :width="tableHeader('amount')" align="center">
        <template #header>
          <span class="table-head">{{ $t('lang.riskConfig.tableHeader.amount') }}</span>
          <be-tooltip :content="$t('lang.riskConfig.amountExp')" custom-class="table-tooltip">
            <be-icon icon="iconHelpEagle"></be-icon>
          </be-tooltip>
        </template>
        <template #default="scope">
          {{ isEmpty(scope.row.amount, '/') === '/' ? '/' : `$ ${scope.row.amount}` }}
        </template>
      </el-table-column>-->
      <el-table-column prop="Description" align="left" show-overflow-tooltip>
        <template #header>
          <span class="table-head">{{ $t('lang.riskConfig.description') }}</span>
        </template>
        <template #default="scope">
          {{ scope.row.descript }}
        </template>
      </el-table-column>
      <el-table-column width="180" prop="tx_time" align="left">
        <template #header>
          <span class="table-head">{{ $t('lang.riskConfig.tableHeader.txTime') }}</span>
        </template>
        <template #default="scope">
          <date-cell :time="scope.row.tx_time" :is-break="false"></date-cell>
        </template>
      </el-table-column>
      <el-table-column v-if="showOperation" width="50" label=" " align="center">
        <template #default>
          <div class="more-btn">
            <be-icon icon="more" width="20" height="21"></be-icon>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div v-if="tableData.length > 0 && showPager" class="table-page">
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
</template>

<script lang="ts">
  import { computed, defineComponent, onMounted, ref } from 'vue'
  import { BeIcon } from '@eagle-eye/be-ui'
  import { getProjWarning } from '../../../../api/risk-trx'
  import { beijing2utc, createDate, formatDate, openWindow } from '../../../../utils/common'
  import composition from '../../../../utils/mixin/common-func'
  // @ts-ignore
  import EllipsisCopy from '../../../../components/common-components/ellipsis-copy/ellipsis-copy.vue'
  import { iconDict } from '../../../../utils/platform-dict'
  import PlatformCell from '../../../../components/common-components/platform-cell/platform-cell.vue'
  import EmptyData from '../../../../components/common-components/empty-data/empty-data.vue'
  import DateCell from '../../../../components/common-components/date-cell/date-cell.vue'
  import compositionPage from '../../../../utils/mixin/page-param'
  import type { PropType } from 'vue'
  import type { IFilterItem, IOption } from '../../../../utils/types'
  export default defineComponent({
    name: 'RiskTrxTable',
    components: {
      DateCell,
      EmptyData,
      PlatformCell,
      BeIcon,
      EllipsisCopy,
    },
    props: {
      projectId: {
        type: String,
        default: '',
      },
      searchParams: {
        type: String,
        default: '',
      },
      showOperation: {
        type: Boolean,
        default: true,
      },
      showPager: {
        type: Boolean,
        default: true,
      },
      filterChainItem: {
        type: Array as PropType<IFilterItem[]>,
      },
      filterLevelItem: {
        type: Array as PropType<IFilterItem[]>,
      },
      filterTypeItem: {
        type: Array as PropType<IFilterItem[]>,
      },
    },
    setup(props) {
      const { message, isEmpty } = composition()
      const { pageParams, resetPageParam, updatePageSize } = compositionPage()
      const tableData = ref<object>([])
      const loading = ref<boolean>(false)

      /**
       * 获取表格数据
       */
      const getList = (type?: string) => {
        // 使用loading变量防抖
        if (loading.value) {
          return
        }
        loading.value = true
        if (type === 'reset') {
          resetPageParam()
        }
        const getFilterParams = (arr: Array<IFilterItem> = []): Array<string> => {
          const res: Array<string> = []
          arr.forEach((val: IFilterItem) => {
            if (val.isActive) {
              res.push(val.val)
            }
          })
          return res
        }
        const params = {
          page_num: pageParams.value.currentPage,
          page_size: pageParams.value.pageSize,
          project_id: props.projectId,
          platform: getFilterParams(props.filterChainItem),
          alert_level: getFilterParams(props.filterLevelItem),
          type: getFilterParams(props.filterTypeItem),
          param: props.searchParams,
        }
        getProjWarning(params)
          .then(res => {
            if (!res) {
              // loading.value = false
              // location.validateEmail()
              return
            }
            if (res.data) {
              // 组装descript字段数据
              res.data.page_infos.forEach((val: any) => {
                let arrStr = ''
                val.description.forEach((descri: any) => {
                  const descriArr = descri.text.split('%s')
                  // eslint-disable-next-line array-callback-return
                  descriArr.map((spl: any, splIndex: number) => {
                    if (!spl && descri.params[splIndex - 1]) {
                      descriArr[splIndex] = descri.params[splIndex - 1].tag_name
                        ? descri.params[splIndex - 1].tag_name
                        : descri.params[splIndex - 1].address
                    }
                  })
                  arrStr = arrStr + descriArr.join('')
                })
                val.descript = arrStr
              })
              tableData.value = res.data.page_infos

              pageParams.value.total = res.data.total
            } else {
              tableData.value = []
              resetPageParam()
              // message('error', 'system error')
            }
            loading.value = false
          })
          .catch(err => {
            message('error', err.message || err)
            loading.value = false
            console.error(err)
          })
      }

      /**
       * 分页方法
       * @param {Object} item - 分页参数对象
       */
      const pageChange = (item: any): void => {
        pageParams.value.currentPage = item
        getList()
      }
      const updateNum = (data: number): void => {
        updatePageSize(data!, pageParams)
        getList()
      }
      /**
       * 打開交易分析詳情tab
       */
      const openDetail = (params: any) => {
        openWindow(`/riskTrxDetail?tx_hash=${params.tx_hash}`)
      }

      const screenWidth = window.screen.width
      const tableHeader = computed(() => {
        const headerDict: IOption = {
          platform: '80',
          alert_level: '80',
          risk_features: '400',
          from_address: '200',
          amount: '120',
          tx_time: '110',
        }
        if (1280 <= screenWidth && 1326 <= screenWidth) {
          headerDict.risk_features = '320'
          headerDict.from_address = '140'
          headerDict.platform = '120'
        }
        return function (key: string) {
          return headerDict[key]
        }
      })
      onMounted(() => {
        getList('reset')
      })
      const typeDict = {
        'Large Outflow': 'iconLargeOutflow2',
        'Flash Loan': 'iconFlash2',
        'Privileged Operation': 'iconPrivileged2',
        'Exploiter On The Move': 'iconExploiter',
      }
      return {
        typeDict,
        updateNum,
        tableHeader,
        isEmpty,
        openDetail,
        iconDict,
        pageChange,
        getList,
        tableData,
        loading,
        pageParams,
        beijing2utc,
        createDate,
        formatDate,
      }
    },
  })
</script>

<style lang="scss">
  .risk-table-inner {
    padding: 20px;
    background-color: #fff;

    /* 定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸 */

    .el-table__body-wrapper::-webkit-scrollbar {
      width: 8px;
      height: 8px;
      margin: 5px;
    }
    .risk-table-inner--addr {
      width: 120px;
      min-width: 100px !important;
    }
  }
</style>
