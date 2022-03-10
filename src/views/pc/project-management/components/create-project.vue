<template>
    <div>
        <div class="createBox">
            <el-dialog
                :close-on-click-modal="false"
                class="createProjectBox"
                :title="type === 'add' ? $t('lang.createProject.createProjectTitle') : $t('lang.createProject.editProjectTitle')"
                v-model="createProjectWindow"
                width="1000px">
                <div>
                    <el-form :label-position="labelPosition" label-width="140px" class="projectForm">
                        <el-form-item :label="$t('lang.createProject.createProjectName') + ':'">
                            <span class="reg-start project-star">*</span>
                            <el-input class="projectKeyWordsInput" v-model="projectName"
                                      :placeholder="$t('lang.createProject.createProjectNameInput')"></el-input>
                            <span class="reg-start project-Ver">{{ verName }}</span>
                        </el-form-item>
                        <el-form-item :label="$t('lang.createProject.createProjectKeyWords') + ':'">
                            <span class="reg-start project-star">*</span>
                            <el-input class="projectKeyWordsInput" v-model="projectKeyWords"
                                      :placeholder="$t('lang.createProject.createProjectKeyWordsInput')"></el-input>
                            <span class="reg-start project-Ver">{{ verKeyword }}</span>
                        </el-form-item>
                        <!--        合约地址    -->
                        <el-form-item :label="$t('lang.createProject.contractSite') + ':'">
                            <span class="reg-start project-star">*</span>
                            <div :class="`contractSiteBox ${index > 0 ? 'contract-site-box-item' : ''}`" v-for="(o,index) in contractSite.data"
                                 :key="index" :offset="index > 0 ? addContract.n : 0">
                                <!--   币种平台    -->
                                <el-select v-model="contractSite.data[index].platform" class="contractSiteClass"
                                           :placeholder="$t('lang.createProject.selectContractClass')">
                                    <el-option :label="item.label" :value="item.value" v-for="(item) in takePlatformListDict" :key="item.id"></el-option>
                                </el-select>
                                <!--   合约地址    -->
                                <el-input v-model="contractSite.data[index].contract_address" class="contractSiteSite"
                                          :placeholder="$t('lang.createProject.contractSiteInput')"></el-input>
                                <span class="reg-start contract-ver" :style="{top:38 + 56 * index + 'px',left:'86px '}">
                                    {{contractSite.data[index].verAddr}}
                                </span>
                                <!--   合约标签   -->
                                <el-input v-model="contractSite.data[index].label" class="contractSiteLabel"
                                          :placeholder="$t('lang.createProject.contractSiteLabel')"></el-input>
                                <span class="reg-start contract-ver" :style="{top:38 + 56 * index + 'px',left:'41%'}">
                                    {{contractSite.data[index].verContract}}
                                </span>
                                <div class="btn-border"
                                     v-show="index < contractSite.data.length && index > 0"
                                     @click="deleteContractSite(index)">
                                    <span class="subtract-create"></span>
                                </div>
                                <div class="btn-border"
                                     v-show="index === 0"
                                     @click="addContractSite">
                                    <be-icon icon ="add" class="add-create"></be-icon>
                                </div>
                            </div>
                        </el-form-item>
                        <!--        聯係地址 - WebSite    -->
                        <el-form-item :label="'WebSite:'">
                            <el-input class="projectKeyWordsInput" v-model="websiteForm.website"></el-input>
                        </el-form-item>
                        <!--        聯係地址 - GitHub    -->
                        <el-form-item :label="'GitHub:'">
                            <el-input class="projectKeyWordsInput" v-model="websiteForm.github"></el-input>
                        </el-form-item>
                        <!--        聯係地址 - Twitter    -->
                        <el-form-item :label="'Twitter:'">
                            <el-input class="projectKeyWordsInput" v-model="websiteForm.twitter"></el-input>
                        </el-form-item>
                        <!--        聯係地址 - Telegram    -->
                        <el-form-item :label="'Telegram:'">
                            <el-input class="projectKeyWordsInput" v-model="websiteForm.telegram"></el-input>
                        </el-form-item>
                        <el-form-item :label="$t('lang.createProject.associatedAccount') + ':'">
                            <el-input class="projectKeyWordsInput"
                                      :placeholder="$t('lang.createProject.createProjectEmailInput')"
                                      v-model="emailList"></el-input>
                        </el-form-item>

                    </el-form>
                </div>
                <template #footer>
                    <span class="dialog-footer">
                        <be-button type="success"
                                   customClass="eagle-cancel-btn"
                                   @click="createProjectCancel">
                            {{ $t('lang.createProject.createProjectCancel') }}
                        </be-button>
                        <be-button
                            type="success"
                            customClass="eagle-btn"
                            @click="createProjectConfirm">{{ $t('lang.createProject.createProjectConfirm') }}</be-button>
                    </span>
                </template>
            </el-dialog>
        </div>
    </div>


</template>

<script lang="ts">

import {createProject, getProjectInfo, ICreateProj, saveEditProject,IContractInfos} from "../../../../api/project-management";
import {platformListDict,IPlatformListItem} from "../../../../utils/platform-dict";
import {defineComponent, ref, reactive, watch, onMounted} from "vue"
import {useI18n} from "vue-i18n";

import {ceSemiSpecialCharReg,ETHaddress} from "../../../../utils/reg";
import {BeButton, BeIcon} from "../../../../../public/be-ui/be-ui.es";
import composition from "../../../../utils/mixin/common-func";
import {IOption} from "../../../../utils/types";
interface IWebsiteForm {
    website?:string
    github?:string
    twitter?:string
    telegram?:string
}
export default defineComponent({
    name: "CreateProject",
    components:{BeIcon,BeButton},
    props: {
        // 操作類型
        type: {
            type: String,
            default: 'add'
        },
        // 项目id
        projectId: {
            type: [String,Number],
            default: ''
        },
        getList: {
            type: Function,
            default: ()=>{
                return Function
            }
        }
    },
    setup(props,ctx){
        const {t} = useI18n()
        const {message} = composition(props, ctx)
        const createProjectWindow = ref<boolean>(false)
        const projectName= ref<string>('')
        const projectKeyWords= ref<string>('')
        const emailList = ref<string>('')

        const labelPosition= ref<string>('right')
        const addContract= ref<number>(0)
        const contractSite=reactive({data: [{platform: 'eth', contract_address: '', label: '',verAddr:'',verContract:''}]})
        // 下拉平台字典
        const takePlatformListDict=ref<Array<IPlatformListItem>>([])
        // 名称校验信息
        const verName= ref<string>('')
        // 关键词校验信息
        const verKeyword= ref<string>('')

        onMounted(()=>{
            takePlatformListDict.value = platformListDict
        })

        watch(createProjectWindow,(nVal)=>{
            if (nVal) {
                // 獲取詳情信息
                getDetailData()
            } else {
                // 重置表單
                resetVar()
            }
        })

        /**
         * 弹窗确认方法
         */
        const createProjectConfirm =  async function() {
            if(props.type === 'add'){
                await addProject()
            }
            if(props.type === 'edit'){
                await editProject()
            }
        }
        /**
         * 弹窗取消方法
         */
        const createProjectCancel = () => {
            createProjectWindow.value = false
        }
        const addContractSite = () => {
            contractSite.data.push({platform: 'eth', contract_address: '', label: '',verAddr:'',verContract:''})
        }
        const deleteContractSite = (i:number) => {
            contractSite.data.splice(i, 1)
        }
        /**
         * 重置參數變量
         */
        const resetVar = () => {
            createProjectWindow.value = false
            projectName.value = ''
            projectKeyWords.value = ''
            verKeyword.value = ''
            verName.value = ''
            labelPosition.value='right'
            addContract.value= 0
            contractSite.data = [{platform: 'eth', contract_address: '', label: '',verAddr:'',verContract:''}]
            emailList.value = ''
            websiteForm.value.website = ''
            websiteForm.value.github = ''
            websiteForm.value.telegram = ''
            websiteForm.value.twitter = ''

        }
        /**
         * 获取风险类型详情数据
         */
        const getDetailData = () => {
            if (props.type === 'add') {
                projectName.value = ''
                return
            }
            const params = {
                id: props.projectId
            }
            getProjectInfo( params).then(res => {
                if (res) {
                    projectName.value = res.data.name
                    projectKeyWords.value = res.data.keyword
                    contractSite.data = res.data.contract_infos
                    emailList.value = res.data.email_list.join(';')
                    websiteForm.value.website = res.data.website
                    websiteForm.value.github = res.data.github
                    websiteForm.value.telegram = res.data.telegram
                    websiteForm.value.twitter = res.data.twitter
                }
            }).catch(err => {
                const msg = t('lang.search') + t('lang.failed')
                message('error', msg)
                console.error(err)
            })
        }
        /**
         * 分号处理方法
         * @param {String} params - 处理字符串
         */
        const semicolonVerification = (params:string) => {
            // 那中文分号处理成英文
            let res = params.replace('；',';')
            // 如果最后一个字符是分号，去除末尾的符号
            if(res.charAt(res.length-1) === '；' || res.charAt(res.length-1) === ';'){
                res = res.substring(0,res.length -1)
            }
            return res
        }
        /**
         * 校驗名稱
         * @param {Object} params - 搜索参数
         */
        const verificationName = (params:ICreateProj) => {
            if(!params.name){
                verName.value = t('lang.pleaseInput') + t('lang.createProject.createProjectName')
                return false
            }
            // if(params.name && !ceReg.test(params.name)){
            //     verName.value = t('lang.createProject.verCE')
            //     return false
            // }
            return true
        }
        /**
         * 校驗關鍵詞
         * @param {Object} params - 搜索参数
         */
        const verificationKeyword = (params:ICreateProj) => {
            if(!params.keyword){
                verKeyword.value = t('lang.pleaseInput') + t('lang.createProject.createProjectKeyWords')
                return false
            }
            // 校驗中英文，分號
            if(params.keyword){
                let keyword = semicolonVerification(params.keyword)
                if(!ceSemiSpecialCharReg.test(keyword)){
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
        const verificationContractAddr = (val:any):boolean => {
            const platformReg:IOption = {
                bsc:function (addr:string) {
                    return ETHaddress.test(addr)
                },
                eth:function (addr:string) {
                    return ETHaddress.test(addr)
                },
                heco:function (addr:string) {
                    return ETHaddress.test(addr)
                },
                polygon:function (addr:string) {
                    return ETHaddress.test(addr)
                },
            }
            // 没有填写合约地址
            if(!val.contract_address){
                val.verAddr = t('lang.pleaseInput')+ t('lang.createProject.contractSite')
                return true
            }
            // 校验地址格式
            if(!platformReg[val.platform](val.contract_address)){
                val.verAddr = t('lang.createProject.contractSite')+ t('lang.formatError')
                return true
            }
            return false
        }
        /**
         * 表單校驗方法
         * @param {Object} params - 搜索参数
         */
        const formVerification = (params:ICreateProj) =>{
            verName.value = ''
            verKeyword.value = ''
            if(!verificationName(params)) return false
            if(!verificationKeyword(params)) return false
            let contractInfos:Array<IContractInfos> = []
            let hasEmpty = false
            const contract_infos:Array<IContractInfos> | undefined = params.contract_infos
            contract_infos && contract_infos.forEach(val=>{
                val.verAddr = ''
                val.verContract = ''
                hasEmpty = verificationContractAddr(val as IContractInfos)
                // 填写了合约标签，则进行校验
                if(val.label){
                    let label = semicolonVerification(val.label)
                    if(!ceSemiSpecialCharReg.test(label)){
                        val.verContract = t('lang.createProject.verCeSemicolonTag')
                        hasEmpty = true
                    }else{
                        val.label = label
                    }

                }
                if(val.contract_address){
                    contractInfos.push(val)
                }
            })
            if(hasEmpty) {
                return false
            }
            if(contractInfos.length === 0) {
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
        const setParams = (params:Array<IContractInfos> | undefined) => {
            params && params.map((val)=>{
                return {
                    platform:val.platform,
                    contract_address:val.contract_address,
                    label:val.label
                }
            })
        }
        /**
         * 确认增加项目方法
         */
        const addProject = () => {
            let params:ICreateProj = {
                name:projectName.value,
                keyword:projectKeyWords.value,
                contract_infos:contractSite.data,
                ...websiteForm.value,
                email_list:emailList.value.split(';'),
            }
            // 表单校验
            if(!formVerification(params)){
                /*this.$forceUpdate()*/
                return
            }
            setParams(params.contract_infos)
            createProject(params).then((res:any)=>{
                if(res && res.data){
                    const msg = t('lang.add')+ t('lang.success')
                    message('success', msg)
                    // 更新列表
                    props.getList('reset')
                    createProjectWindow.value = false
                }else{
                    message('warning', res.message || res)
                }
            }).catch(err=>{
                message('error', err.message || err)
                console.error(err)
            })

        }
        /**
         * 确认编辑项目方法
         */
        const editProject = () => {
            let params:ICreateProj = {
                name:projectName.value,
                keyword:projectKeyWords.value,
                contract_infos:contractSite.data,
                ...websiteForm.value,
                email_list:emailList.value.split(';'),
            }
            const pathParams = {
                id: props.projectId
            }
            // 表单校验
            if(!formVerification(params)){
                /*this.$forceUpdate()*/
                return
            }
            setParams(params.contract_infos)
            saveEditProject(params,pathParams).then(res=>{
                if(res){
                    const msg = t('lang.edit')+ t('lang.success')
                    message('success', msg)
                    // 更新列表
                    props.getList('reset')
                    createProjectWindow.value = false
                }
            }).catch(err=>{
                message('error', err.message || err)
                console.error(err)
            })
        }
        // 聯係地址表單
        const websiteForm = ref<IWebsiteForm>({})
        return{
            emailList,
            createProjectWindow,
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
            getDetailData,
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
            deleteContractSite
        }
    },
})
</script>

<style lang="scss">
.createBox{

  .el-dialog__title{
    font-family: AlibabaPuHuiTi-Regular, sans-serif;
    color: $mainColor3;
  }

  .el-input__inner {
    height: 40px;
    border-radius: 2px;
  }

  .project-star{
    position: absolute;
    top: 4px;
    left: -152px;
  }

  .project-Ver{
    position: absolute;
    top: 34px;
    left: 0;
  }

  .contract-ver{
    position: absolute;
    left: 0;
  }
}

.projectKeyWordsInput {
  width: 772px;
}

.btn-border{
  display:flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  margin-left: 12px;
  border: solid 1px darkgray;
  border-radius: 2px;

  .add-create{

    .be-icon{
      fill:darkgray
    }
  }
}

.btn-border:hover{
  border-color: $mainColor3;

  .add-create{

    .be-icon{
      fill:$mainColor3
    }
  }

  .subtract-create{
    border: solid 1px $mainColor3;
  }
}


.subtract-create{
  width: 14px;
  border: solid 1px darkgray;
}

.el-form-item__content::after, .el-form-item__content::before {
  display: none;
}

.contractSiteBox {
  display: flex;
  align-items: center;
  width: 800px;
  margin-top: 8px;
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
</style>