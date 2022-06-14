/* * @up-down.vue * @deprecated * @author czh * @update (czh 2022/5/26) */
<template>
  <div class="up-down">
    <be-icon :icon="data >= 0 ? 'iconArrowUp' : 'iconArrowDown'" width="24" height="24"> </be-icon>
    <el-tooltip :content="simulateToFixed(data, 10)" placement="top" effect="light">
      <span :class="data >= 0 ? 'up-down__up' : 'up-down__down'" style="margin-left: 6px">
        {{ simulateToFixed(floatMultiply(Math.abs(data), 100), 3) }} %
      </span>
    </el-tooltip>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { floatMultiply, simulateToFixed } from '../../../utils/common'
  // @ts-ignore
  import { BeIcon } from '../../../../public/be-ui/be-ui.es.js'
  export default defineComponent({
    name: 'UpDown',
    components: {
      BeIcon,
    },
    props: {
      data: {
        type: Number,
        default: 0,
      },
    },
    setup() {
      return { floatMultiply, simulateToFixed }
    },
  })
</script>

<style scoped lang="scss">
  .up-down {
    display: flex;
    align-items: center;
  }
  .up-down__up {
    font-size: 16px;
    font-family: BarlowSemi-B sans-serif;
    font-weight: bold;
    color: $mainColor3;
    line-height: 16px;
  }
  .up-down__down {
    font-size: 16px;
    font-family: BarlowSemi-B sans-serif;
    font-weight: bold;
    color: $lessColor4;
    line-height: 16px;
  }
</style>
