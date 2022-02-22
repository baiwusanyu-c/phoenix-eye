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
                <img role="button" src="../assets/image/pc/twitter.png">
                <img role="button" src="../assets/image/pc/telegram.png">
                <img role="button" src="../assets/image/pc/email-logo.png">
                <img role="button" src="../assets/image/pc/wechat.png">
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "tsgz-footer",
    data() {
        return {}
    },
    mounted() {
    },
    methods: {},
}
</script>

<style scoped lang="scss">
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
    font-family: AlibabaPuHuiTi-Regular, AlibabaPuHuiTi sans-serif;
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
      font-family: AlibabaPuHuiTi-Regular, AlibabaPuHuiTi sans-serif;
      font-size: 14px;
      font-weight: 400;
      color: $textColor12;
    }
  }
}
</style>