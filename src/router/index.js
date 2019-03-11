import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import test from '@/components/test'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      redirect: '/test'
    }, {
      path: '/hello',
      name: 'HelloWord',
      component: HelloWorld
    }, {
      path: '/test',
      name: 'test',
      component: test
    }
  ]
})
