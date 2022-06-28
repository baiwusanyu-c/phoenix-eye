<template>
  <div class="layout">
    <!--   上侧菜单     -->
    <tsgz-nav-menu ref="headerCom"></tsgz-nav-menu>
    <div class="main scrollDiy">
      <div class="bg"></div>
      <transition name="fade" mode="out-in">
        <router-view ref="parentRouterRef" :key="key" />
      </transition>
      <tsgz-footer></tsgz-footer>
    </div>
    <disclaimer-footer v-if="$route.path === '/ProjectSearch' && showDisclaimer" @close="close">
    </disclaimer-footer>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, ref } from 'vue'
  import TsgzNavMenu from '../../../components/tsgz-nav-menu.vue'
  import composition from '../../../utils/mixin/common-func'
  import TsgzFooter from '../../../components/tsgz-footer.vue'
  import DisclaimerFooter from '../../../components/disclaimer-footer.vue'
  export default defineComponent({
    name: 'LayoutPage',
    components: { DisclaimerFooter, TsgzFooter, TsgzNavMenu },
    setup() {
      const { route } = composition()
      const key = computed(() => {
        return route.path
      })
      const showDisclaimer = ref<boolean>(true)
      const close = (): void => {
        showDisclaimer.value = false
      }
      return {
        close,
        showDisclaimer,
        key,
      }
    },
  })
</script>
<style lang="scss">
  .layout {
    transition: all 0.3s;

    .main {
      position: relative;
      top: 0;
      left: 0;
      /*height: calc(100vh - 68px);*/
      height: calc(937px - 68px);
      overflow-y: auto;
      background-color: $mainColor18;

      .bg {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 800px;
        background-image: url('../../../assets/image/pc/bg.png');
        background-repeat: round;
      }
    }
  }
  /* 移动端预留 适配 */
  @media screen and (max-width: 1280px) {
    .layout {
      .main {
        height: calc(100vh - 68px);
      }
    }
  }
  /* 150% 适配 */
  @media screen and (min-width: 1280px) and (max-width: 1326px) {
    .layout {
      .main {
        height: calc(100vh - 68px);
      }
    }
  }
</style>
