<template>
    <div class="chart-box">
        <div class="chart-title">
            <template>
                <el-select style="width: 110px" v-model="selectValue">
                    <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </template>
        </div>
        <div class="chart">
            <div id="tradeStb"></div>
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
                chart:'',
                tradeStb:[],
                tradeAllStb:[],
                label1:[
                    { time: '01/03', num: -20 },
                    { time: '01/05', num: 10 },
                    { time: '01/07', num: 10 },
                    { time: '01/09', num: -20 },
                    { time: '01/11', num: 5 },
                    { time: '01/13', num: 0 },
                    { time: '01/15', num: 10 },
                    { time: '01/17', num: -35 },
                    { time: '01/19', num: 25 },
                    { time: '01/21', num: -5 },
                    { time: '01/23', num: 38 },
                    { time: '01/25', num: -20 },
                ],
                label2:[
                    { time: '01/03', num: -35 },
                    { time: '01/05', num: -30 },
                    { time: '01/07', num: 35 },
                    { time: '01/09', num: 5 },
                    { time: '01/11', num: 25 },
                    { time: '01/13', num: -10 },
                    { time: '01/15', num: 5 },
                    { time: '01/17', num: 10 },
                    { time: '01/19', num: 20 },
                    { time: '01/21', num: 30 },
                    { time: '01/23', num: 38 },
                    { time: '01/25', num: -20 },
                ],
                options: [{
                    value: 'all',
                    label: `${this.$t('el.projectRinking.tradeStb.all')}`
                }, {
                    value: 'label1',
                    label: 'label1'
                },
                {
                    value: 'label2',
                    label: 'label2'
                }],
                selectValue: ''
            }
        },
        mounted() {
            this.selectValue = 'all'
            this.tradeChart()
        },
        methods:{
            tradeChart(){
                // 遍历数组，将所有类型数量相加
                for(let i = 0; i < this.label1.length; i++){
                    let time = this.label1[i].time
                    let num = this.label1[i].num + this.label2[i].num
                    this.tradeAllStb.push({time,num})
                }
                // 定义显示图表
                const dv = new DataSet.DataView().source(this.tradeAllStb);
                dv.transform({
                    type: 'fold',
                    fields: ['num'], // 展开字段集
                    key: 'type', // key字段
                    value: 'value', // value字段
                });

                this.chart = new Chart({
                    container: 'tradeStb',
                    autoFit: true,
                    height: 243,
                });
                 const chart = this.chart
                chart.data(dv.rows)
                chart.scale('time', {
                    range: [0, 1],
                });
                chart.scale('value', {
                    nice: true,
                });
                chart.tooltip({
                    shared: true,
                    showCrosshairs: true,
                });
                chart.axis('time',{
                    title:{
                        position:'end',
                        text:`${this.$t('el.projectRinking.marketPerformance.time')}`
                    },
                })
                chart.axis('value',{
                    title:{
                        text:`${this.$t('el.projectRinking.marketPerformance.tradeNum')}`
                    },
                    line:{
                        style:{
                            stroke:'#bfbfbf'
                        }
                    }
                })
                chart.legend(false);
                chart
                    .area()
                    .position('time*value')
                    .color('#1890FF')
                    .shape('smooth');
                chart
                    .line()
                    .position('time*value')
                    .color('#1890FF')
                    .shape('smooth');
                chart.render();
            },
            changeChart(){
                const dv = new DataSet.DataView().source(this.tradeStb);
                dv.transform({
                    type: 'fold',
                    fields: ['num'], // 展开字段集
                    key: 'type', // key字段
                    value: 'value', // value字段
                });
                this.chart.changeData(dv.rows)
            }
        },
        watch:{
            'selectValue'(){
                if(this.selectValue === 'all'){
                    this.tradeStb = this.tradeAllStb
                    /*chart.changeData(this.tradeAllStb)*/
                }else if(this.selectValue === 'label1'){
                    this.tradeStb = this.label1
                    /*chart.changeData(this.tradeAllStb)*/
                }else if(this.selectValue === 'label2'){
                    this.tradeStb = this.label2
                    /*chart.changeData(this.tradeAllStb)*/
                }
            },
            'tradeStb'(){
                this.$nextTick(()=>{
                    this.changeChart()
                })
            }

        }
    }
</script>

<style scoped lang="scss">
    .chart-box{
        width: 1136px;
        height: 296px;
        background-color: white;
        margin: 24px auto;
        padding: 0 24px;
    }
    .chart{
        width: 1136px;
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