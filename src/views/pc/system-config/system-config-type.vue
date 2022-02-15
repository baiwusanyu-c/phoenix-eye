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
                       :headerTitle="$t('el.delete')"
                       :isShow="showDelete"
                       :title="$t('el.confirm')+ $t('el.delete') + $t('el.systemConfig.warningType')">
        </MsgDialog>
    </div>
</template>

<script>
import SystemConfigTypeCard from "./components/system-config-type-card.vue";
import AddRiskType from "./components/add-risk-type.vue";
import {createRiskType, deleteRiskType, getRiskTypeList, saveEditRiskType} from "../../../api/system-config";
import {defineComponent} from "vue";
import MsgDialog from '../../../components/common-components/msg-dialog/msg-dialog.vue'
export default defineComponent({
    name: "system-config-type",
    components: {AddRiskType, SystemConfigTypeCard,MsgDialog},
    data() {
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
        /**
         * 表單校驗方法
         * @param {Object} params - 搜索参数
         */
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
        /**
         * 新增类型方法
         */
        addType(){
            this.opType = 'add'
            this.$refs.addRiskType.addRiskWindowOpen = true
        },
        /**
         * 確認新增方法
         * @param {Object} param - 表单参数
         */
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
        /**
         * 编辑类型方法
         * @param {Object} item - 风险类型数据对象
         */
        editType(item){
            this.opType = 'edit'
            this.curItem = item
            this.$refs.addRiskType.addRiskWindowOpen = true
        },
        /**
         * 確認編輯方法
         * @param {Object} param - 表单参数
         */
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
        /**
         * 删除类型方法
         * @param {Object} item - 风险类型数据对象
         */
        deleteType(item){
            this.showDelete = true
            this.curItem = item
        },
        /**
         * 确认删除类型方法
         */
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
        /**
         * 获取风险类型列表
         */
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
    },
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