<template>
  <div :class="`ellipsis-copy ${customClass}`" @mouseover="enter" @mouseout="leave">
    <el-tooltip placement="top" effect="light" class="address" :disabled="!isTooltip || !targetStr">
      <template #content>
        <slot name="content">
          <span :style="tooltipStyle">{{ getTooltipTxt() }}</span>
        </slot>
      </template>
      <slot name="text" :item="changeEllipsisStr(targetStr)">
        <span :style="styles">{{ changeEllipsisStr(targetStr) }} </span>
      </slot>
    </el-tooltip>
    <!-- be-popover 需要优化 这里先用 elementPlus   -->
    <!--      <be-popover
          :disabled="!isTooltip || !targetStr"
          customClass="address"
          placement="top">
          <template #trigger>
              <slot name="text" :item="changeEllipsisStr(targetStr)">
                  <span :style="styles">{{ changeEllipsisStr(targetStr) }} </span>
              </slot>
          </template>
          <span>{{ getTooltipTxt() }}</span>
      </be-popover>-->

    <span v-if="isShowCopyBtn && (copyContent || targetStr)" class="copy-btn">
      <be-icon
        v-if="isShowCopyBtn"
        v-show="isShowCopy"
        icon="iconCopyEagle"
        class="icon"
        color="#1CD2A9"
        @click.stop="copyAddress(copyContent || targetStr)">
      </be-icon>
    </span>
  </div>
</template>

<script lang="ts">
  // 地址/交易 中间省略显示，鼠标移入显示复制按钮
  import { computed, defineComponent, ref } from 'vue'
  // @ts-ignore
  import { BeIcon } from '@eagle-eye/be-ui'
  import { copyAddress } from '../../../utils/common'
  export default defineComponent({
    name: 'EllipsisCopy',
    components: { BeIcon },
    props: {
      // 目标地址/交易
      targetStr: {
        type: String,
      },
      // copy按钮是否一直显示
      isFixedShowCopy: {
        type: Boolean,
        default: false,
      },
      // 目标地址前面显示个数
      fontLength: {
        type: [Number, String],
        default: 8,
      },
      // 目标地址后面显示个数
      endLength: {
        type: [Number, String],
        default: 8,
      },
      // 是否显示复制的按钮
      isShowCopyBtn: {
        type: Boolean,
        default: true,
      },
      // 是否缩略
      isEllipsis: {
        type: Boolean,
        default: true,
      },
      // 是否tooltip
      isTooltip: {
        type: Boolean,
        default: true,
      },
      // tooltip显示内容，沒有傳則默認是 targetStr 内容
      tooltipTxt: {
        type: String,
        default: '',
      },
      // tooltip 样式
      tooltipStyle: {
        type: String,
        default: '',
      },
      /**
       * 复制内容 沒有傳則默認是 targetStr 内容
       */
      copyContent: {
        type: String,
        default: '',
      },
      // 样式
      styles: {
        type: String,
        default: '',
      },

      emptyText: {
        type: String,
        default: '-',
      },
      customClass: {
        type: String,
        default: '',
      },
    },
    setup(props) {
      const getTooltipTxt = computed(() => {
        return function () {
          if (!props.tooltipTxt) {
            return props.targetStr
          }
          return props.tooltipTxt
        }
      })
      const isShowCopy = ref(props.isFixedShowCopy)
      /**
       * 鼠标移入显示复制按钮
       */
      const enter = (): void => {
        if (props.isFixedShowCopy) return
        isShowCopy.value = true
      }
      /**
       * 鼠标移出隐藏复制按钮
       */
      const leave = (): void => {
        if (props.isFixedShowCopy) return
        isShowCopy.value = false
      }
      /**
       * 省略中间的文字
       * @param {String} str 当前地址/交易数
       */
      const changeEllipsisStr = (str: string): string => {
        if (!str) {
          return props.emptyText
        }
        if (!props.isEllipsis) return str
        const frontLen = Number(props.fontLength)
        const endLen = Number(props.endLength)
        return `${str.substring(0, frontLen)}...${str.substring(str.length - endLen)}`
      }
      return {
        enter,
        leave,
        getTooltipTxt,
        changeEllipsisStr,
        isShowCopy,
        copyAddress,
      }
    },
  })
</script>
<style lang="scss">
  .ellipsis-copy {
    display: flex;
    align-items: center;
    width: 100%;
    min-width: 200px !important;
    overflow: hidden;

    .icon {
      flex-shrink: 0;
      width: 16px;
      margin-right: 0 !important;
      margin-left: 4px;
      cursor: pointer;
    }

    .address {
      flex-shrink: 1;
      overflow: hidden;
      width: 300px;
    }

    .copy-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
    }
    span {
      font-family: 'Barlow', sans-serif;
    }
  }
</style>
