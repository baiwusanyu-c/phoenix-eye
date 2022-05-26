/* * @up-down.vue * @deprecated * @author czh * @update (czh 2022/5/26) */
<template>
  <div class="up-down">
    <be-icon :icon="type === 'up' ? 'iconArrowUp' : 'iconArrowDown'" width="24" height="24">
    </be-icon>
    <span :class="type === 'up' ? 'up-down__up' : 'up-down__down'" style="margin-left: 6px">
      {{ formatMoney(data) }} %
    </span>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { formatMoney } from '../../../utils/common'
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
        default: 1234,
      },
      type: {
        type: String,
        default: 'up',
      },
    },
    setup() {
      return { formatMoney }
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
