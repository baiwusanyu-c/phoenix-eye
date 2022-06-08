/* * @feed-back.vue * @deprecated 需求反饋彈窗 * @author czh * @update (czh 2022/3/28) */
<template>
  <teleport to="body">
    <div id="feed_back_dialog">
      <be-dialog
        ref="feedbackDialogInner"
        :titles="$t('lang.feedback.title')"
        :is-show="showDialog"
        :is-open-modal="true"
        :is-drag="false"
        layout="center"
        custom-class="feed-back-dialog"
        @close="handleCancel">
        <div>
          <el-form :label-position="labelPosition" label-width="80px">
            <el-form-item :label="$t('lang.feedback.formTitle') + ':'">
              <span class="reg-start feed-back--star">*</span>
              <el-input v-model="form.title" maxlength="100"></el-input>
              <p class="form-item__len">{{ form.title.length }} / 50</p>
            </el-form-item>
            <el-form-item :label="$t('lang.feedback.formContent') + ':'">
              <span class="reg-start feed-back--star">*</span>
              <el-input
                v-model="form.content"
                type="textarea"
                resize="none"
                maxlength="200"
                :rows="7"
                :placeholder="$t('lang.feedback.formContractP')"></el-input>
              <p class="form-item__len">{{ form.content.length }} / 200</p>
            </el-form-item>
          </el-form>
        </div>
        <template #footer>
          <span class="dialog-footer">
            <be-button type="success" custom-class="eagle-cancel-btn" @click="handleCancel">
              {{ $t('lang.createProject.createProjectCancel') }}
            </be-button>
            <be-button type="success" custom-class="eagle-btn" @click="handleConfirm">{{
              $t('lang.createProject.createProjectConfirm')
            }}</be-button>
          </span>
        </template>
      </be-dialog>
    </div>
  </teleport>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue'
  import { useI18n } from 'vue-i18n'
  // @ts-ignore
  import { BeButton, BeDialog } from '../../public/be-ui/be-ui.es'
  import { createFeedBack } from '../api/feed-back'
  import composition from '../utils/mixin/common-func'
  import type { IFeedBack } from '../api/feed-back'
  export default defineComponent({
    name: 'FeedBack',
    components: {
      BeDialog,
      BeButton,
    },
    setup() {
      const { message } = composition()
      const { t } = useI18n()
      /**
       * 關閉方法
       */
      const handleClose = (): void => {
        showDialog.value = false
      }
      /**
       * 取消事件
       */
      const handleCancel = (): void => {
        handleClose()
        form.value = {
          title: '',
          content: '',
        }
      }
      /**
       * 表单校验
       */
      const formVerification = (): boolean => {
        if (!form.value.title) {
          const msg = `${t('lang.pleaseInput')} ${t('lang.feedback.formTitle')}`
          message('warning', msg)
          return false
        }
        if (!form.value.content) {
          const msg = `${t('lang.pleaseInput')} ${t('lang.feedback.formContent')}`
          message('warning', msg)
          return false
        }
        return true
      }
      /**
       * 反饋提交
       */
      const handleConfirm = (): void => {
        // 校验表单
        if (!formVerification()) {
          return
        }
        createFeedBack(form.value)
          .then((res: any) => {
            if (res.success === true) {
              const msg = `${t('lang.operation')} ${t('lang.success')}`
              message('success', msg)
            }
            handleCancel()
          })
          .catch(err => {
            message('error', err.message || err)
            console.error(err)
            handleCancel()
          })
      }
      const showDialog = ref<boolean>(false)
      const labelPosition = ref<string>('right')
      const form = ref<IFeedBack>({
        title: '',
        content: '',
      })
      return {
        form,
        labelPosition,
        handleConfirm,
        handleCancel,
        showDialog,
        handleClose,
      }
    },
  })
</script>

<style lang="scss">
  #feed_back_dialog .feed-back-dialog {
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
  }
</style>
