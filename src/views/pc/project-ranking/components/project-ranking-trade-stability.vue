<template>
    <div class="chart-box">
        <div class="chart-title">
            <template>
                <el-select v-model="selectValue" @change="changeSelect">
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
                <div class='empty-data' v-if="!charData.list || charData.list.length === 0" style="margin-top: 0">
                    <img class="img" src="@/assets/image/pc/empty-data.png" alt="" style="height: 180px;">
                    <p style="line-height: 25px">{{ $t('lang.emptyData') }}</p>
                </div>
            </div>

        </div>
    </div>
</template>

<script lang="ts">
import DataSet from '@antv/data-set'
import  {Chart} from '@antv/g2'
import {defineComponent, ref, watch} from "vue";
import {useI18n} from "vue-i18n";
import {getUuid} from "../../../../utils/common";

interface IOption {
    id: string
    label: string
}

export default defineComponent({
    name: "project-ranking-trade-stability",
    props: {
        // 代币下拉列表
        selectData: {
            type: Array,
        },
        // 图标数据集合
        charData: {
            type: Object,
        }
    },
    setup(props) {
        const {t} = useI18n()
        const selectValue = ref<string>(`${t('lang.projectRinking.tradeStb.all')}`)
        // 监听下拉列表props变化,生產下拉列表數據結構
        watch(() => {
            return props.selectData
        }, (nVal) => {
            if (nVal && nVal.length > 0) {
                createSelectData(nVal as Array<string>)
            }
        })
        // 监听圖表數據props变化
        watch(() => {
            return props.charData
        }, (nVal) => {
            if (nVal && nVal.list && nVal.list.length) {
                handleChartData(selectValue.value)
            }
        })
        /**
         * 渲染图表
         */
        const chart = ref<any>(null)
        const tradeChart = (dv:any, data:any): void => {
            const chartInner = new Chart({
                container: 'tradeStb',
                autoFit: true,
                height: 243,
            });
            chart.value = chartInner
            chartInner.data(dv.rows)
            chartInner.data(data);
            chartInner.scale('create_time', {
                range: [0, 1],

            });
            chartInner.scale('token_balance', {
                nice: true,
            });
            chartInner.tooltip({
                showCrosshairs: true,
                shared: true,
            });

            chartInner.area().adjust('stack').position('create_time*token_balance').color('tokenName').shape('smooth');
            chartInner.line().adjust('stack').position('create_time*token_balance').color('tokenName').shape('smooth');

            chartInner.interaction('element-highlight');
            // 复写 图例筛选 交互。1、点击图例名称 进行 unchecked 状态的切换 2、点击图例 marker，进行 checked 状态的切换（进行聚焦）3、双击 重置状态
            chartInner.interaction('legend-filter', {
                start: [
                    {trigger: 'legend-item-name:click', action: ['list-unchecked:toggle', 'data-filter:filter']},
                    {trigger: 'legend-item-marker:click', action: ['list-checked:checked', 'data-filter:filter']},
                ],
                end: [{trigger: 'legend-item-marker:dblclick', action: ['list-checked:reset', 'data-filter:filter']}],
            });
            chartInner.render();
        }
        /**
         * 生成下拉类别数据
         */
        const options = ref<Array<IOption>>([])
        const createSelectData = (list: Array<string>): void => {
            options.value = [{id: getUuid(), label: `${t('lang.projectRinking.tradeStb.all')}`}]
            list.forEach(val => {
                options.value.push({
                    id: getUuid(),
                    label: val
                })
            })
        }
        /**
         * 下拉變換
         */
        const changeSelect = (): void => {
            // 根據下拉變換處理數據，並渲染
            handleChartData(selectValue.value)
        }
        /**
         * 處理圖標數據
         * @param {String} currency - 幣種
         */
        const charDataInner = ref<Array<any>>([])
        const handleChartData = (currency: string = '全部'): void => {
            if ((props.charData?.list && props.charData.list.length === 0) || !props.charData?.list) return;
            charDataInner.value = []
            if (currency === '全部') {
                props.charData.list.forEach((val:any) => {
                    val.list.forEach((re:{tokenName:string}) => re.tokenName = val.token_name)
                    charDataInner.value = charDataInner.value.concat(val.list)
                })
            } else {
                props.charData.list.forEach((val:any) => {
                    if (val.token_name === currency) {
                        val.list.forEach((re:{tokenName:string}) => re.tokenName = val.token_name)
                        charDataInner.value = charDataInner.value.concat(val.list)
                    }
                })
            }

            const dv = new DataSet.DataView().source(charDataInner.value);
            dv.transform({
                type: 'fold',
                fields: ['token_balance'], // 展开字段集
                key: 'type', // key字段
                value: 'value', // value字段
            });
            if (!chart.value) {
                // 渲染圖表
               tradeChart(dv, charDataInner.value)
            } else {
                chart.value.changeData(charDataInner.value)
            }

        }
        return {
            selectValue,
            changeSelect,
            options,
        }
    }
})

</script>

<style scoped lang="scss">
.chart-box {
    width: 100%;
    height: 296px;
    padding: 0 24px;
    background-color: white;
}

.chart {
    width: 100%;
    height: 243px;
}

.chart-title {
    display: flex;
    flex-direction: row-reverse;
    padding-top: 17px;
    font-size: 18px;
    font-weight: bold;
}
</style>