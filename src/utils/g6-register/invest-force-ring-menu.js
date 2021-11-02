/*
* @invest-force-ring-menu.js
* @deprecated
* @author czh
* @update (czh 2021/8/6)
*/
import G6 from '@antv/g6';
// 节点颜色字典
const nodeAttrDict = {
    // 源点样式
    orgNodeAttr: {
        fill: '#FF8140',
        r: 35
    },
    // 空地址样式节点样式
    emptyAddrNodeAttr: {
        fill: '#cccccc',
        r: 25
    },
    // 交易所地址节点样式
    txNodeAttr: {
        fill: 'rgb(241, 175, 0)',
        r: 25
    },
    // 充币地址节点样式
    chargeNodeAttr: {
        fill: '#FF8A8A',
        r: 25
    },
    // 普通地址节点样式
    ordNodeAttr: {
        fill: '#9BC8DF',
        r: 25
    },
    // 錢包地址
    walletNodeAttr: {
        fill: '#ffdaf0',
        r: 25
    }
}
// 环形菜单配置
const nodeMenuConfig = [
    {
        rate: 50,
        chName: '标注',
        color:'#899AA2',
        id:'marker_menu_item',
        menuName:'lables',
        imgUrl: require("@/assets/image/pc/bg_lable.png")
    },
    {
        rate: 50,
        chName: '详情',
        color:'#899AA2',
        id:'detail_menu_item',
        menuName:'details',
        imgUrl: require("@/assets/image/pc/bg_details.png")
    }
]
/**
 * 初始化自定义节点
 * @returns {*}
 */
export function initGraphicForceNode() {
    G6.registerNode(
        'investForceNode',
        {
            /**
             * 绘制节点，包含文本
             * @param  {Object} cfg 节点的配置项
             * @param  {G.Group} group 图形分组，节点中的图形对象的容器
             * @return {G.Shape} 绘制的图形，通过 node.get('keyShape') 可以获取到
             */
            draw(cfg, group) {
                let nodeAttr = nodeAttrDict[jugeNodeType(cfg)]
                /**
                 * 绘制节点
                 */
                let circle = group.addShape('circle', {
                    attrs: {
                        x: 0,
                        y: 0,
                        r: 5,
                        shapeKey: 'invest-force-circle',
                        ...nodeAttr
                    },
                    capture: true,
                    zIndex: 1,
                    name: 'circle-shape',
                });
                /*
                 * 绘制节点文本
                 */
                if (cfg.addr) {
                    let label = cfg.addr.substr(0, 5) + '..'
                    group.addShape('text', {
                        attrs: {
                            x: 0,
                            y: 0,
                            shapeKey: 'invest-force-circle-text',
                            textAlign: 'center',
                            textBaseline: 'middle',
                            text: label,
                            fill: 'white',
                            fontStyle: 'bold',
                        },
                        zIndex: 2,
                        capture: true,
                        draggable: true,
                        name: 'text-shape',
                    });
                }
                // 绘制标注
                createTagElm(cfg, group, cfg.caseTag || cfg.sysTag, 'init')
                return circle;
            },
            update(cfg, node) {
                if (cfg.markerInfo) {
                    // 创建标注图形元素
                    createTagElm(cfg, node, cfg.markerInfo)
                }
                if (cfg.isShowMenu) {
                    // 创建环形菜单
                    createNodeMenu(cfg,node)
                }
            },
            setState(name, value, node) {
                /**
                 * 设置节点hover
                 */
                if (name === 'hover' && value) {
                    const circle = node._cfg.group.find(function (item) {
                        return item.cfg.type === 'circle'; // 找到首个填充为红色的图形
                    });
                    circle.attr('shadowColor', '#333333');
                    circle.attr('shadowBlur', 5);
                }
                if (name === 'hover' && !value) {
                    const circle = node._cfg.group.find(function (item) {
                        return item.cfg.type === 'circle'; // 找到首个填充为红色的图形
                    });
                    circle.attr('shadowColor', '');
                    circle.attr('shadowBlur', 0);
                }
                /**
                 * 设置菜单hover(path上触发)
                 */
                if (name === 'hoverMenu' && value
                    && value.target
                    && (value.target.attrs.shapeKey === 'invest-force-menu')
                    && value.state === true) {
                    value.target.setAttr('fill', '#1496F2')

                }
                if (name === 'hoverMenu' && value
                    && value.target
                    && (value.target.attrs.shapeKey === 'invest-force-menu' )
                    && value.state === false) {
                    value.target.setAttr('fill', '#899AA2')
                }
                /**
                 * 设置菜单hover(菜单图标上触发)
                 */
                /* if (name === 'hoverMenu' && value
                     && value.target
                     && (value.target.attrs.shapeKey === 'invest-force-menu-icon')
                     && value.state === true) {
                     value.target.setAttr('fill', '#1496F2')

                 }
                 if (name === 'hoverMenu' && value
                     && value.target
                     && (value.target.attrs.shapeKey === 'invest-force-menu-icon')
                     && value.state === false) {
                     value.target.setAttr('fill', '#899AA2')
                 }*/
            },
        })
}

/**
 * hover 创建标注按钮 (暂时废弃)
 * @param cfg G6的cfg对象
 */
function createMarkElm(cfg) {
    let txTextGroup = cfg.group.addGroup({
        zIndex: 3,
        id: 'markBtnGroup',
        capture: true
    })
    let imgAttr = {
        x: -10,
        y: cfg.model.depth === 0 ? 26 : 16,
        width: 20,
        height: 20,
        img: require('@/assets/image/pc/bg_lable.png'),
        shapeKey: 'edit-mark-btn'
    }
    txTextGroup.addShape('circle', {
        attrs: {
            shapeKey: 'edit-mark-circle',
            fill: '#B9BFC4',
            r: 13,
            x: 0,
            y: cfg.model.depth === 0 ? 35 : 25,
        },
        zIndex: 0,
        name: 'circle-shape',
    });
    txTextGroup.addShape('image', {
        attrs: imgAttr,
        zIndex: 1,
        name: 'image-shape',
    });
    txTextGroup.sort()
}
/**
 * 图形元素删除方法
 * @param shapeKey keyShape字段
 * @param group 图形组
 */
export function deleteShape(shapeKey, group) {
    let list = group.findAll((res) => {
        return res.attrs && res.attrs.shapeKey === shapeKey
    })
    list.forEach(value => {
        group.removeChild(value)
    })
}
/**
 * 图形元素删除方法
 * @param pGroup 父图形组对象
 * @param groupName 图形组名
 */
function deleteGroup(pGroup, groupName) {
    let group = pGroup.findById(groupName);
    pGroup.removeChild(group);
}
/**
 * 创建标注元素方法
 * @param cfg
 * @param node
 * @param markerInfo
 */
function createTagElm(cfg, node, markerInfo, type = 'update') {
    let tagInfoGroup = null
    let responseRect = null
    let responseText = null
    // 添加 更新 标注时
    if (type === 'update') {
        cfg.caseTag = markerInfo || ''
        // 获取到对应，看是否存在rect 和 text，存在就是编辑标注
        tagInfoGroup = node._cfg.group.findById('tagInfoGroup-' + cfg.id)
        if (tagInfoGroup && tagInfoGroup.cfg.children.length > 0) {
            // 更新文字
            tagInfoGroup.getLast().attr('text', cfg.caseTag)
            const textBBox = tagInfoGroup.getLast().getBBox()
            // 更新背景宽高位置
            tagInfoGroup.getFirst().attr({
                width: textBBox.width,
                height: textBBox.height,
                x: textBBox.x,
                y: textBBox.y,
            });
            return
        }
        // 否则就是添加标注
        // tagInfoGroup = node._cfg.group.addGroup({
        //     id:'tagInfoGroup-' + cfg.id,
        //     capture:true
        // })
    }
    // 图初始化时
    if (type === 'init') {
        tagInfoGroup = node.addGroup({
            id: 'tagInfoGroup-' + cfg.id,
            capture: true
        })
    }
    //if(!tagInfoGroup){return }
    if (markerInfo) {
        responseRect = tagInfoGroup.addShape('rect', {
            attrs: {
                radius: 2,
                shapeKey: 'invest-force-tag-bg',
                fill: '#FFFFFF',
            },
            zIndex: 1,
            capture: true,
            name: 'text-shape',
        });
        responseText = tagInfoGroup.addShape('text', {
            attrs: {
                x: 0,
                y: cfg.depth === 0 ? -50 : -40,
                shapeKey: 'invest-force-tag',
                textAlign: 'center',
                textBaseline: 'middle',
                text: markerInfo,
                fill: '#F68E59',
                background: {
                    fill: '#ffffff',
                    stroke: '#9EC9FF',
                    padding: [2, 2, 2, 2],
                    radius: 2,
                },
            },
            zIndex: 2,
            capture: true,
            name: 'text-shape',
        });
        const textBBox = responseText.getBBox();
        responseRect && responseRect.attr({
            width: textBBox.width,
            height: textBBox.height,
            x: textBBox.x,
            y: textBBox.y,
        });
        tagInfoGroup.sort()
    }
}
/**
 * 判别节点类型，分别设置颜色样式
 * @param {Object} node - 节点数据
 */
function jugeNodeType(node) {
    /**
     * 节点类型判断
     * back方向：
     * 1.end = true flag = 1 为钱包地址
     * 2.end = true flag字段没有，为充币地址
     * 3.balance 为 0 ，为空地址
     * front方向：
     * 1.end = true flag = 1 为钱包地址
     * 2.end = true flag字段没有，为交易所地址
     * 3.balance 为 0 ，为空地址
     */

    // 源点
    if (node.depth === 0) {
        return 'orgNodeAttr'
    }
    // 錢包地址
    if (node.isEnd && node.flag === 1) {
        return 'walletNodeAttr'
    }
    // 交易所
    if (node.isEnd && node.orientation === 'front' && !node.flag) {
        return 'txNodeAttr'
    }
    //充币地址
    if (node.isEnd && node.orientation === 'back' && !node.flag) {
        return 'chargeNodeAttr'
    }
    // 空地址
    if (node.info.balance === '0') {
        return 'emptyAddrNodeAttr'
    }
    // 普通地址
    return 'ordNodeAttr'
}
/**
 * 处理环形菜单数据
 * @param list
 * @returns {*[]}
 */
function handleMenuData(list,node,outerR,innerR) {
    // let arrNum = list;
    // let angle = 360;
    // let sumNum = 0;
    // let centerX = node.x; // 圆心坐标x
    // let centerY = node.y; // 圆心坐标y
    // let outerXY = [{x:node.x,y:node.y + outerR - innerR + 10}];// 起始内圈坐标点
    // let innerXY = [{x:node.x,y:node.y + innerR + 10}];// 起始外圈坐标点
    // 暂时写死吧，感觉计算总有问题
    let outerXY = [
        [{x:node.x - 1,y:node.y + outerR}, {x:node.x - 1,y:-(node.y + outerR)},],
        [{x:node.x + 1,y:-(node.y + outerR)}, {x:node.x + 1,y:node.y + outerR},]
    ];// 起始内圈坐标点
    let innerXY = [
        [{x:node.x - 1,y:node.y + innerR},    {x:node.x - 1,y:-(node.y + innerR)},],
        [{x:node.x + 1,y:-(node.y + innerR)}, {x:node.x + 1,y:node.y + innerR},]
    ];// 起始外圈坐标点
    let imageXY = [
        {x:node.x + innerR - (innerR - outerR)/2 ,y:0},
        {x:node.x - innerR + (innerR - outerR)/2,y:0}
    ]
    /*arrNum.forEach((item, index) => {
        let agNum = item/100*angle;
        sumNum += agNum;
        if(index === arrNum.length-1)
        {
            sumNum = 360;
        }
        let outerX = Math.cos(sumNum)*outerR + centerX;
        let outerY = Math.sin(sumNum)*outerR + centerY;
        outerXY.push({x:outerX,y:outerY});
        let innerX = Math.cos(sumNum)*innerR + centerX;
        let innerY = Math.sin(sumNum)*innerR + centerY;
        innerXY.push({x:innerX,y:innerY});

    });
    let imageXY = [
        {x:node.x + innerR - (innerR - outerR)/2 ,y:0},
        {x:node.x - innerR + (innerR - outerR)/2,y:0}
    ]*/
    return {outerXY, innerXY, imageXY};
}
/**
 * 生成菜单path数据
 * @returns {string}
 */
function getPath(outerXY, innerXY,outerR,innerR,index) {
    return 'M'+outerXY[index][0].x+' '+
        outerXY[index][0].y+'A'+outerR+' '+outerR+' '+' 0 0 1 '+outerXY[index][1].x+' '+
        outerXY[index][1].y+'L'+innerXY[index][1].x+' '+innerXY[index][1].y+'A'+innerR+' '+
        innerR+ ' 0 0 0 '+innerXY[index][0].x+' '+innerXY[index][0].y;
}

/**
 * 创建节点菜单
 * @param {Object} cfg -
 * @param {Object} node - 节点数据
 */
function createNodeMenu(cfg,node){
    // 根据菜单长度计算占比
    let proportion = (100 / nodeMenuConfig.length)
    let proportionList = []
    nodeMenuConfig.forEach(()=>{
        proportionList.push(proportion)
    })
    let outerR = 58;// 外圈半径
    let innerR = 30;// 内圈半径
    // 对源点特殊处理
    if(cfg.depth === 0){
        outerR = outerR + 10
        innerR = innerR + 10
    }
    let renderPath = handleMenuData(proportionList,node.getKeyShape().attrs,outerR,innerR);
    const imageXY = renderPath.imageXY.reverse()
    for(let i =0 ;i<renderPath.outerXY.length;i++)
    {
        // 生成菜单path
        const path = getPath(renderPath.outerXY, renderPath.innerXY,outerR,innerR,i)
        node._cfg.group.addShape('path', {
            attrs: {
                path: path,
                fill: nodeMenuConfig[i].color,
                lineAppendWidth:200,
                id:nodeMenuConfig[i].id,
                txt:nodeMenuConfig[i].chName,
                shapeKey: 'invest-force-menu',
            },
            zIndex:0,
            id:nodeMenuConfig[i].id,
            capture:true,
            name: 'path-shape',
        })
        node._cfg.group.addShape('image', {
            attrs: {
                x: imageXY[i].x -9  ,
                y: imageXY[i].y - 9,
                img: nodeMenuConfig[i].imgUrl,
                width: 18,
                height: 18,
                txt:nodeMenuConfig[i].chName,
                shapeKey: 'invest-force-menu-icon',
            },
            zIndex:1,
            name: nodeMenuConfig[i].menuName || `default_${i}`,
            draggable: true
        });
    }
    node._cfg.group.sort()
}