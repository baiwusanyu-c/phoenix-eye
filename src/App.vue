<template>
  <div ref="app" :class="{ noM: isMobile == null, 'theme--dark': theme === 'dark' }">
    <router-view></router-view>
    <!--下线弹窗-->
    <MsgDialog
      :is-show="delTip"
      :is-show-cancel="false"
      title="您的帐号在其他地方登录，您已被迫下线，如果不是本人操作，请及时修改密码"
      @confirm="() => (delTip = false)"
      @close="() => (delTip = false)">
    </MsgDialog>
    <!--****************** 浏览器版本提示  **********************-->
    <div id="browser_msg_dialog">
      <be-dialog
        ref="tipsDialog"
        titles="温馨提示"
        :is-show="showBrowserTip"
        :is-open-modal="true"
        :is-drag="false"
        layout="center"
        custom-class="browser-msg-dialog"
        @close="showBrowserTip = false">
        <div class="browser-msg-dialog-body">
          <div class="browser-msg-dialog__left">
            <div class="browser-msg-dialog-ul">
              <ul>
                <li v-for="item in tipList" :key="item">
                  {{ item }}
                </li>
              </ul>
            </div>
          </div>
          <div class="browser-msg-dialog__right"></div>
        </div>
        <template #footer>
          <be-button custom-class="egal-btn" type="success" @click="showBrowserTip = false">
            我知道了
          </be-button>
        </template>
      </be-dialog>
    </div>
  </div>
</template>
<script setup lang="tsx">
  import { ref } from 'vue'
  // @ts-ignore
  import { BeButton, BeDialog } from '../public/be-ui/be-ui.es.js'
  import MsgDialog from '../src/components/common-components/msg-dialog/msg-dialog.vue'
  import { browserInfo, getStore, setStore } from './utils/common'
  // 設置是否手機訪問變量
  const ua = navigator.userAgent
  const ipad = ua.match(/(iPad).*OS\s([\d_]+)/)
  const isIphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/)
  const isAndroid = ua.match(/(Android)\s+([\d.]+)/)
  const isMobile = ref<RegExpMatchArray | null>(isIphone || isAndroid)

  // 設置瀏覽器信息
  const showBrowserTip = ref<boolean>(false)
  const tipList = ref<Array<string>>(['为保证更优质的使用体验，', '建议使用谷歌浏览器访问系统。'])
  if (browserInfo().browser !== 'chrome') {
    showBrowserTip.value = true
  }
  // 設置語言
  if (!getStore('language')) {
    setStore('language', 'en_US')
  }

  /**
   * 下线弹窗显示方法
   */
  const delTip = ref<boolean>(false)
  // 主题
  const theme = ref<string>(import.meta.env.VITE_APP_THEME as string)
</script>

<style lang="scss">
  @import 'assets/style/font-style';

  #browser_msg_dialog {
    .browser-msg-dialog {
      top: calc(50% - 220px);
      left: calc(50% - 200px);
      box-sizing: border-box;
      width: 400px;
      height: 240px;
      padding-top: 22px;
      padding-right: 28px;
      padding-left: 40px;
      background-color: white;

      .be-dialog--title {
        .be-dialog--container__head {
          box-sizing: border-box;
          padding: 0;
        }

        span {
          font-size: 16px;
          font-weight: 600;
          color: $mainColor3;
        }
      }

      .browser-msg-dialog-body {
        display: flex;
        justify-content: space-between;
        background-color: transparent;

        .browser-msg-dialog__left {
          .browser-msg-dialog-ul {
            max-width: 320px;
            overflow-y: auto;

            li {
              margin-bottom: 10px;
              font-size: 12px;
              color: #7d8397;
            }
          }
        }

        .browser-msg-dialog__right {
          position: absolute;
          right: 4px;
          bottom: 20px;
          z-index: -1;
          width: 54%;
          height: 70%;
          background-image: url('./assets/image/pc/browser-info.png');
          background-size: 100% 100%;
        }
      }
    }
  }

  .noM {
    min-width: 1280px;
    height: 100%;
  }
</style>

<style scoped lang="scss">
  /* 移动端预留 适配 */
  @media screen and (max-width: 1280px) {
    .noM {
      min-width: 1280px;
    }
  }
  @media screen and (min-width: 1280px) and (max-width: 1326px) {
    .noM {
      min-width: 1280px;
    }
  }
</style>
