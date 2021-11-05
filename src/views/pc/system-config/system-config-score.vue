/*
* @system-config-score.vue
* @deprecated 风险评分配置页面
* @author czh
* @update (czh 2021/11/2)
*/
<template>
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
                                <span v-if="scope.$index === 1">{{inputValue.staticDetectionWeightInput}}</span>
                                <span v-if="scope.$index === 2">{{inputValue.tradeSafetyWeightInput}}</span>
                                <span v-if="scope.$index === 4">{{inputValue.stableWeightInput}}</span>
                                <span v-if="scope.$index === 5">{{inputValue.safetyPublicOptionWeightInput}}</span>
                            </span>
                            <span v-show="inputShow === true">
                                <!--百分数字符串-->
                                <el-input class="tableInput" v-show="scope.$index === 1" v-model="inputValue.staticDetectionWeightInput"></el-input>
                                <el-input class="tableInput" v-show="scope.$index === 2" v-model="inputValue.tradeSafetyWeightInput"></el-input>
                                <el-input class="tableInput" v-show="scope.$index === 4" v-model="inputValue.stableWeightInput"></el-input>
                                <el-input class="tableInput" v-show="scope.$index === 5" v-model="inputValue.safetyPublicOptionWeightInput"></el-input>
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
                            <span v-if="scope.$index === 6 && inputShow === false">{{inputValue.timeTradeDateNumInput}}</span>
                            <el-input class="tableInput" v-show="scope.$index === 6 && inputShow === true" v-model="inputValue.timeTradeDateNumInput"></el-input>
                            <!--分割线-->
                            <span>{{scope.row.configFst}}</span>
                            <span v-show="inputShow === false">
                                <span  v-show="scope.$index === 1">{{inputValue.dangerHighNumInput}}</span>
                                <span v-if="scope.$index === 4" style="margin: 0 10px">{{inputValue.tradeScoreNumInput}}</span>
                                <img v-if="scope.$index ===4" src="../../../assets/image/pc/query.png" height="16" width="16"/>
                                <span v-if="scope.$index ===5" style="margin: 0 10px">{{inputValue.safetyPublicOptionNumInput}}/{{$t('lang.systemConfigScore.safetyPublicOptionPiece')}}</span>
                                <!--交易安全分数-->
                                <span v-if="scope.$index === 2">{{inputValue.peerToPeerLendingInput}}</span>
                                <span v-if="scope.$index === 3">{{inputValue.tradeCircleInput}}</span>
                            </span>
                            <!--输入框部分-->
                            <span v-show="inputShow === true">
                                <el-input class="tableInput" v-show="scope.$index === 1" v-model="inputValue.dangerHighNumInput"></el-input>
                                <el-input class="tableInput" v-show="scope.$index === 2" v-model="inputValue.peerToPeerLendingInput"></el-input>
                                <el-input class="tableInput" v-show="scope.$index === 3" v-model="inputValue.tradeCircleInput"></el-input>
                                <el-input class="tableInput" v-show="scope.$index === 4" v-model="inputValue.tradeScoreNumInput"></el-input>
                                <span v-show="scope.$index === 5">-</span>
                                <el-input class="tableInput" v-show="scope.$index === 5" v-model="inputValue.safetyPublicOptionNumInput"></el-input>
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="configSnd"
                            label="详细配置nd"
                            width="204px">
                        <template slot-scope="scope">
                            <span>{{scope.row.configSnd}}</span>
                            <span v-show="inputShow === false">
                                <span  v-show="scope.$index === 1">{{inputValue.dangerMiddleNumInput}}</span>
                                <span v-if="scope.$index === 2">{{inputValue.contractExecuteInput}}</span>
                                <span v-if="scope.$index === 3">{{inputValue.blackSocietiesAddressInput}}</span>
                            </span>
                            <!--输入框部分-->
                            <span v-show="inputShow === true">
                                <el-input class="tableInput" v-show="scope.$index === 1" v-model="inputValue.dangerMiddleNumInput"></el-input>
                                <el-input class="tableInput" v-show="scope.$index === 2" v-model="inputValue.contractExecuteInput"></el-input>
                                <el-input class="tableInput" v-show="scope.$index === 3" v-model="inputValue.blackSocietiesAddressInput"></el-input>
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="configTrd"
                            label="详细配置rd"
                            width="204px">
                        <template slot-scope="scope">
                            <span>{{scope.row.configTrd}}</span>
                            <span v-show="inputShow === false">
                                <span class="tableInput" v-show="scope.$index === 1">{{inputValue.dangerLowNumInput}}</span>
                                <span v-if="scope.$index === 2">{{inputValue.currencyConversionInput}}</span>
                                <span v-if="scope.$index === 3">{{inputValue.blockTradeInput}}</span>
                            </span>
                            <!--输入框部分-->
                            <span v-show="inputShow === true">
                                <el-input class="tableInput" v-show="scope.$index === 1" v-model="inputValue.dangerLowNumInput"></el-input>
                                <el-input class="tableInput" v-show="scope.$index === 2" v-model="inputValue.currencyConversionInput"></el-input>
                                <el-input class="tableInput" v-show="scope.$index === 3" v-model="inputValue.blockTradeInput"></el-input>
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
                            <span v-show="inputShow === false">
                                <span v-if="scope.$index === 2">{{inputValue.repeatedCallsInput}}</span>
                                <span v-if="scope.$index === 3">{{inputValue.riskIdentifyByAIInput}}</span>
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
                <el-button class="changeConfigBtnText" icon="el-icon-refresh-right" type="text" @click="changeConfigWarning= true">{{$t('lang.systemConfigScore.formatConfigData')}}</el-button>
                <el-button class="primary hbjbh" type="primary" @click="changeConfig">{{$t('lang.systemConfigScore.changeConfig')}}</el-button>
            </div>
            <div class="cancelConfirm" v-show="inputShow === true">
                <el-button icon="el-icon-refresh-right" type="text" @click="changeConfigWarning = true">{{$t('lang.systemConfigScore.formatConfigData')}}</el-button>
                <el-button class="default" type="primary" @click="changeConfigCancel">{{$t('lang.createProject.createProjectCancel')}}</el-button>
                <el-button class="primary hbjbh" type="primary"  @click="changeConfigConfirm">{{$t('lang.createProject.createProjectConfirm')}}</el-button>
            </div>
        </div>
        <!--是否初始化数据警告框-->
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
            changeConfigWarning:false,
            changeConfigWarningInput:false,
            inputShow:false,
            /*输入框绑定以及显示的数据*/
            inputValue:{
                /*交易安全详细信息*/
                peerToPeerLendingInput:'-20',
                contractExecuteInput:'-20',
                currencyConversionInput:'-20',
                repeatedCallsInput:'-20',
                tradeCircleInput:'-20',
                blackSocietiesAddressInput:'-20',
                blockTradeInput:'-20',
                riskIdentifyByAIInput:'-20',
                /*权重 百分比*/
                staticDetectionWeightInput:'30',
                tradeSafetyWeightInput:'20',
                stableWeightInput:'25',
                safetyPublicOptionWeightInput:'20',
                /*静态检测详细信息*/
                dangerHighNumInput:'-12',
                dangerMiddleNumInput:'-12',
                dangerLowNumInput:'-12',
                /*交易稳定性评分系数*/
                tradeScoreNumInput: '1',
                /*安全舆情*/
                safetyPublicOptionNumInput: '-1',
                /*时间范围*/
                timeTradeDateNumInput: '25',
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
        this.initData('init')
    },
    methods: {
        /**
         * 初始化\参数
         * @param type
         */
        initData(type = 'init'){
            if(type === 'init'){
                // 这里应该调接口拿数据

            }else{
                // 重置初始化参数
                this.inputValue = {
                    peerToPeerLendingInput:'-20',
                    contractExecuteInput:'-20',
                    currencyConversionInput:'-20',
                    repeatedCallsInput:'-20',
                    tradeCircleInput:'-20',
                    blackSocietiesAddressInput:'-20',
                    blockTradeInput:'-20',
                    riskIdentifyByAIInput:'-20',
                    staticDetectionWeightInput:'30',
                    tradeSafetyWeightInput:'20',
                    stableWeightInput:'25',
                    safetyPublicOptionWeightInput:'20',
                    dangerHighNumInput:'-12',
                    dangerMiddleNumInput:'-12',
                    dangerLowNumInput:'-12',
                    safetyPublicOptionNumInput: '-1',
                    tradeScoreNumInput: '-1',
                    timeTradeDateNumInput: '-25',
                }

            }
        },
        /*初始化参数*/
        warningDialogConfirm(){
            this.changeConfigWarningInput = false
            /*初始化参数*/
            this.initData('reset')
        },
        /*修改，显示input框*/
        changeConfig(){
            this.inputShow = true
        },
        /*取消修改*/
        changeConfigCancel(){
            this.inputShow = false
            // 再调取一次接口，拿到上次修改的数据
            this.initData('init')
        },
        /*修改风险评分配置信息*/
        changeConfigConfirm(){
            let valArr = Object.values(this.inputValue)
            let valArrEmpty = valArr.filter((t)=>{
                return t === ''
            })
            // 大于0 说明有不合格的参数 直接返回
            if(valArrEmpty.length > 0){
                this.$message.warning('参数输入错误')
                return
            }
            this.inputShow = false
            // 调用后端接口，存储表单数据
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