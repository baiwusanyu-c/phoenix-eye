/* * @feed-back.vue * @deprecated 需求反饋彈窗 * @author czh * @update (czh 2022/3/28) */
<template>
  <div id="feed_back_dialog">
    <be-dialog
      ref="feedbackDialogInner"
      :titles="$t('lang.feedback.title')"
      :is-show="showDialog"
      :is-open-modal="true"
      :is-drag="false"
      layout="center"
      custom-class="feed-back-dialog"
      @close="handleClose">
      <div>
        <el-form :label-position="labelPosition" label-width="80px">
          <el-form-item :label="$t('lang.feedback.formTitle') + ':'">
            <el-input v-model="form.title" maxlength="30" show-word-limit></el-input>
          </el-form-item>
          <el-form-item :label="$t('lang.feedback.formContract') + ':'">
            <el-input
              v-model="form.contract"
              type="textarea"
              maxlength="200"
              show-word-limit
              :rows="7"
              :placeholder="$t('lang.feedback.formContractP')"></el-input>
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
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue'
  import { BeDialog, BeButton } from '../../public/be-ui/be-ui.es'
  interface IFeedBack {
    title?: string
    contract?: string
  }
  export default defineComponent({
    name: 'FeedBack',
    components: {
      BeDialog,
      BeButton,
    },
    setup() {
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
          contract: '',
        }
      }
      /**
       * 反饋提交
       */
      const handleConfirm = (): void => {
        console.log('handleConfirm')
      }
      const showDialog = ref<boolean>(false)
      const labelPosition = ref<string>('right')
      const form = ref<IFeedBack>({
        title: '',
        contract: '',
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
    height: 390px;

    .el-form-item__label {
      font-family: AlibabaPuHuiTi-Regular, sans-serif;
      font-size: 14px;
      font-weight: bold;
      line-height: 22px;
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
  }
</style>
