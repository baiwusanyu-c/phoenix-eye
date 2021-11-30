<template>
    <div class="project-ranking-safety-opinion">
        <div class="safety-opinion-info">
            <div v-for="(opinion,index) in infoData" :key="opinion.sourceUrl">
                <div class="safety-opinion-info-body">
                    <div class="safety-opinion-info-left">
                        <div class="safety-opinion-header">
                            <div class="safety-opinion-header-title">
                                <el-tooltip class="item" effect="dark" :content="opinion.negativeMsg" placement="top">
                                    <i class="el-icon-message-solid" style="color: darkorange" v-show="opinion.negative" ></i>
                                </el-tooltip>
                                <span style="font-size: 16px;font-weight: bold">{{opinion.title}}</span>
                            </div>
                            <el-button type="text" @click="lookTextOriginal(opinion.sourceUrl)">{{$t('el.projectRinking.safetyOpinion.textOriginal')}}>></el-button>
                        </div>
                        <div class="safety-opinion-body">
                            <!--未限制字数-->
                            <div class="safety-opinion-body-msg">{{opinion.message}}</div>
                        </div>
                        <div class="safety-opinion-footer">
                            <span>
                                <el-tag
                                        v-for="item in opinion.label"
                                        class="safety-opinion-footer-tag"
                                        :key="item.label"
                                        type="info"
                                        effect="plain">
                                    <span style="display: flex;justify-content: center;align-items: center;height: 20px">{{ item }}</span>
                                </el-tag>
                            </span>
                            <div style="width: 240px;display: flex;justify-content: space-between">
                                <span class="msg-font">{{opinion.from}}</span>
                                <span class="msg-font">{{opinion.time}}</span>
                            </div>
                        </div>
                    </div>
                    <div class="safety-opinion-info-right">
                        <el-image
                            style="width: 100%; height:  100%"
                            :src="opinion.img"
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

<script>
    import webURL from "../../../../../public/web-url.json";

    export default {
        name: "project-ranking-safety-opinion",
        data(){
            return{
            }
        },
        props:{
            infoData:{
                type:Array,
                default:()=>[]
            }
        },
        methods:{
            // 查看原文按钮
            lookTextOriginal(url){
                if(url){
                    this.$openWindow(url, 'view_window')
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    .project-ranking-safety-opinion{
        background-color: white;
        margin: auto;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .safety-opinion-info{
        width: 100%;
        padding: 0 24px;
    }
    .safety-opinion-header{
        width: 100%;
        display: flex;
        justify-content: space-between;
    }
    .safety-opinion-footer{
        width: 100%;
        display: flex;
        justify-content: space-between;
    }
    .safety-opinion-footer-tag{
        width: 54px;
        height: 22px;
        margin-right: 18px;
    }
    .safety-opinion-header-title{
        display: flex;
        align-items: center;
    }
    .safety-opinion-info-body{
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .safety-opinion-info-left{
        min-width: 528px;
        max-width: 1136px;
        width: 100%;
        height: 144px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding-top: 24px;
        padding-bottom: 24px;
    }
    .safety-opinion-info-right{
        width: 296px;
        min-width: 296px;
        height: 148px;
        background-color: lightslategray;
        margin-left: 160px;
    }

    .safety-opinion-body-msg{
        height: 66px;
        width: 100%;
        font-size: 14px;
        color: #5c5c5c;
    }
    .el-divider--horizontal {
        margin: 0 0;
    }
    .msg-font{
        font-size: 14px;
        color: #5c5c5c;
    }
</style>