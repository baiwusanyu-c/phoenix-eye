/* * @base-form.vue * @deprecated * @author czh * @update (czh 2022/5/13) */
<template>
  <h2 class="create--label">1.{{ $t('lang.createProject.label1') }}</h2>
  <!--      ***************        -->
  <el-form-item v-if="type === 3" :label="$t('lang.createProject.top') + ':'">
    <be-switch v-model="modelValueInner.top_flag" custom-class="create-proj--top"> </be-switch>
  </el-form-item>
  <!--      ***************        -->
  <el-form-item :label="$t('lang.createProject.createProjectName') + ':'">
    <span class="reg-start project-star">*</span>
    <el-input
      v-model="modelValueInner.project_name"
      maxlength="100"
      class="projectKeyWordsInput"
      :placeholder="$t('lang.createProject.createProjectNameInput')"
      @change="handleChange"></el-input>
    <span id="cp_project_name" class="reg-start project-Ver">{{ verTipName }}</span>
  </el-form-item>
  <el-form-item :label="$t('lang.createProject.createProjectKeyWords') + ':'">
    <el-input
      v-model="modelValueInner.keyword"
      maxlength="100"
      class="projectKeyWordsInput"
      :placeholder="$t('lang.createProject.createProjectKeyWordsInput')"
      @change="handleChange"></el-input>
    <span id="cp_keyword" class="reg-start project-Ver">{{ verTipKeyword }}</span>
  </el-form-item>
  <!--      ***************        -->
  <el-form-item :label="$t('lang.createProject.chain') + ':'">
    <el-select v-model="modelValueInner.platform" placeholder="Select" @change="handleChange">
      <el-option
        v-for="item in takePlatformListDict"
        :key="item.id + 'chain'"
        :label="item.label"
        :value="item.value"></el-option>
    </el-select>
    <span id="cp_platform" class="reg-start project-Ver">{{ verTipChain }}</span>
  </el-form-item>
  <!--      ***************        -->
  <el-form-item :label="$t('lang.createProject.tokenAddress') + ':'">
    <el-input
      v-model="modelValueInner.token_address"
      class="projectKeyWordsInput"
      @change="handleChange"></el-input>
    <span id="cp_token_address" class="reg-start project-Ver">{{ verTipToken }}</span>
  </el-form-item>
</template>

<script lang="ts">
  import { defineComponent, onMounted, ref, watch } from 'vue'
  import { BeSwitch } from '@eagle-eye/be-ui'
  import { platformListDict } from '../../../../../utils/platform-dict'
  import type { PropType } from 'vue'
  import type { ICreateProjBase } from '../../../../../utils/types'
  import type { IPlatformListItem } from '../../../../../utils/platform-dict'
  export default defineComponent({
    name: 'BaseForm',
    components: {
      BeSwitch,
    },
    props: {
      modelValue: {
        type: Object as PropType<ICreateProjBase>,
      },
      verTipName: {
        type: String,
        default: '',
      },
      verTipKeyword: {
        type: String,
        default: '',
      },
      verTipChain: {
        type: String,
        default: '',
      },
      verTipToken: {
        type: String,
        default: '',
      },
      type: {
        type: Number,
        default: 3,
      },
    },
    emits: ['update:modelValue'],
    setup(props, ctx) {
      const modelValueInner = ref<ICreateProjBase>({
        platform: 'eth',
      })
      const handleChange = (): void => {
        ctx.emit('update:modelValue', modelValueInner.value)
      }
      // 下拉平台字典
      const takePlatformListDict = ref<Array<IPlatformListItem>>([])
      onMounted(() => {
        takePlatformListDict.value = platformListDict
      })
      watch(
        () => props.modelValue,
        () => {
          props.modelValue && (modelValueInner.value = props.modelValue)
        },
        { deep: true, immediate: true }
      )
      return {
        takePlatformListDict,
        modelValueInner,
        handleChange,
      }
    },
  })
</script>

<style scoped></style>
