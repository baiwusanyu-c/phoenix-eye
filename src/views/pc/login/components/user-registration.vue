<template>
    <div class="formArea user-registration">
        <el-form :model="form" :rules="rules" ref="form">
            <el-form-item class="label" prop='name'>
                <el-input maxlength="15" autocomplete="off" :placeholder="$t('el.loginConfig.tname')" v-model="form.name">
                    <!-- onkeyup="this.value=this.value.replace(/[ /_]/g,'')" -->
                    <template slot="prepend">
                        <img class="iconImg" src="../../../../assets/image/pc/user.png" alt="">
                        <span class="reg-start">*</span>
                    </template>
                </el-input>
            </el-form-item>
            <el-form-item class="label" prop='unit'>
                <el-input maxlength="15" autocomplete="off" :placeholder="$t('el.loginConfig.unitName')" v-model="form.unit">
                    <!-- onkeyup="this.value=this.value.replace(/[ /_]/g,'')" -->
                    <template slot="prepend">
                        <img class="iconImg" src="../../../../assets/image/pc/unit.png" alt="">
                    </template>
                </el-input>
            </el-form-item>
            <el-form-item class="label" prop='addr'>
                <el-input maxlength="15" autocomplete="off" :placeholder="$t('el.loginConfig.addr')" v-model="form.addr">
                    <!-- onkeyup="this.value=this.value.replace(/[ /_]/g,'')" -->
                    <template slot="prepend"><img class="iconImg" src="../../../../assets/image/pc/addr.png" alt="">
                    </template>
                </el-input>
            </el-form-item>
            <el-form-item class="label" prop='email'>
                <el-input maxlength="15" autocomplete="off" :placeholder="$t('el.loginConfig.email')" v-model="form.email">
                    <!-- onkeyup="this.value=this.value.replace(/[ /_]/g,'')" -->
                    <template slot="prepend"><img class="iconImg" src="../../../../assets/image/pc/email.png" alt="">
                    </template>
                </el-input>
            </el-form-item>
            <el-form-item class="label" prop='phoneNumber'>
                <el-input autocomplete="off" :placeholder="$t('el.loginConfig.phone')" v-model="form.phoneNumber">
                    <template slot="prepend">
                        <img class="iconImg" src="../../../../assets/image/pc/phone.png" alt="">
                        <span class="reg-start">*</span>
                    </template>
                </el-input>
            </el-form-item>
            <div class="flex">
                <el-form-item class="label" prop='code' style="width: 58%;">
                    <el-input maxlength="6" @keyup.enter.native="getCode()" type="text" autocomplete="off"
                              :placeholder="$t('el.loginConfig.loginVerCodeP2')" v-model="form.code">
                        <template slot="prepend">
                            <img class="iconImg" src="../../../../assets/image/pc/code.png" alt="">
                            <span class="reg-start">*</span>
                        </template>
                    </el-input>
                </el-form-item>
                <p class="codeBtn" v-if="!isTip" @click="getCode">{{ $t('el.loginConfig.getVerCodeValid') }}</p>
                <p class="tips" v-else>{{ number }}</p>
            </div>
        </el-form>
        <el-button class="primary" type="primary" :loading="isLogin" @click="registerUser">{{ $t('el.loginConfig.register') }}</el-button>
        <p class="flex flex-center checkArea">
            <span class="phone cursor" @click="$parent.areaType = 1;">{{ $t('el.loginConfig.goNameLogin') }}</span>
        </p>
    </div>
</template>

<script>
import {registerUser, getRegCode} from '@/api/login.js';

export default {
    name: "UserRegistration",
    data() {
        var validatePhonenumber = (rule, value, callback) => {
            if (this.phoneReg.test(value)) {
                callback();
            } else {
                callback(new Error(this.$t('el.loginConfig.phoneErr')));
            }
        };
        var validateUserName = (rule, value, callback) => {
            if (!this.nameReg.test(value)) {
                callback(new Error(this.$t('el.loginConfig.tnameErr')));
            } else {
                callback();
            }
        };
        var validateEmail = (rule, value, callback) => {
            if (!this.emailReg.test(value)) {
                callback(new Error(this.$t('el.loginConfig.emailErr')));
            } else {
                callback();
            }
        };
        return {
            form: {
                name: '',
                code: '',
                phoneNumber: '',
            },
            isLogin: false,
            rules: {
                name: [
                    {required: true, message: this.$t('el.loginConfig.tname'), trigger: 'blur'},
                    {validator: validateUserName, trigger: 'blur'}
                ],
                code: [
                    {required: true, message: this.$t('el.loginConfig.loginVerCodeP'), trigger: 'blur'},
                ],
                phoneNumber: [
                    {required: true, message: this.$t('el.loginConfig.phone'), trigger: 'blur'},
                    {validator: validatePhonenumber, trigger: 'blur'}
                ],
                email: [
                    {required: false, message: this.$t('el.loginConfig.email'), trigger: 'blur'},
                    {validator: validateEmail, trigger: 'blur'}
                ]
            },
            isFocus: false,
            isTip: false,
            number: 0,
            visible: false,
            visibleAgain: false
        };
    },
    methods: {
        getCode() {
            this.form.phoneNumber = this.trim(this.form.phoneNumber);
            this.$refs['form'].validateField('phoneNumber', (error) => {
                if (!error) {
                    getRegCode({
                        userName: this.form.phoneNumber
                    }).then(res => {
                        this.$message.success(this.$t('el.loginConfig.getVerCodeValid') + this.$t('el.success'));
                        this.form.uuid = res;
                        this.isTip = true;
                        this.number = 60;
                        this.codeInerval = setInterval(() => {
                            if (this.number > 0) {
                                this.number--;
                            } else {
                                clearInterval(this.codeInerval);
                                this.isTip = false;
                            }
                        }, 1000)
                    }).catch((err) => {
                        this.$message.error(err)
                        console.error(err)
                    });
                }
            })
        },
        registerUser() {
            this.form.name = this.trim(this.form.name);
            this.form.phoneNumber = this.trim(this.form.phoneNumber);
            this.form.code = this.trim(this.form.code);
            this.$refs['form'].validate((valid) => {
                if (valid) {
                    this.isLogin = true;
                    registerUser({
                        userName: this.form.name,
                        phonenumber: this.form.phoneNumber,
                        uuid: this.form.uuid,
                        code: this.form.code,
                        password: this.form.pwd,
                        sourceCode: 'fraud_system',
                    }).then(() => {
                        this.$message.success(this.$t('el.loginConfig.register') + this.$t('el.success'));
                        this.$parent.areaType = 1;
                    }).catch(error => {
                        this.$message.error(err)
                        console.error(error)
                        this.isLogin = false;
                    });
                } else {
                    return false;
                }
            });
        }
    },
};
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
        height: 16px;
        position: relative;
        top: -2px;
        display: inline-block;
        cursor: pointer;
    }

    .errBtn {
        cursor: not-allowed;
    }

    .codeBtn {
        width: 34%;
        font-size: 14px;
        line-height: 38px;
        height: 38px;
        text-align: center;
        color: #fff;
        cursor: pointer;
        background-color: $mainColor3;
        opacity: 0.8;
        border-radius: 5px;
    }

    .tips {
        line-height: 37px;
        color: #76838F;
        font-size: 14px;
        width: 110px;
        height: 37px;
        border-radius: 5px;
        background-color: #F2F4F5;
        text-align: center;
    }

    .checkArea {
        margin-top: 20px;
        font-size: 14px;
        font-weight: 400;
        line-height: 21px;
        text-align: right;
        height: 54px;

        .cursor {
            cursor: pointer;

            &:hover {
                text-decoration: underline;
            }
        }

        .phone {
            color:$textColor3;
        }
    }
}

.flex {
    justify-content: space-between;
    align-items: flex-start;
}
.flex-center {
    justify-content: center;
}

</style>
<!--1080p的145% - 150%放大-->
<style lang="scss">
@media screen and (min-width: 1280px) and (max-height: 638px) and (max-width: 1326px) {
    .formArea.user-registration {
        .el-form-item{
            margin-bottom: 20px;
            .el-form-item__content{
                padding: 4px;
            }
        }
        .primary{
            margin-top: 0;
        }
    }
}
</style>