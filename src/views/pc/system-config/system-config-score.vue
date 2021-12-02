/*
* @system-config-score.vue
* @deprecated 风险评分配置页面
* @author czh
* @update (czh 2021/11/2)
*/
<template>
    <div class="system-config-score">
        <div class="system-config-score-box">
            <div class="system-config-table">
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
                            :width="widthGird"
                            height="46px">
                        </el-table-column>
                        <el-table-column
                            prop="weight"
                            label="权重"
                            width="148px">
                            <template slot-scope="scope">
                                <span>{{scope.row.weight}}</span>
                                <span v-show="inputShow === false">
                                <span v-if="scope.$index === 1">{{inputValue.static_testing.weight}}</span>
                                <span v-if="scope.$index === 2">{{inputValue.tx_safety.weight}}</span>
                                <span v-if="scope.$index === 4">{{inputValue.tx_stability.weight}}</span>
                                <span v-if="scope.$index === 5">{{inputValue.safety_opinion.weight}}</span>
                            </span>
                                <span v-show="inputShow === true">
                                <!--百分数字符串-->
                                    <el-input class="table-input" v-show="scope.$index === 1" v-model.number="inputValue.static_testing.weight"></el-input>
                                    <el-input class="table-input" v-show="scope.$index === 2" v-model.number="inputValue.tx_safety.weight"></el-input>
                                    <el-input class="table-input" v-show="scope.$index === 4" v-model.number="inputValue.tx_stability.weight"></el-input>
                                    <el-input class="table-input" v-show="scope.$index === 5" v-model.number="inputValue.safety_opinion.weight"></el-input>
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
                                <span v-if="scope.$index === 6 && inputShow === false">{{inputValue.time_range}}</span>
                                <el-input class="table-input" v-show="scope.$index === 6 && inputShow === true" v-model.number="inputValue.time_range"></el-input>
                                <!--分割线-->
                                <span>{{scope.row.configFst}}</span>
                                <span v-if="scope.$index !== 0 && scope.$index !== 6 && scope.$index !== 4 && scope.$index !== 3">-</span>
                                <span v-show="inputShow === false">
                                <span  v-show="scope.$index === 1">{{inputValue.static_testing.config.high_risk}}</span>
                                <span v-if="scope.$index === 4" style="margin: 0 10px">{{inputValue.tx_stability.config.score_coefficient}}</span>
                                <img v-if="scope.$index ===4" src="../../../assets/image/pc/query.png" height="16" width="16" alt=""/>
                                <span v-if="scope.$index ===5">
                                    {{inputValue.safety_opinion.config.each}}/{{$t('el.systemConfigScore.safetyPublicOptionPiece')}}
                                </span>
                                    <!--交易安全分数-->
                                <span v-if="scope.$index === 2">{{inputValue.tx_safety.config.flash_load_tx}}</span>
                            </span>
                                <!--输入框部分-->
                                <span v-show="inputShow === true">
                                    <el-input class="table-input" v-show="scope.$index === 1" v-model.number="inputValue.static_testing.config.high_risk"></el-input>
                                    <el-input class="table-input" v-show="scope.$index === 2" v-model.number="inputValue.tx_safety.config.flash_load_tx"></el-input>
                                    <el-input class="table-input" v-show="scope.$index === 4" v-model.number="inputValue.tx_stability.config.score_coefficient"></el-input>
                                    <el-input class="table-input" v-show="scope.$index === 5" v-model.number="inputValue.safety_opinion.config.each"></el-input>
                                </span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="configSnd"
                            label="详细配置nd"
                            width="204px">
                            <template slot-scope="scope">
                                <span>{{scope.row.configSnd}}</span>
                                <span v-if="scope.$index === 1 || scope.$index === 2">-</span>
                                <span v-show="inputShow === false">
                                <span  v-show="scope.$index === 1">{{inputValue.static_testing.config.middle_risk}}</span>
                                <span v-if="scope.$index === 2">{{inputValue.tx_safety.config.large_fee}}</span>
                            </span>
                                <!--输入框部分-->
                                <span v-show="inputShow === true">
                                    <el-input class="table-input" v-show="scope.$index === 1" v-model.number="inputValue.static_testing.config.middle_risk"></el-input>
                                    <el-input class="table-input" v-show="scope.$index === 2" v-model.number="inputValue.tx_safety.config.large_fee"></el-input>
                                </span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="configTrd"
                            label="详细配置rd"
                            width="204px">
                            <template slot-scope="scope">
                                <!--交易安全分数-->
                                <span>{{scope.row.configTrd}}</span>
                                <span v-if="scope.$index === 1 || scope.$index === 2">-</span>
                                <span v-show="inputShow === false">
                                    <span class="table-input" v-show="scope.$index === 1">{{inputValue.static_testing.config.low_risk}}</span>
                                    <span v-if="scope.$index === 2">{{inputValue.tx_safety.config.huge_profit}}</span>
                                </span>
                                <!--输入框部分-->
                                <span v-show="inputShow === true">
                                    <el-input class="table-input" v-show="scope.$index === 1" v-model.number="inputValue.static_testing.config.low_risk"></el-input>
                                    <el-input class="table-input" v-show="scope.$index === 2" v-model.number="inputValue.tx_safety.config.huge_profit"></el-input>
                                </span>
                            </template >
                        </el-table-column>
                        <el-table-column
                            prop="configFth"
                            label="详细配置th"
                            width="204px">
                            <template slot-scope="scope">
                                <!--交易安全分数-->
                                <span>{{scope.row.configFth}}</span>
                                <span v-if="scope.$index === 2">-</span>
                                <span v-show="inputShow === false">
                                    <span v-if="scope.$index === 2">{{inputValue.tx_safety.config.repeat_call}}</span>
                                </span>
                                <!--输入框部分-->
                                <span v-show="inputShow === true">
                                    <el-input class="table-input" v-show="scope.$index === 2" v-model.number="inputValue.tx_safety.config.repeat_call"></el-input>
                                </span>
                            </template >
                        </el-table-column>
                    </el-table>
                </div>
            </div>
            <div class="btn-class">
                <div class="change-config" v-show="inputShow === false">
                    <el-button icon="el-icon-refresh-right" type="text" @click="changeConfigWarning= true">{{$t('el.systemConfigScore.formatConfigData')}}</el-button>
                    <el-button class="primary hbjbh" type="primary" @click="changeConfig">{{$t('el.systemConfigScore.changeConfig')}}</el-button>
                </div>
                <div class="cancel-confirm" v-show="inputShow === true">
                    <el-button icon="el-icon-refresh-right" type="text" @click="changeConfigWarning = true">{{$t('el.systemConfigScore.formatConfigData')}}</el-button>
                    <el-button class="default" type="primary" @click="changeConfigCancel">{{$t('el.createProject.createProjectCancel')}}</el-button>
                    <el-button class="primary hbjbh" type="primary"  @click="changeConfigConfirm">{{$t('el.createProject.createProjectConfirm')}}</el-button>
                </div>
            </div>
            <!--是否初始化数据警告框-->
            <be-msg-dialog @confirm="warningDialogConfirm"
                           :isShow.sync="changeConfigWarning"
                           :title="$t('el.systemConfigScore.formatConfigData')"
                           :sub-title="$t('el.systemConfigScore.changeConfigWarning')">
            </be-msg-dialog>
        </div>
    </div>
</template>

<script>
import {getRiskScore,saveRiskScore,resetRiskScore} from '../../../api/system-config'
export default {
    name: "system-config-score",
    data() {
        return {
            widthGird:'170',
            changeConfigWarning:false,
            changeConfigWarningInput:false,
            inputShow:false,
            // 输入框绑定以及显示的数据
            inputValue: {
                static_testing:{
                    weight:'',
                    config:{
                        high_risk:'',
                        middle_risk:'',
                        low_risk:''
                    }
                },
                tx_safety:{
                    weight:'',
                    config:{
                        flash_load_tx:'',
                        large_fee:'',
                        huge_profit:'',
                        repeat_call:''
                    }
                },
                tx_stability:{
                    weight:'',
                    config:{
                        score_coefficient:''
                    }
                },
                safety_opinion:{
                    weight:'',
                    config:{
                        each:''
                    }
                },
                time_range:''
            },
            systemConfigScore:[
                {
                    project:this.$t('el.systemConfigScore.configProject'),
                    weight:this.$t('el.systemConfigScore.weight'),
                    configFst:this.$t('el.systemConfigScore.detailConfig'),
                    configSnd:'',
                    configTrd:'',
                    configFth:'',
                },
                {
                    project:this.$t('el.systemConfigScore.staticDetection'),
                    weight:'',
                    configFst:this.$t('el.systemConfigScore.dangerHigh'),
                    configSnd:this.$t('el.systemConfigScore.dangerMiddle'),
                    configTrd:this.$t('el.systemConfigScore.dangerLow'),
                    configFth:'',
                },
                {
                    project:this.$t('el.systemConfigScore.tradeSafetyClass'),
                    weight:'',
                    configFst:this.$t('el.systemConfigScore.flash_load_tx'),
                    configSnd:this.$t('el.systemConfigScore.large_fee'),
                    configTrd:this.$t('el.systemConfigScore.huge_profit'),
                    configFth:this.$t('el.systemConfigScore.repeat_call'),
                },
                {

                },
                {
                    project: this.$t('el.systemConfigScore.tradeStable'),
                    weight:'',
                    configFst:this.$t('el.systemConfigScore.tradeScore'),
                    configSnd:'',
                    configTrd:'',
                    configFth:'',
                },
                {
                    project: this.$t('el.systemConfigScore.safetyPublicOptionClass'),
                    weight:'',
                    configFst:this.$t('el.systemConfigScore.safetyPublicOption'),
                    configSnd:'',
                    configTrd:'',
                    configFth:'',
                },
                {
                    project: this.$t('el.systemConfigScore.timeRange'),
                    weight:'',
                    configFst:this.$t('el.systemConfigScore.timeTradeDate'),
                    configSnd:'',
                    configTrd:'',
                    configFth:'',
                }
            ],
        }
    },
    mounted() {
        this.initData('init')
        this.initView()
    },
    methods: {
        /**
         * 拉取数据
         */
        getScore(){
            const _this = this
            getRiskScore().then(res => {
                if(res){
                    // 拿到的数据都为正
                    this.inputValue = res.data
                }
            }).catch(err=>{
                const msg = _this.$t('el.operation')+ _this.$t('el.failed')
                _this.$message.error(msg)
                console.error(err)
            })
        },
        /**
         * 根据屏幕分辨率调整表格宽度
         */
        initView(){
            const width = window.screen.availWidth
            const height = window.screen.availHeight
            if(height >= 680 || width >=1280) {
                this.widthGird = '100'
            }
        },
        /**
         * 初始化\参数
         * @param type
         */
        initData(type = 'init'){
            if(type === 'init'){
                // 这里应该调接口拿数据
                this.getScore()
            }
        },
        // 初始化参数
        warningDialogConfirm(){
            const _this = this
            // 初始化参数
            resetRiskScore().then(res => {
                this.getScore()
            }).catch(err=>{
                const msg = _this.$t('el.operation')+ _this.$t('el.failed')
                _this.$message.error(msg)
                console.error(err)
            })
            this.changeConfigWarningInput = false
        },
        // 修改，显示input框
        changeConfig(){
            this.inputShow = true
        },
        // 取消修改
        changeConfigCancel(){
            this.inputShow = false
            // 再调取一次接口，拿到上次修改的数据
            this.getScore()
        },
        // 修改风险评分配置信息
        changeConfigConfirm(){
            const _this = this

            // 开始表单校验
            let sum = 0
            let valArr = Object.values(this.inputValue)
            let valArrEmpty = []
            for(let i = 0;i < valArr.length - 1;i++){
                let valArrCfg = Object.values(valArr[i].config)
                let ArrEmpty = valArrCfg.filter((t)=>{
                    return t === ''||typeof t !== 'number'||t < 0||t > 100
                })
                if(valArr[i].weight < 0){
                    valArrEmpty.push(1)
                    break
                }
                if(ArrEmpty.length > 0){
                    valArrEmpty.push(1)
                    break
                }
                sum += valArr[i].weight
                console.log(sum)
            }
            if(sum != 100){
                valArrEmpty.push(1)
            }
            let time_range = valArr[valArr.length - 1]
            // 大于0 说明有不合格的参数 直接返回
            if(valArrEmpty.length > 0||typeof time_range !== "number" ||time_range < 0||time_range > 100){
                this.$message.warning(_this.$t('el.systemConfigScore.checkInput'))
                return
            }

            let params = this.inputValue
            // 调用后端接口，存储表单数据
            saveRiskScore(params).then(res => {
                if(res){
                    return
                }
            }).catch(err=>{
                _this.$message.error(err.message)
                console.error(err)
            })
            this.inputShow = false
        },
        // 通过给table传入span-method方法可以实现合并行或列，方法的参数是一个对象
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
              return 'font-weight: 700;text-align: center;'
          }
          if(rowIndex === 0 || columnIndex === 0){
              return 'font-weight: 700;text-align: center'
          }
        },
    },
}
</script>

<style lang="scss">
    .system-config-score{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        margin-top: 20px;
        .system-config-score-box{
            background-color: $mainColor7;
            width: 100%;
            height: 612px;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            padding: 20px;
            box-sizing: border-box;
        }

        .btn-class{
            height: 200px;
            display: flex;
            flex-direction: column;
            justify-content: space-evenly;
        }
        .change-config{
            display: flex;
            align-items: baseline;
            justify-content: center;
        }
        .cancel-confirm{
            display: flex;
            align-items: baseline;
            justify-content: center;
        }
        .el-input__inner{
            padding-left: 5px;
        }
        .table-input[data-v-38e51434] {
            width: 60px;
            margin-left: 5px;
            input.el-input__inner{
                height: 24px;
                padding-left: 5px;
                padding-top: 1px;
            }
        }
    }

   

</style>
<!--1080p的145% - 150%放大-->
<style scoped lang="scss">
@media screen and (min-width: 1280px) and (max-height: 638px) and (max-width: 1326px) {
    .system-config-score{

        .system-config-score-box{
            height: 420px;
            padding: 10px;
            box-sizing: border-box;
        }
        .btn-class{
            height: 200px;

        }
    }
}
</style>