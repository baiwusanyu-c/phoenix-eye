/* * @add-incident.vue * @deprecated * @author czh * @update (czh 2022/5/7) */
<template>
  <div id="create_incident">
    <be-dialog
      ref="loginDialogInner"
      :titles="$t('lang.securityIncident.title')"
      :is-show="showDialog"
      :is-open-modal="true"
      :is-drag="false"
      layout="center"
      custom-class="create-dialog"
      @close="handleClose">
      <div>
        <el-form label-position="right" label-width="142px">
          <el-form-item :label="$t('lang.securityIncident.form.project') + ':'">
            <span class="reg-start feed-back--star">*</span>
            <el-input v-model="form.project" maxlength="100"></el-input>
          </el-form-item>
          <el-form-item :label="$t('lang.securityIncident.form.attack_type') + ':'">
            <span class="reg-start feed-back--star">*</span>
            <el-input v-model="form.attack_type" maxlength="100"></el-input>
          </el-form-item>
          <el-form-item :label="$t('lang.securityIncident.form.loss_amount') + ':'">
            <span class="reg-start feed-back--star">*</span>
            <el-input v-model="form.loss_amount" maxlength="100" @input="limitInput()">
              <template #prefix>
                <span style="width: 30px">$</span>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item :label="$t('lang.securityIncident.form.abstract_content') + ':'">
            <span class="reg-start feed-back--star">*</span>
            <el-input
              v-model="form.abstract_content"
              type="textarea"
              :rows="7"
              maxlength="1000"
              resize="none"></el-input>
          </el-form-item>
          <el-form-item :label="$t('lang.securityIncident.form.event_link') + ':'">
            <span class="reg-start feed-back--star">*</span>
            <el-input v-model="form.event_link" maxlength="100"></el-input>
          </el-form-item>
          <el-form-item :label="$t('lang.securityIncident.form.attack_address_arr') + ':'">
            <span class="reg-start feed-back--star">*</span>
            <el-input
              v-model="form.attack_address_arr"
              type="textarea"
              :rows="7"
              maxlength="1000"
              resize="none"></el-input>
          </el-form-item>
          <el-form-item :label="$t('lang.securityIncident.form.attacked_address_arr') + ':'">
            <span class="reg-start feed-back--star">*</span>
            <el-input
              v-model="form.attacked_address_arr"
              type="textarea"
              :rows="7"
              :placeholder="`Multiple address Name separated by ’;‘ `"
              maxlength="1000"
              resize="none"></el-input>
          </el-form-item>
          <el-form-item :label="$t('lang.securityIncident.form.attack_trx_arr') + ':'">
            <span class="reg-start feed-back--star">*</span>
            <el-input
              v-model="form.attack_trx_arr"
              type="textarea"
              :rows="7"
              maxlength="1000"
              :placeholder="`Multiple trx Name separated by ’;‘ `"
              resize="none"></el-input>
          </el-form-item>
          <el-form-item :label="$t('lang.securityIncident.form.attack_time') + '    :'">
            <span class="reg-start feed-back--star">*</span>
            <el-date-picker
              v-model="form.attack_time"
              type="date"
              placeholder="Pick a day"
              :disabled-date="disableDate" />
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
  import { addIncidentInfo, editIncidentInfo } from '../../../../../api/security-incident'
  import { formatDate } from '../../../../../utils/common'
  import type { IIncident } from '../../../../../api/security-incident'
  import type { PropType } from 'vue'

  export default defineComponent({
    name: 'AddIncident',
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
      // 编辑时，当前操作的数据对象
      curItem: {
        type: Object as PropType<IIncident>,
        default: () => {
          return {}
        },
      },
    },
    setup(props) {
      const { message } = composition()
      const showDialog = ref<boolean>(false)
      const form = ref<IIncident>({
        event_id: '',
        project: '',
        attack_type: '',
        loss_amount: '',
        abstract_content: '',
        event_link: '',
        attack_address_arr: '',
        attacked_address_arr: '',
        attack_trx_arr: '',
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
          event_id: '',
          project: '',
          attack_type: '',
          loss_amount: '',
          abstract_content: '',
          event_link: '',
          attack_address_arr: '',
          attacked_address_arr: '',
          attack_trx_arr: '',
        }
      }
      /**
       * 编辑时获取旧数据
       */
      const getDetailData = (): void => {
        form.value = { ...props.curItem }
        form.value.event_id = props.curItem.event_id
        form.value.attack_address_arr = (form.value.attack_address_arr as Array<string>).join(';')
        form.value.attacked_address_arr = (form.value?.attacked_address_arr as Array<string>).join(
          ';'
        )
        form.value.attack_trx_arr = (form.value?.attack_trx_arr as Array<string>).join(';')
      }
      /**
       * 处理提交确认
       */
      const handleConfirm = (): void => {
        // 根据类别调用不同接口
        if (props.type === 'add') {
          createSecurityIncident()
        } else {
          updateSecurityIncident()
        }
      }
      const { t } = useI18n()
      /**
       * 表单校验
       */
      const formVerification = (): boolean => {
        for (const key in form.value) {
          if (key !== 'event_id') {
            if (!form.value[key as keyof typeof form.value]) {
              const msg = `${t('lang.pleaseInput')} ${t(`lang.securityIncident.form.${key}`)}`
              message('warning', msg)
              return false
            }
          }
        }
        if (props.type === 'edit') {
          if (!form.value.event_id) {
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
      const createSecurityIncident = () => {
        // 校验表单
        if (!formVerification()) {
          return
        }
        const params = {
          ...form.value,
        }
        params.attack_address_arr = (params.attack_address_arr as string).split(';')
        params.attacked_address_arr = (params.attacked_address_arr as string).split(';')
        params.attack_trx_arr = (params.attack_trx_arr as string).split(';')
        if (!params.attack_time) {
          const msg = `${t('lang.pleaseInput')} Attack Time`
          message('warning', msg)
          return
        }
        const attackTime = (params.attack_time as string).toString()
        params.attack_time = formatDate(attackTime).split(' ')[0]
        addIncidentInfo(params)
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
      const updateSecurityIncident = () => {
        // 校验表单
        if (!formVerification()) {
          return
        }
        form.value.attack_address_arr = (form.value.attack_address_arr as string).split(';')
        form.value.attacked_address_arr = (form.value.attacked_address_arr as string).split(';')
        form.value.attack_trx_arr = (form.value.attack_trx_arr as string).split(';')
        if (!form.value.attack_time) {
          const msg = `${t('lang.pleaseInput')} Attack Time`
          message('warning', msg)
          return
        }
        const attackTime = (form.value.attack_time as string).toString()
        form.value.attack_time = formatDate(attackTime).split(' ')[0]
        editIncidentInfo(form.value, form.value.event_id as string)
          .then((res: any) => {
            if (!res) {
              return
            }
            if (res && res.success) {
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
        form.value.loss_amount = (form.value.loss_amount as string).replace(/[^0-9]/g, '')
      }
      const disableDate = (date: Date) => {
        return date > new Date()
      }
      return {
        disableDate,
        limitInput,
        handleConfirm,
        form,
        handleClose,
        showDialog,
      }
    },
  })
</script>

<style lang="scss">
  #create_incident {
    .be-dialog {
      overflow-y: auto;
    }
  }

  #create_incident .create-dialog {
    position: relative !important;
    margin-bottom: 50px;
    margin-top: 26%;
    width: 800px;

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

    .el-input__prefix,
    .el-input__suffix {
      height: 40px;
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
      left: -150px;
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

  /* 移动端预留 适配 */
  @media screen and (max-width: 1280px) {
    #create_incident .be-dialog {
      display: initial;
      overflow-y: auto;
      .create-dialog {
        margin-top: 6%;
        left: calc(50% - 264px);
        position: relative;
        margin-bottom: 90px;
      }
    }
  }
  @media screen and (min-width: 1280px) and (max-width: 1326px) {
    #create_incident .be-dialog {
      display: initial;
      overflow-y: auto;
      .create-dialog {
        margin-top: 6%;
        left: calc(50% - 400px);
        position: relative !important;
        margin-bottom: 90px;
      }
    }
  }
</style>
