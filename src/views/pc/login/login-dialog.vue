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
                <img class="login-logo-img" src="../../../assets/image/pc/login-logo.png" height="45" width="200"/>
                <div class="login-body">
                    <div class="login-title">
                        <div class="login-title-small">Welcome to Eagle Eye</div>
                        <div class="login-title-big">Awareness Management Platform</div>
                    </div>
                    <div class="login-input-class" v-show="loginType === 'login'">
                        <div class="login-input-title">{{$t('lang.loginConfig.titleLogin')}}</div>
                        <el-input :placeholder = "`${$t('lang.loginConfig.loginNameP3')}`"
                                  v-model="username">
                            <template #prefix>
                                <img src="../../../assets/image/pc/login-email.png" height="20" width="20"/>
                            </template>
                        </el-input>
                        <el-input :placeholder = "`${$t('lang.loginConfig.loginPwdP')}`"
                                  v-model="password">
                            <template #prefix>
                                <img src="../../../assets/image/pc/login-password.png" height="20" width="20"/>
                            </template>
                        </el-input>
                        <be-button customClass="eagle-btn" @click="login" type="success">
                            {{$t('lang.loginConfig.login')}}
                        </be-button>
                        <div class="change-register">
                            <el-button type="text" @click="forgetPassword" class="forget-btn">{{$t('lang.loginConfig.forget')}}</el-button>
                            <el-button class="button-change" type="text" @click="loginOrSingUp">{{changeLogin}}</el-button>
                        </div>
                    </div>
                    <div class="register-input-class" v-show="loginType === 'register'&&!registerSuccess">
                        <div class="register-input-title">{{$t('lang.loginConfig.register')}}</div>
                        <el-input :placeholder = "`${$t('lang.loginConfig.loginNameP')}`"
                                  v-model="username">
                            <template #prefix>
                                <img src="../../../assets/image/pc/login-email.png" height="20" width="20"/>
                            </template>
                        </el-input>
                        <div class="send-code">
                            <el-input :placeholder = "`${$t('lang.loginConfig.loginVerCodeP')}`"
                                      class="send-code-input"
                                      v-model="code">
                                <template #prefix>
                                    <img src="../../../assets/image/pc/login-code.png" height="20" width="20"/>
                                </template>
                            </el-input>
                            <el-button class="send-button">{{$t('lang.loginConfig.send')}}</el-button>
                        </div>
                        <el-input :placeholder = "`${$t('lang.loginConfig.loginPwdValid')}`"
                                  v-model="password">
                            <template #prefix>
                                <img src="../../../assets/image/pc/login-password.png" height="20" width="20"/>
                            </template>
                        </el-input>
                        <be-button customClass="eagle-btn" @click="login" type="success">
                            {{$t('lang.loginConfig.register')}}
                        </be-button>
                        <div class="change-login">
                            <el-button class="button-change" type="text" @click="loginOrSingUp">{{changeLogin}}</el-button>
                        </div>
                    </div>
                    <div class="success" v-show="loginType === 'register'&&registerSuccess">
                        <img src="../../../assets/image/pc/login-success.png" height="64" width="64"/>
                        <div class="success-message">{{$t('lang.loginConfig.registerSuccess')}}</div>
                        <be-button customClass="eagle-btn" @click="loginOrSingUp" type="success">
                            {{$t('lang.loginConfig.login')}}
                        </be-button>
                    </div>
                    <div class="forget-input-class" v-show="loginType === 'forget'&&!resetPsSuccess">
                        <div class="forget-input-title">{{$t('lang.loginConfig.rember')}}</div>
                        <el-input :placeholder = "`${$t('lang.loginConfig.loginNameP')}`"
                                  v-model="username">
                            <template #prefix>
                                <img src="../../../assets/image/pc/login-email.png" height="20" width="20"/>
                            </template>
                        </el-input>
                        <div class="send-code">
                            <el-input :placeholder = "`${$t('lang.loginConfig.loginVerCodeP')}`"
                                      class="send-code-input"
                                      v-model="code">
                                <template #prefix>
                                    <img src="../../../assets/image/pc/login-code.png" height="20" width="20"/>
                                </template>
                            </el-input>
                            <el-button class="send-button">{{$t('lang.loginConfig.send')}}</el-button>
                        </div>
                        <el-input :placeholder = "`${$t('lang.loginConfig.newPassword')}`"
                                  v-model="password">
                            <template #prefix>
                                <img src="../../../assets/image/pc/login-password.png" height="20" width="20"/>
                            </template>
                        </el-input>
                        <el-input :placeholder = "`${$t('lang.loginConfig.confirmPassword')}`"
                                  v-model="password">
                            <template #prefix>
                                <img src="../../../assets/image/pc/login-password.png" height="20" width="20"/>
                            </template>
                        </el-input>
                        <be-button customClass="eagle-btn" @click="login" type="success">
                            {{$t('lang.loginConfig.confirmReset')}}
                        </be-button>
                        <div class="change-login">
                            <el-button class="button-change" type="text" @click="forgetPassword">{{changeLogin}}</el-button>
                        </div>
                    </div>
                    <div class="success" v-show="loginType === 'forget'&&resetPsSuccess">
                        <img src="../../../assets/image/pc/login-success.png" height="64" width="64"/>
                        <div class="success-message">{{$t('lang.loginConfig.resetPasswordSuccess')}}</div>
                        <be-button customClass="eagle-btn" @click="forgetPassword" type="success">
                            {{$t('lang.loginConfig.login')}}
                        </be-button>
                    </div>
                </div>
            </div>
        </be-dialog>
    </div>

</template>

<script lang="ts">
import {defineComponent, ref, computed} from "vue";
import {BeDialog,BeButton} from "../../../../public/be-ui/be-ui.es.js";
import {useI18n} from "vue-i18n";
export default defineComponent({
    name: "login-dialog",
    components:{
        BeDialog,BeButton
    },
    setup(){
        const {t} = useI18n()
        const showDialog = ref<boolean>(false)
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
            if(loginType.value === 'signUp'){
                return t('lang.loginConfig.titleLogin')
            }else{
                return t('lang.loginConfig.titleRegister')
            }
        })
        const resetPsSuccess = ref<boolean>(false)
        const registerSuccess = ref<boolean>(false)

        const username = ref<string>('')
        const password = ref<string>('')
        const code = ref<string>('')
        /**
         * 登录、忘记密码或注册方法
         */
        const login = ()=>{
            if(loginType.value === 'login'){
                console.log('登录')
            }else if(loginType.value === 'register'){
                registerSuccess.value = true
                console.log('注册')
            }else if(loginType.value === 'forget'){
                console.log('忘记密码')
                resetPsSuccess.value = true
            }
        }
        /**
         * 忘记密码方法
         */
        const resetPassword = ()=>{
            console.log('忘记密码')
        }

        const handleClose = ():void =>{
            // 重置表单

            // 关闭弹窗
            showDialog.value = false
        }
        return {
            showDialog,
            handleClose,
            loginType,
            resetPsSuccess,
            registerSuccess,
            loginOrSingUp,
            changeLogin,
            username,
            password,
            code,
            login,
            forgetPassword,
        }
    }
})

</script>

<style lang="scss">
#login_dialog{

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
          font-size: 24px;
          font-weight: 400;
          line-height: 33px;
          color: #333;
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
          margin-top: 35px;
          font-size: 24px;
          font-weight: 600;
          line-height: 32px;
          color: rgba(0, 0, 0, .85);
          text-align: left;
        }

        .send-code{
          display: flex;
          flex-direction: row;

          .send-button{
            width: 144px;
            height: 48px;
            color: #1CD2A9;
            background: rgba(133, 229, 191, .1);
            border-color: rgba(133, 229, 191, .1);
            border-radius: 2px;
          }

          .send-button:hover{
            border-color: #1CD2A9;
          }

          .send-code-input{
            padding-right: 16px;
          }
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

        .send-code{
          display: flex;
          flex-direction: row;

          .send-button{
            width: 144px;
            height: 48px;
            color: #1CD2A9;
            background: rgba(133, 229, 191, .1);
            border-color: rgba(133, 229, 191, .1);
            border-radius: 2px;
          }

          .send-button:hover{
            border-color: #1CD2A9;
          }

          .send-code-input{
            padding-right: 16px;
          }
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
        height: 350px;

        .login-input-title{
          width: 200px;
          height: 32px;
          margin-top: 65px;
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