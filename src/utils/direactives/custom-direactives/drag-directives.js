/*
* drag-directives.js
* @deprecated 拖拽指令
* @author xuqianqian
* @create (xuqianqian 2021/4/16)
* @update (czh 2021/4/16)
*/
import {isFunction} from "../../auth";

const setMaxOrMin = (data,limit,type) =>{
    if (data > limit && type === 'max') {
        data = limit
    }
    if (data < limit && type === 'min') {
        data = limit
    }
    return data
}
const isTitleDom = (e,op) =>{
    let isTitle = false
    if (e.path) {
        //遍历，只允许拖拽标题时触发移动
        for (let i = 0; i < e.path.length; i++) {
            //由标题触发拖拽，必然经过firstChild
            if (op.firstChild === e.path[i]) {
                isTitle = true; break;
            }

        }
    } else {
        // 兼容下火狐
        isTitle = true;
    }
    return isTitle
}
const setCursor = (el,type)=>{
    if (el.firstChild) {
        el.firstChild.style.cursor = type
    }
}
const dragDirective = {
    drag: {
        bind: (el, binding) => {
            let op = el
            // 设置不拖拽就直接返回
            if (binding.value && (binding.value.isDrag.toString() === 'false')) {
                return
            }
            setCursor(op,'move')
            el.onmousedown = (e) => {
                if (!isTitleDom(e,op)) return
                let offsetWidth = document.body.offsetWidth
                let offsetHeight = document.body.offsetHeight
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
                        top = setMaxOrMin(top,0,'min')
                        left = setMaxOrMin(left,0,'min')
                        top = setMaxOrMin(top,maxBottom,'max')
                        left = setMaxOrMin(left,maxLeft,'max')
                        op.style.left = left + 'px'
                        op.style.top = top + 'px'
                        op.style.setProperty('right','initial');
                        op.style.setProperty('bottom','initial');
                        //将移动后的top和left回调出去
                        if (isFunction(binding.value)) {
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

