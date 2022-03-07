/*
* @project-search-main.vue
* @deprecated 项目搜索
* @author czh
* @update (czh 2022/2/22)
*/
<template>
    <div class="project-search-main eagle-page">
        <div class="project-search-container">
            <h1 class="title">{{ $t('lang.projectExplorer.title') }}</h1>
            <p class="subTitle mb-18">{{ $t('lang.projectExplorer.subTitle') }}</p>
            <div class="project-manage-search-input">
                <el-input v-model="searchParams"
                          :placeholder="$t('lang.projectExplorer.searchP')"
                          style="margin-right: 16px"/>
                <be-button type="success"
                           customClass="eagle-btn search-btn"
                           size="large"
                           @click="getList"
                           round="4">
                    <span>{{ $t('lang.searchT') }}</span>
                </be-button>
            </div>
        </div>
        <div class="project-search-result">
            <!--   示例     -->
            <div class="project-search-eg" v-if="projectList.length === 0">
                <p>{{ $t('lang.projectExplorer.example') }}</p>
                <p>
                    {{ $t('lang.projectExplorer.project') }}:
                    <span class="item ml-4" @click="searchParams = 'AAVE';getList()">AAVE</span>
                </p>
                <p>
                    {{ $t('lang.projectExplorer.contract') }}:
                    <span class="item ml-4" @click="searchParams = '0x62ddb3f4509a556df1ac8451e35f1a2268213a30';getList()">
                        0x62ddb3f4509a556df1ac8451e35f1a2268213a30
                    </span>
                </p>
            </div>
            <div v-if="projectList.length > 1">
                <p class="subTitle">{{ $t('lang.projectExplorer.MultipleResults') }}:</p>
                <div style="margin-top: 18px" class="res">
                    <div v-for="item in projectList" :key="item.project_id">
                        <p class="subTitle" style="font-size: 12px;">{{ $t('lang.projectExplorer.name') }}: </p>
                        <p class="subTitle mt-4">
                            <span class="item"
                                  @click="routerSwitch(item.project_id)"
                                  style="font-size: 18px;">
                                {{ item.project_name }}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {defineComponent, ref} from "vue";
import {BeButton} from "../../../../public/be-ui/be-ui.es";
import composition from "../../../utils/mixin/common-func";
import {getProjectListUser, IProjParam} from "../../../api/project-explorer";

declare type projListType = {
    project_id: string
    project_name: string
}
export default defineComponent({
    name: "ProjectSearchMain",
    components: {BeButton},
    setup(props, ctx) {
        const {message,routerPush} = composition(props, ctx)
        /**
         * 获取项目列表
         */
            // 搜索参数
        const searchParams = ref<string>('')
        // loading
        const loading = ref<boolean>(false)
        /**
         * 获取项目列表
         * 重置：清空所有条件进行搜索
         * 翻页：带上所有现有条件搜索
         * 排序：只清空翻页搜索
         * 搜索：只清空翻页参数、排序参数，保留搜索参数，搜索
         */
        const projectList = ref<Array<projListType>>([])
        const getList = () => {
            loading.value = true
            let params: IProjParam = {
                param: searchParams.value
            }
            getProjectListUser(params).then(res => {
                if (res && res.data) {
                    projectList.value = res.data
                    // 大于一条则显示列表
                    // 等于一条则直接跳转到项目态势详情
                    if (projectList.value.length === 1) {
                        routerSwitch(projectList.value[0].project_id)
                    }
                } else {
                    message('error', 'system error')
                }
                loading.value = false
            }).catch(err => {
                message('error', err.message || err)
                console.error(err)
                loading.value = false
            })
        }
        /**
         * 路由跳轉
         */
        const routerSwitch = (id:string):void=>{
            routerPush('/projectSearch/detail',{id})
        }
        return {
            routerSwitch,
            projectList,
            searchParams,
            getList
        }
    }
})
</script>

<style lang="scss">
.project-search-main {
  min-height: calc(100% - 192px);

  .subTitle {
    font-family: AlibabaPuHuiTi-Regular, sans-serif;
    font-size: 18px;
    font-weight: 400;
    color: $textColor12;
  }

  .item {
    font-family: AlibabaPuHuiTi-Medium, sans-serif;
    font-size: 14px;
    font-weight: bold;
    line-height: 22px;
    color: $lessColor3;
    cursor: pointer;
  }
}

.project-search-container {
  width: 67.5%;
  margin: 132px auto 0 auto;
  text-align: center;

  .title {
    margin-bottom: 16px;
    font-family: AlibabaPuHuiTi-Regular, sans-serif;
    font-size: 36px;
    font-weight: 500;
    line-height: 40px;
    color: $textColor3;
  }

  .project-manage-search-input {
    display: flex;

    input::-webkit-input-placeholder { /* WebKit browsers */
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

.project-search-result {
  width: 67.5%;
  margin: 32px auto 0 auto;

  .project-search-eg {
    padding: 24px 24px 8px 24px;
    background-color: $mainColor7;
    border-radius: 4px;

    p {
      margin-bottom: 16px;
      font-family: AlibabaPuHuiTi-Medium, sans-serif;
      font-size: 14px;
      font-weight: bold;
      line-height: 22px;
      color: $textColor3;
    }
  }

  .res{
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 22px;

    div{
      box-sizing: border-box;
      padding: 20px;
      background-color: $mainColor7;
      border-radius: 4px;
    }
  }
}
</style>