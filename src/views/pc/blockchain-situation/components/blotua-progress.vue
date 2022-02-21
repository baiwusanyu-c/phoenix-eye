<template>
    <div class="progress-main">
        <div v-for="(item,index) in sortProgress">
            <div class="progress-text">
                <div>
                    <span style="padding-right: 5px">No.{{index+1}}</span>
                    <span> {{item.name}}</span>
                </div>
                <span>{{item.value}}{{ $t('lang.piece') }}</span>
            </div>
            <el-progress :percentage="Math.round(`${item.value/sortProgress[0].value*100}`)"
                         :show-text="false"
                         class="progress-outer"
            ></el-progress>
        </div>
    </div>

</template>

<script lang="ts">
    import {defineComponent, ref, toRaw, computed} from 'vue'

    interface IScrollConfigData{
        name:string,
        value:string | number
    }

    export default defineComponent({
        name: "blotua-progress",
        setup(){
            const progressData = ref<any>([])
            // 排序方法
            const sortProgress = computed(()=>{
                return toRaw(progressData.value).sort((a:any,b:any)=>{
                    return b.value - a.value
                })
            })
            return {
                progressData,
                sortProgress
            }
        }
    })
</script>

<style scoped lang="scss">
    .progress-main{
        height:208px;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    .progress-text{
        color:#84ccff;
        display: flex;
        justify-content: space-between;
    }
</style>

<style lang="scss">
    .progress-outer .el-progress-bar__outer{
        border-radius: 0;
        background-color: #052e64;
    }
    .progress-outer .el-progress-bar__inner{
        border-radius: 0;
        background-color: #0066cf;
    }
</style>