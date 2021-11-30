/*
* @project-ranking-num-cardvue
* @deprecated 项目排行 - 项目态势 - 市场表现数字卡片
* @author czh
* @update (czh 2021/11/23)
*/
<template>
    <div class="project-ranking-num-card">
        <div class="project-ranking-logo">
            <img :src="logoType"/>
        </div>
        <div class="project-ranking-info">
            <p>{{ title }}</p>
            <h2>{{ num }}</h2>
        </div>
    </div>
</template>

<script>
export default {
    name: "project-ranking-num-card",
    data() {
        return {
            imgCodeDict:{
                txNum: require('@/assets/image/pc/tx-num@2x.png'),
                userNum: require('@/assets/image/pc/user-num@2x.png'),
                contractNum: require('@/assets/image/pc/contract-num@2x.png'),
            }
        }
    },
    computed:{
        logoType(){
            if(this.title === '交易总量'){
                return this.imgCodeDict.txNum
            }
            if(this.title === '用户总数'){
                return this.imgCodeDict.userNum
            }
            return this.imgCodeDict.contractNum
        }
    },
    props:{
        title:{
            type:String,
            default:'合约总数'
        },
        num:{
            type:[Number,String],
            default:0
        }
    },
    mounted() {
    },
    methods: {},
}
</script>

<style scoped lang="scss">
.project-ranking-num-card{
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
        color: $textColor4;
        h2{
            margin-top: 8px;
        }
    }
}
</style>