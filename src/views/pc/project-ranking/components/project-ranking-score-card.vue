/*
* @project-ranking-score-card.vue
* @deprecated 项目排行 - 合约态势 - 合约信息卡片
* @author czh
* @update (czh 2021/11/23)
*/
<template>
    <div class="project-ranking-score-card">
        <div class="project-ranking-logo">
            <img :src="logoType"/>
        </div>
        <div class="project-ranking-info">
            <h3>{{ title }}</h3>
            <p v-for="(item) in labelConfig" :key="JSON.stringify(item)">
                {{item.label}}:{{data[item.val]}}
            </p>
        </div>
    </div>
</template>

<script>
export default {
    name: "project-ranking-score-card",
    data() {
        return {
            imgCodeDict:{
                hygk: require('@/assets/image/pc/hygk@2x.png'),
                hyye: require('@/assets/image/pc/hyye@2x.png'),
                aqpg: require('@/assets/image/pc/aqpg@2x.png'),
            }
        }
    },
    computed:{
        logoType(){
            if(this.title === '合约概况'){
                return this.imgCodeDict.hygk
            }
            if(this.title === '合约余额'){
                return this.imgCodeDict.hyye
            }
            return this.imgCodeDict.aqpg
        }
    },
    props:{
        title:{
            type:String,
            default:'合约概况'
        },
        // label配置
        labelConfig:{
            type:Array,
            default: ()=>{return [
                {label:'总交易数',val:'tx_num'},
                {label:'总调用数',val:'call_num'},
                {label:'创建时间',val:'time'},
            ]}
        },
        data:{
            type:Object,
            default: ()=>{return {
                'tx_num':'123456',
                'call_num':'12345',
                'time':'2011.11.11.12:30'
            }}
        }
    },
    mounted() {
    },
    methods: {},
}
</script>

<style scoped lang="scss">
.project-ranking-score-card{
    padding: 20px;
    box-sizing: border-box;
    background: linear-gradient(90deg, #FFFFFF 0%, #E3F2FF 100%);
    border-radius: 4px;
    display: flex;
    align-items: center;
    width: 32.5%;
    .project-ranking-logo{
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        img{
            width: 70px;
            height: 70px;
        }
    }
    .project-ranking-info{
        flex: 2;
        color: $textColor3;
        p{
            margin-top: 8px;
            color: $textColor4;
        }
    }
}
</style>