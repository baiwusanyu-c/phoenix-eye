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
    width: 100%;
    display: flex;
    background-color: $mainColor7;
    align-items: center;
    height: 60px;
    .copy-rights{
        flex: 1;
        display: flex;
        line-height: 60px;
        justify-content: center;
        font-size: 14px;
        font-family: AlibabaPuHuiTi-Regular, AlibabaPuHuiTi sans-serif;
        font-weight: 400;
        color: $textColor12;
    }
    .contact{
        flex: 1;
        display: flex;
        justify-content: center;
        .contact-logo{
            align-items: center;
            display: flex;
            font-size: 14px;
            font-family: AlibabaPuHuiTi-Regular, AlibabaPuHuiTi sans-serif;
            font-weight: 400;
            color: $textColor12;
        }
    }
}
</style>