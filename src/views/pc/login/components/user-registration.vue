<template>
    <div class="formArea user-registration">
        <el-form :model="form" :rules="rules" ref="registerForm">
            <el-form-item class="label" prop='email'>
                <el-input :placeholder = "$t('lang.loginConfig.loginNameP')"
                          autocomplete="off"
                          v-model="form.email">
                    <template #prefix>
                        <img alt="" src="../../../../assets/image/pc/login-email.png" height="20" width="20"/>
                    </template>
                </el-input>
            </el-form-item>
            <el-form-item class="label" prop='code'>
                <div class="send-code">
                    <el-input :placeholder = "$t('lang.loginConfig.loginVerCodeP')"
                              autocomplete="off"
                              class="send-code-input"
                              maxlength="6"
                              type="text"
                              v-model="form.code">
                        <template #prefix>
                            <img alt="" src="../../../../assets/image/pc/login-code.png" height="20" width="20"/>
                        </template>
                    </el-input>
                    <el-button v-if="!isTip" class="send-button" @click="getCode">{{$t('lang.loginConfig.send')}}</el-button>
                    <el-button v-else class="send-button">{{num}}s</el-button>
                </div>
            </el-form-item>
            <el-form-item class="label" prop='password'>
                <el-input :placeholder = "$t('lang.loginConfig.loginPwdValid')"
                          autocomplete="off"
                          v-model="form.password">
                    <template #prefix>
                        <img alt="" src="../../../../assets/image/pc/login-password.png" height="20" width="20"/>
                    </template>
                </el-input>
            </el-form-item>
        </el-form>
        <be-button style="width: 100%;" customClass="eagle-btn" @click="registerSubmit" type="success">
            {{$t('lang.loginConfig.register')}}
        </be-button>
    </div>
</template>

<script lang="ts">
import {defineComponent, ref, reactive, getCurrentInstance, ComponentInternalInstance} from 'vue'
import {trim} from "../../../../utils/common";
import {BeButton} from "../../../../../public/be-ui/be-ui.es";
import {verifyCode, registerAccount} from "../../../../api/login";
import composition from "../../../../utils/mixin/common-func";
import {pwdReg, emailReg} from "../../../../utils/reg";
import {useI18n} from "vue-i18n";
import type {ElForm} from 'element-plus'
import {ElMessage} from "element-plus/es";
import {Base64} from "js-base64";

type FormInstance = InstanceType<typeof ElForm>
declare type registerType = {
    email:string
    code: string
    password: string
}
export default defineComponent({
    name: "UserRegistration",
    components:{BeButton},
    emits:['registerSuccess'],
    setup(props, ctx) {
        const {t} = useI18n()
        const {message} = composition(props, ctx)
        const validatePwd = (rule: any, value: any, callback: any) => {
            if (!pwdReg.test(value)) {
                callback(new Error(t('lang.loginConfig.phoneNumErr')));
            } else {
                callback();
            }
        };
        const validateEmail = (rule: any, value: any, callback: any): void => {
            if (!emailReg.test(value)) {
                callback(new Error(t('lang.loginConfig.emailErr')));
            } else {
                callback();
            }
        };
        // 校驗規則
        const rules = reactive({
            code: [
                {required: true, message: t('lang.loginConfig.loginVerCodeP'), trigger: 'blur'},
            ],
            password: [
                {required: true, message: t('lang.loginConfig.loginPwdP'), trigger: 'blur'},
                {validator: validatePwd, trigger: 'blur'}
            ],
            email: [
                {required: false, message: t('lang.loginConfig.email'), trigger: 'blur'},
                {validator: validateEmail, trigger: 'blur'}
            ]
        })
        // 表單對象
        const form = ref<registerType>({
            email:'',
            code:'',
            password:'',
        })

        const isTip = ref<boolean>(false)
        const num = ref<number>(60)
        const refsForm: ComponentInternalInstance | null = getCurrentInstance()
        // 获取验证码
        const getCode = () => {
            form.value.password = trim(form.value.password);
            refsForm && (refsForm.refs.registerForm as FormInstance).validateField('email', (error:any) => {
                if (!error) {
                    const params = {
                        userName:String(form.value.email)
                    }
                    verifyCode(params).then((res:any)=>{
                        ElMessage.success(t('lang.loginConfig.getVerCodeValid') + t('lang.success'));
                        isTip.value = true;
                        num.value = 60;
                        let codeInerval = setInterval(() => {
                            if (num.value > 0) {
                                num.value--;
                            } else {
                                clearInterval(codeInerval);
                                isTip.value = false;
                            }
                        }, 1000)
                    }).catch((err:any) => {
                        ElMessage.error(err)
                        console.error(err)
                    })

                }
            })
        }
        const isLogin = ref<boolean>(false)
        // 注册成功
        const registerSubmit = (): void => {
            form.value.email = trim(form.value.email);
            form.value.code = trim(form.value.code);
            form.value.code = trim(form.value.code);
            refsForm && (refsForm.refs.registerForm as FormInstance).validate((valid:boolean | undefined) => {
                if (valid) {
                    isLogin.value = true;
                    registerAccount({
                        account:form.value.email,
                        verification_code: form.value.code,
                        password: Base64.encode(form.value.password),
                        from: 'fraud_system',
                    }).then(() => {
                        ctx.emit('registerSuccess')
                    }).catch(err => {
                        message('error', err.message || err)
                        console.error(err)
                        isLogin.value = false;
                    });
                } else {
                    return false;
                }
            });
        }
        const visible = ref<boolean>(false)
        const visibleAgain = ref<boolean>(false)
        return {
            rules,
            form,
            visible,
            visibleAgain,
            registerSubmit,
            isLogin,
            getCode,
            isTip,
            num,
        }
    },
   
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .send-code{
    display: flex;
    justify-content: space-between;

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
      width: 256px;
      padding-right: 16px;
    }
  }
</style>
<!--1080p的145% - 150%放大-->
<style lang="scss">
.formArea.user-registration {
  height: 256px;

  .el-form-item {
    margin-bottom: 20px;

  }

  .primary {
    margin-top: 0;
  }
}
</style>