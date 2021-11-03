/*
* @system-config-score.vue
* @deprecated 风险评分配置页面
* @author czh
* @update (czh 2021/11/2)
*/
<template>
    <!--未完成-->
    <div class="systemConfigScoreBox">
        <div>
            <el-table
                    :show-header="false"
                    border
                    :data="systemConfigScore"
                    :span-method="arraySpanMethod"
                    style="width: 100%">
                <el-table-column
                        prop="project"
                        label="配置项目"
                        width="150">
                </el-table-column>
                <el-table-column
                        prop="project"
                        label="配置项目"
                        width="150">
                </el-table-column>
                <el-table-column
                        prop="project"
                        label="配置项目"
                        width="150">
                </el-table-column>
                <el-table-column
                        prop="project"
                        label="配置项目"
                        width="150">
                </el-table-column>
                <el-table-column
                        prop="project"
                        label="配置项目"
                        width="150">
                </el-table-column>
                <el-table-column
                        prop="project"
                        label="配置项目"
                        width="150">
                </el-table-column>
            </el-table>
        </div>
        <div>
            <el-button icon="el-icon-refresh-right" type="text">初始化参数</el-button>
            <el-button>修改</el-button>
        </div>
    </div>
</template>

<script>
export default {
    name: "system-config-score",
    data() {
        return {
            systemConfigScore:[
                {
                    project:'配置项目',
                },
                {
                    project:'静态检测',
                },
                {
                    project:'交易安全'
                },
                {
                    project: '交易稳定性'
                },
                {
                    project: '安全舆情'
                },
                {
                    project: '时间范围'
                }
            ],
        }
    },
    mounted() {
    },
    methods: {
        //通过给table传入span-method方法可以实现合并行或列，方法的参数是一个对象
        // ，里面包含当前行row、当前列column、当前行号rowIndex、当前列号columnIndex四个属性。
        // 该函数可以返回一个包含两个元素的数组，第一个元素代表rowspan，第二个元素代表colspan。
        // 也可以返回一个键名为rowspan和colspan的对象。
        arraySpanMethod({ row, column, rowIndex, columnIndex }){
            if(rowIndex === 0){
                if(columnIndex === 2||columnIndex === 3 || columnIndex ===4){
                    console.log('未完成')
                }
            }
        }
    },
}
</script>

<style scoped lang="scss">
    .systemConfigScoreBox{
        width: 1184px;
        height: 612px;
        margin: 24px auto;
        background-color: white;
    }
</style>