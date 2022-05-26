/* * @report-item.vue * @deprecated * @author czh * @update (czh 2022/5/26) */
<template>
  <div class="report-item">
    <div></div>
    <div>
      <p>{{ name }}</p>
      <span>{{ formatDate(createDate(time), 'Y-m-d') }}</span>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { createDate, formatDate } from '../../../../utils/common'

  export default defineComponent({
    name: 'ReportItem',
    props: {
      url: {
        type: String,
        default: 'www.baidu.com',
      },
      name: {
        type: String,
        default: 'Report name',
      },
      time: {
        type: String,
        default: '2077-04-19T06:06:40.000+0000',
      },
    },
    setup() {
      return {
        formatDate,
        createDate,
      }
    },
  })
</script>

<style lang="scss">
  .report-item {
    display: flex;
    padding: 8px 12px;
    border-radius: 8px;
    &:hover {
      background-color: $mainColor7;
    }
    p {
      font-size: 15px;
      font-family: BarlowSemi-B, sans-serif;
      font-weight: bold;
      color: $textColor3;
      line-height: 20px;
    }
    span {
      font-size: 14px;
      font-family: BarlowSemi-R, sans-serif;
      font-weight: 400;
      color: $textColor3;
      line-height: 18px;
    }
  }
</style>
