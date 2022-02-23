/*
* @system-config-main.vue
* @deprecated 系统配置页面
* @author czh
* @update (czh 2021/11/1)
*/
<template>
  <div class="system-config-main">
      <div class="system-config-tab">
          <el-button-group>
              <el-button :class="`${active === 1 ? 'primary' : 'default'}`" type="primary" @click="switchRender(1)" style="width: auto;padding-right: 5px;padding-left: 5px">
                  {{$t('lang.subNav.navName4s1')}}
              </el-button>
              <el-button :class="`${active === 2 ? 'primary' : 'default'}`" type="primary" @click="switchRender(2)" style="width: auto;padding-right: 5px;padding-left: 5px">
                  {{$t('lang.subNav.navName4s2')}}
              </el-button>
          </el-button-group>
      </div>
      <div class="system-config-body scrollDiy">
        <!--    系统类型配置      -->
        <system-config-type v-if="active === 1"></system-config-type>
          <!--  系统评分配置      -->
        <system-config-score v-if="active === 2"></system-config-score>
      </div>
  </div>
</template>

<script lang="ts">
import SystemConfigScore from "./system-config-score.vue";
import SystemConfigType from "./system-config-type.vue";
import {defineComponent, ref} from "vue";
//测试新增风险类型弹窗
export default defineComponent({
    name: "SystemConfigMain",
    components: {SystemConfigType, SystemConfigScore},
    setup(){
        const active = ref<number>(1)
        /**
         * 切换隐藏显示对应模块
         * @param {Number} index - 模块显示标识
         */
        const switchRender = (index:number):void=>{
            active.value = index
        }
        return {
            active,
            switchRender
        }
    }
})

</script>

<style scoped lang="scss">
.system-config-main{
  width: 100%;
  height: 100%;

  .system-config-tab{
    display: flex;
    justify-content: center;
    width: 100%;
  }

  .system-config-body{
    height: calc(100% - 30px);
    margin-top: 12px;
    overflow-y: auto;
  }
}
</style>