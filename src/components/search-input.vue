/* * @search-input.vue * @deprecated * @author czh * @update (czh 2022/4/20) */
<template>
  <div class="search-input--container">
    <el-input v-model="searchParams" :placeholder="placeholder" style="margin-right: 16px" />
    <be-button
      type="success"
      custom-class="eagle-btn search-btn"
      size="large"
      round="4"
      @click="handleSearch">
      <span>{{ searchBtnName }}</span>
    </be-button>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue'
  // @ts-ignore
  import { BeButton } from '@eagle-eye/be-ui'
  export default defineComponent({
    name: 'SearchInput',
    components: { BeButton },
    props: {
      placeholder: {
        type: String,
        default: '',
      },
      searchBtnName: {
        type: String,
        default: 'SEARCH',
      },
    },
    emits: ['search'],
    setup(props, ctx) {
      const searchParams = ref<string>('')
      const handleSearch = (): void => {
        ctx.emit('search', searchParams.value)
      }
      return {
        searchParams,
        handleSearch,
      }
    },
  })
</script>

<style lang="scss">
  .search-input--container {
    display: flex;
    input::-webkit-input-placeholder {
      /* WebKit browsers */
      font-family: 'Barlow', sans-serif;
      font-size: 18px;
      color: $mainColor14;
    }
    .el-input__inner {
      height: 52px;
      font-family: 'Barlow', sans-serif;
      font-size: 18px;
      line-height: 52px;
      color: $textColor4;
    }
  }
</style>
