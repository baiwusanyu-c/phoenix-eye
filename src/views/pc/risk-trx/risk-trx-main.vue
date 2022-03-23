/* * @risk-trx-main.vue * @deprecated 风险警告页面框架 * @author czh * @update (czh 2021/11/1) */
<template>
  <div class="risk-trx-main">
    <router-view> </router-view>
  </div>
</template>

<script>
  export default {
    name: 'RiskTrxMain',
  }
</script>

<style scoped lang="scss">
  .risk-trx-main {
    min-height: 100%;
  }
</style>
