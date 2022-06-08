/* * @contact-form.vue * @deprecated * @author czh * @update (czh 2022/5/13) */
<template>
  <h2 class="create--label">
    {{ $t('lang.createProject.contact') }}
    <span class="sub--title">{{ $t('lang.createProject.contactDesc') }}</span>
  </h2>
  <el-form-item label=" ">
    <span class="reg-start project-star project-star__contract">*</span>
    <div class="contractSiteBox">
      <el-select
        v-model="modelValueInner.contact_type"
        class="contract-type--select"
        :placeholder="$t('lang.createProject.selectContractClass')"
        @change="handleChange">
        <el-option label="others" value="others"></el-option>
        <el-option label="email" value="email"></el-option>
        <el-option label="twitter" value="twitter"></el-option>
      </el-select>
      <el-input
        v-model="modelValueInner.contact"
        maxlength="100"
        class="projectKeyWordsInput"
        @change="handleChange"></el-input>
    </div>
    <span id="cp_contact" class="reg-start project-Ver">{{ verTipContact }}</span>
  </el-form-item>
  <el-form-item :label="$t('lang.createProject.messageBoard') + ':'">
    <el-input
      v-model="modelValueInner.message_board"
      type="textarea"
      resize="none"
      maxlength="200"
      :rows="7"
      @change="handleChange"></el-input>
  </el-form-item>
</template>

<script lang="ts">
  import { defineComponent, ref, watch } from 'vue'
  import type { PropType } from 'vue'
  import type { ICreateProjContact } from '../../../../../utils/types'

  export default defineComponent({
    name: 'ContactForm',
    props: {
      modelValue: {
        type: Object as PropType<ICreateProjContact>,
      },
      verTipContact: {
        type: String,
        default: '',
      },
    },
    emits: ['update:modelValue'],
    setup(props, ctx) {
      const modelValueInner = ref<ICreateProjContact>({
        contact_type: 'email',
      })
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
