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
          <el-form :label-position="labelPosition" label-width="154px" class="projectForm">
            <h2 class="create--label">
              Contact
              <span class="sub--title"
                >Please leave your contact information, we will give you the latest status
                feedback.</span
              >
            </h2>
            <el-form-item label=" ">
              <span class="reg-start project-star project-star__contract">*</span>
              <div class="contractSiteBox">
                <el-select
                  v-model="contractType"
                  class="contract-type--select"
                  :placeholder="$t('lang.createProject.selectContractClass')">
                  <el-option
                    v-for="item in takePlatformListDict"
                    :key="item.id"
                    :label="item.label"
                    :value="item.value"></el-option>
                </el-select>
                <el-input
                  v-model="projectName"
                  class="projectKeyWordsInput"
                  :placeholder="$t('lang.createProject.createProjectNameInput')"></el-input>
              </div>
              <span class="reg-start project-Ver">{{ verName }}</span>
            </el-form-item>

            <el-form-item :label="$t('lang.createProject.createProjectName') + ':'">
              <el-input
                v-model="content"
                type="textarea"
                maxlength="200"
                :rows="7"
                :placeholder="$t('lang.feedback.formContractP')"></el-input>
            </el-form-item>
            <h2 class="create--label">1.Basic information</h2>
            <!--      ***************        -->
            <el-form-item :label="$t('lang.createProject.createProjectName') + ':'">
              <span class="reg-start project-star">*</span>
              <el-input
                v-model="projectName"
                class="projectKeyWordsInput"
                :placeholder="$t('lang.createProject.createProjectNameInput')"></el-input>
              <span class="reg-start project-Ver">{{ verName }}</span>
            </el-form-item>
            <!--      ***************        -->
            <el-form-item :label="$t('lang.createProject.createProjectKeyWords') + ':'">
              <span class="reg-start project-star">*</span>
              <el-select v-model="chain" placeholder="Select">
                <el-option
                  v-for="item in takePlatformListDict"
                  :key="item.id + 'chain'"
                  :label="item.label"
                  :value="item.value"></el-option>
              </el-select>
              <span class="reg-start project-Ver">{{ verKeyword }}</span>
            </el-form-item>
            <!--      ***************        -->
            <el-form-item :label="$t('lang.createProject.createProjectName') + ':'">
              <span class="reg-start project-star">*</span>
              <el-input
                v-model="projectName"
                class="projectKeyWordsInput"
                :placeholder="$t('lang.createProject.createProjectNameInput')"></el-input>
              <span class="reg-start project-Ver">{{ verName }}</span>
            </el-form-item>
            <!--      ***************        -->
            <el-form-item :label="$t('lang.createProject.contractSite') + ':'">
              <span class="reg-start project-star">*</span>
              <div
                v-for="(o, index) in contractSite.data"
                :key="index"
                :class="`contractSiteBox ${index > 0 ? 'contract-site-box-item' : ''}`"
                :offset="index > 0 ? addContract.n : 0">
                <!--   币种平台    -->
                <el-select
                  v-model="contractSite.data[index].platform"
                  class="contractSiteClass"
                  :placeholder="$t('lang.createProject.selectContractClass')">
                  <el-option
                    v-for="item in takePlatformListDict"
                    :key="item.id"
                    :label="item.label"
                    :value="item.value"></el-option>
                </el-select>
                <!--   合约地址    -->
                <el-input
                  v-model="contractSite.data[index].contract_address"
                  class="contractSiteSite"
                  :placeholder="$t('lang.createProject.contractSiteInput')"></el-input>
                <span
                  class="reg-start contract-ver"
                  :style="{ top: 38 + 56 * index + 'px', left: '86px ' }">
                  {{ contractSite.data[index].verAddr }}
                </span>
                <!--   合约标签   -->
                <el-input
                  v-model="contractSite.data[index].label"
                  class="contractSiteLabel"
                  :placeholder="$t('lang.createProject.contractSiteLabel')"></el-input>
                <span
                  class="reg-start contract-ver"
                  :style="{ top: 38 + 56 * index + 'px', left: '41%' }">
                  {{ contractSite.data[index].verContract }}
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
            <el-form-item :label="$t('lang.createProject.createProjectName') + ':'">
              <el-upload
                class="upload-demo"
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                multiple
                :limit="3"
                :on-exceed="handleExceed"
                :file-list="fileList">
                <be-button
                  prev-icon="upload"
                  custom-class="retrieval-btn"
                  title="Click to match the audit according to the contract">
                  select file
                </be-button>
              </el-upload>
            </el-form-item>

            <h2 class="create--label">
              2.Social information
              <be-button
                custom-class="retrieval-btn"
                prev-icon="iconRetrievalEagle"
                title="Click to match the audit according to the contract"
                @click="matchAudit">
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

            <h2 class="create--label">3.Operating information</h2>
            <el-form-item :label="'address markup:'">
              <el-input v-model="websiteForm.telegram" class="projectKeyWordsInput"></el-input>
            </el-form-item>
            <el-form-item :label="'white paper:'">
              <el-input v-model="websiteForm.telegram" class="projectKeyWordsInput"></el-input>
            </el-form-item>
            <el-form-item :label="'operation manual:'">
              <el-input v-model="websiteForm.telegram" class="projectKeyWordsInput"></el-input>
            </el-form-item>
            <el-form-item :label="'on board of exchange:'">
              <el-input v-model="websiteForm.telegram" class="projectKeyWordsInput"></el-input>
            </el-form-item>
            <el-form-item :label="'on test chain:'">
              <el-input v-model="websiteForm.telegram" class="projectKeyWordsInput"></el-input>
            </el-form-item>

            <h2 class="create--label">
              4.{{ $t('lang.projectExplorer.detail.audit') }}
              <be-button
                custom-class="retrieval-btn"
                prev-icon="iconRetrievalEagle"
                title="Click to match the audit according to the contract"
                @click="matchAudit">
                {{ $t('lang.searchBtn') }}
              </be-button>
            </h2>
            <be-tag
              v-for="(item, index) in auditList"
              :key="item.url"
              is-close
              @close="handleClose(index)"
              @click="openWindow(item.url)">
              {{ item.report_name }}
            </be-tag>

            <!--            <el-form-item :label="$t('lang.createProject.createProjectName') + ':'">
                                      <span class="reg-start project-star">*</span>
                                      <el-input
                                        v-model="projectName"
                                        class="projectKeyWordsInput"
                                        :placeholder="$t('lang.createProject.createProjectNameInput')"></el-input>
                                      <span class="reg-start project-Ver">{{ verName }}</span>
                                    </el-form-item>
                                    <el-form-item :label="$t('lang.createProject.createProjectKeyWords') + ':'">
                                      <span class="reg-start project-star">*</span>
                                      <el-input
                                        v-model="projectKeyWords"
                                        class="projectKeyWordsInput"
                                        :placeholder="$t('lang.createProject.createProjectKeyWordsInput')"></el-input>
                                      <span class="reg-start project-Ver">{{ verKeyword }}</span>
                                    </el-form-item>
                                    &lt;!&ndash;        合约地址    &ndash;&gt;
                                    <el-form-item :label="$t('lang.createProject.contractSite') + ':'">
                                      <span class="reg-start project-star">*</span>
                                      <div
                                        v-for="(o, index) in contractSite.data"
                                        :key="index"
                                        :class="`contractSiteBox ${index > 0 ? 'contract-site-box-item' : ''}`"
                                        :offset="index > 0 ? addContract.n : 0">
                                        &lt;!&ndash;   币种平台    &ndash;&gt;
                                        <el-select
                                          v-model="contractSite.data[index].platform"
                                          class="contractSiteClass"
                                          :placeholder="$t('lang.createProject.selectContractClass')">
                                          <el-option
                                            v-for="item in takePlatformListDict"
                                            :key="item.id"
                                            :label="item.label"
                                            :value="item.value"></el-option>
                                        </el-select>
                                        &lt;!&ndash;   合约地址    &ndash;&gt;
                                        <el-input
                                          v-model="contractSite.data[index].contract_address"
                                          class="contractSiteSite"
                                          :placeholder="$t('lang.createProject.contractSiteInput')"></el-input>
                                        <span
                                          class="reg-start contract-ver"
                                          :style="{ top: 38 + 56 * index + 'px', left: '86px ' }">
                                          {{ contractSite.data[index].verAddr }}
                                        </span>
                                        &lt;!&ndash;   合约标签   &ndash;&gt;
                                        <el-input
                                          v-model="contractSite.data[index].label"
                                          class="contractSiteLabel"
                                          :placeholder="$t('lang.createProject.contractSiteLabel')"></el-input>
                                        <span
                                          class="reg-start contract-ver"
                                          :style="{ top: 38 + 56 * index + 'px', left: '41%' }">
                                          {{ contractSite.data[index].verContract }}
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

                                    <el-form-item :label="$t('lang.createProject.associatedAccount') + ':'">
                                      <el-input
                                        v-model="emailList"
                                        class="projectKeyWordsInput"
                                        :placeholder="$t('lang.createProject.createProjectEmailInput')"></el-input>
                                    </el-form-item>
                                    <el-form-item :label="$t('lang.projectExplorer.detail.audit') + ':'">
                                      <be-tag
                                        v-for="(item, index) in auditList"
                                        :key="item.url"
                                        is-close
                                        @close="handleClose(index)"
                                        @click="openWindow(item.url)">
                                        {{ item.report_name }}
                                      </be-tag>
                                      <be-button
                                        custom-class="retrieval-btn"
                                        prev-icon="iconRetrievalEagle"
                                        title="Click to match the audit according to the contract"
                                        @click="matchAudit">
                                        {{ $t('lang.searchBtn') }}
                                      </be-button>
                                    </el-form-item>-->
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
  import { genFileId } from 'element-plus'
  import { useI18n } from 'vue-i18n'
  import {
    createProject,
    getProjectInfo,
    getReport,
    saveEditProject,
  } from '../../../../../api/project-management'
  import { platformListDict } from '../../../../../utils/platform-dict'
  import { platformReg } from '../../../../../utils/verification'
  import { ceSemiSpecialCharReg } from '../../../../../utils/reg'
  // @ts-ignore
  import { BeButton, BeIcon, BeTag } from '../../../../../../public/be-ui/be-ui.es'
  import composition from '../../../../../utils/mixin/common-func'
  import { openWindow, trimStr } from '../../../../../utils/common'
  import config from '../../../../../enums/config'
  import { previewUrl } from '../../../../../enums/link'
  import type { UploadInstance, UploadProps, UploadRawFile, UploadUserFile } from 'element-plus'
  import type { IAuditList, IWebsiteForm } from '../../../../../utils/types'
  import type { IContractInfos, ICreateProj, IReport } from '../../../../../api/project-management'
  import type { IPlatformListItem } from '../../../../../utils/platform-dict'
  // TODO 国际化(label、placeholder)、字段、逻辑（接口对接、权限判断）、重构
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
      const projectName = ref<string>('')
      const projectKeyWords = ref<string>('')
      const emailList = ref<string>('')
      // 聯係地址表單
      const websiteForm = ref<IWebsiteForm>({})
      // 审计列表
      const auditList = ref<Array<IAuditList>>([])
      const labelPosition = ref<string>('left')
      const addContract = ref<number>(0)
      const contractSite = reactive({
        data: [{ platform: 'eth', contract_address: '', label: '', verAddr: '', verContract: '' }],
      })
      // 下拉平台字典
      const takePlatformListDict = ref<Array<IPlatformListItem>>([])
      // 名称校验信息
      const verName = ref<string>('')
      // 关键词校验信息
      const verKeyword = ref<string>('')

      onMounted(() => {
        takePlatformListDict.value = platformListDict
      })

      watch(showDialog, nVal => {
        if (nVal) {
          handleDialogOpen()
        } else {
          // 重置表單
          resetVar()
        }
      })
      // 弹窗类型标识，
      // 弹窗1 用户增加用户项目弹窗，字段 user contact、Basic information、Social information、Operating information
      // 弹窗2 管理员修改用户项目弹窗，字段 user contact、Basic information、Social information、Operating information，与弹窗1 多了个 Social information 匹配
      // 弹窗3 管理员增加、修改系统项目弹窗，字段 Basic information、Social information、Operating information、Audit information
      // 与弹窗2 少了个 user contact ，多了个Audit information，与弹窗1 少了个 user contact ，多了个Audit information，多了个 Social information 匹配
      const dialogType = ref(3)
      /**
       * 弹窗开启处理，根据不同情况处理
       */
      const handleDialogOpen = (): void => {
        // TODO 待重构，后端可能用的同一个接口，可以参数区分，不需要这么多分支判断
        // 用户新增用户项目
        if (props.type === 'add' && props.tabType === 'usr') {
          dialogType.value = 1
          projectName.value = ''
          return
        }
        // 管理员编辑用户项目
        // 这里是在管理员才有的页面，project-manage，且 props.tabType === 'usr'
        if (props.type === 'edit' && props.tabType === 'usr') {
          dialogType.value = 2
          // 獲取詳情信息
          getDetailData()
          return
        }
        // 管理员新增系统项目
        if (props.type === 'add' && props.tabType === 'sys') {
          dialogType.value = 3
          projectName.value = ''
          return
        }
        // 管理员编辑系统项目
        if (props.type === 'edit' && props.tabType === 'sys') {
          dialogType.value = 3
          // 獲取詳情信息
          getDetailData()
          return
        }
      }
      /**
       * 弹窗确认方法
       */
      const createProjectConfirm = async function () {
        // TODO 待重构，后端可能用的同一个接口，可以参数区分
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
          platform: 'eth',
          contract_address: '',
          label: '',
          verAddr: '',
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
        projectName.value = ''
        projectKeyWords.value = ''
        verKeyword.value = ''
        verName.value = ''
        labelPosition.value = 'right'
        addContract.value = 0
        contractSite.data = [
          { platform: 'eth', contract_address: '', label: '', verAddr: '', verContract: '' },
        ]
        emailList.value = ''
        websiteForm.value.website = ''
        websiteForm.value.github = ''
        websiteForm.value.telegram = ''
        websiteForm.value.twitter = ''
        auditList.value = []
      }
      /**
       * 获取风险类型详情数据
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
              projectName.value = res.data.name
              projectKeyWords.value = res.data.keyword
              contractSite.data = res.data.contract_infos
              emailList.value = res.data.email_list.join(';')
              websiteForm.value.website = res.data.website
              websiteForm.value.github = res.data.github
              websiteForm.value.telegram = res.data.telegram
              websiteForm.value.twitter = res.data.twitter
              // 编辑时，如果原数据有审计就使用
              if (res.data.contract_report_list && res.data.contract_report_list.length > 0) {
                auditList.value = res.data.contract_report_list
                createAuditurl()
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
       * 校驗名稱
       * @param {Object} params - 搜索参数
       */
      const verificationName = (params: ICreateProj) => {
        params.name = trimStr(params.name!)
        if (!params.name) {
          verName.value =
            t('lang.pleaseInput') + t('lang.createProject.createProjectName').toLocaleLowerCase()
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
          verKeyword.value =
            t('lang.pleaseInput') +
            t('lang.createProject.createProjectKeyWords').toLocaleLowerCase()
          return false
        }
        // 校驗中英文，分號
        if (params.keyword) {
          const keyword = semicolonVerification(params.keyword)
          if (!ceSemiSpecialCharReg.test(keyword)) {
            verKeyword.value = t('lang.createProject.verCeSemicolonReg')
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
        if (!platformReg[val.platform](val.contract_address)) {
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
        verName.value = ''
        verKeyword.value = ''
        if (!verificationName(params)) return false
        if (!verificationKeyword(params)) return false
        const contractInfos: Array<IContractInfos> = []
        let hasEmpty = false
        const contractInfosParams: Array<IContractInfos> | undefined = params.contract_infos
        contractInfosParams &&
          contractInfosParams.forEach(val => {
            val.verAddr = ''
            val.verContract = ''
            hasEmpty = verificationContractAddr(val as IContractInfos)
            // 填写了合约标签，则进行校验
            if (val.label) {
              const label = semicolonVerification(val.label)
              if (!ceSemiSpecialCharReg.test(label)) {
                val.verContract = t('lang.createProject.verCeSemicolonTag')
                hasEmpty = true
              } else {
                val.label = label
              }
            }
            if (val.contract_address) {
              contractInfos.push(val)
            }
          })
        if (hasEmpty) {
          return false
        }
        if (contractInfos.length === 0) {
          const msg = t('lang.createProject.verInfo')
          message('warning', msg)
          return false
        }
        contractInfos && (params.contract_infos = contractInfos)
        return true
      }
      /**
       * 处理格式化参数
       */
      const setParams = (params: Array<IContractInfos> | undefined) => {
        params &&
          params.map(val => {
            return {
              platform: val.platform,
              contract_address: val.contract_address,
              label: val.label,
            }
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
      const createAuditurl = (): void => {
        const prevUrl =
          String(import.meta.env.VITE_PROJECT_ENV) === 'production' ? '/hermit/back' : ''
        const baseURL = config.baseURL
        auditList.value.forEach((val: any) => {
          val.url = `${baseURL}${prevUrl}${previewUrl}?fileUuid=${val.uuid}&reportNum=${val.report_num}`
        })
      }
      /**
       * 确认增加项目方法
       */
      const addProject = () => {
        const params: ICreateProj = {
          name: projectName.value,
          keyword: projectKeyWords.value,
          contract_infos: contractSite.data,
          ...websiteForm.value,
          email_list: emailList.value.split(';'),
          report_id_list: [],
        }
        // 表单校验
        if (!formVerification(params)) {
          return
        }
        setParams(params.contract_infos)
        params.report_id_list = handleAuditParams(auditList.value)
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
          name: projectName.value,
          keyword: projectKeyWords.value,
          contract_infos: contractSite.data,
          ...websiteForm.value,
          email_list: emailList.value.split(';'),
          report_id_list: [],
        }
        const pathParams = {
          id: props.projectId,
        }
        // 表单校验
        if (!formVerification(params)) {
          return
        }
        setParams(params.contract_infos)
        params.report_id_list = handleAuditParams(auditList.value)
        saveEditProject(params, pathParams)
          .then(res => {
            if (!res) {
              return
            }
            if (res) {
              message('success', `${t('lang.edit')} ${t('lang.success')}`)
              // 更新列表
              props.getList('reset')
              showDialog.value = false
            }
          })
          .catch(err => {
            message('error', err.message || err)
            console.error(err)
          })
      }
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
              createAuditurl()
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

      const upload = ref<UploadInstance>()
      const fileList = ref<UploadUserFile[]>([
        {
          name: 'foossssssssssssssssssssd.jpeg',
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
        },
        {
          name: 'food2.jpeg',
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
        },
      ])

      const handleRemove: UploadProps['onRemove'] = (file, uploadFiles) => {
        console.log(file, uploadFiles)
      }

      const handlePreview: UploadProps['onPreview'] = uploadFile => {
        console.log(uploadFile)
      }

      const handleExceed: UploadProps['onExceed'] = (files, uploadFiles) => {
        upload.value!.clearFiles()
        const file = files[0] as UploadRawFile
        file.uid = genFileId()
        upload.value!.handleStart(file)
      }

      const beforeRemove: UploadProps['beforeRemove'] = (uploadFile, uploadFiles) => {
        console.log(111)
      }
      return {
        handlePreview,
        handleRemove,
        fileList,
        handleExceed,
        beforeRemove,
        matchAudit,
        openWindow,
        handleClose,
        auditList,
        emailList,
        showDialog,
        projectName,
        projectKeyWords,
        labelPosition,
        addContract,
        contractSite,
        takePlatformListDict,
        verName,
        verKeyword,
        websiteForm,
        resetVar,
        semicolonVerification,
        verificationName,
        verificationKeyword,
        verificationContractAddr,
        formVerification,
        setParams,
        addProject,
        editProject,
        createProjectConfirm,
        createProjectCancel,
        addContractSite,
        deleteContractSite,
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

  .contractSiteSite {
    width: 322px;
    margin-left: 8px;
  }

  .contractSiteLabel {
    width: 600px;
    margin-left: 8px;
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
