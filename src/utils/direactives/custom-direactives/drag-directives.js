/*
* drag-directives.js
* @deprecated 拖拽指令
* @author xuqianqian
* @create (xuqianqian 2021/4/16)
* @update (czh 2021/4/16)
*/
const dragDirective = {
    drag: {
        bind: (el, binding) => {
            let op = el
            // 设置不拖拽就直接返回
            if (binding.value && (binding.value.isDrag === false || binding.value.isDrag === 'false')) {
                return
            }
            if (op.firstChild) {
                op.firstChild.style.cursor = 'move'
            }
            // 调证分析- 交易所中的信息区也可拖动
            let otherEle = '';
            for (let i = 0; i < op.children.length; i++) {
                if (op.children[i].className && op.children[i].className.indexOf('info-tag') > -1) {
                    otherEle = op.children[i];
                    break;
                }
            }

            el.onmousedown = (e) => {
                let isTitle = false
                if (e.path) {
                    //遍历，只允许拖拽标题时触发移动
                    for (let i = 0; i < e.path.length; i++) {
                        //由标题触发拖拽，必然经过firstChild
                        if (op.firstChild === e.path[i] || otherEle === e.path[i]) {
                            isTitle = true; break;
                        }

                    }
                } else {
                    // 兼容下火狐
                    isTitle = true;
                }
                if (!isTitle) {
                    return
                }
                let offsetWidth = document.body.offsetWidth
                let offsetHeight = document.body.offsetHeight
                // 修改bug 3288
                /*if(document.querySelector('#layout-fold')){
                    offsetWidth = document.body.offsetWidth - 420
                }*/
                // 修改bug 3848
                if(document.querySelector('#xnhb_nav_menu')){
                    offsetWidth = document.body.offsetWidth - document.querySelector('#xnhb_nav_menu').offsetWidth
                }

                if (offsetWidth === 0 || offsetHeight === 0) {
                    console.error('Please set the width and height of the body element')
                    return
                }
                let disX = e.clientX - op.offsetLeft
                let disY = e.clientY - op.offsetTop
                let eWidth = e.currentTarget.offsetWidth
                let eHeight = e.currentTarget.offsetHeight
                let ix = 0
                document.onmousemove = (eMove) => {
                    if (ix > 1) {
                        let left = eMove.clientX - disX
                        let top = eMove.clientY - disY
                        let maxLeft = offsetWidth - eWidth
                        let maxBottom = offsetHeight - eHeight

                        if (top < 0) {
                            top = 0
                        }
                        if (left < 0) {
                            left = 0
                        }
                        if (top > maxBottom) {
                            top = maxBottom
                        }
                        if (left > maxLeft) {
                            left = maxLeft
                        }
                        op.style.left = left + 'px'
                        op.style.top = top + 'px'
                        op.style.setProperty('right','initial');
                        op.style.setProperty('bottom','initial');
                        //将移动后的top和left回调出去
                        if (binding.value && Object.prototype.toString.call(binding.value) === "[object Function]") {
                            binding.value({ left, top })
                        }
                    }
                    ix++;
                }
                document.onmouseup = () => {
                    document.onmousemove = document.onmouseup = null
                }
            }
        }
    }
}
export default dragDirective

