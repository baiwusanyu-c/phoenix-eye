/*
* @project-ranking-radar.vue
* @deprecated
* @author czh
* @update (czh 2021/11/23)
*/
<template>
    <div class="project-ranking-radar">
        <div class="project-ranking-radar-info">
            <img :src="logoType" alt=""/>
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
import {Chart, registerGeometryLabelLayout} from '@antv/g2';
export default {
    name: "project-ranking-radar",
    data() {
        return {
            imgCodeDict:{
                bsc: require('@/assets/image/pc/bsc.png'),
                heco: require('@/assets/image/pc/heco.png'),
                eth: require('@/assets/image/pc/eth.png'),
                polygon: require('@/assets/image/pc/heco.png'),
            },
            // 雷达图实例对象
            radarChart:null
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
        },
        radarData:{
            type:Array,
            default:()=>[
                { key:'jtjc-staticDetection', item: '静态检测', a: 10, },
                { key:'jywd-txStability',item: '市场波动', a: 6 },
                { key:'jyaq-txSecurity',item: '交易安全', a: 5 },
            ]
        }
    },
    watch:{
        radarData: {
            deep: true, //深度监听设置为 true
            handler: function () {
                this.renderRadar(true)
            }
        },
    },
    mounted() {
        this.$nextTick(()=>{
            this.renderRadar()
        })
    },
    methods: {
        renderRadar(isUpdate){
            // 坐标label缓存
            const labelCache = []
            function limitInShape(items, labels) {
                labels.forEach((labelGroup, index) => {
                    const labelBBox = labelGroup.getCanvasBBox()
                    labelGroup.cfg.children[0].cfg.visible = false
                    let offsetX = labelCache[index].point.x
                    let offsetY = labelCache[index].point.y
                    if(labelGroup.cfg.data.key === 'jtjc-staticDetection'){
                        offsetX = offsetX + labelBBox.width/2 + 10
                        offsetY = labelCache[index + 3].point.y / 2 + 2
                    }
                    if(labelGroup.cfg.data.key === 'jywd-txStability'){
                        offsetY = labelCache[index + 3].point.y + 36
                        offsetX = offsetX + 10
                    }
                    if(labelGroup.cfg.data.key === 'jyaq-txSecurity'){
                        offsetX = offsetX - labelBBox.width/2 - 8
                        offsetY = labelCache[index + 3].point.y + 36
                    }
                    // 添加分数label
                    labelGroup.addShape('text', {
                        attrs: {
                            x: offsetX,
                            y: offsetY,
                            text: items[index].data.score,
                            textBaseline: 'middle',
                            fill: '#1890FF',
                            fontWeight: 'bold',
                            fontSize: 16
                        },
                    })
                })
            }
            // 注册 label 布局函数
            registerGeometryLabelLayout('limit-in-shape', limitInShape);
            const { DataView } = DataSet;
            const dv = new DataView().source(this.radarData);
            dv.transform({
                type: 'fold',
                fields: ['a'], // 展开字段集
                key: 'user', // 设置数据key对应展开字段-》 user:'a'
                value: 'score', // 设置数据value字段 对应展开字段-》 a:70 => score:70
            });
            // 更新
            if(isUpdate){
                this.radarChart.data(dv.rows);
                this.radarChart.render(isUpdate);
                return
            }
            const chart = new Chart({
                container: `radar_chart${this._uid}`,
                autoFit: true,
                height: 250,
                appendPadding:[10]
            });
            this.radarChart = chart
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
                label: {
                    style: {
                        fontWeight: 'bold',
                        fontSize: 16,
                        fill:'black',
                        fontFamily:'PingFangSC-Medium, PingFang SC, sans-serif'
                    },
                    formatter: (text, item) => {
                        labelCache.push(JSON.parse(JSON.stringify(item)))
                        return text
                    }
                },
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
                .label('item*score', {
                    autoRotate:false,
                    layout: {
                        type: 'limit-in-shape',
                    },
                });

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
    margin-bottom: 16px;
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