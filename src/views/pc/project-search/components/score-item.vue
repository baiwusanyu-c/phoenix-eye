/* * @score-item.vue * @deprecated * @author czh * @update (czh 2022/5/26) */
<template>
  <div class="score-item" :class="!hasTokenAddress ? 'score-item--un' : ''">
    <div>
      <p>{{ $t('lang.projectExplorer.detail.scoreItem1') }}</p>
      <span>{{ $t('lang.projectExplorer.detail.scoreItemDesc1') }}</span>
    </div>
    <score-cell v-if="hasTokenAddress" :score="data.audit_report_score"></score-cell>
    <img v-if="!hasTokenAddress" alt="" src="../../../../assets/image/pc/no-token4.png" />
  </div>
  <div class="score-item" :class="!hasTokenAddress ? 'score-item--un' : ''">
    <div>
      <p>{{ $t('lang.projectExplorer.detail.scoreItem2') }}</p>
      <span>{{ $t('lang.projectExplorer.detail.scoreItemDesc2') }}</span>
    </div>
    <score-cell v-if="hasTokenAddress" :score="data.decentralization_score"></score-cell>
    <img v-if="!hasTokenAddress" alt="" src="../../../../assets/image/pc/no-token4.png" />
  </div>
  <div class="score-item" :class="!hasTokenAddress ? 'score-item--un' : ''">
    <div>
      <p>{{ $t('lang.projectExplorer.detail.scoreItem3') }}</p>
      <span>{{ $t('lang.projectExplorer.detail.scoreItemDesc3') }}</span>
    </div>
    <score-cell v-if="hasTokenAddress" :score="data.market_volatility_score"></score-cell>
    <img v-if="!hasTokenAddress" alt="" src="../../../../assets/image/pc/no-token5.png" />
  </div>
  <div class="score-item" :class="!hasTokenAddress ? 'score-item--un' : ''">
    <div>
      <p>{{ $t('lang.projectExplorer.detail.scoreItem4') }}</p>
      <span>{{ $t('lang.projectExplorer.detail.scoreItemDesc4') }}</span>
    </div>
    <score-cell v-if="hasTokenAddress" :score="data.diaphaneity_score"></score-cell>
    <img v-if="!hasTokenAddress" alt="" src="../../../../assets/image/pc/no-token4.png" />
  </div>
  <div class="score-item" :class="!hasTokenAddress ? 'score-item--un' : ''">
    <div>
      <p>{{ $t('lang.projectExplorer.detail.scoreItem5') }}</p>
      <span>{{ $t('lang.projectExplorer.detail.scoreItemDesc5') }}</span>
    </div>
    <score-cell v-if="hasTokenAddress" :score="data.risk_tx_score"></score-cell>
    <img v-if="!hasTokenAddress" alt="" src="../../../../assets/image/pc/no-token5.png" />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import ScoreCell from '../../../../components/common-components/score-cell/score-cell.vue'
  import type { PropType } from 'vue'
  import type { IScoreItems } from '../../../../utils/types'

  export default defineComponent({
    name: 'ScoreItem',
    components: { ScoreCell },
    props: {
      data: {
        type: Object as PropType<IScoreItems>,
      },
      hasTokenAddress: {
        type: Boolean,
        default: false,
      },
    },
  })
</script>

<style lang="scss">
  .score-item--un {
    padding: 0 20px !important;
    margin-bottom: 0 !important;
  }
  .score-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 4px;
    padding: 8px 20px;
    margin-bottom: 12px;
    &:hover {
      background: $mainColor22;
    }
    .be-progress .be-progress-circle .be-progress-circle--text {
      text-align: center;
    }
    p {
      font-size: 18px;
      font-family: 'Barlow', sans-serif;
      font-weight: bold;
      color: $textColor3;
      line-height: 24px;
    }
    span {
      font-size: 14px;
      font-family: 'Barlow', sans-serif;
      font-weight: 400;
      color: #18304e;
      line-height: 20px;
    }
  }
</style>
