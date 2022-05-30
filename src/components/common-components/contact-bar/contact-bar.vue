/* * @contact-bar.vue * @deprecated * @author czh * @update (czh 2022/5/30) */
<template>
  <div class="contact-bar">
    <div class="icon-body">
      <be-icon icon="iconTelegramG" width="25" height="25"></be-icon>
    </div>
    <div class="icon-body">
      <be-icon icon="iconEmailG" width="25" height="25"></be-icon>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  // @ts-ignore
  import { BeIcon } from '../../../../public/be-ui/be-ui.es'

  export default defineComponent({
    name: 'ContactBar',
    components: {
      BeIcon,
    },
    setup() {
      return {}
    },
  })
</script>

<style lang="scss">
  .contact-bar {
    width: 60px;
    height: 120px;
    position: fixed;
    right: 13.5%;
    top: 50%;
    background-color: $mainColor20;
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
    }
  }
  @media screen and (min-width: 1280px) and (max-width: 1326px) {
    .contact-bar {
      right: 10px;
      width: 45px;
      height: 100px;
    }
  }

  /* 125% 适配 */
  @media screen and (min-width: 1328px) and (max-width: 1538px) {
    .contact-bar {
      right: 6%;
    }
  }
  /* 110% 适配 */
  @media screen and (min-width: 1540px) and (max-width: 1750px) {
    .contact-bar {
      right: 10%;
    }
  }
</style>
