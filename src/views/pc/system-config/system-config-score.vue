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
                                <!--百分数字符串-->
                                <el-input class="tableInput" v-show="scope.$index === 1" v-model.number="inputValue.staticDetectionWeightInput"></el-input>
                                <el-input class="tableInput" v-show="scope.$index === 2" v-model.number="inputValue.tradeSafetyWeightInput"></el-input>
                                <el-input class="tableInput" v-show="scope.$index === 4" v-model.number="inputValue.stableWeightInput"></el-input>
                                <el-input class="tableInput" v-show="scope.$index === 5" v-model.number="inputValue.safetyPublicOptionWeightInput"></el-input>
                            </span>
                            <span v-if="scope.$index !== 0 && scope.$index !== 6">%</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="configFst"
                            label="详细配置st"
                            width="204px">
                        <template slot-scope="scope">
                            <!--事件范围数字显示在前面-->
                            <span v-if="scope.$index === 6 && inputShow === false">{{timeTradeDateNum}}</span>
                            <el-input class="tableInput" v-show="scope.$index === 6 && inputShow === true" v-model="inputValue.timeTradeDateNumInput"></el-input>
                            <!--分割线-->
                            <span>{{scope.row.configFst}}</span>
                            <span v-if="scope.$index === 1||scope.$index === 2||scope.$index === 3">-</span>
                            <span v-show="inputShow === false">
                                <span  v-show="scope.$index === 1">{{dangerHighNum}}</span>
                                <span v-if="scope.$index === 4" style="margin: 0 10px">{{tradeScoreNum}}</span>
                                <img v-if="scope.$index ===4" src="../../../assets/image/pc/query.png" height="16" width="16"/>
                                <span v-if="scope.$index ===5" style="margin: 0 10px">-{{safetyPublicOptionNum}}/{{$t('lang.systemConfigScore.safetyPublicOptionPiece')}}</span>
                                <!--交易安全分数-->
                                <span v-if="scope.$index === 2">{{peerToPeerLending}}</span>
                                <span v-if="scope.$index === 3">{{tradeCircle}}</span>
                            </span>
                            <!--输入框部分-->
                            <span v-show="inputShow === true">
                                <el-input class="tableInput" v-show="scope.$index === 1" v-model.number="inputValue.dangerHighNumInput"></el-input>
                                <el-input class="tableInput" v-show="scope.$index === 2" v-model.number="inputValue.peerToPeerLendingInput"></el-input>
                                <el-input class="tableInput" v-show="scope.$index === 3" v-model.number="inputValue.tradeCircleInput"></el-input>
                                <el-input class="tableInput" v-show="scope.$index === 4" v-model.number="inputValue.tradeScoreNumInput"></el-input>
                                <el-input class="tableInput" v-show="scope.$index === 5" v-model.number="inputValue.safetyPublicOptionNumInput"></el-input>
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
                                <span v-if="scope.$index === 2">{{contractExecute}}</span>
                                <span v-if="scope.$index === 3">{{blackSocietiesAddress}}</span>
                            </span>
                            <!--输入框部分-->
                            <span v-show="inputShow === true">
                                <el-input class="tableInput" v-show="scope.$index === 1" v-model.number="inputValue.dangerMiddleNumInput"></el-input>
                                <el-input class="tableInput" v-show="scope.$index === 2" v-model.number="inputValue.contractExecuteInput"></el-input>
                                <el-input class="tableInput" v-show="scope.$index === 3" v-model.number="inputValue.blackSocietiesAddressInput"></el-input>
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
                                <span v-if="scope.$index === 2">{{currencyConversion}}</span>
                                <span v-if="scope.$index === 3">{{blockTrade}}</span>
                            </span>
                            <!--输入框部分-->
                            <span v-show="inputShow === true">
                                <el-input class="tableInput" v-show="scope.$index === 1" v-model.number="inputValue.dangerLowNumInput"></el-input>
                                <el-input class="tableInput" v-show="scope.$index === 2" v-model.number="inputValue.currencyConversionInput"></el-input>
                                <el-input class="tableInput" v-show="scope.$index === 3" v-model.number="inputValue.blockTradeInput"></el-input>
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
                                <span v-if="scope.$index === 2">{{repeatedCalls}}</span>
                                <span v-if="scope.$index === 3">{{riskIdentifyByAI}}</span>
                            </span>
                            <!--输入框部分-->
                            <span v-show="inputShow === true">
                                <el-input class="tableInput" v-show="scope.$index === 2" v-model="inputValue.repeatedCallsInput"></el-input>
                                <el-input class="tableInput" v-show="scope.$index === 3" v-model="inputValue.riskIdentifyByAIInput"></el-input>
                            </span>
                            <!--交易安全分数-->
                        </template >
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <div class="btnClass">
            <div class="changeConfig" v-show="inputShow === false">
                <el-button class="changeConfigBtnText" icon="el-icon-refresh-right" type="text" @click="changeConfigWarning= true">初始化参数</el-button>
                <el-button class="primary hbjbh" type="primary" @click="changeConfig">{{$t('lang.systemConfigScore.changeConfig')}}</el-button>
            </div>
            <div class="cancelConfirm" v-show="inputShow === true">
                <el-button icon="el-icon-refresh-right" type="text" @click="changeConfigWarningInput = true">初始化参数</el-button>
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
        <be-msg-dialog @confirm="warningDialogConfirmInput"
                       :isShow.sync="changeConfigWarningInput"
                       :title="$t('lang.systemConfigScore.formatConfigData')"
                       :sub-title="$t('lang.systemConfigScore.changeConfigWarning')"
        >
        </be-msg-dialog>
        <be-msg-dialog @confirm="changeConfigConfirm"
                       :isShow.sync="configConfirm"
                       :title="$t('lang.systemConfigScore.checkInput')"
        >
        </be-msg-dialog>
    </div>
</template>

<script>
export default {
    name: "system-config-score",
    data() {
        return {
            configConfirm:false,
            changeConfigWarning:false,
            changeConfigWarningInput:false,
            inputShow:false,
            /*静态初始化数据*/
            /*交易安全详细信息*/
            peerToPeerLendingStatic:20,
            contractExecuteStatic:20,
            currencyConversionStatic:20,
            repeatedCallsStatic:20,
            tradeCircleStatic:20,
            blackSocietiesAddressStatic:20,
            blockTradeStatic:20,
            riskIdentifyByAIStatic: 20,
            /*权重 百分比*/
            staticDetectionWeightStatic:30,
            tradeSafetyWeightStatic:20,
            stableWeightStatic:25,
            safetyPublicOptionWeightStatic:20,
            /*静态检测详细信息*/
            dangerHighNumStatic:12,
            dangerMiddleNumStatic:12,
            dangerLowNumStatic:12,

            safetyPublicOptionNumStatic: 1,
            tradeScoreNumStatic: 1,
            timeTradeDateNumStatic: 25,
            /*显示的数据*/
            /*交易安全详细信息*/
            peerToPeerLending:20,
            contractExecute:20,
            currencyConversion:20,
            repeatedCalls:20,
            tradeCircle:20,
            blackSocietiesAddress:20,
            blockTrade:20,
            riskIdentifyByAI: 20,
            /*权重 百分比*/
            staticDetectionWeight:30,
            tradeSafetyWeight:20,
            stableWeight:25,
            safetyPublicOptionWeight:20,
            /*静态检测详细信息*/
            dangerHighNum:12,
            dangerMiddleNum:12,
            dangerLowNum:12,

            safetyPublicOptionNum: 1,
            tradeScoreNum: 1,
            timeTradeDateNum: 25,

            /*输入框绑定数据*/
            inputValue:{
                peerToPeerLendingInput:'',
                contractExecuteInput:'',
                currencyConversionInput:'',
                repeatedCallsInput:'',
                tradeCircleInput:'',
                blackSocietiesAddressInput:'',
                blockTradeInput:'',
                riskIdentifyByAIInput:'',
                staticDetectionWeightInput:'',
                tradeSafetyWeightInput:'',
                stableWeightInput:'',
                safetyPublicOptionWeightInput:'',
                dangerHighNumInput:'',
                dangerMiddleNumInput:'',
                dangerLowNumInput:'',
                safetyPublicOptionNumInput: '',
                tradeScoreNumInput: '',
                timeTradeDateNumInput: '',
            },
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
                    configFst:this.$t('lang.systemConfigScore.peerToPeerLending'),
                    configSnd:this.$t('lang.systemConfigScore.contractExecute'),
                    configTrd:this.$t('lang.systemConfigScore.currencyConversion'),
                    configFth:this.$t('lang.systemConfigScore.repeatedCalls'),
                },
                {
                    configFst:this.$t('lang.systemConfigScore.tradeCircle'),
                    configSnd:this.$t('lang.systemConfigScore.blackSocietiesAddress'),
                    configTrd:this.$t('lang.systemConfigScore.blockTrade'),
                    configFth:this.$t('lang.systemConfigScore.riskIdentifyByAI'),
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
            this.changeConfigWarningInput = false
            /*不点击修改时的初始化参数*/
            this.peerToPeerLending = this.peerToPeerLendingStatic
            this.contractExecute = this.contractExecuteStatic
            this.currencyConversion = this.currencyConversionStatic
            this.repeatedCalls = this.repeatedCallsStatic
            this.tradeCircle = this.tradeCircleStatic
            this.blackSocietiesAddress = this.blackSocietiesAddressStatic
            this.blockTrade = this.blockTradeStatic
            this.riskIdentifyByAI = this.riskIdentifyByAIStatic
            this.staticDetectionWeight = this.staticDetectionWeightStatic
            this.tradeSafetyWeight = this.tradeSafetyWeightStatic
            this.stableWeight = this.stableWeightStatic
            this.safetyPublicOptionWeight = this.safetyPublicOptionWeightStatic
            this.dangerHighNum = this.dangerHighNumStatic
            this.dangerMiddleNum = this.dangerMiddleNumStatic
            this.dangerLowNum = this.dangerLowNumStatic
            this.safetyPublicOptionNum = this.safetyPublicOptionNumStatic
            this.tradeScoreNum = this.tradeScoreNumStatic
            this.timeTradeDateNum = this.timeTradeDateNumStatic
            console.log('不点击修改按钮时的初始化参数成功')
        },
        warningDialogConfirmInput(){
            this.changeConfigWarning = false
            /*点击修改时的初始化参数*/
            this.inputValue.peerToPeerLendingInput = this.peerToPeerLendingStatic
            this.inputValue.contractExecuteInput = this.contractExecuteStatic
            this.inputValue.currencyConversionInput = this.currencyConversionStatic
            this.inputValue.repeatedCallsInput = this.repeatedCallsStatic
            this.inputValue.tradeCircleInput = this.tradeCircleStatic
            this.inputValue.blackSocietiesAddressInput = this.blackSocietiesAddressStatic
            this.inputValue.blockTradeInput = this.blockTradeStatic
            this.inputValue.riskIdentifyByAIInput = this.riskIdentifyByAIStatic
            this.inputValue.staticDetectionWeightInput = this.staticDetectionWeightStatic
            this.inputValue.tradeSafetyWeightInput = this.tradeSafetyWeightStatic
            this.inputValue.stableWeightInput = this.stableWeightStatic
            this.inputValue.safetyPublicOptionWeightInput = this.safetyPublicOptionWeightStatic
            this.inputValue.dangerHighNumInput = this.dangerHighNumStatic
            this.inputValue.dangerMiddleNumInput = this.dangerMiddleNumStatic
            this.inputValue.dangerLowNumInput = this.dangerLowNumStatic
            this.inputValue.safetyPublicOptionNumInput = this.safetyPublicOptionNumStatic
            this.inputValue.tradeScoreNumInput = this.tradeScoreNumStatic
            this.inputValue.timeTradeDateNumInput = this.timeTradeDateNumStatic
            console.log('点击修改按钮时的初始化参数成功放入输入框')
        },
        changeConfig(){
            this.inputShow = true
            console.log('我要修改啦')
        },
        changeConfigCancel(){
            this.inputShow = false
            console.log('取消修改')
        },
        changeConfigConfirm(){
            let valArr = Object.values(this.inputValue)
            let valArrEmpty = valArr.filter((t)=>{
                return t === ''
            })
            console.log(valArrEmpty.length)
            if(valArrEmpty.length === 0){
                this.peerToPeerLending = this.inputValue.peerToPeerLendingInput
                this.contractExecute = this.inputValue.contractExecuteInput
                this.currencyConversion = this.inputValue.currencyConversionInput
                this.repeatedCalls = this.inputValue.repeatedCallsInput
                this.tradeCircle = this.inputValue.tradeCircleInput
                this.blackSocietiesAddress = this.inputValue.blackSocietiesAddressInput
                this.blockTrade = this.inputValue.blockTradeInput
                this.riskIdentifyByAI = this.inputValue.riskIdentifyByAIInput
                this.staticDetectionWeight = this.inputValue.staticDetectionWeightInput
                this.tradeSafetyWeight = this.inputValue.tradeSafetyWeightInput
                this.stableWeight = this.inputValue.stableWeightInput
                this.safetyPublicOptionWeight = this.inputValue.safetyPublicOptionWeightInput
                this.dangerHighNum = this.inputValue.dangerHighNumInput
                this.dangerMiddleNum = this.inputValue.dangerMiddleNumInput
                this.dangerLowNum = this.inputValue.dangerLowNumInput
                this.safetyPublicOptionNum = this.inputValue.safetyPublicOptionNumInput
                this.tradeScoreNum = this.inputValue.tradeScoreNumInput
                this.timeTradeDateNum = this.inputValue.timeTradeDateNumInput
                this.inputShow = false
                this.inputValue.peerToPeerLendingInput = ''
                this.inputValue.contractExecuteInput = ''
                this.inputValue.currencyConversionInput = ''
                this.inputValue.repeatedCallsInput = ''
                this.inputValue.tradeCircleInput = ''
                this.inputValue.blackSocietiesAddressInput = ''
                this.inputValue.blockTradeInput = ''
                this.inputValue.riskIdentifyByAIInput = ''
                this.inputValue.staticDetectionWeightInput = ''
                this.inputValue.tradeSafetyWeightInput = ''
                this.inputValue.stableWeightInput = ''
                this.inputValue.safetyPublicOptionWeightInput = ''
                this.inputValue.dangerHighNumInput = ''
                this.inputValue.dangerMiddleNumInput = ''
                this.inputValue.dangerLowNumInput = ''
                this.inputValue.safetyPublicOptionNumInput = ''
                this.inputValue.tradeScoreNumInput = ''
                this.inputValue.timeTradeDateNumInput = ''
                console.log('确定修改')
            }else{
                this.configConfirm = true
            }
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