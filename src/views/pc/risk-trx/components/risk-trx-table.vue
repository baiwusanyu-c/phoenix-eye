/*
* @risk-trx-table.vue
* @deprecated
* @author czh
* @update (czh 2022/2/25)
*/
<template>
    <div class="risk-table-inner eagle-table">
        <el-table
            tooltip-effect="light"
            :data="tableData"
            v-loading="loading"
            @row-click="openDetail"
            ref="riskTrxList">
            <template #empty>
                <div class='empty-data'>
                    <img class="img" src="@/assets/image/pc/empty-data.png" alt="">
                    <p style="line-height: 25px">{{ $t('lang.emptyData') }}</p>
                </div>
            </template>
            <el-table-column
                prop="platform"
                :width="tableHeader('platform')"
                :fixed="tableData.length > 0 ? 'left' :'null'"
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
                :width="tableHeader('tx_hash')"
                align="center">
                <template #header>
                    <span class="table-head">{{ $t('lang.riskConfig.tableHeader.txHash') }}</span>
                </template>
                <template #default="scope">
                    <be-ellipsis-copy :targetStr="scope.row.tx_hash"
                                      :is-show-copy-btn="false"
                                      fontLength="7"
                                      endLength="7">
                    </be-ellipsis-copy>
                </template>
            </el-table-column>
            <el-table-column
                prop="alert_level"
                :width="tableHeader('alert_level')"
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
                :width="tableHeader('risk_features')"
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
                :width="tableHeader('from_address')"
                align="left">
                <template #header>
                    <span class="table-head">{{ $t('lang.riskConfig.tableHeader.gainer') }}</span>
                </template>
                <template #default="scope">
                    <be-ellipsis-copy :targetStr="scope.row.gainer_address"
                                      :is-show-copy-btn="false"
                                      v-if="!scope.row.gainer_address_tag"
                                      emptyText="/"
                                      fontLength="8"
                                      endLength="8">
                    </be-ellipsis-copy>
                    <be-ellipsis-copy :targetStr="scope.row.gainer_address_tag"
                                      :is-show-copy-btn="false"
                                      :tooltipTxt="scope.row.gainer_address"
                                      v-if="scope.row.gainer_address_tag"
                                      emptyText="/"
                                      :is-ellipsis="scope.row.gainer_address_tag.length > 16 ? true : false"
                                      style="color: #1496F2;"
                                      fontLength="8"
                                      endLength="8">
                        <template #content>
                            <p style="text-align: center">{{scope.row.gainer_address}}</p>
                            <p style="text-align: center" v-if="scope.row.gainer_address_tag.length > 16">{{scope.row.gainer_address_tag}}</p>
                        </template>
                    </be-ellipsis-copy>
                </template>
            </el-table-column>
            <el-table-column
                prop="amount"
                :width="tableHeader('amount')"
                align="center">
                <template #header>
                    <span class="table-head">{{ $t('lang.riskConfig.tableHeader.amount') }}</span>
                </template>
                <template #default="scope">
                    {{ isEmpty(scope.row.amount,'/') === '/' ? '/' : `$ ${scope.row.amount}`}}
                </template>
            </el-table-column>
            <el-table-column
                :width="tableHeader('tx_time')"
                fixed="right"
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
                v-if="showOperation"
                width="50"
                label=" "
                fixed="right"
                align="center">
                <template #default="scope">
                    <div class="more-btn">
                        <be-icon icon="more" width="20" height="21"></be-icon>
                    </div>
                </template>
            </el-table-column>
        </el-table>
        <be-pagination
            v-if="showPager"
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
</template>

<script lang="ts">
import {defineComponent, onMounted, reactive, ref,PropType,nextTick,computed} from "vue";
import {getProjWarning} from "../../../../api/risk-trx";
import {openWindow,beijing2utc, createDate, formatDate} from "../../../../utils/common";
import {IFilterItem} from "../risk-trx-list.vue";
import composition from "../../../../utils/mixin/common-func";
import {BeButton,BeIcon,BeTag} from "../../../../../public/be-ui/be-ui.es";
import BePagination from "../../../../components/common-components/pagination/be-pagination.vue";
import BeEllipsisCopy from "../../../../components/common-components/ellipsis-copy/ellipsis-copy.vue"
import {iconDict} from '../../../../utils/platform-dict'
import {IOption} from "../../../../utils/types";
export default defineComponent({
    name: "risk-trx-table",
    components:{
        BeButton,
        BeIcon,
        BeTag,
        BePagination,
        BeEllipsisCopy,
    },
    props:{
        projectId:{
            type:String,
            default:''
        },
        searchParams:{
            type:String,
            default:''
        },
        showOperation:{
            type:Boolean,
            default:true
        },
        showPager:{
            type:Boolean,
            default:true
        },
        filterChainItem:{
            type: Array as PropType<IFilterItem[]>,

        },
        filterLevelItem:{
            type: Array as PropType<IFilterItem[]>,

        },
        filterTypeItem:{
            type: Array as PropType<IFilterItem[]>,
        },
    },
    setup(props, ctx){
        const {message,isEmpty} = composition(props, ctx)
        const tableData = ref<object>([])
        const loading = ref<boolean>(false)
        const pageParams = reactive({
            data: {
                currentPage: 1,
                pageSize: 10,
                total: 0
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
                    pageSize: 10,
                    total: 0
                }
            }
            const getFilterParams = (arr:Array<IFilterItem>=[]):Array<string>=>{
                let res:Array<string> = []
                arr.map((val:IFilterItem)=>{
                    if(val.isActive){
                        res.push(val.val)
                    }
                })
                return res
            }
            let params = {
                page_num: pageParams.data.currentPage,
                page_size: pageParams.data.pageSize,
                project_id:props.projectId,
                platform: getFilterParams(props.filterChainItem),
                alert_level: getFilterParams(props.filterLevelItem),
                type: getFilterParams(props.filterTypeItem),
                param: props.searchParams
            }
            getProjWarning(params).then(res => {

                if(!res){
                   // loading.value = false
                   // location.validateEmail()
                    return
                }
                if (res.data) {
                    tableData.value = res.data.page_infos
                    pageParams.data.total = res.data.total
                }else{
                    tableData.value = []
                    pageParams.data = {
                        currentPage: 1,
                        pageSize: 10,
                        total: 0
                    }
                   // message('error', 'system error')
                }
                loading.value = false
            }).catch(err => {
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
            pageParams.data.currentPage = item.currentPage
            getList()
        }
        /**
         * 打開交易分析詳情tab
         */
        const openDetail = (params: any) => {
            openWindow(`#/riskTrx/detail?tx_hash=${params.tx_hash}`)
        }
        let tableHeader = computed(()=>{
            let headerDict:IOption = {
                platform:"130",
                tx_hash:"170",
                alert_level:"110",
                risk_features:"400",
                from_address:"200",
                amount:"100",
                tx_time:"100"
            }
            return function (key:string){
                return headerDict[key]
            }
        })
        onMounted(() => {
            getList('reset')
            })

        return {
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
    }
})
</script>

<style lang="scss">
.risk-table-inner {

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
}

</style>