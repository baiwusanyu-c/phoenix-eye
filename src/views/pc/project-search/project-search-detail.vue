/*
* @project-search-detail.vue
* @deprecated 項目瀏覽器搜索詳情 - 項目態勢頁面
* @author czh
* @update (czh 2022/2/25)
*/
<template>
    <div class="project-search-detail">
        <!--舆情安全-->
        <div class="projsitu-item">
            <div class="item-title">
                <h2>{{ $t('lang.projectRinking.feelingSecurity') }}</h2>
            </div>
            <div :class="{
                        'projsitu-item-feelingSecurity':true,
                        'projsitu-item-hyaq':safetyData.length === 0
                    }"
                 v-loading="loadingFs">
                <project-ranking-safety-opinion
                    v-if="safetyData.length > 0"
                    :infoData="safetyData">
                </project-ranking-safety-opinion>
                <be-pagination
                    v-if="safetyData.length > 0"
                    custom-class="table-page"
                    :pageSize='pageParamsFs.pageSize'
                    :currentPage='pageParamsFs.currentPage'
                    :total='pageParamsFs.total'
                    @updatePage="pageChangeFs"
                    :is-front="false">
                    <template #prev>
                        <span class="table-page-info">{{ $t('lang.total') }}{{ pageParamsFs.total }}{{ $t('lang.piece') }}</span>
                    </template>

                    <template #next><span ></span></template>
                </be-pagination>
                <div class='empty-data' v-if="safetyData.length === 0" style="margin-top: 0">
                    <img class="img" src="@/assets/image/pc/empty-data.png" alt="" style="height: 180px;">
                    <p style="line-height: 25px">{{ $t('lang.emptyData') }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import BePagination from "../../../components/common-components/pagination/be-pagination.vue";
export default defineComponent({
    name: "project-search-detail",
    components:{
        BePagination
    },
    setup(){
        return {

        }
    }
})
</script>

<style lang="scss">
.project-search-detail{
  position: relative;
  top: 0;
  left: 0;
  z-index: 1;
  box-sizing: border-box;
  width: 100%;
  height: auto;
  min-height: calc(100% - 192px);
  padding-bottom: 86px;
}

</style>