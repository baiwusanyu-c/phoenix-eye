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
            <div class="complex-big-title">{{ $t('lang.projectRinking.chose') }}</div>
            <div class="complex-title">{{ $t('lang.projectRinking.choseText') }}</div>
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
                    width="180"
                    prop="contract_num"
                    :label="$t('lang.projectRinking.contractNum')"
                    align="center">
                    <template #default="scope">
                        <el-popover
                            placement="top"
                            trigger="hover"
                            v-model="scope.row.showContract_num">
                            <p v-for="item in scope.row.contract_address_list"
                               style="cursor: pointer"
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
        <!--        <router-view v-show="searching === false"></router-view>-->
    </div>
</template>

<script lang="ts">
import BePagination from "../../../components/common-components/pagination/be-pagination.vue";
import {getContractProjectTs, getProjectRankList} from "../../../api/project-ranking";
import {getUrlkey,beijing2utc,formatDate,createDate} from "../../../utils/common";
import {defineComponent} from "vue";

export default defineComponent({
    name: "ProjectRankingMain",
    components: {BePagination},
    setup(){
        return {
            beijing2utc,
            formatDate,
            createDate,
        }
    },
    data() {
        return {
            searchParams: '',
            // 搜索触发
            searching: false,
            // 搜索时返回的类型
            searchType: '',
            currentCurrency: 'all',
            tableData: [],
            loading: false,
            loadingSearch: false,
            // 获取搜索时的数据
            contractObj: {info: []},
            projectObj: {},
            // 判断搜索到的数据info数组长度是否为1
            projectOnly: true,
            // 分页参数
            pageParams: {
                currentPage: 1,
                pageNum: 1,
                pageSize: 10,
                total: 0
            },
        }
    },
    watch: {
        searchParams() {
            if (this.searchParams === '' && this.getParams === '') {
                this.projectOnly = true
                this.searchType = ''
                this.$router.push('/projectRanking')
            }
        }
    },
    computed: {
        activeClass() {
            return function (type) {
                if (this.currentCurrency === type) {
                    return 'primary'
                }
                return 'default'
            }
        },
        projectOrContractInfo() {
            if (this.searchType === 'project') {
                return this.projectObj.info
            } else if (this.searchType === 'contract') {
                return this.contractObj.info
            } else {
                return {info: []}
            }
        }
    },
    mounted() {
        const qurey = getUrlkey()
        if (qurey.project_id && qurey.type === 'outLink') {
            this.openDetailProject(qurey.project_id)
            return
        }
        if (!this.$route.query.type) {
            this.getList()
        }
    },
    methods: {
        /**
         * 搜索方法
         */
        search() {
            this.searching = true
            let params = {
                type: 'search',
                param: this.searchParams
            }
            // 从搜索框搜索，前端分不清是项目还是合约，放到param给后端判断
            this.searchDetail(params, 'search', (type) => {
                this.searchType = type
                if (type === 'contract') {
                    this.contractObj = JSON.parse(localStorage.getItem('ContractProjectTs'))
                    if (this.contractObj.info.length === 1) {
                        this.projectOnly = true
                        this.openDetailContract(this.contractObj.info[0].project_contract_id, true)
                    } else if (this.contractObj.info.length > 1) {
                        this.projectOnly = false
                    }

                } else if (type === 'project') {

                    this.projectObj = JSON.parse(localStorage.getItem('ContractProjectTs'))
                    if (this.projectObj.info.length === 1) {
                        this.projectOnly = true
                        this.openDetailProject(this.projectObj.info[0].project_id, true)
                    } else if (this.projectObj.info.length > 1) {
                        this.projectOnly = false
                    }

                }
            })
        },
        /**
         * 搜索接口调用方法
         * @param {Object} params - 参数对象
         * @param {String} type - 搜索类型
         * @param {Function} cb - 回调方法
         */
        searchDetail(params, type, cb) {
            const _this = this
            let param = JSON.parse(JSON.stringify(params))
            delete param.type
            _this.loadingSearch = true
            getContractProjectTs(param).then(res => {
                if (res.data) {
                    // 存储数据
                    _this.setStore('ContractProjectTs', JSON.stringify(res.data))
                    if (type === 'search') {
                        // 后台返回的搜索类型（合约还是项目）
                        _this.$isFunction(cb) && cb(res.data.type)
                    } else {
                        _this.$isFunction(cb) && cb()
                    }
                    _this.loadingSearch = false
                } else {
                    _this.loadingSearch = false
                    _this.$message.error('option error')
                }
            }).catch(err => {
                _this.loadingSearch = false
                _this.$message.error(err.message)
                console.error(err)
            })
        },
        /**
         * 獲取列表數據方法
         */
        getList() {
            const _this = this
            _this.loading = true
            let params = {
                page_num: this.pageParams.pageNum,
                page_size: this.pageParams.pageSize,
            }
            if (this.currentCurrency !== 'all') {
                params.platform = this.currentCurrency
            }
            getProjectRankList(params).then(res => {
                if (res) {
                    _this.tableData = res.data.page_info
                    _this.tableData.map(val => {
                        val.showContract_num = false
                    })
                    _this.pageParams.total = res.data.total
                    _this.loading = false
                }
            }).catch(err => {
                _this.loading = false
                _this.$message.error(err.message)
                console.error(err)
            })
        },
        /**
         * 按鈕組點擊篩選事件
         */
        filterClick(type) {
            this.currentCurrency = type
            this.getList()
        },
        /**
         * 分页方法
         * @param {Object} item - 分页参数对象
         */
        pageChange(item) {
            this.pageParams.pageNum = item.currentPage
            this.pageParams.currentPage = item.currentPage
            this.getList()
        },
        /**
         * 打開项目态势详情
         */
        openDetailProject(params, num) {
            let param = {
                type: 'search',
                project_id: params
            }
            if (num === true) {
                this.$router.push('/projectRanking')
            }
            this.searchDetail(param, 'click', () => this.$router.push({path: '/projectRanking/project', query: param}))
        },
        /**
         * 打開合约态势详情
         */
        openDetailContract(params, num) {
            let param = {
                type: 'search',
                project_contract_id: params //55
            }
            if (num === true) {
                this.$router.push('/projectRanking')
            }
            this.searchDetail(param, 'click', () => this.$router.push({path: '/projectRanking/contract', query: param}))
        },

        projectOrContract(o) {
            let type = this.searchType
            if (type === 'contract') {
                this.openDetailContract(o.project_contract_id)
            } else if (type === 'project') {
                this.openDetailProject(o.project_id)
            }
        }
    },
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
</style>