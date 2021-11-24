<template>
    <div id="app" ref="app" :class="{'noM': isMobile == null}">
            <router-view></router-view>
        <!--下线弹窗-->
        <be-msg-dialog @confirm="()=>this.delTip = false"
                       :isShow.sync="delTip"
                       :isShowCancel='false'
                       title="您的帐号在其他地方登录，您已被迫下线，如果不是本人操作，请及时修改密码">
        </be-msg-dialog>
        <!--****************** 浏览器版本提示  **********************-->
        <div id="browser_msg_dialog">
            <be-dialog
                titles="温馨提示"
                ref='tipsDialog'
                animIn='animate__fadeIn'
                animOut='animate__fadeOut'
                :is-show="showBrowserTip"
                :is-open-modal="true"
                :is-drag="false"
                @close="showBrowserTip = false"
                custom-class="browser-msg-dialog">
                <div slot="body" class="browser-msg-dialog-body">
                    <div class="browser-msg-dialog__left">
                        <div class="browser-msg-dialog-ul">
                            <ul>
                                <li v-for="(item) in tipList"
                                    :key="item">
                                    {{item }}
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="browser-msg-dialog__right"></div>
                    <el-button class="primary"
                               style="position: absolute;left: 50%;bottom: 24px;transform: translateX(-50%);"
                               type="primary"
                               @click="showBrowserTip = false">
                        我知道了
                    </el-button>
                </div>
            </be-dialog>
        </div>
    </div>
</template>

<script>
    import BeDialog from "./components/common-components/dialog/be-dialog";
    export default {
        name: 'App',
        data() {
            var ua = navigator.userAgent;
            var ipad = ua.match(/(iPad).*OS\s([\d_]+)/),
                isIphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/),
                isAndroid = ua.match(/(Android)\s+([\d.]+)/),
                isMobile = isIphone || isAndroid;
            return {
                LoginComponent: null,
                isMobile: isMobile,
                // 下线弹窗显示
                delTip: false,
                updateMsg: [],
                showBrowserTip:false,
                tipList:['为保证更优质的使用体验，','建议使用谷歌浏览器访问系统。']
            }

        },
        components: {
            BeDialog,
        },
        created() {
            // 显示浏览器提示
            console.log('浏览器版本信息:',this.$browserInfo())
            if(this.$browserInfo().browser !== 'chrome'){
                this.showBrowserTip = true
            }
        },
        mounted() {

        },
        methods: {
            /**
             * 下线弹窗显示方法
             */
            tips() {
                this.delTip = true;
            },
            //关闭当前页面
            closeWebPage() {
               this.$closePage()
            },


        },
    }
</script>

<style lang='scss'>
#browser_msg_dialog {
    .browser-msg-dialog {
        width: 400px;
        height: 240px;
        left: calc(50% - 200px);
        top: calc(50% - 220px);
        background-color: white;
        padding-left: 40px;
        padding-top: 22px;
        padding-right: 28px;
        box-sizing: border-box;

        .be-dialog-title {
            .be-dialog-contanter-head {
                padding: 0;
                box-sizing: border-box;
            }

            span {
                font-size: 16px;
                font-weight: 600;
                color: $mainColor3;
            }
        }

        .browser-msg-dialog-body {
            display: flex;
            justify-content: space-between;
            .browser-msg-dialog__left {
                .browser-msg-dialog-ul {
                    overflow-y: auto;
                    max-width: 320px;
                    li {
                        font-size: 12px;
                        color: #7D8397;
                        margin-bottom: 10px;
                    }
                }

                .subTitle {
                    font-size: 14px;
                    font-family: Microsoft YaHei, sans-serif;
                    font-weight: 400;
                    color: #3588FF;
                    /* margin-top: 10px;*/
                    cursor: pointer;
                    &:hover{
                        color: #192980;
                    }
                }
            }

            .browser-msg-dialog__right {
                background-image: url("./assets/image/pc/browser-info.png");
                height: 70%;
                width: 54%;
                background-size: 100% 100%;
                position: absolute;
                right: 4px;
                bottom: 20px;
                z-index: -1;
            }

        }

    }
}

    .noM {
        min-width: 1280px;
        height: 100%;
    }

    @import 'assets/style/reset';
</style>
<!--适配1366X768与1080p的150%放大-->
<style scoped lang="scss">
    @media screen and (max-width: 1366px) and (max-height: 768px) {
        .noM {
            min-width: 1280px;
        }
    }
</style>
