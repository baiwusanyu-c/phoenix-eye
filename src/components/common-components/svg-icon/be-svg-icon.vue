/*
* @be-svg-icon.vue
* @deprecated Svg图表组件
* @author czh
* @update (czh 2021/4/21)
*/
<template>
    <!--用v-if 而不用el-tooltip本身的禁用熟悉，是因为某些边界情况下会导致渲染错误-->
    <el-tooltip
        :content="content"
        v-if="!disabledToolTip"
        :effect="effect"
        :enterable="enterable"
        :placement="placement">
        <div
            v-if="isExternal"
            :style="styleExternalIcon"
            class="svg-external-icon svg-icon"
            v-on="$attrs"></div>
        <svg :class="svgClass" aria-hidden="true" v-else v-on="$attrs">
            <use :xlink:href="iconName" width="100%" height="100%" />
        </svg>
    </el-tooltip>
    <div
        v-else-if="isExternal && disabledToolTip"
        :style="styleExternalIcon"
        class="svg-external-icon svg-icon"
        v-on="$attrs">
    </div>
    <svg :class="svgClass" aria-hidden="true" v-else-if="!isExternal && disabledToolTip" v-on="$attrs">
        <use :xlink:href="iconName" width="100%" height="100%" />
    </svg>
</template>

<script lang="ts">
/**
 * Svg图表组件
 */
import {computed, defineComponent} from "vue";
export default defineComponent({
    name: "BeSvgIcon",
    props: {
        /**
         * 指定的图标名
         */
        iconClass: {
            type: String,
            required: true
        },
        /**
         * 自定义样式类名
         */
        className: {
            type: String,
            default: ""
        },
        /**
         * 指定图标的tooltip的文字内容
         */
        content: {
            type: String,
            default: ""
        },
        /**
         * 指定图标的tooltip的主题
         */
        effect: {
            type: String,
            default: "light"
        },
        /**
         * 指定图标的tooltip的的开启
         */
        disabledToolTip: {
            type: Boolean,
            default: false
        },
        placement: {
            type: String,
            default: "top"
        },
        /**
         * 提示是否可以选中
         */
        enterable:{
            type: Boolean,
            default: true
        }
    },
    setup(props){
        const isExternalF = (path:string):boolean => {
            return /^(https?:|mailto:|tel:)/.test(path)
        }
        const isExternal = computed(()=>{
            return isExternalF(props.iconClass);
        })
        const iconName = computed(()=>{
            return `#icon${props.iconClass}`;
        })
        const svgClass = computed(()=>{
            if (props.className) {
                return "svg-icon " + props.className;
            } else {
                return "svg-icon";
            }
        })
        const styleExternalIcon = computed(()=>{
            return {
                mask: `url(${props.iconClass}) no-repeat 50% 50%`,
                "-webkit-mask": `url(${props.iconClass}) no-repeat 50% 50%`
            };
        })
        return {
            isExternal,
            iconName,
            svgClass,
            styleExternalIcon
        }
    }
})
</script>

<style scoped>
.svg-icon {
  width: 1.2em;
  height: 1.2em;
  overflow: hidden;
  font-size: 1.2em;
  vertical-align: -.3em;
  fill: currentColor;
}

.svg-external-icon {
  display: inline-block;
  background-color: currentColor;
  mask-size: cover !important;
}
</style>
