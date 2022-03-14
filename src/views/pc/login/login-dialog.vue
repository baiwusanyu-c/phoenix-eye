/*
* @login-dialog.vue
* @deprecated
* @author czh
* @update (czh 2022/2/22)
*/
<template>
    <div id="login_dialog">
        <be-dialog
            titles=" "
            ref='loginDialogInner'
            :is-show="showDialog"
            :is-open-modal="true"
            :is-drag="false"
            layout="center"
            @close="handleClose"
            custom-class="login-dialog">
            <div class="login-main">
                <img class="login-logo-img" src="../../../assets/image/pc/login-logo.png" height="45" width="200" alt=""/>
                <div class="login-body">
                    <div class="login-title">
                        <div class="login-title-big">Welcome to Eagle Eye</div>
                        <div class="login-title-small">© 2022 by Beosin. All Rights Reserved.</div>
                    </div>
                    <div class="login-input-class" v-if ="loginType === 'login'">
                        <div class="login-input-title">{{$t('lang.loginConfig.titleLogin')}}</div>
                        <div>
                            <name-login></name-login>
                            <div class="change-register">
                                <el-button type="text" @click="forgetPassword" class="forget-btn">{{$t('lang.loginConfig.forget')}}</el-button>
                                <el-button class="button-change" type="text" @click="loginOrSingUp">{{changeLogin}}</el-button>
                            </div>
                        </div>
                    </div>

                    <div class="register-input-class" v-if="loginType === 'register'&&!registerSuccess">
                        <div class="register-input-title">{{$t('lang.loginConfig.register')}}</div>
                        <div>
                            <user-registration @registerSuccess="registerSuc"></user-registration>
                            <div class="change-login">
                                <el-button class="button-change" type="text" @click="loginOrSingUp">{{changeLogin}}</el-button>
                            </div>
                        </div>
                    </div>

                    <div class="forget-input-class" v-if="loginType === 'forget'&& !resetPsSuccess">
                        <div class="forget-input-title">{{$t('lang.loginConfig.rember')}}</div>
                        <reset-password @resetSuccess="resetSuc"></reset-password>
                        <div class="change-login">
                            <el-button class="button-change" type="text" @click="forgetPassword">{{changeLogin}}</el-button>
                        </div>
                    </div>

                    <div class="success" v-show="loginType === 'register'&& registerSuccess">
                        <img src="../../../assets/image/pc/login-success.png" height="64" width="64" alt=""/>
                        <div class="success-message">{{$t('lang.loginConfig.registerSuccess')}}</div>
                        <be-button style="width: 100%" customClass="eagle-btn" @click="loginOrSingUp" type="success">
                            {{$t('lang.loginConfig.login')}}
                        </be-button>
                    </div>

                    <div class="success" v-show="loginType === 'forget'&& resetPsSuccess">
                        <img src="../../../assets/image/pc/login-success.png" height="64" width="64" alt=""/>
                        <div class="success-message">{{$t('lang.loginConfig.resetPasswordSuccess')}}</div>
                        <be-button style="width: 100%" customClass="eagle-btn" @click="forgetPassword" type="success">
                            {{$t('lang.loginConfig.login')}}
                        </be-button>
                    </div>
                </div>
            </div>
        </be-dialog>
    </div>

</template>

<script lang="ts">
import {defineComponent, ref, computed,} from "vue";
import {BeDialog,BeButton} from "../../../../public/be-ui/be-ui.es.js";
import {useI18n} from "vue-i18n";
import composition from "../../../utils/mixin/common-func"
import ResetPassword from "./components/reset-password.vue"
import NameLogin from "./components/name-login.vue"
import UserRegistration from "./components/user-registration.vue"

export default defineComponent({
    name: "login-dialog",
    components:{
        BeDialog,BeButton,
        ResetPassword,NameLogin,UserRegistration
    },
    setup(props,ctx){
        const {t} = useI18n()
        const {codeUrl, getCode} = composition(props,ctx)

        const showDialog = ref<boolean>(false)
        const visible = ref<boolean>(false)
        const loginType = ref<string>('login')
        const loginOrSingUp = () => {
            if(loginType.value === 'login'){
                loginType.value = 'register'
                registerSuccess.value = false
            }else{
                loginType.value = 'login'
                registerSuccess.value = false
            }
        }
        const forgetPassword = ()=>{
            if(loginType.value === 'login'){
                resetPsSuccess.value = false
                loginType.value = 'forget'
            }else{
                resetPsSuccess.value = false
                loginType.value = 'login'
            }
        }
        const changeLogin = computed(()=>{
            if(loginType.value !== 'login'){
                return t('lang.loginConfig.titleLogin')
            }else{
                return t('lang.loginConfig.titleRegister')
            }
        })

        const resetPsSuccess = ref<boolean>(false)
        const resetSuc = () => {
            resetPsSuccess.value = true
        }

        const registerSuccess = ref<boolean>(false)
        const registerSuc = () => {
            registerSuccess.value = true
        }

        const handleClose = ():void =>{
            // 关闭弹窗
            resetPsSuccess.value = false
            registerSuccess.value = false
            showDialog.value = false
            loginType.value = 'login'
        }
        return {
            resetSuc,
            registerSuc,
            showDialog,
            handleClose,
            loginType,
            resetPsSuccess,
            registerSuccess,
            loginOrSingUp,
            changeLogin,
            forgetPassword,
            codeUrl,
            getCode,
            visible,
        }
    }
})

</script>

<style lang="scss">
#login_dialog{

  .be-dialog{
    position: absolute;
      min-width: 1280px;
  }

  .login-dialog {
    width: 1080px;
    height: 592px;
    background-image: url("../../../assets/image/pc/login-bg.png");
    background-repeat: round;
    background-size: 100%;
    border: 4px;

    .be-dialog-title{
      background-color: transparent;
    }

    .be-dialog-body__inner{
      background-color: transparent;
    }

    .eagle-btn{
      height: 48px;
    }

    .el-input__inner{
      height: 48px;
      padding-left: 40px;
    }

    .be-dialog-footer__center{
      display: none;
    }

    .el-input__prefix-inner {
      display: flex;
      align-items: center;
      pointer-events: all;

    }
  }
}
</style>

<style lang="scss" scoped>


  .login-main{
    background: transparent;

    .login-body{
      display: flex;
      justify-content: center;
      background: transparent;

      .login-title{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 620px;
        height: 336px;

        .login-title-small{
          width: 490px;
          height: 20px;
          font-family: AlibabaPuHuiTi-Regular, AlibabaPuHuiTi,sans-serif;
          font-size: 14px;
          font-weight: 400;
          line-height: 40px;
          color: #666;
          text-align: left;
        }

        .login-title-big{
          width: 490px;
          font-size: 36px;
          font-weight: 500;
          line-height: 48px;
          color: #333;
          text-align: left;

        }
      }

      .register-input-class{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 400px;
        height: 380px;

        .register-input-title{
          width: 200px;
          height: 32px;
          margin-top: 36px;
          font-size: 24px;
          font-weight: 600;
          line-height: 32px;
          color: rgba(0, 0, 0, .85);
          text-align: left;
        }

        .change-login{
          display: flex;
          flex-direction: row-reverse;
        }
      }

      .forget-input-class{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 400px;
        height: 428px;

        .forget-input-title{
          width: 200px;
          height: 32px;
          margin-top: 35px;
          font-size: 24px;
          font-weight: 600;
          line-height: 32px;
          color: rgba(0, 0, 0, .85);
          text-align: left;
        }

        .change-login{
          display: flex;
          flex-direction: row-reverse;
        }
      }

      .login-input-class{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 400px;
        height: 400px;

        .login-input-title{
          width: 200px;
          height: 32px;
          margin-top: 36px;
          font-size: 24px;
          font-weight: 600;
          line-height: 32px;
          color: rgba(0, 0, 0, .85);
          text-align: left;
        }

        .change-register{
          display: flex;
          flex-direction: row;
          justify-content: space-between;
        }

        .forget-btn{
          color: rgba(74, 74, 74, .85);
        }

        .forget-btn:hover{
          color: rgba(74, 74, 74);
        }
      }

      .button-change{
        color: #1CD2A9;
      }

      .success{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        width: 400px;
        height: 208px;
        margin-top: 90px;

        .success-message{
          height: 32px;
          font-size: 24px;
          font-weight: 600;
          line-height: 32px;
          color: #444;
        }
      }

      .login-logo-img{
        background: transparent;
      }
    }


  }
</style>