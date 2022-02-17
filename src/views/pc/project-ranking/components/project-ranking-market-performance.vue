<template>
    <div class="market-performance">
        <div class="chart-box">
            <div class="chart-title">
                <span>{{ $t('lang.projectRinking.marketPerformance.tradeNum') }}</span>
            </div>
            <div class="chart">
                <div id="quantity">
                    <div class='empty-data' v-if="txQuantity.length === 0" style="margin-top: 0">
                        <img class="img" src="@/assets/image/pc/empty-data.png" alt="" style="height: 180px;">
                        <p style="line-height: 25px">{{ $t('lang.emptyData') }}</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="chart-box">
            <div class="chart-title">
                <span>{{ $t('lang.projectRinking.marketPerformance.newUserNum') }}</span>
            </div>
            <div class="chart">
                <div id="newUser">
                    <div class='empty-data' v-if="newUser.length === 0" style="margin-top: 0">
                        <img class="img" src="@/assets/image/pc/empty-data.png" alt="" style="height: 180px;">
                        <p style="line-height: 25px">{{ $t('lang.emptyData') }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import DataSet from '@antv/data-set'
import {Chart} from '@antv/g2'
import {defineComponent, onMounted, ref, watch} from "vue";
import {useI18n} from "vue-i18n";
export default defineComponent({
    name: "project-ranking-market-performance",
    props: {
        // 交易量
        txQuantity: {
            type: Array,
            default: () => []
        },
        // 新增用戶
        newUser: {
            type: Array,
            default: () => []
        }
    },
    setup(props){
        const {t} = useI18n()
        watch(()=>{
            return props.txQuantity
        },()=>{
            quantityChart(true)
        })
        watch(()=>{
            return props.newUser
        },()=>{
            newUserChart(true)
        })
        onMounted(()=>{
            quantityChart()
            newUserChart()
        })
         // 交易量图表对象
        const txQuantityChart = ref(null)
        const quantityChart = (isUpdate?:boolean):void => {
            if (props.txQuantity.length === 0) return;
            const dv = new DataSet.DataView().source(props.txQuantity);
            dv.transform({
                type: 'fold',
                fields: ['tx_amount'], // 展开字段集
                key: 'type', // key字段
                value: 'value', // value字段
            });
            // 更新
            if (isUpdate) {
                txQuantityChart.value.data(dv.rows);
                txQuantityChart.value.render(isUpdate);
                return
            }
            const chart = new Chart({
                container: 'quantity',
                autoFit: true,
                height: 243,
            });
            txQuantityChart.value = chart
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
            chart.axis('date', {
                title: {
                    text: `${t('lang.projectRinking.marketPerformance.time')}`
                },
            })
            chart.axis('value', {
                title: {
                    text: `${t('lang.projectRinking.marketPerformance.tradeNum')}`
                },
                line: {
                    style: {
                        stroke: '#bfbfbf'
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
        // 新增用户图表对象
        const userChart = ref(null)
        const newUserChart = (isUpdate?:boolean):void => {
            if (props.newUser.length === 0) return;
            const dv = new DataSet.DataView().source(props.newUser);
            dv.transform({
                type: 'fold',
                fields: ['user_num'], // 展开字段集
                key: 'type', // key字段
                value: 'value', // value字段
            });
            if (isUpdate) {
                userChart.value.data(dv.rows);
                userChart.value.render(isUpdate);
                return
            }
            const chart = new Chart({
                container: 'newUser',
                autoFit: true,
                height: 243,
            });
            userChart.value = chart
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
            chart.axis('date', {
                title: {
                    text: `${t('lang.projectRinking.marketPerformance.time')}`
                }
            })
            chart.axis('value', {
                title: {
                    text: `${t('lang.projectRinking.marketPerformance.userNum')}`
                },
                line: {
                    style: {
                        stroke: '#bfbfbf'
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
        return {

        }
    }
})

</script>

<style scoped lang="scss">
.market-performance {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin: auto;
}

.chart-box {
    box-sizing: border-box;
    width: 100%;
    height: 284px;
    padding: 0 24px;
    margin: 24px auto;
    background-color: white;
}

.chart {
    width: 100%;
    height: 243px;
}

.chart-title {
    padding-top: 17px;
    font-size: 18px;
    font-weight: bold;
}
</style>