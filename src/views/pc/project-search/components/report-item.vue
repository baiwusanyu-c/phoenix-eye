/* * @report-item.vue * @deprecated * @author czh * @update (czh 2022/5/26) */
<template>
  <div class="report-item" @click="openWindow(url)">
    <be-icon width="40" height="40" icon="iconAudit"></be-icon>
    <div style="margin-left: 10px">
      <ellipsis-copy
        :target-str="name"
        :is-ellipsis="name.length > 14 ? true : false"
        :is-show-copy-btn="false"
        :is-tooltip="true"
        styles="color: black;font-weight: bold;font-size: 16px;"
        font-length="10"
        end-length="0">
      </ellipsis-copy>
      <span>{{ formatDate(createDate(time), 'Y-m-d') }}</span>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { BeIcon } from '@eagle-eye/be-ui'
  import { createDate, formatDate, openWindow } from '../../../../utils/common'
  // @ts-ignore

  export default defineComponent({
    name: 'ReportItem',
    components: {
      BeIcon,
    },
    props: {
      url: {
        type: String,
        default: 'www.baidu.com',
      },
      name: {
        type: String,
        default: 'Report name ddddddddddddd',
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
        openWindow,
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
      font-family: 'Barlow', sans-serif;
      font-weight: bold;
      color: $textColor3;
      line-height: 20px;
    }
    span {
      font-size: 14px;
      font-family: 'Barlow', sans-serif;
      font-weight: 400;
      color: $textColor3;
      line-height: 18px;
    }
  }
</style>
