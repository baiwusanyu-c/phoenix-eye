<template>
    <div class="market-performance">
        <div class="chart-box">
            <div class="chart-title">
                <span>{{$t('el.projectRinking.marketPerformance.tradeNum')}}</span>
            </div>
            <div class="chart">
                <div id="quantity"></div>
            </div>
        </div>
        <div class="chart-box">
            <div class="chart-title">
                <span>{{$t('el.projectRinking.marketPerformance.newUserNum')}}</span>
            </div>
            <div class="chart">
                <div id="newUser"></div>
            </div>
        </div>
    </div>
</template>

<script>
    import DataSet from '@antv/data-set'
    import {Chart} from '@antv/g2'

    export default {
        name: "project-ranking-market-performance",
        data(){
            return{

                // 图表内容
                quantity:[
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
                newUser:[
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
            }
        },
        mounted() {
            this.$nextTick(()=>{
                this.quantityChart()
                this.newUserChart()
            })
        },
        methods:{
            quantityChart(){
                const dv = new DataSet.DataView().source(this.quantity);
                dv.transform({
                    type: 'fold',
                    fields: ['num'], // 展开字段集
                    key: 'type', // key字段
                    value: 'value', // value字段
                });

                const chart = new Chart({
                    container: 'quantity',
                    autoFit: true,
                    height: 243,
                });

                chart.data(dv.rows);
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
            newUserChart(){
                const dv = new DataSet.DataView().source(this.quantity);
                dv.transform({
                    type: 'fold',
                    fields: ['num'], // 展开字段集
                    key: 'type', // key字段
                    value: 'value', // value字段
                });

                const chart = new Chart({
                    container: 'newUser',
                    autoFit: true,
                    height: 243,
                });
                chart.data(dv.rows);
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
                        text:`${this.$t('el.projectRinking.marketPerformance.time')}`
                    }
                })
                chart.axis('value',{
                    title:{
                        text:`${this.$t('el.projectRinking.marketPerformance.userNum')}`
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
            }
        }
    }
</script>

<style scoped lang="scss">
    .market-performance{
        width: 100%;
        margin: auto;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .card-info{
        height: 48px;
        width: 238px;
        padding-left: 44px;
        display: flex;
        justify-content: space-between;
    }
    .card-msg{
        display: flex;
        flex-direction: column;
    }
    .card-title{
        font-size: 14px;
        color: #777777;
    }
    .card-num{
        font-size: 24px;
        font-weight: bold;
        width: 145px;
        height: 32px;
    }
    .chart-box{

        width: 100%;
        height: 284px;
        background-color: white;
        margin: 24px auto;
        padding: 0 24px;
        box-sizing: border-box;
    }
    .chart{
        width: 100%;
        height: 243px;
    }
    .chart-title{
        font-size: 18px;
        padding-top: 17px;
        font-weight:bold;
    }
</style>