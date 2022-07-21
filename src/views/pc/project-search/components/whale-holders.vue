/* * @whale-holders.vue * @deprecated * @author czh * @update (czh 2022/5/26) */
<template>
  <div class="project-detail-decent--body">
    <div class="project-detail-decent--title">
      <p>{{ $t('lang.projectExplorer.detail.whaleTitle') }}</p>
      <div v-if="liquidityList.length > 0" class="project-detail-decent-tab">
        <div
          class="tab-item"
          :class="{ 'tab-item__active': activeTab === 'Token' }"
          role="button"
          @click="handleTabClick('Token')">
          {{ $t('lang.projectExplorer.detail.whaleTab1') }}
        </div>
        <div
          class="tab-item"
          role="button"
          :class="{ 'tab-item__active': activeTab === 'Liquidity' }"
          @click="handleTabClick('Liquidity')">
          {{ $t('lang.projectExplorer.detail.whaleTab2') }}
        </div>
      </div>
    </div>
    <div v-if="activeTab === 'Token'">
      <div class="token-holders-distribution">
        <div style="width: 50%">
          <p class="whale-sub-title" style="margin-bottom: 22px">
            {{ $t('lang.projectExplorer.detail.whaleTitle1') }}
            <el-tooltip placement="top">
              <template #content>
                {{ $t('lang.projectExplorer.detail.descr7') }}
              </template>
              <be-icon
                icon="iconHelpEagle"
                style="margin-left: 6px; vertical-align: bottom"></be-icon>
            </el-tooltip>
          </p>
          <pie-cell
            dom-id="whale_chart__pie"
            :pie-data="pieData.chartData"
            :content="pieData.total"
            item="feature"
            percent="ratio"></pie-cell>
        </div>
        <div style="width: 50%">
          <p class="whale-sub-title">{{ $t('lang.projectExplorer.detail.whaleTitle2') }}</p>
          <el-table v-loading="loading" :data="top10HolderList" row-class-name="top-10-row">
            <template #empty>
              <empty-data></empty-data>
            </template>
            <el-table-column prop="address" width="60">
              <template #header>
                <span class="table-head"></span>
              </template>
              <template #default="scope">
                <be-icon
                  v-if="scope.row.percentage > 20"
                  width="32"
                  height="32"
                  icon="iconJing"></be-icon>
                <span v-else></span>
              </template>
            </el-table-column>
            <el-table-column prop="address" width="140">
              <template #header>
                <span class="table-head">{{
                  $t('lang.projectExplorer.detail.tableHeader1.address')
                }}</span>
              </template>
              <template #default="scope">
                <ellipsis-copy
                  :target-str="scope.row.showVal"
                  :tooltip-txt="scope.row.address"
                  :is-ellipsis="scope.row.showVal && scope.row.showVal.length > 14 ? true : false"
                  :is-show-copy-btn="false"
                  :is-tooltip="true"
                  styles="color: #18304E;font-weight: bold;font-size: 14px;"
                  font-length="6"
                  end-length="6">
                </ellipsis-copy>
              </template>
            </el-table-column>
            <el-table-column prop="percentage">
              <template #header>
                <span class="table-head">{{
                  $t('lang.projectExplorer.detail.tableHeader1.proportion')
                }}</span>
              </template>
              <template #default="scope">
                <div class="token-val token-percentage">
                  <be-progress
                    :percent="scope.row.percentage"
                    status="normal"
                    color="#18304E"
                    :show-info="false">
                  </be-progress>
                  <span style="color: #18304e; font-weight: bold; font-size: 14px">
                    {{ simulateToFixed(scope.row.percentage, 2) }}%
                  </span>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="quantity" width="170">
              <template #header>
                <span class="table-head">{{
                  $t('lang.projectExplorer.detail.tableHeader1.amount')
                }}</span>
              </template>
              <template #default="scope">
                <el-tooltip :content="scope.row.quantity" placement="top" effect="light">
                  <span style="color: #18304e; font-weight: bold; font-size: 14px">
                    {{ nFormats(scope.row.quantity) }}
                  </span>
                </el-tooltip>
              </template>
            </el-table-column>
          </el-table>
          <div v-if="top10HolderList.length > 0" class="front-page">
            <div class="front-page--body">
              <span>{{ pageParams.currentPage }} / {{ pageNum }}</span>
              <div class="page-btn-group">
                <div class="page-btn" @click="prevPage(pageParams, getTop10Holder)">◀</div>
                <div class="page-btn" @click="nextPage(pageParams, pageNum, getTop10Holder)">▶</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="activeTab === 'Liquidity'" class="liquidity">
      <p class="whale-sub-title">{{ $t('lang.projectExplorer.detail.whaleTitle4') }}</p>
      <el-table v-loading="loadingLiquidity" :data="liquidityList">
        <template #empty>
          <empty-data></empty-data>
        </template>
        <el-table-column prop="showValHold" width="300">
          <template #header>
            <span class="table-head">{{
              $t('lang.projectExplorer.detail.tableHeader3.liquidityPair')
            }}</span>
          </template>
          <template #default="scope">
            <el-tooltip placement="top" effect="light">
              <template #content>
                <a target="_blank" :href="createUrlWeb(scope.row.pair_address, 'token', platform)">
                  {{ scope.row.pair_address }}</a
                >
              </template>
              <div class="token-val" style="width: max-content">
                <ellipsis-copy
                  empty-text=" "
                  :target-str="scope.row.showTokenVal1"
                  :is-ellipsis="
                    scope.row.showTokenVal1 && scope.row.showTokenVal1.length > 14 ? true : false
                  "
                  :is-show-copy-btn="false"
                  :is-tooltip="false"
                  styles="color: #1CD2A9;font-weight: bold;font-size: 14px;"
                  font-length="6"
                  end-length="6">
                </ellipsis-copy>
                <span class="link-span">/</span>
                <ellipsis-copy
                  empty-text=" "
                  :target-str="scope.row.showTokenVal2"
                  :tooltip-txt="scope.row.pair_address"
                  :is-ellipsis="
                    scope.row.showTokenVal2 && scope.row.showTokenVal2.length > 14 ? true : false
                  "
                  :is-show-copy-btn="false"
                  :is-tooltip="false"
                  styles="color: #1CD2A9;font-weight: bold;font-size: 14px;"
                  font-length="6"
                  end-length="6">
                </ellipsis-copy>
              </div>
            </el-tooltip>
          </template>
        </el-table-column>

        <el-table-column prop="percentage" width="320" align="center">
          <template #header>
            <span class="table-head">{{
              $t('lang.projectExplorer.detail.tableHeader1.proportion')
            }}</span>
          </template>
          <template #default="scope">
            <div class="token-val">
              <be-progress
                :percent="scope.row.percentage"
                status="normal"
                color="#18304E"
                :show-info="false">
              </be-progress>
              <span style="color: #18304e; font-weight: bold; font-size: 14px; width: 80px">
                {{ simulateToFixed(scope.row.percentage, 2) }}%
              </span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="quantity" align="center">
          <template #header>
            <span class="table-head">{{
              $t('lang.projectExplorer.detail.tableHeader1.amount')
            }}</span>
          </template>
          <template #default="scope">
            <el-tooltip :content="scope.row.quantity" placement="top" effect="light">
              <span style="color: #18304e; font-weight: bold; font-size: 14px">
                {{ nFormats(scope.row.quantity) }}
              </span>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="address" width="180">
          <template #header>
            <span class="table-head">{{
              $t('lang.projectExplorer.detail.tableHeader1.address')
            }}</span>
          </template>
          <template #default="scope">
            <ellipsis-copy
              :target-str="scope.row.showVal"
              :is-ellipsis="scope.row.showVal && scope.row.showVal.length > 14 ? true : false"
              :is-show-copy-btn="false"
              :is-tooltip="true"
              styles="color: #18304E;font-weight: bold;font-size: 14px;"
              font-length="6"
              end-length="6">
            </ellipsis-copy>
          </template>
        </el-table-column>
        <el-table-column prop="address" width="60">
          <template #header>
            <span class="table-head"></span>
          </template>
          <template #default="scope">
            <be-icon
              v-if="scope.row.percentage > 20"
              width="32"
              height="32"
              icon="iconJing"></be-icon>
            <span v-else></span>
          </template>
        </el-table-column>
      </el-table>
      <div class="front-page">
        <div class="front-page--body">
          <span>{{ pageLiquidity.currentPage }} / {{ pageNumLiquidity }}</span>
          <div class="page-btn-group">
            <div class="page-btn" @click="prevPage(pageLiquidity, getLiquidityList)">◀</div>
            <div
              class="page-btn"
              @click="nextPage(pageLiquidity, pageNumLiquidity, getLiquidityList)">
              ▶
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="privilegesList.length > 0" style="margin-top: 22px">
      <div class="project-detail-decent--title">
        <p>
          {{ $t('lang.projectExplorer.detail.whaleTitle3') }}
        </p>
      </div>
      <el-table v-loading="loadingPrivileges" :data="privilegesList" row-class-name="top-10-row">
        <template #empty>
          <empty-data></empty-data>
        </template>
        <el-table-column prop="showValContract" width="180">
          <template #header>
            <span class="table-head">{{
              $t('lang.projectExplorer.detail.tableHeader2.contract')
            }}</span>
          </template>
          <template #default="scope">
            <ellipsis-copy
              :target-str="scope.row.showValContract"
              :tooltip-txt="scope.row.contract_address"
              :is-ellipsis="
                scope.row.showValContract && scope.row.showValContract.length > 14 ? true : false
              "
              :is-show-copy-btn="false"
              :is-tooltip="true"
              styles="color: #18304E;font-weight: bold;font-size: 14px;"
              font-length="6"
              end-length="6">
            </ellipsis-copy>
          </template>
        </el-table-column>
        <el-table-column prop="type" width="180">
          <template #header>
            <span class="table-head">{{
              $t('lang.projectExplorer.detail.tableHeader2.function')
            }}</span>
          </template>
          <template #default="scope">
            <p class="function-tag">{{ scope.row.type }}</p>
          </template>
        </el-table-column>
        <el-table-column prop="showValHold" width="180">
          <template #header>
            <span class="table-head">{{
              $t('lang.projectExplorer.detail.tableHeader2.holdAddress')
            }}</span>
          </template>
          <template #default="scope">
            <ellipsis-copy
              :target-str="scope.row.showValHold"
              :tooltip-txt="scope.row.hold_address"
              :is-ellipsis="
                scope.row.showValHold && scope.row.showValHold.length > 14 ? true : false
              "
              :is-show-copy-btn="false"
              :is-tooltip="true"
              styles="color: #18304E;font-weight: bold;font-size: 14px;"
              font-length="6"
              end-length="6">
            </ellipsis-copy>
          </template>
        </el-table-column>
        <el-table-column prop="hash" width="180">
          <template #header>
            <span class="table-head">{{
              $t('lang.projectExplorer.detail.tableHeader2.txHash')
            }}</span>
          </template>
          <template #default="scope">
            <ellipsis-copy
              :target-str="scope.row.hash"
              :is-ellipsis="scope.row.hash && scope.row.hash.length > 14 ? true : false"
              :is-show-copy-btn="false"
              :is-tooltip="true"
              styles="color: #0ED9AC;font-weight: bold;font-size: 14px;"
              font-length="6"
              end-length="6">
            </ellipsis-copy>
          </template>
        </el-table-column>
        <el-table-column prop="block_time" width="180">
          <template #header>
            <span class="table-head">{{ $t('lang.projectExplorer.detail.tableHeader2.age') }}</span>
          </template>
          <template #default="scope">
            <el-tooltip
              :content="`${formatDate(
                createDate(scope.row.block_time).toString()
              )}  UTC：${beijing2utc(scope.row.block_time)}`"
              placement="top"
              effect="light">
              {{ formatTimeStamp(createDate(scope.row.block_time).getTime(), $i18n.locale) }}
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <div class="front-page">
        <div class="front-page--body">
          <span>{{ pagePrivileges.currentPage }} / {{ pageNumPrivileges }}</span>
          <div class="page-btn-group">
            <div class="page-btn" @click="prevPage(pagePrivileges, getPrivilegesList)">◀</div>
            <div
              class="page-btn"
              @click="nextPage(pagePrivileges, pageNumPrivileges, getPrivilegesList)">
              ▶
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, onMounted, ref, watch } from 'vue'
  import { BeIcon, BeProgress } from '@eagle-eye/be-ui'
  import compositionPage from '../../../../utils/mixin/page-param'
  import { getLiquidity, getPrivilege, getTop10HolderList } from '../../../../api/project-explorer'
  import composition from '../../../../utils/mixin/common-func'
  import {
    beijing2utc,
    createDate,
    formatDate,
    formatTimeStamp,
    nFormats,
    simulateToFixed,
  } from '../../../../utils/common'
  // @ts-ignore
  import { webURL } from '../../../../enums/link'
  import type { ILiquidity, IPrivilege, ITop10Holder, IWhalePieData } from '../../../../utils/types'
  import type { PropType } from 'vue'
  export default defineComponent({
    name: 'WhaleHolders',
    components: { BeIcon, BeProgress },
    props: {
      platform: {
        type: String,
      },
      projectId: {
        type: String,
        default: '',
      },
      pieData: {
        type: Object as PropType<IWhalePieData>,
      },
    },
    setup(props) {
      const activeTab = ref<string>('Token')
      const handleTabClick = (type: string): void => {
        activeTab.value = type
      }
      const { message, createUrlWeb } = composition()
      const { pageParams, resetPageParam, createPageParam, nextPage, prevPage } = compositionPage()
      const pageNum = ref<number>(0)
      /**************************** top10Holder数据获取、翻页 **************************************/
      const loading = ref<boolean>(false)
      const top10HolderList = ref<Array<ITop10Holder>>([])
      const getTop10Holder = (type?: string): void => {
        // 使用loading变量防抖
        if (loading.value) {
          return
        }
        loading.value = true
        if (type === 'reset') {
          resetPageParam(5, pageParams)
        }
        const params = {
          page_num: pageParams.value.currentPage,
          page_size: pageParams.value.pageSize,
          project_id: parseInt(props.projectId),
        }
        getTop10HolderList(params)
          .then((res: any) => {
            if (res && res.success) {
              top10HolderList.value = res.data.page_infos
              pageParams.value.total = res.data.total
              pageNum.value = Math.ceil(res.data.total / pageParams.value.pageSize!)
              handlePercentage(top10HolderList.value)
            } else {
              top10HolderList.value = []
              resetPageParam()
              // message('error', 'system error')
            }
            loading.value = false
          })
          .catch(err => {
            message('error', err.message || err)
            loading.value = false
            console.error(err)
          })
      }
      /**************************** Privileges 数据获取、翻页 **************************************/
      const pagePrivileges = createPageParam(3)
      const pageNumPrivileges = ref<number>(0)
      const loadingPrivileges = ref<boolean>(false)
      const privilegesList = ref<Array<IPrivilege>>([])
      const getPrivilegesList = (type?: string): void => {
        // 使用loading变量防抖
        if (loadingPrivileges.value) {
          return
        }
        loadingPrivileges.value = true
        if (type === 'reset') {
          resetPageParam(3, pageParams)
        }
        const params = {
          page_num: pagePrivileges.value.currentPage,
          page_size: pagePrivileges.value.pageSize,
          project_id: parseInt(props.projectId),
        }
        getPrivilege(params)
          .then((res: any) => {
            if (res && res.success) {
              privilegesList.value = res.data.page_infos
              pagePrivileges.value.total = res.data.total
              pageNumPrivileges.value = Math.ceil(res.data.total / pagePrivileges.value.pageSize!)
              privilegesList.value.forEach(val => {
                val.showValHold = val.hold_address_tag ? val.hold_address_tag : val.hold_address
                val.showValContract = val.contract_address_tag
                  ? val.contract_address_tag
                  : val.contract_address
              })
            } else {
              privilegesList.value = []
              resetPageParam()
            }
            loadingPrivileges.value = false
          })
          .catch(err => {
            message('error', err.message || err)
            loadingPrivileges.value = false
            console.error(err)
          })
      }
      /**************************** Liquidity 数据获取、翻页 **************************************/
      const pageLiquidity = createPageParam(5)
      const pageNumLiquidity = ref<number>(0)
      const loadingLiquidity = ref<boolean>(false)
      const liquidityList = ref<Array<ILiquidity>>([])
      const getLiquidityList = (type?: string): void => {
        // 使用loading变量防抖
        if (loadingLiquidity.value) {
          return
        }
        loadingLiquidity.value = true

        if (type === 'reset') {
          resetPageParam(5, pageParams)
        }
        const params = {
          page_num: pageLiquidity.value.currentPage,
          page_size: pageLiquidity.value.pageSize,
          project_id: parseInt(props.projectId),
        }
        getLiquidity(params)
          .then((res: any) => {
            if (res && res.success) {
              liquidityList.value = res.data.page_infos
              pageLiquidity.value.total = res.data.total
              pageNumLiquidity.value = Math.ceil(res.data.total / pageLiquidity.value.pageSize!)
              liquidityList.value.forEach(val => {
                val.showVal = val.address_tag ? val.address_tag : val.address
                val.showTokenVal1 = val.token_1_address_token_name
                  ? val.token_1_address_token_name
                  : val.token_1_address
                val.showTokenVal2 = val.token_2_address_token_name
                  ? val.token_2_address_token_name
                  : val.token_2_address
              })
            } else {
              liquidityList.value = []
              resetPageParam()
            }

            loadingLiquidity.value = false
          })
          .catch(err => {
            message('error', err.message || err)
            loadingLiquidity.value = false
            console.error(err)
          })
      }
      const handlePercentage = (dataList: Array<any>): void => {
        dataList.forEach(val => {
          // 设置显示 tag 还 是地址
          val.showVal = val.address_tag ? val.address_tag : val.address
          // index > 0 百分比为 上一条 数据 加上本条数据
          /*if (index > 0) {
            // 百分比为 上一条 数据 加上本条数据
            val.showPercentage = val.percentage! + dataList[index - 1].showPercentage!
            //  留白部分为上一个条数据的 showPercentage
            val.showPercentagePrev = dataList[index - 1].showPercentage!
          } else {
            val.showPercentage = val.percentage
          }*/
        })
      }
      onMounted(() => {
        getTop10Holder('reset')
        getPrivilegesList('reset')
        getLiquidityList('reset')
      })
      watch(
        () => props.projectId,
        () => {
          getTop10Holder('reset')
          getPrivilegesList('reset')
          getLiquidityList('reset')
        }
      )
      return {
        createUrlWeb,
        nFormats,
        simulateToFixed,
        pageNum,
        pageParams,
        nextPage,
        prevPage,
        top10HolderList,
        activeTab,
        handleTabClick,
        loading,
        privilegesList,
        pagePrivileges,
        pageNumPrivileges,
        liquidityList,
        pageLiquidity,
        pageNumLiquidity,
        loadingLiquidity,
        loadingPrivileges,
        formatTimeStamp,
        createDate,
        formatDate,
        beijing2utc,
        getTop10Holder,
        getLiquidityList,
        getPrivilegesList,
        webURL,
      }
    },
  })
</script>

<style lang="scss">
  .project-detail-decent--body {
    padding: 24px;
    box-sizing: border-box;
    background-color: $mainColor7;
    .project-detail-decent--title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 28px;
      p {
        font-size: 20px;
        font-family: 'Barlow', sans-serif;
        font-weight: bold;
        color: $textColor3;
        line-height: 24px;
      }
    }
    .project-detail-decent-tab {
      padding: 2px;
      box-sizing: border-box;
      display: flex;
      height: 36px;
      background-color: $mainColor22;
      width: max-content;
      border-radius: 4px;
      .tab-item {
        border-radius: 4px;
        font-size: 16px;
        font-family: 'Barlow', sans-serif;
        min-width: 112px;
        color: $textColor2;
        line-height: 32px;
        padding: 0 10px;
        cursor: pointer;
        text-align: center;
      }
      .tab-item__active {
        background-color: $mainColor7;
        color: $textColor3;
        font-weight: bold;
      }
    }
    .top-10-row {
      height: 44px;
      .cell {
        padding: 0px;
      }
    }
    .whale-sub-title {
      font-size: 16px;
      font-family: 'Barlow', sans-serif;
      font-weight: bold;
      color: $textColor3;
      line-height: 20px;
      margin-bottom: 26px;
    }
    .token-holders-distribution {
      display: flex;
      justify-content: space-between;
      .pie-cell {
        height: calc(90% - 44px);
      }
    }
    .function-tag {
      height: 24px;
      padding: 0 20px;
      line-height: 24px;
      border-radius: 30px;
      background-color: rgb(24, 48, 78);
      color: white;
      width: max-content;
      text-align: center;
      font-family: 'Barlow', sans-serif;
    }
    .token-val {
      display: flex;
      justify-content: flex-start;
      .ellipsis-copy {
        min-width: 0 !important;
        width: auto;
      }
      .link-span {
        margin: 0 10px;
      }
    }
    .token-percentage .be-progress {
      width: 136px;
    }

    .be-progress .be-progress-line .be-progress-line-path__success {
      box-shadow: 0 0 0 1px rgb(245, 245, 245);
      -webkit-box-shadow: 0 0 0 1px rgb(245, 245, 245);
      -moz-box-shadow: 0 0 0 1px rgb(245, 245, 245);
      &:after {
        width: 8px;
        height: 8px;
        content: ' ';
        background-color: $textColor3;
        position: absolute;
        right: 0;
        top: 0;
        border-radius: 30px;
        box-shadow: 2px 0 0 0 $textColor3;
        -webkit-box-shadow: 2px 0 0 0 $textColor3;
        -moz-box-shadow: 2px 0 0 0 $textColor3;
      }
    }

    .be-progress {
      .be-progress-line-path {
        height: 8px !important;
      }
    }
  }
</style>
