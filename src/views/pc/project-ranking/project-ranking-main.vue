/*
* @project-ranking-main.vue
* @deprecated
* @author czh
* @update (czh 2021/11/1)
*/
<template>
    <div class="project-ranking-main">
        <div class="project-ranking-search">
            <el-input :placeholder="$t('el.projectRinking.searchP')" v-model="searchParams">
                <template slot="append">
                    <el-button type="primary" @click="search" >{{ $t('el.searchBtn') }}</el-button>
                </template>
            </el-input>
        </div>
        <div class="project-ranking-list" v-if="!$route.query.type">
            <el-button-group>
                <el-button type="primary" @click = "filterClick('all')" :class="activeClass('all')">{{ $t('el.projectRinking.allProJ') }}</el-button>
                <el-button type="primary" @click = "filterClick('eth')" :class="activeClass('eth')">ETH</el-button>
                <el-button type="primary" @click = "filterClick('bsc')" :class="activeClass('bsc')">BSC</el-button>
                <el-button type="primary" @click = "filterClick('heco')" :class="activeClass('heco')">HECO</el-button>
                <el-button type="primary" @click = "filterClick('polygon')" :class="activeClass('polygon')">POLYGON</el-button>
            </el-button-group>
            <el-table
                tooltip-effect="light"
                :data="tableData"
                v-loading="loading"
                ref="riskWarningList">
                <div slot="empty"
                     class = 'empty-table'>
                    <img class="img" src="@/assets/image/pc/empty-data.png" alt="">
                    <p style="line-height: 25px">{{$t('el.emptyData')}}</p>
                </div>
                <el-table-column
                    prop="no"
                    :label="$t('el.projectRinking.proNum')"
                    width="170"
                    align="center">
                    <template slot-scope="scope">
                        {{scope.row.no}}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="name"
                    :label="$t('el.projectRinking.name')"
                    align="center">
                    <template slot-scope="scope">
                          <span style="color: #1496F2;cursor: pointer"
                                @click="openDetail(scope.row.project_id)"> {{scope.row.name}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    width="100"
                    prop="contract_num"
                    :label="$t('el.projectRinking.contractNum')"
                    align="center">
                    <template slot-scope="scope">
                        {{scope.row.contract_num}}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="safety_score"
                    width="170"
                    :label="$t('el.projectRinking.score')"
                    align="center">
                    <template slot-scope="scope">
                        {{scope.row.safety_score}}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="tx_size"
                    width="170"
                    :label="$t('el.projectRinking.txScale')"
                    align="center" >
                    <template slot-scope="scope">
                        {{scope.row.safety_score}}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="create_time"
                    :label="$t('el.projectRinking.onlineTime')"
                    align="center">
                    <template slot-scope="scope">
                        <el-tooltip placement="top" effect="light">
                            <span slot="content">UTC：{{beijing2utc(scope.row.create_time)}}</span>
                            <span class="cursor">{{formatDate($createDate(scope.row.create_time))}}</span>
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
                <span slot="prev" class="table-page-info">共计{{pageParams.total}}条</span>
                <span slot="next"></span>
            </be-pagination>
        </div>
       <router-view></router-view>
    </div>
</template>

<script>
import BePagination from "../../../components/common-components/pagination/be-pagination";
import {getContractProjectTs, getProjectRankList} from "../../../api/project-ranking";

export default {
    name: "ProjectRankingMain",
    components: {BePagination},
    data() {
        return {
            searchParams:'',
            currentCurrency:'all',
            tableData:[],
            loading:false,
            // 分页参数
            pageParams:{
                currentPage: 1,
                pageNum: 1,
                pageSize: 5,
                total: 0
            },
        }
    },
    computed:{
        activeClass() {
            return function (type){
                if(this.currentCurrency === type){
                    return 'primary'
                }
                return 'default'
            }
        }
    },
    mounted() {
        if(!this.$route.query.type){
            this.getList()
        }
    },
    methods: {
        /**
         * 搜索方法
         */
        search(){
            let params = {
                type:'search',
                param:this.searchParams
            }
            this.$router.push({path: `/projectRanking/contract`, query: params})
            return
            // 从搜索框搜索，前端分不清是项目还是合约，放到param给后端判断
            this.searchDetail(params,'search',(type)=>{
                this.$router.push({path: `/projectRanking/${type}`, query: params})
            })
        },
        /**
         * 搜索接口调用方法
         * @param {Object} params - 参数对象
         * @param {String} type - 搜索类型
         * @param {Function} cb - 回调方法
         */
        searchDetail(params,type,cb=()=>{}){
            const _this = this
            getContractProjectTs(params).then(res=>{
                if(res){
                    // 存储数据
                    _this.setStore('ContractProjectTs',JSON.stringify(res.data))
                    if(type === 'search'){
                        // 后台返回的搜索类型（合约还是项目）
                        cb(res.type)
                    }else{
                        cb()
                    }
                }
            }).catch(err=>{
                _this.$message.error(err.message)
                console.error(err)
            })
        },
        /**
         * 獲取列表數據方法
         */
        getList(){
            const _this = this
            _this.loading = true
            let params = {
                page_num:this.pageParams.pageNum,
                page_size:this.pageParams.pageSize,
            }
            if(this.currentCurrency !== 'all'){
                params.platform = this.currentCurrency
            }
            getProjectRankList(params).then(res=>{
                if(res){
                    _this.tableData = res.data.page_infos
                    _this.pageParams.total =  res.data.total
                    _this.loading = false
                }
            }).catch(err=>{
                _this.$message.error(err.message)
                console.error(err)
            })
        },
        /**
         * 按鈕組點擊篩選事件
         */
        filterClick(type){
            this.currentCurrency = type
            this.getList()
        },
        /**
         * 分页方法
         * @param {Object} item - 分页参数对象
         */
        pageChange(item){
            this.pageParams.pageNum = item.currentPage
            this.pageParams.currentPage = item.currentPage
            this.getList()
        },
        /**
         * 打開项目态势详情
         */
        openDetailProject(params){
            let param = {
                type:'search',
                project_id:params
            }
            this.searchDetail(param,'click',this.$router.push({path: '/projectRanking/project', query: param}))
        },
        /**
         * 打開合约态势详情
         */
        openDetailContract(params){
            let param = {
                type:'search',
                contract_address_id:params
            }
            this.searchDetail(param,'click',this.$router.push({path: '/projectRanking/contract', query: param}))
        }
    },
}
</script>

<style lang="scss">
.project-ranking-main {
    width: 100%;
    height: 100%;

    .project-ranking-search {
        display: flex;
        justify-content: center;
        align-items: center;
        /*height: 20%;*/
        height: 15%;
        .el-input-group{
            width: 70%;
            margin-bottom: 30px;
        }
        .el-input__inner{
            height: 45px;
            line-height: 45px;
        }
        .el-input-group__append{
            opacity: 0.8;
            background: $mainColor3-08;
            color: $mainColor7;
            width: 80px;
            text-align: center;
            &:hover{
                background: $mainColor3;
            }
        }
    }
    .project-ranking-list{
        padding: 20px;
        box-sizing: border-box;
        background-color: $mainColor7;
        .table-page {
            display: flex;
            justify-content: flex-end;
            align-items: center;
            .table-page-info {
                font-size: 14px;
                margin-top: 20px;
                color: $textColor4;
            }
        }
    }
}
</style>