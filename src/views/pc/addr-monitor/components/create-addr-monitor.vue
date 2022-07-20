/* * @create-addr-monitor.vue * @deprecated * @author czh * @update (czh 2022/4/2) */
<template>
  <div id="create_addr_monitor">
    <be-dialog
      ref="loginDialogInner"
      :titles="$t('lang.addrMonitor.title')"
      :is-show="showDialog"
      :is-open-modal="true"
      :is-drag="false"
      layout="center"
      custom-class="create-dialog"
      @close="handleClose">
      <div>
        <el-form :label-position="labelPosition" label-width="124px">
          <el-form-item :label="$t('lang.addrMonitor.form.labelAddr') + ':'">
            <span class="reg-start feed-back--star">*</span>
            <el-input v-model.trim="form.address" :disabled="type === 'edit'"></el-input>
          </el-form-item>
          <el-form-item :label="$t('lang.addrMonitor.form.labelRemark') + ':'">
            <el-input
              v-model.trim="form.remark"
              type="textarea"
              :rows="7"
              resize="none"
              maxlength="300"></el-input>
          </el-form-item>
          <el-form-item :label="$t('lang.addrMonitor.form.filter')">
            <div class="form--link">
              <el-input
                v-model.trim="form.amount"
                :disabled="type === 'edit'"
                class="form--link__input"
                @input="limitInput">
                <template #prefix>
                  <span style="margin-right: 10px">$</span>
                </template>
              </el-input>
            </div>
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
  import composition from '../../../../utils/mixin/common-func'
  import { addAddressMonitor, updateAddressMonitor } from '../../../../api/addr-monitor'
  import type { PropType } from 'vue'
  import type { IAddrMonitorForm } from '../../../../utils/types'
  export default defineComponent({
    name: 'CreateAddrMonitor',
    components: { BeDialog, BeButton },
    props: {
      // 操作類型
      type: {
        type: String,
        default: 'add',
      },

      getList: {
        type: Function,
        default: () => {
          return Function
        },
      },
      // 编辑时，当前操作的地址监控数据对象
      curItem: {
        type: Object as PropType<IAddrMonitorForm>,
        default: () => {
          return {}
        },
      },
    },
    setup(props) {
      const { message } = composition()
      const showDialog = ref<boolean>(false)
      const labelPosition = ref<string>('right')
      const form = ref<IAddrMonitorForm>({
        address: '',
        remark: '',
        address_monitor_id: '',
        amount: '',
      })
      watch(showDialog, nVal => {
        if (nVal) {
          // 新增时
          if (props.type === 'add') {
            return
          }
          // 獲取具体信息
          getDetailData()
        } else {
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
          address: '',
          remark: '',
          address_monitor_id: '',
          amount: '',
        }
      }
      /**
       * 编辑时获取旧数据
       */
      const getDetailData = (): void => {
        form.value = { ...props.curItem }
        form.value.address_monitor_id = props.curItem.id
      }
      /**
       * 处理提交确认
       */
      const handleConfirm = (): void => {
        // 根据类别调用不同接口
        if (props.type === 'add') {
          createAddrMonitor()
        } else {
          updateAddrMonitor()
        }
      }
      const { t } = useI18n()
      /**
       * 表单校验
       */
      const formVerification = (): boolean => {
        if (!form.value.address) {
          const msg = `${t('lang.pleaseInput')} ${t('lang.addrMonitor.form.labelAddr')}`
          message('warning', msg)
          return false
        }
        if (props.type === 'edit') {
          if (!form.value.address_monitor_id) {
            const msg = `${t('lang.pleaseInput')} address_monitor_id`
            message('warning', msg)
            return false
          }
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
          address: form.value.address,
          remark: form.value.remark,
          amount: Number(form.value.amount),
        }
        addAddressMonitor(params)
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
      /**
       * 编辑
       */
      const updateAddrMonitor = () => {
        // 校验表单
        if (!formVerification()) {
          return
        }
        form.value.amount = Number(form.value.amount)
        updateAddressMonitor(form.value)
          .then((res: any) => {
            if (!res) {
              return
            }
            if (res) {
              message('success', `${t('lang.edit')} ${t('lang.success')}`)
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
      const limitInput = (): void => {
        form.value.amount = (form.value.amount as string).replace(/[^0-9]/g, '')
      }
      return {
        limitInput,
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
  #create_addr_monitor .create-dialog {
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
      left: -15px;
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
