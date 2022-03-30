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
  </div>
</template>

<script lang="ts">
  import TsgzNavMenu from '../../../components/tsgz-nav-menu.vue'
  import { computed, defineComponent } from 'vue'
  import composition from '../../../utils/mixin/common-func'
  import TsgzFooter from '../../../components/tsgz-footer.vue'
  import { getRouterData } from '../../../router/router-pc'

  export default defineComponent({
    name: 'LayoutPage',
    components: { TsgzFooter, TsgzNavMenu },
    setup() {
      const { route, router } = composition()
      const key = computed(() => {
        return route.path
      })
      // 每次载入页面都加载路由
      getRouterData(router)
      return {
        key,
      }
    },
  })
</script>
<style lang="scss">
  .layout {
    transition: all .3s;

    .main {
      position: relative;
      top: 0;
      left: 0;
      height: calc(100vh - 60px);
      overflow-y: auto;
      background-color: $mainColor18;

      .bg {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 400px;
        background-image: url('../../../assets/image/pc/bg.png');
        background-repeat: round;
      }
    }
  }
</style>
