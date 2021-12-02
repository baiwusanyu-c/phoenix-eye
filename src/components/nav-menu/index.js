/*
* @index.js
* @deprecated 
* @author czh
* @update (czh 2021/7/19)
*/
import navMenuComponents from './tsgz-nav-menu.vue';

const HeaderCom = {
    install:function(Vue) {
        Vue.component('navMenu', navMenuComponents)
    }
}

export default HeaderCom;