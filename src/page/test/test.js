import Vue from 'vue'
import App from './test.vue'
import store from '@store'

new Vue({
  el: '#app',
  store,
  render (h){
    return h(App)
  }
})
