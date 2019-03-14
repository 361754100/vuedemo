import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import HelloWorld from '@/components/HelloWorld'
import test from '@/components/test'
// import bmap from '@/components/Bmap'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    }, {
      path: '/hello',
      name: 'HelloWord',
      component: HelloWorld
    }, {
      path: '/test',
      name: 'test',
      component: test
    // }, {
    //   path: '/bmap',
    //   name: 'bmap',
    //   component: bmap
    }
  ]
})
