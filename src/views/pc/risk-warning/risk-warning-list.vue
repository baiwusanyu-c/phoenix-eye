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
                <el-select v-model="searchParams.platform"
                            @change="getList('reset')"
                           :placeholder="$t('lang.riskConfig.platformP')">
                    <el-option v-for="(item) in platformList"
                               :key="item.id"
                               :value="item.value"
                               :label="item.label">
                    </el-option>
                </el-select>
            </div>
            <div class="search-area search-area-input">
                <el-input autocomplete="off" :placeholder="$t('lang.riskConfig.searchP')" v-model="searchParams.addr">
                </el-input>
                <el-button class="primary" type="primary" @click="getList('reset')">{{ $t('lang.searchBtn') }}</el-button>
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
                    <p style="line-height: 25px">{{$t('lang.emptyData')}}</p>
                </div>
                <el-table-column
                    prop="platform"
                    :label="$t('lang.riskConfig.platform')"
                    width="120"
                    align="center">
                    <template #default="scope">
                        {{scope.row.platform.toUpperCase()}}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="tx_hash"
                    :label="$t('lang.riskConfig.tableHeader.txHash')"
                    width="170"
                    align="center">
                    <template #default="scope">
                        <be-ellipsis-copy :targetStr="scope.row.tx_hash"
                                          fontLength="8"
                                          endLength="8">
                        </be-ellipsis-copy>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="tx_time"
                    :label="$t('lang.riskConfig.tableHeader.txTime')"
                    align="center">
                    <template #default="scope">
                        <el-tooltip placement="top" effect="light">
                            <span slot="content">UTC：{{beijing2utc(scope.row.tx_time)}}</span>
                            <span class="cursor">{{formatDate(createDate(scope.row.tx_time))}}</span>
                        </el-tooltip>
                    </template>
                </el-table-column>
                <el-table-column
                    width="100"
                    prop="tx_status"
                    :label="$t('lang.riskConfig.tableHeader.state')"
                    align="center">
                    <template #default="scope">
                        <span :style="stateSuccess(scope.row.tx_status)">
                            {{stateTxt(scope.row.tx_status)}}
                        </span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="from_address"
                    width="170"
                    :label="$t('lang.riskConfig.tableHeader.from')"
                    align="center">
                    <template #default="scope">
                        <be-ellipsis-copy :targetStr="scope.row.from_address"
                                          v-if="!scope.row.from_address_tag"
                                          fontLength="8"
                                          endLength="8">
                        </be-ellipsis-copy>
                        <be-ellipsis-copy :targetStr="scope.row.from_address_tag"
                                          :copyContent="scope.row.from_address"
                                          :tooltipTxt="scope.row.from_address"
                                          v-if="scope.row.from_address_tag"
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
                    :label="$t('lang.riskConfig.tableHeader.to')"
                    align="center" >
                    <template #default="scope">
                        <be-ellipsis-copy :targetStr="scope.row.to_address"
                                          v-if="!scope.row.to_address_tag"
                                          fontLength="8"
                                          endLength="8">
                        </be-ellipsis-copy>
                        <be-ellipsis-copy :targetStr="scope.row.to_address_tag"
                                          :tooltipTxt="scope.row.to_address"
                                          :copyContent="scope.row.to_address"
                                          v-if="scope.row.to_address_tag"
                                          :is-ellipsis="false"
                                          style="color: #1496F2"
                                          fontLength="8"
                                          endLength="8">
                        </be-ellipsis-copy>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="risk_features"
                    :label="$t('lang.riskConfig.tableHeader.warningType')"
                    align="center">
                    <template #default="scope">
                        <div style="display: flex;flex-direction: column;align-items: center;justify-content: center"
                             v-if="scope.row.risk_features && scope.row.risk_features.length > 0 ">
                            <el-tag v-for="item in scope.row.risk_features"
                                    style="width: min-content;margin-top: 10px;"
                                    :key="item">{{item}}</el-tag>
                        </div>
                        <div style="display: flex;flex-direction: column;align-items: center;justify-content: center" v-else>
                            {{ $t('lang.emptyData') }}</div>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="risk_score"
                    :label="$t('lang.riskConfig.tableHeader.score')"
                    align="center"
                    show-overflow-tooltip>
                    <template #default="scope">
                        <span style="font-weight: bold">{{scope.row.risk_score || $t('lang.emptyData')}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    width="100"
                    :label="$t('lang.riskConfig.tableHeader.detail')"
                    align="center">
                    <template #default="scope">
                        <span style="color: #1496F2;cursor: pointer"
                              @click="openDetail(scope.row)">{{ $t('lang.scan') }} >></span>
                    </template>
                </el-table-column>
            </el-table>
            <be-pagination
                custom-class="table-page"
                :pageSize='pageParams.data.pageSize'
                :currentPage='pageParams.data.currentPage'
                :total='pageParams.data.total'
                 @updatePage="pageChange"
                :is-front="false">
                <span slot="prev" class="table-page-info">{{ $t('lang.total') }}{{pageParams.data.total}}{{ $t('lang.piece') }}</span>
                <span slot="next"></span>
            </be-pagination>
        </div>
    </div>
</template>

<script lang="ts">
import BePagination from "../../../components/common-components/pagination/be-pagination.vue";
import BeEllipsisCopy from "../../../components/common-components/ellipsis-copy/ellipsis-copy.vue"
import {platformListDict} from "../../../utils/platformDict";
import {getProjWarning} from "../../../api/risk-warning";
import {defineComponent, ref, reactive, onMounted, watch, computed} from "vue";
import {useI18n} from "vue-i18n";
import {ElMessage} from "element-plus/es";
import {openWindow,beijing2utc,createDate,formatDate} from "../../../utils/common";

export default defineComponent({
    name: "risk-warning-list",
    components: {BePagination,BeEllipsisCopy},
    setup(){
        const {t,locale} = useI18n()
        const searchParams = reactive({
            platform: 'all',
            addr: ''
        })
        const platformList = ref<Array<object>>([])

        const setPlatformList = ():void => {
            platformList.value = JSON.parse(JSON.stringify(platformListDict))
            platformList.value.unshift(
                {
                    label: t('lang.projectRinking.tradeStb.all'),
                    value: 'all',
                    id:'jhgadjghzngrgegkdfjallg'
                },
            )
        }
        onMounted(()=>{
            setPlatformList()
            getList()
        })
        const pageParams = reactive({data:{
                currentPage: 1,
                pageNum: 1,
                pageSize: 10,
                total: 0
            }
        })
        const tableData = ref<object>([])
        const loading = ref<boolean>(false)
        const listenLang = computed(()=>{
            return locale
        })
        watch(()=>listenLang,()=>{
            setPlatformList()
        })
        const stateSuccess = computed(()=>{
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
        })
        const stateTxt = computed(()=>{
            return function (val){
                if(val === 'success' || val === '成功' ){
                    return t('lang.riskConfig.stateSuccess')
                }
                return t('lang.riskConfig.stateFailed')
            }
        })
        /**
         * 获取表格数据
         */
        const getList = (type?:string) => {
            loading.value = true
            if(type === 'reset'){
                pageParams.data = {
                    currentPage: 1,
                    pageNum: 1,
                    pageSize: 10,
                    total: 0
                }
            }
            let params = {
                page_num:pageParams.data.pageNum,
                page_size:pageParams.data.pageSize,
                platform:searchParams.platform === 'all' ? '' : searchParams.platform,
                param:searchParams.addr
            }
            getProjWarning(params).then(res=>{
                if(res){
                    tableData.value = res.data.page_infos
                    console.log(tableData.value)
                    pageParams.data.total =  res.data.total
                    loading.value = false
                }
            }).catch(err=>{
                ElMessage.error(err.message)
                console.error(err)
            })
        }
        /**
         * 分页方法
         * @param {Object} item - 分页参数对象
         */
        const pageChange = (item:any):void => {
            pageParams.data.pageNum = item.currentPage
            pageParams.data.currentPage = item.currentPage
            getList()
        }

        /**
         * 打開交易分析詳情tab
         */
        const openDetail = (params:any)=>{
            openWindow(`#/riskWarning/detail?tx_hash=${params.tx_hash}`)
        }

        return{
            searchParams,
            pageParams,
            platformList,
            tableData,
            loading,
            stateTxt,
            stateSuccess,
            getList,
            openDetail,
            pageChange,
            beijing2utc,
            formatDate,
            createDate,
        }
    },
    /*data() {
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
        /!**
         * 获取表格数据
         *!/
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
                _this.$message.error(err.message)
                console.error(err)
            })
        },
        /!**
         * 分页方法
         * @param {Object} item - 分页参数对象
         *!/
        pageChange(item){
            this.pageParams.pageNum = item.currentPage
            this.pageParams.currentPage = item.currentPage
            this.getList()
        },
        /!**
         * 打開交易分析詳情tab
         *!/
        openDetail(params){
            this.$openWindow(`#/riskWarning/detail?tx_hash=${params.tx_hash}`, 'view_window')
        }
    },*/
})
</script>

<style lang="scss">
.risk-warning-list {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 24px;
  background: $mainColor7;

  .search-area {
    display: flex;
    align-items: center;
    justify-content: space-between;
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

    /* 定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸 */

    .el-table__body-wrapper::-webkit-scrollbar
        {
      width: 8px;
      height: 8px;
      margin: 5px;
    }

    /* 定义滚动条轨道 */

    .el-table__body-wrapper::-webkit-scrollbar-track
        {
      //   -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
      //   background-color: #272822;
    }

    /* 定义滑块 */

    .el-table__body-wrapper::-webkit-scrollbar-thumb
        {
      //   -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
      background-color: #c1c1c1;
      border-radius:  5px;
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

      .pagination_c{
        margin-top: 14px;
      }
    }
  }
}

</style>