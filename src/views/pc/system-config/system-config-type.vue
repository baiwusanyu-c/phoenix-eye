/*
* @system-config-type.vue
* @deprecated 风险类型配置页面
* @author czh
* @update (czh 2021/11/2)
*/
<template>
    <div class="system-config-type" v-loading="loading">
        <system-config-type-card
          type="add"
          @add="addType">
        </system-config-type-card>
        <system-config-type-card
            type="edit"
            :title="item.name"
            :features="item.risk_features"
            @edit="editType(item)"
            @delete="deleteType(item)"
            v-for="(item) in configList" :key="item.id">
        </system-config-type-card>
        <!--    新增、编辑风险类型弹窗    -->
        <add-risk-type
            :type="opType"
            :riskId = 'curItem.id'
             @confirm = "(params)=>{return this.opType === 'add' ? this.confirmAdd(params) : this.confirmEdit(params)}"
            :featuresList="featuresList"
            ref="addRiskType">
        </add-risk-type>
        <!--    删除风险类型弹窗    -->
        <MsgDialog @confirm="confirmDelete"
                   @close="()=>showDelete = false"
                       :headerTitle="$t('lang.delete')"
                       :isShow="showDelete"
                       :title="$t('lang.confirm')+ $t('lang.delete') + $t('lang.systemConfig.warningType')">
        </MsgDialog>
    </div>
</template>

<script lang="ts">
import SystemConfigTypeCard from "./components/system-config-type-card.vue";
import AddRiskType from "./components/add-risk-type.vue";
import {createRiskType, deleteRiskType, getRiskTypeList, saveEditRiskType} from "../../../api/system-config";
import {defineComponent, ref, reactive, onMounted} from "vue";
import {useI18n} from "vue-i18n";
import MsgDialog from '../../../components/common-components/msg-dialog/msg-dialog.vue'
import {ElMessage} from "element-plus/es";
import {ceReg} from "../../../utils/reg";

export default defineComponent({
    name: "system-config-type",
    components: {AddRiskType, SystemConfigTypeCard,MsgDialog},
    setup(){
        const {t} = useI18n()
        const showDelete = ref<boolean>(false)
        // 当前编辑、删除的项目数据对象
        const curItem=ref<object>({})
        // 系统的异常特征列表
        const featuresList=ref<Array<object>>([])
        // 彈窗狀態 編輯 或 新增
        const opType=ref<string>('add')
        const configList=ref<Array<object>>([])
        // loading
        const loading=ref<boolean>(false)
        const addRiskType = ref<any>({})
        onMounted(()=>{
            getList()
        })

        /**
         * 表單校驗方法
         * @param {Object} params - 搜索参数
         */
        const formVerification = (params:object):boolean=>{
            addRiskType.verName = ''
            addRiskType.verFeatures = ''
            if(!params.name){
                addRiskType.verName = t('lang.pleaseInput') + t('lang.addRiskWindow.addRiskWindowClassName')
                return false
            }
            if(params.name && !ceReg.test(params.name)){
                addRiskType.verName = t('lang.createProject.verCE')
                return false
            }
            if(params.risk_features.length  === 0){
                addRiskType.verFeatures = t('lang.pleaseInput') + t('lang.addRiskWindow.abnormalSelect')
                return false
            }
            return true
        }
        /**
         * 新增类型方法
         */
        const addType = ():void => {
            opType.value = 'add'
            addRiskType.addRiskWindowOpen = true
            console.log(addRiskType.addRiskWindowOpen)
        }
        /**
         * 確認新增方法
         * @param {Object} param - 表单参数
         */
        const confirmAdd = (param:object)=>{
            if(formVerification(param)) return
            createRiskType(param).then(res=>{
                if(res){
                    const msg = t('lang.add')+ t('lang.success')
                    ElMessage.success(msg)
                    // 更新列表
                    getList()
                    addRiskType.addRiskWindowOpen = false
                }
            }).catch(err=>{
                ElMessage.error(err.message)
                console.error(err)
            })
        }
        /**
         * 编辑类型方法
         * @param {Object} item - 风险类型数据对象
         */
        const editType = (item:object):void => {
            opType.value = 'edit'
            curItem.value = item
            addRiskType.addRiskWindowOpen = true
        }
        /**
         * 確認編輯方法
         * @param {Object} param - 表单参数
         */
        const confirmEdit = (param:object) :void=> {
            const _this = this
            const pathParams = {
                id:curItem.value.id
            }
            if(!formVerification(param)) return
            saveEditRiskType(param,pathParams).then(res=>{
                if(res){
                    const msg = t('lang.edit')+ t('lang.success')
                    ElMessage.success(msg)
                    // 更新列表
                    getList()
                    ctx.ref.addRiskType.addRiskWindowOpen = false
                }
            }).catch(err=>{
                ElMessage.error(err.message)
                console.error(err)
            })
        }
        /**
         * 删除类型方法
         * @param {Object} item - 风险类型数据对象
         */
        const deleteType = (item:object):void => {
            showDelete.value = true
            curItem.value = item
        }
        /**
         * 确认删除类型方法
         */
        const confirmDelete = ():void => {
            showDelete.value = false
            const _this = this
            const params = {
                id:curItem.value.id
            }
            deleteRiskType(params).then(res=>{
                if(res){
                    const msg = t('lang.delete')+ t('lang.success')
                    ElMessage.success(msg)
                    // 更新列表
                    getList()
                }
            }).catch(err=>{
                ElMessage.error(err.message)
                console.error(err)
            })
        }
        /**
         * 获取风险类型列表
         */
        const getList = ():void => {
            loading.value = true
            getRiskTypeList().then(res => {
                // 風險類型列表
                configList.value =  res.data.risk_types
                // 交易特徵列表
                featuresList.value = res.data.system_risk_features
                loading.value = false
            }).catch(err=>{
                ElMessage.error(err.message)
                console.error(err)
            })
        }

        return{
            showDelete,
            curItem,
            featuresList,
            opType,
            configList,
            loading,
            addRiskType,
            addType,
            confirmAdd,
            editType,
            confirmEdit,
            deleteType,
            confirmDelete,
        }
    },
    /*data() {
        return {
            showDelete:false,
            // 当前编辑、删除的项目数据对象
            curItem:'',
            // 系统的异常特征列表
            featuresList:[],
            // 彈窗狀態 編輯 或 新增
            opType:'add',
            configList:[],
            // loading
            loading:false,
        }
    },
    created() {
        this.getList()
    },
    methods: {
        /!**
         * 表單校驗方法
         * @param {Object} params - 搜索参数
         *!/
        formVerification(params){
            this.$refs.addRiskType.verName = ''
            this.$refs.addRiskType.verFeatures = ''
            if(!params.name){
                this.$refs.addRiskType.verName = this.$t('el.pleaseInput') + this.$t('el.addRiskWindow.addRiskWindowClassName')
                return false
            }
            if(params.name && !this.ceReg.test(params.name)){
                this.$refs.addRiskType.verName = this.$t('el.createProject.verCE')
                return false
            }
            if(params.risk_features.length  === 0){
                this.$refs.addRiskType.verFeatures = this.$t('el.pleaseInput') + this.$t('el.addRiskWindow.abnormalSelect')
                return false
            }
            return true
        },
        /!**
         * 新增类型方法
         *!/
        addType(){
            this.opType = 'add'
            this.$refs.addRiskType.addRiskWindowOpen = true
        },
        /!**
         * 確認新增方法
         * @param {Object} param - 表单参数
         *!/
        confirmAdd(param){
            const _this = this
            if(!this.formVerification(param)) return
            createRiskType(param).then(res=>{
                if(res){
                    const msg = _this.$t('el.add')+ _this.$t('el.success')
                    _this.$message.success(msg)
                    // 更新列表
                    _this.getList()
                    _this.$refs.addRiskType.addRiskWindowOpen = false
                }
            }).catch(err=>{
                _this.$message.error(err.message)
                console.error(err)
            })
        },
        /!**
         * 编辑类型方法
         * @param {Object} item - 风险类型数据对象
         *!/
        editType(item){
            this.opType = 'edit'
            this.curItem = item
            this.$refs.addRiskType.addRiskWindowOpen = true
        },
        /!**
         * 確認編輯方法
         * @param {Object} param - 表单参数
         *!/
        confirmEdit(param){
            const _this = this
            const pathParams = {
                id:this.curItem.id
            }
            if(!this.formVerification(param)) return
            saveEditRiskType(param,pathParams).then(res=>{
                if(res){
                    const msg = _this.$t('el.edit')+ _this.$t('el.success')
                    _this.$message.success(msg)
                    // 更新列表
                    _this.getList()
                    _this.$refs.addRiskType.addRiskWindowOpen = false
                }
            }).catch(err=>{
                _this.$message.error(err.message)
                console.error(err)
            })
        },
        /!**
         * 删除类型方法
         * @param {Object} item - 风险类型数据对象
         *!/
        deleteType(item){
            this.showDelete = true
            this.curItem = item
        },
        /!**
         * 确认删除类型方法
         *!/
        confirmDelete(){
            this.showDelete = false
            const _this = this
            const params = {
                id:this.curItem.id
            }
            deleteRiskType(params).then(res=>{
                if(res){
                    const msg = _this.$t('el.delete')+ _this.$t('el.success')
                    _this.$message.success(msg)
                    // 更新列表
                    _this.getList()
                }
            }).catch(err=>{
                _this.$message.error(err.message)
                console.error(err)
            })
        },
        /!**
         * 获取风险类型列表
         *!/
        getList(){
            const _this = this
            _this.loading = true
            getRiskTypeList().then(res => {
                // 風險類型列表
                _this.configList =  res.data.risk_types
                // 交易特徵列表
                _this.featuresList = res.data.system_risk_features
                _this.loading = false
            }).catch(err=>{
                _this.$message.error(err.message)
                console.error(err)
            })
        }
    },*/
})

</script>

<style scoped lang="scss">
.system-config-type{
  width: calc(100% - 12px);
  height: 100%;

  /* display: flex;
    justify-content: flex-start;
    flex-wrap: wrap; */
}

</style>