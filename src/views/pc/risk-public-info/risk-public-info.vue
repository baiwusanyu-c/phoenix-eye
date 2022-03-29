/* * @risk-public-info.vue * @deprecated 公共风险舆情 * @author czh * @update (czh 2022/3/24) */
<template>
  <div class="risk-public-info-main eagle-page">
    <div class="risk-public-info-container">
      <div class="project-manage-search-input">
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
          <span>{{ $t('lang.searchT') }}</span>
        </be-button>
      </div>
      <div class="risk-public-info-list eagle-table">
        <project-detail-public-opinion :info-data="list"> </project-detail-public-opinion>
        <div class="table-page">
          <be-pagination
            is-ordianry
            :page-size="pageParams.pageSize"
            :page-count="pageParams.total"
            :current-page="pageParams.currentPage"
            :page-num="[{ label: 20 }, { label: 40 }, { label: 80 }, { label: 100 }]"
            :pager-show-count="5"
            page-unit="page"
            :layout="['prev', 'pNum', 'page']"
            @update-num="updateNum"
            @change-page="pageParams">
            <template #prev>
              <span class="table-page-info"> {{ $t('lang.total') }} {{ pageParams.total }}</span>
            </template>
          </be-pagination>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue'
  import { BeButton, BePagination } from '../../../../public/be-ui/be-ui.es'
  import { IPageParam, ISafetyData } from '../../../utils/types'
  import ProjectDetailPublicOpinion from '../project-search/components/project-detail-public-opinion.vue'
  export default defineComponent({
    name: 'RiskPublicInfo',
    components: { ProjectDetailPublicOpinion, BeButton, BePagination },
    setup() {
      const searchParams = ref<string>('')
      const list = ref<Array<ISafetyData>>([])
      // 项目舆情安全分页参数
      const pageParams = ref<IPageParam>({
        currentPage: 1,
        pageSize: 5,
        total: 0,
      })
      /**
       * 获取列表数据
       */
      const getList = (): void => {
        const mock = [
          {
            title:
              'RT @PeckShieldAlert: #PeckShieldAlert Unverified PYE (PYE) smart contract is exploited in a flurry of TXs (one representative hack TX: http…',
            url: 'https://twitter.com/peckshield/status/1507126529146253326',
            content:
              'RT @PeckShieldAlert: #PeckShieldAlert Unverified PYE (PYE) smart contract is exploited in a flurry of TXs (one representative hack TX: http…',
            tag: ['twitter', 'content', 'title'],
            source: 'twitter',
            pub_time: '2022-03-24T22:45:40.000+0000',
          },
          {
            title:
              '#PeckShieldAlert Unverified PYE (PYE) smart contract is exploited in a flurry of TXs (one representative hack TX: https://t.co/NhTsgGXYH7),\nleading to the loss of ~$2.1m. The exploit is possible because of the lack of "k invariant verification" in swap() routine. @PyeEcosystem https://t.co/ecWCNaKABh',
            url: 'https://twitter.com/PeckShieldAlert/status/1507021035224580097',
            content:
              '#PeckShieldAlert Unverified PYE (PYE) smart contract is exploited in a flurry of TXs (one representative hack TX: https://t.co/NhTsgGXYH7),\nleading to the loss of ~$2.1m. The exploit is possible because of the lack of "k invariant verification" in swap() routine. @PyeEcosystem https://t.co/ecWCNaKABh',
            tag: ['twitter', 'content', 'title'],
            source: 'twitter',
            pub_time: '2022-03-24T15:46:28.000+0000',
          },
          {
            title:
              '#PeckShieldAlert @Arthur_0x ’s hot wallet appears to be compromised. ~59 #NFTs was transferred to https://t.co/MZXIWN4ING , including ~5 #CloneX, ~17 $Azuki @AzukiZen, ~2 @TabinekoKIKI, ~2 @HedgiesOfficial,  ~33 @SecondSelfNFT\n~19 stolen NFTs wiped for ~233 $ETH (~$690k). https://t.co/oqM08ex1Yg',
            url: 'https://twitter.com/PeckShieldAlert/status/1506110131259736071',
            content:
              '#PeckShieldAlert @Arthur_0x ’s hot wallet appears to be compromised. ~59 #NFTs was transferred to https://t.co/MZXIWN4ING , including ~5 #CloneX, ~17 $Azuki @AzukiZen, ~2 @TabinekoKIKI, ~2 @HedgiesOfficial,  ~33 @SecondSelfNFT\n~19 stolen NFTs wiped for ~233 $ETH (~$690k). https://t.co/oqM08ex1Yg',
            tag: ['twitter', 'content', 'title'],
            source: 'twitter',
            pub_time: '2022-03-22T03:26:52.000+0000',
          },
          {
            title:
              '#PeckShieldAlert #rugpull PeckShield has detected @WW3Apes #NFT just rugged. @WW3Apes deleted its social accounts. Its twin account @GodZape rugged ~20 $ETH and deleted its social accounts a few days ago. Do *NOT* fall prey to it. #NFTs #APES  #YellowArmy @NFTethics @opensea https://t.co/w6SWeNsphH',
            url: 'https://twitter.com/PeckShieldAlert/status/1505822966751567876',
            content:
              '#PeckShieldAlert #rugpull PeckShield has detected @WW3Apes #NFT just rugged. @WW3Apes deleted its social accounts. Its twin account @GodZape rugged ~20 $ETH and deleted its social accounts a few days ago. Do *NOT* fall prey to it. #NFTs #APES  #YellowArmy @NFTethics @opensea https://t.co/w6SWeNsphH',
            tag: ['twitter', 'content', 'title'],
            source: 'twitter',
            pub_time: '2022-03-21T08:25:46.000+0000',
          },
        ]
        mock.forEach(value => {
          list.value.push({
            negativeMsg: '经自动识别，该资讯为负面信息',
            sourceUrl: value.url,
            title: value.title,
            message: value.content,
            from: value.source,
            time: value.pub_time,
            label: value.tag,
          })
        })
        pageParams.value.total = 4
      }
      const updateNum = (data: IPageParam): void => {
        pageParams.value.currentPage = 1
        pageParams.value.pageSize = data.pageSize!
        getList()
      }
      getList()
      return {
        updateNum,
        pageParams,
        list,
        getList,
        searchParams,
      }
    },
  })
</script>

<style lang="scss">
  .risk-public-info-main {
    min-height: calc(100% - 100px);

    .subTitle {
      font-family: AlibabaPuHuiTi-Regular, sans-serif;
      font-size: 18px;
      font-weight: 400;
      color: $textColor12;
    }
  }

  .risk-public-info-container {
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

  .risk-public-info-list {
    margin-top: 40px;
    text-align: left;
  }
</style>
