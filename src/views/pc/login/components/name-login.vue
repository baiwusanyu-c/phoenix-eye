/*
* @login.vue
* @deprecated 賬號登錄表單組件
* @author
* @update (czh 2021/09/9)
*/
<template>
    <div class="formArea">
        <el-form :model="form" :rules="rules" ref="form">
            <el-form-item class="label" prop='name'>
                <el-input maxlength="40" autocomplete="off"
                          :placeholder="$t('el.loginConfig.loginNameP')" v-model="form.name">
                    <template slot="prepend"><img class="iconImg" src="../../../../assets/image/pc/user.png" alt="">
                    </template>
                </el-input>
            </el-form-item>
            <el-form-item class="label" prop='pwd'>
                <el-input maxlength="40" :type="visible ? 'text' : 'password'" autocomplete="off"
                          :placeholder="$t('el.loginConfig.loginPwdP')"
                          v-model="form.pwd">
                    <template slot="prepend">
                        <img class="iconImg" src="../../../../assets/image/pc/pwd.png" alt="">
                    </template>
                    <template slot="append">
                        <img class="showIcon" v-if="!visible" @click="visible = !visible"
                             src="../../../../assets/image/pc/hide.png" alt="">
                        <img class="showIcon" v-else @click="visible = !visible"
                             src="../../../../assets/image/pc/show.png" alt="">
                    </template>
                </el-input>
            </el-form-item>
            <div class="flex">
                <el-form-item class="label" prop='code' style="width: calc(100% - 130px);">
                    <el-input maxlength="4" @keyup.enter.native="login()" type="text" autocomplete="off"
                              :placeholder="$t('el.loginConfig.loginVerCodeP')" v-model="form.code">
                        <template slot="prepend"><img class="iconImg" src="../../../../assets/image/pc/code.png" alt="">
                        </template>
                    </el-input>
                </el-form-item>
                <div class="por codeArea">
                    <img :src="codeUrl" class="codeBtn" @click="getCode" alt="">
                    <!-- <span class="codeBtnText" @click="getCode">换一换</span> -->
                    <svg-icon iconClass="Addresstracking_reset1" :disabledToolTip="true" class="codeBtnText"
                              @click="getCode"></svg-icon>
                </div>
            </div>
        </el-form>
        <el-button class="primary" type="primary" v-if='!chipId || isSignatured' :loading="isLogin" @click="login">
            {{ $t('el.loginConfig.login') }}
        </el-button>
        <p class=" flex-end checkArea">
         <span class="phone cursor" @click="$parent.areaType = 3">{{ $t('el.loginConfig.titleRegister') }}</span>
            <span class="phone cursor" ></span>
            <span class="reg">
        <!-- <span class="cursor" @click="$parent.areaType = 3">注册</span>-->

          <span class="cursor" @click="$parent.areaType = 4">{{ $t('el.loginConfig.titleReset') }}</span>
        </span>
        </p>
    </div>
</template>

<script>
import {nameLoginUkey, login, getCodeImg, getInfo} from '@/api/login.js';
import {deleteDataBase, getDataBase} from "../../../../utils/index-database";
// import {getPlatforms, getRate} from "../../../../api/common";

export default {
    name: "NameLogin",
    data() {
        var validatePwd = (rule, value, callback) => {
            if (!this.pwdReg.test(value)) {
                callback(new Error(this.$t('el.loginConfig.phoneNumErr')));
            } else {
                callback();
            }
        };
        var validateUserName = (rule, value, callback) => {
            if (!this.nameReg.test(value)) {
                callback(new Error(this.$t('el.loginConfig.unameError')));
            } else {
                callback();
            }
        };
        return {
            form: {
                name: this.name,
                pwd: '',
                code: '',
                uuid: '',
            },
            isLogin: false,
            rules: {
                name: [
                    {required: true, message: this.$t('el.loginConfig.loginNameP'), trigger: 'blur'},
                    // { validator: validateUserName, trigger: 'blur' }
                ],
                pwd: [
                    {required: true, message: this.$t('el.loginConfig.loginPwdP'), trigger: 'blur'},
                    // { validator: validatePwd, trigger: 'blur' }
                ],
                code: [
                    {required: true, message: this.$t('el.loginConfig.loginVerCodeP'), trigger: 'blur'},
                ],
            },
            isFocus: false,
            codeUrl: '',
            visible: false,
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
        name: {
            type: String,
            default: '',
        }
    },
    created() {
        this.getCode();
        this.deleteDataBase()
    },
    methods: {
        /**
         * 获取用户的币种平台信息
         */
        getPlatformInfo(){
           /* getPlatforms().then(res => {
                this.setCookie('platforms', JSON.stringify(res));
                this.setStore('platforms', JSON.stringify(res));
                this.$root.platforms = res;
            }).catch(error => {
                console.log(error)
            });*/
        },
        /**
         * 获取币种汇率信息
         */
        getRateInfo(){
           /* getRate().then(res => {
                this.setCookie('currencyRates', JSON.stringify(res));
                this.setStore('currencyRates', JSON.stringify(res));
                this.$root.currencyRates = res;
            }).catch(error => {
                console.log(error)
            });*/
        },
        deleteDataBase() {
            // let webDataBase = new indexDB()
            // webDataBase.deleteDataBase('xnhb').then(()=>{}).catch(err=>{console.error(err)})
            // webDataBase.deleteDataBase('tsgz-addr').then(()=>{}).catch(err=>{console.error(err)})
            // 獲取開啓的數據庫實例
            const dataBase = getDataBase('xnhb')
            if (dataBase) {
                dataBase.dbInstance.close()
                deleteDataBase('xnhb').then(() => {
                }).catch(err => {
                    console.error(err)
                })
            }
        },
        /**
         * 获取登录验证码
         */
        getCode() {
            getCodeImg().then(res => {
                this.form.uuid = res.uuid;
                this.codeUrl = "data:image/gif;base64," + res.img;
            });
        },
        /**
         * 登录方法
         */
        login() {
            this.form.name = this.trim(this.form.name);
            this.form.code = this.trim(this.form.code);
            this.$refs['form'].validate((valid) => {
                if (valid) {
                    this.isLogin = true;
                    this.$router.push({path: '/case'})
                   // if (this.chipId) {
                    // 付费版全部都走登录接口，ukey检查、版本降级校验放在后台
                        // login({
                        //     login_type: 'u_key',
                        //     username: this.form.name,
                        //     password: Base64.encode(this.form.pwd),
                        //     code: this.form.code,
                        //     key_id: this.chipId,
                        //     uuid: this.form.uuid,
                        //     client_id: 'fraud_system',
                        //     client_secret: '123456',
                        //     grant_type: 'password',
                        //     scope: 'server',
                        // }).then(res => {
                        //     window.localStorage.clear();
                        //     // 由于使用了localStorage 存储汇率和平台，导致在App中接口获取
                        //     // 与这里localStorage.clear() 异步，会使得接口先存数据，后被清空
                        //     this.getPlatformInfo()
                        //     this.getRateInfo()
                        //     this.isLogin = false;
                        //     this.setCookie('userInfo', JSON.stringify({
                        //         username: res.username
                        //     }));
                        //     this.setStore('userInfo', JSON.stringify({
                        //         username: res.username
                        //     }));
                        //     this.setCookie('token', res.access_token);
                        //     this.setStore('token', res.access_token);
                        //     this.$root.userInfo = {
                        //         username: res.username
                        //     };
                        //     this.$root.token = res.access_token;
                        //     !this.getStore('debugSessionId') && this.setStore('debugSessionId', new Date().getTime());
                        //     // 获取用户信息
                        //     this.getUserInfo(res)
                        // }).catch(error => {
                        //     if (error.code && error.code == 920000001) {
                        //         this.$parent.delTip = true;
                        //     }
                        //     this.getCode();
                        //     this.isLogin = false;
                        // });
                  //  } else {
                      /*  this.$message({
                            message: '请插入加密锁',
                            type: 'error',
                            showClose: true,
                            duration: 2 * 1000
                        })
                        this.isLogin = false;*/
                      /*   nameLoginUkey({
                           login_type: 'password',
                           username: this.form.name,
                           password: Base64.encode(this.form.pwd),
                           code: this.form.code,
                           uuid: this.form.uuid,
                           client_id: 'fraud_system',
                           client_secret: '123456',
                           grant_type: 'password',
                           scope: 'server',
                         })
                             .then(res => {
                           console.log(res)
                           window.localStorage.clear();
                             // 由于使用了localStorage 存储汇率和平台，导致在App中接口获取
                             // 与这里localStorage.clear() 异步，会使得接口先存数据，后被清空
                             this.getPlatformInfo()
                             this.getRateInfo()
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
                             this.getUserInfo(res)
                         }).catch(error => {
                           console.log(error)
                           this.getCode();
                           this.isLogin = false;
                         });*/
                   // }
                } else {
                    return false;
                }
            });
        },
        /**
         * 开启跳转到平台服务协议页面方法
         */
        openServiceArg(){
            window.openWindow('#/serviceArgument','serviceArgument')
        },
        /**
         * 获取用户基本信息
         */
        getUserInfo(res){
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

    .checkArea {
        margin-top: 26px;
        font-size: 14px;
        font-weight: 400;
        line-height: 21px;

        .cursor {
            cursor: pointer;

            &:hover {
                text-decoration: underline;
            }
        }

        .phone {
            color: $lessColor3;
        }

        .reg {
            color: $lessColor3;

            span:first-child {
                margin-right: 10px;
            }
        }
    }
}

.flex {
    justify-content: space-between;
    align-items: center;
}

.flex-center {
    display: flex;
    justify-content: center;
}
.flex-end {
    display: flex;
 /*   justify-content: flex-end;*/
    justify-content: space-between;
}
.codeArea {
    width: 120px;
    text-align: left;
    top: -11px;
    margin-left: 10px;

    .codeBtn {
        width: 95px;
        height: 38px;
        cursor: pointer;
    }

    .codeBtnText {
        width: 18px;
        height: 18px;
        font-size: 12px;
        line-height: 43px;
        font-weight: 400;
        color: #C1CCEC;
        cursor: pointer;
        margin-left: 5px;
    }
}
</style>
<!--1080p的145% - 150%放大-->
<style scoped lang="scss">
@media screen and (min-width: 1280px) and (max-height: 638px) and (max-width: 1326px)  {
    .flex-center {
        justify-content: center;
    }
    .flex-end {
        justify-content: flex-end;
    }
    .formArea {
        .checkArea {
            margin-top: 20px;
        }
    }

}
</style>

