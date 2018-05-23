// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'

import Vuex from 'Vuex'

import { mutations } from './store/mutations'
import { actions } from './store/actions'
import { getters } from './store/getters'

Vue.use(Vuex)

const state = {
  ak: localStorage.userAk,
  userInfo: localStorage.userInfo && JSON.parse(localStorage.userInfo) || {avatar_url: '', id: '', loginname: '', success: false}
}

const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})

Vue.use(ElementUI);
Vue.prototype.$http = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})

Vue.filter('formatTime', function(time){
  if(!time) return ''
  let seconds = (new Date().getTime() - new Date(time).getTime())/1000
  if(seconds < 1) return '刚刚'
  if(seconds < 60) return Math.round(seconds) + '秒前'
  if(Math.round(seconds/60 < 60)) return Math.round(seconds/60) + '分钟前'
  if(Math.round(seconds/(60*60)) < 24) return Math.round(seconds/(60*60)) + '小时前'
  if(Math.round(seconds/(60*60*24)) < 30) return Math.round(seconds/(60*60*24)) + '天前'
  if(Math.round(seconds/(60*60*24*30)) < 12) return Math.round(seconds/(60*60*24*30)) + '月前'
  return Math.round(seconds/(60*60*24*30*12)) + '年前'
})