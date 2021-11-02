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
            @edit="editType"
            @delete="deleteType"
            v-for="(item) in configList" :key="item.id">
        </system-config-type-card>
    </div>
</template>

<script>
import SystemConfigTypeCard from "./components/system-config-type-card";
export default {
    name: "system-config-type",
    components: {SystemConfigTypeCard},
    data() {
        return {
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
            console.log('addType')
        },
        /**
         * 编辑类型方法
         */
        editType(){
            console.log('editType')
        },
        /**
         * 删除类型方法
         */
        deleteType(){
            console.log('deleteType')
        },
    },
}
</script>

<style scoped lang="scss">
.system-config-type{
    margin-top: 12px;
    width: calc(100% - 12px);
    height: 100%;
   /* display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;*/
}

</style>