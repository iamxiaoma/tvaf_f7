import Vue from 'vue'
import * as types from './mutation-types'
import StoreCache from '../utils/storeCache'

let cache = new StoreCache('tvaf')

export default {
  [types.SET_PLUS_READY](state, {
    isReady
  }) {
    Vue.set(state, 'plusReady', isReady)
  },
  [types.SET_WEIXIN](state, weixin) {
    Vue.set(state, 'weixin', weixin)
  },
  [types.UPDATE_LANG](state, lang) {
    Vue.set(state, 'lang', lang)
    cache.set('lang', lang)
  }
}
