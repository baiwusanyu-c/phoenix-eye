/*
* @tsgz-footer.vue
* @deprecated
* @author czh
* @update (czh 2022/2/22)
*/
<template>
    <div class="tsgz-footer">
        <div class="copy-rights">
            © 2022 by Beosin. All Rights Reserved.
        </div>
        <div class="contact">
            <div class="contact-logo">
                {{ $t('lang.contact') }}:
                <el-tooltip :content="`email:${webURL['contact_email']}`" placement="top">
                    <be-icon role="button" width="40" height="40" icon="iconEmailEagle"></be-icon>
                </el-tooltip>
                <be-icon @click="openWindow(webURL['contact_twitter'])" role="button" width="40" height="40" icon="iconTwitterEagle"></be-icon>
                <be-icon @click="openWindow(webURL['contact_telegram'])" role="button" width="40" height="40" icon="iconTelegramEagle"></be-icon>
                <be-icon @click="openWindow(webURL['contact_discord'])" role="button" width="40" height="40" icon="iconDiscordEagle"></be-icon>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {BeIcon,BeTooltip} from "../../public/be-ui/be-ui.es";
import {openWindow} from '../utils/common';
import {webURL} from "../enums/link";
export default {
    name: "tsgz-footer",
    components:{BeIcon,BeTooltip},
    setup(){
        return {
            webURL,
            openWindow
        }
    }
}
</script>

<style lang="scss">
.tsgz-footer{
  display: flex;
  align-items: center;
  width: 100%;
  height: 60px;
  background-color: $mainColor7;

  .copy-rights{
    display: flex;
    flex: 1;
    justify-content: center;
    font-family: AlibabaPuHuiTi-Regular, sans-serif;
    font-size: 14px;
    font-weight: 400;
    line-height: 60px;
    color: $textColor12;
  }

  .contact{
    display: flex;
    flex: 1;
    justify-content: center;

    .contact-logo{
      display: flex;
      align-items: center;
      font-family: AlibabaPuHuiTi-Regular, sans-serif;
      font-size: 14px;
      font-weight: 400;
      color: $textColor12;

      .be-icon{
        fill:$textColor12 ;

        &:hover{
          fill:$mainColor11 ;
        }
      }
    }
  }
}
</style>