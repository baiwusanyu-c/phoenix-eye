/* * @score-cell.vue * @deprecated * @author czh * @update (czh 2022/5/18) */
<template>
  <div class="score-cell">
    <be-progress
      type="circle"
      :percent="scoreInner"
      :color="color"
      status="normal"
      trail-color="#E0E0E0"
      stroke-linecap="square"
      stroke-width="20">
      <template #center>
        <span class="score">{{ scoreInner === 0 ? 'N/A' : score }}</span>
      </template>
    </be-progress>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue'
  // @ts-ignore
  import { BeProgress } from '../../../../public/be-ui/be-ui.es'

  export default defineComponent({
    name: 'ScoreCell',
    components: {
      BeProgress,
    },
    props: {
      score: {
        type: [Number, String],
        default: 0,
      },
      level: {
        type: String,
        default: '3',
      },
    },
    setup(props) {
      const color = ref<string>('')
      if (props.level === '1') {
        color.value = '#0ED9AC'
      }
      if (props.level === '2') {
        color.value = '#F4CC29'
      }
      if (props.level === '3') {
        color.value = '#F32F2F'
      }
      const hiddenPath = ref<string>('')
      if (props.score === 0) {
        hiddenPath.value = 'none'
      }
      const scoreInner = ref<number>(Number(props.score))
      return {
        scoreInner,
        color,
        hiddenPath,
      }
    },
  })
</script>

<style lang="scss">
  .score-cell {
    .be-progress-body {
      width: 40px !important;
      height: 40px !important;
    }
    .be-progress-circle--text {
      width: 100%;
    }
    .be-progress-circle__path {
      display: v-bind(hiddenPath);
    }
    .score {
      font-weight: bold;
      font-size: 12px;
      font-family: BarlowSemi-B sans-serif;
    }
  }
</style>
