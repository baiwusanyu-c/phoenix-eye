<template>
    <div class="formArea user-registration">
        <el-form :model="form" :rules="rules" ref="registerForm">
            <el-form-item class="label" prop='name'>
                <el-input maxlength="15" autocomplete="off" :placeholder="$t('lang.loginConfig.tname')"
                          v-model="form.name">
                    <!-- onkeyup="this.value=this.value.replace(/[ /_]/g,'')" -->
                    <template #prepend>
                        <img class="iconImg" src="../../../../assets/image/pc/user.png" alt="">
                        <span class="reg-start">*</span>
                    </template>
                </el-input>
            </el-form-item>
            <el-form-item class="label" prop='unit'>
                <el-input maxlength="15" autocomplete="off" :placeholder="$t('lang.loginConfig.unitName')"
                          v-model="form.unit">
                    <!-- onkeyup="this.value=this.value.replace(/[ /_]/g,'')" -->
                    <template #prepend>
                        <img class="iconImg" src="../../../../assets/image/pc/unit.png" alt="">
                    </template>
                </el-input>
            </el-form-item>
            <el-form-item class="label" prop='addr'>
                <el-input maxlength="15" autocomplete="off" :placeholder="$t('lang.loginConfig.addr')"
                          v-model="form.addr">
                    <!-- onkeyup="this.value=this.value.replace(/[ /_]/g,'')" -->
                    <template #prepend><img class="iconImg" src="../../../../assets/image/pc/addr.png" alt="">
                    </template>
                </el-input>
            </el-form-item>
            <el-form-item class="label" prop='email'>
                <el-input maxlength="15" autocomplete="off" :placeholder="$t('lang.loginConfig.email')"
                          v-model="form.email">
                    <!-- onkeyup="this.value=this.value.replace(/[ /_]/g,'')" -->
                    <template #prepend>
                        <img class="iconImg" src="../../../../assets/image/pc/email.png" alt="">
                        <span class="reg-start">*</span>
                    </template>
                </el-input>
            </el-form-item>
            <el-form-item class="label" prop='phoneNumber'>
                <el-input autocomplete="off" :placeholder="$t('lang.loginConfig.phone')" v-model="form.phoneNumber">
                    <template #prepend>
                        <img class="iconImg" src="../../../../assets/image/pc/phone.png" alt="">
                        <span class="reg-start">*</span>
                    </template>
                </el-input>
            </el-form-item>
            <div class="flex">
                <el-form-item class="label" prop='code' style="width: 58%;">
                    <el-input maxlength="6" @keyup.enter.native="getCode()" type="text" autocomplete="off"
                              :placeholder="$t('lang.loginConfig.loginVerCodeP2')" v-model="form.code">
                        <template #prepend>
                            <img class="iconImg" src="../../../../assets/image/pc/code.png" alt="">
                            <span class="reg-start">*</span>
                        </template>
                    </el-input>
                </el-form-item>
                <p class="codeBtn" v-if="!isTip" @click="getCode">{{ $t('lang.loginConfig.getVerCodeValid') }}</p>
                <p class="tips" v-else>{{ number }}</p>
            </div>
        </el-form>
        <el-button class="primary" type="primary" :loading="isLogin" @click="registerSubmit">
            {{ $t('lang.loginConfig.register') }}
        </el-button>
        <p class="flex flex-center checkArea">
            <span class="phone cursor" @click="changeShow(1)">{{ $t('lang.loginConfig.goNameLogin') }}</span>
        </p>
    </div>
</template>

<script lang="ts">
import {defineComponent, ref, reactive, getCurrentInstance, ComponentInternalInstance} from 'vue'
import {trim} from "../../../../utils/common";
import {getRegCode, registerUser} from "../../../../api/login";
import composition from "../../../../utils/mixin/common-func";
import {nameReg, phoneReg, emailReg} from "../../../../utils/reg";
import {useI18n} from "vue-i18n";
import type {ElForm} from 'element-plus'

type FormInstance = InstanceType<typeof ElForm>
declare type registerType = {
    phoneNumber: string
    name: string
    code: string
    uuid: string
    pwd: string
}
export default defineComponent({
    name: "UserRegistration",
    emits: [
        'changeShow',
    ],
    setup(props, ctx) {
        const {t} = useI18n()
        const {message} = composition(props, ctx)
        const validatePhoneNumber = (rule: any, value: any, callback: any): void => {
            if (phoneReg.test(value)) {
                callback();
            } else {
                callback(new Error(t('lang.loginConfig.phoneErr')));
            }
        };
        const validateUserName = (rule: any, value: any, callback: any): void => {
            if (!nameReg.test(value)) {
                callback(new Error(t('lang.loginConfig.tnameErr')));
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
            name: [
                {required: true, message: t('lang.loginConfig.tname'), trigger: 'blur'},
                {validator: validateUserName, trigger: 'blur'}
            ],
            code: [
                {required: true, message: t('lang.loginConfig.loginVerCodeP'), trigger: 'blur'},
            ],
            phoneNumber: [
                {required: true, message: t('lang.loginConfig.phone'), trigger: 'blur'},
                {validator: validatePhoneNumber, trigger: 'blur'}
            ],
            email: [
                {required: false, message: t('lang.loginConfig.email'), trigger: 'blur'},
                {validator: validateEmail, trigger: 'blur'}
            ]
        })
        // 表單對象
        const form = ref<registerType>({
            phoneNumber: '',
            name: '',
            code: '',
            uuid: '',
            pwd: '',
        })

        const isTip = ref<boolean>(false)
        const num = ref<number>(60)
        const refsForm: ComponentInternalInstance | null = getCurrentInstance()
        // 獲取手機驗證碼
        const getCode = (): void => {
            form.value.phoneNumber = trim(form.value.phoneNumber);
            refsForm && (refsForm.refs.registerForm as FormInstance).validateField('phoneNumber', (error: string | undefined) => {
                if (!error) {
                    getRegCode({
                        userName: form.value.phoneNumber
                    }).then((res: any) => {
                        message('success',t('lang.loginConfig.getVerCodeValid') + t('lang.success'));
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
                        message('error', err.message || err)
                        console.error(err)
                    });
                }
            })
        }
        const isLogin = ref<boolean>(false)
        const registerSubmit = (): void => {
            form.value.name = trim(form.value.name);
            form.value.phoneNumber = trim(form.value.phoneNumber);
            form.value.code = trim(form.value.code);
            refsForm && (refsForm.refs.registerForm as FormInstance).validate((valid:boolean | undefined) => {
                if (valid) {
                    isLogin.value = true;
                    registerUser({
                        userName: form.value.name,
                        phonenumber: form.value.phoneNumber,
                        uuid: form.value.uuid,
                        code: form.value.code,
                        password: form.value.pwd,
                        sourceCode: 'fraud_system',
                    }).then(() => {
                        message('success',t('lang.loginConfig.register') + t('lang.success'));
                        changeShow(1)
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
        /**
         * 修改显示类型
         * @param type 显示类型
         */
        const changeShow = (type: number): void => {
            ctx.emit('changeShow', type)
        }
        return {
            changeShow,
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
<style lang='scss' scoped>
.formArea {
    width: 100%;

    .primary {
        width: 100%;
        margin-top: 20px;
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
        background-color: $mainColor3;
        border-radius: 5px;
        opacity: .8;
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
        height: 54px;
        margin-top: 20px;
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
            color: $textColor3;
        }
    }
}

.flex {
    align-items: flex-start;
    justify-content: space-between;
}

.flex-center {
    justify-content: center;
}

</style>
<!--1080p的145% - 150%放大-->
<style lang="scss">
@media screen and (min-width: 1280px) and (max-height: 638px) and (max-width: 1326px) {

    .formArea.user-registration {

        .el-form-item {
            margin-bottom: 20px;

            .el-form-item__content {
                padding: 4px;
            }
        }

        .primary {
            margin-top: 0;
        }
    }
}
</style>