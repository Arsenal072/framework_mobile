// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'
import Vuex from 'vuex'
import 'lib-flexible/flexible.js'
import FastClick from 'fastclick'
import 'jquery'

import "vux/src/styles/reset.less";
import './assets/iconfont/iconfont.css'
import "./assets/index.css";
import  { ToastPlugin,ConfirmPlugin,AlertPlugin } from 'vux'
import VueChatScroll from 'vue-chat-scroll'
Vue.use(VueChatScroll)

//Vux 插件注册
Vue.use(ConfirmPlugin)
Vue.use(AlertPlugin)
Vue.use(ToastPlugin)
Vue.use(Vuex)
Vue.use(router)

Vue.config.productionTip = false
FastClick.attach(document.body)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

  