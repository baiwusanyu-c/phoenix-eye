/* * @platform-cell.vue * @deprecated * @author czh * @update (czh 2022/4/2) */
<template>
  <div class="flex items-center">
    <be-icon :icon="innerIcon" :width="size" :height="size"> </be-icon>
    <span
      :style="`line-height: ${size}px;
        font-size:${fontSize}px;
        margin-left: 6px;
        font-weight: ${fontWeight};
        font-family: BarlowSemi-B sans-serif;`"
      >{{ content }}</span
    >
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue'
  import { iconDict } from '../../../utils/platform-dict'
  // @ts-ignore
  import { BeIcon } from '../../../../public/be-ui/be-ui.es'
  export default defineComponent({
    name: 'IconCell',
    components: {
      BeIcon,
    },
    props: {
      content: {
        type: String,
      },
      size: {
        type: Number,
        default: 24,
      },
      icon: {
        type: String,
        default: '',
      },
      isPlatform: {
        type: Boolean,
        default: false,
      },
      fontSize: {
        type: Number,
        default: 24,
      },
      fontWeight: {
        type: String,
        default: 'bold',
      },
    },
    setup(props) {
      const innerIcon = ref<string>(props.icon)
      if (props.isPlatform) {
        innerIcon.value = iconDict[props.icon.toUpperCase() as keyof typeof iconDict] || ''
      }
      return {
        innerIcon,
      }
    },
  })
</script>
