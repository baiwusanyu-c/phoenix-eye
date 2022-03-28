/* * @trx-retry.vue * @deprecated 重置交易风险 * @author czh * @update (czh 2022/3/24) */
<template>
  <div class="trx-retry-main eagle-page">
    <div class="trx-retry-container">
      <div class="project-manage-search-input">
        <el-select
          v-model="curPlatform"
          style="float: right; width: 180px; margin-right: 16px"
          @change="handleSelect">
          <el-option
            v-for="item in platformList"
            :key="item.id"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-input
          v-model="searchParams"
          :placeholder="$t('lang.trxRetry.searchP')"
          style="margin-right: 16px" />
        <be-button
          type="success"
          custom-class="eagle-btn search-btn"
          size="large"
          round="4"
          @click="getList">
          <span>{{ $t('lang.reTry') }}</span>
        </be-button>
      </div>
      <p class="subTitle text-left mt-8" style="float: right; width: calc(100% - 160px)">
        {{ $t('lang.trxRetry.result') }}
      </p>
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue'
  import { BeButton } from '../../../../public/be-ui/be-ui.es'
  import { platformListDict } from '../../../utils/platform-dict'
  import composition from '../../../utils/mixin/common-func'
  export default defineComponent({
    name: 'TrxRetry',
    components: {
      BeButton,
    },
    setup() {
      const { message } = composition()
      const curPlatform = ref<string>('ALL')
      const platformList = platformListDict.concat([
        { label: 'ALL', value: 'all', id: 'qwdgsnldjaaaaaktg' },
      ])
      const handleSelect = (platform: string): void => {
        curPlatform.value = platform
      }
      const searchParams = ref<string>('')
      const reTry = (): void => {
        message('error', 'err')
      }
      return {
        handleSelect,
        curPlatform,
        platformList,
        reTry,
        searchParams,
      }
    },
  })
</script>
<style lang="scss">
  .trx-retry-main {
    min-height: calc(100% - 100px);

    .subTitle {
      font-family: AlibabaPuHuiTi-Regular, sans-serif;
      font-size: 18px;
      font-weight: 400;
      color: $textColor12;
    }
  }

  .trx-retry-container {
    width: 70%;
    margin: 40px auto 0 auto;
    text-align: center;

    .project-manage-search-input {
      display: flex;

      input::-webkit-input-placeholder {

        /* WebKit browsers */
        font-family: AlibabaPuHuiTi-Regular, sans-serif;
        font-size: 18px;
        color: $mainColor14;
      }

      .el-input__inner {
        height: 52px;
        font-family: AlibabaPuHuiTi-Regular, sans-serif;
        font-size: 18px;
        line-height: 52px;
        color: $textColor4;
      }
    }
  }
</style>
