/* * @website-form.vue * @deprecated * @author czh * @update (czh 2022/5/13) */
<template>
  <h2 class="create--label">
    2.{{ $t('lang.createProject.label2') }}
    <be-button
      custom-class="retrieval-btn"
      prev-icon="iconRetrievalEagle"
      title="Click to match the audit according to the contract"
      @click="handleMatch">
      {{ $t('lang.searchBtn') }}
    </be-button>
  </h2>
  <!--        聯係地址 - WebSite    -->
  <el-form-item :label="'WebSite:'">
    <el-input
      v-model="modelValueInner.website"
      class="projectKeyWordsInput"
      @change="handleChange"></el-input>
  </el-form-item>
  <!--        聯係地址 - GitHub    -->
  <el-form-item :label="'GitHub:'">
    <el-input
      v-model="modelValueInner.github"
      class="projectKeyWordsInput"
      @change="handleChange"></el-input>
  </el-form-item>
  <!--        聯係地址 - Twitter    -->
  <el-form-item :label="'Twitter:'">
    <el-input
      v-model="modelValueInner.twitter"
      class="projectKeyWordsInput"
      @change="handleChange"></el-input>
  </el-form-item>
  <!--        聯係地址 - Telegram    -->
  <el-form-item :label="'Telegram:'">
    <el-input
      v-model="modelValueInner.telegram"
      class="projectKeyWordsInput"
      @change="handleChange"></el-input>
  </el-form-item>
</template>

<script lang="ts">
  import { defineComponent, ref, watch } from 'vue'
  // @ts-ignore
  import { BeButton } from '../../../../../../public/be-ui/be-ui.es.js'
  import type { PropType } from 'vue'
  import type { IWebsiteForm } from '../../../../../utils/types'

  export default defineComponent({
    name: 'WebsiteForm',
    components: { BeButton },
    props: {
      modelValue: {
        type: Object as PropType<IWebsiteForm>,
      },
    },
    emits: ['update:modelValue', 'match'],
    setup(props, ctx) {
      const modelValueInner = ref<IWebsiteForm>({})
      const handleChange = (): void => {
        ctx.emit('update:modelValue', modelValueInner.value)
      }
      const handleMatch = (): void => {
        ctx.emit('match')
      }
      watch(
        () => props.modelValue,
        nVal => {
          props.modelValue && (modelValueInner.value = props.modelValue)
        },
        { deep: true, immediate: true }
      )
      return {
        handleMatch,
        modelValueInner,
        handleChange,
      }
    },
  })
</script>

<style scoped></style>
