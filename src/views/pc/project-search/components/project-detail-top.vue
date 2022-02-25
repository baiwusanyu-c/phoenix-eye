/*
* @project-detail-top.vue
* @deprecated top5 数据表格
* @author czh
* @update (czh 2022/2/25)
*/
<template>
    <div class="project-detail-top5">
        <div class="project-detail-top5-title">
            <span>{{title}}</span>
            <be-tag round="4" type="success" customClass="tag">{{tag}}</be-tag>
        </div>

    </div>
</template>

<script lang="ts">
import {defineComponent,PropType} from "vue";
import {BeTag} from "../../../../../public/be-ui/be-ui.es";
interface ITableHeader {
    prop:string,
    label:string
}
export default defineComponent({
    name: "project-detail-top",
    components:{BeTag},
    props:{
        title:{
            type:String,
            default:'Top 5 Token Holders'
        },
        data:{
            type:Array as PropType<any>,
        },
        header:{
            type:Array as PropType<ITableHeader[]>,
        },
        tag:{
            type:String,
            default:'cake'
        }
    }
})
</script>

<style scoped lang="scss">
  .project-detail-top5{
    box-sizing: border-box;
    flex:1;
    min-height: 284px;
    padding: 24px;
    background-color: $mainColor7;
    border-radius: 4px;

    &:hover {
      @apply shadow-xl
      }

    .project-detail-top5-title{
      font-family: AlibabaPuHuiTi-Medium, AlibabaPuHuiTi sans-serif;
      font-size: 18px;
      font-weight: bold;
      color: $textColor3;

      span{
        margin-right: 16px;
      }

      .tag{
        background-color: $mainColor15;
        border:0;
        opacity: .8;

        &:hover{
          opacity: 1;
        }
      }
    }


  }
</style>