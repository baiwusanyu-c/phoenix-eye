/* * @market-govern.vue * @deprecated * @author czh * @update (czh 2022/5/25) */
<template>
  <div class="market-govern">
    <title-cell
      url="../src/assets/image/pc/govern-logo.png"
      font-size="20"
      :name="$t('lang.projectExplorer.detail.titleGovern')">
    </title-cell>

    <p class="market-govern--label" style="margin-top: 38px">
      {{ $t('lang.projectExplorer.detail.governLabel1') }}
    </p>
    <div class="market-govern--item">
      <span class="market-govern--subLabel">
        {{ $t('lang.projectExplorer.detail.governSubLabel1') }}
      </span>
      <be-button
        :custom-class="setBtnClass(data.github)"
        :disabled="!data.github"
        @click="handleClick('github')">
        {{ $t('lang.projectExplorer.detail.view') }}
      </be-button>
    </div>

    <p class="market-govern--label">
      {{ $t('lang.projectExplorer.detail.governLabel2') }}
    </p>
    <div class="market-govern--item">
      <span class="market-govern--subLabel">
        {{ $t('lang.projectExplorer.detail.governSubLabel2') }}
      </span>
      <be-button
        :custom-class="setBtnClass(data.website)"
        :disabled="!data.website"
        @click="handleClick('website')">
        {{ $t('lang.projectExplorer.detail.view') }}
      </be-button>
    </div>
    <div class="market-govern--item">
      <span class="market-govern--subLabel">
        {{ $t('lang.projectExplorer.detail.governSubLabel3') }}
      </span>
      <be-button
        :disabled="!(data.twitter || data.telegram)"
        :custom-class="setBtnClass(data.twitter || data.telegram)"
        @click="handleClick('social')">
        {{ $t('lang.projectExplorer.detail.view') }}
      </be-button>
    </div>
    <div class="market-govern--item">
      <span class="market-govern--subLabel">
        {{ $t('lang.projectExplorer.detail.governSubLabel4') }}
      </span>
      <be-button
        :custom-class="setBtnClass(data.address_markup)"
        :disabled="!data.address_markup"
        @click="handleClick('address_markup')">
        {{ $t('lang.projectExplorer.detail.view') }}
      </be-button>
    </div>

    <p class="market-govern--label">
      {{ $t('lang.projectExplorer.detail.governLabel3') }}
    </p>
    <div class="market-govern--item">
      <span class="market-govern--subLabel">
        {{ $t('lang.projectExplorer.detail.governSubLabel5') }}
      </span>
      <be-button
        :custom-class="setBtnClass(data.white_paper)"
        :disabled="!data.white_paper"
        @click="handleClick('white_paper')">
        {{ $t('lang.projectExplorer.detail.view') }}
      </be-button>
    </div>

    <div class="market-govern--item">
      <span class="market-govern--label">
        {{ $t('lang.projectExplorer.detail.governLabel4') }}
      </span>
      <be-button
        :custom-class="setBtnClass(data.exchange_board)"
        :disabled="!data.exchange_board"
        @click="handleClick('exchange_board')">
        {{ $t('lang.projectExplorer.detail.view') }}
      </be-button>
    </div>

    <div class="market-govern--item">
      <span class="market-govern--label">
        {{ $t('lang.projectExplorer.detail.governLabel5') }}
      </span>
      <be-button
        :custom-class="setBtnClass(data.test_chain)"
        :disabled="!data.test_chain"
        @click="handleClick('test_chain')">
        {{ $t('lang.projectExplorer.detail.view') }}
      </be-button>
    </div>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent } from 'vue'
  import { useI18n } from 'vue-i18n'
  import TitleCell from '../../../../components/common-components/title-cell/title-cell.vue'
  // @ts-ignore
  import { BeButton } from '../../../../../public/be-ui/be-ui.es'
  import type { PropType } from 'vue'
  import type { IGovern } from '../../../../utils/types'
  export default defineComponent({
    name: 'MarketGovern',
    components: { TitleCell, BeButton },
    props: {
      data: {
        type: Object as PropType<IGovern>,
        default() {
          return {}
        },
      },
    },
    setup() {
      const { t } = useI18n()
      const setBtnText = computed(() => {
        return function (str: string) {
          if (!str) {
            return t('lang.projectExplorer.detail.unknows')
          } else {
            return t('lang.projectExplorer.detail.view')
          }
        }
      })
      const setBtnClass = computed(() => {
        return function (str: string) {
          if (!str) {
            return 'view-btn unknown-btn'
          } else {
            return 'view-btn'
          }
        }
      })
      const handleClick = (): void => {
        debugger
      }
      return {
        handleClick,
        setBtnText,
        setBtnClass,
      }
    },
  })
</script>

<style lang="scss">
  .market-govern {
    width: 387px;
    background-color: $mainColor7;
    border-radius: 8px;
    margin-bottom: 12px;
    padding: 24px;
    box-sizing: border-box;
    .market-govern--label {
      font-size: 18px;
      font-family: BarlowSemi-B, sans-serif;
      font-weight: bold;
      color: $textColor3;
      line-height: 22px;
      margin-bottom: 16px;
      margin-top: 20px;
    }
    .market-govern--subLabel {
      font-size: 16px;
      font-family: BarlowSemi-B, sans-serif;
      font-weight: 400;
      color: $textColor3;
      line-height: 24px;
    }
    .market-govern--item {
      margin-bottom: 6px;
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .view-btn {
      width: 66px;
      height: 24px;
      background: #18304e;
      border-radius: 4px;
      font-size: 16px;
      font-family: BarlowSemi-B, sans-serif;
      font-weight: bold;
      color: $mainColor7;
      line-height: 24px;
    }
    .unknown-btn {
      background: $mainColor14;
    }
  }
</style>
