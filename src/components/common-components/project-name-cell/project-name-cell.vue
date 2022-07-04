/* * @project-name-cell.vue * @deprecated * @author czh * @update (czh 2022/5/18) */
<template>
  <div class="flex items-center project-name-cell">
    <el-avatar :size="size" :src="url" fit="cover">
      <img src="../../../assets/image/pc/empty-avt.png" />
    </el-avatar>
    <ellipsis-copy
      v-if="isEll"
      :target-str="name"
      :is-ellipsis="(name && name.length) >= ellipsisLen ? true : false"
      :is-show-copy-btn="false"
      :is-tooltip="true"
      :styles="`color: #18304E;font-weight: bold;font-size: 14px;${styles}`"
      :font-length="fontLen"
      end-length="0">
    </ellipsis-copy>
    <span v-else :style="styles">{{ name }}</span>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent } from 'vue'

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
        default: '../../../assets/image/pc/empty-avt.png',
      },
      isEll: {
        type: Boolean,
        default: true,
      },
      ellipsisLen: {
        type: Number,
        default: 12,
      },
      fontLen: {
        type: Number,
        default: 8,
      },
      width: {
        type: String,
        default: '116',
      },
      isFixedWidth: {
        type: Boolean,
        default: false,
      },
      styles: {
        type: String,
        default: '',
      },
    },
    setup(props) {
      const ellipsisCopy = computed(() => {
        return `${props.width}px`
      })
      const ellipsisFixedWidth = computed(() => {
        return props.isFixedWidth ? `${props.width}px` : ''
      })
      return {
        ellipsisCopy,
        ellipsisFixedWidth,
      }
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
      font-family: BarlowSemi-B, sans-serif;
      margin-right: 6px;
    }
    .ellipsis-copy {
      min-width: initial !important;
      width: v-bind(ellipsisFixedWidth);
      max-width: v-bind(ellipsisCopy);
    }
  }

  /* 移动端预留 适配 */
  @media screen and (max-width: 1280px) {
    .project-name-cell {
      span {
        font-size: 12px;
      }
    }
  }
  /* 150% 适配 */
  @media screen and (min-width: 1280px) and (max-width: 1326px) {
    .project-name-cell {
      span {
        font-size: 12px;
      }
    }
  }
  /*
  !* 125% 适配 *!
  @media screen and (min-width: 1328px) and (max-width: 1538px) {
    .project-name-cell {
      span {
        font-size: 12px;
      }
    }
  }
  !* 110% 适配 *!
  @media screen and (min-width: 1540px) and (max-width: 1750px) {
    .project-name-cell {
      span {
        font-size: 12px;
      }
    }
  }*/
</style>
