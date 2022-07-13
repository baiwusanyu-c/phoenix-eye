/* * @project-manage-main.vue * @deprecated 项目管理页面框架 * @author czh * @update (czh 2021/11/1)
*/
<template>
  <div class="project-manage-main eagle-page">
    <div class="project-manage--tab">
      <div
        class="project-manage--tabs"
        :class="{ 'project-manage--tabs__active': tabType === 'sys' }"
        @click="handleClick('sys')">
        Project in system
      </div>
      <div
        class="project-manage--tabs"
        :class="{ 'project-manage--tabs__active': tabType === 'usr' }"
        @click="handleClick('usr')">
        Project from user
      </div>
    </div>
    <!--  虽然两个组件逻辑相似，但是还是分开便于维护，组件内的内容已经组件化   -->
    <!--  二者的业务逻辑一样，只是表单字段、调用接口有差别   -->
    <project-manage-sys v-if="tabType === 'sys'" tab-type="sys"> </project-manage-sys>
    <project-manage-usr v-if="tabType === 'usr'" tab-type="sys"> </project-manage-usr>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue'

  import composition from '../../../../utils/mixin/common-func'
  import ProjectManageSys from './project-manage-sys.vue'
  import ProjectManageUsr from './project-manage-usr.vue'

  export default defineComponent({
    name: 'ProjectManageMain',
    components: {
      ProjectManageUsr,
      ProjectManageSys,
    },
    setup() {
      const { isEmpty } = composition()
      const tabType = ref<string>('sys')
      const handleClick = (type: string): void => {
        tabType.value = type
      }
      return {
        tabType,
        isEmpty,
        handleClick,
      }
    },
  })
</script>

<style lang="scss">
  .project-manage-main {
    min-height: calc(100% - 100px);
    .project-manage--tab {
      @include common-container(40px);
      width: 1250px;
      display: flex;
      .project-manage--tabs {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 10px 16px;
        box-sizing: border-box;
        cursor: pointer;
        height: 48px;
        background-color: $textColor7-05;
        color: $textColor3;
        border-radius: 5px;
        border-bottom-right-radius: 0;
        border-bottom-left-radius: 0;
      }
      .project-manage--tabs__active {
        background-color: $mainColor7;
        font-weight: bold;
        cursor: pointer;
      }
    }
    .project-manage-search {
      @include common-container(0);
      background-color: $mainColor7;
      border-radius: 4px;
      padding: 24px 20px 16px 20px;
    }

    .project-manage-list {
      width: 1284px;
      padding: 0 20px 24px 20px;
      margin: 0 auto;
      background-color: $mainColor7;
    }
  }
  /* 移动端预留 适配 */
  @media screen and (max-width: 1280px) {
    .project-manage-main .project-manage-list,
    .project-manage-main .project-manage--tab,
    .project-manage-main .project-manage-search {
      width: 92%;
    }
  }
  /* 150% 适配 */
  @media screen and (min-width: 1280px) and (max-width: 1326px) {
    .project-manage-main .project-manage-list,
    .project-manage-main .project-manage--tab,
    .project-manage-main .project-manage-search {
      width: 92%;
    }
  }
  /*
  !* 125% 适配 *!
  @media screen and (min-width: 1328px) and (max-width: 1538px) {
    .project-manage-main .project-manage-list,
    .project-manage-main .project-manage--tab,
    .project-manage-main .project-manage-search {
      width: 80%;
    }
  }*/
</style>
