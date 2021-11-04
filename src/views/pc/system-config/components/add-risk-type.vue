<template>
    <div>
        <div class="createBox">
            <el-dialog
                    class="createProjectBox"
                    :title="$t('lang.addRiskWindow.addRiskWindowTitle')"
                    :visible.sync="addRiskWindowOpen"
                    width="558px">
                <div>
                    <el-form label-width="80px" class="addRiskForm">
                        <el-form-item :label="$t('lang.addRiskWindow.addRiskWindowClassName')">
                            <el-input class="projectKeyWordsInput" v-model="addRiskName" :placeholder="$t('lang.addRiskWindow.addRiskWindowNameInput')"></el-input>
                        </el-form-item>
                        <el-form-item :label="$t('lang.addRiskWindow.abnormalSelect')">
                            <el-select v-model="abnormalSelectValue" clearable multiple class="contractSiteClass" :placeholder="$t('lang.addRiskWindow.abnormalSelectInput')">
                                <!--暂未实现全选功能-->
                                <el-checkbox class="checkboxSelectAll">{{$t('lang.addRiskWindow.selectAll')}}</el-checkbox>
                                <el-option v-for="(o, index) in selectNameClass" :key="index" :label="o.selectName" :value="o.value"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-form>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button class="addRiskBtn" @click="addRiskCancel">{{$t('lang.createProject.createProjectCancel')}}</el-button>
                    <el-button class="addRiskBtnConfirm" type="primary" @click="addRiskConfirm">{{$t('lang.createProject.createProjectConfirm')}}</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    export default {
        name: "addRiskType",
        data(){
            return{
                checked:true,
                addRiskWindowOpen: true,
                addRiskName:'',
                abnormalSelectValue:[],
                selectNameClass:[
                    {selectName:'select1',value:'name1'},
                    {selectName:'select2',value:'name2'}
                ],
                selectNameLength:[],
            }
        },
        methods:{
            addRiskConfirm(){
                this.addRiskWindowOpen = false
            },
            addRiskCancel(){
                this.addRiskWindowOpen = false
            },
        }
    }
</script>

<style scoped lang="scss">
    /deep/ .el-input__inner{
        height: 40px;
        border-radius: 2px;
    }
    .addRiskBtn{
        width: 88px;
        height: 32px;
    }
    .addRiskBtnConfirm{
        width: 88px;
        height: 32px;
    }
    .el-button--primary{
        background: #0468C2;
        border-color: #0468C2;
    }
    .checkboxSelectAll{
        margin-left: 145px;
    }
</style>