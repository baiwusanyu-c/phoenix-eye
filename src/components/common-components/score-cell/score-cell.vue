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
        <span class="score">{{ Number(scoreInner) < 0 ? nanVal : scoreInner }}</span>
      </template>
    </be-progress>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, ref, watch } from 'vue'
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
      nanVal: {
        type: String,
        default: 'N/A',
      },
    },
    setup(props) {
      const computedPropsScore = computed(() => {
        return Number(props.score)
      })

      const scoreInner = ref<number>(computedPropsScore.value)
      const hiddenPath = ref<string>('')
      const color = ref<string>('')
      const setScoreColor = (): void => {
        if (Number(computedPropsScore.value) >= 90) {
          color.value = '#0ED9AC'
        }
        if (Number(computedPropsScore.value) < 90 && Number(computedPropsScore.value) > 60) {
          color.value = '#F4CC29'
        }
        if (Number(computedPropsScore.value) <= 60) {
          color.value = '#F32F2F'
        }

        if (Number(computedPropsScore.value) <= 0) {
          hiddenPath.value = 'none'
        }
      }
      watch(
        () => computedPropsScore.value,
        nVal => {
          scoreInner.value = nVal
          setScoreColor()
        },
        { immediate: true }
      )
      setScoreColor()

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
      width: 32px !important;
      height: 32px !important;
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
