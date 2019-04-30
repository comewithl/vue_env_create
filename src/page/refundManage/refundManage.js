import Vue from 'vue'
import App from './refundManage.vue'
import VueRouter from 'vue-router'

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
  render(h){
    return h(App)
  }
})
