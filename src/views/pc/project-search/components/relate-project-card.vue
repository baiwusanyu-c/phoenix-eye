/* * @relate-project-card.vue * @deprecated * @author czh * @update (czh 2022/6/23) */
<template>
  <div class="relate-project-card">
    <el-avatar :size="size" :src="url" fit="cover">
      <img src="../../../../assets/image/pc/empty-avt.png" />
    </el-avatar>
    <p class="relate-project-card--name" :title="name">{{ name }}</p>
    <be-tag round="2"> {{ platform.toUpperCase() }}</be-tag>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { BeTag } from '@eagle-eye/be-ui'

  export default defineComponent({
    name: 'RelateProjectCard',
    components: { BeTag },
    props: {
      name: {
        type: String,
        default:
          'RelateProjectRelateProjectRelateRelateProjectRelateProjectRelateProjectRelateProjectRelateProjectRelateProjectProject',
      },
      size: {
        type: Number,
        default: 40,
      },
      url: {
        type: String,
        default: '../../../assets/image/pc/empty-avt.png',
      },
      platform: {
        type: String,
        default: 'BSC',
      },
    },
    setup() {
      return {}
    },
  })
</script>

<style lang="scss">
  .relate-project-card {
    cursor: pointer;
    background-color: $mainColor7;
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    min-height: 160px;
    flex: 1;
    margin: 0 10px;
    max-width: 50%;
    min-width: 18%;
    padding: 20px 0;
    &:hover {
      background-color: $mainColor2;
    }
    .relate-project-card--name {
      max-width: 80%;
      font-size: 20px;
      font-family: BarlowSemi-R, sans-serif;
      font-weight: bold;
      color: $textColor3;
      line-height: 24px;
      text-align: center;
      margin: 12px 0;
      @include ellipsis;
    }
    .be-tag {
      background: $mainColor1;
      padding: 0 6px;
      color: $mainColor7;
      border: 0;
      height: 24px;
    }
  }
</style>
