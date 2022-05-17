/* * @operating-form.vue * @deprecated * @author czh * @update (czh 2022/5/13) */
<template>
  <h2 class="create--label">3.{{ $t('lang.createProject.label3') }}</h2>
  <el-form-item :label="`${$t('lang.createProject.markup')}:`">
    <el-input
      v-model="modelValueInner.address_markup"
      class="projectKeyWordsInput"
      @change="handleChange"></el-input>
  </el-form-item>
  <el-form-item :label="`${$t('lang.createProject.whitePaper')}:`">
    <el-input
      v-model="modelValueInner.white_paper"
      class="projectKeyWordsInput"
      @change="handleChange"></el-input>
  </el-form-item>
  <el-form-item :label="`${$t('lang.createProject.operation')}:`">
    <el-input
      v-model="modelValueInner.operation_manual"
      class="projectKeyWordsInput"
      @change="handleChange"></el-input>
  </el-form-item>
  <el-form-item :label="`${$t('lang.createProject.boardExchange')}:`">
    <el-input
      v-model="modelValueInner.exchange_board"
      class="projectKeyWordsInput"
      @change="handleChange"></el-input>
  </el-form-item>
  <el-form-item :label="`${$t('lang.createProject.testChain')}:`">
    <el-input
      v-model="modelValueInner.test_chain"
      class="projectKeyWordsInput"
      @change="handleChange"></el-input>
  </el-form-item>
</template>

<script lang="ts">
  import { defineComponent, ref, watch } from 'vue'
  import type { PropType } from 'vue'
  import type { ICreateProjOperating } from '../../../../../utils/types'
  export default defineComponent({
    name: 'OperatingForm',
    props: {
      modelValue: {
        type: Object as PropType<ICreateProjOperating>,
      },
    },
    emits: ['update:modelValue'],
    setup(props, ctx) {
      const modelValueInner = ref<ICreateProjOperating>({})
      const handleChange = (): void => {
        ctx.emit('update:modelValue', modelValueInner.value)
      }
      watch(
        () => props.modelValue,
        nVal => {
          props.modelValue && (modelValueInner.value = props.modelValue)
        },
        { deep: true, immediate: true }
      )
      return {
        modelValueInner,
        handleChange,
      }
    },
  })
</script>

<style scoped></style>
