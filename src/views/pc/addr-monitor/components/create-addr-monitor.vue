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
        <el-form :label-position="labelPosition" label-width="120px">
          <el-form-item :label="$t('lang.addrMonitor.form.labelAddr') + ':'">
            <el-input v-model="form.address"></el-input>
          </el-form-item>
          <el-form-item :label="$t('lang.addrMonitor.form.labelRemark') + ':'">
            <el-input v-model="form.remark" type="textarea" :rows="7"></el-input>
          </el-form-item>
          <el-form-item :label="$t('lang.addrMonitor.form.labelLink') + ':'">
            <div class="form--link">
              <be-tooltip
                placement="top"
                custom-class="addr-monitor--link"
                :content="$t('lang.addrMonitor.form.linkDiscr')">
                <be-icon icon="query" color="#333"></be-icon>
              </be-tooltip>
              <el-input v-model="form.link" class="form--link__input"></el-input>
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
  import { BeButton, BeDialog, BeIcon, BeTooltip } from '../../../../../public/be-ui/be-ui.es'
  import composition from '../../../../utils/mixin/common-func'
  import type { IAddrMonitorForm } from '../../../../utils/types'
  export default defineComponent({
    name: 'CreateAddrMonitor',
    components: { BeDialog, BeIcon, BeTooltip, BeButton },
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
    },
    setup(props) {
      const { message } = composition()
      const showDialog = ref<boolean>(false)
      const handleClose = (): void => {
        showDialog.value = false
      }
      const labelPosition = ref<string>('right')
      const form = ref<IAddrMonitorForm>({
        address: '',
        remark: '',
        link: '',
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
       * 重置表单
       */
      const resetVar = (): void => {
        form.value = {
          address: '',
          remark: '',
          link: '',
        }
      }
      /**
       * 编辑时获取旧数据
       */
      const getDetailData = () => {
        message('info', 'handleConfirm')
        /*  const params = {
               id: props.projectId,
           }
           getProjectInfo(params)
               .then(res => {
                   if (!res) {
                       return
                   }
                   if (res) {
                       projectName.value = res.data.name
                       projectKeyWords.value = res.data.keyword
                       contractSite.data = res.data.contract_infos
                       emailList.value = res.data.email_list.join(';')
                       websiteForm.value.website = res.data.website
                       websiteForm.value.github = res.data.github
                       websiteForm.value.telegram = res.data.telegram
                       websiteForm.value.twitter = res.data.twitter
                       // 编辑时，如果原数据有审计就使用，否则调用获取默认审计
                       if (res.data.contract_report_list) {
                           auditList.value = res.data.contract_report_list
                       } else {
                           getReportDate()
                       }
                   }
               })
               .catch(err => {
                   const msg = t('lang.search') + t('lang.failed')
                   message('error', msg)
                   console.error(err)
               })*/
      }
      /**
       * 处理提交确认
       */
      const handleConfirm = () => {
        console.error('handleConfirm')
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
  #create_addr_monitor .create-dialog {
    width: 527px;
    .el-form-item__label {
      font-family: AlibabaPuHuiTi-Regular, sans-serif;
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
