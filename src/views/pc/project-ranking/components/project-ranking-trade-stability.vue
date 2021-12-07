<template>
    <div class="chart-box">
        <div class="chart-title">
            <template>
                <el-select style="width: 110px" v-model="selectValue" @change="changeSelect">
                    <el-option
                            v-for="item in options"
                            :key="item.id"
                            :label="item.label.toUpperCase()"
                            :value="item.label">
                    </el-option>
                </el-select>
            </template>
        </div>
        <div class="chart">
            <div id="tradeStb">
                <div  class = 'empty-data' v-if="charData.list.length === 0" style="margin-top: 0">
                    <img class="img" src="@/assets/image/pc/empty-data.png" alt="" style="height: 180px;" >
                    <p style="line-height: 25px">{{$t('el.emptyData')}}</p>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
    import DataSet from '@antv/data-set'
    import {Chart} from '@antv/g2'

    export default {
        name: "project-ranking-trade-stability",
        data(){
            return{
                chart:null,
                charDataInner:[],
                options: [],
                selectValue: `${this.$t('el.projectRinking.tradeStb.all')}`
            }
        },
        props:{
            // 代币下拉列表
            selectData:{
                type:Array,
            },
            // 图标数据集合
            charData:{
                type:Object,
            }
        },

        methods:{
            /**
             * 渲染图表
             */
            tradeChart(dv,data){
                const chart = new Chart({
                    container: 'tradeStb',
                    autoFit: true,
                    height: 243,
                });
                this.chart = chart
                chart.data(dv.rows)
                chart.data(data);
                chart.scale('date', {
                    range: [0, 1],

                });
                chart.scale('tx_money', {
                    nice: true,
                });
                chart.tooltip({
                    showCrosshairs: true,
                    shared: true,
                });

                chart.area().adjust('stack').position('date*tx_money').color('platform').shape('smooth');
                chart.line().adjust('stack').position('date*tx_money').color('platform').shape('smooth');

                chart.interaction('element-highlight');
                // 复写 图例筛选 交互。1、点击图例名称 进行 unchecked 状态的切换 2、点击图例 marker，进行 checked 状态的切换（进行聚焦）3、双击 重置状态
                chart.interaction('legend-filter', {
                    start: [
                        { trigger: 'legend-item-name:click', action: ['list-unchecked:toggle', 'data-filter:filter'] },
                        { trigger: 'legend-item-marker:click', action: ['list-checked:checked', 'data-filter:filter'] },
                    ],
                    end: [{ trigger: 'legend-item-marker:dblclick', action: ['list-checked:reset', 'data-filter:filter'] }],
                });
                chart.render();
            },
            /**
             * 生成下拉类别数据
             */
            createSelectData(list){
                this.options = [{id:this.$getUuid(),label:`${this.$t('el.projectRinking.tradeStb.all')}`}]
                list.forEach(val=>{
                    this.options.push({
                        id:this.$getUuid(),
                        label:val
                    })
                })
            },
            /**
             * 下拉變換
             */
            changeSelect(){
                // 根據下拉變換處理數據，並渲染
                this.handleChartData(this.selectValue)
            },
            /**
             * 處理圖標數據
             * @param {String} currency - 幣種
             */
            handleChartData(currency = '全部'){
                const _this = this
                if((_this.charData.list && _this.charData.list.length  === 0) || !_this.charData.list) return;
                _this.charDataInner = []
                if(currency === '全部'){
                    _this.charData.list.forEach(val=>{
                        _this.charDataInner = _this.charDataInner.concat(val.list)
                    })
                    return
                }
                _this.charData.list.forEach(val=>{
                    if(val.token_name === currency){
                        _this.charDataInner = _this.charDataInner.concat(val.list)
                    }
                })

                const dv = new DataSet.DataView().source(_this.charDataInner);
                dv.transform({
                    type: 'fold',
                    fields: ['tx_money'], // 展开字段集
                    key: 'type', // key字段
                    value: 'value', // value字段
                });
                if(!_this.chart){
                    // 渲染圖表
                    this.tradeChart(dv,_this.charDataInner)
                }else{
                    // 更新圖表
                    this.chart.changeData(dv.rows)
                }

            }
        },
        watch:{
            // 监听下拉列表props变化,生產下拉列表數據結構
            selectData: {
                deep: true, //深度监听设置为 true
                handler: function (nVal) {
                    if(nVal && nVal.length > 0){
                        this.createSelectData(nVal)
                    }
                }
            },
            // 监听圖表數據props变化
            charData: {
                deep: true, //深度监听设置为 true
                handler: function (nVal) {
                    if(nVal && nVal.list && nVal.list.length){
                        this.handleChartData(this.selectValue)
                    }
                }
            },
        }
    }
</script>

<style scoped lang="scss">
    .chart-box{
        width: 100%;
        height: 296px;
        background-color: white;
        padding: 0 24px;
    }
    .chart{
        width: 100%;
        height: 243px;
    }
    .chart-title{
        font-size: 18px;
        padding-top: 17px;
        font-weight:bold;
        display: flex;
        flex-direction: row-reverse;
    }
</style>