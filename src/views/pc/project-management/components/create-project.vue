<template>
    <div>
        <!--触发按钮测试用-->
        <div class="createBox">
            <el-dialog
                    class="createProjectBox"
                    :title="$t('lang.createProject.createProjectTitle')"
                    :visible.sync="createProjectWindow"
                    width="856px">
                <div>
                    <el-form :label-position="labelPosition" label-width="80px" class="projectForm">
                        <el-form-item :label="$t('lang.createProject.createProjectName')" >
                            <el-input  class="projectNameInput" v-model="projectName" :placeholder="$t('lang.createProject.createProjectNameInput')"></el-input>
                            <span class="projectOpenTitle">{{$t('lang.createProject.createProjectOpenTitle')}}</span>
                            <el-switch
                                    v-model="openTF"
                            >
                            </el-switch>
                            <span class="projectOpenSecret">{{$t('lang.createProject.createProjectOpenSecret')}}</span>
                        </el-form-item>
                        <el-form-item :label="$t('lang.createProject.createProjectKeyWords')">
                            <el-input class="projectKeyWordsInput" v-model="projectKeyWords" :placeholder="$t('lang.createProject.createProjectKeyWordsInput')"></el-input>
                        </el-form-item>
                        <el-form-item :label="$t('lang.createProject.contractSite')">
                            <div class="contractSiteBox" v-for="(o,index) in addContract" :key="index" :offset="index > 0 ? addContract.n : 0">
                                <el-select v-model="contractSite.class" class="contractSiteClass" :placeholder="$t('lang.createProject.selectContractClass')">
                                    <el-option label="select1" value="name1"></el-option>
                                    <el-option label="select2" value="name2"></el-option>
                                </el-select>
                                <el-input v-model="contractSite.site" class="contractSiteSite" :placeholder="$t('lang.createProject.contractSiteInput')"></el-input>
                                <el-input v-model="contractSite.lable" class="contractSiteLabel" :placeholder="$t('lang.createProject.contractSiteLabel')"></el-input>
                                <!--<img src="../../../assets/image/pc/subtract.png" class="subtract"/>-->
                                <img src="../../../../assets/image/pc/add.png" class="add" @click="addContract++"/>
                            </div>
                        </el-form-item>
                    </el-form>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button class="createProjectBtn" @click="createProjectCancel">{{$t('lang.createProject.createProjectCancel')}}</el-button>
                    <el-button class="createProjectBtnConfirm" type="primary" @click="createProjectConfirm">{{$t('lang.createProject.createProjectConfirm')}}</el-button>
                </span>
            </el-dialog>
        </div>
    </div>


</template>

<script>
    /*import createProjectContract from "../create-project/create-project-contract"*/
    export default {
        name: "CreateProject",
        data(){
            return{
                createProjectWindow: false,
                projectName:'',
                projectKeyWords:'',
                contractSite: {
                    class: '',
                    site: '',
                    lable: '',
                },
                openTF:false,
                labelPosition: 'right',
                addContract: 1,
            }
        },
        /*components:{
          createProjectContract,
        },*/
        methods:{
            createProjectConfirm(){
                this.createProjectWindow = false
            },
            createProjectCancel(){
                this.createProjectWindow = false
            }
        }
    }
</script>

<style scoped lang="scss">
    .projectNameInput{
        width: 440px;
    }
    .projectKeyWordsInput{
        width: 682px;
    }
    /deep/ .el-input__inner{
        height: 40px;
        border-radius: 2px;
    }
    .el-form-item__content::after, .el-form-item__content::before {
        display: none;
    }
    .projectOpenTitle{
        margin-left: 70px;
    }
    .projectOpenSecret{
        margin-left: 16px;
    }
    .add{
        z-index: 378;
        width: 20px;
        height: 20px;
        margin-left: 10px;
        background-color: white;
    }
    .createProjectBtn{
        width: 88px;
        height: 32px;
    }
    .createProjectBtnConfirm{
        width: 88px;
        height: 32px;

    }
    .el-button--primary{
        background: #0468C2;
        border-color: #0468C2;
     }
    .el-switch.is-checked .el-switch__core {
        border-color: #0468C2;
        background-color: #0468C2;
    }


    .contractSiteBox{
        margin-top: 8px;
    }
    .contractSiteClass{
        width: 110px;
    }
    .contractSiteSite{
        width: 322px;
        margin-left: 8px;
    }
    .contractSiteLabel{
        width: 234px;
        margin-left: 8px;
    }
    .subtract{
        z-index: 378;
        width: 20px;
        height: 20px;
        margin-left: 10px;
        background-color: white;
    }
</style>