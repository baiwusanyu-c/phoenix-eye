/*
* @invest-tree-node.js
* @deprecated 调证分析 - 树形图 - 自定义节点
* @author czh
* @update (czh 2021/7/30)
*/

import G6 from '@antv/g6';
let centerX = 0
export function initGraphicTreeNode(){
    G6.registerNode(
        'invesTreeNode',
        {
            /**
             * 绘制节点，包含文本
             * @param  {Object} cfg 节点的配置项
             * @param  {G.Group} group 图形分组，节点中的图形对象的容器
             * @return {G.Shape} 绘制的图形，通过 node.get('keyShape') 可以获取到
             */
            draw(cfg, group) {
                // 交易所名称
                const tagName = !cfg.tag_name || typeof(cfg.tag_name) == 'number' ? '' : cfg.level ? cfg.tag_name : `${cfg.tag_name.substr(0, 5)}...`
                // 源点样式
                let orgCircleAttr = {
                    r:30,
                    stroke: '#b5b5b5',
                    lineWidth:1,
                    fill:'#FFFFFF'
                }
                // 中间点设置 就是那些灰色的点
                let midCircleAttr = {
                    r:5,
                    stroke: '#b5b5b5',
                    lineWidth:1,
                    fill:'#FFFFFF'
                }
                // 交易源点样式
                let txRectAttr = {
                    width: 200,
                    height: 44,
                    radius: 23,
                    y:-22,
                    stroke: '#b5b5b5',
                    lineWidth:1,
                    fill:'#FFFFFF'
                }
                // 交易 图片 样式
                let imgAttr = {
                    x: 12,
                    y: -12,
                    width: 24,
                    height: 24,
                    img:''
                }

                let direct = ''
                if(cfg.id === 'root'){
                    direct = 'center'
                }
                if(cfg.direction && cfg.direction === 'front' && cfg.id !== 'root'){
                    direct = 'left'
                    txRectAttr.x = -200
                    imgAttr.x = -32
                }
                if(cfg.direction && cfg.direction === 'back' && cfg.id !== 'root'){
                    direct = 'right'
                }
                let circle = null
                /**
                 * 绘制源节点
                 * 注：一开始发现没有源点...，是因为源点中type字段和G6冲突
                 */
                if(cfg.id === 'root'){
                    centerX = cfg.x
                    circle = group.addShape('circle', {
                        attrs: orgCircleAttr,
                        capture:true,
                        zIndex:1,
                        name: 'circle-shape',
                    });
                }
                /**
                 * 中间点
                 */
                if(!cfg.tag_name || typeof(cfg.tag_name) == 'number'){
                    circle = group.addShape('circle', {
                        attrs: midCircleAttr,
                        capture:true,
                        zIndex:1,
                        name: 'circle-shape',
                    });
                }
                /**
                 * 绘制交易所节点
                 */
                if (!(!cfg.tag_name || typeof(cfg.tag_name) == 'number') && cfg.id !== 'root'){
                    imgAttr.img = cfg.img
                    // 绘制底图圆形
                    circle = group.addShape('rect', {
                        attrs: txRectAttr,
                        capture:true,
                        zIndex:1,
                        name: 'circle-shape',
                    });
                    // 绘制交易所图片
                    let imgShape = group.addShape('image', {
                        attrs: imgAttr,
                        zIndex:0,
                        name: 'image-shape',
                    });
                    // 切割图片 解决边角问题
                   /* imgShape.setClip({
                        type: 'circle', // 支持 circle、rect、ellipse、Polygon 及自定义 path clip
                        attrs: {
                            r: 12,
                            x: 0,
                            y: 0,
                        },
                    })*/
                    // 创建一个分组 txValTextGroup，并绘制金额信息
                    let txTextGroup = group.addGroup({
                        id:'txValTextGroup',
                        capture:true
                    })
                    let num = ''
                    if(cfg.related_tx_value && cfg.unit && cfg.prop){
                        num = `(${formatDecimal(cfg.related_tx_value,6)} ${cfg.unit})`
                    }
                   let edgeinfo = cfg.prop ? formatDecimal(( cfg.prop * 100) , 2) == '0.00' ? '小额资金':formatDecimal((cfg.prop * 100) , 2) + '%' : '';
                    edgeinfo = edgeinfo + num
                    let txTextShape = txTextGroup.addShape('text',
                        {
                            attrs: {
                                //x: direct === 'left' ? -78 : 40,
                                x: direct === 'left' ? -40 : 40,
                                y: direct === 'left' ? 10 : 9,
                                textAlign: 'left',
                                textBaseline: 'middle',
                                text: edgeinfo,
                                shapeKey:'tx-value-text',
                                fill: '#000000',
                                fontSize: 10,
                            },
                            zIndex:2,
                            capture:true,
                            name: 'text-shape',
                        })
                    if(direct === 'left'){
                        const txTextShapeBBox = txTextShape.getBBox();
                        txTextShape && txTextShape.attr({
                            x: txTextShapeBBox.x - txTextShapeBBox.width,
                        });
                    }
                }
                /*
                 * 绘制节点文本
                 */
                let textOffsetX = 0
                let textOffsetY = 0
                let textDirect = 'center'
                if(direct === 'left'){
                    textOffsetX = -40
                    textOffsetY = -10
                    textDirect = 'right'
                }
                if(direct === 'right'){
                    textOffsetX = 40
                    textOffsetY = -10
                    textDirect = 'left'
                }
                if(direct === 'center'){
                    textOffsetX = 0
                    textOffsetY = 0
                }
                if (tagName) {
                    group.addShape('text', {
                        attrs: {
                            x: textOffsetX,
                            y: textOffsetY,
                            textAlign: cfg.id === 'root' ? 'center' : textDirect,
                            textBaseline: 'middle',
                            text: tagName,
                            fill: cfg.id === 'root' ? '#F77300' : '#777777',
                        },
                        zIndex:2,
                        capture:true,
                        name: 'text-shape',
                    });
                }
                return circle;
            },

            setState(name, value, node) {
                /**
                 * 设置hover
                 */
                if(name === 'hover' && value){
                    node._cfg.group.getFirst().attr('stroke','#1496F2')
                    if(node._cfg.id !== 'root' && (node._cfg.model.tag_type === 'exchange' || node._cfg.model.tag_type === 'ai_exchange'
                        || node._cfg.model.tag_type === "wallet")){
                        // 创建交易路径按钮
                        createRectElm('交易路径 >>',node._cfg.model.direction,node._cfg)
                    }
                }
                if(name === 'hover' && !value){
                    node._cfg.group.getFirst().attr('stroke','#b5b5b5')

                    if(node._cfg.id !== 'root' && (node._cfg.model.tag_type === 'exchange' || node._cfg.model.tag_type === 'ai_exchange'
                        || node._cfg.model.tag_type === "wallet")){
                        // 删除交易路径按钮
                        deleteGroup(node._cfg.group,'txTextGroup')
                    }
                }
            },
        },
        'circle',
    );
}

/**
 * hover 创建矩形元素
 * @param name 显示名称
 * @param direction 方向
 * @param cfg G6的cfg对象
 */
function createRectElm(name,direction,cfg){
    let txTextGroup = cfg.group.addGroup({
        id:'txTextGroup',
        capture:true
    })
    let direct = ''
    if(direction && direction === 'front'){
        direct = 'left'
    }
    if(direction && direction === 'back'){
        direct = 'right'
    }
    txTextGroup.addShape('rect',{
        attrs: {
            x: direct === 'left' ? -240 : 180,
            y: -10,
            width: 70,
            height: 24,
            radius: 8,
            fill: '#1496F2',
            shapeKey:'tx-rect'
        },
    })
    txTextGroup.addShape('text',
        {
            attrs: {
                x: direct === 'left' ? -230 : 190,
                y: direct === 'left' ? 3 : 4,
                textAlign: 'left',
                textBaseline: 'middle',
                text: name,
                shapeKey:'tx-text',
                fill: '#FFFFFF',
                fontSize: 10,
            },
            zIndex:2,
            capture:true,
            name: 'text-shape',
        })
}

/**
 * 图形元素删除方法
 * @param shapeKey keyShape字段
 * @param group 图形组
 */
function deleteShape(shapeKey,group){
    let list = group.findAll((res)=>{
        return res.attrs && res.attrs.shapeKey === shapeKey
    })
    list.forEach(value=>{
        group.removeChild(value)
    })
}
/**
 * 图形元素删除方法
 * @param pGroup 父图形组对象
 * @param groupName 图形组名
 */
function deleteGroup(pGroup,groupName){
    let group = pGroup.findById(groupName);
    pGroup.removeChild(group);
}

function formatDecimal (num, decimal){
    num = num.toString()
    let index = num.indexOf('.')
    if (index !== -1) {
        num = num.substring(0, decimal + index + 1)
    } else {
        num = num.substring(0)
    }
    return parseFloat(num).toFixed(decimal)
}