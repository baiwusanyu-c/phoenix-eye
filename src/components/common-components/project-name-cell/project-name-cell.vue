/* * @project-name-cell.vue * @deprecated * @author czh * @update (czh 2022/5/18) */
<template>
  <div class="flex items-center project-name-cell">
    <el-avatar :size="size" :src="url" fit="cover">
      <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" />
    </el-avatar>
    <ellipsis-copy
      v-if="isEll"
      :target-str="name"
      :is-ellipsis="(name && name.length) >= 14 ? true : false"
      :is-show-copy-btn="false"
      :is-tooltip="true"
      styles="color: #18304E;font-weight: bold;font-size: 14px;"
      font-length="8"
      end-length="0">
    </ellipsis-copy>
    <span v-else>{{ name }}</span>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'ProjectNameCell',
    props: {
      name: {
        type: String,
      },
      size: {
        type: Number,
        default: 32,
      },
      url: {
        type: String,
        default: 'https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png',
      },
      isEll: {
        type: Boolean,
        default: true,
      },
    },
  })
</script>

<style scoped lang="scss">
  .project-name-cell {
    span {
      line-height: 24px;
      margin-left: 4px;
      font-weight: bold;
      font-size: 14px;
      color: $textColor3;
      font-family: BarlowSemi-B sans-serif;
      margin-right: 6px;
    }
    .ellipsis-copy {
      width: 116px;
      min-width: initial !important;
    }
  }
</style>
