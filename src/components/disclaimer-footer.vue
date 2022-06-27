/* * @disclaimer-footer.vue * @deprecated * @author czh * @update (czh 2022/6/27) */
<template>
  <div class="disclaimer-footer">
    <div class="disclaimer-footer-content">
      <be-icon
        icon="iconFileEagle"
        style="margin-right: 10px"
        color="#1CD2A9"
        width="24"
        height="24"></be-icon>
      <span class="disclaimer-title">Disclaimers：</span>
      <span
        >Any content displayed by Beosin-EagleEye only represents the objective factual data of the
        DAPPs and does not represent any investment advice ...</span
      >
      <be-button type="success" custom-class="view-btn__w" @click="switchRouter()">
        {{ $t('lang.projectExplorer.detail.view') }}
      </be-button>
    </div>
    <be-icon role="button" icon="deleteIc" custom-class="disclaimer-close" @click="close"></be-icon>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { BeIcon } from '@eagle-eye/be-ui'
  import BeButton from '@eagle-eye/be-ui/package/button/src/be-button'
  import composition from '../utils/mixin/common-func'

  export default defineComponent({
    name: 'DisclaimerFooter',
    components: { BeButton, BeIcon },
    emits: ['close'],
    setup(props, ctx) {
      const { routerPush } = composition()
      const close = (): void => {
        ctx.emit('close')
      }
      const switchRouter = (): void => {
        routerPush('/disclaimers')
        close()
      }
      return {
        switchRouter,
        close,
        routerPush,
      }
    },
  })
</script>

<style lang="scss">
  .disclaimer-footer {
    background-color: $mainColor7;
    width: 100%;
    height: 60px;
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 10;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0px -2px 4px 0px rgba(124, 154, 170, 0.15);
    .disclaimer-footer-content {
      display: flex;
      justify-content: center;
      align-items: center;
      .view-btn__w {
        margin-left: 32px;
      }
    }
    span {
      font-size: 14px;
      font-family: BarlowSemi-R, sans-serif;
      font-weight: 400;
      color: $textColor3;
      line-height: 24px;
    }
    .disclaimer-title {
      font-size: 16px;
      font-weight: bold;
    }
    .disclaimer-close {
      cursor: pointer;
      position: absolute;
      right: 20px;
      use {
        fill: #8a929c;
      }
    }
  }
</style>
