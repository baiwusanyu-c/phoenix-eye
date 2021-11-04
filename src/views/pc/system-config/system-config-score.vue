/*
* @system-config-score.vue
* @deprecated 风险评分配置页面
* @author czh
* @update (czh 2021/11/2)
*/
<template>
    <!--未完成-->
    <div class="systemConfigScoreBox">
        <div class="systemConfigTable">
            <div>
                <el-table
                        :cell-style="columnStyle"
                        :show-header="false"
                        border
                        :data="systemConfigScore"
                        :span-method="arraySpanMethod"
                        style="width: 100%">
                    <el-table-column
                            prop="project"
                            label="配置项目"
                            width="170px"
                            height="46px">
                    </el-table-column>
                    <el-table-column
                            prop="weight"
                            label="权重"
                            width="148px">
                        <template slot-scope="scope">
                            <span v-if="scope.$index === 1">{{staticDetectionWeight}}</span>
                            <span v-if="scope.$index === 2">{{tradeSafetyWeight}}</span>
                            <span v-if="scope.$index === 4">{{stableWeight}}</span>
                            <span v-if="scope.$index === 5">{{safetyPublicOptionWeight}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="configFst"
                            label="详细配置st"
                            width="204px">
                        <template slot-scope="scope">
                            <span>{{scope.row.configFst}}</span>
                            <span v-if="scope.$index === 1||scope.$index === 2||scope.$index === 3">-</span>
                            <el-input class="tableInput" v-show="scope.$index === 1" v-model="dangerHighNum"></el-input>
                            <span v-if="scope.$index === 4" style="margin: 0 10px">{{tradeScoreNum}}</span>
                            <img v-if="scope.$index ===4" src="../../../assets/image/pc/query.png" height="16" width="16"/>
                            <span v-if="scope.$index ===5" style="margin: 0 10px">-{{safetyPublicOptionNum}}/{{$t('lang.systemConfigScore.safetyPublicOptionPiece')}}</span>
                            <!--交易安全分数-->
                            <span v-if="scope.$index === 2">{{tradeSafetyNum1}}</span>
                            <span v-if="scope.$index === 3">{{tradeSafetyNum5}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="configSnd"
                            label="详细配置nd"
                            width="204px">
                        <template slot-scope="scope">
                            <span>{{scope.row.configSnd}}</span>
                            <span v-if="scope.$index === 1||scope.$index === 2||scope.$index === 3">-</span>
                            <el-input class="tableInput" v-show="scope.$index === 1" v-model="dangerMiddleNum"></el-input>
                            <!--交易安全分数-->
                            <span v-if="scope.$index === 2">{{tradeSafetyNum2}}</span>
                            <span v-if="scope.$index === 3">{{tradeSafetyNum6}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="configTrd"
                            label="详细配置rd"
                            width="204px">
                        <template slot-scope="scope">
                            <span>{{scope.row.configTrd}}</span>
                            <span v-if="scope.$index === 1||scope.$index === 2||scope.$index === 3">-</span>
                            <el-input class="tableInput" v-show="scope.$index === 1" v-model="dangerLowNum"></el-input>
                            <!--交易安全分数-->
                            <span v-if="scope.$index === 2">{{tradeSafetyNum3}}</span>
                            <span v-if="scope.$index === 3">{{tradeSafetyNum7}}</span>
                        </template >
                    </el-table-column>
                    <el-table-column
                            prop="configFth"
                            label="详细配置th"
                            width="204px">
                        <template slot-scope="scope">
                            <span>{{scope.row.configFth}}</span>
                            <span v-if="scope.$index === 2||scope.$index === 3">-</span>
                            <!--交易安全分数-->
                            <span v-if="scope.$index === 2">{{tradeSafetyNum4}}</span>
                            <span v-if="scope.$index === 3">{{tradeSafetyNum8}}</span>
                        </template >
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <div>
            <el-button-group class="changeConfig">
                <el-button class="changeConfigBtnText" icon="el-icon-refresh-right" type="text" @click="changeConfigWarning= true">初始化参数</el-button>
                <el-button class="changeConfigBtn" @click="changeConfig">{{$t('lang.systemConfigScore.changeConfig')}}</el-button>
            </el-button-group>
        </div>
        <el-dialog
                :title="$t('lang.systemConfigScore.formatConfigData')"
                :visible.sync="changeConfigWarning"
                width="416px"
                class="dialogWarning"
                >
            <div>
                <img src="../../../assets/image/pc/warning.png" style="margin-left: 150px" height="60" width="60"/>
            </div>
            <span style="color: #777777;margin-left: 50px">{{$t('lang.systemConfigScore.changeConfigWarning')}}</span>
            <span slot="footer" class="dialog-footer">
                <el-button class="changeConfigCancelBtn" @click="warningDialogCancel">{{$t('lang.createProject.createProjectCancel')}}</el-button>
                <el-button class="changeConfigConfirmBtn" type="primary" @click="warningDialogConfirm">{{$t('lang.createProject.createProjectConfirm')}}</el-button>
            </span>
        </el-dialog>

        <el-button-group class="cancelConfirm">
            <el-button icon="el-icon-refresh-right" type="text" @click="changeConfigWarning= true">初始化参数</el-button>
            <el-button class="changeConfigCancelBtn" @click="changeConfigCancel">{{$t('lang.createProject.createProjectCancel')}}</el-button>
            <el-button class="changeConfigConfirmBtn" @click="changeConfigConfirm">{{$t('lang.createProject.createProjectConfirm')}}</el-button>
        </el-button-group>
    </div>
</template>

<script>
export default {
    name: "system-config-score",
    data() {
        return {
            tradeSafetyNum1:20,
            tradeSafetyNum2:20,
            tradeSafetyNum3:20,
            tradeSafetyNum4:20,
            tradeSafetyNum5:20,
            tradeSafetyNum6:20,
            tradeSafetyNum7:20,
            tradeSafetyNum8: 20,
            staticDetectionWeight:'30%',
            tradeSafetyWeight:'20%',
            stableWeight:'25%',
            safetyPublicOptionWeight:'20%',
            changeConfigWarning:false,
            dangerHighNum:12,
            dangerMiddleNum:12,
            dangerLowNum:12,
            safetyPublicOptionNum: 1,
            tradeScoreNum: 1,
            systemConfigScore:[
                {
                    project:this.$t('lang.systemConfigScore.configProject'),
                    weight:this.$t('lang.systemConfigScore.weight'),
                    configFst:this.$t('lang.systemConfigScore.detailConfig'),
                    configSnd:'',
                    configTrd:'',
                    configFth:'',
                },
                {
                    project:this.$t('lang.systemConfigScore.staticDetection'),
                    weight:'',
                    configFst:this.$t('lang.systemConfigScore.dangerHigh'),
                    configSnd:this.$t('lang.systemConfigScore.dangerMiddle'),
                    configTrd:this.$t('lang.systemConfigScore.dangerLow'),
                    configFth:'',
                },
                {
                    project:this.$t('lang.systemConfigScore.tradeSafetyClass'),
                    weight:'',
                    configFst:this.$t('lang.systemConfigScore.tradeSafety1'),
                    configSnd:this.$t('lang.systemConfigScore.tradeSafety2'),
                    configTrd:this.$t('lang.systemConfigScore.tradeSafety3'),
                    configFth:this.$t('lang.systemConfigScore.tradeSafety4'),
                },
                {
                    configFst:this.$t('lang.systemConfigScore.tradeSafety5'),
                    configSnd:this.$t('lang.systemConfigScore.tradeSafety6'),
                    configTrd:this.$t('lang.systemConfigScore.tradeSafety7'),
                    configFth:this.$t('lang.systemConfigScore.tradeSafety8'),
                },
                {
                    project: this.$t('lang.systemConfigScore.tradeStable'),
                    weight:'',
                    configFst:this.$t('lang.systemConfigScore.tradeScore'),
                    configSnd:'',
                    configTrd:'',
                    configFth:'',
                },
                {
                    project: this.$t('lang.systemConfigScore.safetyPublicOptionClass'),
                    weight:'',
                    configFst:this.$t('lang.systemConfigScore.safetyPublicOption'),
                    configSnd:'',
                    configTrd:'',
                    configFth:'',
                },
                {
                    project: this.$t('lang.systemConfigScore.timeRange'),
                    weight:'',
                    configFst:this.$t('lang.systemConfigScore.timeTradeDate'),
                    configSnd:'',
                    configTrd:'',
                    configFth:'',
                }
            ],
        }
    },
    mounted() {
    },
    methods: {
        warningDialogCancel(){
            this.changeConfigWarning=false
        },
        warningDialogConfirm(){
            this.changeConfigWarning=false
        },
        changeConfig(){
            console.log('修改')
        },
        changeConfigCancel(){
            console.log('取消')
        },
        changeConfigConfirm(){
            console.log('确定')
        },
        //通过给table传入span-method方法可以实现合并行或列，方法的参数是一个对象
        // ，里面包含当前行row、当前列column、当前行号rowIndex、当前列号columnIndex四个属性。
        // 该函数可以返回一个包含两个元素的数组，第一个元素代表rowspan，第二个元素代表colspan。
        // 也可以返回一个键名为rowspan和colspan的对象。
        arraySpanMethod({ row, column, rowIndex, columnIndex }){
            if(rowIndex === 0||rowIndex === 4){
                if(columnIndex === 2){
                    return [1,4]
                }else if(columnIndex === 3||columnIndex === 4||columnIndex === 5){
                    return [0,0]
                }
            }
            if(columnIndex === 1||columnIndex === 0){
                if(rowIndex === 2){
                    return [2,1]
                }else if(rowIndex === 3){
                    return [0,0]
                }
            }
        },
        columnStyle({ row, column, rowIndex, columnIndex }){
          if(rowIndex === 0){
              return 'background-color:rgb(242 244 245);font-weight: 700;text-align: center;'
          }
          if(rowIndex === 0 || columnIndex === 0){
              return 'font-weight: 700;text-align: center'
          }
        },
        handleEdit(index, row) {
            console.log(index, row);
        },
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
    .systemConfigTable{
        width: 1136px;
        padding-top: 25px;
        padding-left: 22px;
    }
    .el-button--primary{
        background: #0468C2;
        border-color: #0468C2;
    }
    .changeConfigBtn{
        width: 88px;
        height: 32px;
        background: #0468C2;
        border-color: #0468C2;
        color: white;
    }
    .changeConfigConfirmBtn{
        width: 88px;
        height: 32px;
        background: #0468C2;
        border-color: #0468C2;
        color: white;
    }
    .changeConfigCancelBtn{
        width: 88px;
        height: 32px;
    }
    .el-dialog__body{
        margin: auto;
    }
    .changeConfig{
        width: 1000px;
        margin: 40px 490px;
    }
    .cancelConfirm{
        margin-left: 450px;
    }
    .el-button-group>.el-button+.el-button {
        margin-left: 26px;
    }
    .el-button-group>.el-button:last-child {
        border-top-left-radius: 4px;
        border-bottom-left-radius: 4px;
    }
    .el-button-group>.el-button:not(:first-child):not(:last-child) {
        border-radius: 4px;
    }
    .el-button{
        border-radius: 4px;
    }
    /*.tableInput{
        width: 60px;
        margin-left: 5px;
    }*/
    .el-input__inner{
        padding-left: 5px;
    }
    .tableInput[data-v-38e51434] {
        width: 60px;
        margin-left: 5px;
        /deep/ input.el-input__inner{
            height: 24px;
            padding-left: 5px;
            padding-top: 1px;
        }
    }
</style>