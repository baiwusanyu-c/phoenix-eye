/*
* scroll-direactives.js
* @deprecated 滚动加载更多指令
* @author czh
* @create (czh 2021/4/14)
* @update (czh 2021/4/16)
*/
let isload = true;
const scrollDirectives = {
    scroll:{
        bind(el, binding) {
             // 判断是否是select组建中的加载更多，用于获取实际滚动元素
            var p = 0;
            var t = 0;
            var down = true;
            let selectWrap = null
            if(binding.arg === 'table'){
                 selectWrap = el.querySelector('.el-table__body-wrapper');
            }else if(binding.arg === 'selects') {
                // 增加 select组建 下拉内容 加载更多
                 selectWrap = el.querySelector('.el-select-dropdown .el-select-dropdown__wrap');
            }else{
                 selectWrap = el;
            }
            selectWrap.addEventListener("scroll", () => {
                p = selectWrap.scrollTop;
                // if ( t < p){down=true}else{down=false}
                if (t < p) {
                    down = true;
                } else {
                    down = false;
                }
                t = p;
                /* 判断是否到底 
                    如果sign = 0；则在150%下无法加载更多且pageNum =2的情况会出现两次pageNum的数据错误，
                    如果sign = 1，则滚动加载更多会导致接口调用两次 
                    在150%下，sign大约为0.66，故sign选取0.7，以用来解决上述两种情况
                */
                const sign = 0.7;
                const scrollDistance = selectWrap.scrollHeight - selectWrap.scrollTop - selectWrap.clientHeight
                if (scrollDistance <= sign && down && isload) {
                    isload = false;
                    binding.value().then(() => {
                        isload = true;
                    })
                }
            });
        }
    }
}
export default scrollDirectives
