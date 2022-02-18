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
                <p v-if="JSON.stringify(data) === '{}' && title === $t('lang.projectRinking.contractBalance')">
                    {{$t('lang.emptyData')}}
                </p>
            </div>

        </div>
    </div>
</template>

<script lang="ts">
import {computed, defineComponent} from "vue";
import {useI18n} from "vue-i18n";
export default defineComponent({
    name: "project-ranking-score-card",
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
    setup(props){
        const {t} = useI18n()
        const imgCodeDict = {
            hygk: import.meta.globEager("../../../../assets/image/pc/hygk@2x.jpg")[0].default,
            hyye: import.meta.globEager("../../../../assets/image/pc/hyye@2x.jpg")[0].default,
            aqpg: import.meta.globEager("../../../../assets/image/pc/aqpg@2x.jpg")[0].default,
        }
        const handleData = computed(()=>{
            return function (data:any,config:{val:number,valKey:string}){
                // 对象时
                if(!Array.isArray(data)){
                    return (data[config.val] || data[config.val] === 0) ? data[config.val] : t('lang.emptyData')
                }
                return (data[config.val][config.valKey] || data[config.val][config.valKey] === 0) ? data[config.val] : t('lang.emptyData')
            }
        })
        const logoType = computed(()=>{
            if(props.title === t('lang.projectRinking.contractOverview')){
                return imgCodeDict.hygk
            }
            if(props.title === t('lang.projectRinking.contractBalance')){
                return imgCodeDict.hyye
            }
            return imgCodeDict.aqpg
        })
        return {
            handleData,
            logoType
        }
    }
})

</script>

<style scoped lang="scss">
.project-ranking-score-card{
  box-sizing: border-box;
  display: flex;
  align-items: center;
  width: 32.5%;
  padding: 20px;
  margin-right: 20px;
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
    color: $textColor3;

    p{
      margin-top: 8px;
      color: $textColor4;
    }
  }
}
</style>