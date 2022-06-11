/* * @security-card.vue * @deprecated * @author czh * @update (czh 2022/5/23) */
<template>
  <div class="security-card">
    <div class="security-card--head">
      <div class="security-card--decr">
        <ellipsis-copy
          :target-str="title"
          :is-ellipsis="title.length > 60 ? true : false"
          :is-show-copy-btn="false"
          :is-tooltip="true"
          styles="color: #fff;font-weight: bold;font-size: 20px;line-height: 24px;"
          tooltip-style="max-width: 300px;word-break: break-all;display: inline-block"
          font-length="60"
          end-length="0">
        </ellipsis-copy>
      </div>
      <div class="security-card--tag scroll-diy">
        <be-tag v-for="item in tagListArr" :key="item" :round="2">
          {{ item }}
        </be-tag>
      </div>
    </div>
    <div class="security-card--body">
      <div>
        <ellipsis-copy
          :target-str="info.replace(/[\r\n]/g, '')"
          :is-ellipsis="info.replace(/[\r\n]/g, '').length > 250 ? true : false"
          :is-show-copy-btn="false"
          :is-tooltip="false"
          styles="color: #333333;font-size: 14px;line-height: 17px;word-break: break-all;"
          font-length="250"
          end-length="0">
        </ellipsis-copy>
      </div>
      <div style="position: absolute; left: 20px; bottom: 20px; width: calc(100% - 40px)">
        <div class="security-card--body--foo">
          <span style="display: flex; align-items: center">
            Source:
            <a v-if="sourceName !== 'twitter'" :href="sourceUrl" target="_blank">
              {{ sourceName }}
            </a>
            <be-icon
              v-if="sourceName === 'twitter'"
              style="cursor: pointer"
              width="18"
              height="19"
              icon="iconTwitterBlu"
              :herf="sourceUrl"
              @click="openWindow(sourceUrl)">
            </be-icon>
          </span>
          <span>{{ formatTimeStamp(createDate(createTime).getTime(), $i18n.locale) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue'
  // @ts-ignore
  import { BeIcon, BeTag } from '@eagle-eye/be-ui'
  import { createDate, formatTimeStamp, openWindow } from '../../../../utils/common'
  import type { PropType } from 'vue'

  export default defineComponent({
    name: 'SecurityCard',
    components: { BeTag, BeIcon },
    props: {
      sourceUrl: {
        type: String,
        default: '',
      },
      title: {
        type: String,
        default: '',
      },
      info: {
        type: String,
        default: '',
      },
      createTime: {
        type: String,
        default: '',
      },
      sourceName: {
        type: String,
        default: '',
      },
      tagList: {
        type: Array as PropType<Array<string>>,
        default: () => ['PHISHING', 'ETH'],
      },
    },
    setup(props) {
      const tagListArr = ref<Array<string>>([])
      tagListArr.value = props.tagList?.map(val => val.toUpperCase())
      return {
        tagListArr,
        openWindow,
        createDate,
        formatTimeStamp,
      }
    },
  })
</script>

<style lang="scss">
  .security-card {
    width: 300px;
    height: 373px;
    margin-right: 24px;
    .security-card--head {
      height: 160px;
      padding: 20px;
      box-sizing: border-box;
      background-image: url('../../../../assets/image/pc/security-card-bg.png');
      background-repeat: round;

      .ellipsis-copy {
        word-break: break-all;
        text-align: left;
      }

      .security-card--tag {
        margin-top: 10px;
        display: flex;
        overflow-x: auto;
      }

      .be-tag {
        margin: 5px;
        background: $mainColor3;
        border-radius: 2px;
        border: 0;
        height: 24px;

        span {
          color: $textColor3;
          font-size: 14px;
          font-family: BarlowSemi-B, sans-serif;
          font-weight: 400;
          line-height: 17px;
          width: max-content;
        }
      }
    }

    .security-card--body {
      padding: 20px;
      box-sizing: border-box;
      text-align: left;
      background-color: $mainColor7;
      border-radius: 4px;
      height: 213px;
      position: relative;
      left: 0;
      top: 0;

      .security-card--body--foo {
        margin-top: 10px;
        display: flex;
        justify-content: space-between;
        span {
          font-size: 14px;
          font-family: BarlowSemi-B, sans-serif;
          font-weight: 400;
          color: $textColor13;
          line-height: 17px;
        }

        a {
          color: $mainColor3;
        }
      }
    }
  }
  /* 移动端预留 适配 */
  @media screen and (max-width: 1280px) {
    .security-card {
      width: 280px;
      margin-right: 14px;
      .security-card--head {
        padding: 10px;
      }
      .security-card--body {
        padding: 10px;
      }
    }
  }
  /* 150% 适配 */
  @media screen and (min-width: 1280px) and (max-width: 1326px) {
    .security-card {
      width: 280px;
      margin-right: 14px;
      .security-card--head {
        padding: 10px;
      }
      .security-card--body {
        padding: 10px;
      }
    }
  }

  /* 125% 适配 */
  @media screen and (min-width: 1328px) and (max-width: 1538px) {
    .security-card {
      width: 284px;
      .security-card--head {
        padding: 12px;
      }
      .security-card--body {
        padding: 12px;
      }
    }
  }

  /* 110% 适配 */
  @media screen and (min-width: 1540px) and (max-width: 1750px) {
    .security-card {
      width: 290px;
      .security-card--head {
        padding: 16px;
      }
      .security-card--body {
        padding: 16px;
      }
    }
  }
</style>
