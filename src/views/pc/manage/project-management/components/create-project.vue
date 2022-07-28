<template>
  <div>
    <div class="createBox">
      <el-dialog
        v-model="showDialog"
        :close-on-click-modal="false"
        class="createProjectBox"
        :title="
          type === 'add'
            ? $t('lang.createProject.createProjectTitle')
            : $t('lang.createProject.editProjectTitle')
        "
        width="1000px"
        @close="createProjectCancel">
        <div>
          <el-form label-position="left" label-width="170px" class="projectForm">
            <!--      ****** contact *********        -->
            <contact-form
              v-if="dialogType !== 3"
              v-model="formContact"
              :ver-tip-contact="verTipContact"></contact-form>
            <!--      ****** base information *********        -->
            <base-form
              v-model="formBasic"
              :type="dialogType"
              :ver-tip-name="verTipName"
              :ver-tip-keyword="verTipKeyword"
              :ver-tip-chain="verTipChain"
              :ver-tip-token="verTipToken"></base-form>
            <!--      ****** contact *********        -->
            <el-form-item :label="$t('lang.createProject.contractSite') + ':'">
              <div
                v-for="(o, index) in contractSite.data"
                :key="index"
                :class="`contractSiteBox ${index > 0 ? 'contract-site-box-item' : ''}`"
                :offset="index > 0 ? addContract.n : 0">
                <el-input
                  v-model="contractSite.data[index].contract_address"
                  class="projectKeyWordsInput"
                  :placeholder="$t('lang.createProject.contractSiteInput')"></el-input>
                <span class="reg-start contract-ver" :style="{ top: 36 + 58 * index + 'px' }">
                  {{ contractSite.data[index].verAddr }}
                </span>
                <div
                  v-show="index < contractSite.data.length && index > 0"
                  class="btn-border"
                  @click="deleteContractSite(index)">
                  <span class="subtract-create"></span>
                </div>
                <div v-show="index === 0" class="btn-border" @click="addContractSite">
                  <be-icon icon="add" class="add-create"></be-icon>
                </div>
              </div>
            </el-form-item>
            <!--      ***************        -->
            <el-form-item :label="$t('lang.createProject.logo') + ':'">
              <el-upload
                action=""
                :before-upload="handleBeforeUpLoad"
                :show-file-list="false"
                :headers="uploadHeader">
                <be-button
                  prev-icon="upload"
                  custom-class="retrieval-btn"
                  title="Click to match the audit according to the contract">
                  {{ $t('lang.createProject.selectFile') }}
                </be-button>
              </el-upload>
            </el-form-item>
            <el-form-item>
              <img
                v-show="formBasic.logo_url"
                style="background-color: #dfe4ea; width: 100px; height: 100px; object-fit: fill"
                :src="formBasic.logo_url" />
            </el-form-item>
            <!--      ****** social information *********        -->
            <website-form v-model="websiteForm" @match="matchSocial"></website-form>
            <!--      ****** operating information *********        -->
            <operating-form v-model="formOperating"></operating-form>
            <!--      ****** audit match *********        -->
            <h2 v-if="dialogType === 3" class="create--label">
              4.{{ $t('lang.projectExplorer.detail.audit') }}
              <be-button
                custom-class="retrieval-btn"
                prev-icon="iconRetrievalEagle"
                title="Click to match the audit according to the contract"
                @click="matchAudit">
                {{ $t('lang.searchBtn') }}
              </be-button>
            </h2>
            <div v-if="dialogType === 3">
              <be-tag
                v-for="(item, index) in auditList"
                :key="item.url"
                is-close
                @close="handleClose(index)"
                @click="openWindow(item.url)">
                {{ item.report_name }}
              </be-tag>
            </div>
          </el-form>
        </div>
        <template #footer>
          <span class="dialog-footer">
            <be-button type="success" custom-class="eagle-cancel-btn" @click="createProjectCancel">
              {{ $t('lang.createProject.createProjectCancel') }}
            </be-button>
            <be-button
              type="success"
              custom-class="eagle-btn"
              :loading="confirmLoading"
              @click="createProjectConfirm">
              {{ $t('lang.createProject.createProjectConfirm') }}</be-button
            >
          </span>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, reactive, ref, watch } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { BeButton, BeIcon, BeTag } from '@eagle-eye/be-ui'
  import {
    createProject,
    getMatchSocial,
    getProjectInfo,
    getReport,
    saveEditProject,
  } from '../../../../../api/project-management'
  import { platformReg } from '../../../../../utils/verification'
  import { ceSemiSpecialCharReg } from '../../../../../utils/reg'
  // @ts-ignore
  import composition from '../../../../../utils/mixin/common-func'
  import useUpload from '../../../../../utils/mixin/upload-func'
  import { catchErr, openWindow, trimStr } from '../../../../../utils/common'
  import config from '../../../../../enums/config'
  import { previewUrl } from '../../../../../enums/link'
  import { setPrevUrl } from '../../../../../utils/request'
  import ContactForm from './contact-form.vue'
  import WebsiteForm from './website-form.vue'
  import OperatingForm from './operating-form.vue'
  import BaseForm from './base-form.vue'
  import type { IAxiosRes } from '../../../../../utils/request'
  import type { Ref } from 'vue'
  import type { UploadProps } from 'element-plus'
  import type {
    IAuditList,
    ICreateProj,
    ICreateProjBase,
    ICreateProjContact,
    ICreateProjOperating,
    IWebsiteForm,
  } from '../../../../../utils/types'
  import type { IContractInfos, IReport } from '../../../../../api/project-management'
  export default defineComponent({
    name: 'CreateProject',
    components: { BaseForm, OperatingForm, WebsiteForm, ContactForm, BeIcon, BeButton, BeTag },
    props: {
      // 操作類型
      type: {
        type: String,
        default: 'add',
      },
      // tab标识
      tabType: {
        type: String, // sys / usr
        default: 'sys',
      },
      // 项目id
      projectId: {
        type: [String, Number],
        default: '',
      },
      getList: {
        type: Function,
        default: () => {
          return Function
        },
      },
    },
    emits: ['onClose'],
    setup(props, { emit }) {
      const { t } = useI18n()
      const { message } = composition()
      const showDialog = ref<boolean>(false)
      // 审计列表
      const auditList = ref<Array<IAuditList>>([])
      const addContract = ref<number>(0)
      const contractSite = reactive({
        data: [{ contract_address: '', verContract: '' }],
      })

      // 校验信息
      const verTipName = ref<string>('')
      const verTipKeyword = ref<string>('')
      const verTipChain = ref<string>('')
      const verTipToken = ref<string>('')
      const verTipContact = ref<string>('')
      // 表单 contact
      const formContact = ref<ICreateProjContact>({
        contact_type: 'email',
      })
      // 表单 Basic
      const formBasic = ref<ICreateProjBase>({
        platform: 'eth',
        top_flag: false,
      })
      // 聯係地址表單
      const websiteForm = ref<IWebsiteForm>({})
      // 表单 contact
      const formOperating = ref<ICreateProjOperating>({})

      /**************************************************************************** 视图交互逻辑   ***************************************************************/
      watch(showDialog, nVal => {
        if (nVal) {
          handleDialogOpen()
        } else {
          // 重置表單
          resetVar()
        }
      })
      // 弹窗类型标识，
      const dialogType = ref(3)
      /**
       * 弹窗开启处理，根据不同情况处理
       */
      const handleDialogOpen = (): void => {
        // dialogType === 3 此时有 Audit 无 contract
        // 管理员创建或编辑系统项目
        dialogType.value = 3
        // 用户创建用户项目
        if (props.tabType === 'usr' && props.type === 'add') {
          // dialogType === 1 此时有 contract 无 Audit
          dialogType.value = 1
        }
        // 管理员编辑用户项目
        if (props.tabType === 'usr' && props.type === 'edit') {
          // dialogType === 2 此时有 contract 无 Audit
          dialogType.value = 2
        }
        // 用户新增用户项目
        if (props.type === 'add') {
          formBasic.value.project_name = ''
          return
        }
        // 管理员编辑项目
        if (props.type === 'edit') {
          // 獲取詳情信息
          getDetailData()
          return
        }
      }

      const confirmLoading = ref<boolean>(false)
      /**
       * 弹窗确认方法
       */
      const createProjectConfirm = async function () {
        if (confirmLoading.value) return
        confirmLoading.value = true
        if (props.type === 'add') {
          await addProject()
        }
        if (props.type === 'edit') {
          await editProject()
        }
        emit('onClose')
      }
      /**
       * 弹窗取消方法
       */
      const createProjectCancel = () => {
        showDialog.value = false
        emit('onClose')
      }
      /**
       * 增加合约表单项
       */
      const addContractSite = () => {
        contractSite.data.push({
          contract_address: '',
          verContract: '',
        })
      }
      /**
       * 删除合约表单项
       */
      const deleteContractSite = (i: number) => {
        contractSite.data.splice(i, 1)
      }
      /**
       * 重置參數變量
       */
      const resetVar = () => {
        showDialog.value = false

        verTipContact.value = ''
        verTipName.value = ''
        verTipKeyword.value = ''
        verTipChain.value = ''
        verTipToken.value = ''

        addContract.value = 0
        dialogType.value = 3
        contractSite.data = [{ contract_address: '', verContract: '' }]
        auditList.value = []
        formContact.value = {
          contact_type: 'email',
        }
        // 表单 Basic
        formBasic.value = {
          platform: 'eth',
          top_flag: false,
        }
        // 聯係地址表單
        websiteForm.value = {}
        // 表单 contact
        formOperating.value = {}
      }
      /**************************************************************************** 新增、编辑、表单校验  ***************************************************************/
      /**
       * 获取详情数据
       */
      const getDetailData = () => {
        const params = {
          id: props.projectId,
        }
        getProjectInfo(params)
          .then((res: IAxiosRes) => {
            if (!res) {
              return
            }
            if (res && res.success) {
              formBasic.value.project_name = res.data.project_name
              formBasic.value.keyword = res.data.keyword
              formBasic.value.platform = res.data.platform
              formBasic.value.token_address = res.data.token_address
              formBasic.value.contract_address_arr = res.data.contract_address_arr
              formBasic.value.logo_url = res.data.logo_url
              formBasic.value.top_flag = res.data.top_flag
              if (res.data.contract_address_arr.length > 0) {
                contractSite.data = res.data.contract_address_arr.map((val: string) => {
                  return { contract_address: val, verContract: '' }
                })
              }
              const { website, github, telegram, twitter } = res.data
              websiteForm.value = { website, github, telegram, twitter }

              formOperating.value.address_markup = res.data.address_markup
              formOperating.value.white_paper = res.data.white_paper
              formOperating.value.operation_manual = res.data.operation_manual
              formOperating.value.exchange_board = res.data.exchange_board
              formOperating.value.test_chain = res.data.test_chain
              // 编辑时，如果原数据有审计就使用
              if (
                res.data.contract_report_list &&
                res.data.contract_report_list.length > 0 &&
                dialogType.value === 3
              ) {
                auditList.value = res.data.contract_report_list
                createAuditUrl()
              }
              // 回显联系
              if (dialogType.value === 2) {
                formContact.value.contact_type = res.data.contact_type
                formContact.value.contact = res.data.contact
                formContact.value.message_board = res.data.message_board
              }
            } else {
              catchErr(res)
            }
          })
          .catch(err => {
            message('error', `${t('lang.search')} ${t('lang.failed')}`)
            console.error(err)
          })
      }
      /**
       * 分号处理方法
       * @param {String} params - 处理字符串
       */
      const semicolonVerification = (params: string) => {
        // 那中文分号处理成英文
        let res = params.replace('；', ';')
        // 如果最后一个字符是分号，去除末尾的符号
        if (res.charAt(res.length - 1) === '；' || res.charAt(res.length - 1) === ';') {
          res = res.substring(0, res.length - 1)
        }
        return res
      }
      /**
       * 校驗必填
       * @param params
       * @param target
       * @param tip
       */
      const verificationRequire = (params: string, target: Ref<string>, tip: string) => {
        params = trimStr(params!)
        if (!params) {
          target.value = t('lang.pleaseInput') + t(`lang.createProject.${tip}`).toLocaleLowerCase()
          return false
        }
        return true
      }
      /**
       * 校驗關鍵詞
       * @param {Object} params - 搜索参数
       */
      const verificationKeyword = (params: ICreateProj) => {
        params.keyword = trimStr(params.keyword!)
        if (!params.keyword) {
          verTipKeyword.value =
            t('lang.pleaseInput') +
            t('lang.createProject.createProjectKeyWords').toLocaleLowerCase()
          return false
        }
        // 校驗中英文，分號
        if (params.keyword) {
          const keyword = semicolonVerification(params.keyword)
          if (!ceSemiSpecialCharReg.test(keyword)) {
            verTipKeyword.value = t('lang.createProject.verCeSemicolonReg')
            return false
          }
          params.keyword = keyword
        }
        return true
      }
      /**
       * 校验合约地址非空
       */
      /*const verContractAddrEmpty = (val: any): boolean => {
        // 没有填写合约地址
        if (!val.contract_address) {
          val.verAddr = t('lang.pleaseInput') + t('lang.createProject.contractSite')
          return true
        }
        return false
      }*/
      /**
       * 校验合约地址格式
       */
      const verContractAddrErr = (val: any): boolean => {
        // 校验地址格式
        if (
          !platformReg[formBasic.value.platform as keyof typeof platformReg](val.contract_address)
        ) {
          val.verAddr = t('lang.createProject.contractSite') + t('lang.formatError')
          return true
        }
        return false
      }
      /**
       * 表單校驗方法
       * @param {Object} params - 搜索参数
       */
      const formVerification = (params: ICreateProj) => {
        verTipContact.value = ''
        verTipName.value = ''
        verTipKeyword.value = ''
        verTipChain.value = ''
        verTipToken.value = ''
        // 校验非空
        if (
          !verificationRequire(params.contact!, verTipContact, 'contact') &&
          dialogType.value === 1
        )
          return false
        if (!verificationRequire(params.project_name!, verTipName, 'createProjectName'))
          return false
        // if (!verificationRequire(params.keyword!, verTipKeyword, 'createProjectKeyWords'))
        //   return false
        // // 校验 Keyword
        // if (!verificationKeyword(params)) return false
        // // 校验非空
        // if (!verificationRequire(params.platform!, verTipChain, 'chain')) return false
        // if (!verificationRequire(params.token_address!, verTipToken, 'tokenAddress')) return false
        // 校验 合约地址格式
        const contractInfos: Array<string> = []
        let hasEmptyOrErr = false
        contractSite.data &&
          contractSite.data.forEach(val => {
            val.verContract = ''
            // hasEmptyOrErr = verContractAddrEmpty(val as IContractInfos)
            if (val.contract_address) {
              hasEmptyOrErr = verContractAddrErr(val as IContractInfos)
              contractInfos.push(val.contract_address)
            }
          })
        // 验证非空、格式结果
        if (hasEmptyOrErr) {
          return false
        }
        contractInfos && (params.contract_address_arr = contractInfos)
        return true
      }
      /**
       * 确认增加项目方法
       */
      const addProject = () => {
        const params: ICreateProj = {
          ...formContact.value,
          ...formBasic.value,
          ...websiteForm.value,
          ...formOperating.value,
        }
        // 表单校验
        if (!formVerification(params)) {
          confirmLoading.value = false
          return
        }

        // 填写 report_id_list
        params.report_id_list = handleAuditParams(auditList.value)
        //  填写 type
        params.type = dialogType.value === 1 ? 'user' : 'system'
        createProject(params)
          .then((res: IAxiosRes) => {
            if (!res) {
              return
            }
            if (res && res.success) {
              message('success', `${t('lang.add')} ${t('lang.success')}`)
              // 更新列表
              props.getList('keep')
              createProjectCancel()
            } else {
              catchErr(res)
            }
          })
          .catch(catchErr)
          .finally(() => {
            confirmLoading.value = false
          })
      }
      /**
       * 确认编辑项目方法
       */
      const editProject = () => {
        const params: ICreateProj = {
          ...formContact.value,
          ...formBasic.value,
          ...websiteForm.value,
          ...formOperating.value,
        }
        // 表单校验
        if (!formVerification(params)) {
          confirmLoading.value = false
          return
        }
        // 填写 report_id_list
        params.report_id_list = handleAuditParams(auditList.value)
        //  填写 type
        params.type = dialogType.value === 1 ? 'user' : 'system'
        const pathParams = {
          id: props.projectId,
        }
        saveEditProject(params, pathParams)
          .then((res: IAxiosRes) => {
            if (!res) {
              return
            }
            if (res && res.success) {
              message('success', `${t('lang.edit')} ${t('lang.success')}`)
              // 更新列表
              props.getList('keep')
              createProjectCancel()
            } else {
              catchErr(res)
            }
          })
          .catch(catchErr)
          .finally(() => {
            confirmLoading.value = false
          })
      }
      /**
       * 匹配社交
       */
      const matchSocial = () => {
        verTipChain.value = ''
        verTipToken.value = ''
        if (!verificationRequire(formBasic.value.platform as string, verTipChain, 'chain'))
          return false
        if (
          !verificationRequire(formBasic.value.token_address as string, verTipToken, 'tokenAddress')
        )
          return false
        const params = {
          platform: formBasic.value.platform as string,
          token_address: formBasic.value.token_address as string,
        }
        getMatchSocial(params)
          .then((res: IAxiosRes) => {
            if (res && res.success) {
              if (!res.data) {
                message('warning', `${t('lang.emptyData')}`)
              }
              let isUnAllEmpty = false
              for (const resKey in res.data) {
                if (res.data[resKey]) {
                  isUnAllEmpty = true
                  break
                }
              }
              if (!isUnAllEmpty) {
                message('warning', `${t('lang.emptyData')}`)
                return
              }
              websiteForm.value = res.data
            } else {
              catchErr(res)
            }
          })
          .catch(catchErr)
      }
      /**************************************************************************** 合约审计报告相关逻辑  ***************************************************************/
      /**
       * 根據合約地址匹配
       */
      const matchAudit = (): void => {
        const params: IReport = {
          contract_address_list: [],
        }
        contractSite.data.forEach(val => {
          val.contract_address && params.contract_address_list.push(val.contract_address.toString())
        })
        if (params.contract_address_list.length === 0) {
          message('error', `${t('lang.pleaseInput')} ${t('lang.createProject.contractSite')}`)
          return
        }
        getReportDate(params)
      }
      /**
       * 合约报告点击关闭
       */
      const handleClose = (index: number): void => {
        auditList.value.splice(index, 1)
      }
      const getReportDate = (
        params: IReport = {
          contract_address_list: [],
        }
      ): void => {
        getReport(params)
          .then((res: IAxiosRes) => {
            if (res && res.success) {
              auditList.value = res.data
              createAuditUrl()
              if (auditList.value.length === 0) {
                message('warning', t('lang.emptyData'))
              }
            } else {
              catchErr(res)
            }
          })
          .catch(catchErr)
      }
      /**
       * 拼接生成预览url字段
       */
      const createAuditUrl = (): void => {
        const prevUrl = setPrevUrl()
        const baseURL = config.baseURL
        auditList.value.forEach((val: any) => {
          val.url = `${baseURL}${prevUrl}${previewUrl}?fileUuid=${val.uuid}&reportNum=${val.report_num}`
        })
      }
      /**
       * 处理合约数据
       * @param auditList 合约列表
       */
      const handleAuditParams = (auditList: Array<IAuditList>): Array<number> => {
        return auditList.map(val => {
          return Number(val.report_id)
        })
      }
      /**************************************************************************** logo 上传相关  ***************************************************************/

      const { uploadHeader, upLoadSingleFile } = useUpload()
      const handleBeforeUpLoad: UploadProps['beforeUpload'] = file => {
        return upLoadSingleFile(file, 100, (res: IAxiosRes) => {
          formBasic.value.logo_url = res.data
        })
      }
      return {
        handleBeforeUpLoad,
        uploadHeader,
        matchSocial,
        dialogType,
        matchAudit,
        openWindow,
        handleClose,
        auditList,
        showDialog,
        addContract,
        contractSite,
        verTipContact,
        verTipName,
        verTipKeyword,
        verTipChain,
        verTipToken,
        websiteForm,
        resetVar,
        semicolonVerification,
        verificationKeyword,
        formVerification,
        addProject,
        editProject,
        createProjectConfirm,
        createProjectCancel,
        addContractSite,
        deleteContractSite,
        formContact,
        formOperating,
        formBasic,
        confirmLoading,
      }
    },
  })
</script>

<style lang="scss">
  .createBox {
    .be-switch__checked.create-proj--top {
      background-color: $mainColor3;
    }
    .sub--title {
      font-size: 14px;
      font-weight: 400;
      color: $textColor12;
    }

    .create--label {
      margin-bottom: 20px;
      line-height: 46px;
    }

    .el-dialog__body {
      padding: 30px;
    }

    .contract-type--select {
      margin-right: 10px;
    }

    .el-form--label-left .el-form-item__label {
      text-align: right;
      line-height: 40px;
    }

    .el-dialog__title {
      font-family: 'Barlow', sans-serif;
      color: $mainColor3;
    }

    .el-input__inner {
      height: 40px;
      border-radius: 2px;
    }

    .project-star {
      position: absolute;
      top: 7px;
      left: -14px;
    }

    .project-star__contract {
      left: -20px;
      top: 5px;
    }

    .project-Ver {
      position: absolute;
      top: 34px;
      left: 0;
    }

    .contract-ver {
      position: absolute;
      left: 0;
    }
  }

  .btn-border {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 16px;
    height: 16px;
    margin-left: 12px;
    border: solid 1px darkgray;
    border-radius: 2px;

    .add-create {
      .be-icon--container {
        fill: darkgray;
      }
    }
  }

  .btn-border:hover {
    border-color: $mainColor3;

    .add-create {
      .be-icon--container {
        fill: $mainColor3;
      }
    }

    .subtract-create {
      border: solid 1px $mainColor3;
    }
  }

  .subtract-create {
    width: 14px;
    border: solid 1px darkgray;
  }

  .el-form-item__content::after,
  .el-form-item__content::before {
    display: none;
  }

  .contractSiteBox {
    display: flex;
    align-items: center;
    width: 800px;
  }

  .contract-site-box-item {
    margin-top: 16px;
  }

  .contractSiteClass {
    width: 110px;
  }

  .createBox .be-tag {
    height: 36px;
    margin: 5px;
    line-height: 36px;

    /*span {
        height: 100%;
    }*/

    &:hover {
      color: $textColor3;
      background: #e8fff0;
      border: 1px solid #cde4df;
      border-radius: 2px;

      .be-icon use {
        fill: $textColor3;
      }
    }
  }

  .retrieval-btn {
    width: 120px;
    height: 36px;
    margin: 5px;
    background: $mainColor7;
    border: 1px solid $mainColor3;
    border-radius: 2px;

    &:hover {
      background: $mainColor7;
      box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
    }

    .be-button--body .be-button--slot {
      font-family: 'Barlow', sans-serif;
      font-size: 14px;
      font-weight: 400;
      line-height: 22px;
      color: #333;
    }

    .be-icon--container {
      use {
        fill: $mainColor3 !important;
      }
    }
  }
</style>
