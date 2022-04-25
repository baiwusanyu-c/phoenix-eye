/* * @empty-data.vue * @deprecated * @author czh * @update (czh 2022/4/2) */
<template>
  <div class="empty-data">
    <img class="img" src="@/assets/image/pc/empty-data.png" alt="" />
    <p style="line-height: 25px">{{ $t(content) }}</p>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  export default defineComponent({
    name: 'EmptyData',
    props: {
      content: {
        type: String,
        default: 'lang.emptyData',
      },
    },
  })
</script>
