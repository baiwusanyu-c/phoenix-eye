/*
* @project-ranking-score-card.vue
* @deprecated 项目排行 - 合约态势 - 合约信息卡片
* @author czh
* @update (czh 2021/11/23)
*/
<template>
    <div class="project-ranking-score-card">
        <div class="project-ranking-logo">
            <img :src="logoType" alt=""/>
        </div>
        <div class="project-ranking-info">
            <h3>{{ title }}  {{platform ? `(` + platform + `)` : ''}}</h3>
            <div style="max-height: 100px;overflow-y: auto" class="scrollDiy">
                <p v-for="(item) in labelConfig" :key="JSON.stringify(item)">
                    {{item.label}}:{{handleData(data,item)}}
                </p>
                <p v-if="JSON.stringify(data) === '{}' && this.title === this.$t('el.projectRinking.contractBalance')">
                    {{$t('el.emptyData')}}
                </p>
            </div>

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
            if(this.title === this.$t('el.projectRinking.contractOverview')){
                return this.imgCodeDict.hygk
            }
            if(this.title === this.$t('el.projectRinking.contractBalance')){
                return this.imgCodeDict.hyye
            }
            return this.imgCodeDict.aqpg
        },
        handleData(){
            return function (data,config){
                // 为空或 -1 则显示暂无数据
                // 对象时
                if(!Array.isArray(data)){
                    return (data[config.val] || data[config.val] === 0) &&  data[config.val] !== '-1' ? data[config.val] : this.$t('el.emptyData')
                }
                return (data[config.val][config.valKey] || data[config.val][config.valKey] === 0) &&  data[config.val][config.valKey] !== '-1' ? data[config.val] : this.$t('el.emptyData')
            }
        }
    },
    props:{
        platform:{
            type:String,
            default:''
        },
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
            type:[Object,Array],
            default: ()=>{return {}}
        }
    },
}
</script>

<style scoped lang="scss">
.project-ranking-score-card{
    padding: 20px;
    box-sizing: border-box;
    background: linear-gradient(90deg, #FFFFFF 0%, #E3F2FF 100%);
    border-radius: 4px;
    margin-right: 20px;
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