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
                        <!--异常特征选择-->
                        <el-form-item :label="$t('lang.addRiskWindow.abnormalSelect')">
                            <template>
                                <el-select v-model="abnormalSelectValue" multiple  @change="handleCheckedCitiesChange" :placeholder="$t('lang.addRiskWindow.abnormalSelectInput')">
                                    <el-checkbox :indeterminate="checked" v-model="checkAll" class="checkboxSelectAll" @change="handleCheckAllChange">{{$t('lang.addRiskWindow.selectAll')}}</el-checkbox>
                                    <el-option
                                           v-for="o in selectNameClass"
                                           :label="o"
                                           :key="o"
                                           :value="o">
                                   </el-option>
                               </el-select>
                            </template>
                        </el-form-item>
                    </el-form>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button class="default" type="primary" @click="addRiskCancel">{{$t('lang.createProject.createProjectCancel')}}</el-button>
                    <el-button class="primary hbjbh" type="primary" @click="addRiskConfirm">{{$t('lang.createProject.createProjectConfirm')}}</el-button>
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
                checkAll: false,
                checked:true,
                addRiskWindowOpen: false,
                addRiskName:'',
                abnormalSelectValue:[],
                selectNameClass:['select1','select2','select3'],
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
            handleCheckAllChange(val) {
                let selectName = this.selectNameClass
                this.abnormalSelectValue = val ? selectName : [];
                this.checked = false;
            },
            handleCheckedCitiesChange(value) {
                let checkedCount = value.length;
                this.checkAll = checkedCount === this.selectNameClass.length;
                this.checked = checkedCount > 0 && checkedCount < this.selectNameClass.length;
            }
        }
    }
</script>

<style scoped lang="scss">
    /deep/ .el-input__inner{
        height: 40px;
        border-radius: 2px;
    }
    .checkboxSelectAll{
        margin-left: 120px;
    }
</style>