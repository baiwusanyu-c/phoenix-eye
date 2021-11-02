/*
* @system-config-type-card.vue
* @deprecated 风险类型配置卡片
* @author czh
* @update (czh 2021/11/2)
*/
<template>
    <div class="system-config-type-card">
        <div v-if="type === 'edit'"  class="card-title-body">
            <h3>
                {{title}}
            </h3>
            <div>
                <be-svg-icon @click = 'emitFunc("edit")' style="cursor: pointer" icon-class="-renwuguanli-xiugai" disabled-tool-tip></be-svg-icon>
                <be-svg-icon @click = 'emitFunc("delete")' style="cursor: pointer" icon-class="-renwuguanli-shanchu" disabled-tool-tip></be-svg-icon>
            </div>
        </div>
        <div v-if="type === 'edit'">
            <p></p>
            <div>

            </div>
        </div>
        <!--    新增时显示   -->
        <div v-if="type === 'add'" class="card-add">
            <div class="card-add-body" @click = 'emitFunc("add")'>
                <img src="@/assets/image/pc/add-type-icon.png"/>
                <p>新增风险类型</p>
            </div>
        </div>
    </div>
</template>

<script>
import BeSvgIcon from "../../../../components/common-components/svg-icon/be-svg-icon";
export default {
    name: "system-config-type-card",
    components: {BeSvgIcon},
    data() {
        return {}
    },
    props: {
        type: {
            type: String,
            default: 'add'
        },
        features:{
            type: Array,
            default: () => []
        },
        title:{
          type:String,
        }
    },
    mounted() {
    },
    methods: {
        /**
         * 触发事件方法
         * @param {String} evtName - 事件名称
         */
        emitFunc(evtName){
            this.$emit(evtName)
        }
    },
}
</script>

<style scoped lang="scss">
.system-config-type-card{
    background-color: $mainColor7;
    width: 400px;
    height: 310px;
    margin: 6px 8px;
    box-shadow: 0 1px 4px 0 $mainColor8;
    .card-title-body{
        background: linear-gradient(270deg, #074E8F 0%, #0468C2 100%);
        border-radius: 4px 4px 0 0;
        line-height: 20px;
        display: flex;
        padding: 16px 20px;
        box-sizing: border-box;
        color: white;
        justify-content: space-between;
        .svg-icon{
            margin: 0 5px;
        }
    }
    .card-add{
        width: 100%;
        height: 100%;
        background-image: url("../../../../assets/image/pc/type-add.png");
        background-repeat: no-repeat;
        background-size: cover;
        display: flex;
        justify-content: center;
        align-items: center;
        .card-add-body{
            cursor: pointer;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            p{
                color: $mainColor3;
            }
        }
    }
}

</style>