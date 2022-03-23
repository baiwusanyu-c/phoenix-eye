<template>
  <div class="formArea">
    <el-form ref="resetPwdForm" :model="form" :rules="rules">
      <el-form-item class="label" prop="name">
        <el-input
          v-model="form.name"
          autocomplete="off"
          :placeholder="$t('lang.loginConfig.loginNameP')">
          <template #prefix>
            <img alt="" src="../../../../assets/image/pc/login-email.png" height="20" width="20" />
          </template>
        </el-input>
      </el-form-item>
      <el-form-item class="label" prop="code" style="width: 58%">
        <div class="send-code">
          <el-input
            v-model="form.code"
            :placeholder="`${$t('lang.loginConfig.loginVerCodeP')}`"
            class="send-code-input">
            <template #prefix>
              <img alt="" src="../../../../assets/image/pc/login-code.png" height="20" width="20" />
            </template>
          </el-input>
          <el-button v-if="!isTip" class="send-button" @click="getCode">{{
            $t('lang.loginConfig.send')
          }}</el-button>
          <el-button v-else class="send-button">{{ num }}s</el-button>
        </div>
      </el-form-item>
      <el-form-item class="label" prop="newPwd">
        <el-input
          v-model="form.newPwd"
          maxlength="12"
          :type="visible ? 'text' : 'password'"
          autocomplete="off"
          :placeholder="$t('lang.loginConfig.newPassword')"
          @keyup.enter="form.newPwd = form.newPwd.replace(/[ ]/g, '')">
          <template #prefix>
            <img
              alt=""
              src="../../../../assets/image/pc/login-password.png"
              height="20"
              width="20" />
          </template>
          <template #suffix>
            <img
              v-if="!visible"
              class="showIcon"
              src="../../../../assets/image/pc/hide.png"
              alt=""
              @click="visible = !visible" />
            <img
              v-else
              class="showIcon"
              src="../../../../assets/image/pc/show.png"
              alt=""
              @click="visible = !visible" />
          </template>
        </el-input>
      </el-form-item>
      <el-form-item class="label" prop="password">
        <el-input
          v-model="form.password"
          maxlength="12"
          :type="visibleAgain ? 'text' : 'password'"
          autocomplete="off"
          :placeholder="$t('lang.loginConfig.confirmPassword')"
          @keyup.enter="form.password = form.password.replace(/[ ]/g, '')">
          <template #prefix>
            <img
              alt=""
              src="../../../../assets/image/pc/login-password.png"
              height="20"
              width="20" />
          </template>
          <template #suffix>
            <img
              v-if="!visibleAgain"
              class="showIcon"
              src="../../../../assets/image/pc/hide.png"
              alt=""
              @click="visibleAgain = !visibleAgain" />
            <img
              v-else
              class="showIcon"
              src="../../../../assets/image/pc/show.png"
              alt=""
              @click="visibleAgain = !visibleAgain" />
          </template>
        </el-input>
      </el-form-item>
    </el-form>
    <be-button style="width: 100%" custom-class="eagle-btn" type="success" @click="resetPwd">
      {{ $t('lang.loginConfig.confirmReset') }}
    </be-button>
  </div>
</template>

<script lang="ts">
  import { forgetPasswordApi, verifyCodePassword } from '../../../../api/login'
  import {
    defineComponent,
    ref,
    reactive,
    getCurrentInstance,
    ComponentInternalInstance,
  } from 'vue'
  import { pwdReg, emailReg } from '../../../../utils/reg'
  import { useI18n } from 'vue-i18n'
  import composition from '../../../../utils/mixin/common-func'
  import { trim } from '../../../../utils/common'
  import type { ElForm } from 'element-plus'
  import { BeButton } from '../../../../../public/be-ui/be-ui.es'
  import { Base64 } from 'js-base64'
  type FormInstance = InstanceType<typeof ElForm>
  declare type resetPwdType = {
    name: string
    password: string
    code: string
    newPwd: string
  }
  export default defineComponent({
    name: 'ResetPassword',
    components: { BeButton },
    emits: ['resetSuccess'],
    setup(props, ctx) {
      const { t } = useI18n()
      const { message } = composition()
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
        form.value.name = trim(form.value.name)
        refsForm &&
          (refsForm.refs.resetPwdForm as FormInstance).validateField(
            'name',
            (error: string | undefined) => {
              if (!error) {
                verifyCodePassword({
                  userName: form.value.name,
                })
                  .then((res: any) => {
                    if (!res) {
                      return
                    }
                    message('success', t('lang.loginConfig.getVerCodeValid') + t('lang.success'))
                    isTip.value = true
                    num.value = 60
                    let codeInerval = setInterval(() => {
                      if (num.value > 0) {
                        num.value--
                      } else {
                        clearInterval(codeInerval)
                        isTip.value = false
                      }
                    }, 1000)
                  })
                  .catch(err => {
                    message('error', err.message || err)
                    console.error(err)
                  })
              }
            }
          )
      }
      // 重置密碼
      const isLogin = ref<boolean>(false)
      const resetPwd = (): void => {
        form.value.name = trim(form.value.name)
        form.value.code = trim(form.value.code)
        refsForm &&
          (refsForm.refs.resetPwdForm as FormInstance).validate((valid: boolean | undefined) => {
            if (valid) {
              isLogin.value = true
              forgetPasswordApi({
                account: form.value.name,
                password: Base64.encode(form.value.password),
                re_password: Base64.encode(form.value.password),
                verification_code: form.value.code,
              })
                .then(res => {
                  if (!res) {
                    return
                  }
                  ctx.emit('resetSuccess')
                })
                .catch(err => {
                  message('error', err.message || err)
                  console.error(err)
                  isLogin.value = false
                })
            } else {
              return false
            }
          })
      }
      const visible = ref<boolean>(false)
      const visibleAgain = ref<boolean>(false)

      const validateEmail = (rule: any, value: any, callback: any): void => {
        if (emailReg.test(value)) {
          callback()
        } else {
          callback(new Error(t('lang.loginConfig.emailErr')))
        }
      }
      // 密碼正則校驗提示
      const validateNewPwd = (rule: any, value: any, callback: any): void => {
        if (!pwdReg.test(value)) {
          callback(new Error(t('lang.loginConfig.phoneNumErr')))
        } else {
          callback()
        }
      }
      const validatePwd = (rule: any, value: any, callback: any): void => {
        if (!pwdReg.test(value)) {
          callback(new Error(t('lang.loginConfig.phoneNumErr')))
        } else {
          if (form.value.newPwd === form.value.password) {
            callback()
          } else {
            callback(new Error(t('lang.loginConfig.passwordAgreement')))
          }
        }
      }
      // 校驗規則
      const rules = reactive({
        name: [
          { required: true, message: t('lang.loginConfig.email'), trigger: 'blur' },
          { validator: validateEmail, trigger: 'blur' },
        ],
        code: [{ required: true, message: t('lang.loginConfig.loginVerCodeP2'), trigger: 'blur' }],
        newPwd: [
          { required: true, message: t('lang.loginConfig.newPassword'), trigger: 'blur' },
          { min: 6, max: 12, message: t('lang.loginConfig.phoneNumErr'), trigger: 'blur' },
          { validator: validateNewPwd, trigger: 'blur' },
        ],
        password: [
          { required: true, message: t('lang.loginConfig.confirmPassword'), trigger: 'blur' },
          { min: 6, max: 12, message: t('lang.loginConfig.phoneNumErr'), trigger: 'blur' },
          { validator: validatePwd, trigger: 'blur' },
        ],
      })
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
    },
  })
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .showIcon {
    position: relative;
    top: -2px;
    display: inline-block;
    width: 16px;
    height: 16px;
    cursor: pointer;
  }

  .send-code {
    display: flex;
    justify-content: space-between;

    .send-button {
      width: 144px;
      height: 48px;
      color: #1cd2a9;
      background: rgba(133, 229, 191, .1);
      border-color: rgba(133, 229, 191, .1);
      border-radius: 2px;
    }

    .send-button:hover {
      border-color: #1cd2a9;
    }

    .send-code-input {
      width: 256px;
      padding-right: 16px;
    }
  }
</style>
