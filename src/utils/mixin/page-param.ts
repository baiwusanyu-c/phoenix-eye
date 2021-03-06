/*
 * @page-param.ts
 * @deprecated
 * @author czh
 * @update (czh 2022/4/20)
 */
import { ref } from 'vue'
import type { Ref, UnwrapRef } from 'vue'
import type { IPageParam } from '../types'
export default () => {
  /**
   * 分页参数
   */
  const pageParams = ref<IPageParam>({
    currentPage: 1,
    pageSize: 10,
    total: 0,
  })
  /**
   * 重置分页
   */
  const resetPageParam = (pageSize = 10, target?: any): void => {
    if (target) {
      target.value = {
        currentPage: 1,
        pageSize,
        total: 0,
      }
      return
    }
    pageParams.value = {
      currentPage: 1,
      pageSize,
      total: 0,
    }
  }
  /**
   * 生成分页参数，用于一个页面多个分页参数场景
   * @param pageSize
   */
  const createPageParam = (pageSize = 10) => {
    const page = ref<IPageParam>({
      currentPage: 1,
      pageSize,
      total: 0,
    })
    return page
  }
  const updatePageSize = (pageSize: number, page: any): void => {
    page.value.currentPage = 1
    page.value.pageSize = pageSize!
  }
  const nextPage = (
    pageParams: UnwrapRef<Ref<UnwrapRef<IPageParam>>>,
    pageNum: UnwrapRef<Ref<UnwrapRef<number>>>,
    cb: Function
  ): void => {
    pageParams.currentPage!++
    if (pageParams.currentPage! > pageNum) {
      pageParams.currentPage! = pageNum
      return
    }
    cb && cb()
  }
  const prevPage = (pageParams: UnwrapRef<Ref<UnwrapRef<IPageParam>>>, cb: Function): void => {
    pageParams.currentPage!--
    if (pageParams.currentPage! < 1) {
      pageParams.currentPage! = 1
      return
    }
    cb && cb()
  }
  return {
    nextPage,
    prevPage,
    updatePageSize,
    createPageParam,
    resetPageParam,
    pageParams,
  }
}
