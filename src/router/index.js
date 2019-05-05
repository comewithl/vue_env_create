import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@components/HelloWorld.vue'
// import firstPage from '../page/firstPage/firstPage.vue'
// import dataDraw from '../page/dataDraw/dataDraw.vue'
import test from '../page/test/test.vue'
// import testPostMessage from '../page/testPostMessage/testPostMessage.vue'
// import postMessage1 from '../page/postMessage1/postMessage1.vue'
// import postMessage2 from '../page/postMessage2/postMessage2.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
      beforeEnter: (to, from, next) => {
        next()
      }
    },
    // {
    //   path: '/first/:id',
    //   name: 'first',
    //   component: firstPage
    // },
    // {
    //     	path: '/dataDraw',
    //   name: 'dataDraw',
    //   component: dataDraw
    // },
    {
      path: '/test',
      name: 'test',
      component: test
    }
    // {
    //    path: '/testPostMessage',
    //    name: 'testPostMessage',
    //    component: testPostMessage
    // },
    // {
    //    path: '/postMessage1',
    //    name: 'postMessage1',
    //    component: postMessage1
    // },
    // {
    //    path: '/postMessage2',
    //    name: 'postMessage2',
    //    component: postMessage2
    // }
  ]
})
