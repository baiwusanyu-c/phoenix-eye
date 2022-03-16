/*
* @be-pagination.vue
* @deprecated 基于elementUI的分页公共组件（用于后台分页）
* @author czh
* @update (czh 2021/4/21)
*/
<template>
    <div :class="`${customClass} pagination-wrap`">
        <slot name="prev">
            <span class="pagesize-readonly" v-if="isShowgetListPages">共计{{totals || 0}}条</span>
        </slot>
        <el-pagination
                @prev-click="prePage"
                @next-click="nextPage"
                @current-change='handleChangePage'
                @size-change="handleSizeChange"
                :disabled='isDisabled'
                background
                :current-page="currentPages"
                :page-size="pageSizes"
                :pager-count="5"
                :page-sizes="[10, 20, 50, 100]"
                :hide-on-single-page="false"
                :layout="layout"
                class="pagination_c"
                :total="totals">
        </el-pagination>
        <slot name="next">
            <span class="pagesize-readonly" v-if="!isFront">{{pageSizes || 10}}条/页</span>
        </slot>
    </div>

</template>

<script lang="ts">
import {computed, defineComponent, onMounted, ref, watch, watchEffect} from "vue";
import {setStore} from '../../../utils/common'
    export default defineComponent({
        name: 'BePagination',
        emits:[
            'update:currentPage',
            'update:pageSize',
            'update:pageParams',
            'updatePage',
            'update:isDisabled',
            'update:currentPage_h',
            'initFunc',

        ],
        props: {
            /**
             * 总数
             */
            total: {
                type: Number,
                default: 0
            },
            /**
             * 每页条数
             */
            pageSize: {
                type: Number,
                default: 0
            },
            /**
             * 当前页数
             */
            currentPage: {
                type: Number,
                default: 0
            },
            /**
             * 翻页方法（获取列表数据方法）
             */
            initFunc: {
                type: Function,
                default: Function
            },
            isShowgetListPages: {
                type: Boolean,
                default: false
            },
            /**
             * 是否可以跳转到某页
             */
            isJump: {
                type: Boolean,
                default: true
            },
            /**
             * 翻页之前的页数
             */
            currentPage_h: {
                type: Number,
                default: 0
            },
            /**
             * 是否禁用
             */
            isDisabled: {
                type: Boolean,
                default: false
            },
            /**
             * 翻页方法的参数
             */
            params: {
                type: Object,
                default: null,
            },
            /**
             * 自定义主题样式类
             */
            customClass: [String , Object],
            /**
             * 是否启用前端分页
             */
            isFront: {
                type: Boolean,
                default: false,
            },
            /**
             * 前端分页-分页参数
             */
            pageParams: {
                type: Object,
                default: () => {
                    return {
                        pageSize: 5,// 每页条数
                        total: 0,
                        currentPage: 1,
                        pageCount: 1
                    }
                },
            },
             /**
             * 是否显示总条数
             */
            isShowTotalPages: {
                type: Boolean,
                default: false,
            },
            /**
             * 佈局
             */
            layout:{
                type: String,
                default: 'prev, pager,next',
            }
        },
        setup(props,ctx){
            const totals = ref<number>(0)
            const currentPages = ref<number>(0)
            const pageSizes = ref<number>(0)
            const sliceList = ref<any>(new Map())
            /**
             * 分页参数初始化
             */
            const initPageParams = ():void => {
                if (!props.isFront) {
                    totals.value = props.total || props.pageParams.total
                    pageSizes.value = props.pageSize || props.pageParams.pageSize
                    currentPages.value = props.currentPage || props.pageParams.currentPage
                } else {
                    totals.value = props.pageParams.total
                    pageSizes.value = props.pageParams.pageSize
                    currentPages.value = props.pageParams.currentPage
                }

            }
            /**
             * 每页显示条数方法
             * @param {Number} pageSize - 显示的每页条数
             * @public
             */
            const handleSizeChange = (pageSize:number):void => {
                // 前端分页逻辑
                if (props.isFront) {
                    return
                }
                ctx.emit("update:currentPage", 1);
                ctx.emit("update:pageSize", pageSize);
                props.params ? props.initFunc(props.params) : props.initFunc();
                setStore('pageSize', pageSize.toString())
            }

            /********************** 前端分页方法 **********************/
            /**
             * 前台表格分页切片,一次性把数据切割分片缓存
             * @param {Object} tableData - 表格数据
             */
            const sliceTableData = (tableData:any):void => {
                let maxPageNum = Math.ceil(tableData.length / props.pageParams.pageSize)
                props.pageParams.pageCount = maxPageNum

                /*   this.totals = this.pageParams.total
                   this.pageSizes = this.pageParams.pageSize
                   this.currentPages = this.pageParams.currentPage
                */
                if (tableData.length === 0) {
                    sliceList.value.set(1, []);
                    props.pageParams.pageCount = 1;
                }
                for (let i = 1; i <= maxPageNum; i++) {
                    let slice = tableData.slice((i - 1) * props.pageParams.pageSize, i * props.pageParams.pageSize);
                    sliceList.value.set(i, slice)
                }
                initPageParams()
                return sliceList.value.get(1)
            }
            /**
             *上一页
             */
            const prePage = ():void => {
                if (props.pageParams.currentPage !== 1 && props.pageParams.currentPage > 0 && props.isFront) {
                    let page = {...props.pageParams}
                    // 将翻页后的页码参数、切片表格数据传递到父组件
                    ctx.emit("updatePage", {data: sliceList.value.get(--page.currentPage)});
                    ctx.emit("update:pageParams", page);
                }
            }
            /**
             *下一页
             */
            const nextPage = ():void => {

                if (props.pageParams.currentPage !== props.pageParams.pageCount && props.isFront) {
                    let page = JSON.parse(JSON.stringify(props.pageParams))
                    // 将翻页后的页码参数、切片表格数据传递到父组件
                    ctx.emit("updatePage", {data: sliceList.value.get(++page.currentPage)});
                    ctx.emit("update:pageParams", page);
                }
            }
            /**
             * 点击跳转页
             * @param {object} currentPage 当前点击页
             */
            const handleChangePage = (currentPage:any):void => {
                // 前端分页逻辑
                if (props.isFront) {
                    props.pageParams.currentPage = currentPage
                    let pageFront = JSON.parse(JSON.stringify(props.pageParams))
                    ctx.emit("update:pageParams", pageFront);
                    ctx.emit("updatePage", {data: sliceList.value.get(pageFront.currentPage)});
                    return
                }
                // 兼容分页传参为currentPage等分开传的情况
                ctx.emit("update:isDisabled", true);
                ctx.emit("update:currentPage_h", props.currentPage);
                ctx.emit("update:currentPage", currentPage);
                // 兼容分页传参为pageParams对象情况
                props.pageParams.currentPage = currentPage
                let page = JSON.parse(JSON.stringify(props.pageParams))
                ctx.emit("update:pageParams", page);
                ctx.emit("updatePage", page);
                props.params ? props.initFunc(props.params) : props.initFunc();
            }
            const pageParamsComp = computed(()=>{
                return props.pageParams
            })
            watch(pageParamsComp,(nVal)=>{
                totals.value = nVal.total
                pageSizes.value = nVal.pageSize
                currentPages.value = nVal.currentPage
            })
            const totalComp = computed(()=>{
                return props.total
            })
            watch(totalComp,(nVal)=>{
                initPageParams()
            })
            const pageSizeComp = computed(()=>{
                return props.pageSize
            })
            watch(pageSizeComp,(nVal)=>{
                initPageParams()
            })
            const currentPageComp = computed(()=>{
                return props.currentPage
            })
            watch(currentPageComp,(nVal)=>{
                initPageParams()
            })
            onMounted(()=>{
                initPageParams()
            })
            return{
                totals,
                sliceList,
                pageSizes,
                currentPages,
                handleChangePage,
                handleSizeChange,
            }
        }
    })
</script>

<style  lang='scss'>
  .pagination_c {
    margin-top: 14px;
    text-align: center;

    .btn-prev,.btn-next,.el-pager{
      background-color: transparent;
    }
  }

  .pagination-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
  }

  .pagesize-readonly {
    box-sizing: border-box;
    display: inline-block;
    min-width: 35.5px;
    height: 28px;
    margin-top: 20px;
    font-size: 13px;
    line-height: 28px;
    color: #606266;
    vertical-align: top;
  }

  .pagination-right {
    float: right;
  }
</style>
<style lang="scss">
  .paginationN {

    .number:last-child {
      display: none;
    }
  }
</style>

