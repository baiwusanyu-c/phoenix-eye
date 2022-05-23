/* * @project-name-cell.vue * @deprecated * @author czh * @update (czh 2022/5/18) */
<template>
  <div class="flex items-center project-name-cell">
    <el-avatar :size="size" :src="url" />
    <span>{{ name }}</span>
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
        default: 'https://avatars.githubusercontent.com/u/32354856?v=4',
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
    }
  }
</style>
