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
                          :placeholder="$t('lang.loginConfig.loginNameP3')" v-model="form.name">
                    <template #prefix>
                        <img src="../../../../assets/image/pc/login-email.png" alt="" height="20" width="20"/>
                    </template>
                </el-input>
            </el-form-item>
            <el-form-item class="label" prop='pwd'>
                <el-input maxlength="40" :type="visible ? 'text' : 'password'" autocomplete="off"
                          :placeholder="$t('lang.loginConfig.loginPwdP')"
                          v-model="form.pwd">
                    <template #prefix>
                        <img src="../../../../assets/image/pc/login-password.png" alt="" height="20" width="20"/>
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
                        <template #prefix><img class="iconImg" src="../../../../assets/image/pc/login-code.png" alt="">
                        </template>
                    </el-input>
                </el-form-item>
                <div class="codeArea">
                    <img :src="codeUrl" class="codeBtn" @click="getCode" alt="">
                    <be-icon icon="refresh" class="codeBtnText" color="#C1CCEC"
                              @click="getCode"></be-icon>
                </div>
            </div>
        </el-form>
        <be-button style="width: 100%;" customClass="eagle-btn" type="success" :loading="isLogin" @click="login">
            {{ $t('lang.loginConfig.login') }}
        </be-button>
    </div>
</template>

<script lang="ts">
import {defineComponent, onMounted, ref, reactive, getCurrentInstance, ComponentInternalInstance} from 'vue'
import {loginName} from '../../../../api/login';
import {Base64} from 'js-base64';
import {getStore, trim, setStore, clearStore, setSession} from "../../../../utils/common";
import composition from "../../../../utils/mixin/common-func";

import {useI18n} from "vue-i18n";
import type {ElForm} from 'element-plus'
type FormInstance = InstanceType<typeof ElForm>
import {BeButton,BeIcon} from "../../../../../public/be-ui/be-ui.es.js";
declare type loginType = {
    name: string
    pwd: string
    code: string
}
export default defineComponent({
    name: "NameLogin",
    components:{BeButton,BeIcon},
    setup(props, ctx) {
        const {t} = useI18n()
        const {message, codeUrl, uuid, getCode} = composition(props, ctx)
        const visible = ref<boolean>(false)


        // 校驗規則
        const rules = reactive({
            name: [
                {required: true, message: t('lang.loginConfig.loginNameP'), trigger: 'blur'},
            ],
            pwd: [
                {required: true, message: t('lang.loginConfig.loginPwdP'), trigger: 'blur'},
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
                        product_version:'FREE',

                    }).then((res: any) => {
                        if(!res){return}
                        const langCache = getStore('language')
                        clearStore()
                        langCache && setStore('language', langCache)
                        isLogin.value = false;
                        setStore('userInfo', JSON.stringify({
                            username: res.username
                        }));
                        setStore('token', res.access_token);
                        setStore('userId', res.user_id);
                        setSession('loginExpiredNum','false')
                        !getStore('debugSessionId') && setStore('debugSessionId', (new Date().getTime()).toString());
                        // 登錄先拿路由在跳轉 变为关闭弹窗
                        location.reload()
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
        onMounted(() => {
            getCode();
        })
        return {
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
      margin-bottom: 20px;
    }
  }

  .showIcon {
    position: relative;
    top: -2px;
    display: inline-block;
    height: 16px;
    cursor: pointer;
  }
}

.flex {
  align-items: center;
  justify-content: space-between;
}

.codeArea {
  top: 12px;
  display: flex;
  align-items: center;
  width: 120px;
  margin-bottom: 20px;
  margin-left: 10px;
  text-align: left;

  .codeBtn {
    width: 96px;
    height: 48px;
    cursor: pointer;
  }

  .codeBtnText {
    width: 18px;
    height: 18px;
    margin-left: 5px;
    font-size: 12px;
    font-weight: 400;
    line-height: 43px;
    cursor: pointer;
  }
}
</style>
<!--1080p的145% - 150%放大-->
<style scoped lang="scss">
@media screen and (min-width: 1280px) and (max-height: 638px) and (max-width: 1326px) {



  .formArea {

    .checkArea {
      margin-top: 20px;
    }
  }

}
</style>

