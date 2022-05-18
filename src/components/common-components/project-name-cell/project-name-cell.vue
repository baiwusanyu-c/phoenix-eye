/* * @project-name-cell.vue * @deprecated * @author czh * @update (czh 2022/5/18) */
<template>
  <div class="flex items-center">
    <el-avatar :size="40" :src="url" />
    <span style="line-height: 24px; margin-left: 6px; font-weight: bold">{{ name }}</span>
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
      url: {
        type: String,
        default: 'https://avatars.githubusercontent.com/u/32354856?v=4',
      },
    },
  })
</script>

<style scoped></style>
