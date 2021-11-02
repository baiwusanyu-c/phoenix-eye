/*
* @risk-warning-main.vue
* @deprecated 风险警告页面框架
* @author czh
* @update (czh 2021/11/1)
*/
<template>
  <div class="risk-warning-main">
    <router-view>
    </router-view>
  </div>
</template>

<script>
export default {
  name: "RiskWarningMain",
  data() {
    return {}
  },
  mounted() {
  },
  methods: {},
}
</script>

<style scoped lang="scss">
.risk-warning-main{
    height: 100%;
    width: 100%;
}
</style>