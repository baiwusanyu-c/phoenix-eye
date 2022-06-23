/* * @request-audit.vue * @deprecated * @author czh * @update (czh 2022/6/1) */
<template>
  <teleport to="body">
    <div id="request_audit_dialog">
      <be-dialog
        ref="feedbackDialogInner"
        :titles="$t('lang.requestAudit.title')"
        :is-show="showDialog"
        :is-open-modal="true"
        :is-drag="false"
        layout="center"
        custom-class="request-audit-dialog"
        @close="handleCancel">
        <div>
          <el-form>
            <div class="project-username">
              <el-form-item label="">
                <p>
                  {{ $t('lang.requestAudit.projectName') }}
                  <span class="reg-start">*</span>
                </p>
                <el-select v-model="formData.type">
                  <el-option
                    v-for="item in selectList"
                    :key="item.label"
                    :label="item.label"
                    :value="item.value"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label=" ">
                <p>
                  {{ $t('lang.requestAudit.yourName') }}
                </p>
                <el-input v-model="formData.name"></el-input>
              </el-form-item>
            </div>
            <el-form-item label="">
              <p>
                {{ $t('lang.requestAudit.email') }}
                <span class="reg-start">*</span>
              </p>
              <el-input v-model="formData.email"></el-input>
            </el-form-item>
            <el-form-item label="">
              <p>
                {{ $t('lang.requestAudit.message') }}
              </p>
              <el-input
                v-model="formData.message"
                type="textarea"
                maxlength="200"
                resize="none"
                :rows="6"
                :placeholder="$t('lang.feedback.formContractP')"></el-input>
              <p class="form-item__len">{{ formData.message.length }} / 200</p>
            </el-form-item>
            <el-form-item label="">
              <div>
                <p>
                  {{ $t('lang.requestAudit.verify') }}
                  <span class="reg-start">*</span>
                </p>
                <div style="display: flex">
                  <el-input v-model="formData.code"></el-input>
                  <img
                    :src="codeUrl"
                    alt=""
                    style="height: 42px; margin-left: 16px"
                    @click="getCode(formData)" />
                </div>
              </div>
            </el-form-item>
          </el-form>
        </div>
        <template #footer>
          <span class="dialog-footer">
            <be-button type="success" custom-class="eagle-cancel-btn" @click="handleCancel">
              {{ $t('lang.createProject.createProjectCancel') }}
            </be-button>
            <be-button type="success" custom-class="eagle-btn" @click="submit">{{
              $t('lang.createProject.createProjectConfirm')
            }}</be-button>
          </span>
        </template>
      </be-dialog>
    </div>
  </teleport>
</template>

<script lang="ts">
  import { defineComponent, ref, watch } from 'vue'
  import { useI18n } from 'vue-i18n'
  // @ts-ignore
  import { BeButton, BeDialog } from '@eagle-eye/be-ui'
  import composition from '../utils/mixin/common-func'
  import { getStore, verEmail } from '../utils/common'
  import { createQuote } from '../api/quote'
  import type { IOption } from '../utils/types'
  import type { IQuote } from '../api/quote'
  export default defineComponent({
    name: 'RequestAudit',
    components: {
      BeDialog,
      BeButton,
    },
    setup() {
      const { message, codeUrl, getCode, uuid } = composition()
      const showDialog = ref<boolean>(false)
      const handleClose = (): void => {
        showDialog.value = false
      }
      watch(showDialog, nVal => {
        const userInfo = getStore('userInfo') && JSON.parse(getStore('userInfo')!)
        if (nVal) {
          formData.value = {
            name: '',
            email: userInfo?.username || '',
            type: 1,
            code: '',
            mobile: '',
            message: '',
          }
        }
        getCode()
      })
      /**
       * 校验提示
       */
      const verMsg = (tipStr: string): void => {
        message('warning', tipStr)
      }
      /**
       * 表单校验
       */
      const verifyCodeForm = (): boolean => {
        let tipStr = ''
        if (!formData.value.type) {
          tipStr = t('lang.requestAudit.tipProject')
          verMsg(tipStr)
          return false
        }
        if (!formData.value.email) {
          tipStr = t('lang.requestAudit.tipAccount')
          verMsg(tipStr)
          return false
        }
        if (!verEmail(String(formData.value.email))) {
          tipStr = t('lang.requestAudit.tipErrEmail')
          verMsg(tipStr)
          return false
        }
        if (!formData.value.code) {
          tipStr = t('lang.requestAudit.tipVerCode')
          verMsg(tipStr)
          return false
        }
        return true
      }
      const submit = (): void => {
        if (!verifyCodeForm()) {
          getCode()
          return
        }
        const params: IQuote = {
          name: formData.value.name,
          email: formData.value.email,
          type: formData.value.type,
          mobile: formData.value.mobile,
          message: formData.value.message,
          code: formData.value.code,
          uuid: uuid.value,
        }
        createQuote(params)
          .then((res: any) => {
            if (res.code === 200) {
              message('success', `${t(`lang.operation`)} ${t(`lang.success`)}`)
              handleClose()
            }
          })
          .catch(err => {
            message('warning', err.message)
            getCode()
            console.error(err)
          })
      }
      const userInfo = getStore('userInfo') && JSON.parse(getStore('userInfo')!)

      const formData = ref<IQuote>({
        name: '',
        email: userInfo?.username || '',
        type: 1,
        code: '',
        mobile: '',
        message: '',
      })
      const { t } = useI18n()
      const selectList: IOption = ref([
        { label: t('lang.requestAudit.project1'), value: 1 },
        { label: t('lang.requestAudit.project2'), value: 2 },
        { label: t('lang.requestAudit.project3'), value: 3 },
        { label: t('lang.requestAudit.project4'), value: 4 },
        { label: t('lang.requestAudit.project5'), value: 5 },
      ])
      /**
       * 取消事件
       */
      const handleCancel = (): void => {
        handleClose()
        formData.value = {
          name: '',
          email: userInfo?.username || '',
          type: 1,
          code: '',
          mobile: '',
          message: '',
        }
      }
      return {
        handleCancel,
        codeUrl,
        getCode,
        formData,
        submit,
        selectList,
        showDialog,
        handleClose,
      }
    },
  })
</script>

<style lang="scss">
  #request_audit_dialog .request-audit-dialog {
    width: 527px;
    .el-form-item__label {
      font-family: BarlowSemi-R, sans-serif;
      font-size: 14px;
      font-weight: bold;
      line-height: 40px;
      color: $textColor3;
    }

    .el-input__inner {
      height: 40px;
      line-height: 40px;
      border-radius: 2px;
    }

    .el-textarea__inner {
      border-radius: 2px;
    }
    .feed-back--star {
      position: absolute;
      top: 7px;
      left: -94px;
    }
    .form-item__len {
      text-align: right;
      width: 100%;
      font-size: 12px;
      color: $mainColor14;
    }
    .be-dialog-footer {
      padding: 0 1.25rem 1rem 1.25rem;
    }
    .be-dialog-body {
      height: 280px;
    }
    .project-username {
      display: flex;
      justify-content: center;
    }
  }
  /* 移动端预留 适配 */
  /* @media screen and (max-width: 1280px) {
    #request_audit_dialog .be-dialog {
      display: initial;
      overflow-y: auto;
      .request-audit-dialog {
        top: 10%;
        left: calc(50% - 264px);
        position: relative;
        margin-bottom: 90px;
      }
    }
  }
  @media screen and (min-width: 1280px) and (max-width: 1326px) {
    #request_audit_dialog .be-dialog {
      display: initial;
      overflow-y: auto;
      .request-audit-dialog {
        top: 10%;
        left: calc(50% - 264px);
        position: relative !important;
        margin-bottom: 90px;
      }
    }
  }*/
</style>
