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
                        <name-login v-show="loginType === 'login'"></name-login>
                        <!--<el-input :placeholder = "`${$t('lang.loginConfig.loginNameP3')}`"
                                  v-model="form.name">
                            <template #prefix>
                                <img src="../../../assets/image/pc/login-email.png" height="20" width="20"/>
                            </template>
                        </el-input>
                        <el-input :placeholder = "`${$t('lang.loginConfig.loginPwdP')}`"
                                  v-model="form.pwd">
                            <template #prefix>
                                <img src="../../../assets/image/pc/login-password.png" height="20" width="20"/>
                            </template>
                        </el-input>
                        <be-button customClass="eagle-btn" @click="login" type="success">
                            {{$t('lang.loginConfig.login')}}
                        </be-button>
                        -->
                        <div class="change-register">
                            <el-button type="text" @click="forgetPassword" class="forget-btn">{{$t('lang.loginConfig.forget')}}</el-button>
                            <el-button class="button-change" type="text" @click="loginOrSingUp">{{changeLogin}}</el-button>
                        </div>
                    </div>
                    <div class="register-input-class" v-show="loginType === 'register'&&!registerSuccess">
                        <div class="register-input-title">{{$t('lang.loginConfig.register')}}</div>
                        <user-registration v-show="loginType === 'register'&&!registerSuccess"></user-registration>

                        <!--<el-form :model="form" :rules="rules" ref="resetPwdForm">
                            <el-form-item class="label" prop='name'>
                                <el-input autocomplete="off" :placeholder="$t('lang.loginConfig.phone')" v-model="form.name">
                                    <template #prefix>
                                        <img src="../../../assets/image/pc/login-email.png" height="20" width="20"/>
                                    </template>
                                </el-input>
                            </el-form-item>
                            <div class="flex">
                                <el-form-item class="label" prop='code' style="width: 58%;">
                                    <el-input :placeholder = "`${$t('lang.loginConfig.loginVerCodeP')}`"
                                              maxlength="6" type="text" autocomplete="off"
                                              class="send-code-input"
                                              v-model="code">
                                        <template #prefix>
                                            <img src="../../../assets/image/pc/login-code.png" height="20" width="20"/>
                                        </template>
                                    </el-input>
                                    <el-button class="send-button">{{$t('lang.loginConfig.send')}}</el-button>

                                    <el-input maxlength="6" type="text" autocomplete="off"
                                              :placeholder="$t('lang.loginConfig.loginVerCodeP2')" v-model="form.code">
                                        <template  #prepend><img class="iconImg" src="../../../assets/image/pc/code.png" alt="">
                                        </template>
                                    </el-input>
                                </el-form-item>
                                <p class="codeBtn" v-if="!isTip" @click="getMailCode">{{ $t('lang.loginConfig.getVerCodeValid') }}</p>
                                <p class="tips" v-else>{{ number }}s</p>
                            </div>
                            <el-form-item class="label" prop='newPwd'>
                                <el-input maxlength="12" @keyup.native="form.newPwd=form.newPwd.replace(/[ ]/g,'')"
                                          :type="visible ? 'text' : 'password'"
                                          autocomplete="off" :placeholder="$t('lang.loginConfig.newPassword')" v-model="form.newPwd">
                                    <template  #prepend><img class="iconImg" src="../../../../assets/image/pc/pwd.png" alt="">
                                    </template>
                                    <template #append>
                                        <img class="showIcon" v-if="!visible" @click="visible = !visible"
                                             src="../../../../assets/image/pc/hide.png" alt="">
                                        <img class="showIcon" v-else @click="visible = !visible"
                                             src="../../../../assets/image/pc/show.png" alt="">
                                    </template>
                                </el-input>
                            </el-form-item>
                            <el-form-item class="label" prop='password'>
                                <el-input maxlength="12" @keyup.native="form.password=form.password.replace(/[ ]/g,'')"
                                          :type="visibleAgain ? 'text' : 'password'"
                                          autocomplete="off" :placeholder="$t('lang.loginConfig.confirmPassword')"
                                          v-model="form.password">
                                    <template  #prepend><img class="iconImg" src="../../../assets/image/pc/pwd.png" alt="">
                                    </template>
                                    <template #append>
                                        <img class="showIcon" v-if="!visibleAgain" @click="visibleAgain = !visibleAgain"
                                             src="../../../assets/image/pc/hide.png" alt="">
                                        <img class="showIcon" v-else @click="visibleAgain = !visibleAgain"
                                             src="../../../assets/image/pc/show.png" alt="">
                                    </template>
                                </el-input>
                            </el-form-item>
                        </el-form>


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
                        </be-button>-->
                        <div class="change-login">
                            <el-button class="button-change" type="text" @click="loginOrSingUp">{{changeLogin}}</el-button>
                        </div>
                    </div>
                    <div class="forget-input-class" v-show="loginType === 'forget'&&!resetPsSuccess">
                        <div class="forget-input-title">{{$t('lang.loginConfig.rember')}}</div>
                        <reset-password v-show="loginType === 'forget'&&!resetPsSuccess"></reset-password>
                       <!-- <el-input :placeholder = "`${$t('lang.loginConfig.loginNameP')}`"
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
                        </be-button>-->
                        <div class="change-login">
                            <el-button class="button-change" type="text" @click="forgetPassword">{{changeLogin}}</el-button>
                        </div>
                    </div>
                    <div class="success" v-show="loginType === 'register'&&registerSuccess">
                        <img src="../../../assets/image/pc/login-success.png" height="64" width="64"/>
                        <div class="success-message">{{$t('lang.loginConfig.registerSuccess')}}</div>
                        <be-button customClass="eagle-btn" @click="loginOrSingUp" type="success">
                            {{$t('lang.loginConfig.login')}}
                        </be-button>
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
    import {
        defineComponent,
        ref,
        computed,
        ComponentInternalInstance,
        getCurrentInstance,
        reactive,
        onMounted
    } from "vue";
import {BeDialog,BeButton} from "../../../../public/be-ui/be-ui.es.js";
import {useI18n} from "vue-i18n";
import {getStore, setStore, trim} from "../../../utils/common";
import {getRouterInfo, IRouterParams, loginName} from "../../../api/login";
import {Base64} from "js-base64";
import composition from "../../../utils/mixin/common-func"
import {ElForm,ElMessage} from "element-plus/es";
import ResetPassword from "./components/reset-password.vue"
import NameLogin from "./components/name-login.vue"
import UserRegistration from "./components/user-registration.vue"
import {useStore} from "vuex";
import {initRouterConfig} from "../../../router/router-pc";
import {RouteRecordRaw} from "vue-router";
    import {pwdReg} from "../../../utils/reg";
type FormInstance = InstanceType<typeof ElForm>
declare type loginType = {
    name: string
    pwd: string
    code: string
}
export default defineComponent({
    name: "login-dialog",
    components:{
        BeDialog,BeButton,
        ResetPassword,NameLogin,UserRegistration
    },
    setup(props,ctx){
        const {t} = useI18n()
        const {message, codeUrl, uuid, getCode, router, routerPush} = composition(props,ctx)

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
            if(loginType.value === 'signUp'){
                return t('lang.loginConfig.titleLogin')
            }else{
                return t('lang.loginConfig.titleRegister')
            }
        })
        const resetPsSuccess = ref<boolean>(false)
        const registerSuccess = ref<boolean>(false)

        const isLogin = ref<boolean>(false)
        const refsForm: ComponentInternalInstance | null = getCurrentInstance()
        onMounted(() => {
            getCode();
        })
        // 校驗提示
        const validatePwd = (rule: any, value: any, callback: any):void => {
            if (!pwdReg.test(value)) {
                callback(new Error(t('lang.loginConfig.phoneNumErr')));
            } else {
                callback();
            }
        };
        // 校驗規則
        const rules = reactive({
            name: [
                {required: true, message: t('lang.loginConfig.loginNameP'), trigger: 'blur'},
            ],
            pwd: [
                {required: true, message: t('lang.loginConfig.loginPwdP'), trigger: 'blur'},
                {validator: validatePwd, trigger: 'blur'}
            ],
            code: [
                {required: true, message: t('lang.loginConfig.loginVerCodeP'), trigger: 'blur'},
            ],
        })

        const form = ref<loginType>({name: '', pwd: '', code: ''})
        /**
         * 登录、忘记密码或注册方法
         */
        const login = ()=>{
            if(loginType.value === 'login'){
                userLogin()
            }else if(loginType.value === 'register'){
                registerSuccess.value = true
                console.log('注册')
            }else if(loginType.value === 'forget'){
                console.log('忘记密码')
                resetPsSuccess.value = true
            }
        }
        const userLogin = (): void => {
            form.value.name = trim(form.value.name);
            form.value.code = trim(form.value.code);
            refsForm && (refsForm.refs.loginForm as FormInstance).validate((valid: boolean | undefined) => {
                if (valid) {
                    loginName({
                        username: form.value.name,
                        password: Base64.encode(form.value.pwd),
                        code: form.value.code,
                        uuid: uuid.value,
                        client_id: 'beosin-eye',
                        client_secret: '123456',
                        grant_type: 'password',
                        login_type: "password",
                        scope: 'server',

                    }).then((res: any) => {
                        const langCache = getStore('language')
                        window.localStorage.clear();
                        langCache && setStore('language', langCache)
                        isLogin.value = false;
                        setStore('userInfo', JSON.stringify({
                            username: res.username
                        }));
                        setStore('token', res.access_token);
                        setStore('userId', res.user_id);
                        !getStore('debugSessionId') && setStore('debugSessionId', (new Date().getTime()).toString());
                        showDialog.value = false
                        /*// 登錄先拿路由在跳轉
                        getRouter()*/
                    }).catch(err => {
                        message('error', err.message || err)
                        getCode();
                        isLogin.value = false;
                    });
                } else {
                    return false;
                }
            });
        }
        /*// 获取路由
        const store = useStore()
        const getRouter = (): void => {
            const params: IRouterParams = {
                systemCode: 'beosin-eye',
                userId: getStore('userId'),
            }
            getRouterInfo(params).then(res => {
                const routerConfig = initRouterConfig(res.data[0].children)
                store.commit('update', ['routeConfig', routerConfig])
                routerConfig.map((val: RouteRecordRaw) => {
                    router.addRoute('layout', val)
                })
                router.addRoute({
                    path: '/:w+',
                    redirect: '/404'
                })
                // routerPush('/404')
                routerPush('/blockchainSituation')
            }).catch(err => {
                console.error(err)
                message('error', err.message || err)})
        }*/
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
            login,
            forgetPassword,
            form,
            codeUrl,
            getCode,
            rules,
            visible,
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
  .codeBtn{
    height: 48px;
    margin-bottom: 18px;
  }

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