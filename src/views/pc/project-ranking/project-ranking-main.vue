/*
* @project-ranking-main.vue
* @deprecated
* @author czh
* @update (czh 2021/11/1)
*/
<template>
    <div class="project-ranking-main">
        <div class="project-ranking-search">

            <project-ranking-radar></project-ranking-radar>
<!--            <project-ranking-radar></project-ranking-radar>
            <project-ranking-radar></project-ranking-radar>-->
<!--            <project-ranking-num-card></project-ranking-num-card>-->
        </div>
        <div class="project-ranking-list">
            <div></div>
            <div>

            </div>
        </div>
        <!--合约态势详情  交易稳定-->
        <div>
            <project-ranking-trade-stability></project-ranking-trade-stability>
        </div>
        <!--项目态势详情  市场表现-->
        <div>
            <project-ranking-market-performance></project-ranking-market-performance>
        </div>
        <!--项目态势详情  安全舆情-->
        <div>
            <project-ranking-safety-opinion></project-ranking-safety-opinion>
        </div>
    </div>
</template>

<script>

import ProjectRankingRadar from "./components/project-ranking-radar";
import ProjectRankingNumCard from "./components/project-ranking-num-card";
import ProjectRankingSafetyOpinion from "./components/project-ranking-safety-opinion"
import ProjectRankingMarketPerformance from "./components/project-ranking-market-performance"
import ProjectRankingTradeStability from "./components/project-ranking-trade-stability"

export default {
    name: "ProjectRankingMain",
    components: {ProjectRankingNumCard, ProjectRankingRadar,ProjectRankingSafetyOpinion,ProjectRankingMarketPerformance,ProjectRankingTradeStability},
    data() {
        return {}
    },
    mounted() {
    },
    methods: {},
}
</script>

<style scoped lang="scss">
.project-ranking-main {
    width: 100%;
    height: 100%;

    .project-ranking-search {
        display: flex;
        justify-content: center;
        align-items: center;
        /*height: 20%;*/
        height: 40%;
    }

    /*.project-ranking-list {
        background: $mainColor7;
        height: 80%;
    }*/
}
</style>