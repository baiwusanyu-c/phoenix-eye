<!--
 * @Author: your name
 * @Date: 2021-08-26 14:06:10
 * @LastEditTime: 2021-09-27 17:49:08
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \anti-fraud-front\src\components\common-components\ellipsis-copy\ellipsis-copy.vue
-->
<template>
    <div class="ellipsis-copy" @mouseover="enter"  @mouseout="leave">
        <el-tooltip placement="top" effect="light" class="address">
            <span slot="content">{{getTooltipTxt()}}</span>
            <span>{{changeEllipsisStr(targetStr)}}</span>
        </el-tooltip>
        <span class="copy-btn">
            <svg-icon iconClass="-fuzhi" v-if="isShowCopyBtn" disabled-tool-tip class="icon"  style="color: #1496F2" content="复制" v-show="isShowCopy" @click="$copyAddress(targetStr)"></svg-icon>
        </span>
        
    </div>
</template>

<script>
// 地址/交易 中间省略显示，鼠标移入显示复制按钮
export default {
    name: "BeEllipsisCopy",
    components: {},
    props: {
        // 目标地址/交易
        targetStr:{
            type: String
        },
        // copy按钮是否一直显示
        isFixedShowCopy:{
            type: Boolean,
            default: false
        },
        // 目标地址前面显示个数
        fontLength:{
            type: [Number,String],
            default: 8
        },
        // 目标地址后面显示个数
        endLength:{
            type: [Number,String],
            default: 8
        },
        // 是否显示复制的按钮
        isShowCopyBtn:{
            type: Boolean,
            default: true
        },
        // 是否缩略
        isEllipsis:{
            type: Boolean,
            default: true
        },
        // tooltip显示内容
        tooltipTxt:{
            type: String,
            default: ''
        }
    },
    computed:{
      getTooltipTxt(){
          return function (){
              if(!this.tooltipTxt){
                  return this.targetStr
              }
              return this.tooltipTxt
          }

      }
    },
    data() {
        return {
            isShowCopy: this.isFixedShowCopy
        };
    },
    methods: {
        /**
         * 鼠标移入显示复制按钮
         */
        enter(){
            if(this.isFixedShowCopy) return;
            this.isShowCopy = true;
        },
        /**
         * 鼠标移出隐藏复制按钮
         */
        leave(){
            if(this.isFixedShowCopy) return;
            this.isShowCopy = false;
        },
        /**
        * 省略中间的文字
        * @param {String} str 当前地址/交易数
         */
        changeEllipsisStr(str) {
            if(!this.isEllipsis) return str
            const frontLen = this.fontLength;
            const endLen = this.endLength;
            return str.substring(0, frontLen) + '...' + str.substring(str.length - endLen);
        }
    },
};
</script>
<style lang="scss">
.ellipsis-copy{
    display: flex;
    align-items: center;
    overflow: hidden;
    min-width: 200px !important;
    width: 100%;
    .icon{
        flex-shrink: 0;
        margin-left: 8px;
        margin-right: 0 !important;
        width: 16px;
        cursor: pointer;
    }
    .address{
        flex-shrink: 1;
        overflow: hidden;
    }
    .copy-btn{
        width: 24px;
        height: 24px;
    }

}

</style>