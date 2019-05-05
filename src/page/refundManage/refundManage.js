import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@store/index'
import App from './refundManage.vue'

const router = new VueRouter({
  routes: [
    {
      path: '/', redirect: '/backMoney'
    }
  ]
})

new Vue({
  el: '#app',
  router,
  store,
  render(h) {
    return h(App)
  }
})
