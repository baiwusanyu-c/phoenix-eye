import { createApp } from 'vue'
import router from './router/is-mobile' //判断访问设备并引入对应路由
import App from './App.vue'
import 'virtual:windi.css'
// @ts-ignore
//import BeUI from '../public/be-ui/be-ui.es.js'
import '../public/be-ui/style.css'
import {i18n} from "./utils/i18n";
import '@/components/common-components/svg-icon/icons/iconfont/iconfont.js'
import '../node_modules/animate.css/animate.css'
import store from "./store/store";
const app = createApp(App)
//app.use(BeUI)
app.use(router)
app.use(store)
app.use(i18n)
app.mount('#app')