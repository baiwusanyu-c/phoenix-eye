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
              areaType === 3 ? $t('lang.loginConfig.titleRegister') : areaType === 4 ? $t('lang.loginConfig.titleLogin') : $t('lang.loginConfig.titleLogin')
            }}
          </p>
          <phoneLogin
              v-if="areaType === 2"
              :isSignatured="isSignatured"
              :chipId="form.chipId">
          </phoneLogin>
          <!--          注冊賬號          -->
          <userRegistration v-if="areaType === 3"></userRegistration>
        </div>
      </div>
      <div class="footer-box">
        <p class="footer-w">
          成都链安科技有限公司&nbsp;版权所有&nbsp;&nbsp;｜&nbsp;&nbsp;蜀ICP备18013498号-1&nbsp;&nbsp;&nbsp;&nbsp;
        </p>
        <p class="footer-w">
          联系地址：成都市武侯区世纪城南路599号天府软件园D7座504室&nbsp;&nbsp;&nbsp;&nbsp;联系电话：&nbsp;028-8326-2585
        </p>
      </div>
    </div>
    <!--到期弹窗-->
    <be-msg-dialog
        :headerTitle="$t('lang.loginConfig.titleDeadline')"
        @confirm="() => (this.delTip = false)"
        :isShow.sync="delTip"
        :isShowCancel="false"
        :title="$t('lang.loginConfig.infoDeadLine')">
    </be-msg-dialog>
  </div>
</template>

<script>
import phoneLogin from "./components/phone-login";
import userRegistration from "./components/user-registration";
// import resetPwd from "./components/reset-password";
import animatedInit, {destroyTHERR} from "./login-3d";

export default {
  name: "Login",
  componentName: "AntiFraudLogin",
  data() {
    return {
      form: {
        name: this.$root.userName,
        chipId: this.$root.chipId,
      },
      isSignatured: false,
      areaType: 2,
      delTip: false,
    };
  },
  components: {
    phoneLogin,
    userRegistration,
  },
  mounted() {

    document.getElementById("login").oncontextmenu = () => {
      return false;
    };
    // 初始化背景动画
    animatedInit();
  },
  beforeDestroy() {
    // 销毁背景动画
    destroyTHERR()
  },
  methods: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
.login {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  width: 100vw;
  min-width: 1280px;
  height: 100vh;
  //   background: url('../../../assets/image/pc/loginBg.png') no-repeat;
  background: linear-gradient(
          180deg,
          #000000 0%,
          rgba(0, 0, 0, 0.9) 40%,
          rgba(5, 29, 41, 0) 100%
  );
  background-size: 100% 100%;
  display: flex;
  align-items: center;

  .content-area {
    display: flex;
    flex-wrap: wrap;
    width: 1140px;
    height: 100%;
    margin: auto;

    .logo-box {
      margin-top: 60px;
      height: 10%;
    }

    .inner {
      width: 100%;
      height: 460px;
      display: flex;
      align-items: flex-start;
      justify-content: center;
      align-self: center;
    }

    .footer-box {
      width: 100%;
      margin-bottom: 32px;
      align-self: flex-end;

      p {
        overflow-wrap: break-word;
        color: #9BC8DF;
        font-size: 14px;
        font-family: PingFangSC-Regular, sans-serif;
        white-space: nowrap;
        line-height: 24px;
      }

    }

    .area_l {
      width: calc(100% - 440px);
      height: 100%;

      p {
        width: 100%;
      }

      .text-w {
        margin-top: 64px;
        color: $mainColor13;
        font-size: 40px;
        font-family: PingFangSC-Regular, sans-serif;
        white-space: nowrap;
        line-height: 56px;
        align-self: flex-start;
      }

      .text-t {
        color: rgba(255, 255, 255, 1);
        font-size: 51px;
        font-family: PingFangSC-Regular, sans-serif;
        white-space: nowrap;
        line-height: 72px;
        background-image: linear-gradient(180deg, $mainColor7 0%, #B6E0FF 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }

      .text-w-e {
        color: rgba(155, 200, 223, 1);
        font-size: 40px;
        font-family: Helvetica, sans-serif;
        white-space: nowrap;
        line-height: 53px;
      }
    }

    .area-r {
      width: 440px;
      min-height: 100%;
      padding: 0 70px;
      box-sizing: border-box;
      background-image: url(../../../assets/image/pc/bg-logo.png);
      background-repeat: no-repeat;
      background-size: 100% 100%;

      .title {
        @include text(24px, rgba(0, 0, 0, 0.85), 31px);
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
      height: 16px;
      position: relative;
      top: -2px;
      display: inline-block;
    }

    .el-form-item__content {
      width: 100%;
      border: 1px solid rgba(0, 0, 0, 0.15);
      padding: 8px;
      border-radius: 2px;
      background-color: #ffffff;
    }

    .el-input__inner {
      border-bottom: none;
    }

    .el-input-group__prepend {
      width: 16px;
      padding: 0 3px;
      text-align: center;
    }

    .el-form-item__error {
      left: 32px;
      top: 101%;
    }
  }
}
</style>

<!--1080p的145% - 150%放大-->
<style scoped lang="scss">
@media screen and (min-width: 1280px) and (max-height: 638px) and (max-width: 1326px) {
  .login {
    .content-area {
        .area-r{
            .regTitle{
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