/*
 * @common-func.ts
 * @deprecated
 * @author czh
 * @update (czh 2021/12/24)
 */
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { BeMsg } from '@eagle-eye/be-ui'
import { getCodeImg } from '../../api/login'
// @ts-ignore
import { isNumber, isString, message, openWindow } from '../common'
import { webURL } from '../../enums/link'
import type { Ref } from 'vue'
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
  /**
   * 数据缺省文字处理
   */
  const isEmpty = computed(() => {
    return function (val: string | number, emptyStr: string) {
      if (isNumber(val) && (val || val === 0) && val >= 0) {
        return val
      }
      if (isString(val) && val) {
        return val
      }
      return emptyStr || t('lang.emptyData')
    }
  })
  /**
   * 消息提示弹窗
   * @param title
   * @param content
   * @param className
   */
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
  /**
   * 跳轉到第三方頁面
   */
  const openWeb = (params: string, type: string, platform: string): void => {
    debugger
    if (!params || params === 'eth' || params === 'bnb' || params === 'ht' || params === 'matic')
      return
    const mainUrl: string = (webURL as any)[`${platform}_${type}`] as string
    const url = `${mainUrl}${params}`
    openWindow(url)
  }
  return {
    openWeb,
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
