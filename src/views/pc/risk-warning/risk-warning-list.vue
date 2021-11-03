/*
* @risk-warning-list.vue
* @deprecated
* @author czh
* @update (czh 2021/11/2)
*/
<template>
    <div class="risk-warning-list">
        <div class="search-area">
            <div>
                {{ $t('lang.riskConfig.platform') }}:
                <el-select v-model="searchParams.platform" :placeholder="$t('lang.riskConfig.platformP')">
                    <el-option v-for="(item) in platformList"
                               :key="item.label + item.value"
                               :value="item.value"
                               :label="item.label">
                    </el-option>
                </el-select>
            </div>
            <div class="search-area search-area-input">
                <el-input autocomplete="off" :placeholder="$t('lang.riskConfig.searchP')" v-model="searchParams.addr">
                </el-input>
                <el-button class="primary" type="primary" @click="getData">{{ $t('lang.riskConfig.searchBtn') }}</el-button>
            </div>
        </div>
        <div class="risk-table">
            <el-table
                tooltip-effect="light"
                :data="tableData"
                ref="riskWarningList">
                <div slot="empty"
                     class = 'empty-table'>
                    <img class="img" src="@/assets/image/pc/empty-data.png" alt="">
                    <p style="line-height: 25px">{{$t('lang.emptyData')}}</p>
                </div>
                <el-table-column
                    prop="platform"
                    :label="$t('lang.riskConfig.platform')"
                    width="180"
                    align="center">
                    <template slot-scope="scope">
                        {{scope.row.platform}}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="txHash"
                    :label="$t('lang.riskConfig.tableHeader.txHash')"
                    width="220"
                    align="center">
                    <template slot-scope="scope">
                        <be-ellipsis-copy :targetStr="scope.row.txHash"
                                          fontLength="10"
                                          endLength="10">
                        </be-ellipsis-copy>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="txTime"
                    :label="$t('lang.riskConfig.tableHeader.txTime')"
                    align="center">
                    <template slot-scope="scope">
                        <span>{{formatDate($createDate(scope.row.txTime))}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    width="100"
                    prop="state"
                    :label="$t('lang.riskConfig.tableHeader.state')"
                    align="center">
                    <template slot-scope="scope">
                        <span :style="stateSuccess(scope.row.state)">
                            {{stateTxt(scope.row.state)}}
                        </span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="from"
                    :label="$t('lang.riskConfig.tableHeader.from')"
                    align="center">
                    <template slot-scope="scope">
                        <be-ellipsis-copy :targetStr="scope.row.from"
                                          fontLength="8"
                                          endLength="8">
                        </be-ellipsis-copy>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="to"
                    :label="$t('lang.riskConfig.tableHeader.to')"
                    align="center"
                    show-overflow-tooltip>
                    <template slot-scope="scope">
                        <be-ellipsis-copy :targetStr="scope.row.to"
                                          v-if="!scope.row.tag"
                                          fontLength="8"
                                          endLength="8">
                        </be-ellipsis-copy>
                        <span style="color: #1496F2" v-if="scope.row.tag">{{scope.row.tag}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="warningType"
                    :label="$t('lang.riskConfig.tableHeader.warningType')"
                    align="center">
                    <template slot-scope="scope">
                        <el-tag v-for="item in scope.row.warningType"
                                style="margin-top: 10px"
                                :key="item">{{item}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="score"
                    :label="$t('lang.riskConfig.tableHeader.score')"
                    align="center"
                    show-overflow-tooltip>
                    <template slot-scope="scope">
                        {{scope.row.score}}
                    </template>
                </el-table-column>
                <el-table-column
                    :label="$t('lang.riskConfig.tableHeader.detail')"
                    align="center">
                    <template slot-scope="scope">
                        <span style="color: #1496F2;cursor: pointer"
                              @click="openDetail"
                              v-if="scope.row.state === 'failed'">查看 >></span>
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
    </div>
</template>

<script>
import BePagination from "../../../components/common-components/pagination/be-pagination";
import qs from 'qs'
export default {
    name: "risk-warning-list",
    components: {BePagination},
    data() {
        return {
            // 搜索参数
            searchParams: {
                platform: 'eth',
                addr: ''
            },
            // 分页参数
            pageParams:{
                currentPage: 1,
                pageNum: 1,
                pageSize: 5,
                total: 0
            },
            // 下拉列表币种
            platformList: [
                {
                    label: 'BTC',
                    value: 'btc'
                },
                {
                    label: 'ETH',
                    value: 'eth'
                },
                {
                    label: 'TRX',
                    value: 'tron'
                }, {
                    label: 'BSC',
                    value: 'bsc'
                }, {
                    label: 'HECO',
                    value: 'heco'
                }
            ],
            // 表格数据
            tableData:[]
        }
    },
    computed:{
        stateSuccess(){
            return function (val){
                if(val !== 'success'){
                    return {
                        color:'#FA6400'
                    }
                }
                return {
                    color:'#44D7B6'
                }
            }
        },
        stateTxt(){
            return function (val){
                if(val !== 'success'){
                    return this.$t('lang.riskConfig.stateFailed')
                }
                return this.$t('lang.riskConfig.stateSuccess')
            }
        }
    },
    mounted() {
        this.getData()
    },
    methods: {
        /**
         * 获取表格数据
         */
        getData() {
            this.tableData = [
                {
                    txHash:'0xf1fae42f35dbe8b1d2d135cca9a9bd99e590519c76e5d024e3b3813f138e3444',
                    platform: 'BSC',
                    txTime:'2019-12-23 14:07:23',
                    from:'0xb0d2c76ddeeea50e88a5170562ba834243339efa',
                    to:'0x6488aa4d1955ee33403f8ccb1d4de5fb97c7ade2',
                    tag:'AAVE',
                    score:'20',
                    state:'success',
                    warningType:['疑似闪电贷攻击','疑似重入攻击'],
                },
                {
                    txHash:'0xf1fae42f35dbe8b1d2d135cca9a9bd99e590519c76e5d024e3b3813f138e3444',
                    platform: 'BSC',
                    txTime:'2019-12-23 14:07:23',
                    from:'0xb0d2c76ddeeea50e88a5170562ba834243339efa',
                    to:'0x6488aa4d1955ee33403f8ccb1d4de5fb97c7ade2',
                    state:'failed',
                    tag:'',
                    score:'12',
                    warningType:['疑似闪电贷攻击','疑似重入攻击'],
                },
            ]
            this.pageParams.total =  this.tableData.length
        },
        /**
         * 分页方法
         */
        pageChange(){

        },
        /**
         * 打開交易分析詳情tab
         */
        openDetail(){
            let params = {}
            this.$openWindow(`#/riskWarning/detail?${qs.stringify(params)}`, 'view_window')
        }
    },
}
</script>

<style lang="scss">
.risk-warning-list {
    height: 100%;
    width: 100%;
    background: $mainColor7;
    padding: 24px;
    box-sizing: border-box;

    .search-area {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .search-area-input {
        width: 40%;

        .el-input {
            input {
                border-right: 0 !important;
                border-radius: 3px 0 0 3px;
            }
        }
        .primary {
            height: 40px;
            line-height: 40px;
            border-radius: 0 3px 3px 0;
        }
    }
    .risk-table{
        margin-top: 30px;
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