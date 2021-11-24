<template>
    <div class="market-performance">
        <div></div>
        <div class="chart-box">
            <div class="chart-title">
                <span>交易量</span>
            </div>
            <div class="chart">
                <div id="quantity"></div>
            </div>
        </div>
        <div class="chart-box">
            <div class="chart-title">
                <span>新增用户</span>
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
                // 交易量图标内容
                quantity:[
                    { year: '01/03', south: -35 },
                    { year: '01/05', south: -30 },
                    { year: '01/07', south: 35 },
                    { year: '01/09', south: 5 },
                    { year: '01/11', south: 25 },
                    { year: '01/13', south: -10 },
                    { year: '01/15', south: 5 },
                    { year: '01/17', south: 10 },
                    { year: '01/19', south: 20 },
                    { year: '01/21', south: 30 },
                    { year: '01/23', south: 38 },
                    { year: '01/25', south: -20 },
                ],
                newUser:[
                    { year: '01/03', south: -35 },
                    { year: '01/05', south: -30 },
                    { year: '01/07', south: 35 },
                    { year: '01/09', south: 5 },
                    { year: '01/11', south: 25 },
                    { year: '01/13', south: -10 },
                    { year: '01/15', south: 5 },
                    { year: '01/17', south: 10 },
                    { year: '01/19', south: 20 },
                    { year: '01/21', south: 30 },
                    { year: '01/23', south: 38 },
                    { year: '01/25', south: -20 },
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
                    fields: ['south'], // 展开字段集
                    key: 'type', // key字段
                    value: 'value', // value字段
                });

                const chart = new Chart({
                    container: 'quantity',
                    autoFit: true,
                    height: 243,
                });

                chart.data(dv.rows);
                chart.scale('year', {
                    range: [0, 1],
                });
                chart.scale('value', {
                    nice: true,
                });
                chart.tooltip({
                    shared: true,
                    showCrosshairs: true,
                });
                chart
                    .area()
                    .position('year*value')
                    .color('type')
                    .shape('smooth');
                chart
                    .line()
                    .position('year*value')
                    .color('type')
                    .shape('smooth');
                chart.render();
            },
            newUserChart(){
                const dv = new DataSet.DataView().source(this.quantity);
                dv.transform({
                    type: 'fold',
                    fields: ['south'], // 展开字段集
                    key: 'type', // key字段
                    value: 'value', // value字段
                });

                const chart = new Chart({
                    container: 'newUser',
                    autoFit: true,
                    height: 243,
                });

                chart.data(dv.rows);
                chart.scale('year', {
                    range: [0, 1],
                });
                chart.scale('value', {
                    nice: true,
                });
                chart.tooltip({
                    shared: true,
                    showCrosshairs: true,
                });
                chart
                    .area()
                    .position('year*value')
                    .color('type')
                    .shape('smooth');
                chart
                    .line()
                    .position('year*value')
                    .color('type')
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
    }
    .chart-box{
        width: 1184px;
        height: 284px;
        background-color: white;
        margin: 24px 0;
        padding: 0 24px;
    }
    .chart{
        width: 1184px;
        height: 243px;
    }
    .chart-title{
        font-size: 18px;
        padding-top: 17px;
    }
</style>