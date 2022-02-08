<template>
    <div class="market-performance">
        <div class="chart-box">
            <div class="chart-title">
                <span>{{$t('el.projectRinking.marketPerformance.tradeNum')}}</span>
            </div>
            <div class="chart">
                <div id="quantity" >
                    <div  class = 'empty-data' v-if="txQuantity.length === 0" style="margin-top: 0">
                        <img class="img" src="@/assets/image/pc/empty-data.png" alt="" style="height: 180px;" >
                        <p style="line-height: 25px">{{$t('el.emptyData')}}</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="chart-box">
            <div class="chart-title">
                <span>{{$t('el.projectRinking.marketPerformance.newUserNum')}}</span>
            </div>
            <div class="chart">
                <div id="newUser" >
                    <div  class = 'empty-data' v-if="newUser.length === 0" style="margin-top: 0">
                        <img class="img" src="@/assets/image/pc/empty-data.png" alt=""  style="height: 180px;" >
                        <p style="line-height: 25px">{{$t('el.emptyData')}}</p>
                    </div>
                </div>
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
                // 新增用户图表对象
                userChart:null,
                // 交易量图表对象
                txQuantityChart:null,
            }
        },
        props:{
            // 交易量
            txQuantity:{
                type:Array,
                default:()=>[]
            },
            // 新增用戶
            newUser:{
                type:Array,
                default:()=>[]
            }
        },
        watch:{
            txQuantity: {
                deep: true, //深度监听设置为 true
                handler: function () {
                   this.quantityChart(true)
                }
            },
            newUser: {
                deep: true, //深度监听设置为 true
                handler: function () {
                    this.newUserChart(true)
                }
            },
        },
        mounted() {
            this.$nextTick(()=>{
                this.quantityChart()
                this.newUserChart()
            })
        },
        methods:{
            quantityChart(isUpdate){
                if(this.txQuantity.length === 0) return;
                const dv = new DataSet.DataView().source(this.txQuantity);
                dv.transform({
                    type: 'fold',
                    fields: ['tx_amount'], // 展开字段集
                    key: 'type', // key字段
                    value: 'value', // value字段
                });
                // 更新
                if(isUpdate){
                    this.txQuantityChart.data(dv.rows);
                    this.txQuantityChart.render(isUpdate);
                    return
                }
                const chart = new Chart({
                    container: 'quantity',
                    autoFit: true,
                    height: 243,
                });
                this.txQuantityChart = chart
                chart.data(dv.rows);
                chart.scale('date', {
                    range: [0, 1],
                });
                chart.scale('value', {
                    nice: true,
                });
                chart.tooltip({
                    shared: true,
                    showCrosshairs: true,
                });
                chart.axis('date',{
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
                    .position('date*value')
                    .color('#1890FF')
                    .shape('smooth');
                chart
                    .line()
                    .position('date*value')
                    .color('#1890FF')
                    .shape('smooth');
                chart.render();
            },
            newUserChart(isUpdate){
                if(this.newUser.length === 0) return;
                const dv = new DataSet.DataView().source(this.newUser);
                dv.transform({
                    type: 'fold',
                    fields: ['user_num'], // 展开字段集
                    key: 'type', // key字段
                    value: 'value', // value字段
                });
                if(isUpdate){
                    this.userChart.data(dv.rows);
                    this.userChart.render(isUpdate);
                    return
                }
                const chart = new Chart({
                    container: 'newUser',
                    autoFit: true,
                    height: 243,
                });
                this.userChart = chart
                chart.data(dv.rows);
                chart.scale('date', {
                    range: [0, 1],
                });
                chart.scale('value', {
                    nice: true,
                });
                chart.tooltip({
                    shared: true,
                    showCrosshairs: true,
                });
                chart.axis('date',{
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
                    .position('date*value')
                    .color('#1890FF')
                    .shape('smooth');
                chart
                    .line()
                    .position('date*value')
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