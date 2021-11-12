<template>
    <div class="layout" id="app_layout">
        <!--   左侧菜单     -->
        <tsgz-nav-menu ref="headerCom" :listStatus="listStatus"></tsgz-nav-menu>
        <div class="layout-right">
            <!--     右上标题、任务下拉   -->
            <transition name="fade" mode="out-in">
                <div class="tsgz-menu-info">
                    <div class="mission-select">
                        <h3>
                            {{ $route.meta.title }}
                        </h3>
                    </div>
                    <div class="tsgz-slogan">
                        <div class="tsgz-user">我</div>
                        <h3>{{ loginUser }}</h3>
                    </div>
                </div>
            </transition>
            <!--      主体内容      -->
            <div class="scrollDiy"
                 :class="{'viewArea': true}">
                <transition name="fade" mode="out-in">
                    <!--  只缓存二级路由下的 AnalysisMain 所有路径和 investigation、DebugMain 所有路径 -->
                        <router-view ref="parentRouterRef" :key="key"/>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
import TsgzNavMenu from "../../../components/nav-menu/tsgz-nav-menu";

export default {
    name: 'layout',
    components: {TsgzNavMenu},
    data() {
        return {
            isUnfold: false,
            listStatus: 'ANALYSING',// 状态 ：ANALYSING 分析中，ARCHIVED 已结案
            isPreview: false,
            loginUser: ''
        }
    },
    props: [],
    computed: {
        key() {
            return this.$route.path
        },
        navMenu() {
            return function (val) {
                if (!val) {
                    return ``
                }
                return `width: calc(100% - 60px); transition: all .3s`
            }
        },
    },
    methods: {}
}
</script>

<style scoped lang='scss'>
.layout {
    height: 100%;
    background: #F2F4F5;
    display: flex;
    flex-direction: row;

    .layout-right {
        width: calc(100% - 208px);
        transition: all .3s
    }

    .tsgz-menu-info {
        width: 100%;
        height: 60px;
        background: #FFFFFF;
        display: flex;
        align-items: center;

        .mission-select {
            flex: 3;
            padding: 0 24px;
            box-sizing: border-box;
            display: flex;
            align-items: center;

            .misison-select-body {
                display: flex;
                align-items: center;
                margin-right: 15px;
            }

            h3 {
                color: #206596;
                font-size: 20px;
                font-family: PingFangSC-Medium, PingFang SC, sans-serif;
            }

            .iconTitle {
                color: #777777;
            }
        }

        .tsgz-slogan {
            flex: 4;
            background-position: right;
            background-repeat: no-repeat;
            background-size: 100% 100%;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: flex-end;
            height: 100%;

            .tsgz-user {
                width: 28px;
                height: 28px;
                color: $textColor6;
                background-color: $mainColor3;
                border-radius: 30px;
                line-height: 28px;
                text-align: center;
            }

            h3 {
                font-weight: 500;
                color: $textColor4;
                font-size: 20px;
                margin: 0 5px;
                font-family: PingFangSC-Semibold, PingFang SC, sans-serif;
            }
        }
    }

    .tsgz-menu-un-info {
        height: 60px;
        background: transparent;
    }

    .tsgz-menu-un-info-investigation {
        height: 60px;
        background: transparent;
    }

    .viewArea {
        padding: 16px;
        box-sizing: border-box;
        width: 100%;
        // height: calc(100vh - 112px);
        height: calc(100vh - 60px);
        transition: all .5s;
        background: #F2F4F5;
        overflow: inherit;
    }

    .fold {
        width: 100%;
    }
}
</style>
<style scoped lang="scss">
@media screen and (max-width: 1366px) and (max-height: 768px) {
    #app_layout {
        .tsgz-menu-info {
            height: 60px;

            .tsgz-slogan h3 {
                font-size: 14px;
            }

            .mission-select {
                h3 {
                    font-size: 14px;
                }

                flex: 2;
                padding: 5px;

                .misison-select-body {
                    height: 30px;
                }
            }
        }

        .viewArea {
            height: calc(91vh);
        }

    }
}
</style>

<!--1080p的105% - 125%放大-->
<style scoped lang="scss">
@media screen and (min-width: 1536px) and (max-height: 880px) and (max-width: 1830px) {
    .layout {
        .layout-right {
            width: calc(100% - 178px);
        }
    }
}
</style>
<!--1080p的130% - 140%放大-->
<style scoped lang="scss">
@media screen and (min-width: 1326px) and (max-height: 710px) and (max-width: 1478px) {
    .layout {
        .layout-right {
            width: calc(100% - 178px);
        }
    }
}
</style>
<!--1080p的145% - 150%放大-->
<style scoped lang="scss">
@media screen and (min-width: 1280px) and (max-height: 638px) and (max-width: 1326px) {
    .layout {
        .layout-right {
            width: calc(100% - 168px);
        }
    }
}
</style>