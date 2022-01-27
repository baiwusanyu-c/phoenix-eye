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
                {{ $t('el.riskConfig.platform') }}:
                <el-select v-model="searchParams.platform"
                            @change="getList('reset')"
                           :placeholder="$t('el.riskConfig.platformP')">
                    <el-option v-for="(item) in platformList"
                               :key="item.id"
                               :value="item.value"
                               :label="item.label">
                    </el-option>
                </el-select>
            </div>
            <div class="search-area search-area-input">
                <el-input autocomplete="off" :placeholder="$t('el.riskConfig.searchP')" v-model="searchParams.addr">
                </el-input>
                <el-button class="primary" type="primary" @click="getList('reset')">{{ $t('el.searchBtn') }}</el-button>
            </div>
        </div>
        <div class="risk-table">
            <el-table
                tooltip-effect="light"
                :data="tableData"
                v-loading="loading"
                height="680"
                ref="riskWarningList">
                <div slot="empty"
                     class = 'empty-table'>
                    <img class="img" src="@/assets/image/pc/empty-data.png" alt="">
                    <p style="line-height: 25px">{{$t('el.emptyData')}}</p>
                </div>
                <el-table-column
                    prop="platform"
                    :label="$t('el.riskConfig.tableHeader.platform')"
                    width="120"
                    align="center">
                    <template slot-scope="scope">
                        {{scope.row.platform.toUpperCase()}}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="tx_hash"
                    :label="$t('el.riskConfig.tableHeader.txHash')"
                    width="170"
                    align="center">
                    <template slot-scope="scope">
                        <be-ellipsis-copy :targetStr="scope.row.tx_hash"
                                          :emptyText="$t('el.emptyData')"
                                          fontLength="8"
                                          endLength="8">
                        </be-ellipsis-copy>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="tx_time"
                    :label="$t('el.riskConfig.tableHeader.txTime')"
                    align="center">
                    <template slot-scope="scope">
                        <el-tooltip placement="top" effect="light">
                            <span slot="content">UTC：{{beijing2utc(scope.row.tx_time)}}</span>
                            <span class="cursor">{{formatDate($createDate(scope.row.tx_time))}}</span>
                        </el-tooltip>
                    </template>
                </el-table-column>
                <el-table-column
                    width="180"
                    prop="tx_status"
                    :label="$t('el.riskConfig.tableHeader.state')"
                    align="center">
                    <template slot-scope="scope">
                        <span :style="stateSuccess(scope.row.tx_status)">
                            {{stateTxt(scope.row.tx_status)}}
                        </span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="from_address"
                    width="170"
                    :label="$t('el.riskConfig.tableHeader.from')"
                    align="center">
                    <template slot-scope="scope">
                        <be-ellipsis-copy :targetStr="scope.row.from_address"
                                          v-if="!scope.row.from_address_tag"
                                          :emptyText="$t('el.emptyData')"
                                          fontLength="8"
                                          endLength="8">
                        </be-ellipsis-copy>
                        <be-ellipsis-copy :targetStr="scope.row.from_address_tag"
                                          :copyContent="scope.row.from_address"
                                          :tooltipTxt="scope.row.from_address"
                                          v-if="scope.row.from_address_tag"
                                          :emptyText="$t('el.emptyData')"
                                          :is-ellipsis="false"
                                          style="color: #1496F2"
                                          fontLength="8"
                                          endLength="8">
                        </be-ellipsis-copy>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="to_address"
                    width="170"
                    :label="$t('el.riskConfig.tableHeader.to')"
                    align="center" >
                    <template slot-scope="scope">
                        <be-ellipsis-copy :targetStr="scope.row.to_address"
                                          v-if="!scope.row.to_address_tag"
                                          fontLength="8"
                                          :emptyText="$t('el.emptyData')"
                                          endLength="8">
                        </be-ellipsis-copy>
                        <be-ellipsis-copy :targetStr="scope.row.to_address_tag"
                                          :tooltipTxt="scope.row.to_address"
                                          :copyContent="scope.row.to_address"
                                          v-if="scope.row.to_address_tag"
                                          :is-ellipsis="false"
                                          style="color: #1496F2"
                                          :emptyText="$t('el.emptyData')"
                                          fontLength="8"
                                          endLength="8">
                        </be-ellipsis-copy>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="risk_features"
                    :label="$t('el.riskConfig.tableHeader.warningType')"
                    align="center">
                    <template slot-scope="scope">
                        <div style="display: flex;flex-direction: column;justify-content: center;align-items: center"
                             v-if="scope.row.risk_features && scope.row.risk_features.length > 0 ">
                            <el-tag v-for="item in scope.row.risk_features"
                                    style="margin-top: 10px;width: min-content;"
                                    :key="item">{{item}}</el-tag>
                        </div>
                        <div style="display: flex;flex-direction: column;justify-content: center;align-items: center" v-else>
                            {{ $t('el.emptyData') }}</div>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="risk_score"

                    :label="$t('el.riskConfig.tableHeader.score')"
                    align="center"
                    show-overflow-tooltip>
                    <template slot-scope="scope">
                        <span style="font-weight: bold">{{scope.row.risk_score || $t('el.emptyData')}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    width="100"
                    :label="$t('el.riskConfig.tableHeader.detail')"
                    align="center">
                    <template slot-scope="scope">
                        <span style="color: #1496F2;cursor: pointer"
                              @click="openDetail(scope.row)">{{ $t('el.scan') }} >></span>
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
                <span slot="prev" class="table-page-info">{{ $t('el.total') }}{{pageParams.total}}{{ $t('el.piece') }}</span>
                <span slot="next"></span>
            </be-pagination>
        </div>
    </div>
</template>

<script>
import BePagination from "../../../components/common-components/pagination/be-pagination";
import {platformListDict} from "../../../utils/platformDict";
import {getProjWarning} from "../../../api/risk-warning";
export default {
    name: "risk-warning-list",
    components: {BePagination},
    data() {
        return {
            // 搜索参数
            searchParams: {
                platform: 'all',
                addr: ''
            },
            // 分页参数
            pageParams:{
                currentPage: 1,
                pageNum: 1,
                pageSize: 10,
                total: 0
            },
            // 下拉列表币种
            platformList: [],
            // 表格数据
            tableData:[],
            // loading
            loading:false,
        }
    },
    watch:{
        listenLang:function(){
            this.platformList = JSON.parse(JSON.stringify(platformListDict))
            this.platformList.unshift(
                {
                    label: this.$t('el.projectRinking.tradeStb.all'),
                    value: 'all',
                    id:'jhgadjghzngrgegkdfjallg'
                },
            )
        }
    },
    computed:{
        listenLang() {
            return this.$i18n.locale;
        },
        stateSuccess(){
            return function (val){
                if(val === 'success' || val === '成功' ){
                    return {
                        color:'#44D7B6'
                    }
                }
                return {
                    color:'#FA6400'
                }
            }
        },
        stateTxt(){
            return function (val){
                if(val === 'success' || val === '成功' ){
                    return this.$t('el.riskConfig.stateSuccess')
                }
                return this.$t('el.riskConfig.stateFailed')
            }
        }
    },
    created() {
      this.platformList = JSON.parse(JSON.stringify(platformListDict))
      this.platformList.unshift(
           {
               label: this.$t('el.projectRinking.tradeStb.all'),
               value: 'all',
               id:'jhgadjghzngrgegkdfjallg'
           },
       )
    },
    mounted() {
        this.getList()
    },
    methods: {
        /**
         * 获取表格数据
         */
        getList(type) {
            const _this = this
            _this.loading = true
            if(type === 'reset'){
                this.pageParams = {
                    currentPage: 1,
                        pageNum: 1,
                        pageSize: 10,
                        total: 0
                }
            }
            let params = {
                page_num:this.pageParams.pageNum,
                page_size:this.pageParams.pageSize,
                platform:this.searchParams.platform === 'all' ? '' : this.searchParams.platform,
                param:this.searchParams.addr
            }
            getProjWarning(params).then(res=>{
                if(res){
                    _this.tableData = res.data.page_infos
                    _this.pageParams.total =  res.data.total
                    _this.loading = false
                }
            }).catch(err=>{
                _this.$message.error(err)
                console.error(err)
            })
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
         * 打開交易分析詳情tab
         */
        openDetail(params){
            this.$openWindow(`#/riskWarning/detail?tx_hash=${params.tx_hash}`, 'view_window')
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
        /*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
        .el-table__body-wrapper::-webkit-scrollbar
        {
            margin: 5px;
            width: 8px;
            height: 8px;
        }

        /*定义滚动条轨道*/
        .el-table__body-wrapper::-webkit-scrollbar-track
        {
            //   -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
            //   background-color: #272822;
        }

        /*定义滑块*/
        .el-table__body-wrapper::-webkit-scrollbar-thumb
        {
            //   -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
            background-color: #c1c1c1;
            border-radius:  5px;
        }
        .table-page {
            display: flex;
            justify-content: flex-end;
            align-items: center;
            .table-page-info {
                font-size: 14px;
                margin-top: 14px;
                color: $textColor4;
            }
            .pagination_c{
                margin-top: 14px;
            }
        }
    }
}

</style>