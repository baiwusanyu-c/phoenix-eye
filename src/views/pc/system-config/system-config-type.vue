/*
* @system-config-type.vue
* @deprecated 风险类型配置页面
* @author czh
* @update (czh 2021/11/2)
*/
<template>
    <div class="system-config-type">
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
             @confirm = "()=>{return this.opType === 'add' ? this.confirmAdd() : this.confirmEdit()}"
            :featuresList="featuresList"
            ref="addRiskType">
        </add-risk-type>
        <!--    删除风险类型弹窗    -->
        <be-msg-dialog @confirm="confirmDelete"
                       headerTitle="删除"
                       :isShow.sync="showDelete"
                       title="确认删除该风险类型？">
        </be-msg-dialog>
    </div>
</template>

<script>
import SystemConfigTypeCard from "./components/system-config-type-card";
import AddRiskType from "./components/add-risk-type";
import {createRiskType, deleteRiskType, getRiskTypeList, saveEditRiskType} from "../../../api/system-config";
export default {
    name: "system-config-type",
    components: {AddRiskType, SystemConfigTypeCard},
    data() {
        return {
            showDelete:false,
            // 当前编辑、删除的项目数据对象
            curItem:'',
            // 系统的异常特征列表
            featuresList:[],
            // 彈窗狀態 編輯 或 新增
            opType:'add',
            configList:[
                {id:'qwqwdadds',name:'疑似闪电贷攻击',features:['闪电贷','币种兑换']},
                {id:'qwqwdas',name:'涉黑交易',features:['闪电贷','币种兑换']},
                {id:'qwqwddadds',name:'疑似闪电贷攻击2',features:['闪电贷','币种兑换']},
                {id:'qwqwqdas',name:'涉黑交易2',features:['闪电贷','币种兑换']}
            ]
        }
    },
    created() {
        this.getList()
    },
    mounted() {

    },
    methods: {
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
            createRiskType(param).then(res=>{
                if(res){
                    const msg = _this.$t('lang.add')+ _this.$t('lang.success')
                    _this.$message.success(msg)
                    // 更新列表
                    _this.getList()
                }
            }).catch(err=>{
                const msg = _this.$t('lang.add')+ _this.$t('lang.failed')
                _this.$message.error(msg)
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
            saveEditRiskType(param,pathParams).then(res=>{
                if(res){
                    const msg = _this.$t('lang.edit')+ _this.$t('lang.success')
                    _this.$message.success(msg)
                    // 更新列表
                    _this.getList()
                }
            }).catch(err=>{
                const msg = _this.$t('lang.edit')+ _this.$t('lang.failed')
                _this.$message.error(msg)
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
            const pathParams = {
                id:this.curItem.id
            }
            deleteRiskType(null,pathParams).then(res=>{
                if(res){
                    const msg = _this.$t('lang.delete')+ _this.$t('lang.success')
                    _this.$message.success(msg)
                    // 更新列表
                    _this.getList()
                }
            }).catch(err=>{
                const msg = _this.$t('lang.delete')+ _this.$t('lang.failed')
                _this.$message.error(msg)
                console.error(err)
            })
        },
        /**
         * 获取风险类型列表
         */
        getList(){
            const _this = this
            getRiskTypeList().then(res => {
                // 風險類型列表
                _this.configList =  res.data.risk_types
                // 交易特徵列表
                _this.featuresList = res.data.system_risk_features
            }).catch(err=>{
                const msg = _this.$t('lang.search')+ _this.$t('lang.failed')
                _this.$message.error(msg)
                console.error(err)
            })
        }
    },
}
</script>

<style scoped lang="scss">
.system-config-type{
    width: calc(100% - 12px);
    height: 100%;
   /* display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;*/
}

</style>