/* * @operational-statistics.vue * @deprecated * @author czh * @update (czh 2022/5/7) */
<template>
  <div class="operational-statistics-main eagle-page">
    <div class="operational-statistics-search"></div>
    <div class="operational-statistics-list eagle-table"></div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'OperationalStatistics',
    setup() {
      return {}
    },
  })
</script>

<style lang="scss">
  .operational-statistics-main {
    min-height: calc(100% - 100px);

    .operational-statistics-search {
      @include common-container(40px);
    }

    .operational-statistics-list {
      width: 70%;
      padding: 20px;
      margin: 0 auto;
      background-color: $mainColor7;
    }
  }
  /* 150% 适配 */
  @media screen and (min-width: 1280px) and (max-width: 1326px) {
    .operational-statistics-main .operational-statistics-list,
    .operational-statistics-main .operational-statistics-search {
      width: 92%;
    }
  }

  /* 125% 适配 */
  @media screen and (min-width: 1328px) and (max-width: 1538px) {
    .operational-statistics-main .operational-statistics-list,
    .operational-statistics-main .operational-statistics-search {
      width: 80%;
    }
  }
</style>
