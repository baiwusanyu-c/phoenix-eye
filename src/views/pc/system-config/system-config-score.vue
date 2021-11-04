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
                            <span>{{scope.row.weight}}</span>
                            <span v-show="inputShow === false">
                                <span v-if="scope.$index === 1">{{staticDetectionWeight}}</span>
                                <span v-if="scope.$index === 2">{{tradeSafetyWeight}}</span>
                                <span v-if="scope.$index === 4">{{stableWeight}}</span>
                                <span v-if="scope.$index === 5">{{safetyPublicOptionWeight}}</span>
                            </span>
                            <span v-show="inputShow === true">
                                <el-input class="tableInput" v-show="scope.$index === 1" v-model.number="staticDetectionWeightInput"></el-input>
                                <el-input class="tableInput" v-show="scope.$index === 2" v-model.number="tradeSafetyWeightInput"></el-input>
                                <el-input class="tableInput" v-show="scope.$index === 4" v-model.number="stableWeightInput"></el-input>
                                <el-input class="tableInput" v-show="scope.$index === 5" v-model.number="safetyPublicOptionWeightInput"></el-input>
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="configFst"
                            label="详细配置st"
                            width="204px">
                        <template slot-scope="scope">
                            <!--事件范围数字显示在前面-->
                            <span v-if="scope.$index === 6 && inputShow === false">{{timeTradeDateNum}}</span>
                            <el-input class="tableInput" v-show="scope.$index === 6 && inputShow === true">{{timeTradeDateNumInput}}</el-input>
                            <!--分割线-->
                            <span>{{scope.row.configFst}}</span>
                            <span v-if="scope.$index === 1||scope.$index === 2||scope.$index === 3">-</span>
                            <!--输入框部分-->
                            <span v-show="inputShow === false">
                                <span  v-show="scope.$index === 1">{{dangerHighNum}}</span>
                                <span v-if="scope.$index === 4" style="margin: 0 10px">{{tradeScoreNum}}</span>
                                <img v-if="scope.$index ===4" src="../../../assets/image/pc/query.png" height="16" width="16"/>
                                <span v-if="scope.$index ===5" style="margin: 0 10px">-{{safetyPublicOptionNum}}/{{$t('lang.systemConfigScore.safetyPublicOptionPiece')}}</span>
                                <!--交易安全分数-->
                                <span v-if="scope.$index === 2">{{tradeSafetyNum1}}</span>
                                <span v-if="scope.$index === 3">{{tradeSafetyNum5}}</span>
                            </span>
                            <span v-show="inputShow === true">
                                <el-input class="tableInput" v-show="scope.$index === 1" v-model.number="dangerHighNumInput"></el-input>
                                <el-input class="tableInput" v-show="scope.$index === 2" v-model.number="dangerHighNumInput"></el-input>
                                <el-input class="tableInput" v-show="scope.$index === 3" v-model.number="dangerHighNumInput"></el-input>
                                <el-input class="tableInput" v-show="scope.$index === 4" v-model.number="dangerHighNumInput"></el-input>
                                <el-input class="tableInput" v-show="scope.$index === 5" v-model.number="dangerHighNumInput"></el-input>
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="configSnd"
                            label="详细配置nd"
                            width="204px">
                        <template slot-scope="scope">
                            <span>{{scope.row.configSnd}}</span>
                            <span v-if="scope.$index === 1||scope.$index === 2||scope.$index === 3">-</span>
                            <span v-show="inputShow === false">
                                <span  v-show="scope.$index === 1">{{dangerMiddleNum}}</span>
                                <span v-if="scope.$index === 2">{{tradeSafetyNum2}}</span>
                                <span v-if="scope.$index === 3">{{tradeSafetyNum6}}</span>
                            </span>
                            <!--输入框部分-->
                            <span v-show="inputShow === true">
                                <el-input class="tableInput" v-show="scope.$index === 1" v-model="dangerMiddleNumInput"></el-input>
                                <el-input class="tableInput" v-show="scope.$index === 2" v-model="tradeSafetyNum2Input"></el-input>
                                <el-input class="tableInput" v-show="scope.$index === 3" v-model="tradeSafetyNum6Input"></el-input>
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="configTrd"
                            label="详细配置rd"
                            width="204px">
                        <template slot-scope="scope">
                            <span>{{scope.row.configTrd}}</span>
                            <span v-if="scope.$index === 1||scope.$index === 2||scope.$index === 3">-</span>
                            <span v-show="inputShow === false">
                                <span class="tableInput" v-show="scope.$index === 1">{{dangerLowNum}}</span>
                                <span v-if="scope.$index === 2">{{tradeSafetyNum3}}</span>
                                <span v-if="scope.$index === 3">{{tradeSafetyNum7}}</span>
                            </span>
                            <!--输入框部分-->
                            <span v-show="inputShow === true">
                                <el-input class="tableInput" v-show="scope.$index === 1" v-model="dangerMiddleNumInput"></el-input>
                                <el-input class="tableInput" v-show="scope.$index === 2" v-model="tradeSafetyNum2Input"></el-input>
                                <el-input class="tableInput" v-show="scope.$index === 3" v-model="tradeSafetyNum6Input"></el-input>
                            </span>
                            <!--交易安全分数-->
                        </template >
                    </el-table-column>
                    <el-table-column
                            prop="configFth"
                            label="详细配置th"
                            width="204px">
                        <template slot-scope="scope">
                            <span>{{scope.row.configFth}}</span>
                            <span v-if="scope.$index === 2||scope.$index === 3">-</span>
                            <span v-show="inputShow === false">
                                <span v-if="scope.$index === 2">{{tradeSafetyNum4}}</span>
                                <span v-if="scope.$index === 3">{{tradeSafetyNum8}}</span>
                            </span>
                            <!--输入框部分-->
                            <span v-show="inputShow === true">
                                <el-input class="tableInput" v-show="scope.$index === 2" v-model="tradeSafetyNum4Input"></el-input>
                                <el-input class="tableInput" v-show="scope.$index === 3" v-model="tradeSafetyNum8Input"></el-input>
                            </span>
                            <!--交易安全分数-->
                        </template >
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <div class="btnClass">
            <div class="changeConfig">
                <el-button class="changeConfigBtnText" icon="el-icon-refresh-right" type="text" @click="changeConfigWarning= true">初始化参数</el-button>
                <el-button class="primary hbjbh" type="primary"  @click="changeConfig">{{$t('lang.systemConfigScore.changeConfig')}}</el-button>
            </div>
            <div class="cancelConfirm">
                <el-button icon="el-icon-refresh-right" type="text" @click="changeConfigWarning= true">初始化参数</el-button>
                <el-button class="default" type="primary" @click="changeConfigCancel">{{$t('lang.createProject.createProjectCancel')}}</el-button>
                <el-button class="primary hbjbh" type="primary"  @click="changeConfigConfirm">{{$t('lang.createProject.createProjectConfirm')}}</el-button>
            </div>
        </div>
        <be-msg-dialog @confirm="warningDialogConfirm"
                       :isShow.sync="changeConfigWarning"
                       :title="$t('lang.systemConfigScore.formatConfigData')"
                       :sub-title="$t('lang.systemConfigScore.changeConfigWarning')"
        >
        </be-msg-dialog>
    </div>
</template>

<script>
export default {
    name: "system-config-score",
    data() {
        return {
            inputShow:false,
            tradeSafetyNum1:20,
            tradeSafetyNum1Input:'',
            tradeSafetyNum2:20,
            tradeSafetyNum2Input:'',
            tradeSafetyNum3:20,
            tradeSafetyNum3Input:'',
            tradeSafetyNum4:20,
            tradeSafetyNum4Input:'',
            tradeSafetyNum5:20,
            tradeSafetyNum5Input:'',
            tradeSafetyNum6:20,
            tradeSafetyNum6Input:'',
            tradeSafetyNum7:20,
            tradeSafetyNum7Input:'',
            tradeSafetyNum8: 20,
            tradeSafetyNum8Input:'',
            staticDetectionWeight:'30%',
            staticDetectionWeightInput:'',
            tradeSafetyWeight:'20%',
            tradeSafetyWeightInput:'',
            stableWeight:'25%',
            stableWeightInput:'',
            safetyPublicOptionWeight:'20%',
            safetyPublicOptionWeightInput:'',
            changeConfigWarning:false,
            dangerHighNum:12,
            dangerHighNumInput:'',
            dangerMiddleNum:12,
            dangerMiddleNumInput:'',
            dangerLowNum:12,
            dangerLowNumInput:'',
            safetyPublicOptionNum: 1,
            safetyPublicOptionNumInput: '',
            tradeScoreNum: 1,
            tradeScoreNumInput: '',
            timeTradeDateNum: 25,
            timeTradeDateNumInput: '',
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
        warningDialogConfirm(){
            this.changeConfigWarning=false
        },
        changeConfig(){
            this.inputShow = true
            console.log('修改')
        },
        changeConfigCancel(){
            console.log('取消')
        },
        changeConfigConfirm(){
            this.inputShow = false
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
    .el-dialog__body{
        display: flex;
        align-items: center;
    }
    .btnClass{
        width: 1136px;
        height: 200px;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
    }
    .changeConfig{
        display: flex;
        align-items: baseline;
        justify-content: center;
    }
    .cancelConfirm{
        display: flex;
        align-items: baseline;
        justify-content: center;
    }
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