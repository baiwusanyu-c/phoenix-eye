/* * @remote-search.vue * @deprecated * @author czh * @update (czh 2022/6/22) */
<template>
  <be-popover
    ref="remoteSearchPopover"
    trigger="click"
    placement="bottom"
    not-close-on-trigger="be-input"
    custom-class="project-select-remote-popover"
    @update="setSearchCacheVal">
    <template #trigger>
      <be-input
        v-model="searchParamsInput"
        tabindex="0"
        custom-class="project-select-remote"
        size="medium"
        clearable
        @clear="handleClear"
        @input="handleChange">
      </be-input>
    </template>
    <div class="remote-search-list--body">
      <div v-loading="selectLoading" class="remote-search-list--container scroll-diy">
        <slot name="option">
          <div
            v-for="item in projectList"
            :key="item.project_id + item.project_name"
            class="remote-search-list--item"
            @click="handleClickSelect(true, item)">
            <project-name-cell :url="item.logo_url" :name="item.project_name" :is-ell="false">
            </project-name-cell>
            <span>{{ platformToCurrency[item.platform] }}</span>
          </div>
        </slot>
        <div
          v-if="projectList.length === 0 && searchParamsInput !== ''"
          class="remote-search-list__empty">
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
  import { BeIcon, BeInput, BePopover } from '@eagle-eye/be-ui'
  import { getProjectListCurUser } from '../api/project-explorer'
  import composition from '../utils/mixin/common-func'
  import { platformToCurrency } from '../utils/platform-dict'
  import { debounce } from '../utils/common'
  import ProjectNameCell from './common-components/project-name-cell/project-name-cell.vue'
  import type { IOption } from '../utils/types'
  import type { IPopover } from '@eagle-eye/be-ui/package/popover/src/be-popover-type'
  // TODO: 样式修改

  export default defineComponent({
    name: 'RemoteSearch',
    components: {
      ProjectNameCell,
      BePopover,
      BeIcon,
      BeInput,
    },
    emits: ['select'],
    setup(props, ctx) {
      const { message } = composition()
      const internalInstance = getCurrentInstance()
      const searchParamsInput = ref<string>('')
      const searchParamsCache = ref<string>('')
      const projectList = ref<Array<IOption>>([])
      const selectLoading = ref<boolean>(false)
      /**
       * 调用搜索接口
       */
      const getProjectUser = (params: string): void => {
        selectLoading.value = true
        getProjectListCurUser({ param: params })
          .then(res => {
            if (!res.data) {
              projectList.value = []
            } else {
              res.data.forEach((val: any) => {
                val.project_id = val.project_id.toString()
              })
              projectList.value = res.data
            }
            ;(internalInstance?.refs.remoteSearchPopover as IPopover).update()
          })
          .catch(err => {
            message('error', err.message || err)
          })
          .finally(() => (selectLoading.value = false))
      }
      /**
       * 处理输入，调用搜索接口
       */
      const handleChange = debounce((): void => {
        if (!searchParamsInput.value && searchParamsInput.value !== '0') {
          projectList.value = []
          ;(internalInstance?.refs.remoteSearchPopover as IPopover).update()
          return
        }
        getProjectUser(searchParamsInput.value)
      }, 300)

      const handleClickSelect = (isSwitch = true, item: IOption): void => {
        searchParamsInput.value = item.project_name
        searchParamsCache.value = item.project_name
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
      }
      return {
        handleClear,
        setSearchCacheVal,
        handleClickSelect,
        searchParamsInput,
        handleChange,
        projectList,
        selectLoading,
        platformToCurrency,
      }
    },
  })
</script>

<style lang="scss">
  .project-select-remote-popover {
    .be-popover--body {
      padding: 0;
    }
  }
  .project-select-remote {
    width: 200px;
    height: 40px;
  }
  .remote-search-list--body {
    min-width: 200px;
    .remote-search-list--container {
      max-height: 250px;
      overflow-y: auto;
      .remote-search-list--item {
        height: 48px;
        line-height: 48px;
        cursor: pointer;
        padding: 0 20px;
        box-sizing: border-box;
        cursor: pointer;
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
