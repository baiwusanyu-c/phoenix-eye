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
            <be-tag round="4" type="success" customClass="tag" v-if="tokenName">{{tokenName}}</be-tag>
            <el-select v-model="curPlatform" style="float:right;width: 120px" @change="handleSelect">
                <el-option
                    v-for="item in platformListDict"
                    :key="item.id"
                    :label="item.label"
                    :value="item.value">
                </el-option>
            </el-select>
        </div>
        <el-table
            tooltip-effect="light"
            :data="data"
            class="top5-list-table"
            ref="Top5List">
            <template #empty>
                <div class='empty-data' style="width: 100%">
                    <img class="img" src="@/assets/image/pc/empty-data.png" alt="">
                    <p style="line-height: 25px">{{ $t('lang.emptyData') }}</p>
                </div>
            </template>
            <el-table-column
                v-for="item in header"
                :prop="item.prop"
                width="140"
                align="left">
                <template #header>
                    <span class="table-head">{{ item.label }}</span>
                </template>
                <template #default="scope">
                    <be-ellipsis-copy :targetStr="scope.row.address"
                                      v-if="item.prop === 'address'"
                                      fontLength="6"
                                      endLength="6">
                    </be-ellipsis-copy>
                    <span v-if="item.prop === 'quantity'">
                        {{ numberToCommaString(scope.row.quantity) }}
                    </span>
                    <span  v-if="item.prop === 'pair'">
                        {{scope.row.pair }}
                    </span>
                    <div v-if="item.prop === 'percentage'">
                        <p>{{ scope.row.percentage }}%</p>
                        <be-progress :percent="scope.row.percentage"
                                     strokeWidth="6"
                                     color="#1CD2A9"
                                     :showInfo="false">
                        </be-progress>
                    </div>

                </template>
            </el-table-column>

        </el-table>
    </div>
</template>

<script lang="ts">
import {defineComponent,PropType,ref} from "vue";
import {BeTag,BeProgress} from "../../../../../public/be-ui/be-ui.es";
import BeEllipsisCopy from "../../../../components/common-components/ellipsis-copy/ellipsis-copy.vue"
import {numberToCommaString} from "../../../../utils/common";
import {platformListDict} from '../../../../utils/platform-dict'
export interface ITableHeader {
    prop:string,
    label:string
}
export default defineComponent({
    name: "project-detail-top",
    components:{BeTag,BeEllipsisCopy,BeProgress},
    emits:['select'],
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
        tokenName:{
            type:String,
            default:''
        },
        tokenAddress:{
            type:String,
            default:''
        },
        types:{
            type:String,
            default:''
        },
    },
    setup(props,ctx){
        const curPlatform = ref<string>('bsc')
        /**
         * 處理選擇事件
         * @param {String} platform - 幣種
         */
        const handleSelect = (platform:string):void =>{
            let type:string = props.types
            ctx.emit('select', {platform:platform,type:type })
        }
        return {
            handleSelect,
            platformListDict,
            curPlatform,
            numberToCommaString
        }
    }
})
</script>

<style lang="scss">
  .project-detail-top5{

    .el-table--enable-row-hover .el-table__body tr:hover > td.el-table__cell{
      background-color: $mainColor6;
    }

    .top5-list-table{

      .el-table__empty-block{
        width: 100% !important;
      }

      .el-table__body {
        border-spacing: 0;

      }

      thead {
        font-size: 16px;
        line-height: 30px;
      }

      .el-table__row{
        height: 20px;

        &:hover{
          box-shadow: none;
        }
      }
    }
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
      font-family: AlibabaPuHuiTi-Medium, sans-serif;
      font-size: 18px;
      font-weight: bold;
      color: $textColor3;

      .tag{
        margin-left: 16px;
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