/*
* @risk-trx-list.vue
* @deprecated
* @author czh
* @update (czh 2021/11/2)
*/
<template>
    <div class="risk-trx-list">

        <div class="search-area">
            <div class="risk-trx-search-input">
                <el-input v-model="searchParams.addr"
                          :placeholder="$t('lang.riskConfig.searchP')"
                          style="margin-right: 16px"/>
                <be-button type="success"
                           customClass="eagle-btn search-btn"
                           size="large"
                           @click="getList('reset')"
                           round="4">
                    <span>{{ $t('lang.searchT') }}</span>
                </be-button>
            </div>
            <div class="risk-trx-search-filter">
                <span class="filter-label">{{ $t('lang.riskConfig.filter.chain') }}:</span>
                <div v-for="(item) in filterChainItem">
                    <be-button
                        type="success"
                        :customClass="item.isActive ? `filter-btn filter-btn-active` : `filter-btn`"
                        @click="handleFilterClick('platform',item)"
                        :key="item.label + 'chain'">
                        {{ item.label }}
                    </be-button>
                </div>
                <span class="filter-label">
                        <span class="filter-label">{{ $t('lang.riskConfig.filter.type') }}:</span>
                    </span>
                <div v-for="(item) in filterTypeItem">
                    <be-button type="success"
                               v-if="item.val"
                               :customClass="item.isActive ? `filter-btn filter-btn-active` : `filter-btn`"
                               @click="handleFilterClick('type',item)"
                               :key="item.label + 'type'">
                        {{ item.label }}
                    </be-button>
                    <!--         占位           -->
                    <div v-else></div>
                </div>
                <span class="filter-label">
                         <span class="filter-label">{{ $t('lang.riskConfig.filter.level') }}:</span>
                    </span>
                <div v-for="(item) in filterLevelItem">
                    <be-button
                        type="success"
                        :customClass="item.isActive ? `filter-btn filter-btn-active` : `filter-btn`"
                        @click="handleFilterClick('level',item)"
                        :key="item.label + 'level'">
                        {{ item.label }}
                    </be-button>
                </div>

            </div>
        </div>
        <div class="risk-table">
            <el-table
                tooltip-effect="light"
                :data="tableData"
                v-loading="loading"
                ref="riskTrxList">
                <template #empty>
                    <div class='empty-data'>
                        <img class="img" src="@/assets/image/pc/empty-data.png" alt="">
                        <p style="line-height: 25px">{{ $t('lang.emptyData') }}</p>
                    </div>
                </template>
                <el-table-column
                    prop="platform"
                    width="140"
                    align="center">
                    <template #header>
                        <span class="table-head">{{ $t('lang.riskConfig.tableHeader.platform') }}</span>
                    </template>
                    <template #default="scope">
                        <div class="flex items-center">
                            <be-icon :icon="iconDict[scope.row.platform.toUpperCase()]"
                                     class="mr-2"
                                     width="24" height="24">
                            </be-icon>
                            {{ scope.row.platform.toUpperCase() }}
                        </div>

                    </template>
                </el-table-column>
                <el-table-column
                    prop="tx_hash"
                    width="170"
                    align="center">
                    <template #header>
                        <span class="table-head">{{ $t('lang.riskConfig.tableHeader.txHash') }}</span>
                    </template>
                    <template #default="scope">
                        <be-ellipsis-copy :targetStr="scope.row.tx_hash"
                                          fontLength="8"
                                          endLength="8">
                        </be-ellipsis-copy>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="alert_level"
                    width="120"
                    align="center">
                    <template #header>
                        <span class="table-head">{{ $t('lang.riskConfig.tableHeader.level') }}</span>
                    </template>
                    <template #default="scope">
                        <span style="font-weight: bold;color:#1CD2A9" v-if="scope.row.alert_level === 'LOW'">Low</span>
                        <span style="font-weight: bold;color:#F04735" v-if="scope.row.alert_level === 'HIGH'">High</span>
                        <span style="font-weight: bold;color:#F7B500" v-if="scope.row.alert_level === 'MEDIUM'">Medium</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="risk_features"
                    align="left">
                    <template #header>
                        <span class="table-head">{{ $t('lang.riskConfig.tableHeader.warningType') }}</span>
                    </template>
                    <template #default="scope">
                         <be-tag v-for="(item) in scope.row.tag_list"
                                 customClass="table-tag"
                                 round="4"
                                 v-if="scope.row.tag_list && scope.row.tag_list.length > 0 && scope.row.tag_list.length <= 2"
                                 :key="item">{{ item }}
                         </be-tag>
                        <be-tag v-for="(item) in scope.row.tag_list"
                                customClass="table-tag"
                                round="4"
                                v-else-if="scope.row.tag_list && scope.row.tag_list.length > 2"
                                :key="item + 4">
                            <be-ellipsis-copy :targetStr="item"
                                              :is-show-copy-btn="false"
                                              :is-ellipsis="true"
                                              styles="min-width:initial !important"
                                              fontLength="3"
                                              endLength="0">
                            </be-ellipsis-copy>
                        </be-tag>
                        <div style="display: flex;flex-direction: column;align-items: center;justify-content: center"
                             v-else>
                            {{ '/' }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="from_address"
                    width="170"
                    align="center">
                    <template #header>
                        <span class="table-head">{{ $t('lang.riskConfig.tableHeader.gainer') }}</span>
                    </template>
                    <template #default="scope">
                        <be-ellipsis-copy :targetStr="scope.row.gainer_address"
                                          v-if="!scope.row.gainer_address_tag"
                                          emptyText="/"
                                          fontLength="8"
                                          endLength="8">
                        </be-ellipsis-copy>
                        <be-ellipsis-copy :targetStr="scope.row.gainer_address_tag"
                                          :copyContent="scope.row.gainer_address"
                                          :tooltipTxt="scope.row.gainer_address"
                                          v-if="scope.row.gainer_address_tag"
                                          emptyText="/"
                                          :is-ellipsis="false"
                                          style="color: #1496F2"
                                          fontLength="8"
                                          endLength="8">
                        </be-ellipsis-copy>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="amount"
                    width="170"
                    align="center">
                    <template #header>
                        <span class="table-head">{{ $t('lang.riskConfig.tableHeader.amount') }}</span>
                    </template>
                    <template #default="scope">
                        $ {{ scope.row.amount }}
                    </template>
                </el-table-column>
                <el-table-column
                    width="120"
                    prop="tx_time"
                    align="left">
                    <template #header>
                        <span class="table-head">{{ $t('lang.riskConfig.tableHeader.txTime') }}</span>
                    </template>
                    <template #default="scope">
                        <el-tooltip placement="top" effect="light" >
                            <template #content>
                                <span >{{formatDate(createDate(scope.row.tx_time))}} UTC：{{beijing2utc(scope.row.tx_time) }}</span>
                            </template>
                            <span style="color: #888">
                                <p>{{formatDate(createDate(scope.row.tx_time)).split(' ')[0]}}</p>
                                <p>{{formatDate(createDate(scope.row.tx_time)).split(' ')[1]}}</p>
                            </span>
                        </el-tooltip>
                    </template>
                </el-table-column>
                <el-table-column
                    width="60"
                    label=" "
                    align="center">
                    <template #default="scope">
                                <div class="more-btn">
                                    <be-icon icon="more" @click="openDetail(scope.row)" width="20" height="21"></be-icon>
                                </div>
                    </template>
                </el-table-column>
            </el-table>
            <be-pagination
                layout="sizes,prev, pager,next"
                :init-func="getList"
                custom-class="table-page"
                :pageSize = 'pageParams.data.pageSize'
                :currentPage = 'pageParams.data.currentPage'
                @update:pageSize = 'pageParams.data.pageSize = $event'
                @update:currentPage = 'pageParams.data.currentPage = $event'
                :total='pageParams.data.total'
                @updatePage="pageChange"
                :is-front="false">
                <template #prev>
                        <span class="table-page-info">
                        {{ $t('lang.total') }} {{ pageParams.data.total }}</span>
                </template>
                <template #next><span></span></template>
            </be-pagination>
        </div>
    </div>
</template>

<script lang="ts">
import BePagination from "../../../components/common-components/pagination/be-pagination.vue";
import BeEllipsisCopy from "../../../components/common-components/ellipsis-copy/ellipsis-copy.vue"
import {platformListDict} from "../../../utils/platform-dict";
import {getProjWarning} from "../../../api/risk-trx";
import {defineComponent, ref, reactive, onMounted, watch, computed, WritableComputedRef} from "vue";
import {useI18n, Locale} from "vue-i18n";
import {BeButton,BeIcon,BeTag} from "../../../../public/be-ui/be-ui.es";
import {openWindow, beijing2utc, createDate, formatDate} from "../../../utils/common";
import composition from "../../../utils/mixin/common-func";

interface IFilterItem {
    label: string,
    val: string,
    isActive: boolean
}

export default defineComponent({
    name: "RiskTrxList",
    components: {BePagination, BeEllipsisCopy, BeButton,BeIcon,BeTag},
    setup(props, ctx) {
        const {t, locale} = useI18n()
        const {message} = composition(props, ctx)
        const searchParams = reactive({
            platform: [],
            addr: '',
            type: '',
            level: ''
        })
        const platformList = ref<Array<object>>([])
        const setPlatformList = (): void => {
            platformList.value = []
            platformList.value = JSON.parse(JSON.stringify(platformListDict))
            platformList.value.unshift(
                {
                    label: t('lang.projectRinking.tradeStb.all'),
                    value: 'all',
                    id: 'jhgadjghzngrgegkdfjallg'
                },
            )
        }
        onMounted(() => {
            setPlatformList()
            getList('reset')
        })
        const pageParams = reactive({
            data: {
                currentPage: 1,
                pageNum: 1,
                pageSize: 10,
                total: 0
            }
        })
        const tableData = ref<object>([])
        const loading = ref<boolean>(false)

        const localeInner = ref<WritableComputedRef<Locale>>(locale)
        watch(localeInner, () => {
            setPlatformList()
        })

        const stateSuccess = computed(() => {
            return function (val: string) {
                if (val === 'success' || val === '成功') {
                    return {
                        color: '#44D7B6'
                    }
                }
                return {
                    color: '#FA6400'
                }
            }
        })
        const stateTxt = computed(() => {
            return function (val: string) {
                if (val === 'success' || val === '成功') {
                    return t('lang.riskConfig.stateSuccess')
                }
                return t('lang.riskConfig.stateFailed')
            }
        })
        /**
         * 获取表格数据
         */
        const getList = (type?: string) => {
            // 使用loading变量防抖
            if(loading.value){
                return
            }
            loading.value = true
            if (type === 'reset') {
                pageParams.data = {
                    currentPage: 1,
                    pageNum: 1,
                    pageSize: 10,
                    total: 0
                }
            }
            const getFilterParams = (arr:Array<IFilterItem>):Array<string>=>{
                let res:Array<string> = []
                arr.map((val:IFilterItem)=>{
                    if(val.isActive){
                        res.push(val.val)
                    }
                })
                return res
            }
            let params = {
                page_num: pageParams.data.pageNum,
                page_size: pageParams.data.pageSize,
                platform: getFilterParams(filterChainItem.value),
                alert_level: getFilterParams(filterLevelItem.value),
                type: getFilterParams(filterTypeItem.value),
                param: searchParams.addr
            }
            getProjWarning(params).then(res => {
                if (res.data) {
                    tableData.value = res.data.page_infos
                    pageParams.data.total = res.data.total
                }else{
                    message('error', 'system error')
                }
                loading.value = false
            }).catch(err => {
                message('error', err.message || err)
                console.error(err)
            })
        }

        /**
         * 分页方法
         * @param {Object} item - 分页参数对象
         */
        const pageChange = (item: any): void => {
            pageParams.data.pageNum = item.currentPage
            pageParams.data.currentPage = item.currentPage
            getList()
        }
        /**
         * 打開交易分析詳情tab
         */
        const openDetail = (params: any) => {
            openWindow(`#/riskTrx/detail?tx_hash=${params.tx_hash}`)
        }
        /**
         * 筛选框选择
         */
        const filterChainItem = ref<Array<IFilterItem>>([
            {label: 'ETH', val: 'eth', isActive: false},
            {label: 'BSC', val: 'bsc', isActive: false},
            {label: 'HECO', val: 'heco', isActive: false},
            {label: 'POLYGON', val: 'polygon', isActive: false},
        ])
        const filterTypeItem = ref<Array<IFilterItem>>([
            {label: 'BlockTrade', val: 'BlockTrade', isActive: false},
            {label: 'FlashLoan', val: 'FlashLoan', isActive: false},
            {label: 'PrivilegedOperation', val: 'PrivilegedOperation', isActive: false},
            {label: '', val: '', isActive: false},
            /*{label: 'Slippage', val: 'Slippage', isActive: false},*/
        ])
        const filterLevelItem = ref<Array<IFilterItem>>([
            {label: t('lang.riskConfig.filter.dangerHigh'), val: 'High', isActive: false},
            {label: t('lang.riskConfig.filter.dangerMiddle'), val: 'Medium', isActive: false},
            {label: t('lang.riskConfig.filter.dangerLow'), val: 'Low', isActive: false},
        ])
        /**
         * 处理过滤点击
         */
        const handleFilterClick = (type: string, item: IFilterItem): void => {
            item.isActive = !item.isActive
            getList('reset')
        }
        // 币种字典
        const iconDict = {
            HT:'iconHecoEagle',
            HECO:'iconHecoEagle',
            BSC:'iconBnbEagle',
            BNB:'iconBnbEagle',
            ETH:'iconEthEagle',
            POLYGON:'iconPolygonEagle',
        }
        return {
            iconDict,
            filterChainItem,
            filterTypeItem,
            filterLevelItem,
            handleFilterClick,
            searchParams,
            pageParams,
            platformList,
            tableData,
            loading,
            stateTxt,
            stateSuccess,
            localeInner,
            setPlatformList,
            getList,
            openDetail,
            pageChange,
            beijing2utc,
            formatDate,
            createDate,
            openWindow,
        }
    },
})
</script>

<style lang="scss">
.risk-trx-list {
  position: relative;
  top: 0;
  left: 0;
  z-index: 1;
  box-sizing: border-box;
  width: 100%;
  height: auto;
  min-height: calc(100% - 100px);
  padding-bottom: 86px;

  .search-area {
    width: 67.5%;
    margin: 40px auto 0 auto;

    .risk-trx-search-input {
      display: flex;

      input::-webkit-input-placeholder { /* WebKit browsers */
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

    .risk-trx-search-filter {
      box-sizing: border-box;
      display: grid;
      grid-template-columns:100px 120px 120px 200px 100px;
      grid-gap: 20px;
      width: 100%;
      padding: 20px;
      margin-top: 36px;
      background-color: $mainColor7;
      border-radius: 4px;
      opacity: .69;

      .filter-label {
        font-weight: bold;
      }
    }

    .filter-btn {
      margin-right: 16px;
      color: $textColor11;
      background-color: transparent;

      .be-button-slot {
        font-family: AlibabaPuHuiTi-Regular, AlibabaPuHuiTi sans-serif;
      }

      &:hover {
        color: $textColor6;
        background-color: $mainColor3;
      }
    }

    .filter-btn-active {
      color: $textColor6;
      background-color: $mainColor3;
    }
  }


  .risk-table {
    width: 67.5%;
    margin: 30px auto 0 auto;

    .more-btn{
      width: 24px;
      height: 24px;
      cursor: pointer;
      border: 1px solid $textColor9;
      border-radius: 30px;

      &:hover{
        background-color: $mainColor3;
        border-color: $mainColor3;

        .be-icon {
          fill: $mainColor7;
        }
      }
    }

    /* 定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸 */

    .el-table__body-wrapper::-webkit-scrollbar {
      width: 8px;
      height: 8px;
      margin: 5px;
    }

    .table-tag{
      margin-top: 10px;
      margin-right: 10px;
      color: $mainColor3;
      background-color: $mainColor16;
      border:0;

      &:hover{
        background-color: $mainColor16-025;
      }

      .ellipsis-copy{
        min-width: initial !important;
      }
    }

    .table-page {
      display: flex;
      align-items: center;
      justify-content: flex-end;

      .table-page-info {
        margin-top: 14px;
        font-size: 14px;
        color: $textColor4;
      }

      .pagination_c {
        margin-top: 14px;
      }
    }
  }
}

</style>