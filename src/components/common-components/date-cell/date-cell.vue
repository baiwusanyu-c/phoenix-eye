/* * @date-cell.vue * @deprecated * @author czh * @update (czh 2022/4/20) */
<template>
  <el-tooltip placement="top" effect="light">
    <template #content>
      <span>{{ formatDate(createDate(time)) }} UTC：{{ beijing2utc(time) }}</span>
    </template>
    <span style="color: #888">
      <p>{{ formatDate(createDate(time)).split(' ')[0] }}</p>
      <p>{{ formatDate(createDate(time)).split(' ')[1] }}</p>
    </span>
  </el-tooltip>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { beijing2utc, createDate, formatDate, openWindow } from '../../../utils/common'
  export default defineComponent({
    name: 'DateCell',
    props: {
      time: {
        type: String,
        default: '2077-04-19T06:06:40.000+0000',
      },
    },
    setup() {
      return {
        beijing2utc,
        createDate,
        formatDate,
        openWindow,
      }
    },
  })
</script>

<style scoped></style>
