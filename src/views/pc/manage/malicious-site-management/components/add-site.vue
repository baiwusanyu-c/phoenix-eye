/* * @add-site.vue * @deprecated * @author czh * @update (czh 2022/5/7) */
<template>
  <div id="create_site">
    <be-dialog
      ref="loginDialogInner"
      :titles="$t('lang.siteManage.form.title')"
      :is-show="showDialog"
      :is-open-modal="true"
      :is-drag="false"
      layout="center"
      custom-class="create-dialog"
      @close="handleClose">
      <div>
        <el-form ref="siteForm" :model="form" label-width="120px" label-position="top">
          <el-form-item :label="$t('lang.siteManage.form.url')" prop="url">
            <el-input
              v-model="form.risk_url_list"
              type="textarea"
              resize="none"
              maxlength="1000"
              :autosize="{ minRows: 10, maxRows: 15 }"
              :placeholder="$t('lang.siteManage.form.inputP')" />
          </el-form-item>
          <el-form-item :label="$t('lang.siteManage.form.tag')" prop="type">
            <el-radio-group v-model="form.tag">
              <el-radio label="Phishing">Phishing</el-radio>
              <el-radio label="SCAM">SCAM</el-radio>
              <el-radio label="RugPull">RugPull</el-radio>
              <el-radio label="Other">Other</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <be-button type="success" custom-class="eagle-cancel-btn" @click="handleClose">
            {{ $t('lang.createProject.createProjectCancel') }}
          </be-button>
          <be-button type="success" custom-class="eagle-btn" @click="handleConfirm">{{
            $t('lang.createProject.createProjectConfirm')
          }}</be-button>
        </span>
      </template>
    </be-dialog>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, watch } from 'vue'
  import { useI18n } from 'vue-i18n'
  // @ts-ignore
  import { BeButton, BeDialog } from '@eagle-eye/be-ui'
  import composition from '../../../../../utils/mixin/common-func'
  import { addRiskUrl } from '../../../../../api/malicious-site'
  import type { IRiskUrl } from '../../../../../api/malicious-site'
  export default defineComponent({
    name: 'AddSite',
    components: { BeDialog, BeButton },
    props: {
      getList: {
        type: Function,
        default: () => {
          return Function
        },
      },
    },
    setup(props) {
      const { message } = composition()
      const showDialog = ref<boolean>(false)
      const labelPosition = ref<string>('right')
      const form = ref<IRiskUrl>({
        risk_url_list: '',
        tag: '',
      })
      watch(showDialog, nVal => {
        if (!nVal) {
          // 重置表單
          resetVar()
        }
      })
      /**
       * 关闭弹窗
       */
      const handleClose = (): void => {
        showDialog.value = false
        resetVar()
      }
      /**
       * 重置表单
       */
      const resetVar = (): void => {
        form.value = {
          risk_url_list: '',
          tag: '',
        }
      }

      /**
       * 处理提交确认
       */
      const handleConfirm = (): void => {
        createAddrMonitor()
      }
      const { t } = useI18n()
      /**
       * 表单校验
       */
      const formVerification = (): boolean => {
        if (!form.value.risk_url_list) {
          const msg = `${t('lang.pleaseInput')} ${t('lang.siteManage.form.url')}`
          message('warning', msg)
          return false
        }
        if (!form.value.tag) {
          const msg = `${t('lang.pleaseInput')} ${t('lang.siteManage.form.tag')}`
          message('warning', msg)
          return false
        }
        return true
      }
      /**
       * 新建
       */
      const createAddrMonitor = () => {
        // 校验表单
        if (!formVerification()) {
          return
        }
        const params = {
          risk_url_list: (form.value.risk_url_list as string).split(';'),
          tag: form.value.tag,
        }
        addRiskUrl(params)
          .then((res: any) => {
            if (!res) {
              return
            }
            if (res && res.success) {
              message('success', `${t('lang.add')} ${t('lang.success')}`)
              // 更新列表
              props.getList('reset')
              handleClose()
            } else {
              message('warning', res.message || res)
            }
          })
          .catch(err => {
            message('error', err.message || err)
            console.error(err)
          })
      }

      return {
        handleConfirm,
        form,
        labelPosition,
        handleClose,
        showDialog,
      }
    },
  })
</script>

<style lang="scss">
  #create_site .create-dialog {
    width: 527px;

    .el-form-item__label {
      font-family: 'Barlow', sans-serif;
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

    .form--link {
      display: flex;
      align-items: center;
      width: 100%;

      .be-icon-container {
        margin-right: 6px;
      }

      .be-popover--trigger {
        height: 40px;
        line-height: 46px;
      }
    }
    .feed-back--star {
      position: absolute;
      top: 7px;
      left: -134px;
    }
  }

  .addr-monitor--link {
    .be-popover {
      background-color: $textColor11;

      .be-popover--body {
        color: $mainColor7;
      }
    }
  }
</style>
