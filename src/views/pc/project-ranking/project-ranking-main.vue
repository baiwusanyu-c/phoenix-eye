/*
* @project-ranking-main.vue
* @deprecated
* @author czh
* @update (czh 2021/11/1)
*/
<template>
    <div class="project-ranking-main" v-loading="loadingSearch">
        <div class="project-ranking-search">
            <el-input :placeholder="$t('lang.projectRinking.searchP')" v-model="searchParams">
                <template #append>
                    <el-button type="primary" @click="search">{{ $t('lang.searchBtn') }}</el-button>
                </template>
            </el-input>
        </div>
        <div class="project-ranking-search-complex" v-show="projectOnly === false">
            <div class="complex-big-title">{{ $t('lang.projectRinking.projectChose') }}</div>
            <!-- <div class="complex-title">{{ $t('lang.projectRinking.choseText') }}</div>-->
            <div class="complex-card-class">
                <div class="complex-card" v-for="(o,index) in projectOrContractInfo" :key="index"
                     @click="projectOrContract(o)">
                    <div class="complex-card-head">
                        <div class="complex-card-title" v-if="searchType === 'contract'">{{ o.platform }}</div>
                        <div class="complex-card-contract" v-if="searchType === 'contract'">
                            {{ $t('lang.projectRinking.projectName') }}
                            <span>{{ o.project_name }}</span>
                        </div>
                        <div class="complex-card-project" v-if="searchType === 'project'">
                            <div class="complex-card-project-title">{{ $t('lang.projectRinking.projectName') }}</div>
                            <div>{{ o.project_name }}</div>
                        </div>
                    </div>
                    <div class="complex-card-footer">
                        <div style="padding-left: 23px" v-if="searchType === 'contract'">{{ o.contract_address }}</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="project-ranking-list" v-if="!$route.query.type && searchType === ''">
            <el-button-group>
                <el-button type="primary" @click="filterClick('all')" :class="activeClass('all')">
                    {{ $t('lang.projectRinking.allProJ') }}
                </el-button>
                <el-button type="primary" @click="filterClick('eth')" :class="activeClass('eth')">ETH</el-button>
                <el-button type="primary" @click="filterClick('bsc')" :class="activeClass('bsc')">BSC</el-button>
                <el-button type="primary" @click="filterClick('heco')" :class="activeClass('heco')">HECO</el-button>
                <el-button type="primary" @click="filterClick('polygon')" :class="activeClass('polygon')">POLYGON
                </el-button>
            </el-button-group>
            <el-table
                tooltip-effect="light"
                :data="tableData"
                v-loading="loading"
                ref="riskWarningList">
                <template #empty>
                    <div
                        class='empty-data'>
                        <img class="img" src="@/assets/image/pc/empty-data.png" alt="">
                        <p style="line-height: 25px">{{ $t('lang.emptyData') }}</p>
                    </div>
                </template>
                <el-table-column
                    prop="no"
                    :label="$t('lang.projectRinking.proNum')"
                    width="170"
                    align="center">
                    <template #default="scope">
                        {{ scope.row.no }}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="name"
                    :label="$t('lang.projectRinking.name')"
                    align="center">
                    <template #default="scope">
                          <span style="color: #1496F2;cursor: pointer"
                                @click="openDetailProject(scope.row.project_id)"> {{ scope.row.name || $t('lang.emptyData') }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    width="190"
                    prop="contract_num"
                    :label="$t('lang.projectRinking.contractNum')"
                    align="center">
                    <template #default="scope">
                        <el-popover
                            placement="top"
                            trigger="hover"
                            width="300"
                            v-model="scope.row.showContract_num">
                            <p v-for="item in scope.row.contract_address_list"
                               class="top-tip"
                               @click="openDetailContract(item.project_contract_id)"
                               :key="item.project_contract_id">
                                {{ item.contract_address }}
                            </p>
                            <template #reference>
                                <span style="color: #1496F2;cursor: pointer">{{ scope.row.contract_num || $t('lang.emptyData') }}</span>
                            </template>
                        </el-popover>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="safety_score"
                    width="170"
                    :label="$t('lang.projectRinking.score')"
                    align="center">
                    <template #default="scope">
                        {{ scope.row.safety_score || $t('lang.emptyData') }}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="tx_size"
                    width="170"
                    :label="$t('lang.projectRinking.txScale')"
                    align="center">
                    <template #default="scope">
                        {{ scope.row.trade_size ? '$' + scope.row.trade_size : $t('lang.emptyData') }}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="create_time"
                    :label="$t('lang.projectRinking.onlineTime')"
                    align="center">
                    <template #default="scope">
                        <el-tooltip placement="top" effect="light">
                            <template #content>
                                <span>UTC：{{ beijing2utc(scope.row.create_time) }}</span>
                            </template>
                            <span class="cursor">{{ formatDate(createDate(scope.row.create_time)) }}</span>
                        </el-tooltip>
                    </template>
                </el-table-column>
            </el-table>
            <be-pagination
                custom-class="table-page"
                :pageSize='pageParams.pageSize'
                :currentPage='pageParams.currentPage'
                :total='pageParams.total'
                @updatePage="pageChange"
                :is-front="false">
                <template #prev>
                    <span class="table-page-info">{{
                            $t('lang.total')
                        }}{{ pageParams.total }}{{ $t('lang.piece') }}</span>
                </template>
                <template #next><span></span></template>
            </be-pagination>
        </div>
        <router-view v-show="searching === false"></router-view>
    </div>
</template>

<script lang="ts">
import BePagination from "../../../components/common-components/pagination/be-pagination.vue";
import {getContractProjectTs, getProjectRankList} from "../../../api/project-ranking";
import {getUrlkey, beijing2utc, formatDate, createDate, isFunction, setStore, getStore} from "../../../utils/common";
import {computed, defineComponent, onMounted, ref, watch} from "vue";
import composition from "../../../utils/mixin/common-func";
import {IPageParam} from "../../../utils/types";
interface IProjectObj{
    info?:Array<any>
}
interface IPageParamInner extends IPageParam{
    platform?:string
}
interface IProjectOrContract{
    project_contract_id:string
    project_id:string
}
export default defineComponent({
    name: "ProjectRankingMain",
    components: {BePagination},
    setup(props,ctx){
        const {route, routerPush,message} = composition(props, ctx)
        // 搜索参数
        const searchParams = ref<string>('')
        // 判断搜索到的数据info数组长度是否为1
        const projectOnly = ref<boolean>(true)
        // 搜索时返回的类型
        const searchType = ref<string>('')
        // 搜索触发
        const searching = ref<boolean>(false)
        watch(searchParams,(nVal)=>{
            if (nVal === '' && searching.value) {
                projectOnly.value = true
                searchType.value = ''
                routerPush('/projectRanking')
            }
        })
        // 当前币种
        const currentCurrency = ref<string>('all')
        const activeClass = computed(()=>{
            return function (type:string) {
                if (currentCurrency.value === type) {
                    return 'primary'
                }
                return 'default'
            }
        })
        const projectObj = ref<IProjectObj>({})
        const projectOrContractInfo = computed(()=>{

            if (searchType.value === 'project') {
                return projectObj.value.info
            } else if (searchType.value === 'contract') {
                return contractObj.value.info
            } else {
                return {info: []}
            }
        })
        /**
         * 搜索方法
         */
        // 获取搜索时的数据
        const contractObj = ref<IProjectObj>({})
        const search = ():void=> {
            searching.value = true
            let params = {
                type: 'search',
                param: searchParams.value
            }
            // 从搜索框搜索，前端分不清是项目还是合约，放到param给后端判断
            searchDetail(params, 'search', (type:string) => {
                searchType.value = type
                let len:number | undefined = 0
                if (type === 'contract') {
                    contractObj.value = JSON.parse(getStore('ContractProjectTs') as string)
                    len = contractObj.value.info?.length
                    if (len === 1) {
                        projectOnly.value = true
                        contractObj.value.info && openDetailContract(contractObj.value.info[0].project_contract_id, true)
                    } else if (len && len > 1) {
                        projectOnly.value = false
                    }

                } else if (type === 'project') {
                    projectObj.value = JSON.parse(getStore('ContractProjectTs') as string)
                    len = projectObj.value.info?.length
                    if (len === 1) {
                        projectOnly.value = true
                        projectObj.value.info && openDetailProject(projectObj.value.info[0].project_id, true)
                    } else if (len && len > 1) {
                        projectOnly.value = false
                    }

                }
            })
        }
        /**
         * 搜索接口调用方法
         * @param {Object} params - 参数对象
         * @param {String} type - 搜索类型
         * @param {Function} cb - 回调方法
         */
        const loadingSearch = ref<boolean>(false)
        const searchDetail = (params:{type:string}, type:string, cb:Function):void =>{
            let param = JSON.parse(JSON.stringify(params))
            delete param.type
            loadingSearch.value = true
            getContractProjectTs(param).then(res => {
                if (res.data) {
                    // 存储数据
                    setStore('ContractProjectTs', JSON.stringify(res.data))
                    if (type === 'search') {
                        // 后台返回的搜索类型（合约还是项目）
                        isFunction(cb) && cb(res.data.type)
                    } else {
                        isFunction(cb) && cb()
                    }
                    loadingSearch.value = false
                } else {
                    loadingSearch.value = false
                    message('error', 'option error')
                }
            }).catch(err => {
                loadingSearch.value = false
                message('error', err.message || err)
                console.error(err)
            })
        }
        /**
         * 獲取列表數據方法
         */
        const loading = ref<boolean>(false)
        const tableData = ref<Array<any>>([])
        const getList = ():void =>{
            loading.value = true
            let params:IPageParamInner = {
                page_num: pageParams.value.pageNum,
                page_size: pageParams.value.pageSize,
            }
            if (currentCurrency.value !== 'all') {
                params.platform = currentCurrency.value
            }
            getProjectRankList(params).then(res => {
                if (res) {
                    tableData.value = res.data.page_info
                    tableData.value.map(val => {
                        val.showContract_num = false
                    })
                   pageParams.value.total = res.data.total
                    loading.value = false
                }
            }).catch(err => {
                loading.value = false
                message('error', err.message || err)
                console.error(err)
            })
        }
        /**
         * 按鈕組點擊篩選事件
         */
        const filterClick = (type:string):void =>{
            currentCurrency.value = type
            getList()
        }
        /**
         * 分页方法
         * @param {Object} item - 分页参数对象
         */
        const pageParams = ref<IPageParam>({
            currentPage: 1,
            pageNum: 1,
            pageSize: 10,
            total: 0
        })
        const pageChange = (item:IPageParam) :void =>{
            pageParams.value.pageNum = item.currentPage
            pageParams.value.currentPage = item.currentPage
            getList()
        }
        /**
         * 打開项目态势详情
         */
        const openDetailProject = (params:string, num?:boolean) :void =>{
            let param = {
                type: 'search',
                project_id: params
            }
            if (num === true) {
                routerPush('/projectRanking')
            }
            searchDetail(param, 'click', () => routerPush('/projectRanking/project',param))
        }
        /**
         * 打開合约态势详情
         */
        const openDetailContract = (params:string, num?:boolean):void =>{
            let param = {
                type: 'search',
                project_contract_id: params //55
            }
            if (num === true) {
                routerPush('/projectRanking')
            }
            searchDetail(param, 'click', () => routerPush('/projectRanking/contract', param))
        }

        const projectOrContract = (o:IProjectOrContract):void =>{
            let type = searchType.value
            if (type === 'contract') {
                openDetailContract(o.project_contract_id,true)
            } else if (type === 'project') {
                openDetailProject(o.project_id,true)
            }
        }

        onMounted(()=>{
            const qurey = getUrlkey()
            if (qurey.project_id && qurey.type === 'outLink') {
                openDetailProject(qurey.project_id)
                return
            }
            if (!route.query.type) {
               getList()
            }
        })
        return {
            search,
            searchDetail,
            getList,
            filterClick,
            pageChange,
            openDetailProject,
            openDetailContract,
            projectOrContract,
            pageParams,
            activeClass,
            loading,
            loadingSearch,
            projectOrContractInfo,
            currentCurrency,
            projectObj,
            searchParams,
            searching,
            projectOnly,
            searchType,
            tableData,
            beijing2utc,
            formatDate,
            createDate,
        }
    }
})

</script>

<style lang="scss">
.project-ranking-main {
  width: 100%;
  height: 100%;

  .project-ranking-search {
    display: flex;
    align-items: center;
    justify-content: center;

    /* height: 20%; */
    height: 15%;

    .el-input-group {
      width: 70%;
      margin-bottom: 30px;
    }

    .el-input__inner {
      height: 45px;
      line-height: 45px;
    }

    .el-input-group__append {
      width: 120px;
      height: 45px;
      padding: 0;
      color: $mainColor7;
      text-align: center;
      background: $mainColor3-08;
      opacity: .8;

      button {
        width: 100%;
        height: 100%;
      }

      &:hover {
        background: $mainColor3;
      }
    }
  }

  .project-ranking-search-complex {
    display: flex;
    flex-direction: column;
    align-items: center;

    .complex-big-title {
      font-size: 24px;
      font-weight: 500;
      line-height: 24px;
      color: #333;
    }

    .complex-title {
      margin-top: 8px;
      font-size: 14px;
      font-weight: 400;
      line-height: 24px;
      color: #777;
    }

    .complex-card-class {
      display: grid;
      flex-direction: row;
      grid-template-columns: 1fr 1fr;
      grid-column-gap: 24px;
      width: 100%;
      margin-top: 16px;
      margin-bottom: 16px;
    }

    .complex-card {
      width: 100%;
      height: 100px;
      margin-top: 16px;
      margin-bottom: 16px;
      overflow-x: hidden;
      cursor: pointer;
      background: #FFF;
      border-radius: 4px;

      .complex-card-head {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        width: 100%;
        margin: 18px 0 10px;

        .complex-card-title {
          height: 32px;
          padding-left: 23px;
          font-size: 24px;
          font-weight: 500;
          line-height: 32px;
          color: #333;
        }

        .complex-card-project {
          height: 32px;
          padding: 0 23px;
          font-size: 24px;
          font-weight: 500;
          line-height: 32px;
          color: #333;

          .complex-card-project-title {
            font-size: 18px;
            font-weight: 400;
            color: #777;
          }
        }

        .complex-card-contract {
          height: 24px;
          padding: 0 23px;
          font-size: 14px;
          font-weight: 400;
          line-height: 24px;
          color: #777;
        }
      }

      .complex-card-footer {
        width: 100%;
        height: 24px;
        font-size: 14px;
        font-weight: 400;
        line-height: 24px;
        color: #777;
      }
    }
  }

  .project-ranking-list {
    box-sizing: border-box;
    padding: 20px;
    background-color: $mainColor7;

    .table-page {
      display: flex;
      align-items: center;
      justify-content: flex-end;

      .table-page-info {
        margin-top: 20px;
        font-size: 14px;
        color: $textColor4;
      }
    }
  }
}

.top-tip {
  margin-bottom: 5px;
  line-height: 25px;
  cursor: pointer;

  &:hover {
    background-color: #F5F7FA;
  }
}
</style>