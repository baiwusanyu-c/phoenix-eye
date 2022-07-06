/* * @platform-cell.vue * @deprecated * @author czh * @update (czh 2022/4/2) */
<template>
  <div class="flex items-center justify-center">
    <be-icon
      :icon="iconDict[platform.toUpperCase()]"
      :width="size"
      :height="size"
      :title="platform.toUpperCase()">
    </be-icon>
    <span
      v-if="showPlatform"
      style="
        line-height: 24px;
        margin-left: 4px;
        font-weight: bold;
        font-size: 12px;
        font-family: 'Barlow', sans-serif;
      "
      >{{ platform.toUpperCase() }}</span
    >
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { BeIcon } from '@eagle-eye/be-ui'
  import { iconDict } from '../../../utils/platform-dict'
  // @ts-ignore
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
      showPlatform: {
        type: Boolean,
        default: true,
      },
    },
    setup() {
      return {
        iconDict,
      }
    },
  })
</script>
