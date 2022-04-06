/*
 * @common-func.ts
 * @deprecated
 * @author czh
 * @update (czh 2021/12/24)
 */
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { getCodeImg } from '../../api/login'
// @ts-ignore
import { BeMessage, BeMsg } from '../../../public/be-ui/be-ui.es.js'
import { isNumber, isString } from '../common'
import type { Ref } from '@vue/reactivity'
import type { RouteLocationNormalizedLoaded, Router } from 'vue-router'

export default () => {
  /**
   * 跳转方法
   * @param path 路由地址
   */
  const router: Router = useRouter()
  const route: RouteLocationNormalizedLoaded = useRoute()
  const routerPush = (path: string, query?: any): void => {
    router.push({ path, query })
  }
  /**
   * 获取登录验证码
   */
  const codeUrl = ref<string>('')
  const uuid = ref<string>('')
  const getCode = (): void => {
    getCodeImg().then((res: any) => {
      uuid.value = res.uuid
      codeUrl.value = `data:image/gif;base64,${res.img}`
    })
  }
  const message = (type: string, info: string, className?: string): void => {
    BeMessage.service({
      customClass: className,
      titles: info,
      msgType: type,
      duration: 2500,
      offsetTop: 80,
      close: true,
    })
  }
  /**
   * 開啓定時器，進行數字滾動
   * @param initVal
   * @param max
   * @param step
   */
  const startTimer = (initVal: Ref, max: number, step: number): void => {
    const timer = setInterval(() => {
      initVal.value = initVal.value + step
      if (initVal.value >= max) {
        initVal.value = max
        clearInterval(timer)
      }
    }, 200)
  }
  const { t } = useI18n()
  const isEmpty = computed(() => {
    return function (val: string | number, emptyStr: string) {
      if (isNumber(val) && (val || val === 0)) {
        return val
      }
      if (isString(val) && val) {
        return val
      }
      return emptyStr || t('lang.emptyData')
    }
  })
  const msgBox = (title: string, content: string, className: string): void => {
    BeMsg.service({
      titles: title,
      customClass: className,
      bodyRender: () => {
        return <p>{content}</p>
      },
      footerRender() {
        return <div></div>
      },
      iconPreRender() {
        return <div></div>
      },
    })
  }
  return {
    msgBox,
    isEmpty,
    startTimer,
    uuid,
    message,
    codeUrl,
    getCode,
    routerPush,
    router,
    route,
  }
}
