<template>
    <div>
        <!--触发按钮测试用-->
        <button @click="createProjectWindow = true">创建新的项目</button>
        <div class="createBox">
            <el-dialog
                    class="createProjectBox"
                    :title="$t('lang.createProjectTitle')"
                    :visible.sync="createProjectWindow"
                    width="826px"
            >
                <div>
                    <el-form :inline="true"  class="demo-form-inline">
                        <el-form-item :label="$t('lang.createProjectName')">
                            <el-input class="projectNameInput" v-model="projectName" :placeholder="$t('lang.createProjectNameInput')"></el-input>
                        </el-form-item>
                        <el-form-item :label="$t('lang.createProjectKeyWords')">
                            <el-input class="projectKeyWordsInput" v-model="projectKeyWords" :placeholder="$t('lang.createProjectKeyWordsInput')"></el-input>
                        </el-form-item>
                    </el-form>
                    <span slot="footer" class="dialog-footer">
                    <el-button @click="createProjectWindow = false">{{$t('lang.createProjectCancel')}}</el-button>
                    <el-button type="primary" @click="createProjectWindow = false">{{$t('lang.createProjectConfirm')}}</el-button>
                </span>
                </div>
            </el-dialog>
        </div>
    </div>


</template>

<script>
    export default {
        name: "create-project",
        data(){
            return{
                createProjectWindow: false,
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

        }
    }
</script>

<style scoped lang="scss">
    .createBox{
        .el-dialog__title {
            line-height: 16px;
            font-size: 16px;
        }
        .el-dialog__header{
            padding-top: 16px;
            padding-left: 24px;
        }
        .el-input__inner{
            .projectNameInput{
                width: 440px;
                border-radius: 1px;
            }
            .projectKeyWordsInput{
                width: 682px;
                border-radius: 1px;
            }
        }
    }

</style>