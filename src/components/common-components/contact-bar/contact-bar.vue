/* * @contact-bar.vue * @deprecated * @author czh * @update (czh 2022/5/30) */
<template>
  <teleport to="body">
    <div class="contact-bar">
      <div class="icon-body" role="link" @click="openWindow(webURL.contact_telegram)">
        <a :herf="webURL.contact_telegram">
          <be-icon icon="iconTelegramG" width="25" height="25"></be-icon>
        </a>
      </div>
      <div class="icon-body">
        <el-tooltip :content="webURL.contact_email" placement="top">
          <be-icon icon="iconEmailG" width="25" height="25"></be-icon>
        </el-tooltip>
      </div>
      <div class="icon-body" role="link" title="feedback" @click="openWindow(webURL.feedback)">
        <a :herf="webURL.feedback">
          <be-icon icon="iconFeedback" width="25" height="25"></be-icon>
        </a>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { BeIcon } from '@eagle-eye/be-ui'
  import { dragDirective } from '../../../utils/drag-directives'
  // @ts-ignore
  import { webURL } from '../../../enums/link'
  import { openWindow } from '../../../utils/common'
  export default defineComponent({
    name: 'ContactBar',
    directives: { drag: dragDirective },
    components: {
      BeIcon,
    },
    setup() {
      return {
        webURL,
        openWindow,
      }
    },
  })
</script>

<style lang="scss">
  .contact-bar {
    width: 60px;
    height: 180px;
    position: fixed;
    right: 12%;
    top: 65%;
    background-color: $textColor3;
    z-index: 20;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .icon-body {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      width: 100%;
      border-radius: 8px;
      &:hover {
        background-color: $mainColor20;
      }
    }
  }
  /* 移动端预留 适配 */
  @media screen and (max-width: 1280px) {
    .contact-bar {
      right: 10px;
      width: 45px;
      height: 140px;
    }
  }
  @media screen and (min-width: 1280px) and (max-width: 1326px) {
    .contact-bar {
      right: 10px;
      width: 45px;
      height: 140px;
    }
  }
  @media screen and (min-width: 1752px) and (max-width: 1850px) {
    .contact-bar {
      right: 10%;
    }
  }
  @media screen and (min-width: 1326px) and (max-width: 1750px) {
    .contact-bar {
      right: 1%;
    }
  }
  /* @media screen and (min-width: 1326px) and (max-width: 1660px) {
      .contact-bar {
          right: 4%;
      }
  }*/
  /*
  !* 125% 适配 *!
  @media screen and (min-width: 1328px) and (max-width: 1538px) {
    .contact-bar {
      right: 6%;
    }
  }
  !* 110% 适配 *!
  @media screen and (min-width: 1540px) and (max-width: 1750px) {
    .contact-bar {
      right: 10%;
    }
  }*/
</style>
