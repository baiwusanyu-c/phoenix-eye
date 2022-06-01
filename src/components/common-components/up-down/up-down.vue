/* * @up-down.vue * @deprecated * @author czh * @update (czh 2022/5/26) */
<template>
  <div class="up-down">
    <be-icon :icon="data >= 0 ? 'iconArrowUp' : 'iconArrowDown'" width="24" height="24"> </be-icon>
    <span :class="data >= 0 ? 'up-down__up' : 'up-down__down'" style="margin-left: 6px">
      {{ formatMoney(floatMultiply(Math.abs(data), 100)) }} %
    </span>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { floatMultiply, formatMoney } from '../../../utils/common'
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
      return { formatMoney, floatMultiply }
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
