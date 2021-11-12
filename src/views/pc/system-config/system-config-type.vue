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
            :features="item.features"
            @edit="editType(item)"
            @delete="deleteType(item)"
            v-for="(item) in configList" :key="item.id">
        </system-config-type-card>
        <!--    新增、编辑风险类型弹窗    -->
        <add-risk-type ref="addRiskType"></add-risk-type>
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
export default {
    name: "system-config-type",
    components: {AddRiskType, SystemConfigTypeCard},
    data() {
        return {
            showDelete:false,
            configList:[
                {id:'qwqwdadds',name:'疑似闪电贷攻击',features:['闪电贷','币种兑换']},
                {id:'qwqwdas',name:'涉黑交易',features:['闪电贷','币种兑换']},
                {id:'qwqwddadds',name:'疑似闪电贷攻击2',features:['闪电贷','币种兑换']},
                {id:'qwqwqdas',name:'涉黑交易2',features:['闪电贷','币种兑换']}
            ]
        }
    },
    mounted() {
    },
    methods: {
        /**
         * 新增类型方法
         */
        addType(){
            this.$refs.addRiskType.addRiskWindowOpen = true

        },
        /**
         * 编辑类型方法
         * @param {Object} item - 风险类型数据对象
         */
        editType(item){
            this.$refs.addRiskType.addRiskWindowOpen = true

        },
        /**
         * 删除类型方法
         * @param {Object} item - 风险类型数据对象
         */
        deleteType(item){
            this.showDelete = true
            console.log('deleteType')
        },
        /**
         * q确认删除类型方法
         */
        confirmDelete(){
            this.showDelete = false
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