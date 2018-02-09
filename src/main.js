// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Element from 'element-ui'
import ElementUIPlugin from "element-ui-plugin"
import "element-ui/lib/theme-default/index.css"
import "element-ui-plugin/lib/theme/index.css"
import App from './App'
import router from './router'
import Echarts from 'vue-echarts/components/Echarts.vue'
Vue.use(Element)
Vue.use(ElementUIPlugin)
// import $ from 'jquery'
Vue.config.productionTip = false
router.beforeEach((to,from,next)=>{
  console.log('beforeEach',this)
  next()
})
router.beforeResolve((to,from,next)=>{
  console.log('beforeResolve',this)
  next()
})

Vue.filter('filterChinese', function (value) {
  if (!value) return ''
  value = value.replace(/[^\u4e00-\u9fa5]+/ig,'')
  console.log(value)
  return value
})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
})
