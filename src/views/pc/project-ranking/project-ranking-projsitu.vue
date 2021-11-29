/*
* @project-ranking-projsitu.vue
* @deprecated 项目排行- 项目态势页面
* @author czh
* @update (czh 2021/11/29)
*/
<template>
    <div class="project-ranking-projsitu">
        <!--态势概要-->
        <div class="projsitu-item">
            <div class="item-title">
                <h2>PancakeSwap</h2>
                <span>{{ $t('el.projectRinking.onlineTime') }}：2020/10/10</span>
            </div>
            <div style="height: 300px">

            </div>
        </div>
        <!--合约安全-->
        <div class="projsitu-item">
            <div class="item-title">
                <h2>{{ $t('el.projectRinking.contractSecurity') }}</h2>
            </div>
            <div style="height: 300px">

            </div>
        </div>
        <!--市场表现-->
        <div class="projsitu-item">
            <div class="item-title">
                <h2>{{ $t('el.projectRinking.marketPerformance.headerTitle') }}</h2>
            </div>
            <div class="projsitu-item-market">
                <project-ranking-num-card v-for="(item) in marketPerformance"
                                          :key="item.title"
                                          :num="item.num"
                                          :title="item.title">
                </project-ranking-num-card>
            </div>
            <project-ranking-market-performance></project-ranking-market-performance>
        </div>
        <!--舆情安全-->
        <div class="projsitu-item">
            <div class="item-title">
                <h2>{{ $t('el.projectRinking.feelingSecurity') }}</h2>
            </div>
            <div>
                <project-ranking-safety-opinion></project-ranking-safety-opinion>
            </div>
        </div>
    </div>
</template>

<script>

import ProjectRankingNumCard from "./components/project-ranking-num-card";
import ProjectRankingRadar from "./components/project-ranking-radar";
import ProjectRankingSafetyOpinion from "./components/project-ranking-safety-opinion";
import ProjectRankingMarketPerformance from "./components/project-ranking-market-performance";
import ProjectRankingTradeStability from "./components/project-ranking-trade-stability";

export default {
    name: "project-ranking-projsitu",
    components: {
        ProjectRankingNumCard,
        ProjectRankingRadar,
        ProjectRankingSafetyOpinion,
        ProjectRankingMarketPerformance,
        ProjectRankingTradeStability
    },
    data() {
        return {
            marketPerformance:[
                {title:'交易总量',num:0},
                {title:'用户总数',num:0},
                {title:'合约总数',num:0}
            ]
        }
    },
    mounted() {
    },
    methods: {},
}
</script>

<style scoped lang="scss">
.project-ranking-projsitu {
    .projsitu-item {
        .item-title {
            display: flex;
            align-items: center;
            margin-bottom: 16px;
            h2{
                font-family: PingFangSC-Regular, sans-serif;
                color: $textColor3;
                margin-right: 15px;
            }
            span{
                font-family: PingFangSC-Regular, sans-serif;
                color: $textColor4;
            }
        }
        .projsitu-item-market{
            display: flex;
            justify-content: space-between;
            margin-bottom: 24px;
        }
    }
}

</style>