/*
* @project-ranking-num-card.vue
* @deprecated 项目排行 - 项目态势 - 市场表现数字卡片
* @author czh
* @update (czh 2021/11/23)
*/
<template>
    <div class="project-ranking-num-card">
        <div class="project-ranking-logo">
            <img :src="logoType" alt=""/>
        </div>
        <div class="project-ranking-info">
            <p>{{ title }}</p>
            <h2>{{ num }}</h2>
        </div>
    </div>
</template>

<script lang="ts">
import {computed, defineComponent, ref} from "vue";
interface IImgCodeDict{
    [key:string]:any
}
export default defineComponent({
    name: "project-ranking-num-card",
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
    setup(props){
        const imgImport = import.meta.globEager("../../../../assets/image/pc/*-num@2x.png");
        const imgCodeDict = ref<IImgCodeDict>({
            txNum: '',
            userNum: '',
            contractNum: '',
        })
        Object.keys(imgImport).forEach(val=>{
            if(/tx-num/.test(val)){
                imgCodeDict.value.txNum = imgImport[val]
            }
            if(/user-num/.test(val)){
                imgCodeDict.value.userNum = imgImport[val]
            }
            if(/contract-num/.test(val)){
                imgCodeDict.value.contractNum = imgImport[val]
            }
        })
        const logoType = computed(()=>{
            if(props.title === '交易总量'){
                return imgCodeDict.value.txNum
            }
            if(props.title === '用户总数'){
                return imgCodeDict.value.txNum
            }
            return imgCodeDict.value.contractNum
        })
        return {
            logoType
        }
    }
})

</script>

<style scoped lang="scss">
.project-ranking-num-card{
  box-sizing: border-box;
  display: flex;
  align-items: center;
  width: 32.5%;
  padding: 20px;
  background: linear-gradient(90deg, #FFF 0%, #E3F2FF 100%);
  border-radius: 4px;

  .project-ranking-logo{
    display: flex;
    flex: 1;
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