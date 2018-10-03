// Import Vue
import Vue from 'vue';

// Import F7
import Framework7 from 'framework7/framework7.esm.bundle.js';

// Import F7 Vue Plugin
import Framework7Vue from 'framework7-vue/framework7-vue.esm.bundle.js';

// Import F7 Styles
import Framework7Styles from 'framework7/css/framework7.css';

// Import Icons and App Custom Styles
import IconsStyles from './css/icons.css';
import AppStyles from './css/app.css';

// Import App Component
import App from './app';

import store from './store';
import {
  setLang,
  setWeixin,
  plusReady
} from './store/actions'

import wx from "weixin-js-sdk";

import StoreCache from './utils/storeCache'

// Import language file
import VueI18n from 'vue-i18n'
import zh from './lang/zh_cn'
import en from './lang/en_us'

// 是否进行网页开发调试， 开启（true)，关闭（false)打包时一定要设置为false
let webDev = true

const messages = {
  en,
  zh
}
console.log('messages', messages)

// Init F7 Vue Plugin
Framework7.use(Framework7Vue)

Vue.use(VueI18n)

let cache = new StoreCache('tvaf')

var lang = cache.get('lang') || 'zh'

const i18n = new VueI18n({
  locale: lang, // set locale
  fallbackLocale: 'zh',
  messages
})

setLang(store, {
  'lang': lang
})

setWeixin(store, {
  'weixin': true
})

// After the following setup all XHR requests will have additional 'Autorization' header
Framework7.request.setup({
  headers: {
    'Authorization': 'sometokenvalue'
  }
})

//console.log("Vue.t('app.modal.button_ok')", Vue.t('app.modal.button_ok'));

// 使用Hb打包的情况下，监听 plusready 已经加载就绪了
document.addEventListener('plusready', doPlusReady, false)

function doPlusReady() {
  console.log('doPlusReady')
  plusReady(store, {
    'isReady': true
  })
  //仅支持竖屏显示
  window.plus.screen.lockOrientation('portrait-primary')
  // 隐藏滚动条
  window.plus.webview.currentWebview().setStyle({
    scrollIndicator: 'none'
  })

  // 使用 Hb 打包的，需要设置好 plusready 加载状态之后，再进行初始化
  // Init App
  new Vue({
    el: '#app',
    template: '<app/>',
    store,
    i18n,
    // Register App Component
    components: {
      app: App
    }
  });
}

// 网页调试模式下，直接初始化
if (webDev) {
  // Init App
  new Vue({
    el: '#app',
    template: '<app/>',
    store,
    i18n,
    // Register App Component
    components: {
      app: App
    }
  });
}


window.addEventListener('resize', function () {
  console.log('resize')
  if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') {
    window.setTimeout(function () {
      console.log('scrollIntoViewIfNeeded')
      document.activeElement.scrollIntoViewIfNeeded()
    }, 300);
  }
});
