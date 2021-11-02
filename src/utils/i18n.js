/*
 * @Author: yinian430 
 * @Date: 2020-07-06 18:36:39 
 * @Last Modified by: yinian430
 * @Last Modified time: 2020-07-17 18:58:15
 */
import Vue from 'vue'
import VueI18n from 'vue-i18n'
import ElementLocale from 'element-ui/lib/locale'
Vue.use(VueI18n)
const i18n = new VueI18n({
    locale: 'zh_CN',
    messages: {
        'zh_CN': require('./lang/zh'),
        'en_US': require('./lang/en'),
    },
})
ElementLocale.i18n((key, value) => i18n.t(key, value))
export default i18n;