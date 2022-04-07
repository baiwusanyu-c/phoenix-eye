import { createApp } from 'vue'
import {loadSvg}  from 'vite-plugin-svg-transform-script'
import  svgDict  from './utils/svg-dict'
import router from './router/is-mobile' //判断访问设备并引入对应路由
import App from './App.vue'
import 'virtual:windi.css'
import '../public/be-ui/style.css'
import { i18n } from './utils/i18n'
import store from './store/store'
/**
 * 初始化图标，生成svgDom
 */
new loadSvg(svgDict)
const app = createApp(App)
app.use(router)
app.use(store)
app.use(i18n)
app.mount('#app')
