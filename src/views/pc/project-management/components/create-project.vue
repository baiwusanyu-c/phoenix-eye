<template>
    <div>
        <div class="createBox">
            <el-dialog
                :close-on-click-modal="false"
                class="createProjectBox"
                :title="type === 'add' ? $t('lang.createProject.createProjectTitle') : $t('lang.createProject.editProjectTitle')"
                v-model="createProjectWindow"
                width="970px">
                <div>
                    <el-form :label-position="labelPosition" label-width="130px" class="projectForm">
                        <el-form-item :label="$t('lang.createProject.createProjectName') + ':'">
                            <span class="reg-start project-star">*</span>
                            <el-input class="projectNameInput" v-model="projectName"
                                      :placeholder="$t('lang.createProject.createProjectNameInput')"></el-input>
                            <span class="reg-start project-Ver">{{ verName }}</span>
                            <span class="projectOpenTitle">{{ $t('lang.createProject.createProjectOpenTitle') }}</span>
                            <el-switch v-model="openTF"></el-switch>
                            <span class="projectOpenSecret">{{ isPublic }}</span>
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
                                    <div class="plus-create">+</div>
                                </div>
                            </div>
                        </el-form-item>
                    </el-form>
                </div>
                <template #footer>
                    <span class="dialog-footer">
                        <el-button class="default" type="primary"
                                   @click="createProjectCancel">{{ $t('lang.createProject.createProjectCancel') }}</el-button>
                        <el-button class="primary hbjbh" type="primary"
                                   @click="createProjectConfirm">{{ $t('lang.createProject.createProjectConfirm') }}</el-button>
                    </span>
                </template>
            </el-dialog>
        </div>
    </div>


</template>

<script lang="ts">
import {createProject, getProjectInfo, saveEditProject} from "../../../../api/project-management";
import {platformListDict,IPlatformListItem} from "../../../../utils/platform-dict";
import {defineComponent, ref, reactive, computed, watch, onMounted, toRaw, inject} from "vue"
import {useI18n} from "vue-i18n";
import {ElMessage} from "element-plus/es";
import {ceReg,ceSemicolonReg,ETHaddress} from "../../../../utils/reg";

export default defineComponent({
    name: "CreateProject",
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
        const createProjectWindow = ref<boolean>(false)
        const projectName= ref<string>('')
        const projectKeyWords= ref<string>('')
        const openTF= ref<boolean>(true)
        const labelPosition= ref<string>('right')
        const addContract= ref<number>(0)
        const contractSite=reactive({data: [{platform: 'eth', contract_address: '', label: '', verAddr: '', verContract: ''}]})
        // 下拉平台字典
        const takePlatformListDict=ref<Array<IPlatformListItem>>([])
        // 名称校验信息
        const verName= ref<string>('')
        // 关键词校验信息
        const verKeyword= ref<string>('')

        onMounted(()=>{
            takePlatformListDict.value = platformListDict
        })
        const isPublic = computed(()=>{
            if(openTF.value){
                return t('lang.createProject.createProjectUnSecret')
            }else{
                return t('lang.createProject.createProjectOpenSecret')
            }
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
        const deleteContractSite = (i) => {
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
            openTF.value = true
            labelPosition.value='right'
            addContract.value= 0
            contractSite.data = [{platform: 'eth', contract_address: '', label: '',verAddr:'',verContract:''}]

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
                    openTF.value = res.data.is_public
                    projectKeyWords.value = res.data.keyword
                    contractSite.data = res.data.contract_infos
                }
            }).catch(err => {
                const msg = t('lang.search') + t('lang.failed')
                ElMessage.error(msg)
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
        const verificationName = (params:object) => {
            if(!params.name){
                verName.value = t('lang.pleaseInput') + t('lang.createProject.createProjectName')
                return false
            }
            if(params.name && !ceReg.test(params.name)){
                verName.value = t('lang.createProject.verCE')
                return false
            }
            return true
        }
        /**
         * 校驗關鍵詞
         * @param {Object} params - 搜索参数
         */
        const verificationKeyword = (params:object) => {
            if(!params.keyword){
                verKeyword.value = t('lang.pleaseInput') + t('lang.createProject.createProjectKeyWords')
                return false
            }
            // 校驗中英文，分號
            if(params.keyword){
                let keyword = semicolonVerification(params.keyword)
                if(!ceSemicolonReg.test(keyword)){
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
        const verificationContractAddr = (val) => {
            const platformReg = {
                bsc:(addr)=>ETHaddress.test(addr),
                eth:(addr)=>ETHaddress.test(addr),
                heco:(addr)=>ETHaddress.test(addr),
                polygon:(addr)=>ETHaddress.test(addr),
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
        const formVerification = (params:object) =>{
            verName.value = ''
            verKeyword.value = ''
            if(!verificationName(params)) return false
            if(!verificationKeyword(params)) return false
            let contractInfos:Array<any> = []
            let hasEmpty = false
            params.contract_infos.forEach(val=>{
                val.verAddr = ''
                val.verContract = ''
                hasEmpty = verificationContractAddr(val)
                // 填写了合约标签，则进行校验
                if(val.label){
                    let label = semicolonVerification(val.label)
                    if(!ceSemicolonReg.test(label)){
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
                ElMessage.warning(msg)
                return false
            }
            params.contract_infos = contractInfos
            return true
        }
        /**
         * 处理格式化参数
         */
        const setParams = (params) => {
            params.map((val)=>{
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
            let params = {
                name:projectName.value,
                is_public:openTF.value,
                keyword:projectKeyWords.value,
                contract_infos:toRaw(contractSite.data)
            }
            // 表单校验
            if(!formVerification(params)){
                /*this.$forceUpdate()*/
                return
            }
            setParams(params.contract_infos)
            createProject(params).then(res=>{
                if(res){
                    const msg = t('lang.add')+ t('lang.success')
                    ElMessage.success(msg)
                    // 更新列表
                    props.getList()
                    createProjectWindow.value = false
                }
            }).catch(err=>{
                ElMessage.error(err.message)
                console.error(err)
            })

        }
        /**
         * 确认编辑项目方法
         */
        const editProject = () => {
            let params = {
                name:projectName.value,
                is_public:openTF.value,
                keyword:projectKeyWords.value,
                contract_infos:contractSite.data
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
                    ElMessage.success(msg)
                    // 更新列表
                    props.getList()
                    createProjectWindow.value = false
                }
            }).catch(err=>{
                ElMessage.error(err.message)
                console.error(err)
            })
        }

        return{
            createProjectWindow,
            projectName,
            projectKeyWords,
            openTF,
            labelPosition,
            addContract,
            contractSite,
            takePlatformListDict,
            verName,
            verKeyword,
            isPublic,
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
    /*data() {
        return {
            createProjectWindow: false,
            projectName: '',
            projectKeyWords: '',
            openTF: true,
            labelPosition: 'right',
            addContract: 0,
            contractSite:[{platform: 'eth', contract_address: '', label: '',verAddr:'',verContract:''}],
            // 下拉平台字典
            platformListDict:[],
            // 名称校验信息
            verName:'',
            // 关键词校验信息
            verKeyword:''
        }
    },
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
        }
    },
    computed:{
      isPublic(){
          if(this.openTF){
              return this.$t('el.createProject.createProjectUnSecret')
          }else{
              return this.$t('el.createProject.createProjectOpenSecret')
          }
      }
    },
    watch: {
        createProjectWindow(nVal) {
            if (nVal) {
                // 獲取詳情信息
                this.getDetailData()
            } else {
                // 重置表單
                this.resetVar()
            }
        }
    },
    created() {
        this.platformListDict = platformListDict
    },
    methods: {
        /!**
         * 弹窗确认方法
         *!/
        async createProjectConfirm() {
            if(this.type === 'add'){
                await this.addProject()
            }
            if(this.type === 'edit'){
                await this.editProject()
            }
        },
        /!**
         * 弹窗取消方法
         *!/
        createProjectCancel() {
            this.createProjectWindow = false
        },
        addContractSite() {
            this.contractSite.push({platform: 'eth', contract_address: '', label: '',verAddr:'',verContract:''})
        },
        deleteContractSite(i) {
            this.contractSite.splice(i, 1)
        },
        /!**
         * 重置參數變量
         *!/
        resetVar() {
            this.createProjectWindow = false
            this.projectName = ''
            this.projectKeyWords = ''
            this.verKeyword = ''
            this.verName = ''
            this.openTF = true
            this.labelPosition='right'
            this.addContract= 0
            this.contractSite=[{platform: 'eth', contract_address: '', label: '',verAddr:'',verContract:''}]

        },
        /!**
         * 获取风险类型详情数据
         *!/
        getDetailData() {
            const _this = this
            if (this.type === 'add') {
                this.projectName = ''
                return
            }
            const params = {
                id: this.projectId
            }
            getProjectInfo( params).then(res => {
                if (res) {
                    _this.projectName = res.data.name
                    _this.openTF = res.data.is_public
                    _this.projectKeyWords = res.data.keyword
                    _this.contractSite = res.data.contract_infos
                }
            }).catch(err => {
                const msg = _this.$t('el.search') + _this.$t('el.failed')
                _this.$message.error(msg)
                console.error(err)
            })
        },
        /!**
         * 分号处理方法
         * @param {String} params - 处理字符串
         *!/
        semicolonVerification(params){
            // 那中文分号处理成英文
            let res = params.replace('；',';')
            // 如果最后一个字符是分号，去除末尾的符号
            if(res.charAt(res.length-1) === '；' || res.charAt(res.length-1) === ';'){
                res = res.substring(0,res.length -1)
            }
            return res
        },
        /!**
         * 校驗名稱
         * @param {Object} params - 搜索参数
         *!/
        verificationName(params){
            if(!params.name){
                this.verName = this.$t('el.pleaseInput') + this.$t('el.createProject.createProjectName')
                return false
            }
            if(params.name && !this.ceReg.test(params.name)){
                this.verName = this.$t('el.createProject.verCE')
                return false
            }
            return true
        },
        /!**
         * 校驗關鍵詞
         * @param {Object} params - 搜索参数
         *!/
        verificationKeyword(params){
            if(!params.keyword){
                this.verKeyword = this.$t('el.pleaseInput') + this.$t('el.createProject.createProjectKeyWords')
                return false
            }
            // 校驗中英文，分號
            if(params.keyword){
                let keyword = this.semicolonVerification(params.keyword)
                if(!this.ceSemicolonReg.test(keyword)){
                    this.verKeyword = this.$t('el.createProject.verCeSemicolonReg')
                    return false
                }
                params.keyword = keyword
            }
            return true
        },
        /!**
         * 校验合约地址
         *!/
        verificationContractAddr(val){
            const platformReg = {
                bsc:(addr)=>this.ETHaddress.test(addr),
                eth:(addr)=>this.ETHaddress.test(addr),
                heco:(addr)=>this.ETHaddress.test(addr),
                polygon:(addr)=>this.ETHaddress.test(addr),
            }
            // 没有填写合约地址
            if(!val.contract_address){
                val.verAddr = this.$t('el.pleaseInput')+ this.$t('el.createProject.contractSite')
                return true
            }
            // 校验地址格式
            if(!platformReg[val.platform](val.contract_address)){
                val.verAddr = this.$t('el.createProject.contractSite')+ this.$t('el.formatError')
                return true
            }
            return false
        },
        /!**
         * 表單校驗方法
         * @param {Object} params - 搜索参数
         *!/
        formVerification(params){
            this.verName = ''
            this.verKeyword = ''
            if(!this.verificationName(params)) return false
            if(!this.verificationKeyword(params)) return false
            let contractInfos = []
            let hasEmpty = false
            params.contract_infos.forEach(val=>{
                val.verAddr = ''
                val.verContract = ''
                hasEmpty = this.verificationContractAddr(val)
                // 填写了合约标签，则进行校验
                if(val.label){
                    let label = this.semicolonVerification(val.label)
                    if(!this.ceSemicolonReg.test(label)){
                        val.verContract = this.$t('el.createProject.verCeSemicolonTag')
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
                const msg = this.$t('el.createProject.verInfo')
                this.$message.warning(msg)
                return false
            }
            params.contract_infos = contractInfos
            return true
        },
        /!**
         * 处理格式化参数
         *!/
        setParams(params){
            params.map((val)=>{
                return {
                    platform:val.platform,
                    contract_address:val.contract_address,
                    label:val.label
                }
            })
        },
        /!**
         * 确认增加项目方法
         *!/
        addProject(){
            const _this = this
            let params = {
                name:_this.projectName,
                is_public:_this.openTF,
                keyword:_this.projectKeyWords,
                contract_infos:_this.contractSite
            }
            // 表单校验
            if(!this.formVerification(params)){
                this.$forceUpdate()
                return
            }
            this.setParams(params.contract_infos)
            createProject(params).then(res=>{
                if(res){
                    const msg = _this.$t('el.add')+ _this.$t('el.success')
                    _this.$message.success(msg)
                    // 更新列表
                    _this.$parent.getList()
                    _this.createProjectWindow = false
                }
            }).catch(err=>{
                _this.$message.error(err.message)
                console.error(err)
            })

        },
        /!**
         * 确认编辑项目方法
         *!/
        editProject(){
            const _this = this
            let params = {
                name:_this.projectName,
                is_public:_this.openTF,
                keyword:_this.projectKeyWords,
                contract_infos:_this.contractSite
            }
            const pathParams = {
                id: this.projectId
            }
            // 表单校验
            if(!this.formVerification(params)){
                this.$forceUpdate()
                return
            }
            this.setParams(params.contract_infos)
            saveEditProject(params,pathParams).then(res=>{
                if(res){
                    const msg = _this.$t('el.edit')+ _this.$t('el.success')
                    _this.$message.success(msg)
                    // 更新列表
                    _this.$parent.getList()
                    _this.createProjectWindow = false
                }
            }).catch(err=>{
                _this.$message.error(err.message)
                console.error(err)
            })
        }
    }*/
})
</script>

<style lang="scss">
.createBox{
  .el-input__inner {
        height: 40px;
        border-radius: 2px;
    }
  .project-star{
    position: absolute;
    top: 4px;
    left: -142px;
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

.projectNameInput {
  width: 440px;
}

.projectKeyWordsInput {
  width: 682px;
}

/* .subtract:hover{
    .svg-icon.subtract-btn{
        fill:#0468C2
    }
}

.svg-icon.subtract-btn{
    margin-left: 11px;
    width: 20px;
    height: 20px;
    vertical-align: -0.3em;
    fill: gray;
    overflow: hidden;
    font-size: 15px;
} */



.btn-border{
  display:flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  margin-left: 12px;
  border: solid 1px darkgray;
  border-radius: 2px;
}

.btn-border:hover{
  border-color: #0468C2;

  /*.svg-icon.add-create{
    fill:#0468C2
  }*/
  .plus-create{
      color: #81b3e0;
  }

  .subtract-create{
    border: solid 1px #81b3e0;
  }
}
.plus-create{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    user-select: none;
    cursor: default;
    font-size: 27px;
    color: darkgray;
}
.subtract-create{
  width: 14px;
  border: solid 1px darkgray;
}

.svg-icon.add-create{
  width: 14px;
  height: 14px;
  overflow: hidden;
  font-size: 15px;
  vertical-align: -.3em;
  fill: gray;
}




.el-form-item__content::after, .el-form-item__content::before {
  display: none;
}

.projectOpenTitle {
  margin-left: 45px;
}

.projectOpenSecret {
  margin-left: 16px;
}

.contractSiteBox {
  display: flex;
  align-items: center;
  margin-top: 8px;
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
</style>