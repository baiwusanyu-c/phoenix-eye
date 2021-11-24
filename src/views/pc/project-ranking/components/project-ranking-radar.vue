/*
* @project-ranking-radar.vue
* @deprecated
* @author czh
* @update (czh 2021/11/23)
*/
<template>
    <div class="project-ranking-radar">
        <div class="project-ranking-radar-info">
            <img :src="logoType"/>
            <span class="project-ranking-radar-platform">{{platform.toUpperCase()}}</span>
            <be-ellipsis-copy :targetStr="addr"
                              :is-ellipsis="addr.length > 30"
                              :fontLength="8"
                              :endLength="8">
            </be-ellipsis-copy>
        </div>
        <div class="project-ranking-radar-chart" :id="`radar_chart${this._uid}`">

        </div>
    </div>
</template>

<script>
import DataSet from '@antv/data-set';
import {Chart} from '@antv/g2';
export default {
    name: "project-ranking-radar",
    data() {
        return {
            imgCodeDict:{
                bsc: require('@/assets/image/pc/tx-num.png'),
                heco: require('@/assets/image/pc/user-num.png'),
                eth: require('@/assets/image/pc/contract-num.png'),
                polygon: require('@/assets/image/pc/contract-num.png'),
            }
        }
    },
    computed:{
        logoType(){
            return this.imgCodeDict[this.platform]
        }
    },
    props:{
        platform:{
            type:String,
            default:'bsc'
        },
        addr:{
            type:String,
            default:'8acef67c2719fb0fdd1a22c78fb7746f13e824c66b55c0f3dd0e17f50226f029'
        }
    },
    mounted() {
        this.$nextTick(()=>{
            this.renderRadar()
        })
    },
    methods: {
        renderRadar(){
            const { DataView } = DataSet;
            const data = [
                { item: '静态检测', a: 70, },
                { item: '市场波动', a: 60 },
                { item: '交易安全', a: 50 },
            ];
            const dv = new DataView().source(data);
            dv.transform({
                type: 'fold',
                fields: ['a'], // 展开字段集
                key: 'user', // 设置数据key对应展开字段-》 user:'a'
                value: 'score', // 设置数据value字段 对应展开字段-》 a:70 => score:70
            });
            const chart = new Chart({
                container: `radar_chart${this._uid}`,
                autoFit: true,
                height: 250,
                appendPadding:[10]
            });
            chart.data(dv.rows);
            chart.scale('score', {
                min: 0,
                max: 80,
            });
            chart.coordinate('polar', {
                radius:1,
            });
            // 坐标轴 - label文字
            chart.axis('item', {
                line: null,
                tickLine: null,
                grid: {
                    line: {
                        style: {
                            lineDash: null,
                        },
                    },
                },
                label:{
                    style:{
                        fontWeight:'bold',
                        fontSize:16
                    }
                }
            });
            // 坐标轴 - 刻度
            chart.axis('score', {
                line: null,
                tickLine: null,
                grid: {
                    line: {
                        type: 'line',
                        style: {
                            lineDash: null,
                        },
                    },
                },
            });

            chart
                .line()
                .position('item*score')
                .color('#1890FF')
                .size(2)

            chart
                .area()
                .position('item*score')
                .color('#1890FF');
            chart.legend(false);
            chart.render();

        }
    },
}
</script>

<style lang="scss">
.project-ranking-radar{
    display: flex;
    background: $mainColor7;
    padding: 20px;
    box-sizing: border-box;
    border-radius: 4px;
    align-items: center;
    width: 32.5%;
    flex-direction: column;
    .project-ranking-radar-info{
        display: flex;
        justify-content: flex-start;
        align-items: center;
        width: 100%;
        img{
            width: 25px;
            height: 25px;
        }
        .project-ranking-radar-platform{
            color: $textColor4;
            font-weight: bold;
            margin: 0 16px 0 6px;
        }
        .address{
            color: $textColor4;
        }
    }
    .project-ranking-radar-chart{
        width: 100%;
        height: 100%;
    }
}

</style>