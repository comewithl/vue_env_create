import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import firstPage from '../page/firstPage/firstPage.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
      beforeEnter:(to,from,next)=>{
        console.log('beforeEnter',this)
        next()
      }
    },
    {
      path: '/first/:id',
      name: 'first',
      component: firstPage
    }
  ]
})
