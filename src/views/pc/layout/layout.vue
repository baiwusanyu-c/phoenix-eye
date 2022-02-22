<template>
    <div class="layout" id="app_layout">
        <div class="layout-center">
            <!--   上侧菜单     -->
            <tsgz-nav-menu ref="headerCom"></tsgz-nav-menu>
            <!--      主体内容      -->
            <div class="scrollDiy"
                 :class="{'viewArea': true}">
                <transition name="fade" mode="out-in">
                    <router-view ref="parentRouterRef" :key="key"/>
                </transition>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import TsgzNavMenu from "../../../components/tsgz-nav-menu.vue";
import {computed, defineComponent, onMounted, ref} from "vue";
import composition from "../../../utils/mixin/common-func";
import {BeIcon} from '../../../../public/be-ui/be-ui.es.js'
export default defineComponent({
    name: 'layout',
    components: {TsgzNavMenu,BeIcon},
    setup(props, ctx) {
        const {route} = composition(props, ctx)
        const key = computed(() => {
            return route.path
        })

        return {
            key
        }
    }
})

</script>

<style scoped lang='scss'>
.layout {
  display: flex;
  flex-direction: row;
  height: 100%;
  background: #F2F4F5;

  .layout-center {
    width: 100%;
    transition: all .3s
  }

  .tsgz-menu-info {
    display: flex;
    align-items: center;
    width: 100%;
    height: 60px;
    background: #FFF;
    filter: drop-shadow(0 3px 6px rgba(0, 0, 0, .16));

    .mission-select {
      box-sizing: border-box;
      display: flex;
      flex: 3;
      align-items: center;
      padding: 0 24px;

      .misison-select-body {
        display: flex;
        align-items: center;
        margin-right: 15px;
      }

      h3 {
        font-family: PingFangSC-Medium, PingFang SC, sans-serif;
        font-size: 20px;
        color: #206596;
      }

      .iconTitle {
        color: #777;
      }
    }

    .tsgz-slogan {
      display: flex;
      flex: 4;
      flex-direction: row;
      align-items: center;
      justify-content: flex-end;
      height: 100%;
      margin-right: 30px;
      background-repeat: no-repeat;
      background-position: right;
      background-size: 100% 100%;

      .tsgz-user {
        width: 28px;
        height: 28px;
        line-height: 28px;
        color: $textColor6;
        text-align: center;
        background-color: $mainColor3;
        border-radius: 30px;
      }

      h3 {
        margin: 0 10px;
        font-family: PingFangSC-Semibold, PingFang SC, sans-serif;
        font-size: 20px;
        font-weight: 500;
        color: $textColor4;
      }
    }
  }

  .tsgz-menu-un-info {
    height: 60px;
    background: transparent;
  }

  .tsgz-menu-un-info-investigation {
    height: 60px;
    background: transparent;
  }

  .viewArea {
    box-sizing: border-box;
    width: 100%;
    // height: calc(100vh - 112px);
    height: calc(100vh - 60px);
    padding: 16px;
    overflow-y: auto;
    background: #F2F4F5;
    transition: all .5s;
  }

  .fold {
    width: 100%;
  }
}
</style>
<style scoped lang="scss">
@media screen and (max-width: 1366px) and (max-height: 768px) {

  #app_layout {

    .tsgz-menu-info {
      height: 45px;

      .tsgz-slogan h3 {
        font-size: 14px;
      }

      .mission-select {

        h3 {
          font-size: 14px;
        }
        flex: 2;
        padding: 5px;

        .misison-select-body {
          height: 30px;
        }
      }
    }

    .viewArea {
      height: calc(91vh);
    }

  }
}
</style>

<!--1080p的105% - 125%放大-->
<style scoped lang="scss">
@media screen and (min-width: 1536px) and (max-height: 880px) and (max-width: 1830px) {

  .layout {

    .layout-center {
      width: 100%;
    }
  }
}
</style>
<!--1080p的130% - 140%放大-->
<style scoped lang="scss">
@media screen and (min-width: 1326px) and (max-height: 710px) and (max-width: 1478px) {

  .layout {

    .layout-center {
      width: 100%;
    }
  }
}
</style>
<!--1080p的145% - 150%放大-->
<style scoped lang="scss">
@media screen and (min-width: 1280px) and (max-height: 638px) and (max-width: 1326px) {

  .layout {

    .layout-center {
      width: 100%;
    }
  }
}
</style>