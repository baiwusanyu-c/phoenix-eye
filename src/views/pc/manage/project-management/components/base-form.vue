/* * @base-form.vue * @deprecated * @author czh * @update (czh 2022/5/13) */
<template>
  <h2 class="create--label">1.{{ $t('lang.createProject.label1') }}</h2>
  <!--      ***************        -->
  <el-form-item :label="$t('lang.createProject.createProjectName') + ':'">
    <span class="reg-start project-star">*</span>
    <el-input
      v-model="modelValueInner.project_name"
      class="projectKeyWordsInput"
      :placeholder="$t('lang.createProject.createProjectNameInput')"></el-input>
    <span id="cp_project_name" class="reg-start project-Ver">{{ verTipName }}</span>
  </el-form-item>
  <el-form-item :label="$t('lang.createProject.createProjectKeyWords') + ':'">
    <el-input
      v-model="modelValueInner.keyword"
      class="projectKeyWordsInput"
      :placeholder="$t('lang.createProject.createProjectKeyWordsInput')"></el-input>
    <span id="cp_keyword" class="reg-start project-Ver">{{ verTipKeyword }}</span>
  </el-form-item>
  <!--      ***************        -->
  <el-form-item :label="$t('lang.createProject.chain') + ':'">
    <el-select v-model="modelValueInner.platform" placeholder="Select">
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
    <el-input v-model="modelValueInner.token_address" class="projectKeyWordsInput"></el-input>
    <span id="cp_token_address" class="reg-start project-Ver">{{ verTipToken }}</span>
  </el-form-item>
</template>

<script lang="ts">
  import { defineComponent, onMounted, ref } from 'vue'
  import { platformListDict } from '../../../../../utils/platform-dict'
  import type { PropType } from 'vue'
  import type { ICreateProjBase } from '../../../../../utils/types'
  import type { IPlatformListItem } from '../../../../../utils/platform-dict'

  export default defineComponent({
    name: 'BaseForm',
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
      return {
        takePlatformListDict,
        modelValueInner,
        handleChange,
      }
    },
  })
</script>

<style scoped></style>
