import Vue from 'vue'
import Router from 'vue-router'
// import { resolve } from 'path';
// import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

const Recomend = (resolve) => {
  import('components/recomend/recomend').then((module) => {
    resolve(module)
  })
}

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/recomend' // 推荐页
    },
    {
      path: '/recomend',
      component: Recomend
    }
  ]
})