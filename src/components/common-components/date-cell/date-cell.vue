/* * @date-cell.vue * @deprecated * @author czh * @update (czh 2022/4/20) */
<template>
  <be-tooltip :content="contentCompute(time)" custom-class="table-tooltip">
    <span style="color: #888">
      <p style="font-family: BarlowSemi-B sans-serif">
        {{ formatDate(createDate(time)).split(' ')[0] }}
        <span v-if="!isBreak"> {{ formatDate(createDate(time)).split(' ')[1] }}</span>
      </p>
      <p v-if="isBreak" style="font-family: BarlowSemi-B sans-serif">
        {{ formatDate(createDate(time)).split(' ')[1] }}
      </p>
    </span>
  </be-tooltip>
</template>

<script lang="ts">
  import { computed, defineComponent } from 'vue'
  // @ts-ignore
  import { BeTooltip } from '../../../../public/be-ui/be-ui.es.js'
  import { beijing2utc, createDate, formatDate, openWindow } from '../../../utils/common'

  export default defineComponent({
    name: 'DateCell',
    components: { BeTooltip },
    props: {
      time: {
        type: String,
        default: '2077-04-19T06:06:40.000+0000',
      },
      isBreak: {
        type: Boolean,
        default: true,
      },
    },
    setup() {
      const contentCompute = computed(() => {
        return (time: string) => {
          return `${formatDate(createDate(time).toString())}  UTC：${beijing2utc(time)}`
        }
      })
      return {
        contentCompute,
        beijing2utc,
        createDate,
        formatDate,
        openWindow,
      }
    },
  })
</script>

<style scoped></style>
