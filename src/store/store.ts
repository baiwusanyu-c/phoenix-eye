/*
 * @store.ts
 * @deprecated
 * @author czh
 * @update (czh 2021/8/2)
 */

import { createStore } from 'vuex'
const store = createStore({
  state() {
    return {
      routeConfig: [],
      lang: '',
    }
  },
  mutations: {
    update(state: any, [key, value]: [string, any]) {
      state[key] = value
    },
  },
})

export default store
