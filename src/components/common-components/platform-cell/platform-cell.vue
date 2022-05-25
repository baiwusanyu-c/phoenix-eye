/* * @platform-cell.vue * @deprecated * @author czh * @update (czh 2022/4/2) */
<template>
  <div class="flex items-center">
    <be-icon :icon="iconDict[platform.toUpperCase()]" :width="size" :height="size"> </be-icon>
    <span
      style="
        line-height: 24px;
        margin-left: 4px;
        font-weight: bold;
        font-family: BarlowSemi-B sans-serif;
      "
      >{{ platform.toUpperCase() }}</span
    >
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { iconDict } from '../../../utils/platform-dict'
  // @ts-ignore
  import { BeIcon } from '../../../../public/be-ui/be-ui.es'
  export default defineComponent({
    name: 'PlatformCell',
    components: {
      BeIcon,
    },
    props: {
      platform: {
        type: String,
      },
      size: {
        type: Number,
        default: 24,
      },
    },
    setup() {
      return {
        iconDict,
      }
    },
  })
</script>
