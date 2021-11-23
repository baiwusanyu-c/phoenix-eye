<template>
    <div>
        <div class="createBox">
            <el-dialog
                class="createProjectBox"
                :title="$t('el.createProject.createProjectTitle')"
                :visible.sync="createProjectWindow"
                width="856px">
                <div>
                    <el-form :label-position="labelPosition" label-width="80px" class="projectForm">
                        <el-form-item :label="$t('el.createProject.createProjectName') + ':'">
                            <span class="reg-start project-star">*</span>
                            <el-input class="projectNameInput" v-model="projectName"
                                      :placeholder="$t('el.createProject.createProjectNameInput')"></el-input>
                            <span class="reg-start project-Ver">{{ verName }}</span>
                            <span class="projectOpenTitle">{{ $t('el.createProject.createProjectOpenTitle') }}</span>
                            <el-switch v-model="openTF"></el-switch>
                            <span class="projectOpenSecret">{{ $t('el.createProject.createProjectOpenSecret') }}</span>
                        </el-form-item>
                        <el-form-item :label="$t('el.createProject.createProjectKeyWords') + ':'">
                            <span class="reg-start project-star">*</span>
                            <el-input class="projectKeyWordsInput" v-model="projectKeyWords"
                                      :placeholder="$t('el.createProject.createProjectKeyWordsInput')"></el-input>
                            <span class="reg-start project-Ver">{{ verKeyword }}</span>
                        </el-form-item>
                        <!--        合约地址    -->
                        <el-form-item :label="$t('el.createProject.contractSite') + ':'">
                            <span class="reg-start project-star">*</span>
                            <div :class="`contractSiteBox ${index > 0 ? 'contract-site-box-item' : ''}`" v-for="(o,index) in contractSite"
                                 :key="index" :offset="index > 0 ? addContract.n : 0">
                                <!--   币种平台    -->
                                <el-select v-model="contractSite[index].platform" class="contractSiteClass"
                                           :placeholder="$t('el.createProject.selectContractClass')">
                                    <el-option :label="item.label" :value="item.value" v-for="(item) in platformListDict" :key="item.id"></el-option>
                                </el-select>
                                <!--   合约地址    -->
                                <el-input v-model="contractSite[index].contract_address" class="contractSiteSite"
                                          :placeholder="$t('el.createProject.contractSiteInput')"></el-input>
                                <span class="reg-start contract-ver" :style="{top:38 + 56 * index + 'px',left:'120px'}">
                                    {{contractSite[index].verAddr}}
                                </span>
                                <!--   合约标签   -->
                                <el-input v-model="contractSite[index].label" class="contractSiteLabel"
                                          :placeholder="$t('el.createProject.contractSiteLabel')"></el-input>
                                <div class="btn-border"
                                     v-show="index < contractSite.length && index > 0"
                                     @click="deleteContractSite(index)">
                                    <span class="subtract-create"></span>
                                </div>
                                <div class="btn-border"
                                     v-show="index === 0"
                                     @click="addContractSite">
                                    <svg-icon icon-class="add" class="add-create" disabled-tool-tip></svg-icon>
                                </div>
                            </div>
                        </el-form-item>
                    </el-form>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button class="default" type="primary"
                               @click="createProjectCancel">{{ $t('el.createProject.createProjectCancel') }}</el-button>
                    <el-button class="primary hbjbh" type="primary"
                               @click="createProjectConfirm">{{ $t('el.createProject.createProjectConfirm') }}</el-button>
                </span>
            </el-dialog>
        </div>
    </div>


</template>

<script>
import {createProject, getProjectInfo, saveEditProject} from "../../../../api/project-management";
import {platformListDict} from "../../../../utils/platformDict";

export default {
    name: "CreateProject",
    data() {
        return {
            createProjectWindow: false,
            projectName: '',
            projectKeyWords: '',
            openTF: false,
            labelPosition: 'right',
            addContract: 0,
            contractSite:[{platform: 'eth', contract_address: '', label: '',verAddr:''}],
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
            type: String,
            default: ''
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
        /**
         * 弹窗确认方法
         */
        async createProjectConfirm() {
            if(this.type === 'add'){
                await this.addProject()
            }
            if(this.type === 'edit'){
                await this.editProject()
            }
        },
        /**
         * 弹窗取消方法
         */
        createProjectCancel() {
            this.createProjectWindow = false
        },
        addContractSite() {
            this.contractSite.push({platform: 'eth', contract_address: '', label: '',verAddr:''})
        },
        deleteContractSite(i) {
            this.contractSite.splice(i, 1)
        },
        /**
         * 重置參數變量
         */
        resetVar() {
            this.createProjectWindow = false
            this.projectName = ''
            this.projectKeyWords = ''
            this.verKeyword = ''
            this.verName = ''
            this.openTF = false
            this.labelPosition='right'
            this.addContract= 0
            this.contractSite=[{platform: 'eth', contract_address: '', label: '',verAddr:''}]

        },
        /**
         * 获取风险类型详情数据
         */
        getDetailData() {
            const _this = this
            if (this.type === 'add') {
                this.projectName = ''
                return
            }
            const pathParams = {
                id: this.projectId
            }
            getProjectInfo(null, pathParams).then(res => {
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
        /**
         * 表單校驗方法
         * @param {Object} params - 搜索参数
         */
        formVerification(params){
            this.verName = ''
            this.verKeyword = ''
            if(!params.name){
                this.verName = this.$t('el.pleaseInput') + this.$t('el.createProject.createProjectName')
                return false
            }
            if(!params.keyword){
                this.verKeyword = this.$t('el.pleaseInput') + this.$t('el.createProject.createProjectKeyWords')
                return false
            }
            let contractInfos = []
            let hasEmpty = false
            const platformReg = {
                bsc:(addr)=>this.ETHaddress.test(addr),
                eth:(addr)=>this.ETHaddress.test(addr),
                heco:(addr)=>this.ETHaddress.test(addr),
                polygon:(addr)=>this.ETHaddress.test(addr),
            }
            params.contract_infos.forEach(val=>{
                val.verAddr = ''
                // 只填了合約標簽
                if(!val.contract_address){
                    val.verAddr = this.$t('el.pleaseInput')+ this.$t('el.createProject.contractSite')
                    hasEmpty = true
                }
                // 校验地址格式
                if(!platformReg[val.platform](val.contract_address)){
                    val.verAddr = this.$t('el.createProject.contractSite')+ this.$t('el.formatError')
                    hasEmpty = true
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
        /**
         * 确认增加项目方法
         */
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
                return
            }
            params.contract_infos.map(val=>{
                return {
                    platform:val.platform,
                    contract_address:val.contract_address,
                    label:val.label
                }
            })
            createProject(params).then(res=>{
                if(res){
                    const msg = _this.$t('el.add')+ _this.$t('el.success')
                    _this.$message.success(msg)
                    // 更新列表
                    _this.$parent.getList()
                    _this.createProjectWindow = false
                }
            }).catch(err=>{
                const msg = _this.$t('el.add')+ _this.$t('el.failed')
                _this.$message.error(msg)
                console.error(err)
            })

        },
        /**
         * 确认编辑项目方法
         */
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
                return
            }
            params.contract_infos.map(val=>{
                return {
                    platform:val.platform,
                    contract_address:val.contract_address,
                    label:val.label
                }
            })
            saveEditProject(params,pathParams).then(res=>{
                if(res){
                    const msg = _this.$t('el.edit')+ _this.$t('el.success')
                    _this.$message.success(msg)
                    // 更新列表
                    _this.$parent.getList()
                    _this.createProjectWindow = false
                }
            }).catch(err=>{
                const msg = _this.$t('el.edit')+ _this.$t('el.failed')
                _this.$message.error(msg)
                console.error(err)
            })
        }
    }
}
</script>

<style scoped lang="scss">
.createBox{
    .project-star{
        position: absolute;
        left: -92px;
        top: 4px;
    }
    .project-Ver{
        position: absolute;
        left: 0;
        top: 34px;
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

/*.subtract:hover{
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
}*/



.btn-border{
    width: 16px;
    height: 16px;
    border: solid 1px darkgray;
    border-radius: 2px;
    display:flex;
    justify-content: center;
    align-items: center;
    margin-left: 12px;
}

.btn-border:hover{
    border-color: #0468C2;
    .svg-icon.add-create{
        fill:#0468C2
    }
    .subtract-create{
        border: solid 1px #81b3e0;
    }
}

.subtract-create{
        width: 12px;
        border: solid 1px darkgray;
}

.svg-icon.add-create{
    width: 14px;
    height: 14px;
    vertical-align: -0.3em;
    fill: gray;
    overflow: hidden;
    font-size: 15px;
}


/deep/ .el-input__inner {
    height: 40px;
    border-radius: 2px;
}

.el-form-item__content::after, .el-form-item__content::before {
    display: none;
}

.projectOpenTitle {
    margin-left: 70px;
}

.projectOpenSecret {
    margin-left: 16px;
}

.contractSiteBox {
    margin-top: 8px;
    display: flex;
    align-items: center;
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
    width: 234px;
    margin-left: 8px;
}
</style>