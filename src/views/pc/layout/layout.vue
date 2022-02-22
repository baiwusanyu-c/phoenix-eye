<template>
    <div class="layout">
        <!--   上侧菜单     -->
        <tsgz-nav-menu ref="headerCom"></tsgz-nav-menu>
        <div class="main scrollDiy">
            <div class="bg"></div>
            <transition name="fade" mode="out-in">
                <router-view ref="parentRouterRef" :key="key"/>
            </transition>
            <tsgz-footer></tsgz-footer>
        </div>
    </div>
</template>

<script lang="ts">
import TsgzNavMenu from "../../../components/tsgz-nav-menu.vue";
import {computed, defineComponent, onMounted, ref} from "vue";
import composition from "../../../utils/mixin/common-func";
import {BeIcon} from '../../../../public/be-ui/be-ui.es.js'
import TsgzFooter from "../../../components/tsgz-footer.vue";

export default defineComponent({
    name: 'layout',
    components: {TsgzFooter, TsgzNavMenu, BeIcon},
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
<style lang="scss">
    .layout{
        transition: all .3s;
        .main{
            position: relative;
            left: 0;
            top: 0;
            height: calc(100vh - 60px);
            background-color: $mainColor18;
            overflow-y: auto;
            .bg{
                width: 100%;
                height: 400px;
                position: absolute;
                top: 0;
                left: 0;
                background-repeat: round;
                background-image: url("../../../assets/image/pc/bg.png");
            }
        }
    }
</style>

