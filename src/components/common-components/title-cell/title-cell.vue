/* * @title-cell.vue * @deprecated * @author czh * @update (czh 2022/5/19) */
<template>
  <div class="flex items-center title-cell">
    <img v-if="url" :src="url" alt=" " :style="`width:${size}px;height:${size}px`" />
    <span :style="`font-size:${fontSize}px`">{{ name }}</span>
    <span :style="`font-size:${20}px;color:#8A96A3;font-weight:400`">{{ subContent }}</span>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'TitleCell',
    props: {
      name: {
        type: String,
      },
      subContent: {
        type: String,
      },
      size: {
        type: Number,
        default: 36,
      },
      fontSize: {
        type: Number,
        default: 24,
      },
      url: {
        type: String,
        default: 'https://avatars.githubusercontent.com/u/32354856?v=4',
      },
    },
  })
</script>
<style lang="scss">
  .title-cell {
    span {
      line-height: 24px;
      margin-left: 8px;
      font-weight: bold;
      color: $textColor3;
      font-family: 'Barlow', sans-serif;
    }
  }
</style>
