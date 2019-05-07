import Vue from 'vue'
import App from './test.vue'
import Eruda from 'eruda'
import store from '@store'

Eruda.init()

new Vue({
  el: '#app',
  store,
  render (h){
    return h(App)
  }
})
