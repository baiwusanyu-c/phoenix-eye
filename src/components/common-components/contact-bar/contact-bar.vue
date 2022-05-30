/* * @contact-bar.vue * @deprecated * @author czh * @update (czh 2022/5/30) */
<template>
  <div class="contact-bar">
    <be-icon icon="iconTelegramEagleG" width="78" height="78"></be-icon>
    <be-icon icon="iconEmailEagle" width="78" height="78"></be-icon>
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
    .be-icon {
      use {
        width: 28px;
        height: 28px;
      }
      /* background-color: $mainColor3;*/
    }
  }
</style>
