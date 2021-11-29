/*
* @project-ranking-main.vue
* @deprecated
* @author czh
* @update (czh 2021/11/1)
*/
<template>
    <div class="project-ranking-main">
        <div class="project-ranking-search">
            <el-input :placeholder="$t('el.projectRinking.searchP')" v-model="searchParams">
                <template slot="append">
                    <el-button type="primary" class="primary" @click="search" >{{ $t('el.searchBtn') }}</el-button>
                </template>
            </el-input>
        </div>
        <project-ranking-projsitu></project-ranking-projsitu>

        <!--合约态势详情  交易稳定-->
<!--        <div>
            <div></div>
            <project-ranking-trade-stability></project-ranking-trade-stability>
        </div>
        &lt;!&ndash;项目态势详情  市场表现&ndash;&gt;
        <div>
            <project-ranking-market-performance></project-ranking-market-performance>
        </div>
        &lt;!&ndash;项目态势详情  安全舆情&ndash;&gt;
        <div>
            <project-ranking-safety-opinion></project-ranking-safety-opinion>
        </div>-->
    </div>
</template>

<script>
import ProjectRankingProjsitu from "./project-ranking-projsitu";

export default {
    name: "ProjectRankingMain",
    components: {ProjectRankingProjsitu},
    data() {
        return {
            searchParams:''
        }
    },
    mounted() {
    },
    methods: {
        /**
         * 搜索方法
         */
        search(){

        }
    },
}
</script>

<style lang="scss">
.project-ranking-main {
    width: 100%;
    height: 100%;

    .project-ranking-search {
        display: flex;
        justify-content: center;
        align-items: center;
        /*height: 20%;*/
        height: 15%;
        .el-input-group{
            width: 70%;
            margin-bottom: 30px;
        }
        .el-input__inner{
            height: 45px;
            line-height: 45px;
        }
        .el-input-group__append{
            opacity: 0.8;
            background: $mainColor3-08;
            color: $mainColor7;
            width: 80px;
            text-align: center;
            &:hover{
                background: $mainColor3;
            }
        }
    }
}
</style>