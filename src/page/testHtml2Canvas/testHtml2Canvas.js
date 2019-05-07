/**
 * Created by hjunx on 2019/5/6
 */
import Vue from 'vue'
import testHtml2CanvasVue from './testHtml2Canvas.vue'

import './testHtml2Canvas.less'


new Vue({
  el: '#app',
  render(h) {
    return h(testHtml2CanvasVue)
  }
})