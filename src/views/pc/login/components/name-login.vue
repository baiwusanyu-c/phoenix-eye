/*
* @login.vue
* @deprecated 賬號登錄表單組件
* @author
* @update (czh 2021/09/9)
*/
<template>
    <div class="formArea">
        <el-form :model="form" :rules="rules" ref="loginForm" class="login-form">
            <el-form-item class="label" prop='name'>
                <el-input :maxlength="40" autocomplete="off"
                          :placeholder="$t('lang.loginConfig.loginNameP2')" v-model="form.name">
                    <template #prepend><img class="iconImg" src="../../../../assets/image/pc/user.png" alt="">
                    </template>
                </el-input>
            </el-form-item>
            <el-form-item class="label" prop='pwd'>
                <el-input maxlength="40" :type="visible ? 'text' : 'password'" autocomplete="off"
                          :placeholder="$t('lang.loginConfig.loginPwdP')"
                          v-model="form.pwd">
                    <template #prepend>
                        <img class="iconImg" src="../../../../assets/image/pc/pwd.png" alt="">
                    </template>
                    <template #append>
                        <img class="iconImg showIcon" v-if="!visible" @click="visible = !visible"
                             src="../../../../assets/image/pc/hide.png" alt="">
                        <img class=" iconImg showIcon" v-else @click="visible = !visible"
                             src="../../../../assets/image/pc/show.png" alt="">
                    </template>
                </el-input>
            </el-form-item>
            <div class="flex">
                <el-form-item class="label" prop='code' style="width: calc(100% - 130px);">
                    <el-input maxlength="4" @keyup.enter.native="login()" type="text" autocomplete="off"
                              :placeholder="$t('lang.loginConfig.loginVerCodeP2')" v-model="form.code">
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
        <be-button class="primary" type="primary" :loading="isLogin" @click="login">
            {{ $t('lang.loginConfig.login') }}
        </be-button>
        <p class=" flex-end checkArea">
            <span class="phone cursor" @click="changeShow(3)">{{ $t('lang.loginConfig.titleRegister') }}</span>
            <span class="phone cursor"></span>
            <span class="reg">
        <!-- <span class="cursor" @click="$parent.areaType = 3">注册</span>-->

          <span class="cursor" @click="changeShow(4)">{{ $t('lang.loginConfig.titleReset') }}</span>
        </span>
        </p>
    </div>
</template>

<script lang="ts">
import {defineComponent, onMounted, ref, reactive, getCurrentInstance, ComponentInternalInstance} from 'vue'
import {loginName, IRouterParams} from '../../../../api/login';
import {Base64} from 'js-base64';
import {getStore, trim, setStore} from "../../../../utils/common";
import {getRouterInfo} from "../../../../api/login";
import {initRouterConfig} from "../../../../router/router-pc";
import {RouteRecordRaw} from 'vue-router'
import {useStore} from "vuex";
import composition from "../../../../utils/mixin/common-func";
import {nameReg, pwdReg} from "../../../../utils/reg";
import {useI18n} from "vue-i18n";
import type {ElForm} from 'element-plus'
type FormInstance = InstanceType<typeof ElForm>
import {BeButton} from "../../../../../public/be-ui/be-ui.es.js";
declare type loginType = {
    name: string
    pwd: string
    code: string
}
export default defineComponent({
    name: "NameLogin",
    emits: [
        'changeShow',
    ],
    components:{BeButton},
    setup(props, ctx) {
        const {t} = useI18n()
        const {message, codeUrl, uuid, getCode, router, routerPush} = composition(props, ctx)
        const visible = ref<boolean>(false)
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
        // 表單對象
        const form = ref<loginType>({name: '', pwd: '', code: ''})

        /**
         * 登录方法
         */
        const isLogin = ref<boolean>(false)
        const refsForm: ComponentInternalInstance | null = getCurrentInstance()
        const login = (): void => {
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
                        // 登錄先拿路由在跳轉
                        getRouter()
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
        // 获取路由
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
        }
        /**
         * 修改显示类型
         * @param type 显示类型
         */
        const changeShow = (type: number): void => {
            ctx.emit('changeShow', type)
        }
        onMounted(() => {
            getCode();
        })
        return {
            changeShow,
            getCode,
            codeUrl,
            form,
            visible,
            login,
            isLogin,
            rules
        }
    }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>

.formArea {
    width: 100%;
    margin: auto;

    .login-form {

        .el-form-item {
            margin-bottom: 30px;
        }
    }

    .primary {
        width: 100%;
        height: 38px;
        margin-top: 5px
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
    align-items: center;
    justify-content: space-between;
}

.flex-center {
    display: flex;
    justify-content: center;
}

.flex-end {
    display: flex;

    /*   justify-content: flex-end; */
    justify-content: space-between;
}

.codeArea {
    top: 6px;
    width: 120px;
    margin-left: 10px;
    text-align: left;

    .codeBtn {
        width: 95px;
        height: 38px;
        cursor: pointer;
    }

    .codeBtnText {
        width: 18px;
        height: 18px;
        margin-left: 5px;
        font-size: 12px;
        font-weight: 400;
        line-height: 43px;
        color: #C1CCEC;
        cursor: pointer;
    }
}
</style>
<!--1080p的145% - 150%放大-->
<style scoped lang="scss">
@media screen and (min-width: 1280px) and (max-height: 638px) and (max-width: 1326px) {

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

