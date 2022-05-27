/* * @security-info-card.vue * @deprecated * @author czh * @update (czh 2022/5/25) */
<template>
  <div class="security-info-card">
    <el-descriptions
      v-for="item in dataList"
      :key="item.project_name + item.abstract_content"
      style="width: 49%; margin-bottom: 16px"
      :column="1">
      <el-descriptions-item
        :label="$t('lang.projectExplorer.detail.securtityEventLabel1')"
        label-align="left"
        align="left"
        label-class-name="security-info-label"
        class-name="security-info-content scroll-diy"
        >{{ item.project_name }}
      </el-descriptions-item>
      <el-descriptions-item
        :label="$t('lang.projectExplorer.detail.securtityEventLabel2')"
        label-align="left"
        align="left"
        label-class-name="security-info-label"
        class-name="security-info-content scroll-diy"
        >{{ item.abstract_content }}
      </el-descriptions-item>
      <el-descriptions-item
        :label="$t('lang.projectExplorer.detail.securtityEventLabel3')"
        label-align="left"
        align="left"
        label-class-name="security-info-label"
        class-name="security-info-content scroll-diy"
        >{{ item.attack_type }}
      </el-descriptions-item>
      <el-descriptions-item
        :label="$t('lang.projectExplorer.detail.securtityEventLabel4')"
        label-align="left"
        align="left"
        label-class-name="security-info-label"
        class-name="security-info-content scroll-diy"
        ><span>{{
          isEmpty(item.loss_amount, '/') === '/' ? '/' : `$${formatMoney(item.loss_amount)}`
        }}</span>
      </el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import composition from '../../../../utils/mixin/common-func'
  import { formatMoney } from '../../../../utils/common'
  import type { PropType } from 'vue'
  import type { securityInfoList } from '../../../../utils/types'
  export default defineComponent({
    name: 'SecurityInfoCard',
    props: {
      dataList: {
        type: Array as PropType<Array<securityInfoList>>,
        default: () => [
          {
            project_name: 'kooriookami',
            attect_type:
              'kooriookamikoorikooriookamikooriookamikooriookamikooriookamikooriookamikooriookamikooriookamikooriookamikooriookamikooriookamikooriookamikooriookamikooriookamikooriookamikooriookamikooriookamikooriookamikooriookamikooriookamikooriookamikooriookamikooriookamikooriookamikooriookamikooriookamikooriookamikooriookamikooriookamikooriookamikooriookamikooriookamikooriookamikooriookamikooriookamikooriookamikooriookamikooriookamikooriookamikooriookamiookamikooriookamikooriookamikooriookamikooriookamikooriookamikooriookamikooriookamikooriookamikooriookamikooriookamikooriookami',
            amount: 1024,
            abstract: 'kooriookami',
          },
          {
            project_name: 'kooriookami',
            attect_type: 'kooriookami',
            amount: 1024,
            abstract: 'kooriookami',
          },
        ],
      },
    },
    setup() {
      const { isEmpty } = composition()
      return { formatMoney, isEmpty }
    },
  })
</script>

<style lang="scss">
  .security-info-card {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .el-descriptions {
      background-color: $mainColor7;
      border-radius: 4px;
      padding: 24px 24px 0 50px;
      box-sizing: border-box;
      .el-descriptions__body {
        position: relative;
        &::before {
          width: 5px;
          border-radius: 4px;
          background-color: #f3ba2f;
          height: calc(100% - 20px);
          content: '';
          position: absolute;
          left: -16px;
          top: 0;
        }
      }
    }
    .security-info-label {
      width: 120px;
      display: inline-block;
      font-size: 14px;
      font-family: BarlowSemi-R, sans-serif;
      font-weight: bold;
      color: $textColor3;
      line-height: 17px;
      vertical-align: top;
    }
    .security-info-content {
      font-size: 14px;
      font-family: BarlowSemi-R, sans-serif;
      font-weight: 400;
      color: $textColor1;
      line-height: 17px;
      display: inline-block;
      width: 72%;
      word-break: break-all;
      /*   max-height: 54px;
        overflow-y: auto;*/
    }
  }
</style>
