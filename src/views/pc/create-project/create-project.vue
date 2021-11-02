<template>
    <div>
        <!--触发按钮测试用-->
        <div class="createBox">
            <el-dialog
                    class="createProjectBox"
                    :title="$t('lang.createProject.createProjectTitle')"
                    :visible.sync="createProjectWindow"
                    width="826px"
            >
                <div>
                    <el-form :inline="true"  class="demo-form-inline">
                        <el-form-item :label="$t('lang.createProject.createProjectName')">
                            <el-input class="projectNameInput" v-model="projectName" :placeholder="$t('lang.createProject.createProjectNameInput')"></el-input>
                        </el-form-item>
                        <el-form-item :label="$t('lang.createProject.createProjectKeyWords')">
                            <el-input class="projectKeyWordsInput" v-model="projectKeyWords" :placeholder="$t('lang.createProject.createProjectKeyWordsInput')"></el-input>
                        </el-form-item>
                    </el-form>
                    <span slot="footer" class="dialog-footer">
                    <el-button @click="createProjectCancel">{{$t('lang.createProject.createProjectCancel')}}</el-button>
                    <el-button type="primary" @click="createProjectConfirm">{{$t('lang.createProject.createProjectConfirm')}}</el-button>
                </span>
                </div>
            </el-dialog>
        </div>
    </div>


</template>

<script>
    export default {
        name: "CreateProject",
        data(){
            return{
                createProjectWindow: true,
                projectName:'',
                projectKeyWords:'',
                contractSite: {
                    class: '',
                    site: '',
                    lable: '',
                }
            }
        },
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
    .projectNameInput.el-input__inner{
        width: 440px;
        height: 40px;
    }

</style>