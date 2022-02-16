<template>
    <div>
        <div class="createBox">
            <el-dialog
                :close-on-click-modal="false"
                class="createProjectBox"
                :title="$t('lang.addRiskWindow.addRiskWindowTitle')"
                v-model="addRiskWindowOpen"
                width="558px">
                <div>
                    <el-form label-width="130px" class="addRiskForm">
                        <el-form-item :label="$t('lang.addRiskWindow.addRiskWindowClassName')">
                            <span class="reg-start project-star">*</span>
                            <el-input class="projectKeyWordsInput" v-model="addRiskName"
                                      :placeholder="$t('lang.addRiskWindow.addRiskWindowNameInput')"></el-input>
                            <span class="reg-start project-Ver">{{ verName }}</span>
                        </el-form-item>
                        <!--异常特征选择-->
                        <el-form-item :label="$t('lang.addRiskWindow.abnormalSelect')">
                            <span class="reg-start project-star">*</span>
                            <template>
<!--                                <el-select v-model="abnormalSelectValue" multiple @change="handleCheckedCitiesChange"
                                           :placeholder="$t('lang.addRiskWindow.abnormalSelectInput')">
                                    <el-checkbox :indeterminate="checked" v-model="checkAll" class="checkboxSelectAll"
                                                 @change="handleCheckAllChange">{{ $t('lang.addRiskWindow.selectAll') }}
                                    </el-checkbox>
                                    <el-option
                                        v-for="(item) in featuresList"
                                        :label="item.label"
                                        :key="item.code"
                                        :value="item">
                                    </el-option>
                                </el-select>-->
                                <el-select v-model="abnormalSelectValue" multiple
                                           value-key="code"
                                           :placeholder="$t('lang.addRiskWindow.abnormalSelectInput')">
                                    <el-option
                                        v-for="(item) in featuresList"
                                        :label="item.label"
                                        :key="item.code"
                                        :value="item">
                                    </el-option>
                                </el-select>
                            </template>
                            <span class="reg-start project-features">{{ verFeatures }}</span>
                        </el-form-item>
                    </el-form>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button class="default" type="primary"
                               @click="addRiskCancel">{{ $t('lang.createProject.createProjectCancel') }}</el-button>
                    <el-button class="primary hbjbh" type="primary"
                               @click="addRiskConfirm">{{ $t('lang.createProject.createProjectConfirm') }}</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import {getRiskTypeInfo} from "../../../../api/system-config";
import {defineComponent, ref, watch} from "vue";
import {ElMessage} from "element-plus/es";
import {useI18n} from "vue-i18n";

export default defineComponent({
    name: "addRiskType",
    props: {
        // 特徵列表
        featuresList: {
            type: Array,
            default: () => []
        },
        // 操作類型
        type: {
            type: String,
            default: 'add'
        },
        // 風險類型id
        riskId: {
            type: [String,Number],
            default: ''
        }
    },
    setup(props,ctx){
        const {t} = useI18n()
        const checkAll = ref(false)
        const checked = ref(true)
        const addRiskWindowOpen = ref(false)
        const addRiskName = ref('')
        const abnormalSelectValue = ref([])
        const selectNameLength = ref([])
        // 风险类型名称校验信息
        const verName = ref('')
        // 风险类型特征校验信息
        const verFeatures = ref('')

        watch(()=>addRiskWindowOpen,(nVal)=>{
            if (nVal) {
                // 獲取詳情信息，包含當前風險類型已經有的風險類型特徵
                getDetailData()
            } else {
                // 重置表單
                resetVar()
            }
        })
        /**
         * 彈窗確認方法
         */
        const addRiskConfirm = () => {
            let data = {
                name: addRiskName.value,
                risk_features: abnormalSelectValue.value
            }
            // 確認編輯 、 保存
            ctx.emit('confirm', data)
        }
        /**
         * 關閉彈窗
         */
        const addRiskCancel = () => {
            addRiskWindowOpen.value = false
        }
        /*handleCheckAllChange(val) {
            let selectName = this.featuresList
            this.abnormalSelectValue = val ? selectName : [];
            this.checked = false;
        },
        handleCheckedCitiesChange(value) {
            let checkedCount = value.length;
            this.checkAll = checkedCount === this.featuresList.length;
            this.checked = checkedCount > 0 && checkedCount < this.featuresList.length;
        },*/
        /**
         * 重置參數變量
         */
        const resetVar = () => {
            checkAll.value = false
            checked.value = true
            addRiskWindowOpen.value = false
            addRiskName.value = ''
            abnormalSelectValue.value = []
            selectNameLength.value = []
            verName.value = ''
            verFeatures.value = ''

        }
        /**
         * 获取风险类型详情数据
         */
        const getDetailData = () => {
            const _this = this
            if (this.type === 'add') {
                this.addRiskName = ''
                return
            }
            const params = {
                id: this.riskId
            }
            getRiskTypeInfo(params).then(res => {
                if (res) {
                    _this.addRiskName = res.data.risk_type.name
                    _this.abnormalSelectValue = res.data.risk_type.risk_features
                }
            }).catch(err => {
                const msg = t('lang.search') + t('lang.failed')
                ElMessage.error(msg)
                console.error(err)
            })
        }
        return{
            addRiskWindowOpen,
            addRiskName,
            abnormalSelectValue,
            verFeatures,
            verName,
            addRiskConfirm,
            addRiskCancel,
        }
    },
    /*data() {
        return {
            checkAll: false,
            checked: true,
            addRiskWindowOpen: false,
            addRiskName: '',
            abnormalSelectValue: [],
            selectNameLength: [],
            // 风险类型名称校验信息
            verName: '',
            // 风险类型特征校验信息
            verFeatures: '',
        }
    },
    watch: {
        addRiskWindowOpen(nVal) {
            if (nVal) {
                // 獲取詳情信息，包含當前風險類型已經有的風險類型特徵
                this.getDetailData()
            } else {
                // 重置表單
                this.resetVar()
            }
        }
    },
    methods: {
        /!**
         * 彈窗確認方法
         *!/
        addRiskConfirm() {
            let data = {
                name: this.addRiskName,
                risk_features: this.abnormalSelectValue
            }
            // 確認編輯 、 保存
            ctx.emit('confirm', data)
        },
        /!**
         * 關閉彈窗
         *!/
        addRiskCancel() {
            this.addRiskWindowOpen = false
        },
        /!*handleCheckAllChange(val) {
            let selectName = this.featuresList
            this.abnormalSelectValue = val ? selectName : [];
            this.checked = false;
        },
        handleCheckedCitiesChange(value) {
            let checkedCount = value.length;
            this.checkAll = checkedCount === this.featuresList.length;
            this.checked = checkedCount > 0 && checkedCount < this.featuresList.length;
        },*!/
        /!**
         * 重置參數變量
         *!/
        resetVar() {
            this.checkAll = false
            this.checked = true
            this.addRiskWindowOpen = false
            this.addRiskName = ''
            this.abnormalSelectValue = []
            this.selectNameLength = []
            this.verName = ''
            this.verFeatures = ''

        },
        /!**
         * 获取风险类型详情数据
         *!/
        getDetailData() {
            const _this = this
            if (this.type === 'add') {
                this.addRiskName = ''
                return
            }
            const params = {
                id: this.riskId
            }
            getRiskTypeInfo(params).then(res => {
                if (res) {
                    _this.addRiskName = res.data.risk_type.name
                    _this.abnormalSelectValue = res.data.risk_type.risk_features
                }
            }).catch(err => {
                const msg = _this.$t('el.search') + _this.$t('el.failed')
                _this.$message.error(msg)
                console.error(err)
            })
        }
    }*/
})

</script>

<style lang="scss">
.createBox {
    .el-input__inner {
        height: 40px;
        border-radius: 2px;
    }
  .project-star {
    position: absolute;
    top: 4px;
    left: -140px;
  }

  .project-Ver {
    position: absolute;
    top: 34px;
    left: 0;
  }

  .project-features{
    position: relative;
    top: 34px;
    left: -52%;
  }
}

.checkboxSelectAll {
  margin-left: 120px;
}
</style>