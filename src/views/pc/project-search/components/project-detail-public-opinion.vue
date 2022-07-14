<template>
  <div v-for="opinion in infoData" :key="createKey(opinion)" class="safety-opinion-info-body">
    <!--        header                -->
    <div class="safety-opinion-header">
      <div class="safety-opinion-header-title">
        <span>{{ opinion.title }}</span>
      </div>
    </div>
    <!--        body                -->
    <div class="safety-opinion-body">
      <div class="safety-opinion-body-msg scrollDiy">
        <ellipsis-copy
          :target-str="opinion.message"
          :is-ellipsis="opinion.message.length > 300 ? true : false"
          :is-show-copy-btn="false"
          :is-tooltip="false"
          styles="font-weight: 500;font-size: 14px;line-height:1.5;color: #18304e;"
          :font-length="opinion.message.length - 200"
          :end-length="0">
        </ellipsis-copy>
      </div>
    </div>
    <!--        footer                -->
    <div class="safety-opinion-footer">
      <span style="max-width: 80%">
        <be-tag
          v-for="item in opinion.label"
          :key="item.label"
          custom-class="table-tag safety-opinion-footer-tag"
          round="4"
          effect="plain">
          <span style="display: flex; align-items: center; justify-content: center; height: 20px">{{
            item
          }}</span>
        </be-tag>
      </span>
      <div style="display: flex; align-items: center; justify-content: space-between; width: 300px">
        <span class="msg-font">
          {{ $t('lang.projectExplorer.detail.source') }}:
          <a
            :href="opinion.sourceUrl"
            style="margin-left: 5px; color: #18304e; cursor: pointer"
            target="_blank">
            {{ toUpper(opinion.from) }}
          </a>
        </span>
        <el-tooltip placement="top" effect="light">
          <template #content>
            <span>UTC：{{ beijing2utc(opinion.time) }}</span>
          </template>
          <span class="msg-font">{{
            formatTimeStamp(createDate(opinion.time).getTime(), $i18n.locale)
          }}</span>
        </el-tooltip>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent } from 'vue'
  import { BeTag } from '@eagle-eye/be-ui'
  import {
    beijing2utc,
    createDate,
    formatDate,
    formatTimeStamp,
    getUuid,
  } from '../../../../utils/common'
  import EllipsisCopy from '../../../../components/common-components/ellipsis-copy/ellipsis-copy.vue'
  // @ts-ignore
  export default defineComponent({
    name: 'ProjectDetailPublicOpinion',
    components: {
      EllipsisCopy,
      BeTag,
    },
    props: {
      infoData: {
        type: Array,
        default: () => [
          {
            sourceUrl: 'https://www.jinse.com/lives/289709.html',
            title: 'BNB Chain宣布成立DeFi联盟',
            message:
              '2月17日消息，BNB Chain 宣布成立 DeFi 联盟，该联盟旨在加强 DeFi 中的用例和安全性、开发新产品并提供更多可能性。联盟将聚焦于创新、社区和安全性三个方面，将有助于在 DeFi 协议设计中充分考虑用户需求，并在部署之前彻底辩论和测试所有新功能，增强安全性并消除技术问题和错误。 DeFi 联盟的成员包括：PancakeSwap、LayerZero Labs、NodeReal、MCDEX、DODO、Venus Protocol、Deri Protocol、Tranchess、CelerNetwork、Alpaca Finance、ApolloX、Chainlink 以及 GSR。',
            from: 'Twitter',
            time: '2022-02-17T01:33:58.000+0000',
            label: ['label1', 'label2', 'label3', 'label2444', 'la45445bel2', 'labe444l2'],
          },
        ],
      },
    },
    setup() {
      const createKey = computed(() => {
        return function () {
          return getUuid()
        }
      })
      // 查看原文按钮
      const toUpper = computed(() => {
        return function (str: string) {
          return str.slice(0, 1).toUpperCase() + str.slice(1).toLowerCase()
        }
      })

      return {
        createKey,
        beijing2utc,
        formatDate,
        createDate,
        formatTimeStamp,
        toUpper,
      }
    },
  })
</script>

<style scoped lang="scss">
  .safety-opinion-info-body {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    padding: 24px;
    margin-bottom: 4px;
    background-color: $mainColor7;
    border-radius: 4px;
    box-shadow: 0 1px 0 0 rgba(0, 0, 0, 0.05);
    &:hover {
      transform: scale(1);
      @apply shadow-xl;
    }
  }

  .safety-opinion-header {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }

  .safety-opinion-footer {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-top: 10px;
  }

  .safety-opinion-footer-tag {
    min-width: 54px;
    height: 28px;
    margin-top: 5px;
    margin-right: 18px;
  }

  .safety-opinion-header-title {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    font-family: 'Barlow', sans-serif;
    color: $textColor3;
    span {
      font-size: 16px;
      font-weight: bold;
    }
  }

  .safety-opinion-body-msg {
    width: 100%;
    height: 66px;
    overflow-y: auto;
    font-size: 14px;
  }

  .msg-font {
    font-size: 14px;
    color: $textColor13;
    font-weight: 500;
  }
</style>
