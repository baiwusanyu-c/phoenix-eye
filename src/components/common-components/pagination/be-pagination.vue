/* * @be-pagination.vue * @deprecated 基于elementUI的分页公共组件（用于后台分页） * @author czh *
@update (czh 2021/4/21) */
<template>
  <div :class="`${customClass} pagination-wrap`">
    <slot name="prev">
      <span v-if="isShowgetListPages" class="page-size--readonly">共计{{ totals || 0 }}条</span>
    </slot>
    <el-pagination
      :disabled="isDisabled"
      background
      :current-page="currentPages"
      :page-size="pageSizes"
      :pager-count="5"
      :page-sizes="[10, 20, 50, 100]"
      :hide-on-single-page="false"
      :layout="layout"
      class="pagination_c"
      :total="totals"
      @current-change="handleChangePage"
      @size-change="handleSizeChange">
    </el-pagination>
    <slot name="next">
      <span class="page-size--readonly">{{ pageSizes || 10 }}条/页</span>
    </slot>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, onMounted, ref, watch } from 'vue'
  import { setStore } from '../../../utils/common'
  export default defineComponent({
    name: 'BePagination',
    props: {
      /**
       * 总数
       */
      total: {
        type: Number,
        default: 0,
      },
      /**
       * 每页条数
       */
      pageSize: {
        type: Number,
        default: 0,
      },
      /**
       * 当前页数
       */
      currentPage: {
        type: Number,
        default: 0,
      },
      /**
       * 翻页方法（获取列表数据方法）
       */
      initFunc: {
        type: Function,
        default: Function,
      },
      isShowgetListPages: {
        type: Boolean,
        default: false,
      },
      /**
       * 是否可以跳转到某页
       */
      isJump: {
        type: Boolean,
        default: true,
      },

      /**
       * 是否禁用
       */
      isDisabled: {
        type: Boolean,
        default: false,
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
      customClass: [String, Object],
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
      layout: {
        type: String,
        default: 'prev, pager,next',
      },
    },
    emits: [
      'update:currentPage',
      'update:pageSize',
      'update:pageParams',
      'updatePage',
      'update:isDisabled',
      'initFunc',
    ],
    setup(props, ctx) {
      const totals = ref<number>(0)
      const currentPages = ref<number>(0)
      const pageSizes = ref<number>(0)
      /**
       * 分页参数初始化
       */
      const initPageParams = (): void => {
        totals.value = props.total
        pageSizes.value = props.pageSize
        currentPages.value = props.currentPage
      }
      /**
       * 每页显示条数方法
       * @param {Number} pageSize - 显示的每页条数
       * @public
       */
      const handleSizeChange = (pageSize: number): void => {
        ctx.emit('update:currentPage', 1)
        ctx.emit('update:pageSize', pageSize)
        props.params ? props.initFunc(props.params) : props.initFunc()
        setStore('pageSize', pageSize.toString())
      }

      /**
       * 点击跳转页
       * @param {object} currentPage 当前点击页
       */
      const handleChangePage = (currentPage: any): void => {
        ctx.emit('update:isDisabled', true)
        ctx.emit('update:currentPage', currentPage)
        ctx.emit('updatePage', { currentPage })
      }

      const totalComp = computed(() => {
        return props.total
      })
      watch(totalComp, () => {
        initPageParams()
      })
      const pageSizeComp = computed(() => {
        return props.pageSize
      })
      watch(pageSizeComp, () => {
        initPageParams()
      })
      const currentPageComp = computed(() => {
        return props.currentPage
      })
      watch(currentPageComp, () => {
        initPageParams()
      })
      onMounted(() => {
        initPageParams()
      })
      return {
        totals,
        pageSizes,
        currentPages,
        handleChangePage,
        handleSizeChange,
      }
    },
  })
</script>

<style lang="scss">
  .pagination_c {
    margin-top: 14px;
    text-align: center;

    .btn-prev,
    .btn-next,
    .el-pager {
      background-color: transparent;
    }
  }

  .pagination-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
  }

  .page-size--readonly {
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
