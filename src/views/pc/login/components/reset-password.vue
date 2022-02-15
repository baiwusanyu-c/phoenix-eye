<template>
    <div class="formArea">
        <el-form :model="form" :rules="rules" ref="resetPwdForm">
            <el-form-item class="label" prop='name'>
                <el-input autocomplete="off" :placeholder="$t('lang.loginConfig.phone')" v-model="form.name">
                    <template #prepend><img class="iconImg" src="../../../../assets/image/pc/user.png" alt="">
                    </template>
                </el-input>
            </el-form-item>
            <div class="flex">
                <el-form-item class="label" prop='code' style="width: 58%;">
                    <el-input maxlength="6" type="text" autocomplete="off"
                              :placeholder="$t('lang.loginConfig.loginVerCodeP2')" v-model="form.code">
                        <template  #prepend><img class="iconImg" src="../../../../assets/image/pc/code.png" alt="">
                        </template>
                    </el-input>
                </el-form-item>
                <p class="codeBtn" v-if="!isTip" @click="getCode">{{ $t('lang.loginConfig.getVerCodeValid') }}</p>
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
                    <template  #prepend><img class="iconImg" src="../../../../assets/image/pc/pwd.png" alt="">
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
        <el-button class="primary" type="primary" :loading="isLogin" @click="resetPwd">
            {{ $t('lang.loginConfig.confirmReset') }}
        </el-button>
        <p class="checkArea">
            <span class="phone cursor" @click="changeShow(1)">{{ $t('lang.loginConfig.confirmReset') }}</span>
        </p>
    </div>
</template>

<script lang="ts">
import {updatePwd, getResetCode} from '../../../../api/login';
import {defineComponent, ref, reactive, getCurrentInstance, ComponentInternalInstance} from 'vue'
import {pwdReg, phoneReg} from "../../../../utils/reg";
import {useI18n} from "vue-i18n";
import composition from "../../../../utils/mixin/common-func";
import {trim} from "../../../../utils/common";
import type {ElForm} from 'element-plus'
type FormInstance = InstanceType<typeof ElForm>
declare type resetPwdType = {
    name: string
    password: string
    code: string
    uuid: string
    newPwd: string
}
export default defineComponent({
    name: "ResetPassword",
    emits: [
        'changeShow',
    ],
    setup(props, ctx) {
        const {t} = useI18n()
        const {message} = composition(props, ctx)
        // 表單對象
        const form = ref<resetPwdType>({
            name: '',
            password: '',
            code: '',
            uuid: '',
            newPwd: '',
        })
        const isTip = ref<boolean>(false)
        const num = ref<number>(60)
        const refsForm: ComponentInternalInstance | null = getCurrentInstance()
        // 獲取手機驗證碼
        const getCode = (): void => {
            form.value.name = trim(form.value.name);
            refsForm && (refsForm.refs.resetPwdForm as FormInstance).validateField('name', (error: string | undefined) => {
                if (!error) {
                    getResetCode({
                        userName: form.value.name
                    }).then((res: any) => {
                        message('success', t('lang.loginConfig.getVerCodeValid') + t('lang.success'))
                        form.value.uuid = res;
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
                        message('error', err || err.message)
                        console.log(err)
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
                    updatePwd({
                        userName: form.value.name,
                        password: form.value.password,
                        uuid: form.value.uuid,
                        code: form.value.code,
                    }).then(() => {
                        message('success', t('lang.loginConfig.resetPassword') + t('lang.success'))
                        changeShow(1)
                    }).catch((err) => {
                        message('error', err || err.message)
                        isLogin.value = false;
                    });
                } else {
                    return false;
                }
            });
        }
        const visible = ref<boolean>(false)
        const visibleAgain = ref<boolean>(false)
        // 電話號碼正則校驗提示
        const validatePhonenumber = (rule: any, value: any, callback: any):void => {
            if (phoneReg.test(value)) {
                callback();
            } else {
                callback(new Error(t('lang.loginConfig.phoneErr')));
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
                {required: true, message: t('lang.loginConfig.phone'), trigger: 'blur'},
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
                {min: 6, max: 12, message: t('lang.loginConfig.phoneNumErr'), trigger: 'blur'},
                {validator: validatePwd, trigger: 'blur'}
            ],
        })
        /**
         * 修改显示类型
         * @param type 显示类型
         */
        const changeShow = (type: number): void => {
            ctx.emit('changeShow', type)
        }
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
            changeShow,

        }
    }

})

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
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
</style>

