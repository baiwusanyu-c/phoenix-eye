/* * @addr-monitor-detail.vue * @deprecated * @author czh * @update (czh 2022/4/2) */
<template>
    <div class="addr_monitor_detail">
        <!--   基本信息     -->
        <div class="detail-body">
            <div class="detail-item">
                <div class="detail-item-txt detail-item--hash">
                    <span>{{ $t('lang.addrMonitor.tableHeader.addr') }}：</span>
                    <be-ellipsis-copy
                        custom-class="detail-copy"
                        :target-str="baseInfo.address"
                        :is-ellipsis="false"
                        :is-tooltip="false"
                        empty-text="/"
                        styles="font-weight:500"
                        font-length="8"
                        end-length="8">
                    </be-ellipsis-copy>
                </div>
                <div class="detail-item-txt detail-item--date">
                    <span class="date-label">{{ $t('lang.addrMonitor.tableHeader.createTime') }}：</span>
                    <el-tooltip placement="top" effect="light">
                        <template #content>
                            <span style="font-weight: 500">UTC：{{ beijing2utc(baseInfo.create_time) }}</span>
                        </template>
                        <span style="font-weight: 500">{{
                                formatDate(createDate(baseInfo.create_time).getTime())
                            }}</span>
                    </el-tooltip>
                </div>
            </div>
            <div class="detail-item detail-item--remark">
                <div class="detail-item-txt">
                    <span>{{ $t('lang.addrMonitor.tableHeader.remark') }}：</span>
                    <span style="font-weight: 500">{{baseInfo.remark}}</span>
                </div>
            </div>
            <div class="detail-item">
                <div class="detail-item-txt">
                    <span>{{ $t('lang.addrMonitor.tableHeader.link') }}：</span>
                    <a class="link" :href="baseInfo.link" target="_blank">{{baseInfo.link}}</a>
                </div>
            </div>
        </div>
    </div>

</template>

<script lang="ts">
  import {defineComponent,ref} from  'vue'
  import { IAddrMonitorInfo} from '../../../utils/types'
  import BeEllipsisCopy from '../../../components/common-components/ellipsis-copy/ellipsis-copy.vue'
  import {createDate,beijing2utc,formatDate} from "../../../utils/common";
  export default defineComponent({
      name:'addr-monitor-detail',
      components:{BeEllipsisCopy},
      setup(){
          const baseInfo = ref<IAddrMonitorInfo>({
              address: '0xC1323fe4b68E9a483awdqwasqwdddddddddasdwd8168a',
              remark: 'hack address hack address hack address hack address hack address',
              create_time: '2022-03-31T05:53:31.000+0000',
              link: 'https://www.baidu.com',
          })
          return {
              createDate,
              beijing2utc,
              formatDate,
              baseInfo
          }
      }
  })
</script>

<style lang="scss">
.addr_monitor_detail{
    position: relative;
    top: 0;
    left: 0;
    z-index: 1;
    box-sizing: border-box;
    width: 100%;
    height: auto;
    min-height: calc(100% - 100px);
    padding-bottom: 86px;
    .detail-body {
        box-sizing: border-box;
        @include common-container(40px);
        padding: 20px;
        background: $mainColor7-06;
        .detail-item--remark {
            grid-template-columns: 1fr 1fr;
        }
        .detail-item {
            display: grid;
            grid-template-columns: 2fr 1fr;

            .open-web {
                width: 126px;
            }

            .detail-item-txt {
                display: flex;
                align-items: center;
                margin-top: 15px;
                font-weight: bold;
                color: $textColor3;

            }
            .detail-item--hash {
                justify-content: flex-start;
            }

            .link{
                font-size: 14px;
                font-family: AlibabaPuHuiTi-Regular, sans-serif;
                font-weight: 600;
                color: #008ee9;
                line-height: 22px;
            }
        }
    }
}

</style>
