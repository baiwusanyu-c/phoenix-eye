/*
 * @dialog-func.ts
 * @deprecated
 * @author czh
 * @update (czh 2022/4/20)
 */
/*
 * @page-param.ts
 * @deprecated
 * @author czh
 * @update (czh 2022/4/20)
 */
import { nextTick, ref } from 'vue'
import type { Ref } from '@vue/reactivity'
export default () => {
  let curItem: any = null
  function createCurItem<T>(initVal: T): Ref {
    curItem = ref<T>(initVal)
    return curItem
  }
  const createDialog = ref<any>({})
  // 当前操作类型
  const opType = ref<string>('add')
  // 删除弹窗显示
  const showDelete = ref<boolean>(false)
  /**
   * 开启编辑或新增弹窗
   * @param type
   * @param item
   */
  const openDialog = <T>(type: string, item?: T): void => {
    opType.value = type
    if (type === 'delete' && item) {
      curItem.value = item
      showDelete.value = true
      return
    }
    if (type === 'edit' && item) {
      curItem.value = item
    }
    // 打开弹窗
    nextTick(() => {
      createDialog.value.showDialog = true
    })
  }
  return {
    showDelete,
    opType,
    openDialog,
    createDialog,
    curItem,
    createCurItem,
  }
}
