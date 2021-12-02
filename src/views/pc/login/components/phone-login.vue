/*
* @login.vue
* @deprecated 手機登錄表單組件
* @author
* @update (czh 2021/09/9)
*/
<template>
    <div class="formArea">
        <el-form :model="form" :rules="rules" ref="form">
            <el-form-item class="label" prop='phoneNumber'>
                <el-input autocomplete="off" placeholder="请输入手机号" v-model="form.phoneNumber">
                    <template slot="prepend"><img class="iconImg" src="../../../../assets/image/pc/phone.png" alt="">
                    </template>
                </el-input>
            </el-form-item>
            <div class="flex">
                <el-form-item class="label" prop='code' style="width: 58%;">
                    <el-input maxlength="6" @keyup.enter.native="getCode()" type="text" autocomplete="off"
                              placeholder="请输入验证码" v-model="form.code">
                        <template slot="prepend"><img class="iconImg" src="../../../../assets/image/pc/code.png" alt="">
                        </template>
                    </el-input>
                </el-form-item>
                <p class="codeBtn" v-if="!isTip" @click="getCode">获取验证码</p>
                <p class="tips" v-else>{{ number }}重新获取</p>
            </div>
        </el-form>
        <el-button class="primary" type="primary" v-if='!chipId || isSignatured' :loading="isLogin" @click="login">登录
        </el-button>
        <el-tooltip content="未授权，禁止登录" placement="top" effect="light" v-else>
            <el-button class="primary errBtn" type="primary" style="margin-top: 0;height: 35px">立即登录</el-button>
        </el-tooltip>
        <p class="flex flex-center checkArea">
            <span class="cursor" @click="$parent.areaType = 3">新用户注册</span>
        </p>
    </div>
</template>

<script>
import {login} from '@/api/login.js';
import {getInfo} from "../../../../api/login";
import Vue from 'vue'
export default {
    name: "PhoneLogin",
    data() {
        var validatePhonenumber = (rule, value, callback) => {
            if (this.phoneReg.test(value)) {
                callback();
            } else {
                callback(new Error('手机号格式错误'));
            }
        };
        return {
            form: {
                code: '',
                phoneNumber: '',
            },
            isLogin: false,
            rules: {
                code: [
                    {required: true, message: '请输入验证码', trigger: 'blur'},
                ],
                phoneNumber: [
                    {required: true, message: '请输入手机号', trigger: 'blur'},
                    {validator: validatePhonenumber, trigger: 'blur'}
                ]
            },
            isFocus: false,
            isTip: false,
            number: 0
        };
    },
    props: {
        isSignatured: {
            type: Boolean,
            default: false,
        },
        chipId: {
            type: String,
            default: null,
        },
    },
    methods: {
        getCode() {
            this.form.phoneNumber = this.trim(this.form.phoneNumber);
            this.codeInerval = setInterval(() => {
                if (this.number > 0) {
                    this.number--;
                } else {
                    clearInterval(this.codeInerval);
                    this.isTip = false;
                    this.$message.success('获取验证码成功');
                }
            }, 1000)
            /*this.$refs['form'].validateField('phoneNumber', (error) => {
                if (!error) {
                    loginCode({
                        phoneNumber: this.form.phoneNumber
                    }).then(res => {
                        this.$message.success('获取验证码成功');
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
                    }).catch(error => {
                        console.error(error)
                    });
                }
            })*/
        },
        login() {
            this.form.phoneNumber = this.trim(this.form.phoneNumber);
            this.form.code = this.trim(this.form.code);
            this.$refs['form'].validate((valid) => {
                if (valid) {
                    this.isLogin = true;
                    login({
                        phoneNum: this.form.phoneNumber,
                        code: this.form.code,
                        /*login_type: 'mobile_phone_code',
                        uuid: this.form.uuid,
                        client_id: 'fraud_system',
                        client_secret: '123456',
                        grant_type: 'password',
                        scope: 'server',*/
                    }).then(res => {
                       /* window.localStorage.clear();
                        this.isLogin = false;
                        this.setCookie('userInfo', JSON.stringify({
                            username: res.username
                        }));
                        this.setStore('userInfo', JSON.stringify({
                            username: res.username
                        }));
                        this.setCookie('token', res.access_token);
                        this.setStore('token', res.access_token);
                        this.$root.userInfo = {
                            username: res.username
                        };
                        this.$root.token = res.access_token;
                        !this.getStore('debugSessionId') && this.setStore('debugSessionId', new Date().getTime());
                        // 获取用户信息
                        this.getUserInfo(res)*/
                        Vue.prototype.$loginInfo = res.data
                        this.setStore('$loginInfo',JSON.stringify(res.data))
                        this.$router.push('/projectManagement')
                    }).catch(error => {
                        if (error.code && error.code == 920000001) {
                            this.$parent.delTip = true;
                        }
                        this.isLogin = false;
                    });
                } else {
                    return false;
                }
            });
        },
        /**
         * 开启跳转到平台服务协议页面方法
         */
        openServiceArg() {
            window.openWindow('#/serviceArgument', 'serviceArgument')
        },
        /**
         * 获取用户基本信息
         */
        getUserInfo(res) {
            getInfo().then(userInfo => {
                // 用户是否已读更新状态
                this.$root.userNoticeReadStatus = userInfo.userNoticeReadStatus;
                // 用户类型标识，区别版本
                this.$root.versionNoSuger = userInfo.versionType
                this.$root.versionTrialDays = res.versionTrialDays
                this.$root.versionExpiredDay = res.versionExpiredDay
                // 金斗云的一些弹窗控制复位（0 显示 ，1不显示）
                this.setStore('CaseHistoryListJdY', '0')
                this.setStore('investigationJdY', '0')
                // 标识一下是否登录页进入案件分析，
                this.setStore('isFromLogin', 'true')
                this.$router.push({path: '/case'})
            }).catch(err => {
                console.error(err)
            })
        }
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
.formArea {
    width: 100%;
    margin: auto;

    .primary {
        width: 100%;
        margin-top: 5px;
        height: 38px
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

    .codeBtn:hover {
        opacity: 1;
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
        margin-top: 26px;
        font-size: 14px;
        font-weight: 400;
        line-height: 21px;

        .cursor {
            cursor: pointer;
            color:$textColor3;
            &:hover {
                text-decoration: underline;
            }
        }

        .phone {
            color: $lessColor3;
        }

        .reg {
            color: $lessColor3;
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

