/* * @remote-search.vue * @deprecated * @author czh * @update (czh 2022/6/22) */
<template>
  <be-popover
    ref="remoteSearchPopover"
    trigger="click"
    placement="bottom"
    :raw="false"
    not-close-on-trigger="be-input"
    custom-class="remote-popover"
    @update="setSearchCacheVal">
    <template #trigger>
      <be-input
        v-model="searchParamsInput"
        tabindex="0"
        custom-class="remote-search-input"
        size="medium"
        placeholder="Please select"
        clearable
        @clear="handleClear"
        @input="handleChange">
        <template #next>
          <slot name="next"></slot>
        </template>
        <template #prev>
          <slot name="prev"></slot>
        </template>
      </be-input>
    </template>
    <div class="remote-search-list--body">
      <div v-loading="selectLoading" class="remote-search-list--container scroll-diy">
        <div
          v-for="item in list"
          :key="item[keyVal]"
          class="remote-search-list--item"
          @click="handleClickSelect(true, item)">
          <slot name="option" :item="item">
            <div>{{ item[label] }}</div>
          </slot>
        </div>
        <div v-if="list.length === 0 && searchParamsInput !== ''" class="remote-search-list__empty">
          <img class="img" src="@/assets/image/pc/empty-data.png" alt="" />
          <p>
            {{ $t('lang.emptyData') }}
          </p>
        </div>
      </div>
      <div @click="handleClickSelect(false)">
        <slot name="listFooter"></slot>
      </div>
    </div>
  </be-popover>
</template>

<script lang="ts">
  import { defineComponent, getCurrentInstance, ref } from 'vue'
  import { BeInput, BePopover } from '@eagle-eye/be-ui'
  import { debounce } from '../../../utils/common'
  import type { IOption } from '../../../utils/types'
  import type { IPopover } from '@eagle-eye/be-ui/package/popover/src/be-popover-type'
  // TODO: 样式修改

  export default defineComponent({
    name: 'RemoteSearch',
    components: {
      BePopover,
      BeInput,
    },
    props: {
      label: {
        type: String,
        default: 'project_name',
      },
      keyVal: {
        type: String,
        default: 'project_id',
      },
      remoteSearch: {
        type: Function,
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        default: () => {},
      },
    },
    emits: ['select', 'clear'],
    setup(props, ctx) {
      const internalInstance = getCurrentInstance()
      const searchParamsInput = ref<string>('')
      const searchParamsCache = ref<string>('')
      const list = ref<Array<IOption>>([])
      const selectLoading = ref<boolean>(false)
      /**
       * 处理输入，调用搜索接口
       */
      const handleChange = debounce((): void => {
        selectLoading.value = true
        if (!searchParamsInput.value && searchParamsInput.value !== '0') {
          list.value = []
          ;(internalInstance?.refs.remoteSearchPopover as IPopover).update()
          return
        }
        props.remoteSearch(searchParamsInput.value, (data: Array<any>) => {
          selectLoading.value = false
          list.value = data
          ;(internalInstance?.refs.remoteSearchPopover as IPopover).update()
        })
      }, 300)

      const handleClickSelect = (isSwitch = true, item?: IOption): void => {
        if (item) {
          searchParamsInput.value = item[props.label]
          searchParamsCache.value = item[props.label]
        }
        ;(internalInstance?.refs.remoteSearchPopover as IPopover).close()
        if (isSwitch) {
          ctx.emit('select', item)
        }
      }
      /**
       * 选择过，再次输入搜索，不选择，关闭list，回填之前选的
       */
      const setSearchCacheVal = (status: boolean): void => {
        if (!status && searchParamsInput.value !== searchParamsCache.value) {
          list.value = []
          searchParamsInput.value = searchParamsCache.value
        }
        if (status && searchParamsInput.value) {
          handleChange()
        }
      }
      /**
       * 清除方法
       */
      const handleClear = (): void => {
        searchParamsInput.value = searchParamsCache.value = ''
        ctx.emit('clear')
      }
      return {
        handleClear,
        setSearchCacheVal,
        handleClickSelect,
        searchParamsInput,
        handleChange,
        list,
        selectLoading,
      }
    },
  })
</script>

<style lang="scss">
  .remote-popover {
    .be-popover--body {
      padding: 0;
      border-radius: 4px;
    }
  }
  .remote-search-input {
    width: 300px;
    height: 40px;
  }
  .remote-search-input.be-input__focus {
    border: none;
    box-shadow: none;
  }
  .remote-search-list--body {
    min-width: 300px;
    .remote-search-list--container {
      max-height: 250px;
      overflow-y: auto;
      .remote-search-list--item {
        height: 48px;
        line-height: 48px;
        cursor: pointer;
        padding: 0 20px;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        &:hover {
          background-color: #f5f7fa;
        }
      }
      .remote-search-list__empty {
        width: 100%;
        height: 140px;

        img {
          width: 100px;
          height: 100px;
          margin: 0 auto;
        }
        p {
          line-height: 25px;
          text-align: center;
          font-family: BarlowSemi-R, sans-serif;
          color: #bababa;
          font-weight: 400;
          font-size: 14px;
        }
      }
    }
  }
</style>
