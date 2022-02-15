/*
* @login.vue
* @deprecated 系統登錄的主頁面
* @author
* @update (czh 2021/09/9)
*/
<template>
    <div class="login" id="login">
        <div class="content-area">
            <img class="logo-box" src="@/assets/image/pc/logo.png" alt=""/>
            <div class="inner">
                <div class="area_l">
                    <p class="text-w">{{ $t('lang.loginConfig.prodWelcome') }}</p>
                    <p class="text-t">{{ $t('lang.loginConfig.prodName') }}</p>
                    <p class="text-w-e">Welcome to Beosin-Secure</p>
                </div>
                <div class="area-r">
                    <p class="title" :class="{otherTitle: areaType === 4,regTitle: areaType === 3}">
                        {{
                            areaType === 3 ? $t('lang.loginConfig.titleRegister') : areaType === 4 ? $t('lang.loginConfig.titleReset') : $t('lang.loginConfig.titleLogin')
                        }}
                    </p>
                    <!--          賬號登錄          -->
                    <name-login
                        ref="nameLogin"
                        @changeShow='changeAreaType'
                        v-if="areaType === 1">
                    </name-login>
                    <!--          注冊賬號          -->
                    <userRegistration v-if="areaType === 3" @changeShow='changeAreaType'></userRegistration>
                    <!--     忘记密码       -->
                    <reset-password v-if="areaType === 4" @changeShow='changeAreaType'></reset-password>
                </div>
            </div>
            <div class="footer-box">
                <p class="footer-w">
                    <!--            {{$t('el.companyName')}}&nbsp;{{$t('el.copyright')}}&nbsp;&nbsp;｜&nbsp;&nbsp; {{$t('el.companyRecord')}}&nbsp;&nbsp;&nbsp;&nbsp;-->
                </p>
                <p class="footer-w">
                    <!--          {{$t('el.companyAddr')}}&nbsp;&nbsp;&nbsp;&nbsp;{{$t('el.companyTel')}}-->
                </p>
            </div>
        </div>
        <!--到期弹窗-->
        <be-msg-dialog
            :headerTitle="$t('el.loginConfig.titleDeadline')"
            @confirm="() => (delTip = false)"
            @close="() => (delTip = false)"
            :isShow.sync="delTip"
            :isShowCancel="false"
            :title="$t('el.loginConfig.infoDeadLine')">
        </be-msg-dialog>
    </div>
</template>

<script setup lang="ts">
import {nextTick, onBeforeUnmount, onMounted, ref} from 'vue'
import userRegistration from "./components/user-registration.vue";
import animatedInit, {destroyTHERR} from "../../../../public/login-3d.js";
import NameLogin from "./components/name-login.vue";
import ResetPassword from "./components/reset-password.vue";


const areaType = ref<number>(1)
const delTip = ref<boolean>(false)
/**
 * 修改显示类型
 * @param type 显示类型
 */
const changeAreaType = (type: number): void => {
    areaType.value = type
}
onMounted(() => {
    nextTick(() => {
        animatedInit();
        const loginDom = document.getElementById("login") as HTMLElement
        loginDom.oncontextmenu = () => {
            return false;
        };
    })
})
onBeforeUnmount(() => {
    // 销毁背景动画
    destroyTHERR()
})


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
.login {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    align-items: center;
    width: 100vw;
    min-width: 1280px;
    height: 100vh;
    //   background: url('../../../assets/image/pc/loginBg.png') no-repeat;
    background: linear-gradient(
            180deg, #000 0%, rgba(0, 0, 0, .9) 40%, rgba(5, 29, 41, 0) 100%
    );
    background-size: 100% 100%;

    .content-area {
        display: flex;
        flex-wrap: wrap;
        width: 1140px;
        height: 100%;
        margin: auto;

        .logo-box {
            height: 10%;
            margin-top: 60px;
        }

        .inner {
            display: flex;
            align-items: flex-start;
            align-self: center;
            justify-content: center;
            width: 100%;
            height: 460px;
        }

        .footer-box {
            align-self: flex-end;
            width: 100%;
            margin-bottom: 32px;

            p {
                font-family: PingFangSC-Medium, PingFang SC, sans-serif;
                font-size: 14px;
                line-height: 24px;
                color: #9BC8DF;
                overflow-wrap: break-word;
                white-space: nowrap;
            }

        }

        .area_l {
            width: calc(100% - 440px);
            height: 100%;

            p {
                width: 100%;
            }

            .text-w {
                align-self: flex-start;
                margin-top: 64px;
                font-family: PingFangSC-Medium, PingFang SC, sans-serif;
                font-size: 40px;
                line-height: 56px;
                color: $mainColor13;
                white-space: nowrap;
            }

            .text-t {
                font-family: PingFangSC-Medium, PingFang SC, sans-serif;
                font-size: 51px;
                line-height: 72px;
                color: rgba(255, 255, 255, 1);
                background-image: linear-gradient(180deg, $mainColor7 0%, #B6E0FF 100%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
            }

            .text-w-e {
                font-family: Helvetica, sans-serif;
                font-size: 40px;
                line-height: 53px;
                color: rgba(155, 200, 223, 1);
                white-space: nowrap;
            }
        }

        .area-r {
            box-sizing: border-box;
            width: 440px;
            min-height: 100%;
            padding: 0 70px;
            background-image: url(../../../assets/image/pc/bg-logo.png);
            background-repeat: no-repeat;
            background-size: 100% 100%;

            .title {
                @include text(24px, rgba(0, 0, 0, .85), 31px);
                margin-top: 46px;
                margin-bottom: 24px;
            }

            .otherTitle {
                margin-top: 46px;
                margin-bottom: 24px;
            }

            .regTitle {
                margin-top: 46px;
                margin-bottom: 24px;
            }
        }
    }
}
</style>
<style lang="scss">
.login {
    .el-input-group__append {
        padding: 0;
        width: 20px;
    }

    .el-carousel__container {
        height: 100%;
    }

    .el-carousel__item.is-animating {
        text-align: center;
    }

    .focus {

        .el-form-item__content {
            border-bottom: 1px solid #8194cc !important;
        }
    }

    .label {

        .iconImg {
            position: relative;
            top: -2px;
            display: inline-block;
            height: 16px;
            width: 16px;
        }

        .el-form-item__content {
            width: 100%;
            padding: 8px;
            background-color: #fff;
            border: 1px solid rgba(0, 0, 0, .15);
            border-radius: 2px;
        }

        .el-input__inner {
            border-bottom: none;
        }

        .el-input-group__prepend {
            width: 24px;
            padding: 0 3px;
            text-align: center;
        }

        .el-form-item__error {
            top: 101%;
            left: 32px;
        }
    }
}
</style>

<!--1080p的145% - 150%放大-->
<style scoped lang="scss">
@media screen and (min-width: 1280px) and (max-height: 638px) and (max-width: 1326px) {

    .login {

        .content-area {

            .area-r {

                .regTitle {
                    margin-top: 20px;
                    margin-bottom: 15px;
                }
            }

            .logo-box {
                margin-top: 10px;
            }

            .inner {
                height: 442px;
            }
        }
    }
}
</style>