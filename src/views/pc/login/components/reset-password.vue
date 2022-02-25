<template>
    <div class="formArea">
        <el-form :model="form" :rules="rules" ref="resetPwdForm">
            <el-form-item class="label" prop='name'>
                <el-input autocomplete="off"
                          :placeholder="$t('lang.loginConfig.phone')"
                          v-model="form.name">
                    <template #prefix>
                        <img alt="" src="../../../../assets/image/pc/login-email.png" height="20" width="20"/>
                    </template>
                </el-input>
            </el-form-item>
            <el-form-item class="label" prop='code' style="width: 58%;">
                <div class="send-code">
                    <el-input :placeholder = "`${$t('lang.loginConfig.loginVerCodeP')}`"
                              class="send-code-input"
                              v-model="form.code">
                        <template #prefix>
                            <img alt="" src="../../../../assets/image/pc/login-code.png" height="20" width="20"/>
                        </template>
                    </el-input>
                    <el-button v-if="!isTip" class="send-button" @click="getCode">{{$t('lang.loginConfig.send')}}</el-button>
                    <el-button class="send-button" v-else>{{ num }}s</el-button>
                </div>
            </el-form-item>
            <el-form-item class="label" prop='newPwd'>
                <el-input maxlength="12" @keyup.native="form.newPwd=form.newPwd.replace(/[ ]/g,'')"
                          :type="visible ? 'text' : 'password'"
                          autocomplete="off" :placeholder="$t('lang.loginConfig.newPassword')" v-model="form.newPwd">
                    <template #prefix>
                        <img alt="" src="../../../../assets/image/pc/login-password.png" height="20" width="20"/>
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
                    <template #prefix>
                        <img alt="" src="../../../../assets/image/pc/login-password.png" height="20" width="20"/>
                    </template>
                    <template #append>
                        <img class="showIcon" v-if="!visibleAgain" @click="visibleAgain = !visibleAgain"
                             src="../../../../assets/image/pc/hide.png" alt="">
                        <img class="showIcon" v-else @click="visibleAgain = !visibleAgain"
                             src="../../../../assets/image/pc/show.png" alt="">
                    </template>
                </el-input>
            </el-form-item>
        </el-form>
        <be-button style="width: 100%;" customClass="eagle-btn" @click="resetPwd" type="success">
            {{$t('lang.loginConfig.confirmReset')}}
        </be-button>
    </div>
</template>

<script lang="ts">
import {forgetPasswordApi, verifyCodePassword,} from '../../../../api/login';
import {defineComponent, ref, reactive, getCurrentInstance, ComponentInternalInstance} from 'vue'
import {pwdReg, phoneReg, emailReg} from "../../../../utils/reg";
import {useI18n} from "vue-i18n";
import composition from "../../../../utils/mixin/common-func";
import {trim} from "../../../../utils/common";
import type {ElForm} from 'element-plus'
import {BeButton} from "../../../../../public/be-ui/be-ui.es";
import {Base64} from "js-base64";
type FormInstance = InstanceType<typeof ElForm>
declare type resetPwdType = {
    name: string
    password: string
    code: string
    newPwd: string
}
export default defineComponent({
    name: "ResetPassword",
    components:{BeButton},
    setup(props, ctx) {
        const {t} = useI18n()
        const {message} = composition(props, ctx)
        // 表單對象
        const form = ref<resetPwdType>({
            name: '',
            password: '',
            code: '',
            newPwd: '',
        })
        const isTip = ref<boolean>(false)
        const num = ref<number>(60)
        const refsForm: ComponentInternalInstance | null = getCurrentInstance()
        // 獲取驗證碼
        const getCode = (): void => {
            form.value.name = trim(form.value.name);
            refsForm && (refsForm.refs.resetPwdForm as FormInstance).validateField('name', (error: string | undefined) => {
                if (!error) {
                    verifyCodePassword({
                        userName: form.value.name
                    }).then((res: any) => {
                        message('success', t('lang.loginConfig.getVerCodeValid') + t('lang.success'))
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
                    }).catch((err) => {
                        message('error', err.message || err)
                        console.error(err)
                    });
                }
            })
        }
        // 重置密碼
        const isLogin = ref<boolean>(false)
        const resetPwd = (): void => {
            form.value.name = trim(form.value.name);
            form.value.code = trim(form.value.code);
            refsForm && (refsForm.refs.resetPwdForm as FormInstance).validate((valid:boolean | undefined) => {
                if (valid) {
                    isLogin.value = true;
                    forgetPasswordApi({
                        account:form.value.name,
                        password:Base64.encode(form.value.password),
                        re_password:Base64.encode(form.value.password),
                        verification_code:form.value.code,
                    }).then(() => {
                        ctx.emit('resetSuccess')
                    }).catch((err) => {
                        message('error', err.message || err)
                        console.error(err)
                        isLogin.value = false;
                    });
                } else {
                    return false
                }
            });
        }
        const visible = ref<boolean>(false)
        const visibleAgain = ref<boolean>(false)
        // 電話號碼正則校驗提示
        const validatePhonenumber = (rule: any, value: any, callback: any):void => {
            if (emailReg.test(value)) {
                callback();
            } else {
                callback(new Error(t('lang.loginConfig.emailErr')));
            }
        }
        // 密碼正則校驗提示
        const validateNewPwd = (rule: any, value: any, callback: any):void => {
            if (!pwdReg.test(value)) {
                callback(new Error(t('lang.loginConfig.phoneNumErr')));
            } else {
                callback();
            }
        };
        const validatePwd = (rule: any, value: any, callback: any):void => {
            if (!pwdReg.test(value)) {
                callback(new Error(t('lang.loginConfig.phoneNumErr')));
            } else {
                if (form.value.newPwd === form.value.password) {
                    callback();
                } else {
                    callback(new Error(t('lang.loginConfig.passwordAgreement')));
                }
            }
        };
        // 校驗規則
        const rules = reactive({
            name: [
                {required: true, message: t('lang.loginConfig.email'), trigger: 'blur'},
                {validator: validatePhonenumber, trigger: 'blur'}
            ],
            code: [
                {required: true, message: t('lang.loginConfig.loginVerCodeP2'), trigger: 'blur'},
            ],
            newPwd: [
                {required: true, message: t('lang.loginConfig.newPassword'), trigger: 'blur'},
                {min: 6, max: 12, message: t('lang.loginConfig.phoneNumErr'), trigger: 'blur'},
                {validator: validateNewPwd, trigger: 'blur'}
            ],
            password: [
                {required: true, message: t('lang.loginConfig.confirmPassword'), trigger: 'blur'},
                {min: 6, max: 12, message:t('lang.loginConfig.phoneNumErr'), trigger: 'blur'},
                {validator: validatePwd, trigger: 'blur'}
            ],
        })
        /**
         * 修改显示类型
         * @param type 显示类型
         */
        /*const changeShow = (type: number): void => {
            ctx.emit('changeShow', type)
        }*/
        return {
            rules,
            visible,
            visibleAgain,
            isTip,
            form,
            num,
            isLogin,
            resetPwd,
            getCode,
        }
    }

})

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!--<style lang='scss' scoped>
.formArea {
  width: 100%;
  margin: auto;

  .primary {
    width: 100%;
    height: 38px;
    margin-top: 14px
  }

  .showIcon {
    position: relative;
    top: -2px;
    display: inline-block;
    height: 16px;
    cursor: pointer;
  }

  .errBtn {
    cursor: not-allowed;
  }

  .codeBtn {
    width: 34%;
    height: 38px;
    font-size: 14px;
    line-height: 38px;
    color: #fff;
    text-align: center;
    cursor: pointer;
    background-color: #206596;
    border-radius: 5px;
    opacity: .8;
  }

  .codeBtn:hover {
    opacity: 1;
  }

  .tips {
    width: 110px;
    height: 37px;
    font-size: 14px;
    line-height: 37px;
    color: #76838F;
    text-align: center;
    background-color: #F2F4F5;
    border-radius: 5px;
  }

  .checkArea {
    margin-top: 15px;
    font-size: 14px;
    font-weight: 400;
    line-height: 21px;
    text-align: right;

    .cursor {
      cursor: pointer;

      &:hover {
        text-decoration: underline;
      }
    }

    .phone {
      color: #4A4A4A;
    }
  }
}

.flex {
  align-items: flex-start;
  justify-content: space-between;
}
</style>-->
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

