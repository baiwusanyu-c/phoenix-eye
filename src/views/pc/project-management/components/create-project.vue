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

                            <div class="contractSiteBox" v-for="(o,index) in contractSiteSubtractClassLength"
                                 :key="index" :offset="index > 0 ? addContract.n : 0">
                                <el-select v-model="contractSiteClass[o]" class="contractSiteClass"
                                           :placeholder="$t('lang.createProject.selectContractClass')">
                                    <el-option label="select1" value="name1"></el-option>
                                    <el-option label="select2" value="name2"></el-option>
                                </el-select>
                                <el-input v-model="contractSiteSite[o]" class="contractSiteSite"
                                          :placeholder="$t('lang.createProject.contractSiteInput')"></el-input>
                                <el-input v-model="contractSiteLable[o]" class="contractSiteLabel"
                                          :placeholder="$t('lang.createProject.contractSiteLabel')"></el-input>
                                <img src="../../../../assets/image/pc/subtract.png" class="subtract"
                                     @click="deleteContractSite(o)"/>
                            </div>

                            <div class="contractSiteBox">
                                <el-select v-model="contractSiteAdd.class" class="contractSiteClass"
                                           :placeholder="$t('lang.createProject.selectContractClass')">
                                    <el-option label="select1" value="name1"></el-option>
                                    <el-option label="select2" value="name2"></el-option>
                                </el-select>
                                <el-input v-model="contractSiteAdd.site" class="contractSiteSite"
                                          :placeholder="$t('lang.createProject.contractSiteInput')"></el-input>
                                <el-input v-model="contractSiteAdd.lable" class="contractSiteLabel"
                                          :placeholder="$t('lang.createProject.contractSiteLabel')"></el-input>
                                <!--<img src="../../../assets/image/pc/subtract.png" class="subtract"/>-->
                                <img src="../../../../assets/image/pc/add.png" class="add" @click="addContractSite"/>
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
            contractSiteAdd: {
                class: '',
                site: '',
                lable: '',
            },
            contractSiteSubtract: {
                class: '',
                site: '',
                lable: '',
            },
            contractSiteSubtractClassLength: 0,
            openTF: false,
            labelPosition: 'right',
            addContract: 0,
            contractSiteClass: [],
            contractSiteSite: [],
            contractSiteLable: [],
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
            this.contractSiteClass.unshift(this.contractSiteSubtract.class)
            this.contractSiteSite.unshift(this.contractSiteSubtract.site)
            this.contractSiteLable.unshift(this.contractSiteSubtract.lable)
            this.contractSiteSubtractClassLength++
            console.log(this.contractSiteSubtractClassLength)
        },
        deleteContractSite(i) {
            console.log('@')
            this.contractSiteClass.splice(i, 1)
            this.contractSiteSite.splice(i, 1)
            this.contractSiteLable.splice(i, 1)
            this.contractSiteSubtractClassLength--
            console.log(this.contractSiteSubtractClassLength)
        },
        /**
         * 重置參數變量
         */
        resetVar() {
            this.createProjectWindow = false
            this.projectName = ''
            this.projectKeyWords = ''
            this.contractSiteAdd = {
                class: '',
                site: '',
                lable: '',
            }
            this.contractSiteSubtract = {
                class: '',
                site: '',
                lable: '',
            }
            this.contractSiteSubtractClassLength = 0
            this.openTF = false
            this.labelPosition = 'right'
            this.addContract = 0
            this.contractSiteClass = []
            this.contractSiteSite = []
            this.contractSiteLable = []
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

.add {
    z-index: 378;
    width: 20px;
    height: 20px;
    margin-left: 10px;
    background-color: white;
}

.contractSiteBox {
    margin-top: 8px;
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

.subtract {
    z-index: 378;
    width: 20px;
    height: 20px;
    margin-left: 10px;
    background-color: white;
}

.subtract:hover {
    background-color: #0468C2;
}
</style>