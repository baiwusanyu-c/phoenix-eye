<template>
    <div class="project-ranking-safety-opinion">
        <div class="safety-opinion-info">
            <div v-for="(opinion,index) in infoData" :key="createKey(opinion)">
                <div class="safety-opinion-info-body">
                    <div class="safety-opinion-info-left">
                        <div class="safety-opinion-header">
                            <div class="safety-opinion-header-title">
                                <!--<el-tooltip class="item" effect="dark" :content="opinion.negativeMsg" placement="top">
                                        <i class="el-icon-message-solid" style="color: darkorange" v-show="opinion.negative" ></i>
                                    </el-tooltip>-->
                                <span style="font-size: 16px;font-weight: bold">{{ opinion.title }}</span>
                            </div>
                            <el-button type="text" @click="lookTextOriginal(opinion.sourceUrl)">
                                {{ $t('lang.projectRinking.safetyOpinion.textOriginal') }}>>
                            </el-button>
                        </div>
                        <div class="safety-opinion-body">
                            <div class="safety-opinion-body-msg scrollDiy">
                                <be-ellipsis-copy
                                    :targetStr="opinion.message"
                                    :is-ellipsis="opinion.message.length > 400 ? true : false"
                                    :isShowCopyBtn="false"
                                    :isTooltip="true"
                                    styles="font-weight: 400;font-size: 14px;line-height:1.5"
                                    fontLength="0"
                                    :endLength="opinion.message.length - 200">
                                </be-ellipsis-copy>
                            </div>
                        </div>

                        <div class="safety-opinion-footer">
                            <span style="max-width: 80%">
                                <el-tag
                                    v-for="item in opinion.label"
                                    class="safety-opinion-footer-tag"
                                    :key="item.label"
                                    type="info"
                                    effect="plain">
                                    <span
                                        style="display: flex;align-items: center;justify-content: center;height: 20px;">{{
                                            item
                                        }}</span>
                                </el-tag>
                            </span>
                            <div style="display: flex;align-items: center;justify-content: space-between;width: 240px">
                                <span class="msg-font">{{ opinion.from }}</span>
                                <el-tooltip placement="top" effect="light">
                                    <template #content>
                                        <span>UTC：{{ beijing2utc(opinion.time) }}</span>
                                    </template>
                                    <span class="msg-font">{{ formatDate(createDate(opinion.time)) }}</span>
                                </el-tooltip>
                            </div>
                        </div>
                    </div>
                    <div class="safety-opinion-info-right">
                        <el-image
                            style="width: 100%; height:100%"
                            :src="imgUrl"
                            fit="scale-down">
                        </el-image>
                    </div>
                </div>
                <div v-show="index < infoData.length-1">
                    <el-divider style="margin: 0 0;"></el-divider>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {getUuid, openWindow,beijing2utc,formatDate,createDate} from "../../../../utils/common";
import BeEllipsisCopy from "../../../../components/common-components/ellipsis-copy/ellipsis-copy.vue";
import {computed, defineComponent} from "vue";

export default defineComponent({
    name: "project-ranking-safety-opinion",
    components: {
        BeEllipsisCopy
    },
    props: {
        infoData: {
            type: Array,
            default: () => []
        }
    },
    setup() {
        const createKey = computed(()=> {
            return function () {
                return getUuid()
            }
        })
        // 查看原文按钮
        const lookTextOriginal = (url: string): void => {
            if (url) {
                openWindow(url)
            }
        }
        const imgImport = import.meta.globEager("../../../../assets/image/pc/news@2x.jpg");
        let imgUrl = null
        Object.keys(imgImport).forEach(val=>{
            imgUrl = imgImport[val].default
        })
        return {
            imgUrl,
            createKey,
            beijing2utc,
            formatDate,
            createDate,
            lookTextOriginal
        }
    }
})

</script>

<style scoped lang="scss">
.project-ranking-safety-opinion {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: auto;
    background-color: white;
}

.safety-opinion-info {
    width: 100%;
    padding: 0 24px;
}

.safety-opinion-header {
    display: flex;
    justify-content: space-between;
    width: 100%;
}

.safety-opinion-footer {
    display: flex;
    justify-content: space-between;
    width: 100%;
}

.safety-opinion-footer-tag {
    min-width: 54px;
    height: 22px;
    margin-top: 5px;
    margin-right: 18px;
}

.safety-opinion-header-title {
    display: flex;
    align-items: center;
}

.safety-opinion-info-body {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.safety-opinion-info-left {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    min-width: 528px;
    max-width: 1136px;
    height: 144px;
    padding-top: 10px;
    padding-bottom: 24px;
}

.safety-opinion-info-right {
    width: 296px;
    min-width: 296px;
    height: 148px;
    margin-left: 160px;
    padding: 10px;
    box-sizing: border-box;
}

.safety-opinion-body-msg {
    width: 100%;
    height: 66px;
    overflow-y: auto;
    font-size: 14px;
    color: #5c5c5c;
}

.el-divider--horizontal {
    margin: 0 0;
}

.msg-font {
    font-size: 14px;
    color: #5c5c5c;
}
</style>