<template>
    <div>
        <div class="createBox">
            <el-dialog
                class="createProjectBox"
                :title="$t('lang.createProject.createProjectTitle')"
                :visible.sync="createProjectWindow"
                width="856px">
                <div>
                    <el-form :label-position="labelPosition" label-width="80px" class="projectForm">
                        <el-form-item :label="$t('lang.createProject.createProjectName')">
                            <el-input class="projectNameInput" v-model="projectName"
                                      :placeholder="$t('lang.createProject.createProjectNameInput')"></el-input>
                            <span class="projectOpenTitle">{{ $t('lang.createProject.createProjectOpenTitle') }}</span>
                            <el-switch
                                v-model="openTF"
                            >
                            </el-switch>
                            <span
                                class="projectOpenSecret">{{ $t('lang.createProject.createProjectOpenSecret') }}</span>
                        </el-form-item>
                        <el-form-item :label="$t('lang.createProject.createProjectKeyWords')">
                            <el-input class="projectKeyWordsInput" v-model="projectKeyWords"
                                      :placeholder="$t('lang.createProject.createProjectKeyWordsInput')"></el-input>
                        </el-form-item>
                        <el-form-item :label="$t('lang.createProject.contractSite')">
                            <div class="contractSiteBox" v-for="(o,index) in contractSite"
                                 :key="index" :offset="index > 0 ? addContract.n : 0">
                                <el-select v-model="contractSite[index].platform" class="contractSiteClass"
                                           :placeholder="$t('lang.createProject.selectContractClass')">
                                    <el-option label="select1" value="name1"></el-option>
                                    <el-option label="select2" value="name2"></el-option>
                                </el-select>
                                <el-input v-model="contractSite[index].contract_address" class="contractSiteSite"
                                          :placeholder="$t('lang.createProject.contractSiteInput')"></el-input>
                                <el-input v-model="contractSite[index].label" class="contractSiteLabel"
                                          :placeholder="$t('lang.createProject.contractSiteLabel')"></el-input>
                                <!--<img src="../../../../assets/image/pc/subtract.png"
                                     v-show="index < contractSite.length - 1"
                                     class="subtract"
                                     @click="deleteContractSite(index)"/>-->
                                <!--<img src="../../../../assets/image/pc/add.png"
                                     v-show="index === contractSite.length - 1"
                                     class="add"
                                     @click="addContractSite"/>-->
                                <div class="subtract">
                                    <svg-icon icon-class="subtract"
                                              class="subtract-btn"
                                              disabled-tool-tip
                                              v-show="index < contractSite.length - 1"
                                              @click="deleteContractSite(index)"
                                    ></svg-icon>
                                </div>
                                <div class="add-btn"
                                     v-show="index === contractSite.length - 1"
                                     @click="addContractSite">
                                    <svg-icon icon-class="add" class="add-create" disabled-tool-tip></svg-icon>
                                </div>
                            </div>
                        </el-form-item>
                    </el-form>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button class="default" type="primary"
                               @click="createProjectCancel">{{ $t('lang.createProject.createProjectCancel') }}</el-button>
                    <el-button class="primary hbjbh" type="primary"
                               @click="createProjectConfirm">{{ $t('lang.createProject.createProjectConfirm') }}</el-button>
                </span>
            </el-dialog>
        </div>
    </div>


</template>

<script>
import {getProjectInfo} from "../../../../api/project-management";

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
            contractSite:[{platform: '', contract_address: '', label: ''}],
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
    methods: {
        createProjectConfirm() {
            this.createProjectWindow = false
        },
        createProjectCancel() {
            this.createProjectWindow = false
        },
        addContractSite() {
            this.contractSite.unshift({platform: '', contract_address: '', label: ''})
            this.contractSiteSubtractClassLength++
        },
        deleteContractSite(i) {
            console.log('@')
            this.contractSite.splice(i, 1)

            this.contractSiteSubtractClassLength--
        },
        /**
         * 重置參數變量
         */
        resetVar() {
            this.createProjectWindow = false
            this.projectName = ''
            this.projectKeyWords = ''
            this.openTF=false
            this.labelPosition='right'
            this.addContract= 0
            this.contractSite=[{platform: '', contract_address: '', label: ''}]

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
                    this.projectName = res.data.name
                    this.openTF = res.data.is_public
                    this.projectKeyWords = res.data.keyword
                }
            }).catch(err => {
                const msg = _this.$t('lang.search') + _this.$t('lang.failed')
                _this.$message.error(msg)
                console.error(err)
            })
        }
    }
}
</script>

<style scoped lang="scss">
.projectNameInput {
    width: 440px;
}

.projectKeyWordsInput {
    width: 682px;
}

.subtract:hover{
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
}



.add-btn{
    width: 16px;
    height: 16px;
    border: solid 1px darkgray;
    border-radius: 2px;
    display:flex;
    justify-content: center;
    align-items: center;
    margin-left: 12px;
}

.add-btn:hover{
    border-color: #0468C2;
    .svg-icon.add-create{
        fill:#0468C2
    }
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