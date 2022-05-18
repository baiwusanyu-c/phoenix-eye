/* * @platform-cell.vue * @deprecated * @author czh * @update (czh 2022/4/2) */
<template>
  <div class="flex items-center">
    <be-icon :icon="iconDict[platform.toUpperCase()]" class="mr-2" width="24" height="24">
    </be-icon>
    <span style="line-height: 24px; margin-left: 6px; font-weight: bold">{{
      platform.toUpperCase()
    }}</span>
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
    },
    setup() {
      return {
        iconDict,
      }
    },
  })
</script>
