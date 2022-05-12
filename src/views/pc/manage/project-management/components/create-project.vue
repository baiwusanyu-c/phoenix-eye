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
        width="1000px">
        <div>
          <el-form label-position="left" label-width="170px" class="projectForm">
            <h2 v-if="dialogType !== 3" class="create--label">
              {{ $t('lang.createProject.contact') }}
              <span class="sub--title">{{ $t('lang.createProject.contactDesc') }}</span>
            </h2>
            <el-form-item v-if="dialogType !== 3" label=" ">
              <span class="reg-start project-star project-star__contract">*</span>
              <div class="contractSiteBox">
                <el-select
                  v-model="formContact.contact_type"
                  class="contract-type--select"
                  :placeholder="$t('lang.createProject.selectContractClass')">
                  <el-option label="others" value="others"></el-option>
                  <el-option label="email" value="email"></el-option>
                  <el-option label="twitter" value="twitter"></el-option>
                </el-select>
                <el-input v-model="formContact.contact" class="projectKeyWordsInput"></el-input>
              </div>
              <span id="cp_contact" class="reg-start project-Ver">{{ verTipContact }}</span>
            </el-form-item>
            <el-form-item
              v-if="dialogType !== 3"
              :label="$t('lang.createProject.messageBoard') + ':'">
              <el-input
                v-model="formContact.message_board"
                type="textarea"
                maxlength="200"
                :rows="7"></el-input>
            </el-form-item>

            <h2 class="create--label">1.{{ $t('lang.createProject.label1') }}</h2>
            <!--      ***************        -->
            <el-form-item :label="$t('lang.createProject.createProjectName') + ':'">
              <span class="reg-start project-star">*</span>
              <el-input
                v-model="formBasic.project_name"
                class="projectKeyWordsInput"
                :placeholder="$t('lang.createProject.createProjectNameInput')"></el-input>
              <span id="cp_project_name" class="reg-start project-Ver">{{ verTipName }}</span>
            </el-form-item>
            <el-form-item :label="$t('lang.createProject.createProjectKeyWords') + ':'">
              <span class="reg-start project-star">*</span>
              <el-input
                v-model="formBasic.keyword"
                class="projectKeyWordsInput"
                :placeholder="$t('lang.createProject.createProjectKeyWordsInput')"></el-input>
              <span id="cp_keyword" class="reg-start project-Ver">{{ verTipKeyword }}</span>
            </el-form-item>
            <!--      ***************        -->
            <el-form-item :label="$t('lang.createProject.chain') + ':'">
              <span class="reg-start project-star">*</span>
              <el-select v-model="formBasic.platform" placeholder="Select">
                <el-option
                  v-for="item in takePlatformListDict"
                  :key="item.id + 'chain'"
                  :label="item.label"
                  :value="item.value"></el-option>
              </el-select>
              <span id="cp_platform" class="reg-start project-Ver">{{ verTipChain }}</span>
            </el-form-item>
            <!--      ***************        -->
            <el-form-item :label="$t('lang.createProject.tokenAddress') + ':'">
              <span class="reg-start project-star">*</span>
              <el-input v-model="formBasic.token_address" class="projectKeyWordsInput"></el-input>
              <span id="cp_token_address" class="reg-start project-Ver">{{ verTipToken }}</span>
            </el-form-item>
            <!--      ***************        -->
            <el-form-item :label="$t('lang.createProject.contractSite') + ':'">
              <span class="reg-start project-star">*</span>
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
            <h2 class="create--label">
              2.{{ $t('lang.createProject.label2') }}
              <be-button
                custom-class="retrieval-btn"
                prev-icon="iconRetrievalEagle"
                title="Click to match the audit according to the contract"
                @click="matchSocial">
                {{ $t('lang.searchBtn') }}
              </be-button>
            </h2>
            <!--        聯係地址 - WebSite    -->
            <el-form-item :label="'WebSite:'">
              <el-input v-model="websiteForm.website" class="projectKeyWordsInput"></el-input>
            </el-form-item>
            <!--        聯係地址 - GitHub    -->
            <el-form-item :label="'GitHub:'">
              <el-input v-model="websiteForm.github" class="projectKeyWordsInput"></el-input>
            </el-form-item>
            <!--        聯係地址 - Twitter    -->
            <el-form-item :label="'Twitter:'">
              <el-input v-model="websiteForm.twitter" class="projectKeyWordsInput"></el-input>
            </el-form-item>
            <!--        聯係地址 - Telegram    -->
            <el-form-item :label="'Telegram:'">
              <el-input v-model="websiteForm.telegram" class="projectKeyWordsInput"></el-input>
            </el-form-item>

            <h2 class="create--label">3.{{ $t('lang.createProject.label3') }}</h2>
            <el-form-item :label="`${$t('lang.createProject.markup')}:`">
              <el-input
                v-model="formOperating.address_markup"
                class="projectKeyWordsInput"></el-input>
            </el-form-item>
            <el-form-item :label="`${$t('lang.createProject.whitePaper')}:`">
              <el-input v-model="formOperating.white_paper" class="projectKeyWordsInput"></el-input>
            </el-form-item>
            <el-form-item :label="`${$t('lang.createProject.operation')}:`">
              <el-input
                v-model="formOperating.operation_manual"
                class="projectKeyWordsInput"></el-input>
            </el-form-item>
            <el-form-item :label="`${$t('lang.createProject.boardExchange')}:`">
              <el-input
                v-model="formOperating.exchange_board"
                class="projectKeyWordsInput"></el-input>
            </el-form-item>
            <el-form-item :label="`${$t('lang.createProject.testChain')}:`">
              <el-input v-model="formOperating.test_chain" class="projectKeyWordsInput"></el-input>
            </el-form-item>

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
            <be-button type="success" custom-class="eagle-btn" @click="createProjectConfirm">{{
              $t('lang.createProject.createProjectConfirm')
            }}</be-button>
          </span>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, onMounted, reactive, ref, watch } from 'vue'
  import { useI18n } from 'vue-i18n'
  import {
    createProject,
    getMatchSocial,
    getProjectInfo,
    getReport,
    saveEditProject,
    uploadFile,
  } from '../../../../../api/project-management'
  import { platformListDict } from '../../../../../utils/platform-dict'
  import { platformReg } from '../../../../../utils/verification'
  import { ceSemiSpecialCharReg } from '../../../../../utils/reg'
  // @ts-ignore
  import { BeButton, BeIcon, BeTag } from '../../../../../../public/be-ui/be-ui.es'
  import composition from '../../../../../utils/mixin/common-func'
  import { getStore, openWindow, trimStr } from '../../../../../utils/common'
  import config from '../../../../../enums/config'
  import { previewUrl } from '../../../../../enums/link'
  import type { Ref } from 'vue'
  import type { UploadProps, UploadUserFile } from 'element-plus'
  import type {
    IAuditList,
    ICreateProj,
    ICreateProjBase,
    ICreateProjContact,
    ICreateProjOperating,
    IWebsiteForm,
  } from '../../../../../utils/types'
  import type { IContractInfos, IReport } from '../../../../../api/project-management'
  import type { IPlatformListItem } from '../../../../../utils/platform-dict'

  // TODO 重构
  export default defineComponent({
    name: 'CreateProject',
    components: { BeIcon, BeButton, BeTag },
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
    setup(props) {
      const { t } = useI18n()
      const { message } = composition()
      const showDialog = ref<boolean>(false)
      // 审计列表
      const auditList = ref<Array<IAuditList>>([])
      const addContract = ref<number>(0)
      const contractSite = reactive({
        data: [{ contract_address: '', verContract: '' }],
      })
      // 下拉平台字典
      const takePlatformListDict = ref<Array<IPlatformListItem>>([])
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
      const formBasic = ref<ICreateProjBase>({})
      // 聯係地址表單
      const websiteForm = ref<IWebsiteForm>({})
      // 表单 contact
      const formOperating = ref<ICreateProjOperating>({})
      onMounted(() => {
        takePlatformListDict.value = platformListDict
      })
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
      /**
       * 弹窗确认方法
       */
      const createProjectConfirm = async function () {
        if (props.type === 'add') {
          await addProject()
        }
        if (props.type === 'edit') {
          await editProject()
        }
      }
      /**
       * 弹窗取消方法
       */
      const createProjectCancel = () => {
        showDialog.value = false
      }
      const addContractSite = () => {
        contractSite.data.push({
          contract_address: '',
          verContract: '',
        })
      }
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
        formBasic.value = {}
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
          .then(res => {
            if (!res) {
              return
            }
            if (res) {
              formBasic.value.project_name = res.data.project_name
              formBasic.value.keyword = res.data.keyword
              formBasic.value.platform = res.data.platform
              formBasic.value.token_address = res.data.token_address
              formBasic.value.contract_address_arr = res.data.contract_address_arr
              formBasic.value.logo_url = res.data.logo_url
              contractSite.data = res.data.contract_address_arr.map((val: string) => {
                return { contract_address: val, verContract: '' }
              })
              websiteForm.value.website = res.data.website
              websiteForm.value.github = res.data.github
              websiteForm.value.telegram = res.data.telegram
              websiteForm.value.twitter = res.data.twitter

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
       * 校验合约地址
       */
      const verificationContractAddr = (val: any): boolean => {
        // 没有填写合约地址
        if (!val.contract_address) {
          val.verAddr = t('lang.pleaseInput') + t('lang.createProject.contractSite')
          return true
        }
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
        if (!verificationRequire(params.keyword!, verTipKeyword, 'createProjectKeyWords'))
          return false
        // 校验 Keyword
        if (!verificationKeyword(params)) return false
        // 校验非空
        if (!verificationRequire(params.platform!, verTipChain, 'chain')) return false
        if (!verificationRequire(params.token_address!, verTipToken, 'tokenAddress')) return false
        // 校验 合约地址格式
        const contractInfos: Array<string> = []
        let hasEmptyOrErr = false
        contractSite.data &&
          contractSite.data.forEach(val => {
            val.verContract = ''
            hasEmptyOrErr = verificationContractAddr(val as IContractInfos)
            if (val.contract_address) {
              contractInfos.push(val.contract_address)
            }
          })
        if (hasEmptyOrErr) {
          return false
        }
        if (contractInfos.length === 0) {
          const msg = t('lang.createProject.verInfo')
          message('warning', msg)
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
          return
        }

        // 填写 report_id_list
        params.report_id_list = handleAuditParams(auditList.value)
        //  填写 type
        params.type = dialogType.value === 1 ? 'user' : 'system'
        createProject(params)
          .then((res: any) => {
            if (!res) {
              return
            }
            if (res && res.code === '0000') {
              message('success', `${t('lang.add')} ${t('lang.success')}`)
              // 更新列表
              props.getList('reset')
              showDialog.value = false
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
          return
        }

        // params.logo_url = ''
        // 填写 report_id_list
        params.report_id_list = handleAuditParams(auditList.value)
        //  填写 type
        params.type = dialogType.value === 1 ? 'user' : 'system'
        const pathParams = {
          id: props.projectId,
        }
        saveEditProject(params, pathParams)
          .then((res: any) => {
            if (!res) {
              return
            }
            if (res && res.code === '0000') {
              message('success', `${t('lang.edit')} ${t('lang.success')}`)
              // 更新列表
              props.getList('reset')
              showDialog.value = false
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
       * 匹配社交
       */
      const matchSocial = () => {
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
          .then((res: any) => {
            if (res.success && res.data) {
              websiteForm.value.website = res.data.website
              websiteForm.value.github = res.data.github
              websiteForm.value.telegram = res.data.telegram
              websiteForm.value.twitter = res.data.twitter
            } else {
              message('error', res.message || res)
            }
          })
          .catch(err => {
            message('error', err.message || err)
            console.error(err)
          })
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
          .then((res: any) => {
            if (res.success) {
              auditList.value = res.data
              createAuditUrl()
              if (auditList.value.length === 0) {
                message('warning', t('lang.emptyData'))
              }
            } else {
              message('error', res.message || res)
            }
          })
          .catch(err => {
            message('error', err.message || err)
            console.error(err)
          })
      }
      const createAuditUrl = (): void => {
        const prevUrl =
          String(import.meta.env.VITE_PROJECT_ENV) === 'production' ? '/hermit/back' : ''
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
      const uploadHeader = {
        Authorization: `Bearer ${getStore('token')}`,
      }

      const handleBeforeUpLoad: UploadProps['beforeUpload'] = (file): boolean => {
        if (file.size / 1024 / 1024 > 100) {
          message('warning', `${t('lang.maxUpload')}`)
          return false
        }
        const reader = new FileReader()
        //转base64
        reader.onload = function (e) {
          const fileData = e.target?.result as string
          const newFile = fileData.split(',')[1]
          const params = {
            base64File: newFile,
            filename: file.name,
          }
          uploadFile(params)
            .then((res: any) => {
              if (res.code === 200) {
                formBasic.value.logo_url = res.data
                message('success', `${t('lang.upload')} ${t('lang.success')}`)
              } else {
                message('error', res.message || res)
              }
            })
            .catch(err => {
              message('error', err.message || err)
              console.error(err)
            })
        }
        reader.readAsDataURL(file)
        return false
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
        takePlatformListDict,
        verTipContact,
        verTipName,
        verTipKeyword,
        verTipChain,
        verTipToken,

        websiteForm,
        resetVar,
        semicolonVerification,
        verificationKeyword,
        verificationContractAddr,
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
      }
    },
  })
</script>

<style lang="scss">
  .createBox {
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
      font-family: AlibabaPuHuiTi-Regular, sans-serif;
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

    .be-button-body .be-button-slot {
      font-family: AlibabaPuHuiTi-Regular, sans-serif;
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
