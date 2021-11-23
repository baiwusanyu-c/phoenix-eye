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
    </div>
</template>

<script>

import ProjectRankingRadar from "./components/project-ranking-radar";
import ProjectRankingNumCard from "./components/project-ranking-num-card";

export default {
    name: "ProjectRankingMain",
    components: {ProjectRankingNumCard, ProjectRankingRadar},
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

    .project-ranking-list {
        background: $mainColor7;
        height: 80%;
    }
}
</style>