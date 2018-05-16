// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false
Vue.use(ElementUI);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

Vue.filter('formatTime', function(time){
  if(!time) return ''
  let seconds = (new Date().getTime() - new Date(time).getTime())/1000
  if(seconds < 1) return '刚刚'
  if(seconds < 60) return seconds + '秒前'
  if(Math.round(seconds/60 < 60)) return Math.round(seconds/60) + '分钟前'
  if(Math.round(seconds/(60*60)) < 24) return Math.round(seconds/(60*60)) + '小时前'
  if(Math.round(seconds/(60*60*24)) < 30) return Math.round(seconds/(60*60*24)) + '天前'
  if(Math.round(seconds/(60*60*24*30)) < 12) return Math.round(seconds/(60*60*24*30)) + '月前'
  return Math.round(seconds/(60*60*24*30*12)) + '年前'
})