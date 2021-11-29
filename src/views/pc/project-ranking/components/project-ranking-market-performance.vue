<template>
    <div class="market-performance">
        <div class="market-performance-header">
            <div class="market-performance-header-card">
                <div class="card-info">
                    <img src="../../../../assets/image/pc/tx-num.png" height="48" width="48"/>
                    <div class="card-msg">
                        <span class="card-title">{{$t('el.projectRinking.marketPerformance.tradeVolume')}}</span>
                        <span class="card-num">{{tradeVolume}}</span>
                    </div>
                </div>
            </div>
            <div class="market-performance-header-card">
                <div class="card-info">
                    <img src="../../../../assets/image/pc/user-num.png" height="48" width="48"/>
                    <div class="card-msg">
                        <span class="card-title">{{$t('el.projectRinking.marketPerformance.userVolume')}}</span>
                        <span class="card-num">{{userVolume}}</span>
                    </div>
                </div>
            </div>
            <div class="market-performance-header-card">
                <div class="card-info">
                    <img src="../../../../assets/image/pc/contract-num.png" height="48" width="48"/>
                    <div class="card-msg">
                        <span class="card-title">{{$t('el.projectRinking.marketPerformance.contractVolume')}}</span>
                        <span class="card-num">{{contractVolume}}</span>
                    </div>
                </div>
            </div>
        </div>
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
                tradeVolume:123456,
                userVolume:123456,
                contractVolume:123456,
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
        width: 1184px;
        height: 704px;
        margin: auto;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .market-performance-header{
        width: 1184px;
        height: 136px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .market-performance-header-card{
        width: 384px;
        height: 88px;
        background: linear-gradient(90deg, #FFFFFF 0%, #E3FBFF 100%);
        border-radius: 4px;
        display: flex;
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
        width: 1136px;
        height: 284px;
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
    }
</style>