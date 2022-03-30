import { createApp } from 'vue'
import router from './router/is-mobile' //判断访问设备并引入对应路由
import App from './App.vue'
import 'virtual:windi.css'
import 'element-plus/dist/index.css'
// @ts-ignore
//import BeUI from '../public/be-ui/be-ui.es.js'
import '../public/be-ui/style.css'
import { i18n } from './utils/i18n'
import store from './store/store'
import { SvgDom } from './utils/create-svg'
/**
 * 初始化图标，生成svgDom
 */
const initIcon = (): void => {
  new SvgDom()
}
initIcon()
const app = createApp(App)
//app.use(BeUI)
app.use(router)
app.use(store)
app.use(i18n)
app.mount('#app')
