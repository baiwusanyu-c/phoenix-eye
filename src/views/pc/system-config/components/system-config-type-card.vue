/*
* @system-config-type-card.vue
* @deprecated 风险类型配置卡片
* @author czh
* @update (czh 2021/11/2)
*/
<template>
    <div class="system-config-type-card">
        <div v-if="type === 'edit'"  class="card-title">
            <h3>
                {{title}}
            </h3>
            <div style="min-width: 68px">
                <be-svg-icon @click = 'emitFunc("edit")' style="cursor: pointer" icon-class="-renwuguanli-xiugai" disabled-tool-tip></be-svg-icon>
                <be-svg-icon @click = 'emitFunc("delete")' style="cursor: pointer" icon-class="-renwuguanli-shanchu" disabled-tool-tip></be-svg-icon>
            </div>
        </div>
        <div v-if="type === 'edit'" class="card-edit">
            <p>{{ $t('el.systemConfig.features') }}：</p>
            <div>
                <el-tag v-for="(item) in features" :key="item.code">{{ item.label }}</el-tag>
            </div>
        </div>
        <!--    新增时显示   -->
        <div v-if="type === 'add'" class="card-add">
            <div class="card-add-body" @click = 'emitFunc("add")'>
                <img src="@/assets/image/pc/add-type-icon.png" alt=""/>
                <p>{{ $t('el.systemConfig.addType') }}</p>
            </div>
        </div>
    </div>
</template>

<script>
import BeSvgIcon from "../../../../components/common-components/svg-icon/be-svg-icon";
export default {
    name: "system-config-type-card",
    components: {BeSvgIcon},
    data() {
        return {}
    },
    props: {
        type: {
            type: String,
            default: 'add'
        },
        features:{
            type: Array,
            default: () => []
        },
        title:{
          type:String,
        }
    },
    methods: {
        /**
         * 触发事件方法
         * @param {String} evtName - 事件名称
         */
        emitFunc(evtName){
            this.$emit(evtName)
        }
    },
}
</script>

<style  lang="scss">
.system-config-type-card{
  display: inline-block;
  float: left;
  width: 398px;
  height: 310px;
  margin: 6px 8px;
  background-color: $mainColor7;
  box-shadow: 0 1px 4px 0 $mainColor8;

  .card-title{
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    padding: 16px 20px;
    line-height: 20px;
    color: white;
    background: linear-gradient(270deg, #074E8F 0%, #0468C2 100%);
    border-radius: 4px 4px 0 0;

    .svg-icon{
      margin: 0 5px;
    }
  }

  .card-edit{
    box-sizing: border-box;
    padding: 20px;

    p{
      margin-bottom: 15px;
      color: $textColor4;
    }

    .el-tag{
      height: 23px;
      margin-top: 5px;
      margin-right: 10px;
      line-height: 23px;
    }
  }

  .card-add{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background-image: url("../../../../assets/image/pc/type-add.png");
    background-repeat: no-repeat;
    background-size: cover;

    .card-add-body{
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      cursor: pointer;

      p{
        color: $mainColor3;
      }
    }
  }
}

</style>

<!--1080p的145% - 150%放大-->
<style scoped lang="scss">
@media screen and (min-width: 1280px) and (max-height: 638px) and (max-width: 1326px) {

  .system-config-type-card{
    width: 336px;
    height: 280px;

    .card-title{
      padding: 10px 15px;
    }

    .card-edit{
      padding: 5px 10px;

      .card-edit-addr{
        height: 168px;
        margin: 5px 0;
      }

      p{
        margin-bottom: 5px;
      }
    }
  }
}
</style>