/* * @project-detail-audit.vue * @deprecated * @author czh * @update (czh 2022/3/29) */
<template>
  <div class="project-detail-audit" @click="openAudit(url)">
    <img class="project-detail-audit--img" alt="" src="../../../../assets/image/pc/pad.png" />
    <h3 class="project-detail-audit--name">
      {{ name }}
    </h3>
    <span class="project-detail-audit--date">
      {{ date }}
    </span>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { openWindow } from '../../../../utils/common'
  export default defineComponent({
    name: 'ProjectDetailAudit',
    props: {
      name: {
        type: String,
        default: 'Report name',
      },
      date: {
        type: String,
        default: '2019-12-23 ',
      },
      url: {
        type: String,
        default: '',
      },
    },
    setup() {
      const openAudit = (url: string): void => {
        openWindow(url)
      }
      return {
        openAudit,
      }
    },
  })
</script>

<style lang="scss">
  .project-detail-audit {
    box-sizing: border-box;
    padding: 20px;
    cursor: pointer;
    background-color: $mainColor7;
    border-radius: 4px;

    &:hover {
      box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
    }

    .project-detail-audit--img {
      width: 70%;
      height: 70%;
      margin: 0 auto;
    }

    .project-detail-audit--name {
      margin: 40px 0 10px 0;
      font-family: AlibabaPuHuiTi-Regular, AlibabaPuHuiTi, sans-serif;
      line-height: 24px;
    }

    .project-detail-audit--date {
      font-family: AlibabaPuHuiTi-Regular, AlibabaPuHuiTi, sans-serif;
      line-height: 22px;
    }
  }
</style>
