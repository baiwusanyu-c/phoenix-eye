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
                            width="80px">
                            <template #default="scope">
                                <span>{{scope.row.weight}}</span>
                                <span v-show="inputShow === false">
                                <span v-if="scope.$index === 1">{{inputValue.data.static_testing.weight}}</span>
                                <span v-if="scope.$index === 2">{{inputValue.data.tx_safety.weight}}</span>
                                <span v-if="scope.$index === 4">{{inputValue.data.tx_stability.weight}}</span>
                                <span v-if="scope.$index === 5">{{inputValue.data.safety_opinion.weight}}</span>
                            </span>
                                <span v-show="inputShow === true">
                                <!--百分数字符串-->
                                    <el-input class="table-input" v-show="scope.$index === 1" v-model.number="inputValue.data.static_testing.weight"></el-input>
                                    <el-input class="table-input" v-show="scope.$index === 2" v-model.number="inputValue.data.tx_safety.weight"></el-input>
                                    <el-input class="table-input" v-show="scope.$index === 4" v-model.number="inputValue.data.tx_stability.weight"></el-input>
                                    <el-input class="table-input" v-show="scope.$index === 5" v-model.number="inputValue.data.safety_opinion.weight"></el-input>
                                </span>
                                <span v-if="scope.$index !== 0 && scope.$index !== 6">%</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="configFst"
                            label="详细配置st"
                            width="204px"
                        >
                            <template #default="scope">
                                <!--事件范围数字显示在前面-->
                                <span v-if="scope.$index === 6 && inputShow === false">{{inputValue.data.time_range}}</span>
                                <el-input class="table-input" v-show="scope.$index === 6 && inputShow === true" v-model.number="inputValue.data.time_range"></el-input>
                                <!--分割线-->
                                <span>{{scope.row.configFst}}</span>
                                <span v-if="scope.$index !== 0 && scope.$index !== 6 && scope.$index !== 4">-</span>
                                <span v-show="inputShow === false">
                                    <span  v-show="scope.$index === 1">{{inputValue.data.static_testing.config.high_risk}}</span>
                                    <span v-if="scope.$index === 4" style="margin: 0 10px">{{inputValue.data.tx_stability.config.score_coefficient}}</span>
                                    <el-tooltip placement="top" effect="light">
                                        <template #content>
                                            {{$t('lang.systemConfigScore.tip')}}
                                        </template>
                                        <img v-if="scope.$index ===4" src="../../../assets/image/pc/query.png" height="16" width="16" alt=""/>
                                    </el-tooltip>
                                    <span v-if="scope.$index ===5">
                                        {{inputValue.data.safety_opinion.config.each}}/{{$t('lang.systemConfigScore.safetyPublicOptionPiece')}}
                                    </span>
                                        <!--交易安全分数-->
                                    <span v-if="scope.$index === 2">{{inputValue.data.tx_safety.config.flash_load_tx}}</span>
                                    <span v-if="scope.$index === 3">{{inputValue.data.tx_safety.config.token_empty}}</span>
                                </span>
                                <!--输入框部分-->
                                <span v-show="inputShow === true">
                                    <el-input class="table-input" v-show="scope.$index === 1" v-model.number="inputValue.data.static_testing.config.high_risk"></el-input>
                                    <el-input class="table-input" v-show="scope.$index === 2" v-model.number="inputValue.data.tx_safety.config.flash_load_tx"></el-input>
                                    <el-input class="table-input" v-show="scope.$index === 3" v-model.number="inputValue.data.tx_safety.config.token_empty"></el-input>
                                    <el-input class="table-input" v-show="scope.$index === 4" v-model.number="inputValue.data.tx_stability.config.score_coefficient"></el-input>
                                    <el-input class="table-input" v-show="scope.$index === 5" v-model.number="inputValue.data.safety_opinion.config.each"></el-input>
                                </span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="configSnd"
                            label="详细配置nd"
                            width="204px">
                            <template #default="scope">
                                <span>{{scope.row.configSnd}}</span>
                                <span v-if="scope.$index === 1 || scope.$index === 2">-</span>
                                <span v-show="inputShow === false">
                                <span  v-show="scope.$index === 1">{{inputValue.data.static_testing.config.middle_risk}}</span>
                                <span v-if="scope.$index === 2">{{inputValue.data.tx_safety.config.large_fee}}</span>
                            </span>
                                <!--输入框部分-->
                                <span v-show="inputShow === true">
                                    <el-input class="table-input" v-show="scope.$index === 1" v-model.number="inputValue.data.static_testing.config.middle_risk"></el-input>
                                    <el-input class="table-input" v-show="scope.$index === 2" v-model.number="inputValue.data.tx_safety.config.large_fee"></el-input>
                                </span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="configTrd"
                            label="详细配置rd"
                            width="204px">
                            <template #default="scope">
                                <!--交易安全分数-->
                                <span>{{scope.row.configTrd}}</span>
                                <span v-if="scope.$index === 1 || scope.$index === 2">-</span>
                                <span v-show="inputShow === false">
                                    <span class="table-input" v-show="scope.$index === 1">{{inputValue.data.static_testing.config.low_risk}}</span>
                                    <span v-if="scope.$index === 2">{{inputValue.data.tx_safety.config.huge_transfer}}</span>
                                </span>
                                <!--输入框部分-->
                                <span v-show="inputShow === true">
                                    <el-input class="table-input" v-show="scope.$index === 1" v-model.number="inputValue.data.static_testing.config.low_risk"></el-input>
                                    <el-input class="table-input" v-show="scope.$index === 2" v-model.number="inputValue.data.tx_safety.config.huge_transfer"></el-input>
                                </span>
                            </template >
                        </el-table-column>
                        <el-table-column
                            prop="configFth"
                            label="详细配置th"
                            width="204px">
                            <template #default="scope">
                                <!--交易安全分数-->
                                <span>{{scope.row.configFth}}</span>
                                <span v-if="scope.$index === 2">-</span>
                                <span v-show="inputShow === false">
                                    <span v-if="scope.$index === 2">{{inputValue.data.tx_safety.config.repeat_call}}</span>
                                </span>
                                <!--输入框部分-->
                                <span v-show="inputShow === true">
                                    <el-input class="table-input" v-show="scope.$index === 2" v-model.number="inputValue.data.tx_safety.config.repeat_call"></el-input>
                                </span>
                            </template >
                        </el-table-column>
                    </el-table>
                </div>
            </div>
            <div class="btn-class">
                <div class="change-config" v-show="inputShow === false">
                    <el-button icon="el-icon-refresh-right" type="text" @click="changeConfigWarningInput= true">{{$t('lang.systemConfigScore.formatConfigData')}}</el-button>
                    <el-button class="primary hbjbh" type="primary" @click="changeConfig">{{$t('lang.systemConfigScore.changeConfig')}}</el-button>
                </div>
                <div class="cancel-confirm" v-show="inputShow === true">
                    <el-button icon="el-icon-refresh-right" type="text" @click="changeConfigWarningInput = true">{{$t('lang.systemConfigScore.formatConfigData')}}</el-button>
                    <el-button class="default" type="primary" @click="changeConfigCancel">{{$t('lang.createProject.createProjectCancel')}}</el-button>
                    <el-button class="primary hbjbh" type="primary"  @click="changeConfigConfirm">{{$t('lang.createProject.createProjectConfirm')}}</el-button>
                </div>
            </div>
            <!--是否初始化数据警告框-->

            <MsgDialog @confirm="warningDialogConfirm"
                       @close="()=>changeConfigWarningInput = false"
                           :isShow="changeConfigWarningInput"
                           :title="$t('lang.systemConfigScore.formatConfigData')"
                           :sub-title="$t('lang.systemConfigScore.changeConfigWarning')">
            </MsgDialog>
        </div>
    </div>
</template>

<script lang="ts">
import {getRiskScore,saveRiskScore,resetRiskScore} from '../../../api/system-config'
import MsgDialog from '../../../components/common-components/msg-dialog/msg-dialog.vue'
import {defineComponent, ref, reactive, shallowReactive, toRaw, watch, computed, onMounted} from "vue";
import {useI18n} from "vue-i18n";
import {ElMessage} from "element-plus/es";

export default defineComponent({
    name: "system-config-score",
    components:{MsgDialog},
    setup(){
        const {t,locale} = useI18n()
        const widthGird=ref('240')
        const changeConfigWarningInput=ref<boolean>(false)
        const inputShow=ref(false)
        // 输入框绑定以及显示的数据
        const inputValue= reactive({
            data: {
                static_testing: {
                    weight: '',
                    config: {
                        high_risk: '',
                        middle_risk: '',
                        low_risk: ''
                    }
                },
                tx_safety: {
                    weight: '',
                    config: {
                        flash_load_tx: '',
                        large_fee: '',
                        huge_transfer: '',
                        repeat_call: '',
                        token_empty: '',
                    }
                },
                tx_stability: {
                    weight: '',
                    config: {
                        score_coefficient: ''
                    }
                },
                safety_opinion: {
                    weight: '',
                    config: {
                        each: ''
                    }
                },
                time_range: ''
            }
        })
        const systemConfigScore=ref([
            {
                project:t('lang.systemConfigScore.configProject'),
                weight:t('lang.systemConfigScore.weight'),
                configFst:t('lang.systemConfigScore.detailConfig'),
                configSnd:'',
                configTrd:'',
                configFth:'',
            },
            {
                project:t('lang.systemConfigScore.staticDetection'),
                weight:'',
                configFst:t('lang.systemConfigScore.dangerHigh'),
                configSnd:t('lang.systemConfigScore.dangerMiddle'),
                configTrd:t('lang.systemConfigScore.dangerLow'),
                configFth:'',
            },
            {
                project:t('lang.systemConfigScore.tradeSafetyClass'),
                weight:'',
                configFst:t('lang.systemConfigScore.flash_load_tx'),
                configSnd:t('lang.systemConfigScore.large_fee'),
                configTrd:t('lang.systemConfigScore.huge_transfer'),
                configFth:t('lang.systemConfigScore.repeat_call'),
            },
            {
                configFst:t('lang.systemConfigScore.token_empty')
            },
            {
                project: t('lang.systemConfigScore.tradeStable'),
                weight:'',
                configFst:t('lang.systemConfigScore.tradeScore'),
                configSnd:'',
                configTrd:'',
                configFth:'',
            },
            {
                project: t('lang.systemConfigScore.safetyPublicOptionClass'),
                weight:'',
                configFst:t('lang.systemConfigScore.safetyPublicOption'),
                configSnd:'',
                configTrd:'',
                configFth:'',
            },
            {
                project: t('lang.systemConfigScore.timeRange'),
                weight:'',
                configFst:t('lang.systemConfigScore.timeTradeDate'),
                configSnd:'',
                configTrd:'',
                configFth:'',
            }
        ])

        onMounted(()=>{
            initData('init')
            initView()
        })
        const listenLang = computed(()=>{
            return locale
        })
        watch(()=>listenLang,()=>{
            systemConfigScore.value = [
                {
                    project:t('lang.systemConfigScore.configProject'),
                    weight:t('lang.systemConfigScore.weight'),
                    configFst:t('lang.systemConfigScore.detailConfig'),
                    configSnd:'',
                    configTrd:'',
                    configFth:'',
                },
                {
                    project:t('lang.systemConfigScore.staticDetection'),
                    weight:'',
                    configFst:t('lang.systemConfigScore.dangerHigh'),
                    configSnd:t('lang.systemConfigScore.dangerMiddle'),
                    configTrd:t('lang.systemConfigScore.dangerLow'),
                    configFth:'',
                },
                {
                    project:t('lang.systemConfigScore.tradeSafetyClass'),
                    weight:'',
                    configFst:t('lang.systemConfigScore.flash_load_tx'),
                    configSnd:t('lang.systemConfigScore.large_fee'),
                    configTrd:t('lang.systemConfigScore.huge_transfer'),
                    configFth:t('lang.systemConfigScore.repeat_call'),
                },
                {
                    configFst:t('lang.systemConfigScore.token_empty')
                },
                {
                    project: t('lang.systemConfigScore.tradeStable'),
                    weight:'',
                    configFst:t('lang.systemConfigScore.tradeScore'),
                    configSnd:'',
                    configTrd:'',
                    configFth:'',
                },
                {
                    project: t('lang.systemConfigScore.safetyPublicOptionClass'),
                    weight:'',
                    configFst:t('lang.systemConfigScore.safetyPublicOption'),
                    configSnd:'',
                    configTrd:'',
                    configFth:'',
                },
                {
                    project: t('lang.systemConfigScore.timeRange'),
                    weight:'',
                    configFst:t('lang.systemConfigScore.timeTradeDate'),
                    configSnd:'',
                    configTrd:'',
                    configFth:'',
                }
            ]
        })

        /**
         * 拉取数据
         */
        const getScore = () => {
            getRiskScore().then(res => {
                if(res){
                    // 拿到的数据都为正
                    inputValue.data = res.data
                }
            }).catch((err)=>{
                opFailed(err)
            })
        }
        /**
         * 根据屏幕分辨率调整表格宽度
         */
        const initView = () =>{
            const width = window.screen.availWidth
            const height = window.screen.availHeight
            if(height >= 680 || width >=1280) {
                widthGird.value = '100'
            }
        }
        /**
         * 初始化\参数
         * @param type
         */
        const initData = (type = 'init') => {
            if(type === 'init'){
                // 这里应该调接口拿数据
                getScore()
            }
        }
        const opFailed = (err) => {
            const msg = t('lang.operation')+ t('lang.failed')
            ElMessage.error(msg)
            console.error(err)
        }
        // 初始化参数
        const warningDialogConfirm = () => {
            resetRiskScore().then(() => {
                getScore()
                changeConfigWarningInput.value = false
            }).catch((err)=>{
                opFailed(err)
            })
        }
        // 修改，显示input框
        const changeConfig = () => {
            inputShow.value = true
        }
        // 取消修改
        const changeConfigCancel = () => {
            inputShow.value = false
            // 再调取一次接口，拿到上次修改的数据
            getScore()
        }
        // 修改风险评分配置信息
        const changeConfigConfirm = () => {
            // 开始表单校验
            let sum = 0
            let valArr = Object.values(toRaw(inputValue.data))
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
            if(sum !== 100){
                valArrEmpty.push(1)
            }
            let time_range = valArr[valArr.length - 1]
            // 大于0 说明有不合格的参数 直接返回
            if(valArrEmpty.length > 0||typeof time_range !== "number" ||time_range < 0||time_range > 100){
                ElMessage.warning(t('lang.systemConfigScore.checkInput'))
                return
            }

            let params = toRaw(inputValue.data)
            // 调用后端接口，存储表单数据
            saveRiskScore(params).then(res => {
                if(res){
                    return
                }
            }).catch(err=>{
                ElMessage.error(err.message)
                console.error(err)
            })
            inputShow.value = false
        }
        // 表格行列合并
        const arraySpanMethod = ({ rowIndex, columnIndex }) => {
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
        }
        const columnStyle = ({ rowIndex, columnIndex }) => {
            if(rowIndex === 0){
                return {"font-weight":'700',"text-align": "center"}
            }
            if(rowIndex === 0 || columnIndex === 0){
                return {"font-weight":'700',"text-align": "center"}
            }
        }

      return{
          widthGird,
          changeConfigWarningInput,
          inputShow,
          inputValue,
          systemConfigScore,
          warningDialogConfirm,
          changeConfig,
          changeConfigCancel,
          changeConfigConfirm,
          arraySpanMethod,
          columnStyle,
      }
    },
    /*data() {
        return {
            widthGird:'240',
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
                        huge_transfer:'',
                        repeat_call:'',
                        token_empty:'',
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
                    configFst:this.$t('lang.systemConfigScore.flash_load_tx'),
                    configSnd:this.$t('lang.systemConfigScore.large_fee'),
                    configTrd:this.$t('lang.systemConfigScore.huge_transfer'),
                    configFth:this.$t('lang.systemConfigScore.repeat_call'),
                },
                {
                    configFst:this.$t('lang.systemConfigScore.token_empty')
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
    watch:{
        listenLang:function(){
            this.systemConfigScore = [
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
                    configFst:this.$t('lang.systemConfigScore.flash_load_tx'),
                    configSnd:this.$t('lang.systemConfigScore.large_fee'),
                    configTrd:this.$t('lang.systemConfigScore.huge_transfer'),
                    configFth:this.$t('lang.systemConfigScore.repeat_call'),
                },
                {
                    configFst:this.$t('lang.systemConfigScore.token_empty')
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
            ]
        }
    },
    computed:{
        listenLang() {
            return this.$i18n.locale;
        },
    },
    mounted() {
        this.initData('init')
        this.initView()
    },
    methods: {
        /!**
         * 拉取数据
         *!/
        getScore(){
            const _this = this
            getRiskScore().then(res => {
                if(res){
                    // 拿到的数据都为正
                    this.inputValue = res.data
                }
            }).catch((err)=>{
                _this.opFailed(err)
            })
        },
        /!**
         * 根据屏幕分辨率调整表格宽度
         *!/
        initView(){
            const width = window.screen.availWidth
            const height = window.screen.availHeight
            if(height >= 680 || width >=1280) {
                this.widthGird = '100'
            }
        },
        /!**
         * 初始化\参数
         * @param type
         *!/
        initData(type = 'init'){
            if(type === 'init'){
                // 这里应该调接口拿数据
                this.getScore()
            }
        },
        opFailed(err){
            const msg = this.$t('lang.operation')+ this.$t('lang.failed')
            ElMessage.error(msg)
            console.error(err)
        },
        // 初始化参数
        warningDialogConfirm(){
            const _this = this
            // 初始化参数
            resetRiskScore().then(() => {
                this.getScore()
            }).catch((err)=>{
                _this.opFailed(err)
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
                ElMessage.warning(_this.$t('lang.systemConfigScore.checkInput'))
                return
            }

            let params = this.inputValue
            // 调用后端接口，存储表单数据
            saveRiskScore(params).then(res => {
                if(res){
                    return
                }
            }).catch(err=>{
                ElMessage.error(err.message)
                console.error(err)
            })
            this.inputShow = false
        },
        // 通过给table传入span-method方法可以实现合并行或列，方法的参数是一个对象
        // ，里面包含当前行row、当前列column、当前行号rowIndex、当前列号columnIndex四个属性。
        // 该函数可以返回一个包含两个元素的数组，第一个元素代表rowspan，第二个元素代表colspan。
        // 也可以返回一个键名为rowspan和colspan的对象。
        arraySpanMethod({ rowIndex, columnIndex }){
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
        columnStyle({ rowIndex, columnIndex }){
            if(rowIndex === 0){
                return 'font-weight: 700;text-align: center;'
            }
            if(rowIndex === 0 || columnIndex === 0){
                return 'font-weight: 700;text-align: center'
            }
        },
    },*/
})

</script>

<style lang="scss">
  .system-config-score{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin-top: 20px;

    .system-config-score-box{
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 612px;
      padding: 20px;
      background-color: $mainColor7;
    }

    .btn-class{
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      height: 200px;
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
        padding-top: 1px;
        padding-left: 5px;
      }
    }
  }



</style>
<!--1080p的145% - 150%放大-->
<style scoped lang="scss">
@media screen and (min-width: 1280px) and (max-height: 638px) and (max-width: 1326px) {

  .system-config-score{

    .system-config-score-box{
      box-sizing: border-box;
      height: 420px;
      padding: 10px;
    }

    .btn-class{
      height: 200px;

    }
  }
}
</style>